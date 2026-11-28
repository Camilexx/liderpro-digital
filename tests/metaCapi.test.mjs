// node --test tests/  (Node >= 22.18: type stripping nativo para importar .ts)
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  buildCapiEventId,
  buildCapiPayload,
  classifyCapiEvent,
  isCapiDryRun,
  resolveEventTime,
  sendWhatsAppCapiEvent,
  DEFAULT_CAPI_DATASET_ID,
} from "../src/lib/metaCapi.ts";

const NOW = 1_795_800_000; // 2026-11-28 aprox.
const CTWA = { from: "593967489002", messageId: "wamid.A", timestamp: String(NOW - 30), ctwaClid: "ARAkLkA8", adId: "120255987814450999", wabaId: "WABA1" };
const ORGANIC = { from: "+593 98 111 2222", messageId: "wamid.B", timestamp: String(NOW - 30) };

test("dry-run por defecto y solo se desactiva con valor explícito", () => {
  assert.equal(isCapiDryRun({}), true);
  assert.equal(isCapiDryRun({ META_CAPI_DRY_RUN: "true" }), true);
  assert.equal(isCapiDryRun({ META_CAPI_DRY_RUN: "garbage" }), true);
  for (const v of ["false", "0", "OFF", "no"]) assert.equal(isCapiDryRun({ META_CAPI_DRY_RUN: v }), false);
});

test("clasificación Lead (ctwa_clid) vs Contact (orgánico)", () => {
  assert.equal(classifyCapiEvent(CTWA), "Lead");
  assert.equal(classifyCapiEvent(ORGANIC), "Contact");
  assert.equal(classifyCapiEvent({ ...ORGANIC, ctwaClid: "   " }), "Contact");
});

test("event_id determinista: mismo ctwa_clid ⇒ mismo id aunque cambie el mensaje", () => {
  const a = buildCapiEventId(CTWA, NOW);
  const b = buildCapiEventId({ ...CTWA, messageId: "wamid.OTHER" }, NOW + 3600);
  assert.equal(a, b);
  assert.match(a, /^lp_lead_[0-9a-f]{24}$/);
  assert.notEqual(a, buildCapiEventId({ ...CTWA, ctwaClid: "ZZZ" }, NOW));
});

test("event_id Contact: 1 por remitente y día UTC, formato de teléfono indiferente", () => {
  const a = buildCapiEventId(ORGANIC, NOW);
  assert.equal(a, buildCapiEventId({ ...ORGANIC, from: "593981112222" }, NOW + 10));
  assert.notEqual(a, buildCapiEventId(ORGANIC, NOW + 86400));
  assert.match(a, /^lp_contact_[0-9a-f]{24}$/);
});

test("payload Lead business_messaging con ph hasheado, ctwa_clid y WABA", () => {
  const p = buildCapiPayload(CTWA, { META_CAPI_TEST_EVENT_CODE: "TEST123" }, NOW);
  const ev = p.data[0];
  assert.equal(ev.event_name, "Lead");
  assert.equal(ev.action_source, "business_messaging");
  assert.equal(ev.messaging_channel, "whatsapp");
  assert.equal(ev.event_time, NOW - 30);
  assert.equal(ev.user_data.ctwa_clid, "ARAkLkA8");
  assert.equal(ev.user_data.whatsapp_business_account_id, "WABA1");
  assert.deepEqual(ev.user_data.ph, [createHash("sha256").update("593967489002").digest("hex")]);
  assert.equal(ev.custom_data.ad_id, "120255987814450999");
  assert.equal(p.test_event_code, "TEST123");
  assert.ok(!JSON.stringify(p).includes("593967489002"), "teléfono en claro filtrado");
});

test("payload Contact usa action_source=chat sin messaging_channel", () => {
  const ev = buildCapiPayload(ORGANIC, {}, NOW).data[0];
  assert.equal(ev.event_name, "Contact");
  assert.equal(ev.action_source, "chat");
  assert.equal(ev.messaging_channel, undefined);
  assert.equal(ev.user_data.ctwa_clid, undefined);
});

test("event_time fuera de rango (futuro / >7d / basura) ⇒ ahora", () => {
  assert.equal(resolveEventTime(String(NOW + 3600), NOW), NOW);
  assert.equal(resolveEventTime(NOW - 8 * 86400, NOW), NOW);
  assert.equal(resolveEventTime("abc", NOW), NOW);
});

test("send en dry-run no hace fetch", async () => {
  let called = 0;
  const r = await sendWhatsAppCapiEvent(CTWA, {}, async () => { called++; return new Response("{}"); });
  assert.equal(r.ok, true);
  assert.equal(r.dryRun, true);
  assert.equal(called, 0);
});

test("send live sin token ⇒ skipped, sin fetch", async () => {
  let called = 0;
  const r = await sendWhatsAppCapiEvent(CTWA, { META_CAPI_DRY_RUN: "false" }, async () => { called++; return new Response("{}"); });
  assert.equal(r.skipped, "missing_token");
  assert.equal(called, 0);
});

test("send live ⇒ POST al Dataset por defecto con Bearer y payload", async () => {
  let seen;
  const r = await sendWhatsAppCapiEvent(
    ORGANIC,
    { META_CAPI_DRY_RUN: "false", META_CAPI_ACCESS_TOKEN: "tok_test" },
    async (url, init) => { seen = { url, init }; return new Response('{"events_received":1}', { status: 200 }); }
  );
  assert.equal(r.ok, true);
  assert.equal(r.dryRun, false);
  assert.equal(seen.url, `https://graph.facebook.com/v21.0/${DEFAULT_CAPI_DATASET_ID}/events`);
  assert.equal(seen.init.headers.Authorization, "Bearer tok_test");
  assert.equal(JSON.parse(seen.init.body).data[0].event_name, "Contact");
});

test("send live con HTTP 400 devuelve error acotado sin lanzar", async () => {
  const r = await sendWhatsAppCapiEvent(
    CTWA,
    { META_CAPI_DRY_RUN: "0", META_ACCESS_TOKEN: "tok" },
    async () => new Response('{"error":{"message":"bad"}}', { status: 400 })
  );
  assert.equal(r.ok, false);
  assert.equal(r.status, 400);
  assert.ok(r.error.length <= 200);
});
