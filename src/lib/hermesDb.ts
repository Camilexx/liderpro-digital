import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Pool, type PoolConfig } from "pg";
import { OFFICIAL_BANK_ACCOUNT } from "@/data/businessConfig";
import { META_CONFIG } from "@/data/metaConfig";

export type CustomerType = "particular" | "camaronera" | "taller";
export type ChannelType = "whatsapp" | "demo_web" | "instagram" | "messenger";
export type QaFlag = "good" | "fix";
export type OrderStatus =
  | "pending_dispatch"
  | "awaiting_payment"
  | "payment_pending_verification"
  | "ready_for_dispatch"
  | "dispatched"
  | "completed"
  | "cancelled";
export type PaymentStatus =
  | "not_applicable"
  | "awaiting_receipt"
  | "pending_verification"
  | "verified"
  | "rejected";
export type SalesStage = "descubrimiento" | "cotizacion" | "objecion" | "cierre" | "pedido_confirmado";
export type EscalationUrgency = "alta" | "media" | "baja";

export interface CartItem {
  sku: string;
  name: string;
  brand?: string;
  presentation?: string;
  unitPriceIva: number;
  qty: number;
  subCategory?: string;
  isBattery?: boolean;
  batteryTradeIn?: boolean | null;
  listPriceIva?: number;
  priceWithTradeIn?: number;
  priceWithoutTradeIn?: number;
}

export interface CommercialState {
  cartItems: CartItem[];
  discussedCategories: string[];
  batteryTradeIn: boolean | null;
  salesStage: SalesStage;
  lastSuggestedItems: CartItem[];
  lastRecommendedSkus?: string[];
  updatedAt?: string;
}

export interface HumanEscalationRecord {
  sessionId: string;
  customerName: string | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  reason: string;
  summary: string | null;
  urgency: EscalationUrgency;
  escalatedAt: string;
}

export interface VehicleSpecCacheEntry {
  cacheKey: string;
  vehicleLabel: string;
  queryText: string;
  specSummary: string;
  sourceLabel: string | null;
  createdAt: string;
}

export interface VehicleProfile {
  make?: string;
  model?: string;
  year?: number;
  engine?: string;
  fuel?: "diésel" | "gasolina" | "moto" | "híbrido";
  batteryGroup?: string;
  unmappedLabel?: string;
}

export interface QuotedOptionSnapshot {
  label: string;
  items: Array<{
    sku: string;
    name: string;
    brand?: string;
    presentation?: string;
    unitPriceIva: number;
    listPriceIva?: number;
    isBattery?: boolean;
    batteryBrand?: "ecuador" | "bosch";
    priceWithTradeIn?: number;
    priceWithoutTradeIn?: number;
    discountPctWithTradeIn?: number;
    discountPctWithoutTradeIn?: number;
  }>;
  totalUsd: number;
  hasBattery?: boolean;
  totalWithTradeInUsd?: number;
  totalWithoutTradeInUsd?: number;
  includesMannolGift: boolean;
  includesFreeBatteryInstallPedernales: boolean;
}

export interface LastQuoteSnapshot {
  intentTag: string;
  options: QuotedOptionSnapshot[];
  selectedOptionIndex?: number | null;
  batteryTradeIn?: boolean | null;
  updatedAt: string;
}

export interface CustomerRecord {
  phoneOrSession: string;
  name: string | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  lastQuote: LastQuoteSnapshot | null;
  commercialState: CommercialState | null;
  needsHuman?: boolean;
  escalationReason?: string | null;
  escalationSummary?: string | null;
  escalationUrgency?: EscalationUrgency | null;
  escalatedAt?: string | null;
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

export interface OrderRecord {
  id: number;
  sessionId: string;
  customerName: string | null;
  phone: string | null;
  vehicle: VehicleProfile | null;
  itemsJson: Array<{
    sku: string;
    name: string;
    unitPriceIva: number;
    qty?: number;
  }>;
  totalUsd: number;
  deliveryAddress: string | null;
  paymentMethod: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  receiptMediaId: string | null;
  receiptReference: string | null;
  receiptReceivedAt: string | null;
  paymentVerifiedAt: string | null;
  dispatchNotifiedAt: string | null;
  createdAt: string;
}

export interface UpsertCustomerInput {
  phoneOrSession: string;
  name?: string | null;
  activeVehicle?: VehicleProfile | null;
  city?: string | null;
  customerType?: CustomerType;
  lastQuote?: LastQuoteSnapshot | null;
  commercialState?: CommercialState | null;
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

export interface InsertOrderInput {
  sessionId: string;
  customerName: string | null;
  phone: string | null;
  vehicle: VehicleProfile | null;
  itemsJson: Array<{
    sku: string;
    name: string;
    unitPriceIva: number;
    qty?: number;
  }>;
  totalUsd: number;
  deliveryAddress: string | null;
  paymentMethod: string | null;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  receiptMediaId?: string | null;
  receiptReference?: string | null;
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

export interface AdminChatTurnItem {
  messageId: number;
  sessionId: string;
  channel: ChannelType;
  customerName: string | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  userPrompt: string | null;
  hermesReply: string;
  skusUsed: string[];
  quotedTotalUsd: number | null;
  latencyMs: number | null;
  intentTag: string | null;
  qaFlag: QaFlag | null;
  qaNote: string | null;
  createdAt: string;
}

export interface AdminDashboardSnapshot {
  storageMode: "postgres" | "local_fallback";
  orders: OrderRecord[];
  escalations: HumanEscalationRecord[];
  chatTurns: AdminChatTurnItem[];
  audit: WeeklyAuditReport;
}

interface FallbackStoreData {
  nextMessageId: number;
  nextAuditId: number;
  nextOrderId: number;
  customers: Record<string, CustomerRecord>;
  messages: StoredMessageRecord[];
  orders: OrderRecord[];
  vehicleSpecCache?: Record<string, VehicleSpecCacheEntry>;
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
    nextOrderId: 1,
    customers: {},
    messages: [],
    orders: [],
    weeklyAudits: [],
  };

  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(FALLBACK_FILE_PATH, "utf8")) as Partial<FallbackStoreData>;
      g.__hermesFallbackStore = {
        nextMessageId: Number(parsed.nextMessageId || 1),
        nextAuditId: Number(parsed.nextAuditId || 1),
        nextOrderId: Number(parsed.nextOrderId || 1),
        customers: parsed.customers || {},
        messages: Array.isArray(parsed.messages) ? parsed.messages.slice(-4000) : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders.slice(-500) : [],
        weeklyAudits: Array.isArray(parsed.weeklyAudits) ? parsed.weeklyAudits.slice(-50) : [],
      };
      return g.__hermesFallbackStore;
    }
  } catch {
    // Inicia store limpio en memoria si el temporal está corrupto
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
    // Mantiene estado en memoria cálida si disco no permite escritura
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
          last_quote JSONB,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        ALTER TABLE customers ADD COLUMN IF NOT EXISTS last_quote JSONB;
        ALTER TABLE customers ADD COLUMN IF NOT EXISTS commercial_state JSONB;
        ALTER TABLE customers ADD COLUMN IF NOT EXISTS needs_human BOOLEAN NOT NULL DEFAULT FALSE;
        ALTER TABLE customers ADD COLUMN IF NOT EXISTS escalation_reason TEXT;
        ALTER TABLE customers ADD COLUMN IF NOT EXISTS escalation_summary TEXT;
        ALTER TABLE customers ADD COLUMN IF NOT EXISTS escalation_urgency TEXT;
        ALTER TABLE customers ADD COLUMN IF NOT EXISTS escalated_at TIMESTAMPTZ;

        CREATE INDEX IF NOT EXISTS idx_hermes_customers_needs_human
          ON customers (needs_human, escalated_at DESC) WHERE needs_human = TRUE;

        CREATE TABLE IF NOT EXISTS vehicle_spec_cache (
          cache_key TEXT PRIMARY KEY,
          vehicle_label TEXT NOT NULL,
          query_text TEXT NOT NULL,
          spec_summary TEXT NOT NULL,
          source_label TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS webhook_dedup (
          dedup_key TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_hermes_webhook_dedup_created
          ON webhook_dedup (created_at);

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

        CREATE TABLE IF NOT EXISTS orders (
          id BIGSERIAL PRIMARY KEY,
          session_id TEXT NOT NULL,
          customer_name TEXT,
          phone TEXT,
          vehicle JSONB,
          items_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          total_usd NUMERIC(10, 2) NOT NULL DEFAULT 0,
          delivery_address TEXT,
          payment_method TEXT,
          status TEXT NOT NULL DEFAULT 'pending_dispatch',
          payment_status TEXT NOT NULL DEFAULT 'not_applicable',
          receipt_media_id TEXT,
          receipt_reference TEXT,
          receipt_received_at TIMESTAMPTZ,
          payment_verified_at TIMESTAMPTZ,
          dispatch_notified_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'not_applicable';
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS receipt_media_id TEXT;
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS receipt_reference TEXT;
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS receipt_received_at TIMESTAMPTZ;
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMPTZ;
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS dispatch_notified_at TIMESTAMPTZ;

        CREATE INDEX IF NOT EXISTS idx_hermes_orders_status_created
          ON orders (status, created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_hermes_orders_payment_status
          ON orders (payment_status, created_at DESC);

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
  const rawUrg = String(row.escalation_urgency || "").toLowerCase();
  const escalationUrgency: EscalationUrgency | null =
    rawUrg === "alta" || rawUrg === "media" || rawUrg === "baja" ? rawUrg : null;
  return {
    phoneOrSession: String(row.phone_or_session || ""),
    name: typeof row.name === "string" ? row.name : null,
    activeVehicle: (row.active_vehicle as VehicleProfile | null) ?? null,
    city: typeof row.city === "string" ? row.city : null,
    customerType: (row.customer_type as CustomerType) || "particular",
    lastQuote: (row.last_quote as LastQuoteSnapshot | null) ?? null,
    commercialState: (row.commercial_state as CommercialState | null) ?? null,
    needsHuman: Boolean(row.needs_human),
    escalationReason: typeof row.escalation_reason === "string" ? row.escalation_reason : null,
    escalationSummary: typeof row.escalation_summary === "string" ? row.escalation_summary : null,
    escalationUrgency,
    escalatedAt: row.escalated_at ? new Date(String(row.escalated_at)).toISOString() : null,
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
    quotedTotalUsd:
      row.quoted_total_usd !== null && row.quoted_total_usd !== undefined
        ? Number(row.quoted_total_usd)
        : null,
    latencyMs:
      row.latency_ms !== null && row.latency_ms !== undefined ? Number(row.latency_ms) : null,
    intentTag: typeof row.intent_tag === "string" ? row.intent_tag : null,
    qaFlag: row.qa_flag === "good" || row.qa_flag === "fix" ? row.qa_flag : null,
    qaNote: typeof row.qa_note === "string" ? row.qa_note : null,
    createdAt: row.created_at ? new Date(String(row.created_at)).toISOString() : new Date().toISOString(),
  };
}

const ORDER_SELECT_COLS = `id, session_id, customer_name, phone, vehicle, items_json,
  total_usd, delivery_address, payment_method, status,
  payment_status, receipt_media_id, receipt_reference,
  receipt_received_at, payment_verified_at, dispatch_notified_at, created_at`;

function mapPgOrderRow(row: Record<string, unknown>): OrderRecord {
  const rawItems = Array.isArray(row.items_json)
    ? (row.items_json as OrderRecord["itemsJson"])
    : [];
  const rawStatus = String(row.status || "pending_dispatch");
  const validStatuses: OrderStatus[] = [
    "pending_dispatch",
    "awaiting_payment",
    "payment_pending_verification",
    "ready_for_dispatch",
    "dispatched",
    "completed",
    "cancelled",
  ];
  const status: OrderStatus = validStatuses.includes(rawStatus as OrderStatus)
    ? (rawStatus as OrderStatus)
    : "pending_dispatch";

  const rawPayStatus = String(row.payment_status || "not_applicable");
  const validPayStatuses: PaymentStatus[] = [
    "not_applicable",
    "awaiting_receipt",
    "pending_verification",
    "verified",
    "rejected",
  ];
  const paymentStatus: PaymentStatus = validPayStatuses.includes(rawPayStatus as PaymentStatus)
    ? (rawPayStatus as PaymentStatus)
    : "not_applicable";

  return {
    id: Number(row.id),
    sessionId: String(row.session_id || ""),
    customerName: typeof row.customer_name === "string" ? row.customer_name : null,
    phone: typeof row.phone === "string" ? row.phone : null,
    vehicle: (row.vehicle as VehicleProfile | null) ?? null,
    itemsJson: rawItems,
    totalUsd: Number(row.total_usd || 0),
    deliveryAddress: typeof row.delivery_address === "string" ? row.delivery_address : null,
    paymentMethod: typeof row.payment_method === "string" ? row.payment_method : null,
    status,
    paymentStatus,
    receiptMediaId: typeof row.receipt_media_id === "string" ? row.receipt_media_id : null,
    receiptReference: typeof row.receipt_reference === "string" ? row.receipt_reference : null,
    receiptReceivedAt: row.receipt_received_at ? new Date(String(row.receipt_received_at)).toISOString() : null,
    paymentVerifiedAt: row.payment_verified_at ? new Date(String(row.payment_verified_at)).toISOString() : null,
    dispatchNotifiedAt: row.dispatch_notified_at ? new Date(String(row.dispatch_notified_at)).toISOString() : null,
    createdAt: row.created_at ? new Date(String(row.created_at)).toISOString() : new Date().toISOString(),
  };
}

export async function sendTelegramAlert(text: string): Promise<boolean> {
  const token = (process.env.TELEGRAM_BOT_TOKEN || "").trim();
  const chatId = (process.env.TELEGRAM_CHAT_ID || "").trim();
  if (!token || !chatId || !text.trim()) return false;

  try {
    const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.slice(0, 3900),
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(3500),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

export async function getCustomer(phoneOrSession: string): Promise<CustomerRecord | null> {
  const key = phoneOrSession.trim();
  if (!key) return null;

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `SELECT phone_or_session, name, active_vehicle, city, customer_type, last_quote, commercial_state,
                needs_human, escalation_reason, escalation_summary, escalation_urgency, escalated_at, updated_at
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
      const clearLastQuote = input.lastQuote === null;
      const nextLastQuote = input.lastQuote !== undefined ? input.lastQuote : existing?.lastQuote ?? null;
      const nextCommercialState =
        input.commercialState !== undefined ? input.commercialState : existing?.commercialState ?? null;

      const { rows } = await pool.query<Record<string, unknown>>(
        `INSERT INTO customers (phone_or_session, name, active_vehicle, city, customer_type, last_quote, commercial_state, updated_at)
         VALUES ($1, $2, $3::jsonb, $4, $5, $6::jsonb, $7::jsonb, NOW())
         ON CONFLICT (phone_or_session) DO UPDATE SET
           name = COALESCE(EXCLUDED.name, customers.name),
           active_vehicle = COALESCE(EXCLUDED.active_vehicle, customers.active_vehicle),
           city = COALESCE(EXCLUDED.city, customers.city),
           customer_type = COALESCE(EXCLUDED.customer_type, customers.customer_type),
           last_quote = CASE WHEN $8 THEN NULL ELSE COALESCE(EXCLUDED.last_quote, customers.last_quote) END,
           commercial_state = COALESCE(EXCLUDED.commercial_state, customers.commercial_state),
           updated_at = NOW()
         RETURNING phone_or_session, name, active_vehicle, city, customer_type, last_quote, commercial_state, updated_at`,
        [
          key,
          nextName,
          nextVehicle ? JSON.stringify(nextVehicle) : null,
          nextCity,
          nextType,
          nextLastQuote ? JSON.stringify(nextLastQuote) : null,
          nextCommercialState ? JSON.stringify(nextCommercialState) : null,
          clearLastQuote,
        ]
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
    lastQuote: input.lastQuote !== undefined ? input.lastQuote : prev?.lastQuote ?? null,
    commercialState: input.commercialState !== undefined ? input.commercialState : prev?.commercialState ?? null,
    updatedAt: nowIso,
  };
  store.customers[key] = record;
  persistFallbackStore(store);
  return record;
}

export async function getRecentMessages(sessionId: string, limit = 30): Promise<StoredMessageRecord[]> {
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
  const total =
    typeof input.quotedTotalUsd === "number" && Number.isFinite(input.quotedTotalUsd)
      ? Number(input.quotedTotalUsd.toFixed(2))
      : null;
  const latency =
    typeof input.latencyMs === "number" && Number.isFinite(input.latencyMs)
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

export async function insertOrder(input: InsertOrderInput): Promise<{ order: OrderRecord; telegramSent: boolean }> {
  const total = Number(Number(input.totalUsd || 0).toFixed(2));
  const status: OrderStatus = input.status || "pending_dispatch";
  const paymentStatus: PaymentStatus = input.paymentStatus || "not_applicable";
  let savedOrder: OrderRecord | null = null;

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `INSERT INTO orders (
           session_id, customer_name, phone, vehicle, items_json,
           total_usd, delivery_address, payment_method, status,
           payment_status, receipt_media_id, receipt_reference, created_at
         )
         VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7, $8, $9, $10, $11, $12, NOW())
         RETURNING ${ORDER_SELECT_COLS}`,
        [
          input.sessionId.trim(),
          input.customerName,
          input.phone,
          input.vehicle ? JSON.stringify(input.vehicle) : null,
          JSON.stringify(input.itemsJson || []),
          total,
          input.deliveryAddress,
          input.paymentMethod,
          status,
          paymentStatus,
          input.receiptMediaId ?? null,
          input.receiptReference ?? null,
        ]
      );
      if (rows.length > 0) {
        savedOrder = mapPgOrderRow(rows[0]);
      }
    }
  } catch (err) {
    console.warn("[HermesDB] insertOrder fallback:", err instanceof Error ? err.message : String(err));
  }

  if (!savedOrder) {
    const store = loadFallbackStore();
    savedOrder = {
      id: store.nextOrderId++,
      sessionId: input.sessionId.trim(),
      customerName: input.customerName,
      phone: input.phone,
      vehicle: input.vehicle,
      itemsJson: input.itemsJson || [],
      totalUsd: total,
      deliveryAddress: input.deliveryAddress,
      paymentMethod: input.paymentMethod,
      status,
      paymentStatus,
      receiptMediaId: input.receiptMediaId ?? null,
      receiptReference: input.receiptReference ?? null,
      receiptReceivedAt: null,
      paymentVerifiedAt: null,
      dispatchNotifiedAt: null,
      createdAt: new Date().toISOString(),
    };
    store.orders.push(savedOrder);
    if (store.orders.length > 500) {
      store.orders = store.orders.slice(-500);
    }
    persistFallbackStore(store);
  }

  const vStr = savedOrder.vehicle
    ? [savedOrder.vehicle.make, savedOrder.vehicle.model, savedOrder.vehicle.year, savedOrder.vehicle.fuel]
        .filter(Boolean)
        .join(" ")
    : "No especificado";
  const itemsList = savedOrder.itemsJson.map((i) => `• ${i.name} ($${Number(i.unitPriceIva).toFixed(2)})`).join("\n");
  const headerTag =
    savedOrder.paymentStatus === "awaiting_receipt"
      ? `💳 *NUEVO PEDIDO MILO #${savedOrder.id} — ESPERANDO COMPROBANTE (NO DESPACHAR)*`
      : `🚨 *NUEVO PEDIDO MILO #${savedOrder.id} — DESPACHO INMEDIATO*`;
  const alertText =
    `${headerTag}\n` +
    `👤 *Cliente:* ${savedOrder.customerName || "Por confirmar"} (${savedOrder.phone || savedOrder.sessionId})\n` +
    `🚗 *Vehículo:* ${vStr}\n` +
    `📍 *Dirección:* ${savedOrder.deliveryAddress || "Por confirmar"}\n` +
    `💳 *Pago:* ${savedOrder.paymentMethod || "Por confirmar"} (${savedOrder.paymentStatus})\n` +
    `🛒 *Items:*\n${itemsList}\n` +
    `💵 *Total c/IVA:* *$${savedOrder.totalUsd.toFixed(2)}*`;

  const telegramSent = await sendTelegramAlert(alertText);
  return { order: savedOrder, telegramSent };
}

export async function listOrders(limit = 60): Promise<OrderRecord[]> {
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `SELECT ${ORDER_SELECT_COLS}
         FROM orders
         ORDER BY CASE
           WHEN payment_status = 'pending_verification' OR status = 'payment_pending_verification' THEN 0
           WHEN status IN ('pending_dispatch', 'ready_for_dispatch') THEN 1
           WHEN status = 'awaiting_payment' THEN 2
           ELSE 3
         END, created_at DESC, id DESC
         LIMIT $1`,
        [limit]
      );
      return rows.map(mapPgOrderRow);
    }
  } catch (err) {
    console.warn("[HermesDB] listOrders fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  const rank = (o: OrderRecord) =>
    o.paymentStatus === "pending_verification" || o.status === "payment_pending_verification"
      ? 0
      : o.status === "pending_dispatch" || o.status === "ready_for_dispatch"
      ? 1
      : o.status === "awaiting_payment"
      ? 2
      : 3;
  return [...store.orders]
    .sort((a, b) => {
      const diff = rank(a) - rank(b);
      if (diff !== 0) return diff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, limit);
}

export async function getOrderById(orderId: number): Promise<OrderRecord | null> {
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `SELECT ${ORDER_SELECT_COLS} FROM orders WHERE id = $1 LIMIT 1`,
        [orderId]
      );
      return rows.length > 0 ? mapPgOrderRow(rows[0]) : null;
    }
  } catch (err) {
    console.warn("[HermesDB] getOrderById fallback:", err instanceof Error ? err.message : String(err));
  }
  const store = loadFallbackStore();
  return store.orders.find((o) => o.id === orderId) || null;
}

export async function getLatestOrderNeedingReceipt(sessionId: string): Promise<OrderRecord | null> {
  const key = sessionId.trim();
  if (!key) return null;
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `SELECT ${ORDER_SELECT_COLS}
         FROM orders
         WHERE session_id = $1
           AND payment_status IN ('awaiting_receipt', 'rejected')
           AND status NOT IN ('cancelled', 'completed')
         ORDER BY created_at DESC, id DESC
         LIMIT 1`,
        [key]
      );
      return rows.length > 0 ? mapPgOrderRow(rows[0]) : null;
    }
  } catch (err) {
    console.warn("[HermesDB] getLatestOrderNeedingReceipt fallback:", err instanceof Error ? err.message : String(err));
  }
  const store = loadFallbackStore();
  const candidates = store.orders.filter(
    (o) =>
      o.sessionId === key &&
      (o.paymentStatus === "awaiting_receipt" || o.paymentStatus === "rejected") &&
      o.status !== "cancelled" &&
      o.status !== "completed"
  );
  return candidates.length > 0 ? candidates[candidates.length - 1] : null;
}

export async function markOrderReceiptPendingVerification(params: {
  orderId: number;
  mediaId?: string | null;
  reference?: string | null;
}): Promise<OrderRecord | null> {
  const cleanRef = (params.reference || "Comprobante recibido").trim().slice(0, 260);
  const cleanMedia = params.mediaId ? params.mediaId.trim().slice(0, 180) : null;
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `UPDATE orders
         SET status = 'payment_pending_verification',
             payment_status = 'pending_verification',
             receipt_media_id = COALESCE($2, receipt_media_id),
             receipt_reference = $3,
             receipt_received_at = NOW()
         WHERE id = $1
         RETURNING ${ORDER_SELECT_COLS}`,
        [params.orderId, cleanMedia, cleanRef]
      );
      return rows.length > 0 ? mapPgOrderRow(rows[0]) : null;
    }
  } catch (err) {
    console.warn("[HermesDB] markOrderReceiptPendingVerification fallback:", err instanceof Error ? err.message : String(err));
  }
  const store = loadFallbackStore();
  const found = store.orders.find((o) => o.id === params.orderId);
  if (!found) return null;
  found.status = "payment_pending_verification";
  found.paymentStatus = "pending_verification";
  found.receiptMediaId = cleanMedia || found.receiptMediaId;
  found.receiptReference = cleanRef;
  found.receiptReceivedAt = new Date().toISOString();
  persistFallbackStore(store);
  return found;
}

export async function approveOrderPayment(orderId: number): Promise<OrderRecord | null> {
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `UPDATE orders
         SET payment_status = 'verified',
             status = 'ready_for_dispatch',
             payment_verified_at = NOW(),
             dispatch_notified_at = NOW()
         WHERE id = $1
         RETURNING ${ORDER_SELECT_COLS}`,
        [orderId]
      );
      return rows.length > 0 ? mapPgOrderRow(rows[0]) : null;
    }
  } catch (err) {
    console.warn("[HermesDB] approveOrderPayment fallback:", err instanceof Error ? err.message : String(err));
  }
  const store = loadFallbackStore();
  const found = store.orders.find((o) => o.id === orderId);
  if (!found) return null;
  const now = new Date().toISOString();
  found.paymentStatus = "verified";
  found.status = "ready_for_dispatch";
  found.paymentVerifiedAt = now;
  found.dispatchNotifiedAt = now;
  persistFallbackStore(store);
  return found;
}

export async function rejectOrderPayment(orderId: number, reason?: string | null): Promise<OrderRecord | null> {
  const cleanNote = reason ? `Rechazado: ${reason.trim().slice(0, 220)}` : "Rechazado: comprobante incompleto o sin acreditación";
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `UPDATE orders
         SET payment_status = 'rejected',
             status = 'awaiting_payment',
             receipt_reference = $2
         WHERE id = $1
         RETURNING ${ORDER_SELECT_COLS}`,
        [orderId, cleanNote]
      );
      return rows.length > 0 ? mapPgOrderRow(rows[0]) : null;
    }
  } catch (err) {
    console.warn("[HermesDB] rejectOrderPayment fallback:", err instanceof Error ? err.message : String(err));
  }
  const store = loadFallbackStore();
  const found = store.orders.find((o) => o.id === orderId);
  if (!found) return null;
  found.paymentStatus = "rejected";
  found.status = "awaiting_payment";
  found.receiptReference = cleanNote;
  persistFallbackStore(store);
  return found;
}

export async function updateOrderStatus(
  orderId: number,
  status: OrderStatus
): Promise<{ ok: boolean; order?: OrderRecord }> {
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `UPDATE orders
         SET status = $2
         WHERE id = $1
         RETURNING ${ORDER_SELECT_COLS}`,
        [orderId, status]
      );
      if (rows.length > 0) return { ok: true, order: mapPgOrderRow(rows[0]) };
      return { ok: false };
    }
  } catch (err) {
    console.warn("[HermesDB] updateOrderStatus fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  const found = store.orders.find((o) => o.id === orderId);
  if (!found) return { ok: false };
  found.status = status;
  persistFallbackStore(store);
  return { ok: true, order: found };
}

export async function sendWhatsAppTextDirect(toPhone: string, text: string): Promise<boolean> {
  const token = (process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_TOKEN || "").trim();
  const phoneId = META_CONFIG.phoneNumberId247;
  const cleanTo = (toPhone || "").replace(/[^\d]/g, "");
  if (!token || !phoneId || !cleanTo || !text.trim()) return false;

  try {
    const resp = await fetch(`https://graph.facebook.com/${META_CONFIG.graphVersion}/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: cleanTo,
        type: "text",
        text: { body: text.slice(0, 3900) },
      }),
      signal: AbortSignal.timeout(5000),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

/**
 * Doble notificación simultánea (ADMIN_NOTIFY_PHONE + COUNTER_NOTIFY_PHONE + Telegram)
 * cuando llega un comprobante de transferencia pendiente por verificar.
 */
export async function notifyReceiptPendingVerification(order: OrderRecord): Promise<{
  adminWaSent: boolean;
  counterWaSent: boolean;
  telegramSent: boolean;
}> {
  const itemsList = order.itemsJson
    .map((i) => `• ${i.qty || 1}x ${i.name} ($${Number(i.unitPriceIva).toFixed(2)})`)
    .join("\n");
  const alertText =
    `⏳ *COMPROBANTE PENDIENTE POR VERIFICAR (NO CONFIRMADO)*\n` +
    `🧾 *Pedido:* #${order.id}\n` +
    `👤 *Cliente:* ${order.customerName || "Por confirmar"} (${order.phone || order.sessionId})\n` +
    `💵 *Monto exacto c/IVA:* *$${order.totalUsd.toFixed(2)}*\n` +
    `🏦 *Cuenta destino:* ${OFFICIAL_BANK_ACCOUNT.bank} ${OFFICIAL_BANK_ACCOUNT.accountNumber} (${OFFICIAL_BANK_ACCOUNT.holderName})\n` +
    `📎 *Referencia / Archivo:* ${order.receiptReference || order.receiptMediaId || "Adjunto recibido"}\n` +
    `📍 *Entrega:* ${order.deliveryAddress || "Por confirmar"}\n` +
    `🛒 *Detalle:*\n${itemsList}\n\n` +
    `⚠️ Verificar acreditación real antes de autorizar despacho o retiro desde /admin-hermes.`;

  const adminPhone = (process.env.ADMIN_NOTIFY_PHONE || "").replace(/[^\d]/g, "");
  const counterPhone = (process.env.COUNTER_NOTIFY_PHONE || "").replace(/[^\d]/g, "");

  const [adminWaSent, counterWaSent, telegramSent] = await Promise.all([
    adminPhone ? sendWhatsAppTextDirect(adminPhone, alertText) : Promise.resolve(false),
    counterPhone && counterPhone !== adminPhone
      ? sendWhatsAppTextDirect(counterPhone, alertText)
      : Promise.resolve(false),
    sendTelegramAlert(alertText),
  ]);

  return { adminWaSent, counterWaSent, telegramSent };
}

export function buildApprovedDispatchMessage(order: OrderRecord): string {
  const addr = order.deliveryAddress || "Pedernales";
  const isPickup = /retiro\s+en\s+(bodega|tienda|local)/i.test(addr);
  const isNational = /env[ií]o\s+nacional|cooperativa|servientrega|tramaco/i.test(addr);
  const itemsText = order.itemsJson
    .map((i) => `• ${i.qty || 1}x ${i.name} — $${Number(i.unitPriceIva).toFixed(2)}`)
    .join("\n");

  const deliveryInstructions = isPickup
    ? `🏪 *Retiro autorizado en local:* Pedernales, Vía al Carmen (frente a la gasolinera).\n🕒 *Horario:* Lunes a Sábado de 08:00 a 18:00.\nSolo indica tu nombre (*${order.customerName || "titular"}*) y *Pedido #${order.id}* en mostrador.`
    : isNational
    ? `🚚 *Despacho nacional autorizado:* ${addr}.\nNuestro equipo embala tu pedido hoy mismo y te comparte la foto de la guía de envío apenas salga.`
    : `🚚 *Despacho a domicilio autorizado en Pedernales:* ${addr}.\nNuestro equipo sale a coordinar la entrega contigo hoy mismo.`;

  return (
    `✅ *¡Pago verificado! Pedido #${order.id} aprobado para despacho*\n\n` +
    `Hola${order.customerName ? ` ${order.customerName}` : ""}, confirmamos la acreditación de tu transferencia por *$${order.totalUsd.toFixed(2)}* con IVA.\n\n` +
    `📦 *Detalle:*\n${itemsText}\n\n` +
    `${deliveryInstructions}\n\n` +
    `Gracias por comprar en *LíderPro Pedernales* (factura electrónica SRI incluida).`
  );
}

export function buildRejectedPaymentMessage(order: OrderRecord, reason?: string | null): string {
  const detail = reason?.trim()
    ? `Motivo indicado por verificación: _${reason.trim()}_.`
    : "El comprobante enviado aún no refleja acreditación en nuestra cuenta de Banco Pichincha o está incompleto.";
  return (
    `⚠️ *Actualización de tu Pedido #${order.id} ($${order.totalUsd.toFixed(2)})*\n\n` +
    `${detail}\n\n` +
    `Por favor envíanos nuevamente la *captura completa del comprobante* (donde se vea fecha, monto, número de comprobante y titular *${OFFICIAL_BANK_ACCOUNT.holderName}* — Banco Pichincha *${OFFICIAL_BANK_ACCOUNT.accountNumber}*) para completar la verificación y liberar tu despacho o retiro.`
  );
}

const OUT_OF_STOCK_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "Líquido de Frenos DOT", regex: /\b(liquido\s+de\s+frenos?|dot\s*[345])\b/i },
  { label: "Llantas / Neumáticos", regex: /\b(llantas?|neumaticos?|cauchos?|rin(?:es)?\s*\d*|aros?)\b/i },
  { label: "Pastillas / Zapatas / Discos de Freno", regex: /\b(pastillas?|balatas?|zapatas?|discos?\s+de\s+freno|tambores?)\b/i },
  { label: "Parabrisas / Vidrios / Plumillas", regex: /\b(parabrisas?|vidrios?|plumillas?|limpiaparabrisas?)\b/i },
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
        "Revisar los casos marcados en [Corregir] con mención de precio/total y ajustar reglas de emparejamiento."
      );
    }
    if (hasVehicleComplaint) {
      recs.push(
        "Reforzar sinónimos vehiculares y grupos de amperaje en src/lib/hermesCatalog.ts."
      );
    }
    recs.push(
      `Auditar ${params.flaggedFailures.length} respuesta(s) marcada(s) con [⚠️ Corregir] y ajustar reglas si persiste el patrón.`
    );
  }

  if (params.avgLatencyMs !== null && params.avgLatencyMs > 3000) {
    recs.push(
      `Latencia promedio en ${params.avgLatencyMs} ms; revisar tiempo de respuesta del proveedor LLM.`
    );
  }

  if (recs.length === 0) {
    recs.push(
      params.totalChats === 0
        ? "Sin volumen suficiente en los últimos 7 días; ejecutar pruebas en /demo-whatsapp o esperar tráfico orgánico."
        : "Operación estable esta semana: 0 fallos QA críticos registrados."
    );
  }

  return recs;
}

async function loadMessagesAndCustomersSince(
  periodStart: Date
): Promise<{
  storageMode: "postgres" | "local_fallback";
  messages: StoredMessageRecord[];
  customers: CustomerRecord[];
}> {
  try {
    const pool = await getPool();
    if (pool) {
      const msgRes = await pool.query<Record<string, unknown>>(
        `SELECT id, session_id, channel, role, content, skus_used, quoted_total_usd,
                latency_ms, intent_tag, qa_flag, qa_note, created_at
         FROM messages
         WHERE created_at >= $1
         ORDER BY created_at ASC, id ASC`,
        [periodStart.toISOString()]
      );
      const custRes = await pool.query<Record<string, unknown>>(
        `SELECT phone_or_session, name, active_vehicle, city, customer_type, last_quote, commercial_state,
                needs_human, escalation_reason, escalation_summary, escalation_urgency, escalated_at, updated_at
         FROM customers`
      );
      return {
        storageMode: "postgres",
        messages: msgRes.rows.map(mapPgMessageRow),
        customers: custRes.rows.map(mapPgCustomerRow),
      };
    }
  } catch (err) {
    console.warn("[HermesDB] loadMessagesAndCustomersSince fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  const minTs = periodStart.getTime();
  return {
    storageMode: "local_fallback",
    messages: store.messages.filter((m) => new Date(m.createdAt).getTime() >= minTs),
    customers: Object.values(store.customers),
  };
}

function buildWeeklyAuditFromData(params: {
  storageMode: "postgres" | "local_fallback";
  messages: StoredMessageRecord[];
  customers: CustomerRecord[];
  periodStart: Date;
  periodEnd: Date;
  safeDays: number;
}): WeeklyAuditReport {
  const { storageMode, messages, customers, periodStart, periodEnd, safeDays } = params;
  const sessionSet = new Set<string>();
  const channelsBreakdown: Record<string, number> = {};
  const intentsBreakdown: Record<string, number> = {};
  const latencies: number[] = [];

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
    } else if (m.role === "assistant" && m.qaFlag === "fix") {
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

  const unmappedCounts = new Map<string, number>();
  const minTs = periodStart.getTime();
  for (const c of customers) {
    if (new Date(c.updatedAt).getTime() < minTs) continue;
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

  return {
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
}

export async function generateAndSaveWeeklyAudit(
  days = 7,
  options: { notifyTelegram?: boolean } = {}
): Promise<{ report: WeeklyAuditReport; telegramSent: boolean }> {
  const safeDays = Math.max(1, Math.min(90, Math.round(days)));
  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - safeDays * 24 * 60 * 60 * 1000);

  const { storageMode, messages, customers } = await loadMessagesAndCustomersSince(periodStart);
  const report = buildWeeklyAuditFromData({
    storageMode,
    messages,
    customers,
    periodStart,
    periodEnd,
    safeDays,
  });

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
    }
  } catch (err) {
    console.warn("[HermesDB] insert weekly_audits fallback:", err instanceof Error ? err.message : String(err));
  }

  if (report.auditId === null && report.storageMode === "local_fallback") {
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
  }

  let telegramSent = false;
  if (options.notifyTelegram) {
    const topOos = report.outOfStockRanking
      .slice(0, 3)
      .map((o) => `• ${o.term}: ${o.count}`)
      .join("\n") || "• Ninguno";
    const tgText =
      `📊 *AUDITORÍA SEMANAL MILO (${safeDays} días)*\n` +
      `• *Chats activos:* ${report.totalChats} (${report.totalMessages} mensajes)\n` +
      `• *Alertas [⚠️ Corregir]:* ${report.flaggedFailures.length}\n` +
      `• *Latencia promedio:* ${report.avgLatencyMs ?? "N/D"} ms\n` +
      `• *Top sin stock:*\n${topOos}\n` +
      `• *Recomendación:* ${report.recommendations[0] || "Sin novedades"}`;
    telegramSent = await sendTelegramAlert(tgText);
  }

  return { report, telegramSent };
}

export async function getAdminDashboardSnapshot(params: {
  channel?: string;
  onlyFix?: boolean;
  days?: number;
} = {}): Promise<AdminDashboardSnapshot> {
  const safeDays = Math.max(1, Math.min(90, Math.round(params.days || 7)));
  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - safeDays * 24 * 60 * 60 * 1000);

  const [{ storageMode, messages, customers }, orders] = await Promise.all([
    loadMessagesAndCustomersSince(periodStart),
    listOrders(60),
  ]);

  const customerByKey = new Map<string, CustomerRecord>();
  for (const c of customers) customerByKey.set(c.phoneOrSession, c);

  const audit = buildWeeklyAuditFromData({
    storageMode,
    messages,
    customers,
    periodStart,
    periodEnd,
    safeDays,
  });

  const lastUserBySession = new Map<string, string>();
  const turns: AdminChatTurnItem[] = [];

  for (const m of messages) {
    if (m.role === "user") {
      lastUserBySession.set(m.sessionId, m.content);
      continue;
    }
    const cust = customerByKey.get(m.sessionId);
    turns.push({
      messageId: m.id,
      sessionId: m.sessionId,
      channel: m.channel,
      customerName: cust?.name ?? null,
      activeVehicle: cust?.activeVehicle ?? null,
      city: cust?.city ?? null,
      userPrompt: lastUserBySession.get(m.sessionId) || null,
      hermesReply: m.content,
      skusUsed: m.skusUsed,
      quotedTotalUsd: m.quotedTotalUsd,
      latencyMs: m.latencyMs,
      intentTag: m.intentTag,
      qaFlag: m.qaFlag,
      qaNote: m.qaNote,
      createdAt: m.createdAt,
    });
  }

  const chFilter = (params.channel || "all").toLowerCase();
  const filteredTurns = turns
    .filter((t) => (chFilter === "all" ? true : t.channel === chFilter))
    .filter((t) => (params.onlyFix ? t.qaFlag === "fix" : true))
    .reverse()
    .slice(0, 120);

  const escalations: HumanEscalationRecord[] = customers
    .filter((c) => Boolean(c.needsHuman))
    .map((c) => ({
      sessionId: c.phoneOrSession,
      customerName: c.name,
      activeVehicle: c.activeVehicle,
      city: c.city,
      customerType: c.customerType,
      reason: c.escalationReason || "Escalamiento solicitado",
      summary: c.escalationSummary || null,
      urgency: c.escalationUrgency || "alta",
      escalatedAt: c.escalatedAt || c.updatedAt,
    }))
    .sort((a, b) => new Date(b.escalatedAt).getTime() - new Date(a.escalatedAt).getTime());

  return {
    storageMode,
    orders,
    escalations,
    chatTurns: filteredTurns,
    audit,
  };
}

export async function flagCustomerHumanEscalation(input: {
  phoneOrSession: string;
  reason: string;
  summary: string;
  urgency: EscalationUrgency;
  customerName?: string | null;
  city?: string | null;
}): Promise<{ ok: boolean; telegramSent: boolean }> {
  const key = input.phoneOrSession.trim();
  if (!key) return { ok: false, telegramSent: false };
  const safeReason = input.reason.trim().slice(0, 260) || "Atención de asesor humano";
  const safeSummary = input.summary.trim().slice(0, 600);
  const safeUrgency: EscalationUrgency =
    input.urgency === "alta" || input.urgency === "media" || input.urgency === "baja"
      ? input.urgency
      : "alta";
  const nowIso = new Date().toISOString();

  try {
    const pool = await getPool();
    if (pool) {
      await pool.query(
        `INSERT INTO customers (
           phone_or_session, name, city, needs_human, escalation_reason,
           escalation_summary, escalation_urgency, escalated_at, updated_at
         )
         VALUES ($1, $2, $3, TRUE, $4, $5, $6, NOW(), NOW())
         ON CONFLICT (phone_or_session) DO UPDATE SET
           name = COALESCE(EXCLUDED.name, customers.name),
           city = COALESCE(EXCLUDED.city, customers.city),
           needs_human = TRUE,
           escalation_reason = EXCLUDED.escalation_reason,
           escalation_summary = EXCLUDED.escalation_summary,
           escalation_urgency = EXCLUDED.escalation_urgency,
           escalated_at = NOW(),
           updated_at = NOW()`,
        [key, input.customerName ?? null, input.city ?? null, safeReason, safeSummary, safeUrgency]
      );
    } else {
      const store = loadFallbackStore();
      const prev = store.customers[key];
      store.customers[key] = {
        phoneOrSession: key,
        name: input.customerName ?? prev?.name ?? null,
        activeVehicle: prev?.activeVehicle ?? null,
        city: input.city ?? prev?.city ?? null,
        customerType: prev?.customerType ?? "particular",
        lastQuote: prev?.lastQuote ?? null,
        commercialState: prev?.commercialState ?? null,
        needsHuman: true,
        escalationReason: safeReason,
        escalationSummary: safeSummary,
        escalationUrgency: safeUrgency,
        escalatedAt: nowIso,
        updatedAt: nowIso,
      };
      persistFallbackStore(store);
    }
  } catch (err) {
    console.warn("[HermesDB] flagCustomerHumanEscalation fallback:", err instanceof Error ? err.message : String(err));
  }

  const urgEmoji = safeUrgency === "alta" ? "🔴" : safeUrgency === "media" ? "🟠" : "🟡";
  const tgText =
    `🚨 *ESCALAMIENTO HUMANO MILO (${urgEmoji} ${safeUrgency.toUpperCase()})*\n` +
    `• *Cliente/Sesión:* ${input.customerName || "Sin nombre"} (${key})\n` +
    (input.city ? `• *Ciudad:* ${input.city}\n` : "") +
    `• *Motivo:* ${safeReason}\n` +
    `• *Resumen:* ${safeSummary}\n` +
    `👉 Atender desde /admin-hermes o WhatsApp Pedernales.`;
  const telegramSent = await sendTelegramAlert(tgText);
  return { ok: true, telegramSent };
}

export async function resolveCustomerHumanEscalation(phoneOrSession: string): Promise<{ ok: boolean }> {
  const key = phoneOrSession.trim();
  if (!key) return { ok: false };

  try {
    const pool = await getPool();
    if (pool) {
      const res = await pool.query(
        `UPDATE customers
         SET needs_human = FALSE,
             escalation_reason = NULL,
             escalation_summary = NULL,
             escalation_urgency = NULL,
             escalated_at = NULL,
             updated_at = NOW()
         WHERE phone_or_session = $1`,
        [key]
      );
      return { ok: (res.rowCount ?? 0) > 0 };
    }
  } catch (err) {
    console.warn("[HermesDB] resolveCustomerHumanEscalation fallback:", err instanceof Error ? err.message : String(err));
  }

  const store = loadFallbackStore();
  if (store.customers[key]) {
    store.customers[key].needsHuman = false;
    store.customers[key].escalationReason = null;
    store.customers[key].escalationSummary = null;
    store.customers[key].escalationUrgency = null;
    store.customers[key].escalatedAt = null;
    persistFallbackStore(store);
    return { ok: true };
  }
  return { ok: false };
}

export async function getCachedVehicleSpec(cacheKey: string): Promise<VehicleSpecCacheEntry | null> {
  const key = cacheKey.trim().toLowerCase().slice(0, 180);
  if (!key) return null;
  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<Record<string, unknown>>(
        `SELECT cache_key, vehicle_label, query_text, spec_summary, source_label, created_at
         FROM vehicle_spec_cache
         WHERE cache_key = $1
         LIMIT 1`,
        [key]
      );
      if (rows.length > 0) {
        const r = rows[0];
        return {
          cacheKey: String(r.cache_key),
          vehicleLabel: String(r.vehicle_label),
          queryText: String(r.query_text),
          specSummary: String(r.spec_summary),
          sourceLabel: typeof r.source_label === "string" ? r.source_label : null,
          createdAt: r.created_at ? new Date(String(r.created_at)).toISOString() : new Date().toISOString(),
        };
      }
      return null;
    }
  } catch {
    // fallback below
  }
  const store = loadFallbackStore();
  return store.vehicleSpecCache?.[key] || null;
}

export async function setCachedVehicleSpec(entry: {
  cacheKey: string;
  vehicleLabel: string;
  queryText: string;
  specSummary: string;
  sourceLabel?: string | null;
}): Promise<void> {
  const key = entry.cacheKey.trim().toLowerCase().slice(0, 180);
  if (!key || !entry.specSummary.trim()) return;
  try {
    const pool = await getPool();
    if (pool) {
      await pool.query(
        `INSERT INTO vehicle_spec_cache (cache_key, vehicle_label, query_text, spec_summary, source_label, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (cache_key) DO UPDATE SET
           spec_summary = EXCLUDED.spec_summary,
           source_label = EXCLUDED.source_label,
           created_at = NOW()`,
        [key, entry.vehicleLabel.slice(0, 120), entry.queryText.slice(0, 160), entry.specSummary.slice(0, 900), entry.sourceLabel ?? null]
      );
      return;
    }
  } catch {
    // fallback below
  }
  const store = loadFallbackStore();
  if (!store.vehicleSpecCache) store.vehicleSpecCache = {};
  store.vehicleSpecCache[key] = {
    cacheKey: key,
    vehicleLabel: entry.vehicleLabel,
    queryText: entry.queryText,
    specSummary: entry.specSummary,
    sourceLabel: entry.sourceLabel ?? null,
    createdAt: new Date().toISOString(),
  };
  persistFallbackStore(store);
}

const warmWebhookDedup = new Set<string>();

/**
 * Reclama de forma atómica un ID de mensaje de Meta (idempotencia en memoria + Neon Postgres)
 * para evitar dobles respuestas ante reintentos o ráfagas de entrega.
 * Devuelve true solo la primera vez que se observa `dedupKey`.
 */
export async function claimWebhookMessageId(dedupKey: string): Promise<boolean> {
  const key = (dedupKey || "").trim().slice(0, 180);
  if (!key) return true;

  if (warmWebhookDedup.has(key)) return false;
  warmWebhookDedup.add(key);
  if (warmWebhookDedup.size > 2500) {
    const first = warmWebhookDedup.values().next().value;
    if (first) warmWebhookDedup.delete(first);
  }

  try {
    const pool = await getPool();
    if (pool) {
      const { rows } = await pool.query<{ dedup_key: string }>(
        `INSERT INTO webhook_dedup (dedup_key, created_at)
         VALUES ($1, NOW())
         ON CONFLICT (dedup_key) DO NOTHING
         RETURNING dedup_key`,
        [key]
      );
      if (Math.random() < 0.02) {
        void pool.query(`DELETE FROM webhook_dedup WHERE created_at < NOW() - INTERVAL '7 days'`).catch(() => {});
      }
      return rows.length > 0;
    }
  } catch {
    // Si Postgres no responde, la deduplicación en memoria cálida sigue protegiendo esta instancia
  }

  return true;
}
