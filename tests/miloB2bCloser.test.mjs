// node --test tests/miloB2bCloser.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLiveBulkPreCloseReply,
  buildVerifiedEscalationPayload,
  buildWarmEcuadorianGreeting,
  didClientMentionFilters,
  formatVerifiedEscalationAlert,
  normalizeBulkOrderText,
  parseBulkCanecaOrder,
  processPostEscalationPartialData,
  quoteBulkCanecaOrderFromCatalog,
  sanitizeCustomerName,
} from "../src/lib/miloB2bCloser.ts";
import {
  buildNeutralFreightEscalationCopy,
  sanitizeMiloLogisticsText,
} from "../src/lib/miloLogisticsPolicy.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REAL_CATALOG = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../src/data/privatePricing.server.json"), "utf8")
);

test("Regla 1: sanitizeCustomerName rechaza hashes, códigos, teléfonos y preserva nombres humanos", () => {
  assert.equal(sanitizeCustomerName("f889566"), null);
  assert.equal(sanitizeCustomerName("a1b2c3d4e5"), null);
  assert.equal(sanitizeCustomerName("AD-B12"), null);
  assert.equal(sanitizeCustomerName("user_9981"), null);
  assert.equal(sanitizeCustomerName("593969454398"), null);
  assert.equal(sanitizeCustomerName("wa:593969454398"), null);
  assert.equal(sanitizeCustomerName("A"), null);
  assert.equal(sanitizeCustomerName("   "), null);
  assert.equal(sanitizeCustomerName(null), null);

  assert.equal(sanitizeCustomerName("José Antonio"), "José Antonio");
  assert.equal(sanitizeCustomerName("JUAN AVILES"), "Juan Aviles");
  assert.equal(sanitizeCustomerName("Christian"), "Christian");
  assert.equal(sanitizeCustomerName("María-José"), "María-José");

  const greetingHash = buildWarmEcuadorianGreeting("f889566");
  assert.doesNotMatch(greetingHash, /f889566/i);
  assert.match(greetingHash, /¡Hola! Qué gusto saludarte/);

  const greetingHuman = buildWarmEcuadorianGreeting("JUAN AVILES");
  assert.equal(greetingHuman, "¡Hola Juan! Qué gusto saludarte");

  const neutralFreight = buildNeutralFreightEscalationCopy({
    customerName: "f889566",
    cityLabel: "Cuenca",
    totalTxt: "$628.50",
  });
  assert.doesNotMatch(neutralFreight.suggestedReply, /f889566/i);
});

test("Regla 2: parser y aritmética exacta contra privatePricing.server.json (caso real 15w401 y formato limpio)", () => {
  // Typo real exacto de producción hoy ("5 canecas 4 de 15w401 de 10w40")
  assert.equal(
    normalizeBulkOrderText("5 canecas 4 de 15w401 de 10w40"),
    "5 canecas 4 de 15w-40 1 de 10w-40"
  );

  for (const input of [
    "5 canecas 4 de 15w401 de 10w40",
    "5 canecas: 4 de 15w40 y 1 de 10w40",
    "4 canecas 15w-40 y 1 caneca 10w-40",
  ]) {
    const parsed = parseBulkCanecaOrder(input);
    assert.ok(parsed, `Debe parsear: ${input}`);
    assert.equal(parsed.totalUnits, 5);
    assert.equal(parsed.items.length, 2);

    const quote = quoteBulkCanecaOrderFromCatalog(input, REAL_CATALOG);
    assert.ok(quote, `Debe cotizar en catálogo real: ${input}`);
    assert.equal(quote.totalUnits, 5);
    assert.equal(quote.compactLabel, "4 × 15W-40 (20L) + 1 × 10W-40 (20L)");
    assert.equal(quote.arithmeticBreakdown, "4 × $125.00 + 1 × $128.50 = $628.50");
    assert.equal(quote.subtotalUsd, 628.5);
    assert.equal(quote.lines[0].sku, "COMBO-MANNOL-3A");
    assert.equal(quote.lines[0].unitPriceIva, 125.0);
    assert.equal(quote.lines[0].lineSubtotalUsd, 500.0);
    assert.equal(quote.lines[1].sku, "COMBO-MANNOL-3B");
    assert.equal(quote.lines[1].unitPriceIva, 128.5);
    assert.equal(quote.lines[1].lineSubtotalUsd, 128.5);
    assert.doesNotMatch(quote.compactLabel, /15w401/i);
  }
});

test("Regla 3: respuesta humana pre-cierre en vivo confirma stock + $628.50 + 1 pregunta ágil sin enfriar venta", () => {
  const quote = quoteBulkCanecaOrderFromCatalog("5 canecas: 4 de 15w40 y 1 de 10w40", REAL_CATALOG);
  assert.ok(quote);

  const liveReply = sanitizeMiloLogisticsText(
    buildLiveBulkPreCloseReply({
      bulkQuote: quote,
      customerName: "f889566",
      city: null,
      hasRuc: false,
      clientMentionedFilters: false,
      isFirstGreeting: true,
    })
  );

  assert.doesNotMatch(liveReply, /f889566|15w401|servientrega|tramaco|cooperativa/i);
  assert.doesNotMatch(liveReply, /15\s*%\s*de\s*descuento/i);
  assert.doesNotMatch(liveReply, /filtros/i, "No debe mencionar filtros si el cliente no los pidió");
  assert.match(liveReply, /¡Hola! Qué gusto saludarte/);
  assert.match(liveReply, /4 × 15W-40 \(20L\) \+ 1 × 10W-40 \(20L\)/);
  assert.match(liveReply, /\$500\.00/);
  assert.match(liveReply, /\$128\.50/);
  assert.match(liveReply, /\$628\.50/);
  assert.match(liveReply, /ciudad y sector exacto/i);
  assert.match(liveReply, /nombre o RUC/i);
});

test("Regla 4: bloque ESCALAMIENTO MILO separa CONFIRMADO / DATO FALTANTE / MENSAJE HUMANO SUGERIDO sin alucinar filtros ni hashes", () => {
  const userHistory = [
    "A eites mannol",
    "15w40",
    "Por canecas",
    "Para varios vehículos por mayor y descuentos",
    "5 canecas 4 de 15w401 de 10w40",
  ];
  const mentionedFilters = didClientMentionFilters(userHistory);
  assert.equal(mentionedFilters, false);

  const quote = quoteBulkCanecaOrderFromCatalog(userHistory[userHistory.length - 1], REAL_CATALOG, {
    historyUserTexts: userHistory.slice(0, -1),
  });
  assert.ok(quote);

  const payload = buildVerifiedEscalationPayload({
    bulkQuote: quote,
    cleanMessage: userHistory[userHistory.length - 1],
    customerName: "f889566",
    city: null,
    clientMentionedFilters: mentionedFilters,
  });

  const alertText = formatVerifiedEscalationAlert({
    urgency: payload.urgency,
    customerName: "f889566",
    contactRef: "wa:5939*****398",
    city: null,
    adTag: "AD-B12",
    reason: payload.reason,
    confirmedByClient: payload.confirmedByClient,
    missingFieldsAsked: payload.missingFieldsAsked,
    suggestedReply: payload.suggestedReply,
  });

  assert.match(alertText, /✅ \*CONFIRMADO POR CLIENTE:\*/);
  assert.match(alertText, /❓ \*DATO FALTANTE QUE MILO YA LE PREGUNTÓ:\*/);
  assert.match(alertText, /💬 \*MENSAJE HUMANO SUGERIDO:\*/);
  assert.match(alertText, /Sin nombre confirmado/);
  assert.match(alertText, /4 × \$125\.00 \+ 1 × \$128\.50 = \$628\.50/);
  assert.doesNotMatch(alertText, /f889566/i);
  assert.doesNotMatch(alertText, /15w401/i);
  assert.doesNotMatch(alertText, /confirmar cantidades exactas/i);
  assert.doesNotMatch(payload.suggestedReply, /filtros/i);
  assert.doesNotMatch(payload.suggestedReply, /f889566/i);
});

test("Regla 5: des-trabe conversacional anti-loop actualiza ciudad 'Envío a cuenca', refresca resumen y no repite pregunta ya contestada", () => {
  const quote = quoteBulkCanecaOrderFromCatalog("5 canecas: 4 de 15w40 y 1 de 10w40", REAL_CATALOG);
  assert.ok(quote);

  const initialEsc = buildVerifiedEscalationPayload({
    bulkQuote: quote,
    cleanMessage: "5 canecas: 4 de 15w40 y 1 de 10w40",
    customerName: "f889566",
    city: null,
    clientMentionedFilters: false,
  });

  // Turno 1 post-escalamiento: cliente responde "Envío a cuenca"
  const step1 = processPostEscalationPartialData({
    inboundText: "Envío a cuenca",
    existingCity: null,
    existingName: "f889566",
    existingContext: {
      confirmedLines: quote.lines,
      confirmedSummary: quote.compactLabel,
      confirmedSubtotalUsd: quote.subtotalUsd,
      clientMentionedFilters: false,
      askedMissingFields: initialEsc.missingFieldKeys,
      collectedFields: {},
      postEscalationReplyCount: 0,
    },
    catalogEntries: REAL_CATALOG,
  });

  assert.equal(step1.hasNewData, true);
  assert.deepEqual(step1.newFieldKeys, ["ciudad"]);
  assert.equal(step1.updatedCity, "Cuenca");
  assert.equal(step1.updatedName, null);
  assert.equal(step1.shouldReplyToClient, true);
  assert.ok(step1.clientAckReply);
  assert.match(step1.clientAckReply, /Cuenca/);
  assert.match(step1.clientAckReply, /\$628\.50/);
  assert.doesNotMatch(step1.clientAckReply, /ciudad de entrega/i, "No debe volver a preguntar ciudad");
  assert.ok(!step1.remainingMissingKeys.includes("ciudad"));
  assert.match(step1.updatedEscalation.confirmedByClient, /Destino confirmado: \*Cuenca\*/);
  assert.match(step1.updatedEscalation.suggestedReply, /Cuenca/);
  assert.doesNotMatch(step1.updatedEscalation.suggestedReply, /ciudad y sector/i);

  // Turno 2 post-escalamiento sin datos nuevos ("Gracias ok") -> anti-loop silencio limpio
  const step2 = processPostEscalationPartialData({
    inboundText: "Gracias ok",
    existingCity: step1.updatedCity,
    existingName: step1.updatedName,
    existingContext: step1.updatedContext,
    catalogEntries: REAL_CATALOG,
  });
  assert.equal(step2.hasNewData, false);
  assert.equal(step2.shouldReplyToClient, false);
  assert.equal(step2.clientAckReply, null);
});
