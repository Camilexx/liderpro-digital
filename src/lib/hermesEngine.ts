import { META_CONFIG } from "@/data/metaConfig";
import {
  buildDeterministicQuotePlan,
  extractCityFromText,
  extractCustomerType,
  extractVehicleFromText,
  formatVehicleLabel,
  FREE_SHIPPING_THRESHOLD_USD,
  mergeVehicleProfiles,
  type DeterministicQuotePlan,
  type HermesIntentTag,
} from "@/lib/hermesCatalog";
import {
  getCustomer,
  getDbStorageMode,
  getRecentMessages,
  insertMessage,
  upsertCustomer,
  type ChannelType,
  type CustomerType,
  type VehicleProfile,
} from "@/lib/hermesDb";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface HermesReplyOptions {
  sessionId?: string;
  channel?: ChannelType;
  customerName?: string | null;
  timeoutMs?: number;
  persist?: boolean;
}

export interface HermesResult {
  reply: string;
  model: string;
  usedFallback: boolean;
  latencyMs: number;
  matchedSkus: string[];
  catalogSize: number;
  sessionId: string;
  messageId: number | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  quotedTotalUsd: number | null;
  intentTag: HermesIntentTag;
  dbStorageMode: "postgres" | "local_fallback";
}

const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const HERMES_MODEL = "nvidia/nemotron-3.5-bolt-e4b";
const CATALOG_SIZE = 426;

export const HERMES_SYSTEM_PROMPT =
  "Eres HERMES, asesor automotriz ecuatoriano de LíderPro Pedernales (Atención 24/7 al +593 96 748 9002). " +
  "Reglas inquebrantables:\n" +
  "1) Tono natural, cercano y breve (2 a 4 líneas máximo en WhatsApp, sin sonar robótico ni usar 'Como asistente de IA').\n" +
  "2) PROHIBIDO sumar precios, recalcular IVA o inventar cifras: usa ÚNICAMENTE los precios unitarios con IVA y totales ya calculados en el bloque [CALCULADORA EXACTA].\n" +
  "3) Máximo 2 opciones exactas por respuesta (ej. Semisintético vs. Sintético, o Batería Ecuador vs. Bosch).\n" +
  "4) En Combos MANNOL menciona el regalo incluido (*Cockpit Care + Esponja*) y en baterías en Pedernales destaca la *Instalación a Domicilio 100% GRATIS*.\n" +
  "5) Si el cliente pide un producto que NO está en [CALCULADORA EXACTA] (ej. llantas, pastillas, parabrisas), dilo con honestidad sin inventar SKUs.";

function getNvidiaKeys(): string[] {
  return [
    process.env.NVIDIA_API_KEY,
    process.env.NVIDIA_API_KEY_2,
    process.env.NVIDIA_API_KEY_3,
    process.env.NVIDIA_API_KEY_4,
  ]
    .map((k) => (k || "").trim())
    .filter(Boolean);
}

function hydrateContextFromHistory(history: ChatTurn[]): {
  vehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  recentText: string;
} {
  let vehicle: VehicleProfile | null = null;
  let city: string | null = null;
  let customerType: CustomerType = "particular";
  const parts: string[] = [];

  for (const turn of history) {
    if (!turn?.content) continue;
    parts.push(turn.content);
    if (turn.role === "user") {
      const { profile } = extractVehicleFromText(turn.content);
      vehicle = mergeVehicleProfiles(vehicle, profile);
      const c = extractCityFromText(turn.content);
      if (c) city = c;
      customerType = extractCustomerType(turn.content, customerType);
    }
  }

  return {
    vehicle,
    city,
    customerType,
    recentText: parts.join("\n"),
  };
}

export function renderHumanDeterministicReply(plan: DeterministicQuotePlan): string {
  const vehicleStr = formatVehicleLabel(plan.detectedVehicle);
  const cityStr = plan.detectedCity || "Pedernales";

  switch (plan.intentTag) {
    case "pregunta_ilogica":
      return (
        `¡Para nada recomendable, mi estimado! ${plan.ilologicalReason || "Eso dañaría gravemente el motor."}\n` +
        `Si me pasas la *marca, modelo y año* de tu vehículo, te cotizo enseguida el lubricante exacto con *IVA incluido* y tu combo *MANNOL con Cockpit Care + Esponja gratis*.`
      );

    case "producto_sin_stock":
      return (
        `Con gusto te atiendo, pero por ahora no manejamos *${plan.requestedProductWithoutStock || "ese repuesto"}* en nuestro inventario.\n` +
        `En *LíderPro Pedernales* nos especializamos en *baterías Bosch y Ecuador* (instalación a domicilio gratis en Pedernales), *lubricantes/combos MANNOL* y *filtros Advance*. ¿Te cotizo algo de eso?`
      );

    case "fuera_de_tema":
      return (
        `¡Jaja por acá solo servimos energía y protección para tu carro! 😄\n` +
        `Cuando necesites batería a domicilio gratis en Pedernales o combo de aceite *MANNOL con regalo* (y envío nacional SRI), dime tu vehículo y al toque lo cotizamos.`
      );

    case "consulta_precio_sin_vehiculo":
      return (
        `¡Con todo gusto! Para darte el precio exacto con IVA y el regalo ideal, cuéntame en una línea: ¿para qué *marca, modelo y año* de vehículo lo buscas${plan.missingFieldHint?.includes("diésel") ? " (gasolina o diésel)" : ""}?`
      );

    case "envio_delivery":
      if (plan.primaryTotalUsd !== null && plan.shippingDeltaUsd !== null) {
        return (
          `Para *envío GRATIS en Pedernales* el mínimo es *$${FREE_SHIPPING_THRESHOLD_USD}.00*: con tu compra de *$${plan.primaryTotalUsd.toFixed(2)}* solo te faltan *$${plan.shippingDeltaUsd.toFixed(2)}* (ej. un *Limpiador UV3 Cockpit Care* a *$5.00*).\n` +
          `También hacemos envíos diarios a todo el Ecuador con factura SRI. ¿Qué artículo sumamos?`
        );
      }
      return (
        `En *Pedernales* el envío es *100% GRATIS* desde *$${FREE_SHIPPING_THRESHOLD_USD}.00* (y la *instalación de baterías a domicilio es GRATIS*), además despachamos el mismo día a todo Ecuador con factura SRI.\n` +
        `Dime tu vehículo y ciudad y te paso la cotización exacta.`
      );

    case "bateria_y_combo": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const lines: string[] = [
        `¡Listo! Para tu *${vehicleStr || "vehículo"}* en *${cityStr}* (con *Cockpit Care + Esponja GRATIS* en el combo e *instalación de batería a domicilio 100% GRATIS en Pedernales*):`,
        `• *Opción 1 (${opt1.items.map((i) => `${i.name} $${i.unitPriceIva.toFixed(2)}`).join(" + ")})* → Total exacto: *$${opt1.totalUsd.toFixed(2)}* (IVA inc.)`,
      ];
      if (opt2) {
        lines.push(
          `• *Opción 2 (${opt2.items.map((i) => `${i.name} $${i.unitPriceIva.toFixed(2)}`).join(" + ")})* → Total exacto: *$${opt2.totalUsd.toFixed(2)}* (IVA inc.)`
        );
      }
      lines.push(`Envío gratis y factura SRI incluidos. ¿Con cuál opción te agendamos el domicilio?`);
      return lines.join("\n");
    }

    case "bateria_domicilio": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const installNote =
        !plan.detectedCity || plan.detectedCity.toLowerCase() === "pedernales"
          ? "con *Instalación a Domicilio 100% GRATIS en Pedernales*"
          : `con envío seguro a *${cityStr}*`;
      const lines: string[] = [
        `Para tu *${vehicleStr || "vehículo"}* tengo estas 2 baterías exactas (${installNote} y factura SRI):`,
        `• *${opt1.items[0].name}*: *$${opt1.totalUsd.toFixed(2)}* (IVA inc.)`,
      ];
      if (opt2) {
        lines.push(`• *${opt2.items[0].name}*: *$${opt2.totalUsd.toFixed(2)}* (IVA inc.)`);
      }
      lines.push(`¿Confirmamos cuál te llevamos ahora?`);
      return lines.join("\n");
    }

    case "combo_lubricante":
    case "cotizacion_vehiculo": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const lines: string[] = [
        `¡Excelente máquina! Para tu *${vehicleStr || "vehículo"}* te recomiendo estas 2 opciones con IVA y *Cockpit Care + Esponja GRATIS*:`,
        `• *${opt1.label}:* ${opt1.items[0].name} → *$${opt1.totalUsd.toFixed(2)}*`,
      ];
      if (opt2) {
        lines.push(`• *${opt2.label}:* ${opt2.items[0].name} → *$${opt2.totalUsd.toFixed(2)}*`);
      }
      lines.push(
        `Incluye envío gratis en Pedernales (y envíos el mismo día a todo Ecuador). ¿Prefieres semisintético, sintético o sumamos batería?`
      );
      return lines.join("\n");
    }

    case "filtro_refrigerante_aditivo": {
      if (plan.options.length > 0) {
        const lines = plan.options.slice(0, 2).map((o) => `• *${o.items[0].name}*: *$${o.totalUsd.toFixed(2)}* (IVA inc.)`);
        return (
          `Tengo disponibles en bodega Pedernales:\n${lines.join("\n")}\n` +
          `Envío gratis en Pedernales desde *$35.00* y factura SRI. ¿Confirmamos para tu vehículo?`
        );
      }
      break;
    }

    case "saludo":
      return (
        `¡Hola! Qué gusto saludarte desde *LíderPro Pedernales* (${META_CONFIG.line247Display}) 👋\n` +
        `Dime la *marca, modelo y año* de tu vehículo para cotizarte tu *Combo MANNOL* (con Cockpit Care + Esponja gratis) o *batería con instalación a domicilio gratis en Pedernales*.`
      );

    default:
      break;
  }

  return (
    `¡Con gusto te ayudo desde *LíderPro Pedernales*! Para darte el precio exacto con IVA y garantía de bodega, indícame la *marca, modelo y año* de tu vehículo y qué repuesto (batería, combo de aceite MANNOL o filtro) necesitas.`
  );
}

function buildCalculatorPromptBlock(plan: DeterministicQuotePlan): string {
  const vehicleStr = formatVehicleLabel(plan.detectedVehicle) || "No especificado aún";
  const cityStr = plan.detectedCity || "No especificada (hub Pedernales)";
  const lines = [
    `[FICHA ACTIVA] Vehículo: ${vehicleStr} | Ciudad: ${cityStr} | Perfil: ${plan.detectedCustomerType} | Intención: ${plan.intentTag}`,
  ];
  if (plan.options.length > 0) {
    lines.push("[CALCULADORA EXACTA — USA ÚNICAMENTE ESTAS CIFRAS Y MÁXIMO 2 OPCIONES]:");
    plan.options.slice(0, 2).forEach((opt, i) => {
      const detail = opt.items.map((it) => `${it.sku}: ${it.name} = $${it.unitPriceIva.toFixed(2)}`).join(" + ");
      lines.push(
        `Opción ${i + 1} (${opt.label}): ${detail} => TOTAL_EXACTO_CON_IVA=$${opt.totalUsd.toFixed(2)}` +
          `${opt.includesMannolGift ? " | REGALO=Cockpit Care + Esponja GRATIS" : ""}` +
          `${opt.includesFreeBatteryInstallPedernales ? " | BENEFICIO=Instalación de Batería a Domicilio 100% GRATIS en Pedernales" : ""}`
      );
    });
  }
  return lines.join("\n");
}

function validateLlmPricingIntegrity(llmReply: string, plan: DeterministicQuotePlan): boolean {
  if (!llmReply || llmReply.length < 15) return false;
  if (/como modelo de lenguaje|asistente de ia|inteligencia artificial|no tengo acceso a precios/i.test(llmReply)) {
    return false;
  }
  const allowedAmounts = new Set<string>(["35", "35.00", "15"]);
  for (const opt of plan.options) {
    allowedAmounts.add(opt.totalUsd.toFixed(2));
    allowedAmounts.add(String(opt.totalUsd));
    for (const it of opt.items) {
      allowedAmounts.add(it.unitPriceIva.toFixed(2));
      allowedAmounts.add(String(it.unitPriceIva));
    }
  }
  if (plan.primaryTotalUsd !== null) {
    allowedAmounts.add(plan.primaryTotalUsd.toFixed(2));
  }
  if (plan.shippingDeltaUsd !== null) {
    allowedAmounts.add(plan.shippingDeltaUsd.toFixed(2));
  }

  // Cada precio en USD citado por el LLM debe estar autorizado por la calculadora TypeScript
  const matches = llmReply.matchAll(/\$\s*(\d+(?:\.\d{1,2})?)/g);
  for (const m of matches) {
    const num = Number(m[1]);
    if (!Number.isFinite(num)) return false;
    const formatted = num.toFixed(2);
    if (!allowedAmounts.has(formatted) && !allowedAmounts.has(String(num))) {
      return false;
    }
  }

  // Verificar si debía mencionar regalo MANNOL o total esperado cuando hay opciones
  if (plan.options.length > 0 && plan.primaryTotalUsd !== null) {
    const primaryStr = `$${plan.primaryTotalUsd.toFixed(2)}`;
    const altStr = `$${plan.primaryTotalUsd}`;
    if (!llmReply.includes(primaryStr) && !llmReply.includes(altStr)) {
      return false;
    }
  }
  if (plan.options.some((o) => o.includesFreeBatteryInstallPedernales)) {
    if (!/domicilio|instalaci[oó]n/i.test(llmReply) || !/gratis/i.test(llmReply)) {
      return false;
    }
  }

  return true;
}

export async function generateHermesReply(
  userText: string,
  history: ChatTurn[] = [],
  options: HermesReplyOptions = {}
): Promise<HermesResult> {
  const startedAt = Date.now();
  const cleanUserText = (userText || "").trim();
  const sessionId = (options.sessionId || `anon-${Date.now()}`).trim();
  const channel: ChannelType = options.channel || "demo_web";
  const shouldPersist = options.persist !== false;
  const timeoutMs = options.timeoutMs ?? 4800;

  // 1. Recuperar memoria persistente de cliente + últimos mensajes de BD
  const [persistedCustomer, dbRecentMsgs] = await Promise.all([
    shouldPersist ? getCustomer(sessionId) : Promise.resolve(null),
    shouldPersist ? getRecentMessages(sessionId, 8) : Promise.resolve([]),
  ]);

  const combinedHistory: ChatTurn[] =
    dbRecentMsgs.length > 0
      ? dbRecentMsgs.map((m) => ({ role: m.role, content: m.content }))
      : history;

  const hydratedHistory = hydrateContextFromHistory(combinedHistory);

  const persistedVehicle = persistedCustomer?.activeVehicle || hydratedHistory.vehicle;
  const persistedCity = persistedCustomer?.city || hydratedHistory.city;
  const persistedCustomerType = persistedCustomer?.customerType || hydratedHistory.customerType;

  // 2. Plan determinístico con calculadora TypeScript + escudo anti-trolls
  const plan = buildDeterministicQuotePlan({
    userText: cleanUserText,
    persistedVehicle,
    persistedCity,
    persistedCustomerType,
    recentHistoryText: hydratedHistory.recentText,
  });

  // 3. Actualizar ficha fija del cliente en BD inmediatamente
  let savedVehicle = plan.detectedVehicle;
  let savedCity = plan.detectedCity;
  let savedType = plan.detectedCustomerType;
  if (shouldPersist) {
    const updatedCustomer = await upsertCustomer({
      phoneOrSession: sessionId,
      name: options.customerName ?? undefined,
      activeVehicle: plan.detectedVehicle ?? undefined,
      city: plan.detectedCity ?? undefined,
      customerType: plan.detectedCustomerType,
    });
    savedVehicle = updatedCustomer.activeVehicle;
    savedCity = updatedCustomer.city;
    savedType = updatedCustomer.customerType;

    await insertMessage({
      sessionId,
      channel,
      role: "user",
      content: cleanUserText,
      intentTag: plan.intentTag,
    });
  }

  // 4. Casos de guardrail estricto / respuestas rápidas directas para CERO errores
  const deterministicDirectIntents = new Set<HermesIntentTag>([
    "pregunta_ilogica",
    "producto_sin_stock",
    "fuera_de_tema",
    "consulta_precio_sin_vehiculo",
    "saludo",
  ]);

  let finalReply = renderHumanDeterministicReply(plan);
  let usedModel = "hermes-deterministic-ts";
  let usedFallback = true;

  const keys = getNvidiaKeys();
  if (!deterministicDirectIntents.has(plan.intentTag) && keys.length > 0 && plan.options.length > 0) {
    const calcBlock = buildCalculatorPromptBlock(plan);
    const recentTurns = combinedHistory
      .slice(-4)
      .filter((h) => h.content.trim().length > 0)
      .map((h) => ({ role: h.role, content: h.content.slice(0, 350) }));

    const userPrompt =
      `${calcBlock}\n\n` +
      `Mensaje actual del cliente:\n${cleanUserText}\n\n` +
      `Redacta la respuesta de WhatsApp en 2 a 4 líneas naturales usando exactamente las cifras de [CALCULADORA EXACTA].`;

    for (let i = 0; i < Math.min(2, keys.length); i++) {
      const apiKey = keys[i];
      const remainingBudget = Math.max(900, timeoutMs - (Date.now() - startedAt));
      try {
        const resp = await fetch(NVIDIA_CHAT_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: HERMES_MODEL,
            messages: [
              { role: "system", content: HERMES_SYSTEM_PROMPT },
              ...recentTurns,
              { role: "user", content: userPrompt },
            ],
            temperature: 0.25,
            max_tokens: 260,
          }),
          signal: AbortSignal.timeout(remainingBudget),
        });
        if (!resp.ok) continue;
        const data = (await resp.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const candidate = (data.choices?.[0]?.message?.content || "").trim();
        if (validateLlmPricingIntegrity(candidate, plan)) {
          finalReply = candidate;
          usedModel = HERMES_MODEL;
          usedFallback = false;
          break;
        }
      } catch {
        // Reintenta con la siguiente key o cae limpio al redactor determinístico TS
      }
    }
  }

  const latencyMs = Date.now() - startedAt;
  let assistantMessageId: number | null = null;

  if (shouldPersist) {
    const storedAssistant = await insertMessage({
      sessionId,
      channel,
      role: "assistant",
      content: finalReply,
      skusUsed: plan.matchedSkus,
      quotedTotalUsd: plan.primaryTotalUsd,
      latencyMs,
      intentTag: plan.intentTag,
    });
    assistantMessageId = storedAssistant.id;
  }

  return {
    reply: finalReply,
    model: usedModel,
    usedFallback,
    latencyMs,
    matchedSkus: plan.matchedSkus,
    catalogSize: CATALOG_SIZE,
    sessionId,
    messageId: assistantMessageId,
    activeVehicle: savedVehicle,
    city: savedCity,
    customerType: savedType,
    quotedTotalUsd: plan.primaryTotalUsd,
    intentTag: plan.intentTag,
    dbStorageMode: getDbStorageMode(),
  };
}
