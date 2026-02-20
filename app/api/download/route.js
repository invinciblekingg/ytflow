import { NextResponse } from "next/server";

/**
 * POST /api/download
 * Body: { url: string, format: "mp4" | "mp3" | "webm", quality: "4K" | "1080p" | "720p" }
 */
export async function POST(request) {
  try {
    const { url, format = "mp4", quality = "1080p" } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate YouTube URL
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;
    if (!ytRegex.test(url)) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // --- PRODUCTION IMPLEMENTATION ---
    // Install: npm install ytdl-core
    //
    // const ytdl = require("ytdl-core");
    //
    // const info = await ytdl.getInfo(url);
    // const formats = ytdl.filterFormats(info.formats, format === "mp3" ? "audioonly" : "videoandaudio");
    //
    // const qualityMap = { "4K": "2160p", "1080p": "1080p", "720p": "720p" };
    // const selectedFormat = formats.find(f => f.qualityLabel === qualityMap[quality]) || formats[0];
    //
    // const stream = ytdl(url, { format: selectedFormat });
    // const chunks = [];
    // for await (const chunk of stream) chunks.push(chunk);
    // const buffer = Buffer.concat(chunks);
    //
    // return new Response(buffer, {
    //   headers: {
    //     "Content-Type": format === "mp3" ? "audio/mpeg" : "video/mp4",
    //     "Content-Disposition": `attachment; filename="video.${format}"`,
    //   },
    // });

    // DEMO RESPONSE
    return NextResponse.json({
      success: true,
      message: "Demo mode — integrate ytdl-core for real downloads",
      data: {
        url,
        format,
        quality,
        title: "Sample Video Title",
        duration: "10:32",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        downloadUrl: "#demo",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "YTFlow Download API — use POST with { url, format, quality }" });
}
