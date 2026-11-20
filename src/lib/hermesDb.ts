import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Pool, type PoolConfig } from "pg";

export type CustomerType = "particular" | "camaronera" | "taller";
export type ChannelType = "whatsapp" | "demo_web" | "instagram" | "messenger";
export type QaFlag = "good" | "fix";

export interface VehicleProfile {
  make?: string;
  model?: string;
  year?: number;
  engine?: string;
  fuel?: "diésel" | "gasolina" | "moto" | "híbrido";
  batteryGroup?: string;
  unmappedLabel?: string;
}

export interface CustomerRecord {
  phoneOrSession: string;
  name: string | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  updatedAt: string;
}

export interface StoredMessageRecord {
  id: number;
  sessionId: string;
  channel: ChannelType;
  role: "user" | "assistant";
  content: string;
  skusUsed: string[];
  quotedTotalUsd: number | null;
  latencyMs: number | null;
  intentTag: string | null;
  qaFlag: QaFlag | null;
  qaNote: string | null;
  createdAt: string;
}

export interface UpsertCustomerInput {
  phoneOrSession: string;
  name?: string | null;
  activeVehicle?: VehicleProfile | null;
  city?: string | null;
  customerType?: CustomerType;
}

export interface InsertMessageInput {
  sessionId: string;
  channel: ChannelType;
  role: "user" | "assistant";
  content: string;
  skusUsed?: string[];
  quotedTotalUsd?: number | null;
  latencyMs?: number | null;
  intentTag?: string | null;
  qaFlag?: QaFlag | null;
  qaNote?: string | null;
}

export interface OutOfStockRankItem {
  term: string;
  count: number;
  sampleMessages: string[];
}

export interface FlaggedFailureItem {
  messageId: number;
  sessionId: string;
  channel: ChannelType;
  userPrompt: string | null;
  hermesReply: string;
  qaNote: string | null;
  intentTag: string | null;
  createdAt: string;
}

export interface WeeklyAuditReport {
  auditId: number | null;
  storageMode: "postgres" | "local_fallback";
  periodStart: string;
  periodEnd: string;
  daysAnalyzed: number;
  totalChats: number;
  totalMessages: number;
  channelsBreakdown: Record<string, number>;
  intentsBreakdown: Record<string, number>;
  avgLatencyMs: number | null;
  outOfStockRanking: OutOfStockRankItem[];
  flaggedFailures: FlaggedFailureItem[];
  unmappedVehicles: Array<{ vehicle: string; count: number }>;
  recommendations: string[];
}

interface FallbackStoreData {
  nextMessageId: number;
  nextAuditId: number;
  customers: Record<string, CustomerRecord>;
  messages: StoredMessageRecord[];
  weeklyAudits: Array<{
    id: number;
    periodStart: string;
    periodEnd: string;
    totalChats: number;
    report: WeeklyAuditReport;
    createdAt: string;
  }>;
}

interface HermesDbGlobals {
  __hermesPgPool?: Pool | null;
  __hermesPgUrl?: string;
  __hermesSchemaPromise?: Promise<void> | null;
  __hermesFallbackStore?: FallbackStoreData;
}

const g = globalThis as unknown as HermesDbGlobals;
const FALLBACK_FILE_PATH = path.join(os.tmpdir(), "liderpro-hermes-db.json");

function resolveDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL_POOLED ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    ""
  ).trim();
}

export function getDbStorageMode(): "postgres" | "local_fallback" {
  return resolveDatabaseUrl() ? "postgres" : "local_fallback";
}

function loadFallbackStore(): FallbackStoreData {
  if (g.__hermesFallbackStore) return g.__hermesFallbackStore;

  const empty: FallbackStoreData = {
    nextMessageId: 1,
    nextAuditId: 1,
    customers: {},
    messages: [],
    weeklyAudits: [],
  };

  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(FALLBACK_FILE_PATH, "utf8")) as Partial<FallbackStoreData>;
      g.__hermesFallbackStore = {
        nextMessageId: Number(parsed.nextMessageId || 1),
        nextAuditId: Number(parsed.nextAuditId || 1),
        customers: parsed.customers || {},
        messages: Array.isArray(parsed.messages) ? parsed.messages.slice(-4000) : [],
        weeklyAudits: Array.isArray(parsed.weeklyAudits) ? parsed.weeklyAudits.slice(-50) : [],
      };
      return g.__hermesFallbackStore;
    }
  } catch {
    // Si el JSON temporal estuviera dañado, iniciar limpio en memoria
  }

  g.__hermesFallbackStore = empty;
  return empty;
}

function persistFallbackStore(store: FallbackStoreData): void {
  try {
    const tmp = `${FALLBACK_FILE_PATH}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(store), "utf8");
    fs.renameSync(tmp, FALLBACK_FILE_PATH);
  } catch {
    // En entornos serverless read-only se mantiene en memoria cálida sin fallar
  }
}

async function getPool(): Promise<Pool | null> {
  const connStr = resolveDatabaseUrl();
  if (!connStr) return null;

  if (!g.__hermesPgPool || g.__hermesPgUrl !== connStr) {
    const isLocal = /localhost|127\.0\.0\.1/i.test(connStr);
    const config: PoolConfig = {
      connectionString: connStr,
      max: 3,
      idleTimeoutMillis: 20000,
      connectionTimeoutMillis: 4500,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    };
    g.__hermesPgPool = new Pool(config);
    g.__hermesPgUrl = connStr;
    g.__hermesSchemaPromise = null;
  }

  if (!g.__hermesSchemaPromise) {
    const pool = g.__hermesPgPool;
    g.__hermesSchemaPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS customers (
          phone_or_session TEXT PRIMARY KEY,
          name TEXT,
          active_vehicle JSONB,
          city TEXT,
          customer_type TEXT NOT NULL DEFAULT 'particular',
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS messages (
          id BIGSERIAL PRIMARY KEY,
          session_id TEXT NOT NULL,
          channel TEXT NOT NULL,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          skus_used JSONB NOT NULL DEFAULT '[]'::jsonb,
          quoted_total_usd NUMERIC(10, 2),
          latency_ms INTEGER,
          intent_tag TEXT,
          qa_flag TEXT,
          qa_note TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_hermes_messages_session_created
          ON messages (session_id, created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_hermes_messages_created_at
          ON messages (created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_hermes_messages_qa_flag
          ON messages (qa_flag) WHERE qa_flag IS NOT NULL;

        CREATE TABLE IF NOT EXISTS weekly_audits (
          id BIGSERIAL PRIMARY KEY,
          period_start TIMESTAMPTZ NOT NULL,
          period_end TIMESTAMPTZ NOT NULL,
          total_chats INTEGER NOT NULL DEFAULT 0,
          total_messages INTEGER NOT NULL DEFAULT 0,
          out_of_stock_products JSONB NOT NULL DEFAULT '[]'::jsonb,
          flagged_failures JSONB NOT NULL DEFAULT '[]'::jsonb,
          recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
          summary JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
    })().catch((err) => {
      g.__hermesSchemaPromise = null;
      throw err;
    });
  }

  await g.__hermesSchemaPromise;
  return g.__hermesPgPool;
}

function mapPgCustomerRow(row: Record<string, unknown>): CustomerRecord {
  return {
    phoneOrSession: String(row.phone_or_session || ""),
    name: typeof row.name === "string" ? row.name : null,
    activeVehicle: (row.active_vehicle as VehicleProfile | null) ?? null,
    city: typeof row.city === "string" ? row.city : null,
    customerType: (row.customer_type as CustomerType) || "particular",
    updatedAt: row.updated_at ? new Date(String(row.updated_at)).toISOString() : new Date().toISOString(),
  };
}

function mapPgMessageRow(row: Record<string, unknown>): StoredMessageRecord {
  const rawSkus = Array.isArray(row.skus_used) ? row.skus_used.map(String) : [];
  return {
    id: Number(row.id),
    sessionId: String(row.session_id || ""),
    channel: (row.channel as ChannelType) || "demo_web",
    role: row.role === "assistant" ? "assistant" : "user",
    content: String(row.content || ""),
    skusUsed: rawSkus,
    quotedTotalUsd: row.quoted_total_usd !== null && row.quoted_total_usd !== undefined ? Number(row.quoted_total_usd) : null,
    latencyMs: row.latency_ms !== null && row.latency_ms !== undefined ? Number(row.latency_ms) : null,
    intentTag: typeof row.intent_tag === "string" ? row.intent_tag : null,
    qaFlag: row.qa_flag === "good" || row.qa_flag === "fix" ? row.qa_flag : null,
    qaNote: typeof row.qa_note === "string" ? row.qa_note : null,
    createdAt: row.created_at ? new Date(String(row.created_at)).toISOString() : new Date().toISOString(),
  };
}

export async function getCustomer(phoneOrSession: string): Promise<CustomerRecord | null> {
  const key = phoneOrSession.trim();
  if (!key) return null;

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `SELECT phone_or_session, name, active_vehicle, city, customer_type, updated_at
         FROM customers WHERE phone_or_session = $1 LIMIT 1`,
        [key]
      );
      if (rows.length > 0) return mapPgCustomerRow(rows[0]);
      return null;
    }
  } catch (err) {
    console.warn("[HermesDB] getCustomer fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  return store.customers[key] || null;
}

export async function upsertCustomer(input: UpsertCustomerInput): Promise<CustomerRecord> {
  const key = input.phoneOrSession.trim();
  const nowIso = new Date().toISOString();

  try {
    const pool = await getPool();
    if (pool) {
      const existing = await getCustomer(key);
      const nextName = input.name !== undefined ? input.name : existing?.name ?? null;
      const nextVehicle = input.activeVehicle !== undefined ? input.activeVehicle : existing?.activeVehicle ?? null;
      const nextCity = input.city !== undefined ? input.city : existing?.city ?? null;
      const nextType: CustomerType = input.customerType || existing?.customerType || "particular";

      const { rows } = await pool.query<Record<string, unknown>>(
        `INSERT INTO customers (phone_or_session, name, active_vehicle, city, customer_type, updated_at)
         VALUES ($1, $2, $3::jsonb, $4, $5, NOW())
         ON CONFLICT (phone_or_session) DO UPDATE SET
           name = COALESCE(EXCLUDED.name, customers.name),
           active_vehicle = COALESCE(EXCLUDED.active_vehicle, customers.active_vehicle),
           city = COALESCE(EXCLUDED.city, customers.city),
           customer_type = COALESCE(EXCLUDED.customer_type, customers.customer_type),
           updated_at = NOW()
         RETURNING phone_or_session, name, active_vehicle, city, customer_type, updated_at`,
        [key, nextName, nextVehicle ? JSON.stringify(nextVehicle) : null, nextCity, nextType]
      );
      if (rows.length > 0) return mapPgCustomerRow(rows[0]);
    }
  } catch (err) {
    console.warn("[HermesDB] upsertCustomer fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  const prev = store.customers[key];
  const record: CustomerRecord = {
    phoneOrSession: key,
    name: input.name !== undefined ? input.name : prev?.name ?? null,
    activeVehicle: input.activeVehicle !== undefined ? input.activeVehicle : prev?.activeVehicle ?? null,
    city: input.city !== undefined ? input.city : prev?.city ?? null,
    customerType: input.customerType || prev?.customerType || "particular",
    updatedAt: nowIso,
  };
  store.customers[key] = record;
  persistFallbackStore(store);
  return record;
}

export async function getRecentMessages(sessionId: string, limit = 12): Promise<StoredMessageRecord[]> {
  const key = sessionId.trim();
  if (!key) return [];

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `SELECT id, session_id, channel, role, content, skus_used, quoted_total_usd,
                latency_ms, intent_tag, qa_flag, qa_note, created_at
         FROM messages
         WHERE session_id = $1
         ORDER BY created_at DESC, id DESC
         LIMIT $2`,
        [key, limit]
      );
      return rows.map(mapPgMessageRow).reverse();
    }
  } catch (err) {
    console.warn("[HermesDB] getRecentMessages fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  return store.messages.filter((m) => m.sessionId === key).slice(-limit);
}

export async function insertMessage(input: InsertMessageInput): Promise<StoredMessageRecord> {
  const skus = Array.isArray(input.skusUsed) ? input.skusUsed : [];
  const total = typeof input.quotedTotalUsd === "number" && Number.isFinite(input.quotedTotalUsd)
    ? Number(input.quotedTotalUsd.toFixed(2))
    : null;
  const latency = typeof input.latencyMs === "number" && Number.isFinite(input.latencyMs)
    ? Math.max(0, Math.round(input.latencyMs))
    : null;

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `INSERT INTO messages (
           session_id, channel, role, content, skus_used, quoted_total_usd,
           latency_ms, intent_tag, qa_flag, qa_note, created_at
         )
         VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9, $10, NOW())
         RETURNING id, session_id, channel, role, content, skus_used, quoted_total_usd,
                   latency_ms, intent_tag, qa_flag, qa_note, created_at`,
        [
          input.sessionId.trim(),
          input.channel,
          input.role,
          input.content,
          JSON.stringify(skus),
          total,
          latency,
          input.intentTag ?? null,
          input.qaFlag ?? null,
          input.qaNote ?? null,
        ]
      );
      if (rows.length > 0) return mapPgMessageRow(rows[0]);
    }
  } catch (err) {
    console.warn("[HermesDB] insertMessage fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  const record: StoredMessageRecord = {
    id: store.nextMessageId++,
    sessionId: input.sessionId.trim(),
    channel: input.channel,
    role: input.role,
    content: input.content,
    skusUsed: skus,
    quotedTotalUsd: total,
    latencyMs: latency,
    intentTag: input.intentTag ?? null,
    qaFlag: input.qaFlag ?? null,
    qaNote: input.qaNote ?? null,
    createdAt: new Date().toISOString(),
  };
  store.messages.push(record);
  if (store.messages.length > 4000) {
    store.messages = store.messages.slice(-4000);
  }
  persistFallbackStore(store);
  return record;
}

export async function updateMessageQaFeedback(
  messageId: number,
  qaFlag: QaFlag,
  qaNote?: string | null
): Promise<{ ok: boolean; updated?: StoredMessageRecord }> {
  const cleanNote = qaNote ? qaNote.trim().slice(0, 500) : null;

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `UPDATE messages
         SET qa_flag = $2, qa_note = COALESCE($3, qa_note)
         WHERE id = $1
         RETURNING id, session_id, channel, role, content, skus_used, quoted_total_usd,
                   latency_ms, intent_tag, qa_flag, qa_note, created_at`,
        [messageId, qaFlag, cleanNote]
      );
      if (rows.length > 0) {
        return { ok: true, updated: mapPgMessageRow(rows[0]) };
      }
      return { ok: false };
    }
  } catch (err) {
    console.warn("[HermesDB] updateMessageQaFeedback fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  const found = store.messages.find((m) => m.id === messageId);
  if (!found) return { ok: false };
  found.qaFlag = qaFlag;
  if (cleanNote !== null) found.qaNote = cleanNote;
  persistFallbackStore(store);
  return { ok: true, updated: found };
}

const OUT_OF_STOCK_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "Llantas / Neumáticos", regex: /\b(llantas?|neumaticos?|cauchos?|rin(?:es)?\s*\d*)\b/i },
  { label: "Pastillas / Zapatas / Discos de Freno", regex: /\b(pastillas?|balatas?|zapatas?|discos?\s+de\s+freno|tambores?)\b/i },
  { label: "Parabrisas / Vidrios", regex: /\b(parabrisas?|vidrios?|plumillas?|limpiaparabrisas?)\b/i },
  { label: "Amortiguadores / Suspensión", regex: /\b(amortiguador(?:es)?|terminales?|rotulas?|bujes?|mesas?|suspension)\b/i },
  { label: "Bujías / Encendido", regex: /\b(bujias?|bobinas?|cables?\s+de\s+bujia)\b/i },
  { label: "Embrague / Kit de Clutch", regex: /\b(embrague|clutch|prensa|collarin)\b/i },
  { label: "Bandas / Correas", regex: /\b(bandas?|correas?\s+de\s+distribucion|tensores?)\b/i },
  { label: "Partes Eléctricas / Faros / Alternador", regex: /\b(alternador|arranque|focos?|faros?|retrovisor(?:es)?)\b/i },
];

function extractOutOfStockTerm(text: string): string {
  const norm = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  for (const pat of OUT_OF_STOCK_PATTERNS) {
    if (pat.regex.test(norm)) return pat.label;
  }
  return "Otro repuesto fuera de catálogo";
}

function buildAuditRecommendations(params: {
  totalChats: number;
  flaggedFailures: FlaggedFailureItem[];
  outOfStockRanking: OutOfStockRankItem[];
  unmappedVehicles: Array<{ vehicle: string; count: number }>;
  avgLatencyMs: number | null;
}): string[] {
  const recs: string[] = [];

  if (params.outOfStockRanking.length > 0) {
    const top = params.outOfStockRanking[0];
    recs.push(
      `Evaluar línea nueva o alianza local para "${top.term}" (${top.count} solicitud(es) sin stock esta semana).`
    );
  }

  if (params.unmappedVehicles.length > 0) {
    const names = params.unmappedVehicles.slice(0, 3).map((v) => v.vehicle).join(", ");
    recs.push(
      `Agregar al diccionario vehicular src/data/vehicles.ts los modelos consultados sin ficha exacta: ${names}.`
    );
  }

  if (params.flaggedFailures.length > 0) {
    const hasPriceComplaint = params.flaggedFailures.some((f) =>
      /precio|iva|total|caro|suma|redondeo|calculo/i.test(`${f.qaNote || ""} ${f.hermesReply}`)
    );
    const hasVehicleComplaint = params.flaggedFailures.some((f) =>
      /vehiculo|carro|olvido|modelo|bateria|aceite/i.test(`${f.qaNote || ""} ${f.userPrompt || ""}`)
    );
    if (hasPriceComplaint) {
      recs.push(
        "Revisar los casos marcados en [Corregir] con mención de precio/total y ajustar las reglas de emparejamiento de combos."
      );
    }
    if (hasVehicleComplaint) {
      recs.push(
        "Reforzar sinónimos de carrocería/motor en VEHICLE_SYNONYMS para las fallas vehiculares reportadas en QA."
      );
    }
    recs.push(
      `Auditar ${params.flaggedFailures.length} respuesta(s) marcada(s) con [⚠️ Corregir] y añadir ejemplos few-shot al prompt si persiste el patrón.`
    );
  }

  if (params.avgLatencyMs !== null && params.avgLatencyMs > 2500) {
    recs.push(
      `Latencia promedio en ${params.avgLatencyMs} ms; considerar optimizar timeout de NVIDIA NIM o mantener caché de fichas frecuentes.`
    );
  }

  if (recs.length === 0) {
    recs.push(
      params.totalChats === 0
        ? "Sin volumen suficiente en los últimos 7 días; ejecutar pruebas en /demo-whatsapp y campañas locales para recolectar telemetría."
        : "Operación estable esta semana: 0 fallos QA críticos registrados. Mantener seguimiento semanal de términos sin stock."
    );
  }

  return recs;
}

export async function generateAndSaveWeeklyAudit(days = 7): Promise<WeeklyAuditReport> {
  const safeDays = Math.max(1, Math.min(90, Math.round(days)));
  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - safeDays * 24 * 60 * 60 * 1000);

  let messages: StoredMessageRecord[] = [];
  let customers: CustomerRecord[] = [];
  let storageMode: "postgres" | "local_fallback" = "local_fallback";

  try {
    const pool = await getPool();
    if (pool) {
      storageMode = "postgres";
      const msgRes = await pool.query<Record<string, unknown>>(
        `SELECT id, session_id, channel, role, content, skus_used, quoted_total_usd,
                latency_ms, intent_tag, qa_flag, qa_note, created_at
         FROM messages
         WHERE created_at >= $1
         ORDER BY created_at ASC, id ASC`,
        [periodStart.toISOString()]
      );
      messages = msgRes.rows.map(mapPgMessageRow);

      const custRes = await pool.query<Record<string, unknown>>(
        `SELECT phone_or_session, name, active_vehicle, city, customer_type, updated_at
         FROM customers
         WHERE updated_at >= $1`,
        [periodStart.toISOString()]
      );
      customers = custRes.rows.map(mapPgCustomerRow);
    }
  } catch (err) {
    console.warn("[HermesDB] weekly audit fallback:", err instanceof Error ? err.message : String(err));
  }

  if (storageMode === "local_fallback") {
    const store = loadFallbackStore();
    const minTs = periodStart.getTime();
    messages = store.messages.filter((m) => new Date(m.createdAt).getTime() >= minTs);
    customers = Object.values(store.customers).filter((c) => new Date(c.updatedAt).getTime() >= minTs);
  }

  const sessionSet = new Set<string>();
  const channelsBreakdown: Record<string, number> = {};
  const intentsBreakdown: Record<string, number> = {};
  const latencies: number[] = [];

  // Map previous user message per session for failure inspection
  const lastUserBySession = new Map<string, string>();
  const flaggedFailures: FlaggedFailureItem[] = [];
  const oosBuckets = new Map<string, { count: number; samples: string[] }>();

  for (const m of messages) {
    sessionSet.add(m.sessionId);
    channelsBreakdown[m.channel] = (channelsBreakdown[m.channel] || 0) + 1;
    if (m.intentTag) {
      intentsBreakdown[m.intentTag] = (intentsBreakdown[m.intentTag] || 0) + 1;
    }
    if (m.role === "assistant" && typeof m.latencyMs === "number") {
      latencies.push(m.latencyMs);
    }

    if (m.role === "user") {
      lastUserBySession.set(m.sessionId, m.content);
      if (m.intentTag === "producto_sin_stock") {
        const term = extractOutOfStockTerm(m.content);
        const cur = oosBuckets.get(term) || { count: 0, samples: [] };
        cur.count += 1;
        if (cur.samples.length < 3 && !cur.samples.includes(m.content.slice(0, 120))) {
          cur.samples.push(m.content.slice(0, 120));
        }
        oosBuckets.set(term, cur);
      }
    } else if (m.role === "assistant") {
      if (m.qaFlag === "fix") {
        flaggedFailures.push({
          messageId: m.id,
          sessionId: m.sessionId,
          channel: m.channel,
          userPrompt: lastUserBySession.get(m.sessionId) || null,
          hermesReply: m.content,
          qaNote: m.qaNote,
          intentTag: m.intentTag,
          createdAt: m.createdAt,
        });
      }
    }
  }

  const unmappedCounts = new Map<string, number>();
  for (const c of customers) {
    const unmapped = c.activeVehicle?.unmappedLabel?.trim();
    if (unmapped) {
      unmappedCounts.set(unmapped, (unmappedCounts.get(unmapped) || 0) + 1);
    }
  }

  const outOfStockRanking: OutOfStockRankItem[] = Array.from(oosBuckets.entries())
    .map(([term, data]) => ({ term, count: data.count, sampleMessages: data.samples }))
    .sort((a, b) => b.count - a.count);

  const unmappedVehicles = Array.from(unmappedCounts.entries())
    .map(([vehicle, count]) => ({ vehicle, count }))
    .sort((a, b) => b.count - a.count);

  const avgLatencyMs =
    latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : null;

  const recommendations = buildAuditRecommendations({
    totalChats: sessionSet.size,
    flaggedFailures,
    outOfStockRanking,
    unmappedVehicles,
    avgLatencyMs,
  });

  const report: WeeklyAuditReport = {
    auditId: null,
    storageMode,
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
    daysAnalyzed: safeDays,
    totalChats: sessionSet.size,
    totalMessages: messages.length,
    channelsBreakdown,
    intentsBreakdown,
    avgLatencyMs,
    outOfStockRanking,
    flaggedFailures,
    unmappedVehicles,
    recommendations,
  };

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<{ id: number }>(
        `INSERT INTO weekly_audits (
           period_start, period_end, total_chats, total_messages,
           out_of_stock_products, flagged_failures, recommendations, summary, created_at
         )
         VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7::jsonb, $8::jsonb, NOW())
         RETURNING id`,
        [
          report.periodStart,
          report.periodEnd,
          report.totalChats,
          report.totalMessages,
          JSON.stringify(report.outOfStockRanking),
          JSON.stringify(report.flaggedFailures),
          JSON.stringify(report.recommendations),
          JSON.stringify({
            channelsBreakdown: report.channelsBreakdown,
            intentsBreakdown: report.intentsBreakdown,
            avgLatencyMs: report.avgLatencyMs,
            unmappedVehicles: report.unmappedVehicles,
          }),
        ]
      );
      if (rows.length > 0) {
        report.auditId = Number(rows[0].id);
      }
      return report;
    }
  } catch (err) {
    console.warn("[HermesDB] insert weekly_audits fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  const auditId = store.nextAuditId++;
  report.auditId = auditId;
  store.weeklyAudits.push({
    id: auditId,
    periodStart: report.periodStart,
    periodEnd: report.periodEnd,
    totalChats: report.totalChats,
    report,
    createdAt: new Date().toISOString(),
  });
  if (store.weeklyAudits.length > 50) {
    store.weeklyAudits = store.weeklyAudits.slice(-50);
  }
  persistFallbackStore(store);

  return report;
}
