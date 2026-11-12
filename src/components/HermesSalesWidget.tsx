"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles, MessageCircle, Gift } from "lucide-react";
import { useWhatsAppSelector } from "@/context/WhatsAppSelectorContext";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

export default function HermesSalesWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Hermes, tu Asesor IA 24/7 de LíderPro Pedernales. Dime la marca, modelo y año de tu vehículo para recomendarte el ¡Combo Cambio MANNOL! o batería exacta con tu regalo (MANNOL 6145 Cockpit Care + Esponja).",
    },
  ]);
  const { openSelector } = useWhatsAppSelector();

  const sendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const nextMessages: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    if (!textOverride) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/hermes-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(-6),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Con gusto te ayudamos por WhatsApp en nuestras 2 líneas oficiales.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Para confirmar tu pedido al instante, elige una de nuestras 2 líneas oficiales de WhatsApp aquí abajo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const lastUserMsg =
    [...messages].reverse().find((m) => m.role === "user")?.content ||
    "Asesoría Combo Cambio MANNOL";

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-50">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 rounded-3xl bg-[#09152B]/98 border-2 border-[#FACC15]/70 shadow-[0_24px_64px_rgba(0,0,0,0.85)] text-white overflow-hidden flex flex-col max-h-[75vh]">
          {/* Header */}
          <div className="bg-[#070B14] px-4 py-3.5 border-b border-[#FACC15]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FACC15] text-slate-950 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>Hermes IA • LíderPro</span>
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                </h3>
                <p className="text-[10px] text-[#FACC15] font-bold">
                  Asesor Técnico 24/7 • IVA + Envío Gratis
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Cerrar asistente Hermes"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-[#FACC15] text-slate-950 font-bold"
                      : "bg-[#070B14] border border-white/15 text-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#070B14] border border-white/15 text-[#FACC15] rounded-2xl px-3.5 py-2 text-xs font-bold animate-pulse">
                  Consultando ficha técnica y stock...
                </div>
              </div>
            )}
          </div>

          {/* Quick Vehicle Prompts */}
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {["Aveo 2016 Combo", "D-Max 4x4 Diésel", "Batería 24HP"].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendMessage(q)}
                className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#FACC15] hover:text-slate-950 text-slate-200 border border-white/10 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Dual WhatsApp Close Bar */}
          <div className="px-3 py-2 bg-[#070B14]/90 border-t border-white/10">
            <button
              type="button"
              onClick={() =>
                openSelector({
                  itemTitle: `Consulta Hermes IA: ${lastUserMsg}`,
                  customMessage: `¡Hola LiderPro! Vengo de hablar con Hermes IA en la web sobre: "${lastUserMsg}". Deseo confirmar mi cotización y reclamar mi regalo (MANNOL 6145 Cockpit Care + Esponja).`,
                  sourceLocation: "hermes_ai_close",
                })
              }
              className="w-full py-2 px-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Enviar Pedido a WhatsApp (2 Líneas)</span>
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 bg-[#070B14] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: Tengo un Kia Sportage 2019..."
              className="flex-1 bg-[#09152B] border border-white/20 focus:border-[#FACC15] rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-[#FACC15] hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black cursor-pointer"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#09152B] hover:bg-[#0D1E3D] text-white border-2 border-[#FACC15] shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Abrir Asesor IA Hermes 24/7"
      >
        <Sparkles className="w-4 h-4 text-[#FACC15]" />
        <span className="text-xs font-black tracking-wide">
          Asesor IA 24/7
        </span>
        <Gift className="w-4 h-4 text-[#22C55E]" />
      </button>
    </div>
  );
}
