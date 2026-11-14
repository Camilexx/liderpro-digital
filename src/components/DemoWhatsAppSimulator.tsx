"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCheck, Lock, Send, Sparkles, Zap } from "lucide-react";

interface MessageItem {
  id: string;
  sender: "user" | "hermes";
  text: string;
  time: string;
  latencyMs?: number;
  model?: string;
}

const QUICK_PROMPTS = [
  "Cotizar Combo MANNOL para Aveo 2018",
  "Precio Batería para camioneta D-Max",
  "Combo 4x4 Diésel con Regalo",
  "¿Cuánto falta para envío gratis?",
];

function nowTime(): string {
  const d = new Date();
  return d.toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function renderFormattedText(text: string) {
  // Convierte *negritas* de WhatsApp y saltos de línea de forma segura sin dangerouslySetInnerHTML
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
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome-1",
      sender: "hermes",
      text:
        "¡Hola! Bienvenido a *LíderPro Pedernales* — *Línea 24/7 (+593 96 748 9002)*.\n\n" +
        "Soy *Hermes*, tu asesor técnico y comercial con acceso al catálogo privado de *426 SKUs* (Baterías Bosch y Ecuador, Lubricantes MANNOL, Filtros Advance y Combos con Regalo).\n\n" +
        "Selecciona una prueba rápida arriba o escríbeme tu vehículo o repuesto para cotizar al instante con *IVA incluido* y factura electrónica SRI.",
      time: "09:00",
      model: "hermes-online",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  async function sendMessage(rawText: string) {
    const trimmed = rawText.trim();
    if (!trimmed || isSending) return;

    const userMsg: MessageItem = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: nowTime(),
    };

    const nextHistory = messages
      .filter((m) => m.id !== "welcome-1")
      .slice(-6)
      .map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const resp = await fetch("/api/demo-whatsapp-hermes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextHistory,
        }),
      });
      const data = (await resp.json()) as {
        reply?: string;
        latencyMs?: number;
        model?: string;
        error?: string;
      };

      const replyText =
        data.reply ||
        data.error ||
        "Lo siento, no pude conectar con la bodega. Intenta de nuevo en un segundo.";

      if (typeof data.latencyMs === "number") {
        setLastLatency(data.latencyMs);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `h-${Date.now()}`,
          sender: "hermes",
          text: replyText,
          time: nowTime(),
          latencyMs: data.latencyMs,
          model: data.model,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "hermes",
          text: "Error temporal de red al consultar el motor Hermes. Por favor intenta nuevamente.",
          time: nowTime(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0B141A] sm:py-4 sm:px-4">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden bg-[#EFEAE2] shadow-2xl sm:rounded-2xl sm:border sm:border-emerald-950/30">
        {/* Header oficial estilo WhatsApp Business */}
        <header className="flex items-center justify-between gap-3 bg-[#075E54] px-4 py-3 text-white shadow-md">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-emerald-300/60 bg-white p-1">
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
                LíderPro Pedernales • Línea 24/7 (+593 96 748 9002)
              </h1>
              <p className="flex items-center gap-1.5 text-xs text-emerald-100/95">
                <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" />
                <span>En línea</span>
                <span className="hidden text-emerald-200/75 sm:inline">• Hermes IA • 426/426 SKUs con IVA</span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#054D44] px-2.5 py-1 text-[11px] font-medium text-emerald-100">
            <Zap className="h-3.5 w-3.5 text-[#25D366]" />
            <span>{lastLatency !== null ? `${(lastLatency / 1000).toFixed(2)}s` : "< 2.5s"}</span>
          </div>
        </header>

        {/* Barra superior de 4 pruebas rápidas */}
        <section
          aria-label="Pruebas rápidas de WhatsApp Business"
          className="border-b border-[#D1D7DB] bg-[#F0F2F5] px-3 py-2.5"
        >
          <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#54656F]">
            <Sparkles className="h-3.5 w-3.5 text-[#008069]" />
            <span>Pruebas rápidas (1 clic):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={isSending}
                onClick={() => void sendMessage(prompt)}
                className="rounded-full border border-[#008069]/25 bg-white px-3 py-1.5 text-xs font-medium text-[#075E54] shadow-sm transition hover:border-[#008069] hover:bg-[#E7FCEB] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
              Simulador privado Meta Business Review • Precios reales de Bodega Pedernales con IVA 15%
            </span>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
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
                    {!isUser && typeof msg.latencyMs === "number" && (
                      <span className="mr-1 text-[#008069]">
                        {(msg.latencyMs / 1000).toFixed(2)}s
                      </span>
                    )}
                    <span>{msg.time}</span>
                    {isUser && (
                      <CheckCheck
                        className="h-4 w-4 text-[#53BDEB]"
                        aria-label="Leído"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex justify-start">
              <div className="rounded-xl rounded-tl-none bg-white px-4 py-2.5 text-xs text-[#54656F] shadow-sm">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#008069]">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#25D366]" />
                  <span>Hermes está cotizando en bodega...</span>
                </span>
              </div>
            </div>
          )}
        </main>

        {/* Barra de entrada de mensajes */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input);
          }}
          className="flex items-center gap-2 border-t border-[#D1D7DB] bg-[#F0F2F5] px-3 py-2.5 sm:px-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta (ej. Batería Bosch N40, Combo Aveo, envío)..."
            aria-label="Mensaje para Hermes WhatsApp 24/7"
            disabled={isSending}
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
