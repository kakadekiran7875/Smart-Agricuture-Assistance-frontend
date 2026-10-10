# Smart Agriculture Assistance Frontend

A comprehensive web application designed to assist farmers with agricultural decisions, crop recommendations, disease detection, and more.

## Project Structure

`
html_template/
├── index.html              # Main landing page
├── pages/                  # All feature pages
│   ├── chat-expert.html
│   ├── crop-recommendation.html
│   ├── diagnosis.html
│   ├── fertilizer-recommendation.html
│   ├── loan-calculator.html
│   ├── market.html
│   ├── nearby-stores.html
│   ├── pest-detection.html
│   ├── soil-analysis.html
│   ├── subsidies.html
│   ├── test-crop.html
│   ├── test-fertilizer-api.html
│   ├── training-videos.html
│   ├── weather.html
│   └── yield-prediction.html
├── assets/                 # Static assets
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── config.js       # API configuration
│   │   └── script.js       # Main JavaScript logic
│   └── images/
│       └── farmer_hero.jpg
├── vite.config.js          # Vite build configuration
├── package.json            # Dependencies
└── .gitignore              # Git ignore rules
`

## Features

- 🌾 **Crop Recommendation** - Get crop suggestions based on soil nutrients
- 🌿 **Soil Analysis** - Analyze soil health and composition
- 🧪 **Fertilizer Recommendation** - Get fertilizer suggestions
- 🐛 **Pest Detection** - Identify pests and get solutions
- 🌡️ **Weather Information** - Get weather forecasts for farming
- 💰 **Market Prices** - Check current market prices
- 📹 **Training Videos** - Educational content for farmers
- 🏥 **Plant Disease Diagnosis** - Diagnose plant diseases
- 🏪 **Nearby Stores** - Find agricultural stores nearby
- 💬 **Expert Chat** - Connect with agricultural experts
- 📊 **Yield Prediction** - Predict crop yields
- 💸 **Subsidies** - Information about government subsidies
- 🧮 **Loan Calculator** - Calculate agricultural loans

## Setup

1. Install dependencies:
   \\\ash
   pnpm install
   \\\

2. Configure backend URL in \ssets/js/config.js\:
   \\\javascript
   const API_CONFIG = {
       BASE_URL: 'http://localhost:5001', // Your backend URL
       ENDPOINTS: { ... }
   };
   \\\

3. Run development server:
   \\\ash
   pnpm run dev
   \\\

4. Build for production:
   \\\ash
   pnpm run build
   \\\

## Backend Configuration

To connect to your backend (deployed on Railway or local):

1. Update \ssets/js/config.js\ with your backend URL
2. Ensure CORS is enabled on your backend
3. For Railway deployment, use: \https://your-app.up.railway.app\

## Deployment

Deploy to Vercel, Netlify, or any static hosting:

\\\ash
pnpm run build
# Upload dist/ folder to your hosting provider
\\\

## License

ISC
