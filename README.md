# Agent Platform Hub

**Spin up, remix, and deploy AI media agents in seconds.**

This is a full agent platform starter — one prompt powers text, image, audio, and video generation using real backends (Groq for text, Pixio/HF for media).

## Features
- Live in-browser demo with 4 modalities
- Real API calls (no mock data in production)
- Template gallery & "Remix" workflow
- Deploy anywhere (Railway, Vercel, Docker)
- Zero hardcoded secrets — add keys at deployment time only

## Quick Start
1. Clone & install
   ```bash
   git clone https://github.com/Sm0k367/agent-platform.git
   cd agent-platform
   npm install
   ```
2. Copy env
   ```bash
   cp .env.example .env.local
   ```
3. Add your keys to `.env.local` (never commit them)
4. Run
   ```bash
   npm run dev
   ```

Open http://localhost:3000. Try a prompt like "cyberpunk samurai with neon dragons".

## API Keys (Deployment Only)
- `GROQ_API_KEY` — for fast LLM text
- `PIXIO_API_KEY` — for high-quality image/video generation
- `HF_TOKEN` — optional for additional HF models

**Never commit real keys. The code reads from `process.env` only.**

## Platform Vision
This is the foundation for a true agent hub:
- Community template gallery
- One-click remix & fork
- Agent-to-agent collaboration
- Live status ("42 agents running right now")
- Deployed agents marketplace (coming)

Built with Next.js 14, Tailwind, Groq, Pixio, and Hugging Face.

Open-source. Made for experimentalists. Deploy anywhere.

**Links**
- [GitHub](https://github.com/Sm0k367/agent-platform)
- Submit your agent • Join Discord (add link)

---
Last updated: May 2026
