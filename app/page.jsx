"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [url, setUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const heroTitleRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroInputRef = useRef(null);
  const statsRef = useRef(null);

  function showToast(msg) {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  }

  function simulateProcessing(callback) {
    setProcessing(true);
    setProgress(0);
    let w = 0;
    const interval = setInterval(() => {
      w += Math.random() * 15;
      if (w >= 95) {
        w = 95;
        clearInterval(interval);
        setTimeout(() => {
          setProcessing(false);
          setProgress(0);
          callback();
        }, 500);
      }
      setProgress(w);
    }, 200);
  }

  function handleDownload() {
    if (!url.trim()) { showToast("⚠️ Please paste a YouTube URL first"); return; }
    showToast("⚡ Analyzing video...");
    simulateProcessing(() => showToast("✅ Ready to download! Check your backend."));
  }

  function handleTranscribe() {
    if (!url.trim()) { showToast("⚠️ Please paste a YouTube URL first"); return; }
    showToast("🧠 AI Transcription started...");
    simulateProcessing(() => showToast("✅ Transcript ready!"));
  }

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(heroBadgeRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
      .from(".hero-word", { y: 120, opacity: 0, duration: 1, stagger: 0.15 }, 0.5)
      .from(heroSubRef.current, { opacity: 0, y: 20, duration: 0.8 }, 1.2)
      .from(heroInputRef.current, { opacity: 0, y: 20, duration: 0.8 }, 1.4)
      .from(statsRef.current, { opacity: 0, y: 20, duration: 0.8 }, 1.6);

    // Scroll animations
    gsap.from(".feature-card", {
      scrollTrigger: { trigger: ".features-grid", start: "top 80%" },
      y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
    });
    gsap.from(".step-item", {
      scrollTrigger: { trigger: ".steps-grid", start: "top 80%" },
      y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
    });
    gsap.from(".price-card", {
      scrollTrigger: { trigger: ".pricing-grid", start: "top 80%" },
      y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      {/* Toast */}
      <div style={{
        position: "fixed", bottom: 40, right: 40,
        background: "#111118", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12, padding: "16px 24px", fontSize: 14, zIndex: 1000,
        transform: toast.show ? "translateY(0)" : "translateY(100px)",
        opacity: toast.show ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        color: "#f0f0f8",
      }}>
        {toast.msg}
      </div>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 40px", background: "rgba(15, 15, 30, 0.8)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}>
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#a8e6cf" }}>YTFlow</div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#b0b0c0", fontWeight: 500 }}>
          {["Features", "Pricing", "API Docs"].map(i => (
            <a key={i} style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#a8e6cf"} onMouseLeave={(e) => e.target.style.color = "#b0b0c0"}>{i}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 60, textAlign: "center", overflow: "hidden" }}>
        <div ref={heroBadgeRef} style={{
          display: "inline-block", padding: "8px 16px", background: "rgba(168, 230, 207, 0.1)",
          border: "1px solid rgba(168, 230, 207, 0.3)", borderRadius: 20, fontSize: 12, color: "#a8e6cf", marginBottom: 24,
        }}>
          ✨ The Future of Content Extraction
        </div>
        <h1 ref={heroTitleRef} style={{
          fontSize: 72, fontWeight: "bold", marginBottom: 20, lineHeight: 1.2, letterSpacing: "-1px",
        }}>
          <div className="hero-word" style={{ display: "inline" }}>Download.</div>
          <div className="hero-word" style={{ display: "inline", color: "#a8e6cf" }}>Transcribe.</div>
          <div className="hero-word" style={{ display: "inline" }}>Analyze.</div>
        </h1>
        <p ref={heroSubRef} style={{
          fontSize: 18, color: "#b0b0c0", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px",
        }}>
          Extract audio from YouTube videos and get AI-powered transcriptions instantly. No coding required.
        </p>
        <div ref={heroInputRef} style={{
          display: "flex", gap: 12, maxWidth: 500, margin: "0 auto 50px", justifyContent: "center",
        }}>
          <input
            type="text" placeholder="Paste YouTube URL..." value={url} onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1, padding: "14px 20px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 8, color: "#f0f0f8", fontSize: 14, outline: "none",
            }}
          />
          <button onClick={handleDownload} style={{
            padding: "14px 28px", background: "#a8e6cf", color: "#111118", border: "none", borderRadius: 8,
            fontWeight: "bold", cursor: "pointer", transition: "opacity 0.3s",
          }} onMouseEnter={(e) => e.target.style.opacity = 0.9} onMouseLeave={(e) => e.target.style.opacity = 1}>
            Download
          </button>
          <button onClick={handleTranscribe} style={{
            padding: "14px 28px", background: "rgba(168, 230, 207, 0.2)", color: "#a8e6cf", border: "1px solid rgba(168, 230, 207, 0.3)",
            borderRadius: 8, fontWeight: "bold", cursor: "pointer", transition: "all 0.3s",
          }} onMouseEnter={(e) => { e.target.style.background = "rgba(168, 230, 207, 0.3)"; }} onMouseLeave={(e) => e.target.style.background = "rgba(168, 230, 207, 0.2)"}>
            Transcribe
          </button>
        </div>
        {processing && (
          <div style={{
            width: "80%", height: 4, background: "rgba(255, 255, 255, 0.1)", borderRadius: 2, margin: "0 auto 30px", overflow: "hidden",
          }}>
            <div style={{
              width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #a8e6cf, #55d6be)",
              transition: "width 0.1s linear",
            }} />
          </div>
        )}
        <div ref={statsRef} style={{
          display: "flex", justifyContent: "center", gap: 60, fontSize: 13, color: "#b0b0c0",
        }}>
          {[{ n: "10.5K+", l: "Videos Processed" }, { n: "2.3M+", l: "Minutes Transcribed" }, { n: "99.9%", l: "Uptime" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: "bold", color: "#a8e6cf", marginBottom: 4 }}>{s.n}</div>
              <div>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "80px 40px", backgroundColor: "rgba(26, 26, 46, 0.5)" }}>
        <h2 style={{ textAlign: "center", fontSize: 48, marginBottom: 60, fontWeight: "bold" }}>Powerful Features</h2>
        <div className="features-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1200, margin: "0 auto",
        }}>
          {[
            { icon: "⚡", title: "Lightning Fast", desc: "Process videos in seconds with our optimized infrastructure." },
            { icon: "🤖", title: "AI Transcription", desc: "Powered by OpenAI Whisper - 99% accuracy in 50+ languages." },
            { icon: "🔒", title: "Privacy First", desc: "Your data never leaves our secure servers. GDPR compliant." },
            { icon: "📱", title: "Multiple Formats", desc: "Download as MP4, MP3, WebM in any quality up to 4K." },
            { icon: "🔗", title: "Easy API", desc: "Simple REST API - integrate in minutes with full documentation." },
            { icon: "💰", title: "Affordable", desc: "Pay only for what you use. No hidden fees or subscriptions." },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{
              padding: 32, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 12, transition: "all 0.3s", cursor: "pointer",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168, 230, 207, 0.08)"; e.currentTarget.style.borderColor = "rgba(168, 230, 207, 0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#f0f0f8" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#b0b0c0", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px", textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.05)", color: "#808090", fontSize: 14,
      }}>
        <p>© 2025 YTFlow. Open source • Privacy Policy • Terms of Service</p>
      </footer>
    </>
  );
}
