# 🌱 Smart Agriculture Assistant – Enterprise Frontend Platform
### स्मार्ट कृषी सहाय्यक | Industrial-Grade Agricultural Intelligence

A high-performance, production-ready agricultural technology platform designed for Indian farmers. Provides intelligent crop recommendations, leaf pathology disease vision AI, live weather advisories, real-time APMC Mandi commodity prices, IoT soil monitoring, and government subsidies access.

---

## 🏗️ Industrial Project Architecture

For a comprehensive architectural specification, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

```text
html_template/
├── index.html                  # Core Landing Page & Gateway Hub
├── public/                     # Static Web Assets (Favicon, Robots.txt, Sitemap, Manifest)
│   ├── favicon.png
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── assets/
│   ├── images/                 # Brand Assets & Photography
│   │   ├── logo.png            # Circular Brand Emblem
│   │   └── farmer_hero.jpg     # Hero visual imagery
│   ├── css/                    # Scalable ITCSS Modular Design System
│   │   ├── style.css           # Master stylesheet orchestrator
│   │   └── tokens/             # Design Tokens (Colors, Typography, Elevations)
│   │       ├── variables.css
│   │       └── typography.css
│   └── js/                     # Domain-Driven JavaScript Architecture
│       ├── script.js           # Production master bundle
│       ├── config.js           # Centralized API Endpoint Registry
│       ├── index.js            # ES module barrel exports
│       ├── core/               # Core Infrastructure (API Client, i18n, Theme)
│       │   ├── api.js
│       │   ├── i18n.js
│       │   └── theme.js
│       ├── services/           # Agriculture Domain API Services
│       │   ├── cropService.js
│       │   ├── diseaseService.js
│       │   ├── weatherService.js
│       │   ├── marketService.js
│       │   ├── soilService.js
│       │   └── fertilizerService.js
│       └── utils/              # Pure Utility Functions
│           ├── dom.js
│           └── formatters.js
├── pages/                      # Multi-Page Application (MPA) Route Views
│   ├── crop-recommendation.html
│   ├── diagnosis.html
│   ├── weather.html
│   ├── market.html
│   ├── soil-analysis.html
│   ├── fertilizer-recommendation.html
│   ├── subsidies.html
│   ├── loan-calculator.html
│   ├── pest-detection.html
│   ├── yield-prediction.html
│   ├── training-videos.html
│   ├── chat-expert.html
│   └── nearby-stores.html
├── scripts/                    # Build & Asset Synchronization Scripts
│   └── copy-assets.js
├── docs/                       # Technical Specifications & Documentation
│   └── ARCHITECTURE.md
├── vite.config.js              # Vite Multi-Page Bundler Config
└── package.json                # Project Dependencies & Scripts
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The local server will spin up at `http://localhost:5173/` with hot module replacement (HMR).

### 3. Production Build
```bash
npm run build
```
Generates an optimized, minified production build in the `dist/` directory ready for deployment.

---

## 🌐 Multi-Language Support
Supported languages:
- **English** (`en`)
- **मराठी** (`mr` - Marathi)
- **हिन्दी** (`hi` - Hindi)
- **ಕನ್ನಡ** (`kn` - Kannada)

---

## 🚀 Deployment
Deploy to any modern static hosting provider (Netlify, Vercel, Cloudflare Pages, AWS S3 / CloudFront):
```bash
npm run build
# The dist/ directory is ready to deploy
```
Configuration files for **Netlify** (`netlify.toml`) and **PWA** (`manifest.json`) are pre-configured.
