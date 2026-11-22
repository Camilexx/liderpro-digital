"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Car,
  CheckCircle2,
  Database,
  Lock,
  LogOut,
  MessageSquare,
  Package,
  PhoneCall,
  RefreshCw,
  ShoppingBag,
  Truck,
} from "lucide-react";

interface VehicleProfile {
  make?: string;
  model?: string;
  year?: number;
  engine?: string;
  fuel?: string;
  unmappedLabel?: string;
}

interface OrderRecord {
  id: number;
  sessionId: string;
  customerName: string | null;
  phone: string | null;
  vehicle: VehicleProfile | null;
  itemsJson: Array<{ sku: string; name: string; unitPriceIva: number; qty?: number }>;
  totalUsd: number;
  deliveryAddress: string | null;
  paymentMethod: string | null;
  status: "pending_dispatch" | "dispatched" | "completed" | "cancelled";
  createdAt: string;
}

interface ChatTurnItem {
  messageId: number;
  sessionId: string;
  channel: string;
  customerName: string | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  userPrompt: string | null;
  hermesReply: string;
  skusUsed: string[];
  quotedTotalUsd: number | null;
  latencyMs: number | null;
  intentTag: string | null;
  qaFlag: "good" | "fix" | null;
  qaNote: string | null;
  createdAt: string;
}

interface WeeklyAuditReport {
  auditId: number | null;
  storageMode: "postgres" | "local_fallback";
  periodStart: string;
  periodEnd: string;
  daysAnalyzed: number;
  totalChats: number;
  totalMessages: number;
  avgLatencyMs: number | null;
  outOfStockRanking: Array<{ term: string; count: number; sampleMessages: string[] }>;
  flaggedFailures: Array<{ messageId: number; userPrompt: string | null; qaNote: string | null }>;
  unmappedVehicles: Array<{ vehicle: string; count: number }>;
  recommendations: string[];
}

interface HumanEscalationRecord {
  sessionId: string;
  customerName: string | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  customerType: string;
  reason: string;
  summary: string | null;
  urgency: "alta" | "media" | "baja";
  escalatedAt: string;
}

interface DashboardSnapshot {
  storageMode: "postgres" | "local_fallback";
  orders: OrderRecord[];
  escalations: HumanEscalationRecord[];
  chatTurns: ChatTurnItem[];
  audit: WeeklyAuditReport;
}

const STORAGE_KEY_NAME = "liderpro_hermes_admin_key";

function formatVehicle(v: VehicleProfile | null, city?: string | null): string {
  const parts: string[] = [];
  if (v) {
    if (v.unmappedLabel && !v.model) parts.push(v.unmappedLabel);
    else {
      const lbl = [v.make, v.model, v.year ? String(v.year) : "", v.fuel].filter(Boolean).join(" ");
      if (lbl) parts.push(lbl);
    }
  }
  if (parts.length === 0) parts.push("Sin ficha aún");
  if (city) parts.push(`📍 ${city}`);
  return parts.join(" • ");
}

function formatDateEc(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es-EC", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return iso;
  }
}

export default function AdminHermesDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [runningAudit, setRunningAudit] = useState(false);
  const [auditToast, setAuditToast] = useState<string | null>(null);

  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [onlyFix, setOnlyFix] = useState(false);
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);

  const loadDashboard = useCallback(
    async (keyToUse: string, channel = channelFilter, fixFilter = onlyFix) => {
      if (!keyToUse) return;
      setLoading(true);
      setAuthError(null);
      try {
        const qs = new URLSearchParams({
          view: "dashboard",
          days: "7",
          channel,
          onlyFix: fixFilter ? "1" : "0",
        });
        const resp = await fetch(`/api/admin/hermes-audit?${qs.toString()}`, {
          headers: { "x-hermes-admin-key": keyToUse },
          cache: "no-store",
        });
        const data = (await resp.json()) as {
          ok?: boolean;
          error?: string;
          dashboard?: DashboardSnapshot;
        };
        if (!resp.ok || !data.ok || !data.dashboard) {
          if (resp.status === 401 || resp.status === 503) {
            setAuthenticated(false);
            sessionStorage.removeItem(STORAGE_KEY_NAME);
          }
          setAuthError(data.error || `Error ${resp.status} al autenticar.`);
          return;
        }
        setSnapshot(data.dashboard);
        setAuthenticated(true);
        sessionStorage.setItem(STORAGE_KEY_NAME, keyToUse);
      } catch {
        setAuthError("No se pudo conectar con /api/admin/hermes-audit.");
      } finally {
        setLoading(false);
      }
    },
    [channelFilter, onlyFix]
  );

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY_NAME) : null;
    if (saved) {
      setAdminKey(saved);
      setKeyInput(saved);
      void loadDashboard(saved, "all", false);
    }
  }, [loadDashboard]);

  async function handleRunAuditNow() {
    if (!adminKey || runningAudit) return;
    setRunningAudit(true);
    setAuditToast(null);
    try {
      const resp = await fetch("/api/admin/hermes-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hermes-admin-key": adminKey,
        },
        body: JSON.stringify({ days: 7, notifyTelegram: true }),
      });
      const data = (await resp.json()) as {
        ok?: boolean;
        audit?: WeeklyAuditReport;
        telegramSent?: boolean;
        error?: string;
      };
      if (resp.ok && data.ok && data.audit) {
        setAuditToast(
          `Auditoría #${data.audit.auditId ?? "-"} guardada (${data.audit.totalChats} chats)${
            data.telegramSent ? " y enviada a Telegram." : "."
          }`
        );
        await loadDashboard(adminKey, channelFilter, onlyFix);
      } else {
        setAuditToast(data.error || "No se pudo generar la auditoría.");
      }
    } catch {
      setAuditToast("Error de red al generar auditoría.");
    } finally {
      setRunningAudit(false);
    }
  }

  async function handleOrderStatus(orderId: number, status: OrderRecord["status"]) {
    if (!adminKey) return;
    try {
      const resp = await fetch("/api/admin/hermes-audit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-hermes-admin-key": adminKey,
        },
        body: JSON.stringify({ orderId, status }),
      });
      if (resp.ok) {
        await loadDashboard(adminKey, channelFilter, onlyFix);
      }
    } catch {
      // Silencio seguro
    }
  }

  async function handleResolveEscalation(sessionId: string) {
    if (!adminKey) return;
    try {
      const resp = await fetch("/api/admin/hermes-audit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-hermes-admin-key": adminKey,
        },
        body: JSON.stringify({ action: "resolve_escalation", sessionId }),
      });
      if (resp.ok) {
        setAuditToast(`Escalamiento de ${sessionId} marcado como resuelto.`);
        await loadDashboard(adminKey, channelFilter, onlyFix);
      }
    } catch {
      // Silencio seguro
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY_NAME);
    setAdminKey("");
    setKeyInput("");
    setAuthenticated(false);
    setSnapshot(null);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#061B40] px-4 py-12 text-slate-100">
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Panel Admin Milo • LíderPro</h1>
              <p className="text-xs text-slate-400">Acceso privado de operaciones</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const trimmed = keyInput.trim();
              if (!trimmed) return;
              setAdminKey(trimmed);
              void loadDashboard(trimmed, channelFilter, onlyFix);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="hermes-admin-key" className="mb-1.5 block text-xs font-medium text-slate-300">
                Clave de Administrador
              </label>
              <input
                id="hermes-admin-key"
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Ingresa tu HERMES_ADMIN_KEY"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
                required
              />
            </div>

            {authError && (
              <div className="rounded-lg border border-red-500/40 bg-red-950/60 px-3 py-2 text-xs text-red-200">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !keyInput.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              <span>{loading ? "Verificando..." : "Ingresar al Panel"}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingOrders = (snapshot?.orders || []).filter((o) => o.status === "pending_dispatch");
  const allOrders = snapshot?.orders || [];
  const escalations = snapshot?.escalations || [];
  const audit = snapshot?.audit;

  return (
    <div className="min-h-screen bg-slate-100 pb-14 text-slate-900">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#061B40] px-4 py-3 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold sm:text-lg">
              LíderPro Pedernales • Torre de Control Milo
            </h1>
            <p className="flex items-center gap-2 text-xs text-slate-300">
              <Database className="h-3.5 w-3.5 text-emerald-400" />
              <span>
                Base:{" "}
                <strong className="text-white">
                  {snapshot?.storageMode === "postgres" ? "Postgres (Neon/Vercel)" : "Fallback Local Temporal"}
                </strong>
              </span>
              {audit?.avgLatencyMs !== null && audit?.avgLatencyMs !== undefined && (
                <span>• Latencia prom: {audit.avgLatencyMs} ms</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void handleRunAuditNow()}
              disabled={runningAudit}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 shadow transition hover:bg-amber-300 disabled:opacity-60"
            >
              <BarChart3 className={`h-3.5 w-3.5 ${runningAudit ? "animate-pulse" : ""}`} />
              <span>{runningAudit ? "Auditando..." : "Generar Auditoría Ahora"}</span>
            </button>

            <button
              type="button"
              onClick={() => void loadDashboard(adminKey, channelFilter, onlyFix)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-3 pt-5 sm:px-4">
        {auditToast && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-900 shadow-sm">
            {auditToast}
          </div>
        )}

        {/* KPIs */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div
            className={`rounded-xl border p-3.5 shadow-sm ${
              escalations.length > 0
                ? "border-red-400 bg-red-600 text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide opacity-90">
              <span>Escalamientos</span>
              <PhoneCall className={`h-4 w-4 ${escalations.length > 0 ? "text-white" : "text-red-600"}`} />
            </div>
            <p className="mt-1.5 text-2xl font-extrabold">{escalations.length}</p>
          </div>

          <div
            className={`rounded-xl border p-3.5 shadow-sm ${
              pendingOrders.length > 0
                ? "border-red-300 bg-red-50 text-red-950"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide opacity-80">
              <span>Pendientes Despacho</span>
              <Truck className="h-4 w-4 text-red-600" />
            </div>
            <p className="mt-1.5 text-2xl font-extrabold">{pendingOrders.length}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Chats (7 días)</span>
              <MessageSquare className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-1.5 text-2xl font-extrabold">{audit?.totalChats ?? 0}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Alertas Corregir</span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <p className="mt-1.5 text-2xl font-extrabold">{audit?.flaggedFailures.length ?? 0}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Sin Stock (7 días)</span>
              <Package className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-1.5 text-2xl font-extrabold">
              {(audit?.outOfStockRanking || []).reduce((acc, i) => acc + i.count, 0)}
            </p>
          </div>
        </section>

        {/* SECCIÓN 0: ALERTAS DE ESCALAMIENTO HUMANO (PRIORIDAD ROJA ARRIBA) */}
        <section
          className={`rounded-2xl border shadow-sm ${
            escalations.length > 0 ? "border-red-400 bg-red-50/70" : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between border-b border-red-200/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-red-600" />
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                Alertas de Escalamiento Humano ({escalations.length})
              </h2>
            </div>
            {escalations.length > 0 && (
              <span className="animate-pulse rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                {escalations.length} REQUIERE{escalations.length > 1 ? "N" : ""} ASESOR
              </span>
            )}
          </div>

          {escalations.length === 0 ? (
            <p className="px-4 py-5 text-center text-xs text-slate-500">
              Sin chats pendientes de escalamiento humano en este momento.
            </p>
          ) : (
            <div className="divide-y divide-red-200/60">
              {escalations.map((esc) => (
                <div
                  key={esc.sessionId}
                  className="flex flex-col gap-3 border-l-4 border-l-red-600 bg-white/90 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                          esc.urgency === "alta"
                            ? "bg-red-600 text-white"
                            : esc.urgency === "media"
                            ? "bg-amber-500 text-white"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        Urgencia {esc.urgency}
                      </span>
                      <span className="font-mono text-[11px] text-slate-600">{esc.sessionId}</span>
                      <span className="text-slate-500">{formatDateEc(esc.escalatedAt)}</span>
                    </div>
                    <p className="text-sm font-bold text-red-950">
                      {esc.customerName || "Cliente"} — {esc.reason}
                    </p>
                    {esc.summary && <p className="text-slate-700">{esc.summary}</p>}
                    <p className="text-slate-500">
                      <strong>Ficha:</strong> {formatVehicle(esc.activeVehicle, esc.city)} •{" "}
                      <strong>Tipo:</strong> {esc.customerType}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <button
                      type="button"
                      onClick={() => void handleResolveEscalation(esc.sessionId)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Marcar Resuelto</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECCIÓN 1: PEDIDOS PENDIENTES DE DESPACHO (PRIORIDAD ROJA ARRIBA) */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-red-600" />
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                Pedidos de Despacho Inmediato ({allOrders.length})
              </h2>
            </div>
            {pendingOrders.length > 0 && (
              <span className="animate-pulse rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                {pendingOrders.length} URGENTE{pendingOrders.length > 1 ? "S" : ""}
              </span>
            )}
          </div>

          {allOrders.length === 0 ? (
            <p className="px-4 py-6 text-center text-xs text-slate-500">
              Aún no hay pedidos confirmados en esta ventana.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {allOrders.map((order) => {
                const isPending = order.status === "pending_dispatch";
                return (
                  <div
                    key={order.id}
                    className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between ${
                      isPending ? "border-l-4 border-l-red-600 bg-red-50/40" : ""
                    }`}
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-slate-900 px-2 py-0.5 font-mono font-bold text-white">
                          Pedido #{order.id}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold ${
                            isPending
                              ? "bg-red-100 text-red-800"
                              : order.status === "dispatched"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isPending
                            ? "🔴 Pendiente despacho"
                            : order.status === "dispatched"
                            ? "🚚 En camino"
                            : order.status === "cancelled"
                            ? "⚪ Cancelado"
                            : "✅ Entregado"}
                        </span>
                        <span className="text-slate-500">{formatDateEc(order.createdAt)}</span>
                      </div>

                      <p className="text-sm font-bold text-slate-900">
                        {order.customerName || "Cliente"} •{" "}
                        <span className="text-emerald-700">${order.totalUsd.toFixed(2)}</span>{" "}
                        <span className="font-normal text-slate-500">
                          ({order.phone || order.sessionId})
                        </span>
                      </p>

                      <p className="text-slate-700">
                        <strong>Vehículo:</strong> {formatVehicle(order.vehicle)} |{" "}
                        <strong>Dirección:</strong> {order.deliveryAddress || "Por confirmar"} |{" "}
                        <strong>Pago:</strong> {order.paymentMethod || "Por confirmar"}
                      </p>

                      <p className="text-slate-600">
                        <strong>Ítems:</strong>{" "}
                        {order.itemsJson.map((it) => `${it.name} ($${Number(it.unitPriceIva).toFixed(2)})`).join(" + ")}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {isPending && (
                        <button
                          type="button"
                          onClick={() => void handleOrderStatus(order.id, "dispatched")}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
                        >
                          Despachar ahora
                        </button>
                      )}
                      {order.status !== "completed" && (
                        <button
                          type="button"
                          onClick={() => void handleOrderStatus(order.id, "completed")}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-600 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Completar</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SECCIÓN 2: RANKING SIN STOCK + RECOMENDACIONES */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Package className="h-4 w-4 text-blue-600" />
              <span>Ranking Productos Pedidos Sin Stock (7 días)</span>
            </h2>
            {!audit || audit.outOfStockRanking.length === 0 ? (
              <p className="text-xs text-slate-500">Sin solicitudes fuera de inventario esta semana.</p>
            ) : (
              <ul className="space-y-2.5 text-xs">
                {audit.outOfStockRanking.map((item) => (
                  <li key={item.term} className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>{item.term}</span>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">
                        {item.count}x
                      </span>
                    </div>
                    {item.sampleMessages.length > 0 && (
                      <p className="mt-1 text-[11px] text-slate-500">
                        Ej: &ldquo;{item.sampleMessages[0]}&rdquo;
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
              <BarChart3 className="h-4 w-4 text-amber-600" />
              <span>Recomendaciones Semanales</span>
            </h2>
            <ul className="space-y-2 text-xs text-slate-700">
              {(audit?.recommendations || []).map((rec, i) => (
                <li key={i} className="rounded-lg border border-amber-100 bg-amber-50/50 p-2.5">
                  {rec}
                </li>
              ))}
            </ul>
            {audit && audit.unmappedVehicles.length > 0 && (
              <div className="mt-3 border-t border-slate-100 pt-2.5 text-xs">
                <strong className="text-slate-800">Vehículos por agregar al diccionario:</strong>{" "}
                <span className="text-slate-600">
                  {audit.unmappedVehicles.map((v) => `${v.vehicle} (${v.count})`).join(", ")}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* SECCIÓN 3: HISTORIAL COMPLETO DE CHATS */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-base">
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>Historial Omnicanal de Conversaciones</span>
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "Todos" },
                { id: "whatsapp", label: "WhatsApp" },
                { id: "demo_web", label: "Demo Web" },
                { id: "instagram", label: "Instagram" },
                { id: "messenger", label: "Messenger" },
              ].map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setChannelFilter(ch.id);
                    void loadDashboard(adminKey, ch.id, onlyFix);
                  }}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                    channelFilter === ch.id
                      ? "bg-[#061B40] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {ch.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  const next = !onlyFix;
                  setOnlyFix(next);
                  void loadDashboard(adminKey, channelFilter, next);
                }}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                  onlyFix
                    ? "border-amber-500 bg-amber-100 text-amber-900"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <AlertTriangle className="h-3 w-3" />
                <span>Solo ⚠️ Corregir</span>
              </button>
            </div>
          </div>

          {!snapshot || snapshot.chatTurns.length === 0 ? (
            <p className="px-4 py-8 text-center text-xs text-slate-500">
              No hay mensajes que coincidan con este filtro.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {snapshot.chatTurns.map((turn) => (
                <div key={turn.messageId} className="space-y-2 p-4 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-emerald-100 px-2 py-0.5 font-semibold uppercase text-emerald-900">
                        {turn.channel}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">{turn.sessionId}</span>
                      {turn.customerName && (
                        <span className="font-semibold text-slate-800">{turn.customerName}</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <Car className="h-3.5 w-3.5 text-slate-400" />
                        {formatVehicle(turn.activeVehicle, turn.city)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      {turn.latencyMs !== null && <span>{turn.latencyMs} ms</span>}
                      {turn.qaFlag === "fix" && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-900">
                          ⚠️ Corregir
                        </span>
                      )}
                      {turn.qaFlag === "good" && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">
                          👍 Bien
                        </span>
                      )}
                      <span>{formatDateEc(turn.createdAt)}</span>
                    </div>
                  </div>

                  {turn.userPrompt && (
                    <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-800">
                      <strong className="text-slate-500">Cliente:</strong> {turn.userPrompt}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap rounded-lg border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-slate-900">
                    <strong className="text-emerald-800">Milo:</strong> {turn.hermesReply}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    {turn.intentTag && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono">{turn.intentTag}</span>
                    )}
                    {turn.skusUsed.length > 0 && (
                      <span className="font-mono text-emerald-800">SKUs: {turn.skusUsed.join(", ")}</span>
                    )}
                    {turn.qaNote && (
                      <span className="rounded bg-amber-50 px-2 py-0.5 font-medium text-amber-900">
                        Nota: {turn.qaNote}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
