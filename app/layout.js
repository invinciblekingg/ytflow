import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YTFlow - YouTube Download & Transcription",
  description: "Download YouTube videos and generate AI-powered transcriptions",
  keywords: "youtube, download, transcription, ai, whisper",
  openGraph: {
    title: "YTFlow",
    description: "Download YouTube videos and generate AI-powered transcriptions",
    url: "https://ytflow.vercel.app",
    siteName: "YTFlow",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
