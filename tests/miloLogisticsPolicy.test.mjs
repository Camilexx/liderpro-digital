// node --test tests/miloLogisticsPolicy.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AFTER_HOURS_DISPATCH_PHRASE,
  SAME_DAY_DISPATCH_PHRASE,
  buildNeutralFreightEscalationCopy,
  isWithinSameDayDispatchWindowEC,
  sanitizeMiloLogisticsText,
} from "../src/lib/miloLogisticsPolicy.ts";

// EC = UTC-5 todo el año
const ecDate = (isoLocal) => new Date(`${isoLocal}-05:00`);

test("ventana de corte horario America/Guayaquil (Lun-Vie 16:30, Sab 12:00, Dom cerrado)", () => {
  assert.equal(isWithinSameDayDispatchWindowEC(ecDate("2026-11-27T16:29:00")), true);  // Viernes 16:29
  assert.equal(isWithinSameDayDispatchWindowEC(ecDate("2026-11-27T16:30:00")), true);  // Viernes 16:30
  assert.equal(isWithinSameDayDispatchWindowEC(ecDate("2026-11-27T16:31:00")), false); // Viernes 16:31
  assert.equal(isWithinSameDayDispatchWindowEC(ecDate("2026-11-27T19:38:00")), false); // Viernes 19:38 (lead 4455)
  assert.equal(isWithinSameDayDispatchWindowEC(ecDate("2026-11-28T11:59:00")), true);  // Sábado 11:59
  assert.equal(isWithinSameDayDispatchWindowEC(ecDate("2026-11-28T12:01:00")), false); // Sábado 12:01
  assert.equal(isWithinSameDayDispatchWindowEC(ecDate("2026-11-29T10:00:00")), false); // Domingo 10:00
});

test("neutralidad de transporte elimina cooperativas, Servientrega, Tramaco y flotas", () => {
  const dirty =
    "Envío por cooperativa de transporte, Servientrega o Tramaco a Quito, o por Flota Imbabura.";
  const clean = sanitizeMiloLogisticsText(dirty, ecDate("2026-11-27T10:00:00"));
  assert.doesNotMatch(clean, /servientrega|tramaco|cooperativa|flota\s+imbabura/i);
  assert.match(clean, /despacho nacional coordinado/i);
});

test("fuera de horario reemplaza 'despacharlo hoy mismo' por frase obligatoria de bodega/turno hábil", () => {
  const raw = "Tu kit cuesta $92.50 y confirmamos el envío por Servientrega para despacharlo hoy mismo.";
  const clean = sanitizeMiloLogisticsText(raw, ecDate("2026-11-27T19:38:00"));
  assert.doesNotMatch(clean, /hoy mismo|servientrega/i);
  assert.ok(clean.includes(AFTER_HOURS_DISPATCH_PHRASE));
});

test("escalamiento de flete usa frase neutra + reloj EC real", () => {
  const friNight = buildNeutralFreightEscalationCopy({
    customerName: "José Antonio",
    cityLabel: "Quito",
    totalTxt: "$92.50",
    selectedSkusLabel: "COMBO-MANNOL-2B",
    now: ecDate("2026-11-27T19:38:00"),
  });
  assert.doesNotMatch(friNight.howToHandle + friNight.suggestedReply, /servientrega|tramaco|cooperativa|hoy mismo/i);
  assert.ok(friNight.suggestedReply.includes(AFTER_HOURS_DISPATCH_PHRASE));

  const friMorning = buildNeutralFreightEscalationCopy({
    customerName: "José Antonio",
    cityLabel: "Quito",
    totalTxt: "$92.50",
    now: ecDate("2026-11-27T10:30:00"),
  });
  assert.ok(friMorning.suggestedReply.includes(SAME_DAY_DISPATCH_PHRASE));
});
