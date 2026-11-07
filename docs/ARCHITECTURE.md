# Smart Agriculture Assistant – Enterprise Frontend Architecture Blueprint

## 1. System Overview

**Smart Agriculture Assistant** (`स्मार्ट कृषी सहाय्यक`) is an enterprise-grade agricultural intelligence web platform designed for Indian farmers. It provides real-time crop recommendations, plant disease detection, weather analytics, APMC Mandi commodity rates, soil IoT monitoring, and government agricultural subsidy access.

### Core Architectural Principles
- **Separation of Concerns:** Strict decoupling between presentation (semantic HTML5), design tokens & components (modular CSS3), core engines (ES6+), and backend REST microservices.
- **Progressive Enhancement:** Ultra-fast initial page loads, offline-capable PWA manifest, and robust fallback behavior across devices and network conditions (2G/3G/4G/5G).
- **Industrial Modularity:** Domain-driven services (`cropService`, `diseaseService`, `weatherService`, `marketService`), centralized API client with timeout protection, and tokenized design system.
- **Zero Framework Overhead:** Pure HTML5, modern CSS3, and ES6+ modules without heavy React/Vue/Angular virtual DOM bloat, achieving sub-second performance.

---

## 2. Directory Structure Hierarchy

```text
Smart Agri Frontend/
│
├── html_template/                  # Primary Web Application Workspace
│   ├── index.html                  # Landing Page & Application Hub
│   │
│   ├── public/                     # Static Web Assets (Served directly at web root)
│   │   ├── favicon.png             # Modern high-res PNG icon
│   │   ├── manifest.json           # Progressive Web App (PWA) manifest
│   │   ├── robots.txt              # Search engine crawling rules
│   │   └── sitemap.xml             # Search engine XML sitemap
│   │
│   ├── assets/                     # Packaged Static & Dynamic Assets
│   │   │
│   │   ├── images/                 # Visual Media & Brand Assets
│   │   │   ├── logo.png            # Official Circular Agriculture Emblem
│   │   │   └── farmer_hero.jpg     # High-resolution hero imagery
│   │   │
│   │   ├── css/                    # Scalable Modular Stylesheet System (ITCSS)
│   │   │   ├── style.css           # Master stylesheet orchestrator
│   │   │   └── tokens/             # Design Tokens & Theme Foundations
│   │   │       ├── variables.css   # Color palette, spacing, elevations, radius
│   │   │       └── typography.css  # Web fonts, headings, and Devanagari rules
│   │   │
│   │   └── js/                     # Domain-Driven JavaScript Architecture
│   │       ├── script.js           # Production master script & browser bridge
│   │       ├── config.js           # API endpoints & environment registry
│   │       ├── index.js            # ES module barrel exports
│   │       │
│   │       ├── core/               # Enterprise Core Engines
│   │       │   ├── api.js          # Fetch wrapper with timeouts & error parser
│   │       │   ├── i18n.js         # Multilingual engine (EN, MR, HI, KN)
│   │       │   └── theme.js        # Dark/Light theme manager & persistence
│   │       │
│   │       ├── services/           # Domain-Specific Agriculture API Services
│   │       │   ├── cropService.js      # Crop recommendation API
│   │       │   ├── diseaseService.js   # Leaf pathology vision diagnosis
│   │       │   ├── weatherService.js   # Live weather & farming advisories
│   │       │   ├── marketService.js    # APMC Mandi commodity live pricing
│   │       │   ├── soilService.js      # IoT field sensors & soil NPK analysis
│   │       │   └── fertilizerService.js# Fertilizer dosage calculation
│   │       │
│   │       └── utils/              # Pure Utility Functions
│   │           ├── dom.js          # DOM manipulation and event helpers
│   │           └── formatters.js   # Regional currency (₹) & date formatters
│   │
│   ├── pages/                      # Multi-Page Application (MPA) Route Views
│   │   │
│   │   ├── # Core AI Farming Capabilities
│   │   ├── crop-recommendation.html        # AI Soil & Climate Crop Recommender
│   │   ├── diagnosis.html                  # Plant Leaf Disease Vision AI
│   │   ├── pest-detection.html             # Pest Identification & Control
│   │   ├── soil-analysis.html              # Soil Testing & IoT Field Sensors
│   │   ├── fertilizer-recommendation.html  # Balanced NPK Fertilizer Guide
│   │   ├── yield-prediction.html           # Harvest Yield Estimation Machine Learning
│   │   │
│   │   ├── # Real-Time Agri-Intelligence
│   │   ├── weather.html                    # Agricultural Weather Forecasts & Radar
│   │   ├── market.html                     # APMC Mandi Real-Time Price Ticker
│   │   │
│   │   ├── # Financial & Government Support
│   │   ├── subsidies.html                  # PM-Kisan & State Government Schemes
│   │   ├── loan-calculator.html            # Kisan Credit Card & Farm Loan Calculator
│   │   │
│   │   ├── # Advisory & Community Services
│   │   ├── chat-expert.html                # Consult Agricultural Scientists
│   │   ├── training-videos.html            # Agri-Extension Video Library
│   │   ├── nearby-stores.html              # Krishi Vigyan Kendra & Seed Store Finder
│   │   │
│   │   └── # Sandbox & QA Testing
│   │       ├── test-crop.html              # Crop API Integration Test harness
│   │       └── test-fertilizer-api.html    # Fertilizer API Endpoint Validator
│   │
│   ├── scripts/                    # Automation & Build Scripts
│   │   └── copy-assets.js          # Static asset sync to dist build
│   │
│   ├── docs/                       # Technical Specifications & Governance
│   │   └── ARCHITECTURE.md         # This technical specification
│   │
│   ├── .env                        # Local Environment Configuration
│   ├── .env.example                # Example Environment Variables
│   ├── .gitignore                  # Git Version Control Ignore Rules
│   ├── netlify.toml                # Netlify Production Deploy Config
│   ├── package.json                # Project Dependencies & Build Scripts
│   ├── vite.config.js              # Vite Bundler & Rollup Multi-Page Config
│   └── README.md                   # Repository Overview & Quick Start
│
└── package.json                    # Workspace Monorepo Root Script Runner
```

---

## 3. Layer-by-Layer Architectural Breakdown

### 3.1 Presentation Layer (`index.html` & `pages/*.html`)
- Semantic HTML5 structure with accessible ARIA landmarks (`header`, `main`, `nav`, `aside`, `footer`).
- Standardized navigation header with custom circular logo emblem, 8 core items, mega-dropdown for secondary features, and multilingual action controls.
- Dedicated interactive drawer for mobile devices (`≤ 1140px`).

### 3.2 Design Token & Styling Layer (`assets/css/`)
- Follows the **ITCSS (Inverted Triangle CSS)** methodology:
  1. **Settings / Tokens (`tokens/variables.css`):** Agricultural brand colors (`#228B22`, `#14532D`, `#4CAF50`, `#EAF7EC`), dark mode variables, elevations, and radii.
  2. **Typography (`tokens/typography.css`):** Font definitions for Poppins (headings), Inter (body), and Noto Sans Devanagari (Marathi/Hindi).
  3. **Master Orchestrator (`style.css`):** Encapsulates the entire design system, components, and media queries.

### 3.3 Core & Service Layer (`assets/js/`)
- **Unified API Client (`core/api.js`):** Built-in timeout handling (15-second auto-abort), unified error formatting, and seamless JSON/FormData payload detection.
- **Multilingual Engine (`core/i18n.js`):** Full 4-language support (**English**, **मराठी**, **हिन्दी**, **ಕನ್ನಡ**) with automatic localized DOM replacement and `localStorage` persistence.
- **Theme Manager (`core/theme.js`):** Dark/Light mode manager with auto OS `prefers-color-scheme` synchronization.
- **Domain Services (`services/`):** Dedicated modular classes isolating backend REST endpoints for Crops, Disease Vision AI, Weather, Market Mandis, Soil IoT, and Fertilizers.

---

## 4. Build, Bundling & Deployment Pipeline

- **Vite Multi-Page Pipeline:** Configured in `vite.config.js` with Rollup input mappings for all 15 routes.
- **Asset Synchronization:** Custom automated post-build script (`scripts/copy-assets.js`) ensures all static images and PWA manifest assets are copied to `dist/`.
- **Production Build:**
  ```bash
  npm run build
  ```
  Produces an optimized, minified bundle in `dist/` ready for zero-config deployment to **Netlify**, **Vercel**, **Cloudflare Pages**, or **AWS S3/CloudFront**.

