"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCheck,
  Database,
  Lock,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  Zap,
} from "lucide-react";

interface VehicleSnapshot {
  make?: string;
  model?: string;
  year?: number;
  engine?: string;
  fuel?: string;
  unmappedLabel?: string;
}

interface MessageItem {
  id: string;
  dbMessageId?: number | null;
  sender: "user" | "hermes";
  text: string;
  time: string;
  latencyMs?: number;
  model?: string;
  matchedSkus?: string[];
  activeVehicle?: VehicleSnapshot | null;
  city?: string | null;
  quotedTotalUsd?: number | null;
  intentTag?: string | null;
  qaFlag?: "good" | "fix" | null;
  qaNote?: string | null;
  qaSaving?: boolean;
  orderId?: number | null;
}

const SUGGESTION_PROMPTS = [
  "Hola, mi carro bota humo negro y está tragando gasolina, qué aditivo recomiendan?",
  "Buenas, venden grasa para rodamientos y líquido de frenos?",
  "Tengo una Hilux 2020 diésel",
  "Necesito aceite hidráulico ISO 68 en caneca de 20 litros para camaronera",
  "¿Cuánto cuesta el MANNOL Motor Flush Professional + Ester 450ml?",
  "¿puedo mezclar aceite de cocina con 5W-30?",
  "¿tienen pastillas de freno?",
];

function createFreshSessionId(): string {
  return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function nowTime(): string {
  return new Date().toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatVehicleSummary(v?: VehicleSnapshot | null, city?: string | null): string {
  const parts: string[] = [];
  if (v) {
    if (v.unmappedLabel && !v.model) {
      parts.push(v.unmappedLabel);
    } else {
      const vText = [v.make, v.model, v.year ? String(v.year) : "", v.engine, v.fuel]
        .filter(Boolean)
        .join(" ");
      if (vText) parts.push(vText);
    }
  }
  if (parts.length === 0) parts.push("Sin vehículo guardado");
  if (city) parts.push(`Ciudad: ${city}`);
  return parts.join(" • ");
}

function buildWelcomeMessage(): MessageItem {
  return {
    id: "welcome-1",
    sender: "hermes",
    text:
      "¡Hola! Bienvenido a *LíderPro Pedernales* (+593 96 748 9002) 👋\n\n" +
      "Soy *Milo*, tu asesor automotriz en *aditivos, refrigerantes, grasas, aceites de motor/transmisión, hidráulicos, estética UV3, filtros Advance y baterías Bosch/Ecuador* (instalación gratis a domicilio en Pedernales).\n\n" +
      "Cuéntame qué necesita tu vehículo o qué producto buscas y te cotizo al instante con *IVA incluido*.",
    time: nowTime(),
    model: "milo-online",
  };
}

function renderFormattedText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*[^*]+\*)/g);
    return (
      <span key={lineIdx} className="block min-h-[1.15rem]">
        {parts.map((part, pIdx) => {
          if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
            return (
              <strong key={pIdx} className="font-semibold text-[#111B21]">
                {part.slice(1, -1)}
              </strong>
            );
          }
          return <span key={pIdx}>{part}</span>;
        })}
      </span>
    );
  });
}

export default function DemoWhatsAppSimulator() {
  const [sessionId, setSessionId] = useState<string>(() => createFreshSessionId());
  const [messages, setMessages] = useState<MessageItem[]>(() => [buildWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [qaMode, setQaMode] = useState(false);
  const [editingFixId, setEditingFixId] = useState<string | null>(null);
  const [fixNoteDraft, setFixNoteDraft] = useState("");
  const [activeVehicleState, setActiveVehicleState] = useState<VehicleSnapshot | null>(null);
  const [cityState, setCityState] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending, qaMode]);

  function handleResetChat() {
    if (isSending) return;
    setSessionId(createFreshSessionId());
    setMessages([buildWelcomeMessage()]);
    setActiveVehicleState(null);
    setCityState(null);
    setLastLatency(null);
    setEditingFixId(null);
    setFixNoteDraft("");
    setInput("");
    inputRef.current?.focus();
  }

  async function sendMessage(rawText: string) {
    const trimmed = rawText.trim();
    if (!trimmed || isSending) return;

    const userMsg: MessageItem = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: nowTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const resp = await fetch("/api/demo-whatsapp-hermes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
        }),
      });
      const data = (await resp.json()) as {
        reply?: string;
        latencyMs?: number;
        model?: string;
        error?: string;
        sessionId?: string;
        messageId?: number | null;
        matchedSkus?: string[];
        activeVehicle?: VehicleSnapshot | null;
        city?: string | null;
        quotedTotalUsd?: number | null;
        intentTag?: string | null;
        orderCreated?: boolean;
        order?: { id: number } | null;
      };

      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
      }
      if (data.activeVehicle !== undefined) {
        setActiveVehicleState(data.activeVehicle);
      }
      if (data.city !== undefined) {
        setCityState(data.city);
      }

      const replyText =
        data.reply ||
        data.error ||
        "Disculpa, tuve una interrupción breve consultando la bodega. Intenta de nuevo en un momento.";

      if (typeof data.latencyMs === "number") {
        setLastLatency(data.latencyMs);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `h-${Date.now()}`,
          dbMessageId: data.messageId ?? null,
          sender: "hermes",
          text: replyText,
          time: nowTime(),
          latencyMs: data.latencyMs,
          model: data.model,
          matchedSkus: Array.isArray(data.matchedSkus) ? data.matchedSkus : [],
          activeVehicle: data.activeVehicle ?? activeVehicleState,
          city: data.city ?? cityState,
          quotedTotalUsd: data.quotedTotalUsd ?? null,
          intentTag: data.intentTag ?? null,
          orderId: data.orderCreated && data.order?.id ? data.order.id : null,
          qaFlag: null,
          qaNote: null,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "hermes",
          text: "Error temporal de red al consultar a Milo. Por favor intenta nuevamente.",
          time: nowTime(),
        },
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  async function submitQaFeedback(msg: MessageItem, flag: "good" | "fix", note?: string) {
    if (!msg.dbMessageId) return;
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, qaSaving: true } : m))
    );

    try {
      const resp = await fetch("/api/demo-whatsapp-hermes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: msg.dbMessageId,
          qaFlag: flag,
          qaNote: note?.trim() || undefined,
        }),
      });
      if (resp.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msg.id
              ? { ...m, qaFlag: flag, qaNote: note?.trim() || m.qaNote || null, qaSaving: false }
              : m
          )
        );
        if (editingFixId === msg.id) {
          setEditingFixId(null);
          setFixNoteDraft("");
        }
        return;
      }
    } catch {
      // Mantiene estado previo sin romper UI
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, qaSaving: false } : m))
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0B141A] sm:px-4 sm:py-4">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden bg-[#EFEAE2] shadow-2xl sm:rounded-2xl sm:border sm:border-emerald-950/30">
        {/* Header estilo WhatsApp Business */}
        <header className="flex items-center justify-between gap-2 bg-[#075E54] px-3 py-2.5 text-white shadow-md sm:px-4">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-emerald-300/60 bg-white p-1 sm:h-11 sm:w-11">
              <Image
                src="/images/logo.png"
                alt="LíderPro Pedernales Logo"
                fill
                sizes="44px"
                className="object-contain p-0.5"
                priority
              />
              <span
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-[#25D366]"
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold tracking-tight sm:text-base">
                Milo • Asesor Automotriz de LíderPro Pedernales
              </h1>
              <p className="flex items-center gap-1.5 truncate text-xs text-emerald-100/95">
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#25D366]" />
                {isSending ? (
                  <span className="font-semibold text-[#86EFAC]">Escribiendo...</span>
                ) : (
                  <>
                    <span>En línea</span>
                    <span className="hidden text-emerald-200/75 sm:inline">
                      • +593 96 748 9002 • 426 SKUs c/IVA
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Switch discreto Auditoría QA (apagado por defecto) */}
            <button
              type="button"
              role="switch"
              aria-checked={qaMode}
              onClick={() => setQaMode((v) => !v)}
              title="Activar/Desactivar Inspector Auditoría QA"
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                qaMode
                  ? "border-amber-300/70 bg-amber-400/20 text-amber-100"
                  : "border-white/15 bg-[#054D44] text-emerald-100/85 hover:bg-[#06453D]"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Auditoría QA</span>
              <span className="sm:hidden">QA</span>
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  qaMode ? "bg-amber-300" : "bg-emerald-200/40"
                }`}
              />
            </button>

            <button
              type="button"
              onClick={handleResetChat}
              disabled={isSending}
              title="Reiniciar chat y crear sesión nueva"
              className="flex items-center gap-1 rounded-full border border-white/15 bg-[#054D44] px-2.5 py-1 text-[11px] font-medium text-emerald-100 transition hover:bg-[#06453D] active:scale-95 disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reiniciar chat</span>
            </button>

            {qaMode && (
              <div className="hidden items-center gap-1 rounded-full bg-[#054D44] px-2 py-1 text-[11px] font-medium text-emerald-100 md:flex">
                <Zap className="h-3 w-3 text-[#25D366]" />
                <span>{lastLatency !== null ? `${lastLatency} ms` : "Listo"}</span>
              </div>
            )}
          </div>
        </header>

        {/* Sugerencias rápidas discretas (opcionales) */}
        <section
          aria-label="Sugerencias opcionales de consulta"
          className="border-b border-[#D1D7DB] bg-[#F0F2F5]/95 px-3 py-2"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#54656F]">
              <Sparkles className="h-3 w-3 text-[#008069]" />
              <span>Sugerencias:</span>
            </span>
            {SUGGESTION_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={isSending}
                onClick={() => void sendMessage(prompt)}
                className="shrink-0 rounded-full border border-[#008069]/20 bg-white px-2.5 py-1 text-[11.5px] font-medium text-[#075E54] shadow-sm transition hover:border-[#008069] hover:bg-[#E7FCEB] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>
        </section>

        {/* Lienzo de conversación WhatsApp */}
        <main
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-5"
          style={{
            backgroundColor: "#EFEAE2",
            backgroundImage:
              "radial-gradient(rgba(11,20,26,0.05) 1px, transparent 1px), radial-gradient(rgba(11,20,26,0.03) 1px, #EFEAE2 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        >
          <div className="mx-auto mb-2 flex w-fit items-center gap-1.5 rounded-lg bg-[#FFEECD] px-3 py-1.5 text-center text-[11px] text-[#54656F] shadow-sm">
            <Lock className="h-3 w-3 shrink-0 text-[#8B6F21]" />
            <span>
              WhatsApp Business 24/7 • Precios reales de Bodega Pedernales con IVA 15% incluido
            </span>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            const showQaCard = qaMode && !isUser && msg.id !== "welcome-1";

            return (
              <div
                key={msg.id}
                className={`flex w-full flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`relative max-w-[88%] rounded-xl px-3.5 py-2 text-[13.5px] leading-relaxed shadow-sm sm:max-w-[78%] ${
                    isUser
                      ? "rounded-tr-none bg-[#D9FDD3] text-[#111B21]"
                      : "rounded-tl-none bg-white text-[#111B21]"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {renderFormattedText(msg.text)}
                  </div>

                  <div className="mt-1 flex items-center justify-end gap-1 text-[10.5px] text-[#667781]">
                    <span>{msg.time}</span>
                    {isUser && (
                      <CheckCheck className="h-4 w-4 text-[#53BDEB]" aria-label="Leído" />
                    )}
                  </div>
                </div>

                {/* Panel Inspector QA por respuesta (solo visible si switch Auditoría QA está ON) */}
                {showQaCard && (
                  <div className="mt-1.5 w-full max-w-[88%] rounded-lg border border-slate-300/80 bg-white/95 p-2.5 text-[11px] text-slate-700 shadow-sm sm:max-w-[78%]">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 font-semibold text-emerald-800">
                          <Zap className="h-3 w-3" />
                          {typeof msg.latencyMs === "number" ? `${msg.latencyMs} ms` : "N/D"}
                        </span>
                        {msg.intentTag && (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                            {msg.intentTag}
                          </span>
                        )}
                        {typeof msg.quotedTotalUsd === "number" && (
                          <span className="rounded bg-amber-50 px-1.5 py-0.5 font-semibold text-amber-800">
                            Total ref: ${msg.quotedTotalUsd.toFixed(2)}
                          </span>
                        )}
                        {typeof msg.orderId === "number" && (
                          <span className="rounded bg-emerald-600 px-1.5 py-0.5 font-semibold text-white">
                            Pedido #{msg.orderId} creado
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={Boolean(msg.qaSaving) || !msg.dbMessageId}
                          onClick={() => void submitQaFeedback(msg, "good")}
                          className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium transition ${
                            msg.qaFlag === "good"
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50"
                          } disabled:opacity-50`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>Bien</span>
                        </button>
                        <button
                          type="button"
                          disabled={Boolean(msg.qaSaving) || !msg.dbMessageId}
                          onClick={() => {
                            if (editingFixId === msg.id) {
                              setEditingFixId(null);
                            } else {
                              setEditingFixId(msg.id);
                              setFixNoteDraft(msg.qaNote || "");
                            }
                          }}
                          className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium transition ${
                            msg.qaFlag === "fix"
                              ? "border-amber-600 bg-amber-600 text-white"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-400 hover:bg-amber-50"
                          } disabled:opacity-50`}
                        >
                          <AlertTriangle className="h-3 w-3" />
                          <span>Corregir</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-1.5 space-y-1">
                      <div className="flex items-start gap-1.5 text-slate-600">
                        <Database className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
                        <span>
                          <strong className="font-semibold text-slate-800">Ficha:</strong>{" "}
                          {formatVehicleSummary(msg.activeVehicle, msg.city)}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        <strong className="font-semibold text-slate-800">SKUs:</strong>{" "}
                        {msg.matchedSkus && msg.matchedSkus.length > 0 ? (
                          <span className="font-mono text-[10.5px] text-emerald-900">
                            {msg.matchedSkus.join(", ")}
                          </span>
                        ) : (
                          <span className="text-slate-400">Ninguno (sin inventario / filtro)</span>
                        )}
                      </div>
                      {msg.qaFlag === "fix" && msg.qaNote && editingFixId !== msg.id && (
                        <div className="rounded bg-amber-50 px-2 py-1 text-amber-900">
                          <strong>Nota QA:</strong> {msg.qaNote}
                        </div>
                      )}
                    </div>

                    {editingFixId === msg.id && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <input
                          type="text"
                          value={fixNoteDraft}
                          onChange={(e) => setFixNoteDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              void submitQaFeedback(msg, "fix", fixNoteDraft || "Marcado para revisión");
                            }
                          }}
                          placeholder="Ej. Faltó sugerir filtro 078AO-1539 o tono..."
                          className="flex-1 rounded border border-amber-300 bg-amber-50/40 px-2 py-1 text-[11px] text-slate-800 focus:border-amber-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          disabled={Boolean(msg.qaSaving)}
                          onClick={() =>
                            void submitQaFeedback(msg, "fix", fixNoteDraft || "Marcado para revisión")
                          }
                          className="rounded bg-amber-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                        >
                          Guardar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {isSending && (
            <div className="flex justify-start">
              <div className="rounded-xl rounded-tl-none bg-white px-4 py-2.5 text-xs text-[#54656F] shadow-sm">
                <span className="inline-flex items-center gap-2 font-medium text-[#008069]">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#25D366]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#25D366] [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#25D366] [animation-delay:300ms]" />
                  </span>
                  <span>Escribiendo...</span>
                </span>
              </div>
            </div>
          )}
        </main>

        {/* Caja de texto libre real en el pie estilo WhatsApp */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input);
          }}
          className="flex items-center gap-2 border-t border-[#D1D7DB] bg-[#F0F2F5] px-3 py-2.5 sm:px-4"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe cualquier consulta libre (ej. Aditivos humo negro, Hilux 2020, ISO 68)..."
            aria-label="Escribe tu mensaje libre para Milo"
            className="flex-1 rounded-full border border-transparent bg-white px-4 py-2.5 text-sm text-[#111B21] placeholder-[#667781] shadow-sm focus:border-[#00A884] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            aria-label="Enviar mensaje"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00A884] text-white shadow-md transition hover:bg-[#008F6F] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#8696A0]"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
