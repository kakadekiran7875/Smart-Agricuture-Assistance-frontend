// ----------------------------
// Backend Configuration (from config.js)
// ----------------------------
// Configuration is loaded from config.js file
// Access via: window.API_CONFIG / window.CONFIG

function getConfig() {
    // Prefer loaded config.js (API_CONFIG + legacy CONFIG)
    if (window.API_CONFIG && window.CONFIG) {
        return {
            ...window.CONFIG,
            API_CONFIG: window.API_CONFIG
        };
    }
    // Fallback defaults if config.js not loaded yet
    const fallbackBase = 'http://10.232.236.239:5001';
    return {
        BACKEND_IP: '10.232.236.239',
        BACKEND_PORT: '5001',
        FRONTEND_IP: '10.232.236.239',
        DATABASE_IP: '172.17.75.120',
        API_BASE_URL: `${fallbackBase}/api`,
        API_CONFIG: {
            BASE_URL: fallbackBase,
            ENDPOINTS: {
                DISEASE_DETECT: '/detect',
                CROP_RECOMMEND: '/api/crop/recommend',
                SOIL_ANALYZE: '/api/soil/analyze',
                FERTILIZER_RECOMMEND: '/api/fertilizer/recommend',
                PEST_DETECT: '/api/pest/detect',
                WEATHER: '/api/weather',
                MARKET_PRICES: '/api/market/prices',
                CHATBOT: '/api/chatbot/chat',
                AI_CHAT: '/api/ai/chat',
                EXPERT_LIST: '/api/expert/list',
                STORES_NEARBY: '/api/stores/nearby',
                HEALTH: '/health'
            }
        }
    };
}

// Get current configuration
const config = getConfig();
const apiConfig = window.API_CONFIG || config.API_CONFIG || {};
const API_BASE_URL = apiConfig.BASE_URL ? `${apiConfig.BASE_URL}/api` : config.API_BASE_URL;

function apiUrl(path) {
    const base = apiConfig.BASE_URL || `http://${config.BACKEND_IP}:${config.BACKEND_PORT}`;
    return `${base}${path}`;
}

// Backward compatibility - keep window.appConfig
window.appConfig = {
    get BACKEND_IP() { return getConfig().BACKEND_IP; },
    get BACKEND_PORT() { return getConfig().BACKEND_PORT; },
    get FRONTEND_IP() { return getConfig().FRONTEND_IP; },
    get DATABASE_IP() { return getConfig().DATABASE_IP; },
    get API_BASE_URL() { return (getConfig().API_CONFIG?.BASE_URL || getConfig().API_BASE_URL); }
};

// Language translations
const translations = {
    en: {
        appTitle: "🌱 Smart Agriculture Assistant",
        appSubtitle: "Your Expert Farming Companion",
        heroTitle: "Empowering Farmers with AI Technology",
        heroDescription: "Get instant crop diagnosis, market prices, and government subsidy information - all in your local language!",
        statFarmers: "Farmers Helped",
        statAccuracy: "Diagnosis Accuracy",
        statSupport: "Available",
        featuresTitle: "Our Services",
        diagnosisTitle: "Crop Diagnosis",
        diagnosisDesc: "Upload photos of your crops and get instant AI-powered disease diagnosis with treatment recommendations.",
        diagnosisAction: "Diagnose Now →",
        marketTitle: "Market Prices",
        marketDesc: "Get real-time market prices for your crops across different mandis and make informed selling decisions.",
        marketAction: "Check Prices →",
        subsidiesDesc: "Discover available government schemes, subsidies, and financial assistance programs for farmers.",
        subsidiesAction: "Explore Schemes →",
        weatherTitle: "Weather Forecast",
        weatherDesc: "Get accurate weather forecasts and farmer advisories to plan your agricultural activities.",
        weatherAction: "View Weather →",
        quickTitle: "Quick Actions",
        emergencyBtn: "Emergency Help",
        photoBtn: "Take Photo",
        expertBtn: "Contact Expert",
        aiAssistantBtn: "AI Assistant",
        footerAbout: "About Us",
        footerDesc: "Empowering farmers with technology to improve crop yields and farmer decisions.",
        footerContact: "Contact",
        footerSupport: "Support",
        footerHours: "Available 24/7",
        footerLang: "Multiple Languages",
        footerCopy: "© 2024 Smart Agriculture Assistant. Made for farmers, by farmers.",
        emergencyTitle: "Emergency Agricultural Help",
        pestControl: "Pest Control Emergency",
        diseaseOutbreak: "Disease Outbreak",
        weatherAlert: "Weather Alert",
        expertContactTitle: "Contact Agricultural Expert",
        submitExpert: "Request Expert Call",
        langText: "ಕನ್ನಡ",
        soilTitle: "Soil Analysis",
        soilDesc: "Test your soil quality by analyzing pH levels and organic carbon content. Get personalized recommendations for better crop yields.",
        soilAction: "Analyze Soil →",
        pestTitle: "Pest Detection",
        pestDesc: "Identify pests affecting your crops by reporting symptoms. Get instant treatment recommendations and control measures.",
        pestAction: "Detect Pest →",
        cropRecTitle: "Crop Recommendation",
        cropRecDesc: "Get personalized crop suggestions based on your soil's nitrogen and phosphorus levels for optimal yields.",
        cropRecAction: "Get Recommendation →",
        fertilizerTitle: "Fertilizer Recommendation",
        fertilizerDesc: "Find the right fertilizer for your crop based on current NPK levels in your soil.",
        fertilizerAction: "Find Fertilizer →",
        tipsTitle: "Farming Tips & Best Practices",
        tipsCard1Title: "Best Planting Seasons",
        tipsCard2Title: "Smart Irrigation Tips",
        tipsCard3Title: "Pest & Disease Prevention",
        // Diagnosis page
        pageTitle: "🔬 Crop Diagnosis",
        backBtn: "← Back",
        uploadTitle: "Upload Crop Image for Analysis",
        uploadDesc: "Take a clear photo of the affected plant or upload an existing image for AI-powered diagnosis.",
        uploadText: "Click to upload or drag and drop image",
        resultsTitle: "Diagnosis Results",
        tipsTitle: "Photography Tips for Better Diagnosis",
        tip1Title: "Good Lighting",
        tip1Desc: "Take photos in natural daylight for best results. Avoid shadows and artificial lighting.",
        tip2Title: "Focus on Problem",
        tip2Desc: "Capture the affected area clearly. Include both healthy and diseased parts for comparison.",
        tip3Title: "Proper Distance",
        tip3Desc: "Maintain 6-12 inches distance from the plant. Ensure the image is not blurry.",
        tip4Title: "Multiple Angles",
        tip4Desc: "Take photos from different angles - top, side, and close-up of affected areas.",
        commonTitle: "Common Crop Issues",
        loadingTitle: "Analyzing Your Crop...",
        loadingDesc: "Our AI is examining the image and comparing it with thousands of crop diseases.",
        // New features
        chatExpertTitle: "Chat with Expert",
        chatExpertDesc: "Get instant answers to your farming questions from agricultural experts in real-time.",
        chatExpertAction: "Start Chat →",
        loanCalcTitle: "Loan Calculator",
        loanCalcDesc: "Calculate agricultural loan EMI and explore government loan schemes for farmers.",
        loanCalcAction: "Calculate EMI →",
        yieldPredTitle: "Yield Prediction",
        yieldPredDesc: "Predict your crop yield using AI based on soil, weather, and farming practices.",
        yieldPredAction: "Predict Yield →",
        trainingVideosTitle: "Training Videos",
        trainingVideosDesc: "Learn modern farming techniques from expert-led video tutorials in multiple languages.",
        trainingVideosAction: "Watch Videos →"
    },
    kn: {
        appTitle: "🌱 ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
        appSubtitle: "ನಿಮ್ಮ ತಜ್ಞ ಕೃಷಿ ಸಹಚರ",
        heroTitle: "AI ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು",
        heroDescription: "ತ್ವರಿತ ಬೆಳೆ ರೋಗನಿರ್ಣಯ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ - ಎಲ್ಲವೂ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ!",
        statFarmers: "ಸಹಾಯ ಮಾಡಿದ ರೈತರು",
        statAccuracy: "ರೋಗನಿರ್ಣಯ ನಿಖರತೆ",
        statSupport: "ಲಭ್ಯವಿದೆ",
        featuresTitle: "ನಮ್ಮ ಸೇವೆಗಳು",
        diagnosisTitle: "ಬೆಳೆ ರೋಗನಿರ್ಣಯ",
        diagnosisDesc: "ನಿಮ್ಮ ಬೆಳೆಗಳ ಫೋಟೋಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ತ್ವರಿತ AI-ಚಾಲಿತ ರೋಗ ರೋಗನಿರ್ಣಯವನ್ನು ಪಡೆಯಿರಿ.",
        diagnosisAction: "ಈಗ ರೋಗನಿರ್ಣಯ ಮಾಡಿ →",
        marketTitle: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        marketDesc: "ವಿವಿಧ ಮಂಡಿಗಳಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ತಿಳುವಳಿಕೆಯುಳ್ಳ ಮಾರಾಟ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
        marketAction: "ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ →",
        subsidiesTitle: "ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳು",
        subsidiesDesc: "ರೈತರಿಗೆ ಲಭ್ಯವಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಹಣಕಾಸು ಸಹಾಯ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
        subsidiesAction: "ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ →",
        weatherTitle: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
        weatherDesc: "ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಯೋಜಿಸಲು ನಿಖರವಾದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ರೈತ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
        weatherAction: "ಹವಾಮಾನವನ್ನು ವೀಕ್ಷಿಸಿ →",
        quickTitle: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
        emergencyBtn: "ತುರ್ತು ಸಹಾಯ",
        photoBtn: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
        expertBtn: "ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ",
        aiAssistantBtn: "AI ಸಹಾಯಕ",
        footerAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
        footerDesc: "ಬೆಳೆ ಇಳುವರಿ ಮತ್ತು ರೈತ ನಿರ್ಧಾರಗಳನ್ನು ಸುಧಾರಿಸಲು ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
        footerContact: "ಸಂಪರ್ಕ",
        footerSupport: "ಬೆಂಬಲ",
        footerHours: "24/7 ಲಭ್ಯವಿದೆ",
        footerLang: "ಬಹು ಭಾಷೆಗಳು",
        footerCopy: "© 2024 ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ. ರೈತರಿಗಾಗಿ, ರೈತರಿಂದ ತಯಾರಿಸಲಾಗಿದೆ.",
        emergencyTitle: "ತುರ್ತು ಕೃಷಿ ಸಹಾಯ",
        pestControl: "ಕೀಟ ನಿಯಂತ್ರಣ ತುರ್ತು",
        diseaseOutbreak: "ರೋಗ ಏಕಾಏಕಿ",
        weatherAlert: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
        expertContactTitle: "ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ",
        submitExpert: "ತಜ್ಞ ಕರೆಗೆ ವಿನಂತಿಸಿ",
        langText: "हिन्दी",
        soilTitle: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ",
        soilDesc: "pH ಮಟ್ಟಗಳು ಮತ್ತು ಸಾವಯವ ಇಂಗಾಲದ ಅಂಶವನ್ನು ವಿಶ್ಲೇಷಿಸುವ ಮೂಲಕ ನಿಮ್ಮ ಮಣ್ಣಿನ ಗುಣಮಟ್ಟವನ್ನು ಪರೀಕ್ಷಿಸಿ. ಉತ್ತಮ ಬೆಳೆ ಇಳುವರಿಗಾಗಿ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.",
        soilAction: "ಮಣ್ಣನ್ನು ವಿಶ್ಲೇಷಿಸಿ →",
        pestTitle: "ಕೀಟ ಪತ್ತೆ",
        pestDesc: "ಲಕ್ಷಣಗಳನ್ನು ವರದಿ ಮಾಡುವ ಮೂಲಕ ನಿಮ್ಮ ಬೆಳೆಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಕೀಟಗಳನ್ನು ಗುರುತಿಸಿ. ತ್ವರಿತ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು ಮತ್ತು ನಿಯಂತ್ರಣ ಕ್ರಮಗಳನ್ನು ಪಡೆಯಿರಿ.",
        pestAction: "ಕೀಟವನ್ನು ಪತ್ತೆ ಮಾಡಿ →",
        cropRecTitle: "ಬೆಳೆ ಶಿಫಾರಸು",
        cropRecDesc: "ಅತ್ಯುತ್ತಮ ಇಳುವರಿಗಾಗಿ ನಿಮ್ಮ ಮಣ್ಣಿನ ಸಾರಜನಕ ಮತ್ತು ರಂಜಕ ಮಟ್ಟಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಬೆಳೆ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
        cropRecAction: "ಶಿಫಾರಸು ಪಡೆಯಿರಿ →",
        fertilizerTitle: "ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು",
        fertilizerDesc: "ನಿಮ್ಮ ಮಣ್ಣಿನಲ್ಲಿರುವ ಪ್ರಸ್ತುತ NPK ಮಟ್ಟಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಬೆಳೆಗೆ ಸರಿಯಾದ ರಸಗೊಬ್ಬರವನ್ನು ಹುಡುಕಿ.",
        fertilizerAction: "ರಸಗೊಬ್ಬರವನ್ನು ಹುಡುಕಿ →",
        tipsTitle: "ಕೃಷಿ ಸಲಹೆಗಳು ಮತ್ತು ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು",
        tipsCard1Title: "ಉತ್ತಮ ನೆಡುವ ಋತುಗಳು",
        tipsCard2Title: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಸಲಹೆಗಳು",
        tipsCard3Title: "ಕೀಟ ಮತ್ತು ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ",
        // New features
        chatExpertTitle: "ತಜ್ಞರೊಂದಿಗೆ ಚಾಟ್",
        chatExpertDesc: "ಕೃಷಿ ತಜ್ಞರಿಂದ ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ತ್ವರಿತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",
        chatExpertAction: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ →",
        loanCalcTitle: "ಸಾಲ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        loanCalcDesc: "ಕೃಷಿ ಸಾಲ EMI ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ ಮತ್ತು ರೈತರಿಗೆ ಸರ್ಕಾರಿ ಸಾಲ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
        loanCalcAction: "EMI ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ →",
        yieldPredTitle: "ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
        yieldPredDesc: "ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಪದ್ಧತಿಗಳ ಆಧಾರದ ಮೇಲೆ AI ಬಳಸಿ ನಿಮ್ಮ ಬೆಳೆ ಇಳುವರಿಯನ್ನು ಮುನ್ಸೂಚಿಸಿ.",
        yieldPredAction: "ಇಳುವರಿ ಮುನ್ಸೂಚಿಸಿ →",
        trainingVideosTitle: "ತರಬೇತಿ ವೀಡಿಯೊಗಳು",
        trainingVideosDesc: "ಬಹು ಭಾಷೆಗಳಲ್ಲಿ ತಜ್ಞರ ನೇತೃತ್ವದ ವೀಡಿಯೊ ಟ್ಯುಟೋರಿಯಲ್‌ಗಳಿಂದ ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಗಳನ್ನು ಕಲಿಯಿರಿ.",
        trainingVideosAction: "ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಿ →"
    },
    hi: {
        appTitle: "🌱 स्मार्ट कृषि सहायक",
        appSubtitle: "आपका विशेषज्ञ कृषि साथी",
        heroTitle: "AI तकनीक के साथ किसानों को सशक्त बनाना",
        heroDescription: "तुरंत फसल निदान, बाजार की कीमतें और सरकारी सब्सिडी की जानकारी प्राप्त करें - सब कुछ आपकी स्थानीय भाषा में!",
        statFarmers: "सहायता प्राप्त किसान",
        statAccuracy: "निदान सटीकता",
        statSupport: "उपलब्ध",
        featuresTitle: "हमारी सेवाएं",
        diagnosisTitle: "फसल निदान",
        diagnosisDesc: "अपनी फसलों की तस्वीरें अपलोड करें और उपचार सुझावों के साथ तुरंत AI-संचालित रोग निदान प्राप्त करें।",
        diagnosisAction: "अब निदान करें →",
        marketTitle: "बाजार की कीमतें",
        marketDesc: "विभिन्न मंडियों में अपनी फसलों की वास्तविक समय की बाजार कीमतें प्राप्त करें और सूचित बिक्री निर्णय लें।",
        marketAction: "कीमतें जांचें →",
        subsidiesTitle: "सरकारी सब्सिडी",
        subsidiesDesc: "किसानों के लिए उपलब्ध सरकारी योजनाओं, सब्सिडी और वित्तीय सहायता कार्यक्रमों की खोज करें।",
        subsidiesAction: "योजनाएं देखें →",
        weatherTitle: "मौसम पूर्वानुमान",
        weatherDesc: "अपनी कृषि गतिविधियों की योजना बनाने के लिए सटीक मौसम पूर्वानुमान और कृषि सलाह प्राप्त करें।",
        weatherAction: "मौसम देखें →",
        quickTitle: "त्वरित कार्य",
        emergencyBtn: "आपातकालीन सहायता",
        photoBtn: "फोटो लें",
        expertBtn: "विशेषज्ञ से संपर्क करें",
        aiAssistantBtn: "AI सहायक",
        footerAbout: "हमारे बारे में",
        footerDesc: "फसल उत्पादन और कृषि निर्णयों में सुधार के लिए तकनीक के साथ किसानों को सशक्त बनाना।",
        footerContact: "संपर्क",
        footerSupport: "सहायता",
        footerHours: "24/7 उपलब्ध",
        footerLang: "कई भाषाएं",
        footerCopy: "© 2024 स्मार्ट कृषि सहायक। किसानों के लिए, किसानों द्वारा बनाया गया।",
        emergencyTitle: "आपातकालीन कृषि सहायता",
        pestControl: "कीट नियंत्रण आपातकाल",
        diseaseOutbreak: "रोग प्रकोप",
        weatherAlert: "मौसम चेतावनी",
        expertContactTitle: "कृषि विशेषज्ञ से संपर्क करें",
        submitExpert: "विशेषज्ञ कॉल का अनुरोध करें",
        langText: "मराठी",
        soilTitle: "मिट्टी विश्लेषण",
        soilDesc: "pH स्तर और जैविक कार्बन सामग्री का विश्लेषण करके अपनी मिट्टी की गुणवत्ता का परीक्षण करें। बेहतर फसल उपज के लिए व्यक्तिगत सिफारिशें प्राप्त करें।",
        soilAction: "मिट्टी का विश्लेषण करें →",
        pestTitle: "कीट पहचान",
        pestDesc: "लक्षणों की रिपोर्ट करके अपनी फसलों को प्रभावित करने वाले कीटों की पहचान करें। तत्काल उपचार सिफारिशें और नियंत्रण उपाय प्राप्त करें।",
        pestAction: "कीट का पता लगाएं →",
        cropRecTitle: "फसल सिफारिश",
        cropRecDesc: "इष्टतम उपज के लिए अपनी मिट्टी के नाइट्रोजन और फास्फोरस स्तरों के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें।",
        cropRecAction: "सिफारिश प्राप्त करें →",
        fertilizerTitle: "उर्वरक सिफारिश",
        fertilizerDesc: "अपनी मिट्टी में मौजूद NPK स्तरों के आधार पर अपनी फसल के लिए सही उर्वरक खोजें।",
        fertilizerAction: "उर्वरक खोजें →",
        tipsTitle: "कृषि सुझाव और सर्वोत्तम प्रथाएं",
        tipsCard1Title: "सर्वोत्तम रोपण मौसम",
        tipsCard2Title: "स्मार्ट सिंचाई सुझाव",
        tipsCard3Title: "कीट और रोग रोकथाम",
        // New features
        chatExpertTitle: "विशेषज्ञ से चैट करें",
        chatExpertDesc: "कृषि विशेषज्ञों से अपने खेती के सवालों के तुरंत जवाब पाएं.",
        chatExpertAction: "चैट शुरू करें →",
        loanCalcTitle: "ऋण कैलकुलेटर",
        loanCalcDesc: "कृषि ऋण EMI की गणना करें और किसानों के लिए सरकारी ऋण योजनाओं का पता लगाएं.",
        loanCalcAction: "EMI गणना करें →",
        yieldPredTitle: "उपज पूर्वानुमान",
        yieldPredDesc: "मिट्टी, मौसम और खेती के तरीकों के आधार पर AI का उपयोग करके अपनी फसल की उपज का अनुमान लगाएं.",
        yieldPredAction: "उपज का अनुमान लगाएं →",
        trainingVideosTitle: "प्रशिक्षण वीडियो",
        trainingVideosDesc: "कई भाषाओं में विशेषज्ञ-नेतृत्व वाले वीडियो ट्यूटोरियल से आधुनिक खेती तकनीक सीखें.",
        trainingVideosAction: "वीडियो देखें →"
    },
    mr: {
        appTitle: "🌱 स्मार्ट शेती सहाय्यक",
        appSubtitle: "तुमचा तज्ञ शेती साथीदार",
        heroTitle: "AI तंत्रज्ञानासह शेतकऱ्यांना सशक्त करणे",
        heroDescription: "तत्काळ पीक निदान, बाजार भाव आणि सरकारी अनुदान माहिती मिळवा - सर्व काही तुमच्या स्थानिक भाषेत!",
        statFarmers: "मदत केलेले शेतकरी",
        statAccuracy: "निदान अचूकता",
        statSupport: "उपलब्ध",
        featuresTitle: "आमच्या सेवा",
        diagnosisTitle: "पीक निदान",
        diagnosisDesc: "तुमच्या पिकांचे फोटो अपलोड करा आणि उपचार शिफारशींसह तत्काळ AI-चालित रोग निदान मिळवा।",
        diagnosisAction: "आता निदान करा →",
        marketTitle: "बाजार भाव",
        marketDesc: "विविध मंडींमध्ये तुमच्या पिकांचे रिअल-टाइम बाजार भाव मिळवा आणि माहितीपूर्ण विक्री निर्णय घ्या।",
        marketAction: "भाव तपासा →",
        subsidiesTitle: "सरकारी अनुदान",
        subsidiesDesc: "शेतकऱ्यांसाठी उपलब्ध सरकारी योजना, अनुदान आणि आर्थिक सहाय्य कार्यक्रम शोधा।",
        subsidiesAction: "योजना पहा →",
        weatherTitle: "हवामान अंदाज",
        weatherDesc: "तुमच्या शेती क्रियाकलापांची योजना करण्यासाठी अचूक हवामान अंदाज आणि शेती सल्ला मिळवा।",
        weatherAction: "हवामान पहा →",
        quickTitle: "त्वरित कृती",
        emergencyBtn: "आपत्कालीन मदत",
        photoBtn: "फोटो काढा",
        expertBtn: "तज्ञाशी संपर्क करा",
        aiAssistantBtn: "AI सहाय्यक",
        footerAbout: "आमच्याबद्दल",
        footerDesc: "पीक उत्पादन आणि शेती निर्णयांमध्ये सुधारणा करण्यासाठी तंत्रज्ञानासह शेतकऱ्यांना सशक्त करणे।",
        footerContact: "संपर्क",
        footerSupport: "सहाय्य",
        footerHours: "24/7 उपलब्ध",
        footerLang: "अनेक भाषा",
        footerCopy: "© 2024 स्मार्ट शेती सहाय्यक। शेतकऱ्यांसाठी, शेतकऱ्यांनी बनवलेले।",
        emergencyTitle: "आपत्कालीन शेती मदत",
        pestControl: "कीड नियंत्रण आपत्काल",
        diseaseOutbreak: "रोग प्रसार",
        weatherAlert: "हवामान चेतावणी",
        expertContactTitle: "शेती तज्ञाशी संपर्क करा",
        submitExpert: "तज्ञ कॉलची विनंती करा",
        langText: "English",
        soilTitle: "माती विश्लेषण",
        soilDesc: "pH पातळी आणि सेंद्रिय कार्बन सामग्रीचे विश्लेषण करून आपल्या मातीच्या गुणवत्तेची चाचणी करा. चांगल्या पीक उत्पन्नासाठी वैयक्तिक शिफारसी मिळवा।",
        soilAction: "माती विश्लेषण करा →",
        pestTitle: "कीड ओळख",
        pestDesc: "लक्षणांचा अहवाल देऊन आपल्या पिकांवर परिणाम करणाऱ्या कीटकांची ओळख करा. त्वरित उपचार शिफारसी आणि नियंत्रण उपाय मिळवा।",
        pestAction: "कीड शोधा →",
        cropRecTitle: "पीक शिफारस",
        cropRecDesc: "इष्टतम उत्पन्नासाठी आपल्या मातीच्या नायट्रोजन आणि फॉस्फरस पातळीच्या आधारे वैयक्तिक पीक सूचना मिळवा।",
        cropRecAction: "शिफारस मिळवा →",
        fertilizerTitle: "खत शिफारस",
        fertilizerDesc: "आपल्या मातीतील सध्याच्या NPK पातळीच्या आधारे आपल्या पिकासाठी योग्य खत शोधा।",
        fertilizerAction: "खत शोधा →",
        tipsTitle: "शेती टिपा आणि सर्वोत्तम पद्धती",
        tipsCard1Title: "सर्वोत्तम लागवड हंगाम",
        tipsCard2Title: "स्मार्ट सिंचन टिपा",
        tipsCard3Title: "कीड आणि रोग प्रतिबंध",
        // New features
        chatExpertTitle: "तज्ञाशी चॅट करा",
        chatExpertDesc: "शेती तज्ञांकडून आपल्या शेतीच्या प्रश्नांची त्वरित उत्तरे मिळवा.",
        chatExpertAction: "चॅट सुरू करा →",
        loanCalcTitle: "कर्ज कॅल्क्युलेटर",
        loanCalcDesc: "कृषी कर्ज EMI ची गणना करा आणि शेतकऱ्यांसाठी सरकारी कर्ज योजना शोधा.",
        loanCalcAction: "EMI गणना करा →",
        yieldPredTitle: "उत्पन्न अंदाज",
        yieldPredDesc: "माती, हवामान आणि शेती पद्धतींवर आधारित AI वापरून आपल्या पिकाच्या उत्पन्नाचा अंदाज लावा.",
        yieldPredAction: "उत्पन्नाचा अंदाज लावा →",
        trainingVideosTitle: "प्रशिक्षण व्हिडिओ",
        trainingVideosDesc: "अनेक भाषांमध्ये तज्ञ-नेतृत्वाच्या व्हिडिओ ट्यूटोरियलमधून आधुनिक शेती तंत्र शिका.",
        trainingVideosAction: "व्हिडिओ पहा →"
    }
};

// Current language state
let currentLang = 'en';
const languages = ['en', 'kn', 'hi', 'mr'];
let currentLangIndex = 0;

// ============================================
// BACKEND API FUNCTIONS
// ============================================

/**
 * Get Crop Recommendation from Backend
 */
async function getCropRecommendation(data) {
    try {
        const response = await fetch(`${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.CROP_RECOMMEND}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                language: currentLang
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error getting crop recommendation:', error);
        throw error;
    }
}

/**
 * Get Soil Analysis from Backend
 */
async function getSoilAnalysis(data) {
    try {
        const response = await fetch(`${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.SOIL_ANALYZE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                language: currentLang
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error analyzing soil:', error);
        throw error;
    }
}

/**
 * Get Fertilizer Recommendation from Backend
 */
async function getFertilizerRecommendation(data) {
    try {
        const response = await fetch(`${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.FERTILIZER_RECOMMEND}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                language: currentLang
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error getting fertilizer recommendation:', error);
        throw error;
    }
}

/**
 * Get Pest Control Information from Backend
 * Backend uses POST /api/pest/detect
 */
async function getPestControl(data) {
    try {
        // Backend expects: { crop: string, symptoms: array }
        const response = await fetch(`${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.PEST_DETECT}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                crop: data.crop || 'tomato',
                symptoms: data.symptoms || ['brown spots']
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error getting pest control info:', error);
        throw error;
    }
}

/**
 * Get Market Prices from Backend
 * Backend uses GET /api/market/prices or /api/market/market-prices
 */
async function getMarketPrice(crop, location = null) {
    try {
        // Backend has GET /api/market/market-prices endpoint
        const response = await fetch(`${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.MARKET_PRICES}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // If specific crop requested, return that crop's data
        if (crop && result[crop.toLowerCase()]) {
            return result[crop.toLowerCase()];
        }
        return result; // Return all market prices
    } catch (error) {
        console.error('Error getting market price:', error);
        throw error;
    }
}

/**
 * Get Weather Information from Backend
 * Backend uses GET /api/weather/:location
 */
async function getWeatherInfo(location) {
    try {
        // Backend expects GET request with location in URL path
        const response = await fetch(`${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.WEATHER}/${location}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error getting weather info:', error);
        throw error;
    }
}

/**
 * Available Weather Locations
 */
const weatherLocations = {
    karnataka: [
        'Bangalore', 'Bengaluru', 'Mysore', 'Mysuru', 'Hubli', 'Mangalore', 
        'Belgaum', 'Belagavi', 'Davangere', 'Ballari', 'Vijayapura', 
        'Shimoga', 'Shivamogga', 'Tumkur', 'Raichur', 'Bidar', 'Hospet',
        'Hassan', 'Gadag', 'Udupi', 'Chikmagalur', 'Mandya', 'Kolar'
    ],
    maharashtra: [
        'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur',
        'Kolhapur', 'Amravati', 'Sangli', 'Jalgaon', 'Akola', 'Latur'
    ],
    tamilnadu: [
        'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
        'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul'
    ],
    kerala: [
        'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam',
        'Palakkad', 'Alappuzha', 'Kannur', 'Kottayam', 'Malappuram'
    ],
    andhrapradesh: [
        'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool',
        'Rajahmundry', 'Tirupati', 'Kakinada', 'Anantapur', 'Vizianagaram'
    ],
    telangana: [
        'Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar',
        'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda'
    ]
};

/**
 * Get weather for multiple locations
 */
async function getWeatherForMultipleLocations(locations) {
    try {
        const weatherPromises = locations.map(location => getWeatherInfo(location));
        const results = await Promise.all(weatherPromises);
        return results;
    } catch (error) {
        console.error('Error getting weather for multiple locations:', error);
        throw error;
    }
}

/**
 * Get all Karnataka weather
 */
async function getKarnatakaWeather() {
    return await getWeatherForMultipleLocations(weatherLocations.karnataka.slice(0, 5)); // Top 5 cities
}

/**
 * Check Backend Health
 * NOTE: Disabled because backend doesn't have /health endpoint
 */
async function checkBackendHealth() {
    // Backend doesn't have /health endpoint, so skip this check
    console.log('ℹ️ Health check disabled - backend has no /health endpoint');
    return true; // Return true to avoid errors
    
    /* Original code (disabled):
    try {
        const response = await fetch(apiUrl('/health'));
        const data = await response.json();
        console.log('✅ Backend is healthy:', data);
        return true;
    } catch (error) {
        console.error('❌ Backend is not responding:', error);
        return false;
    }
    */
}

// ============================================
// EXAMPLE USAGE FUNCTIONS
// ============================================

/**
 * Example: Get crop recommendation with form data
 */
async function handleCropRecommendationForm(formData) {
    showLoading('resultContainer');
    
    try {
        const result = await getCropRecommendation({
            nitrogen: parseFloat(formData.nitrogen),
            phosphorus: parseFloat(formData.phosphorus),
            potassium: parseFloat(formData.potassium),
            temperature: parseFloat(formData.temperature),
            humidity: parseFloat(formData.humidity),
            ph: parseFloat(formData.ph),
            rainfall: parseFloat(formData.rainfall)
        });

        displayCropRecommendation(result);
    } catch (error) {
        displayError('resultContainer', error.message);
    }
}

/**
 * Example: Get soil analysis
 */
async function handleSoilAnalysisForm(formData) {
    showLoading('soilResultContainer');
    
    try {
        const result = await getSoilAnalysis({
            nitrogen: parseFloat(formData.nitrogen),
            phosphorus: parseFloat(formData.phosphorus),
            potassium: parseFloat(formData.potassium),
            ph: parseFloat(formData.ph),
            soil_type: formData.soilType
        });

        displaySoilAnalysis(result);
    } catch (error) {
        displayError('soilResultContainer', error.message);
    }
}

/**
 * Example: Get market prices for multiple crops
 */
async function loadMarketPrices() {
    const crops = ['rice', 'wheat', 'cotton', 'onion', 'potato'];
    const pricesContainer = document.getElementById('marketPrices');
    
    if (!pricesContainer) return;
    
    showLoading('marketPrices');
    
    try {
        const pricePromises = crops.map(crop => getMarketPrice(crop, 'Maharashtra'));
        const prices = await Promise.all(pricePromises);
        
        displayMarketPrices(prices);
    } catch (error) {
        displayError('marketPrices', error.message);
    }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayCropRecommendation(result) {
    const container = document.getElementById('resultContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="result-card success">
            <h3>🌾 ${currentLang === 'mr' ? 'शिफारस केलेली पिके' : currentLang === 'hi' ? 'अनुशंसित फसलें' : 'Recommended Crops'}</h3>
            <ul class="crop-list">
                ${result.recommended_crops.map(crop => `<li>✓ ${crop}</li>`).join('')}
            </ul>
            <p class="confidence">
                <strong>${currentLang === 'mr' ? 'आत्मविश्वास' : currentLang === 'hi' ? 'विश्वास' : 'Confidence'}:</strong> 
                ${(result.confidence * 100).toFixed(0)}%
            </p>
            <p class="explanation">${result.explanation}</p>
        </div>
    `;
}

function displaySoilAnalysis(result) {
    const container = document.getElementById('soilResultContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="result-card success">
            <h3>🌍 ${currentLang === 'mr' ? 'माती आरोग्य' : currentLang === 'hi' ? 'मिट्टी स्वास्थ्य' : 'Soil Health'}: ${result.soil_health}</h3>
            
            <div class="section">
                <h4>${currentLang === 'mr' ? 'कमतरता' : currentLang === 'hi' ? 'कमियां' : 'Deficiencies'}:</h4>
                <ul>
                    ${result.deficiencies.map(d => `<li>⚠️ ${d}</li>`).join('')}
                </ul>
            </div>
            
            <div class="section">
                <h4>${currentLang === 'mr' ? 'शिफारसी' : currentLang === 'hi' ? 'सिफारिशें' : 'Recommendations'}:</h4>
                <ul>
                    ${result.recommendations.map(r => `<li>✓ ${r}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function displayMarketPrices(prices) {
    const container = document.getElementById('marketPrices');
    if (!container) return;
    
    container.innerHTML = prices.map(price => `
        <div class="price-card">
            <h4>${price.crop}</h4>
            <p class="price">${price.current_price}</p>
            <p class="trend">${price.price_trend}</p>
            <p class="location">📍 ${price.location}</p>
            <p class="advisory">${price.market_advisory}</p>
        </div>
    `).join('');
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">⏳ Loading...</div>';
    }
}

function displayError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        const config = getConfig();
        element.innerHTML = `
            <div class="result-card error">
                <h3>❌ Error</h3>
                <p><strong>Message:</strong> ${message}</p>
                <div class="hint">
                    <p><strong>Backend URL:</strong> ${config.API_BASE_URL}</p>
                    <p><strong>Possible Issues:</strong></p>
                    <ul>
                        <li>Backend endpoint not implemented yet</li>
                        <li>Backend server stopped running</li>
                        <li>CORS not configured properly</li>
                        <li>Network connection changed</li>
                    </ul>
                    <p><strong>Check:</strong> Open browser console (F12) for detailed error</p>
                </div>
            </div>
        `;
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌾 Smart Agriculture Assistant loaded!');
    console.log('📡 Backend configured at: ' + getConfig().API_BASE_URL);
    
    // Health check disabled - backend has no /health endpoint
    // To test connection, try calling an actual API like getCropRecommendation()
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages.includes(savedLang)) {
        currentLang = savedLang;
        currentLangIndex = languages.indexOf(currentLang);
    } else {
        // Set default language to English on first visit
        currentLang = 'en';
        currentLangIndex = 0;
        localStorage.setItem('preferredLanguage', 'en');
    }
    // Always update language on page load
    updateLanguage();
    
    // Initialize expert form submission
    initializeExpertForm();
    
    // Add click outside modal to close
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// ============================================
// LANGUAGE FUNCTIONS
// ============================================

function toggleLanguage() {
    currentLangIndex = (currentLangIndex + 1) % languages.length;
    currentLang = languages[currentLangIndex];
    localStorage.setItem('preferredLanguage', currentLang);
    updateLanguage();
}

function updateLanguage() {
    const elements = translations[currentLang];
    
    Object.keys(elements).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = elements[key];
        }
    });
    
    // Update button texts with data attributes
    const btnTexts = document.querySelectorAll('.btn-text');
    btnTexts.forEach(btn => {
        const text = btn.getAttribute(`data-${currentLang}`);
        if (text) {
            btn.textContent = text;
        }
    });
}

// ============================================
// NAVIGATION & MODAL FUNCTIONS
// ============================================

function navigateTo(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

function showEmergencyHelp() {
    document.getElementById('emergencyModal').style.display = 'block';
}

function showExpertContact() {
    document.getElementById('expertModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// ============================================
// EXPERT FORM
// ============================================

function initializeExpertForm() {
    const expertForm = document.querySelector('.expert-form');
    if (expertForm) {
        expertForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('farmerName').value,
                phone: document.getElementById('farmerPhone').value,
                cropType: document.getElementById('cropType').value,
                issue: document.getElementById('issueDescription').value,
                language: currentLang,
                timestamp: new Date().toISOString()
            };
            
            // Disable submit button
            const submitBtn = document.getElementById('submitExpert');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            try {
                // Send to backend API
                const response = await fetch(apiUrl('/api/expert/request'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    const result = await response.json();
                    
                    const successMessages = {
                        en: `Thank you ${formData.name}! Your request has been submitted successfully. An agricultural expert will call you within 30 minutes at ${formData.phone}.`,
                        hi: `धन्यवाद ${formData.name}! आपका अनुरोध सफलतापूर्वक सबमिट हो गया है। एक कृषि विशेषज्ञ 30 मिनट के भीतर ${formData.phone} पर आपको कॉल करेगा।`,
                        kn: `ಧನ್ಯವಾದಗಳು ${formData.name}! ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ। ಕೃಷಿ ತಜ್ಞರು 30 ನಿಮಿಷಗಳಲ್ಲಿ ${formData.phone} ಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ।`,
                        mr: `धन्यवाद ${formData.name}! तुमची विनंती यशस्वीरित्या सबमिट झाली आहे। एक शेती तज्ञ 30 मिनिटांत ${formData.phone} वर तुम्हाला कॉल करेल।`
                    };
                    
                    showToast(successMessages[currentLang] || successMessages.en);
                    closeModal('expertModal');
                    expertForm.reset();
                    
                } else {
                    throw new Error('Failed to submit request');
                }
                
            } catch (error) {
                console.error('Error submitting expert request:', error);
                
                // Fallback: Store locally and show message
                const errorMessages = {
                    en: `Thank you ${formData.name}! Your request has been recorded. We'll call you at ${formData.phone} soon. (Note: Backend connection failed, request saved locally)`,
                    hi: `धन्यवाद ${formData.name}! आपका अनुरोध रिकॉर्ड कर लिया गया है। हम जल्द ही ${formData.phone} पर कॉल करेंगे।`,
                    kn: `ಧನ್ಯವಾದಗಳು ${formData.name}! ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ। ನಾವು ಶೀಘ್ರದಲ್ಲೇ ${formData.phone} ಗೆ ಕರೆ ಮಾಡುತ್ತೇವೆ।`,
                    mr: `धन्यवाद ${formData.name}! तुमची विनंती रेकॉर्ड केली गेली आहे। आम्ही लवकरच ${formData.phone} वर कॉल करू।`
                };
                
                // Store in localStorage as backup
                const requests = JSON.parse(localStorage.getItem('expertRequests') || '[]');
                requests.push(formData);
                localStorage.setItem('expertRequests', JSON.stringify(requests));
                
                alert(errorMessages[currentLang] || errorMessages.en);
                closeModal('expertModal');
                expertForm.reset();
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
}

// ============================================
// IMAGE UPLOAD
// ============================================

function handleImageUpload(inputElement, previewElement) {
    const file = inputElement.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.src = e.target.result;
            previewElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// ============================================
// EXPORT FOR GLOBAL USE
// ============================================

// Make functions available globally
window.agricultureAPI = {
    getCropRecommendation,
    getSoilAnalysis,
    getFertilizerRecommendation,
    getPestControl,
    getMarketPrice,
    getWeatherInfo,
    getWeatherForMultipleLocations,
    getKarnatakaWeather,
    weatherLocations  // Available locations list
    // checkBackendHealth - Disabled (backend has no /health endpoint)
};

console.log('✅ Agriculture API functions loaded. Access via window.agricultureAPI');

// ============================================
// DISEASE DETECTION API
// ============================================

/**
 * Detect crop disease from uploaded image
 */
async function detectCropDisease(imageFile) {
    try {
        console.log('🔍 Starting crop disease detection...');
        console.log('📁 Image file:', imageFile.name, imageFile.size, 'bytes');
        
        const formData = new FormData();
        formData.append('image', imageFile);
        
        // Try multiple possible endpoints
        const endpoints = ['/detect', '/api/detect', '/api/disease/detect'];
        let lastError = null;
        
        for (const endpoint of endpoints) {
            try {
                const url = apiUrl(endpoint);
                console.log(`🌐 Trying API URL: ${url}`);

                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });
                
                console.log(`📡 Response status for ${endpoint}: ${response.status}`);

                if (response.status === 404) {
                    console.log(`⚠️ Endpoint ${endpoint} not found, trying next...`);
                    lastError = new Error(`Endpoint ${endpoint} not found (404)`);
                    continue;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('❌ Backend error:', errorText);
                    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
                }

                const result = await response.json();
                console.log('✅ Detection result:', result);
                console.log(`✅ Working endpoint found: ${endpoint}`);
                return result;
                
            } catch (error) {
                if (error.message.includes('404')) {
                    lastError = error;
                    continue;
                }
                throw error;
            }
        }
        
        // If we get here, none of the endpoints worked
        throw new Error(`Disease detection endpoint not found. Tried: ${endpoints.join(', ')}. Please implement one of these endpoints on your backend server at ${apiUrl('')}`);
        
    } catch (error) {
        console.error('❌ Error detecting disease:', error);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        throw error;
    }
}

// Make disease detection available globally
window.agricultureAPI.detectCropDisease = detectCropDisease;

// ============================================
// AI CHAT ASSISTANT FUNCTIONALITY
// ============================================

let chatLanguage = 'en'; // Default chat language
let isVoiceActive = false;
let recognition = null;

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
}

// Toggle AI Chat
function toggleAIChat() {
    const chatbox = document.getElementById('aiChatbox');
    chatbox.classList.toggle('active');
    
    // Update chat language to match current app language
    if (chatbox.classList.contains('active')) {
        chatLanguage = currentLang;
        updateChatLanguage();
    }
}

// Cycle Chat Language
function cycleChatLanguage() {
    const langs = ['en', 'kn', 'hi', 'mr'];
    const currentIndex = langs.indexOf(chatLanguage);
    chatLanguage = langs[(currentIndex + 1) % langs.length];
    updateChatLanguage();
}

// Update Chat Language
function updateChatLanguage() {
    const langNames = {
        en: 'English',
        kn: 'ಕನ್ನಡ',
        hi: 'हिन्दी',
        mr: 'मराठी'
    };
    
    const chatLangBtn = document.getElementById('chatLangBtn');
    if (chatLangBtn) {
        chatLangBtn.title = `Language: ${langNames[chatLanguage]}`;
    }
    
    // Update welcome message
    const welcomeMessages = {
        en: "Hello! I'm your AI farming assistant. How can I help you today?",
        kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
        hi: "नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
        mr: "नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. मी तुम्हाला कशी मदत करू शकतो?"
    };
    
    const welcomeMsg = document.getElementById('welcomeMsg');
    if (welcomeMsg) {
        welcomeMsg.textContent = welcomeMessages[chatLanguage];
    }
}

// Send Message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        addChatMessage(response, 'bot');
        
        // Speak response if supported
        speakText(response);
    }, 1000);
}

// Handle Chat Key Press
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Add Chat Message
function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${text}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Get AI Response
function getAIResponse(question) {
    const q = question.toLowerCase();
    
    const responses = {
        en: {
            disease: "I can help you identify crop diseases! Please upload a photo of your affected crop in the Crop Diagnosis section, or describe the symptoms you're seeing.",
            market: "Current market prices vary by location. Check the Market Prices section for real-time rates in your area. What crop are you interested in?",
            weather: "Weather information is available in the Weather Forecast section. I can provide forecasts for multiple locations across Karnataka and neighboring states.",
            fertilizer: "For fertilizer recommendations, I need to know your crop type and soil conditions. You can get detailed recommendations in our Fertilizer section.",
            default: "I'm here to help with crop diseases, market prices, weather forecasts, and farming advice. What would you like to know?"
        },
        kn: {
            disease: "ನಾನು ಬೆಳೆ ರೋಗಗಳನ್ನು ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ! ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೀಡಿತ ಬೆಳೆಯ ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
            market: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಸ್ಥಳದ ಪ್ರಕಾರ ಬದಲಾಗುತ್ತವೆ. ನಿಮ್ಮ ಪ್ರದೇಶದ ನೇರ ದರಗಳಿಗಾಗಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳ ವಿಭಾಗವನ್ನು ಪರಿಶೀಲಿಸಿ.",
            weather: "ಹವಾಮಾನ ಮಾಹಿತಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ವಿಭಾಗದಲ್ಲಿ ಲಭ್ಯವಿದೆ.",
            fertilizer: "ಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳಿಗಾಗಿ, ನಿಮ್ಮ ಬೆಳೆ ಪ್ರಕಾರ ಮತ್ತು ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ತಿಳಿಯಬೇಕು.",
            default: "ನಾನು ಬೆಳೆ ರೋಗಗಳು, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳೊಂದಿಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ."
        },
        hi: {
            disease: "मैं फसल रोगों की पहचान करने में मदद कर सकता हूं! कृपया अपनी प्रभावित फसल की फोटो अपलोड करें।",
            market: "बाजार मूल्य स्थान के अनुसार भिन्न होते हैं। अपने क्षेत्र में वास्तविक समय दरों के लिए बाजार मूल्य अनुभाग देखें।",
            weather: "मौसम की जानकारी मौसम पूर्वानुमान अनुभाग में उपलब्ध है।",
            fertilizer: "उर्वरक सिफारिशों के लिए, मुझे आपकी फसल का प्रकार और मिट्टी की स्थिति जानने की आवश्यकता है।",
            default: "मैं फसल रोगों, बाजार मूल्यों, मौसम पूर्वानुमान और खेती की सलाह में मदद के लिए यहां हूं।"
        },
        mr: {
            disease: "मी पीक रोग ओळखण्यात मदत करू शकतो! कृपया तुमच्या प्रभावित पिकाचा फोटो अपलोड करा.",
            market: "बाजार किंमती स्थानानुसार बदलतात. तुमच्या क्षेत्रातील वास्तविक वेळ दरांसाठी बाजार किंमत विभाग तपासा.",
            weather: "हवामान माहिती हवामान अंदाज विभागात उपलब्ध आहे.",
            fertilizer: "खत शिफारशींसाठी, मला तुमच्या पिकाचा प्रकार आणि मातीची स्थिती माहित असणे आवश्यक आहे.",
            default: "मी पीक रोग, बाजार किंमती, हवामान अंदाज आणि शेती सल्ल्यासाठी मदत करण्यासाठी येथे आहे."
        }
    };
    
    const langResponses = responses[chatLanguage] || responses.en;
    
    if (q.includes('disease') || q.includes('रोग') || q.includes('ರೋಗ') || q.includes('sick') || q.includes('problem')) {
        return langResponses.disease;
    } else if (q.includes('price') || q.includes('market') || q.includes('बाजार') || q.includes('ಮಾರುಕಟ್ಟೆ') || q.includes('किंमत')) {
        return langResponses.market;
    } else if (q.includes('weather') || q.includes('मौसम') || q.includes('ಹವಾಮಾನ') || q.includes('rain') || q.includes('हवामान')) {
        return langResponses.weather;
    } else if (q.includes('fertilizer') || q.includes('उर्वरक') || q.includes('ಗೊಬ್ಬರ') || q.includes('खत')) {
        return langResponses.fertilizer;
    } else {
        return langResponses.default;
    }
}

// Ask Quick Question
function askQuestion(type) {
    const questions = {
        'crop-disease': {
            en: "How can I identify crop diseases?",
            kn: "ನಾನು ಬೆಳೆ ರೋಗಗಳನ್ನು ಹೇಗೆ ಗುರುತಿಸಬಹುದು?",
            hi: "मैं फसल रोगों की पहचान कैसे कर सकता हूं?",
            mr: "मी पीक रोग कसे ओळखू शकतो?"
        },
        'market-price': {
            en: "What are the current market prices?",
            kn: "ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಏನು?",
            hi: "वर्तमान बाजार मूल्य क्या हैं?",
            mr: "सध्याच्या बाजार किंमती काय आहेत?"
        },
        'weather': {
            en: "What's the weather forecast?",
            kn: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಏನು?",
            hi: "मौसम का पूर्वानुमान क्या है?",
            mr: "हवामान अंदाज काय आहे?"
        },
        'fertilizer': {
            en: "What fertilizer should I use?",
            kn: "ನಾನು ಯಾವ ಗೊಬ್ಬರವನ್ನು ಬಳಸಬೇಕು?",
            hi: "मुझे कौन सा उर्वरक उपयोग करना चाहिए?",
            mr: "मी कोणते खत वापरावे?"
        }
    };
    
    const question = questions[type][chatLanguage];
    document.getElementById('chatInput').value = question;
    sendMessage();
}

// Toggle Voice Input
function toggleVoiceInput() {
    if (!recognition) {
        alert('Voice recognition not supported in your browser. Please use Chrome or Edge.');
        return;
    }
    
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceIndicator = document.getElementById('voiceIndicator');
    
    if (isVoiceActive) {
        recognition.stop();
        isVoiceActive = false;
        voiceBtn.classList.remove('active');
        voiceIndicator.style.display = 'none';
    } else {
        // Set language for recognition
        const langCodes = {
            en: 'en-US',
            kn: 'kn-IN',
            hi: 'hi-IN',
            mr: 'mr-IN'
        };
        recognition.lang = langCodes[chatLanguage] || 'en-US';
        
        recognition.start();
        isVoiceActive = true;
        voiceBtn.classList.add('active');
        voiceIndicator.style.display = 'block';
    }
}

// Speech Recognition Events
if (recognition) {
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chatInput').value = transcript;
        isVoiceActive = false;
        document.getElementById('voiceBtn').classList.remove('active');
        document.getElementById('voiceIndicator').style.display = 'none';
        
        // Auto send message
        setTimeout(() => sendMessage(), 500);
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        isVoiceActive = false;
        document.getElementById('voiceBtn').classList.remove('active');
        document.getElementById('voiceIndicator').style.display = 'none';
    };
    
    recognition.onend = function() {
        isVoiceActive = false;
        document.getElementById('voiceBtn').classList.remove('active');
        document.getElementById('voiceIndicator').style.display = 'none';
    };
}

// Text to Speech
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language
        const langCodes = {
            en: 'en-US',
            kn: 'kn-IN',
            hi: 'hi-IN',
            mr: 'mr-IN'
        };
        utterance.lang = langCodes[chatLanguage] || 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        speechSynthesis.speak(utterance);
    }
}

console.log('✅ AI Chat Assistant loaded with voice support!');

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message, duration = 5000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Auto hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

console.log('✅ Toast notification system loaded!');

// ============================================
// DARK MODE TOGGLE
// ============================================

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    // Show toast notification
    const messages = {
        en: isDarkMode ? ' Dark mode enabled' : ' Light mode enabled',
        hi: isDarkMode ? ' डार्क मोड सक्षम' : ' लाइट मोड सक्षम',
        kn: isDarkMode ? ' ಡಾರ್ಕ್ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ' : ' ಲೈಟ್ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
        mr: isDarkMode ? ' डार्क मोड सक्षम' : ' लाइट मोड सक्षम'
    };
    
    showToast(messages[currentLang] || messages.en, 2000);
}

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

console.log('✅ Dark mode toggle loaded!');

// ============================================
// FAQ ACCORDION
// ============================================

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

console.log('✅ FAQ accordion loaded!');
