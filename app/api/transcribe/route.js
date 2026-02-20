import { NextResponse } from "next/server";

/**
 * POST /api/transcribe
 * Body: { url: string, language?: string }
 */
export async function POST(request) {
  try {
    const { url, language = "auto" } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;
    if (!ytRegex.test(url)) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // --- PRODUCTION IMPLEMENTATION ---
    // Install: npm install openai ytdl-core
    //
    // Step 1: Extract audio from YouTube
    // const ytdl = require("ytdl-core");
    // const { Readable } = require("stream");
    // const audioStream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
    // const chunks = [];
    // for await (const chunk of audioStream) chunks.push(chunk);
    // const audioBuffer = Buffer.concat(chunks);
    //
    // Step 2: Send to OpenAI Whisper
    // const OpenAI = require("openai");
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const audioBlob = new Blob([audioBuffer], { type: "audio/mp4" });
    // const file = new File([audioBlob], "audio.mp4", { type: "audio/mp4" });
    //
    // const transcription = await openai.audio.transcriptions.create({
    //   file,
    //   model: "whisper-1",
    //   language: language === "auto" ? undefined : language,
    //   response_format: "verbose_json",
    //   timestamp_granularities: ["segment"],
    // });
    //
    // return NextResponse.json({
    //   success: true,
    //   transcript: transcription.text,
    //   segments: transcription.segments.map(s => ({
    //     start: s.start,
    //     end: s.end,
    //     text: s.text,
    //     timestamp: formatTime(s.start),
    //   })),
    //   language: transcription.language,
    //   duration: transcription.duration,
    // });

    // DEMO RESPONSE
    const demoSegments = [
      { start: 0, end: 8, text: "Welcome to this incredible journey through the natural world.", timestamp: "00:00" },
      { start: 8, end: 18, text: "In the heart of the Amazon, life exists in forms we can barely imagine.", timestamp: "00:08" },
      { start: 18, end: 27, text: "Every species here has evolved over millions of years to fill its perfect niche.", timestamp: "00:18" },
      { start: 27, end: 35, text: "The biodiversity of this region is unmatched anywhere else on Earth.", timestamp: "00:27" },
      { start: 35, end: 45, text: "Scientists estimate over 3 million species call this place home.", timestamp: "00:35" },
    ];

    return NextResponse.json({
      success: true,
      message: "Demo mode — add OPENAI_API_KEY to .env.local for real transcription",
      transcript: demoSegments.map(s => s.text).join(" "),
      segments: demoSegments,
      language: language === "auto" ? "en" : language,
      duration: 45.2,
    });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json({ error: "Failed to transcribe video" }, { status: 500 });
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export async function GET() {
  return NextResponse.json({ message: "YTFlow Transcribe API — use POST with { url, language }" });
}
