import { META_CONFIG } from "@/data/metaConfig";

export const AUDIO_FALLBACK_REPLY_ES =
  "¡Hola! Ahorita no pude abrir tu nota de voz, ¿me la escribes en una línea cortita y te ayudo al toque?";

export interface AudioTranscriptionResult {
  ok: boolean;
  text?: string;
  provider?: "groq" | "openai" | "nvidia";
  reason?: string;
}

export function isAudioTranscriptionConfigured(): boolean {
  return Boolean(
    (process.env.GROQ_API_KEY || "").trim() ||
      (process.env.OPENAI_API_KEY || "").trim() ||
      (process.env.NVIDIA_WHISPER_API_KEY || "").trim()
  );
}

export async function downloadMetaWhatsAppMedia(
  mediaId: string,
  waToken: string
): Promise<{ ok: boolean; buffer?: Buffer; mimeType?: string; reason?: string }> {
  const cleanId = (mediaId || "").trim();
  const cleanToken = (waToken || "").trim();
  if (!cleanId || !cleanToken) {
    return { ok: false, reason: "missing_media_id_or_token" };
  }

  try {
    const metaResp = await fetch(`https://graph.facebook.com/${META_CONFIG.graphVersion}/${cleanId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${cleanToken}` },
      signal: AbortSignal.timeout(4500),
    });
    if (!metaResp.ok) {
      return { ok: false, reason: `meta_media_lookup_http_${metaResp.status}` };
    }
    const metaJson = (await metaResp.json()) as { url?: string; mime_type?: string };
    if (!metaJson.url) {
      return { ok: false, reason: "meta_media_missing_url" };
    }

    const binResp = await fetch(metaJson.url, {
      method: "GET",
      headers: { Authorization: `Bearer ${cleanToken}` },
      signal: AbortSignal.timeout(6000),
    });
    if (!binResp.ok) {
      return { ok: false, reason: `meta_media_download_http_${binResp.status}` };
    }

    const arrBuf = await binResp.arrayBuffer();
    if (arrBuf.byteLength === 0 || arrBuf.byteLength > 15 * 1024 * 1024) {
      return { ok: false, reason: "invalid_audio_size" };
    }

    return {
      ok: true,
      buffer: Buffer.from(arrBuf),
      mimeType: metaJson.mime_type || "audio/ogg",
    };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "media_download_error" };
  }
}

async function transcribeWithOpenAiCompatible(params: {
  url: string;
  apiKey: string;
  model: string;
  provider: "groq" | "openai" | "nvidia";
  buffer: Buffer;
  mimeType: string;
  filename: string;
}): Promise<AudioTranscriptionResult> {
  try {
    const form = new FormData();
    const uint8 = new Uint8Array(params.buffer);
    const blob = new Blob([uint8], { type: params.mimeType || "audio/ogg" });
    form.append("file", blob, params.filename);
    form.append("model", params.model);
    form.append("language", "es");
    form.append("response_format", "json");

    const resp = await fetch(params.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
      },
      body: form,
      signal: AbortSignal.timeout(8000),
    });

    if (!resp.ok) {
      return { ok: false, provider: params.provider, reason: `http_${resp.status}` };
    }

    const json = (await resp.json()) as { text?: string };
    const text = (json.text || "").trim();
    if (!text) {
      return { ok: false, provider: params.provider, reason: "empty_transcript" };
    }
    return { ok: true, text, provider: params.provider };
  } catch (err) {
    return {
      ok: false,
      provider: params.provider,
      reason: err instanceof Error ? err.message : "transcription_error",
    };
  }
}

export async function transcribeAudioBuffer(params: {
  buffer: Buffer;
  mimeType?: string;
  filename?: string;
}): Promise<AudioTranscriptionResult> {
  const mimeType = params.mimeType || "audio/ogg";
  const ext = mimeType.includes("mp4") || mimeType.includes("m4a")
    ? "m4a"
    : mimeType.includes("mpeg") || mimeType.includes("mp3")
    ? "mp3"
    : mimeType.includes("wav")
    ? "wav"
    : "ogg";
  const filename = params.filename || `whatsapp-voice.${ext}`;

  const groqKey = (process.env.GROQ_API_KEY || "").trim();
  if (groqKey) {
    const res = await transcribeWithOpenAiCompatible({
      url: "https://api.groq.com/openai/v1/audio/transcriptions",
      apiKey: groqKey,
      model: "whisper-large-v3-turbo",
      provider: "groq",
      buffer: params.buffer,
      mimeType,
      filename,
    });
    if (res.ok) return res;
  }

  const openaiKey = (process.env.OPENAI_API_KEY || "").trim();
  if (openaiKey) {
    const res = await transcribeWithOpenAiCompatible({
      url: "https://api.openai.com/v1/audio/transcriptions",
      apiKey: openaiKey,
      model: "whisper-1",
      provider: "openai",
      buffer: params.buffer,
      mimeType,
      filename,
    });
    if (res.ok) return res;
  }

  const nvidiaWhisperKey = (process.env.NVIDIA_WHISPER_API_KEY || "").trim();
  const nvidiaWhisperUrl = (
    process.env.NVIDIA_WHISPER_URL || "https://integrate.api.nvidia.com/v1/audio/transcriptions"
  ).trim();
  if (nvidiaWhisperKey) {
    const res = await transcribeWithOpenAiCompatible({
      url: nvidiaWhisperUrl,
      apiKey: nvidiaWhisperKey,
      model: (process.env.NVIDIA_WHISPER_MODEL || "openai/whisper-large-v3").trim(),
      provider: "nvidia",
      buffer: params.buffer,
      mimeType,
      filename,
    });
    if (res.ok) return res;
  }

  return { ok: false, reason: "no_provider_configured" };
}
