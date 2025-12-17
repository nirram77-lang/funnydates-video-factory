# 🎬 FunnyDates Video Factory

**Automatic video generation system for "101 דייטים ואף נשיכה" book marketing**

## 🚀 Features

- ✅ One-click random chapter selection
- ✅ AI image generation (Pollinations.ai)
- ✅ AI video generation (Replicate - Stable Video Diffusion)
- ✅ Hebrew + English hooks for TikTok
- ✅ Download image & video
- ✅ 23 chapters with surreal visual prompts

## 🏗️ Architecture

```
Browser (index.html)
    │
    ├── Image: Pollinations.ai (direct, no CORS issues)
    │
    └── Video: /api/replicate.js → Replicate.com
```

## 📁 Project Structure

```
funnydates-video-factory/
├── api/
│   └── replicate.js    # Serverless API for Replicate
├── index.html          # Main app interface
├── package.json
└── README.md
```

## 🔑 Requirements

- Replicate API Token: https://replicate.com/account/api-tokens

## 🎯 Usage

1. Open the deployed URL
2. Enter your Replicate API token
3. Click the big button!
4. Wait ~2 minutes
5. Download your image & video

## 📊 Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS
- **Backend:** Vercel Serverless Functions
- **Image AI:** Pollinations.ai
- **Video AI:** Replicate (Stable Video Diffusion)

---

Built with 🦎 by Claude for Nir Ram
