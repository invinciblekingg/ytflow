# YTFlow — YouTube Download & Transcription Platform

A modern, full-stack web application built with **Next.js 14** and **React 18** for downloading YouTube videos and generating AI-powered transcriptions. Optimized for deployment on Vercel.

![YTFlow](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-000?style=for-the-badge&logo=vercel)

---

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

3. **Add your API keys** (optional for demo mode)
   ```
   OPENAI_API_KEY=sk-... # For transcription feature
   ```

4. **Install production dependencies** (optional)
   ```bash
   # For actual YouTube downloading
   npm install ytdl-core

   # For AI transcription
   npm install openai
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Deployment to Vercel

### Option 1: Deploy with Git Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ytflow.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Framework: Next.js (auto-detected)
   - Environment Variables: Add `OPENAI_API_KEY` if using transcription
   - Click "Deploy"

3. **Your app is live!** 🎉
   - Vercel provides you with a URL (e.g., `https://ytflow-xyz.vercel.app`)
   - Add custom domain in Vercel Settings → Domains

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Set environment variables during deployment
   - Vercel will build and deploy your app

### Option 3: Deploy with Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and push**
   ```bash
   docker build -t ytflow .
   docker tag ytflow yourusername/ytflow
   docker push yourusername/ytflow
   ```

---

## 📁 Project Structure

```
ytflow/
├── app/
│   ├── layout.js              # Root layout with metadata
│   ├── globals.css            # Global styles
│   ├── page.jsx               # Main homepage
│   └── api/
│       ├── download/
│       │   └── route.js       # Video download endpoint
│       └── transcribe/
│           └── route.js       # Transcription endpoint
├── package.json               # Dependencies & scripts
├── next.config.js             # Next.js configuration
├── vercel.json                # Vercel deployment config
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## 🔌 API Endpoints

### Download Endpoint
```
POST /api/download
Content-Type: application/json

{
  "url": "https://youtube.com/watch?v=...",
  "format": "mp4",           // "mp4" | "mp3" | "webm"
  "quality": "1080p"         // "4K" | "1080p" | "720p"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://youtube.com/watch?v=...",
    "format": "mp4",
    "quality": "1080p",
    "title": "Video Title",
    "duration": "10:32",
    "thumbnail": "https://img.youtube.com/vi/...",
    "downloadUrl": "https://..."
  }
}
```

### Transcribe Endpoint
```
POST /api/transcribe
Content-Type: application/json

{
  "url": "https://youtube.com/watch?v=...",
  "language": "auto"         // ISO 639-1 code or "auto"
}
```

**Response:**
```json
{
  "success": true,
  "transcript": "Full transcript text...",
  "segments": [
    {
      "start": 0,
      "end": 8,
      "text": "Segment text...",
      "timestamp": "00:00"
    }
  ],
  "language": "en",
  "duration": 45.2
}
```

---

## 🛠 Environment Variables

Create `.env.local` file with the following variables:

```env
# OpenAI API Key (required for real transcription)
OPENAI_API_KEY=sk-...

# Optional: Custom API base URL
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com
```

---

## 🔧 Configuration Files

### `package.json`
- Dependencies for React, Next.js, and GSAP
- Optional dependencies for ytdl-core and OpenAI
- Node.js 18.x required for Vercel

### `next.config.js`
- Image optimization with YouTube image support
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- API body size limit (100MB for large uploads)
- Custom headers for performance

### `vercel.json`
- Build command: `npm run build`
- Dev command: `npm run dev`
- Framework: Next.js
- Environment variables configuration
- Function-specific settings:
  - Download endpoint: 60s max duration, 1GB memory
  - Transcribe endpoint: 300s max duration, 3GB memory
- Region: San Francisco (sfo1)

---

## 🎯 Production Implementation

### Enable Real Downloads
In `app/api/download/route.js`, uncomment the `ytdl-core` implementation block after installing:
```bash
npm install ytdl-core
```

### Enable Real Transcription
1. Get OpenAI API key: https://platform.openai.com/api-keys
2. Add `OPENAI_API_KEY` to Vercel environment variables
3. Install dependency: `npm install openai`
4. In `app/api/transcribe/route.js`, uncomment the OpenAI Whisper implementation block

---

## 🔒 Security Features

- **Input Validation**: YouTube URL validation on all endpoints
- **Security Headers**: Set via `next.config.js`
- **Environment Variables**: Sensitive data kept in `.env.local` (not committed)
- **HTTPS**: Automatic on Vercel
- **DDoS Protection**: Included with Vercel hosting

---

## 🎨 Features

✅ **Download Videos** - Multiple formats (MP4, MP3, WebM) and qualities (up to 4K)
✅ **AI Transcription** - Powered by OpenAI Whisper
✅ **Instant API** - REST API with full documentation
✅ **Privacy Focused** - Videos processed server-side, not stored
✅ **Beautiful UI** - Animated with GSAP and ScrollTrigger
✅ **Mobile Responsive** - Works on all devices
✅ **Zero Config** - Deploy in one click with Vercel

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | React 18 |
| Animations | GSAP 3.12 + ScrollTrigger |
| Transcription | OpenAI Whisper API |
| Video Processing | ytdl-core |
| Hosting | Vercel |
| Styling | CSS-in-JS (inline styles) |

---

## 📈 Performance

- ⚡ Next.js 14 with App Router
- 🎨 Optimized animations (GSAP)
- 📦 Automatic code splitting
- 🖼️ Image optimization
- 🔄 ISR (Incremental Static Regeneration)
- ✨ Built-in SEO optimization

---

## 🆘 Troubleshooting

### "npm install fails with peer dependencies"
```bash
npm install --legacy-peer-deps
```

### "OPENAI_API_KEY not working in Vercel"
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `OPENAI_API_KEY` with your key
3. Redeploy the project

### "Download endpoint returns 500 error"
- Ensure `ytdl-core` is installed: `npm install ytdl-core`
- Check that the YouTube URL is valid
- Verify API endpoint is responding: `POST /api/download`

### "Deployment fails on Vercel"
- Check build logs: Vercel Dashboard → Deployments → Logs
- Ensure `package.json` has all required dependencies
- Verify environment variables are set in Vercel Settings

---

## 📄 License

MIT © YTFlow 2025
