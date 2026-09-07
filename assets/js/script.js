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
    const fallbackBase = 'http://localhost:5001';
    return {
        BACKEND_IP: 'localhost',
        BACKEND_PORT: '5001',
        FRONTEND_IP: 'localhost',
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

// // Language translations
const translations = {
    en: {
        appTitle: "🌱 Smart Agriculture Assistant",
        appSubtitle: "Your Expert Farming Companion",
        navHome: "Home",
        navCropRec: "Crop Recommendation",
        navDisease: "Disease Detection",
        navWeather: "Weather",
        navMarket: "Market Prices",
        navSoil: "Soil & IoT",
        navSchemes: "Government Schemes",
        navAbout: "About",
        navLanguage: "🌐 Language",
        navLogin: "Login",
        navStarted: "Get Started",
        heroTitle: "Smart Farming. Better Decisions. Better Harvests.",
        heroDesc: "Get AI-powered crop recommendations, plant disease detection, real-time weather updates, market prices, soil monitoring and government scheme information — all in one place.",
        btnGetStarted: "Get Started",
        btnExploreFeatures: "Explore Features",
        featuresTitle: "Everything You Need for Smarter Farming",
        f1Title: "🌱 Crop Recommendation",
        f1Desc: "Get suitable crop recommendations based on soil, weather and farming conditions.",
        f2Title: "🤖 Disease Detection",
        f2Desc: "Upload a crop image and identify possible plant diseases using AI.",
        f3Title: "🌦️ Weather Updates",
        f3Desc: "Get real-time weather information and farming-friendly weather insights.",
        f4Title: "💰 Market Prices",
        f4Desc: "Check current crop market prices and make better selling decisions.",
        f5Title: "💧 Soil & IoT Monitoring",
        f5Desc: "Monitor soil moisture, temperature and other farm conditions using IoT sensors.",
        f6Title: "🏛️ Government Schemes",
        f6Desc: "Find useful agriculture subsidies, schemes and government support programs.",
        dashboardWelcome: "Welcome to Smart Agriculture Assistant 🌱",
        dbWeather: "Current Weather",
        dbSoil: "Soil Moisture",
        dbTemp: "Temperature",
        dbHealth: "Crop Health",
        dbMarket: "Market Price",
        dbCropRec: "Recommended Crop",
        ctaTitle: "Start Your Smart Farming Journey Today",
        ctaDesc: "Use technology to make better farming decisions and improve your crop productivity.",
        ctaBtn: "Get Started",
        footerAboutTitle: "Smart Agriculture Assistant",
        footerAboutDesc: "Empowering Farmers with AI, IoT and Smart Technology.",
        footerLinksTitle: "Quick Links",
        footerHome: "Home",
        footerAbout: "About",
        footerFeatures: "Features",
        footerContact: "Contact",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms & Conditions",
        footerLanguagesTitle: "Languages",
        // legacy variables compat
        statFarmers: "Farmers Helped",
        statAccuracy: "Diagnosis Accuracy",
        statSupport: "Available",
        diagnosisTitle: "Crop Diagnosis",
        diagnosisDesc: "Upload photos of your crops and get instant AI-powered disease diagnosis with treatment recommendations.",
        diagnosisAction: "Diagnose Now →",
        marketTitle: "Market Prices",
        marketDesc: "Get real-time market prices for your crops across different mandis and make informed selling decisions.",
        marketAction: "Check Prices →",
        subsidiesTitle: "Government Subsidies",
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
        emergencyTitle: "Emergency Agricultural Help",
        pestControl: "Pest Control Emergency",
        diseaseOutbreak: "Disease Outbreak",
        weatherAlert: "Weather Alert",
        expertContactTitle: "Contact Agricultural Expert",
        submitExpert: "Request Expert Call",
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
    mr: {
        appTitle: "🌱 स्मार्ट शेती सहाय्यक",
        appSubtitle: "तुमचा तज्ञ शेती जोडीदार",
        navHome: "मुख्यपृष्ठ",
        navCropRec: "पीक शिफारस",
        navDisease: "रोग शोधणे",
        navWeather: "हवामान",
        navMarket: "बाजार भाव",
        navSoil: "माती आणि आयओटी",
        navSchemes: "शासकीय योजना",
        navAbout: "माहिती",
        navLanguage: "🌐 भाषा",
        navLogin: "लॉगिन",
        navStarted: "सुरू करा",
        heroTitle: "स्मार्ट शेती. योग्य निर्णय. उत्तम पीक.",
        heroDesc: "एआय-आधारित पीक शिफारसी, वनस्पतींचे रोग शोधणे, रिअल-टाइम हवामान अंदाज, बाजार भाव, मातीचे निरीक्षण आणि शासकीय योजनांची माहिती - सर्व एकाच ठिकाणी मिळवा.",
        btnGetStarted: "सुरू करा",
        btnExploreFeatures: "वैशिष्ट्ये पहा",
        featuresTitle: "स्मार्ट शेतीसाठी आवश्यक सर्व गोष्टी",
        f1Title: "🌱 पीक शिफारस",
        f1Desc: "माती, हवामान आणि शेतीच्या परिस्थितीनुसार योग्य पिकांची शिफारस मिळवा.",
        f2Title: "🤖 रोग शोधणे",
        f2Desc: "पिकाचा फोटो अपलोड करा आणि एआयद्वारे रोगांची ओळख पटवा.",
        f3Title: "🌦️ हवामान अंदाज",
        f3Desc: "नियमित हवामान माहिती आणि शेतीसाठी उपयुक्त हवामान सल्ला मिळवा.",
        f4Title: "💰 बाजार भाव",
        f4Desc: "विविध बाजारांमधील पिकांचे सध्याचे दर तपासा आणि विक्रीचा योग्य निर्णय घ्या.",
        f5Title: "💧 माती आणि आयओटी",
        f5Desc: "आयओटी सेन्सर वापरून मातीतील ओलावा, तापमान आणि शेतीची परिस्थिती तपासा.",
        f6Title: "🏛️ शासकीय योजना",
        f6Desc: "शेतकऱ्यांसाठीच्या कृषी सबसिडी, योजना आणि शासकीय मदतीची माहिती मिळवा.",
        dashboardWelcome: "स्मार्ट शेती सहाय्यकमध्ये आपले स्वागत आहे 🌱",
        dbWeather: "सध्याचे हवामान",
        dbSoil: "मातीतील ओलावा",
        dbTemp: "तापमान",
        dbHealth: "पिकांचे आरोग्य",
        dbMarket: "बाजार भाव",
        dbCropRec: "शिफारस केलेले पीक",
        ctaTitle: "आजच आपली स्मार्ट शेतीची सुरुवात करा",
        ctaDesc: "तंत्रज्ञानाचा वापर करून शेतीचे योग्य निर्णय घ्या आणि पिकांची उत्पादकता वाढवा.",
        ctaBtn: "सुरू करा",
        footerAboutTitle: "स्मार्ट शेती सहाय्यक",
        footerAboutDesc: "एआय, आयओटी आणि स्मार्ट तंत्रज्ञानाने शेतकऱ्यांना सक्षम बनवणे.",
        footerLinksTitle: "महत्वाच्या लिंक्स",
        footerHome: "मुख्यपृष्ठ",
        footerAbout: "माहिती",
        footerFeatures: "वैशिष्ट्ये",
        footerContact: "संपर्क",
        footerPrivacy: "गोपनीयता धोरण",
        footerTerms: "नियम आणि अटी",
        footerLanguagesTitle: "भाषा",
        // legacy
        statFarmers: "मदत केलेले शेतकरी",
        statAccuracy: "निदान अचूकता",
        statSupport: "उपलब्ध",
        diagnosisTitle: "पीक निदान",
        diagnosisDesc: "तुमच्या पिकांचे फोटो अपलोड करा आणि उपचार शिफारशींसह तत्काळ AI-चालित रोग निदान मिळवा.",
        diagnosisAction: "आता निदान करा →",
        marketTitle: "बाजार भाव",
        marketDesc: "विविध मंडींमध्ये तुमच्या पिकांचे रिअल-टाइम बाजार भाव मिळवा आणि माहितीपूर्ण विक्री निर्णय घ्या.",
        marketAction: "भाव तपासा →",
        subsidiesTitle: "सरकारी अनुदान",
        subsidiesDesc: "शेतकऱ्यांसाठी उपलब्ध सरकारी योजना, अनुदान आणि आर्थिक सहाय्य कार्यक्रम शोधा.",
        subsidiesAction: "योजना पहा →",
        weatherTitle: "हवामान अंदाज",
        weatherDesc: "तुमच्या शेती क्रियाकलापांची योजना करण्यासाठी अचूक हवामान अंदाज आणि शेती सल्ला मिळवा.",
        weatherAction: "हवामान पहा →",
        quickTitle: "त्वरित कृती",
        emergencyBtn: "आपत्कालीन मदत",
        photoBtn: "फोटो काढा",
        expertBtn: "तज्ञाशी संपर्क करा",
        aiAssistantBtn: "AI सहाय्यक",
        emergencyTitle: "आपत्कालीन शेती मदत",
        pestControl: "कीड नियंत्रण आपत्काल",
        diseaseOutbreak: "रोग प्रसार",
        weatherAlert: "हवामान चेतावणी",
        expertContactTitle: "शेती तज्ञाशी संपर्क करा",
        submitExpert: "तज्ञ कॉलची विनंती करा",
        soilTitle: "माती विश्लेषण",
        soilDesc: "pH पातळी आणि सेंद्रिय कार्बन सामग्रीचे विश्लेषण करून आपल्या मातीच्या गुणवत्तेची चाचणी करा. चांगल्या पीक उत्पन्नासाठी वैयक्तिक शिफारसी मिळवा.",
        soilAction: "माती विश्लेषण करा →",
        pestTitle: "कीड ओळख",
        pestDesc: "लक्षणांचा अहवाल देऊन आपल्या पिकांवर परिणाम करणाऱ्या कीटकांची ओळख करा. त्वरित उपचार शिफारसी आणि नियंत्रण उपाय मिळवा.",
        pestAction: "कीड शोधा →",
        cropRecTitle: "पीक शिफारस",
        cropRecDesc: "इष्टतम उत्पन्नासाठी आपल्या मातीच्या नायट्रोजन आणि फॉस्फरस पातळीच्या आधारे वैयक्तिक पीक सूचना मिळवा.",
        cropRecAction: "शिफारस मिळवा →",
        fertilizerTitle: "खत शिफारस",
        fertilizerDesc: "आपल्या मातीतील सध्याच्या NPK पातळीच्या आधारे आपल्या पिकासाठी योग्य खत शोधा.",
        fertilizerAction: "खत शोधा →",
        tipsTitle: "शेती टिपा आणि सर्वोत्तम पद्धती",
        tipsCard1Title: "सर्वोत्तम लागवड हंगाम",
        tipsCard2Title: "स्मार्ट सिंचन टिपा",
        tipsCard3Title: "कीड आणि रोग प्रतिबंध",
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
    },
    hi: {
        appTitle: "🌱 स्मार्ट कृषि सहायक",
        appSubtitle: "आपका विशेषज्ञ कृषि साथी",
        navHome: "मुख्यपृष्ठ",
        navCropRec: "फसलों की सिफारिश",
        navDisease: "रोग पहचान",
        navWeather: "मौसम",
        navMarket: "बाजार भाव",
        navSoil: "मिट्टी और IoT",
        navSchemes: "सरकारी योजनाएं",
        navAbout: "परिचय",
        navLanguage: "🌐 भाषा",
        navLogin: "लॉगिन",
        navStarted: "शुरू करें",
        heroTitle: "स्मार्ट खेती। बेहतर निर्णय। उत्तम उपज।",
        heroDesc: "एआई-आधारित फसल सिफारिशें, पौधों के रोगों की पहचान, मौसम पूर्वानुमान, बाजार भाव, मिट्टी की निगरानी और सरकारी योजनाओं की जानकारी - सब एक ही स्थान पर।",
        btnGetStarted: "शुरू करें",
        btnExploreFeatures: "विशेषताएं देखें",
        featuresTitle: "स्मार्ट खेती के लिए सब कुछ",
        f1Title: "🌱 फसल सिफारिश",
        f1Desc: "मिट्टी, मौसम और खेती की स्थिति के आधार पर सही फसलों की सिफारिश पाएं।",
        f2Title: "🤖 रोग पहचान",
        f2Desc: "फसल का फोटो अपलोड करें और एआई की मदद से रोगों की पहचान करें।",
        f3Title: "🌦️ मौसम पूर्वानुमान",
        f3Desc: "वास्तविक समय में मौसम की जानकारी और कृषि के अनुकूल मौसम सलाह पाएं।",
        f4Title: "💰 बाजार भाव",
        f4Desc: "फसलों के वर्तमान बाजार भाव जांचें और सही समय पर बेचने का निर्णय लें।",
        f5Title: "💧 मिट्टी और IoT",
        f5Desc: "IoT सेंसर से मिट्टी की नमी, तापमान और खेत की स्थिति की निगरानी करें।",
        f6Title: "🏛️ सरकारी योजनाएं",
        f6Desc: "किसानों के लिए कृषि सब्सिडी, योजनाएं और सरकारी सहायता कार्यक्रमों की जानकारी लें।",
        dashboardWelcome: "स्मार्ट कृषि सहायक में आपका स्वागत है 🌱",
        dbWeather: "वर्तमान मौसम",
        dbSoil: "मिट्टी की नमी",
        dbTemp: "तापमान",
        dbHealth: "फसल स्वास्थ्य",
        dbMarket: "बाजार भाव",
        dbCropRec: "सिफारिश की गई फसल",
        ctaTitle: "आज ही अपनी स्मार्ट खेती की यात्रा शुरू करें",
        ctaDesc: "तकनीक का उपयोग कर बेहतर कृषि निर्णय लें और अपनी फसल उत्पादकता बढ़ाएं.",
        ctaBtn: "शुरू करें",
        footerAboutTitle: "स्मार्ट कृषि सहायक",
        footerAboutDesc: "एआई, आईओटी और स्मार्ट तकनीक से किसानों को सशक्त बनाना।",
        footerLinksTitle: "त्वरित लिंक्स",
        footerHome: "मुख्यपृष्ठ",
        footerAbout: "परिचय",
        footerFeatures: "विशेषताएं",
        footerContact: "संपर्क",
        footerPrivacy: "गोपनीयता नीति",
        footerTerms: "नियम और शर्तें",
        footerLanguagesTitle: "भाषा",
        // legacy
        statFarmers: "सहायता प्राप्त किसान",
        statAccuracy: "निदान सटीकता",
        statSupport: "उपलब्ध",
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
    kn: {
        appTitle: "🌱 ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
        appSubtitle: "ನಿಮ್ಮ ತಜ್ಞ ಕೃಷಿ ಸಂಗಾತಿ",
        navHome: "ಮುಖಪುಟ",
        navCropRec: "ಬೆಳೆ ಶಿಫಾರಸು",
        navDisease: "ರೋಗ ಪತ್ತೆ ಹಚ್ಚುವಿಕೆ",
        navWeather: "ಹವಾಮಾನ",
        navMarket: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        navSoil: "ಮಣ್ಣು ಮತ್ತು IoT",
        navSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
        navLanguage: "🌐 ಭಾಷೆ",
        navLogin: "ಲಾಗಿನ್",
        navStarted: "ಪ್ರಾರಂಭಿಸಿ",
        heroTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ. ಉತ್ತಮ ನಿರ್ಧಾರಗಳು. ಸಮೃದ್ಧ ಬೆಳೆ.",
        heroDesc: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸುಗಳು, ರೋಗ ಪತ್ತೆ ಹಚ್ಚುವಿಕೆ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು, ಮಣ್ಣಿನ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು - ಎಲ್ಲವೂ ಒಂದೇ ಸೂರಿನಡಿ.",
        btnGetStarted: "ಪ್ರಾರಂಭಿಸಿ",
        btnExploreFeatures: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅನ್વેಷಿಸಿ",
        featuresTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿಗಾಗಿ ಬೇಕಾದ ಎಲ್ಲವೂ",
        f1Title: "🌱 ಬೆಳೆ ಶಿಫಾರಸು",
        f1Desc: "ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳ ಶಿಫಾರಸು ಪಡೆಯಿರಿ.",
        f2Title: "🤖 ರೋಗ ಪತ್ತೆ",
        f2Desc: "ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು AI ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ರೋಗಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ.",
        f3Title: "🌦️ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
        f3Desc: "ನಿಜ ಸಮಯದ ಹವಾಮಾನ ಮಾಹಿತಿ ಮತ್ತು ಕೃಷಿ ಸ್ನೇಹಿ ಹವಾಮಾನ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
        f4Title: "💰 ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
        f4Desc: "ವಿವಿಧ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಬೆಳೆಗಳ ಇತ್ತೀಚಿನ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮಾರಾಟ ನಿರ್ಧಾರ ಮಾಡಿ.",
        f5Title: "💧 ಮಣ್ಣು ಮತ್ತು IoT",
        f5Desc: "IoT ಸೆನ್ಸರ್‌ಗಳ ಸಹಾಯದಿಂದ ಮಣ್ಣಿನ ತೇವಾಂಶ, ತಾಪಮಾನ ಮತ್ತು ಹೊಲದ ಸ್ಥಿತಿಯನ್ನು ತಿಳಿಯಿರಿ.",
        f6Title: "🏛️ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        f6Desc: "ರೈತರಿಗಾಗಿ ಇರುವ ಕೃಷಿ ಸಬ್ಸಿಡಿಗಳು, ಯೋಜನೆಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಸಹಾಯಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.",
        dashboardWelcome: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕಕ್ಕೆ ಸುಸ್ವಾಗತ 🌱",
        dbWeather: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
        dbSoil: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
        dbTemp: "ತಾಪಮಾನ",
        dbHealth: "ಬೆಳೆ ಆರೋಗ್ಯ",
        dbMarket: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
        dbCropRec: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ",
        ctaTitle: "ಇಂದೇ ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
        ctaDesc: "ತಂತ್ರಜ್ಞಾನದ ನೆರವಿನಿಂದ ಉತ್ತಮ ಕೃಷಿ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ಬೆಳೆ ಉತ್ಪಾದಕತೆಯನ್ನು ಹೆಚ್ಚಿಸಿ.",
        ctaBtn: "ಪ್ರಾರಂಭಿಸಿ",
        footerAboutTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
        footerAboutDesc: "AI, IoT ಮತ್ತು ಸ್ಮಾರ್ಟ್ ತಂತ್ರಜ್ಞಾನಗಳ ಮೂಲಕ ರೈತರ ಸಬಲೀಕರಣ.",
        footerLinksTitle: "ತ್ವರಿತ ಕೊಂಡಿಗಳು",
        footerHome: "ಮುಖಪುಟ",
        footerAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
        footerFeatures: "ವೈಶಿಷ್ಟ್ಯಗಳು",
        footerContact: "ಸಂಪರ್ಕಿಸಿ",
        footerPrivacy: "ಗೌಪ್ಯತೆ ನೀತಿ",
        footerTerms: "ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳು",
        footerLanguagesTitle: "ಭಾಷೆಗಳು",
        // legacy
        statFarmers: "ಸಹಾಯ ಮಾಡಿದ ರೈತರು",
        statAccuracy: "ರೋಗನಿರ್ಣಯ ನಿಖರತೆ",
        statSupport: "ಲಭ್ಯವಿದೆ",
        diagnosisTitle: "ಬೆಳೆ ರೋಗನಿರ್ಣಯ",
        diagnosisDesc: "ನಿಮ್ಮ ಬೆಳೆಗಳ ಫೋಟೋಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ತ್ವರಿತ AI-ಚಾಲಿತ ರೋಗ ರೋಗನಿರ್ಣಯವನ್ನು ಪಡೆಯಿರಿ.",
        diagnosisAction: "ಈಗ ರೋಗನಿರ್ಣಯ ಮಾಡಿ →",
        marketTitle: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        marketDesc: "ವಿವಿಧ ಮಂಡಿಗಳಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆલેಗಳನ್ನು ಪಡೆಯಿರಿ आणि ತಿಳುವಳಿಕೆಯುಳ್ಳ ಮಾರಾಟ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
        marketAction: "ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ →",
        subsidiesTitle: "ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳು",
        subsidiesDesc: "ರೈತರಿಗೆ ಲಭ್ಯವಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಹಣಕಾಸು ಸಹಾಯ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಅನ್વેಷಿಸಿ.",
        subsidiesAction: "ಯोजनाಗಳನ್ನು ಅನ್વેಷಿಸಿ →",
        weatherTitle: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
        weatherDesc: "ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಯೋಜಿಸಲು ನಿಖರವಾದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ರೈತ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
        weatherAction: "ಹವಾಮಾನವನ್ನು ವೀಕ್ಷಿಸಿ →",
        quickTitle: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
        emergencyBtn: "ತುರ್ತು ಸಹಾಯ",
        photoBtn: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
        expertBtn: "ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ",
        aiAssistantBtn: "AI ಸಹಾಯಕ",
        emergencyTitle: "ತುರ್ತು ಕೃಷಿ ಸಹಾಯ",
        pestControl: "ಕೀಟ ನಿಯಂತ್ರಣ ತುರ್ತು",
        diseaseOutbreak: "ರೋಗ ಏಕಾಏಕಿ",
        weatherAlert: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
        expertContactTitle: "ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ",
        submitExpert: "ತಜ್ಞ ಕರೆಗೆ ವಿನಂತಿಸಿ",
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
        tipsCard1Title: "ಉತ್ತम ನೆಡುವ ಋತುಗಳು",
        tipsCard2Title: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಸಲಹೆಗಳು",
        tipsCard3Title: "ಕೀಟ ಮತ್ತು ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ",
        chatExpertTitle: "ತಜ್ಞರೊಂದಿಗೆ ಚಾಟ್",
        chatExpertDesc: "ಕೃಷಿ ತಜ್ಞರಿಂದ ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ತ್ವರಿತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",
        chatExpertAction: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ →",
        loanCalcTitle: "ಸಾಲ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        loanCalcDesc: "ಕೃಷಿ ಸಾಲ EMI ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ ಮತ್ತು ರೈತರಿಗೆ ಸರ್ಕಾರಿ ಸಾಲ ಯೋಜನೆಗಳನ್ನು ಅನ್વેಷಿಸಿ.",
        loanCalcAction: "EMI ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ →",
        yieldPredTitle: "ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
        yieldPredDesc: "ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಪದ್ಧತಿಗಳ ಆಧಾರದ ಮೇಲೆ AI ಬಳसी ನಿಮ್ಮ ಬೆಳೆ ಇಳುವರಿಯನ್ನು ಮುನ್ಸೂಚಿಸಿ.",
        yieldPredAction: "ಇಳುವರಿ ಮುನ್ಸೂಚಿಸಿ →",
        trainingVideosTitle: "ತರಬೇತಿ ವೀಡಿಯೊಗಳು",
        trainingVideosDesc: "ಬಹು ಭಾಷೆಗಳಲ್ಲಿ ತಜ್ಞರ ನೇತೃತ್ವದ ವೀಡಿಯೊ ಟ್ಯುಟೋರಿಯಲ್‌ಗಳಿಂದ ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಗಳನ್ನು ಕಲಿಯಿರಿ.",
        trainingVideosAction: "ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಿ →"
    },
    te: {
        appTitle: "🌱 స్మార్ట్ అగ్రికల్చర్ అసిస్టెంట్",
        appSubtitle: "మీ నిపుణుల వ్యవసాయ సహచరుడు",
        navHome: "హోమ్",
        navCropRec: "పంట సిఫార్సు",
        navDisease: "తెగులు గుర్తింపు",
        navWeather: "వాతావరణం",
        navMarket: "मार्केट ధరలు",
        navSoil: "నేల & IoT",
        navSchemes: "ప్రభుత్వ పథకాలు",
        navAbout: "గురించి",
        navLanguage: "🌐 భాష",
        navLogin: "లాగిన్",
        navStarted: "ప్రారంభించండి",
        heroTitle: "స్మార్ట్ వ్యవసాయం. మెరుగైన నిర్ణయాలు. ఉత్తమ దిగుబడి.",
        heroDesc: "నిపుణులైన AI పంట సిఫార్సులు, మొక్కల వ్యాధి గుర్తింపు, నిజ సమయ వాతావరణ అప్‌డేట్లు, మార్కెట్ ధరలు, మట్టి పర్యవేక్షణ మరియు ప్రభుత్వ పథకాల సమాచారం - అన్నీ ఒకే చోట.",
        btnGetStarted: "ప్రారంభించండి",
        btnExploreFeatures: "ఫీచర్లు అన్వేషించండి",
        featuresTitle: "స్మార్ట్ వ్యవసాయం కోసం మీకు కావాల్సినవన్నీ",
        f1Title: "🌱 పంట సిఫార్సు",
        f1Desc: "నేల రకం, వాతావరణం మరియు వ్యవసాయ పరిస్థితుల ఆధారంగా తగిన పంట సిఫార్సులు పొందండి.",
        f2Title: "🤖 తెగులు గుర్తింపు",
        f2Desc: "పంట ఫోటోను అప్‌లోడ్ చేసి, వ్యాధులను AI ద్వారా త్వరగా గుర్తించండి.",
        f3Title: "🌦️ వాతావరణ వివరాలు",
        f3Desc: "నిజ సమయ వాతావరణ సమాచారం మరియు వ్యవసాయ అనుకూల వాతావరణ సూచనలు పొందండి.",
        f4Title: "💰 మార్కెట్ ధరలు",
        f4Desc: "వివిధ మార్కెట్లలో పంటల ప్రస్తుత ధరలను తెలుసుకుని అమ్మకపు నిర్ణయాలు తీసుకోండి.",
        f5Title: "💧 నేల & IoT పర్యవేక్షణ",
        f5Desc: "IoT సెన్సార్లతో మట్టి తేమ, ఉష్ణోగ్రత మరియు పొలం పరిస్థితులను గమనించండి.",
        f6Title: "🏛️ ప్రభుత్వ పథకాలు",
        f6Desc: "వ్యవసాయ సబ్సిడీలు, పథకాలు మరియు ప్రభుత్వ మద్దతు కార్యక్రమాల వివరాలు పొందండి.",
        dashboardWelcome: "స్మార్ట్ అగ్రికల్చర్ అసిస్టెంట్‌కి స్వాగతం 🌱",
        dbWeather: "ప్రస్తుత వాతావరణం",
        dbSoil: "మట్టి తేమ",
        dbTemp: "ఉష్ణోగ్రత",
        dbHealth: "పంట ఆరోగ్యం",
        dbMarket: "मार्केट ధర",
        dbCropRec: "సిఫార్సు చేసిన పంట",
        ctaTitle: "ఈరోజే మీ స్మార్ట్ వ్యవసాయాన్ని ప్రారంభించండి",
        ctaDesc: "సాంకేతికతతో మెరుగైన వ్యవసాయ నిర్ణయాలు తీసుకోండి మరియు పంట దిగుబడిని పెంచుకోండి.",
        ctaBtn: "ప్రారంభించండి",
        footerAboutTitle: "స్మార్ట్ అగ్రికల్చర్ అసిస్టెంట్",
        footerAboutDesc: "AI, IoT మరియు స్మార్ట్ టెక్నాలジーతో రైతులకు సాధికారత అందించడం.",
        footerLinksTitle: "త్వరిత లింకులు",
        footerHome: "హోమ్",
        footerAbout: "గురించి",
        footerFeatures: "ఫీచర్లు",
        footerContact: "సంప్రదించండి",
        footerPrivacy: "గోపనీయత విధానం",
        footerTerms: "నిబంధనలు మరియు షரతులు",
        footerLanguagesTitle: "భాషలు",
        // legacy
        statFarmers: "సహాయం పొందిన రైతులు",
        statAccuracy: "వ్యాధి గుర్తింపు ఖచ్చితత్వం",
        statSupport: "అందుబాటులో ఉంది",
        diagnosisTitle: "పంట వ్యాధి నిర్ధారణ",
        diagnosisDesc: "మీ పంట ఫోటోలను అప్‌లోడ్ చేయండి మరియు తగిన చికిత్సలతో కూడిన AI వ్యాధి నిర్ధారణను పొందండి.",
        diagnosisAction: "రోగనిర్ణయం చేయండి →",
        marketTitle: "मार्केट ధరలు",
        marketDesc: "వివిధ మార్కెట్లలో మీ పంటల ప్రస్తుత ధరలను తెలుసుకోండి.",
        marketAction: "ధరలు తనిఖీ చేయండి →",
        subsidiesTitle: "ప్రభుత్వ పథకాలు",
        subsidiesDesc: "రైతుల కోసం అందుబాటులో ఉన్న పథకాలు మరియు సబ్సిడీలను అన్વેషించండి.",
        subsidiesAction: "పథకాలు చూడండి →",
        weatherTitle: "వాతావరణ సూచన",
        weatherDesc: "మీ వ్యవసాయ పనులను ప్లాన్ చేసుకోవడానికి ఖచ్చితమైన వాతావరణ సూచనను పొందండి.",
        weatherAction: "వాతావరణం చూడండి →",
        quickTitle: "త్వరిత చర్యలు",
        emergencyBtn: "అత్యవసర సహాయం",
        photoBtn: "ఫోటో తీయండి",
        expertBtn: "నిపుణుడిని కలవండి",
        aiAssistantBtn: "AI అసిస్టెంట్",
        emergencyTitle: "అత్యవసర వ్యవసాయ సహాయం",
        pestControl: "పురుగుల నియంత్రణ అత్యవసరం",
        diseaseOutbreak: "తెగులు ఉధృతి",
        weatherAlert: "వాతావరణ హెచ్చరిక",
        expertContactTitle: "వ్యవసాయ నిపుణుడిని సంప్రదించండి",
        submitExpert: "కాల్ కోసం అభ్యర్థించండి",
        soilTitle: "నేల విశ్లేషణ",
        soilDesc: "నేల pH విలువలు మరియు సేంద్రీయ కర్బనాన్ని విశ్లేషించి మీ నేల ఆరోగ్యాన్ని తెలుసుకోండి.",
        soilAction: "నేలను పరీక్షించండి →",
        pestTitle: "పురుగుల గుర్తింపు",
        pestDesc: "పంటను నష్టపరుస్తున్న పురుగులను గుర్తించి చికిత్સા పద్ధతులను తెలుసుకోండి.",
        pestAction: "పురుగులను గుర్తించండి →",
        cropRecTitle: "పంట సిఫార్సు",
        cropRecDesc: "మీ నేలలోని పోషకాల ఆధారంగా తగిన పంటల సిఫార్సులను పొందండి.",
        cropRecAction: "పంట సిఫార్సు పొందండి →",
        fertilizerTitle: "ఎరువుల సిఫార్సు",
        fertilizerDesc: "నేల సారానికి తగినట్లుగా వేయాల్సిన ఎరువుల వివరాలు తెలుసుకోండి.",
        fertilizerAction: "ఎరువులను కనుగొనండి →",
        tipsTitle: "వ్యవసాయ చిట్కాలు & పద్ధతులు",
        tipsCard1Title: "ఉత్తమ పంట కాలాలు",
        tipsCard2Title: "స్మార్ట్ నీటి యాజమాన్యం",
        tipsCard3Title: "తెగుళ్ల నివారణ చిట్కాలు",
        chatExpertTitle: "నిపుణుడితో చాట్",
        chatExpertDesc: "వ్యవసాయ నిపుణుల నుండి మీ సందేహాలకు తక్షణ సమాధానాలు పొందండి.",
        chatExpertAction: "చాట్ ప్రారంభించండి →",
        loanCalcTitle: "రుణ క్యాలిక్యులేటర్",
        loanCalcDesc: "వ్యవసాయ రుణాల EMI లను సులభంగా లెక్కించుకోండి.",
        loanCalcAction: "EMI లెక్కించండి →",
        yieldPredTitle: "దిగుబడి అంచనా",
        yieldPredDesc: "నేల, వాతావరణ పరిస్థితుల ఆధారంగా పంట దిగుబడిని అంచనా వేయండి.",
        yieldPredAction: "దిగుబడిని అంచనా వేయండి →",
        trainingVideosTitle: "శిక్షణ వీడియోలు",
        trainingVideosDesc: "ఆధునిక వ్యవసాయ పద్ధతులపై నిపుణుల వీడియోలను వీక్షించండి.",
        trainingVideosAction: "వీડિયોలు చూడండి →"
    },
    ta: {
        appTitle: "🌱 ஸ்மார்ட் விவசாய உதவியாளர்",
        appSubtitle: "உங்கள் விவசாய வழிகாட்டி",
        navHome: "முகப்பு",
        navCropRec: "பயிர் பரிந்துரை",
        navDisease: "நோய் கண்டறிதல்",
        navWeather: "வானிலை",
        navMarket: "சந்தை விலைகள்",
        navSoil: "மண் & IoT",
        navSchemes: "அரசு திட்டங்கள்",
        navAbout: "பற்றி",
        navLanguage: "🌐 மொழி",
        navLogin: "உள்நுழை",
        navStarted: "தொடங்குங்கள்",
        heroTitle: "ஸ்மார்ட் விவசாயம். சிறந்த முடிவுகள். நல்ல விளைச்சல்.",
        heroDesc: "செயற்கை நுண்ணறிவு (AI) மூலம் பயிர் பரிந்துரை, பயிர் நோய் கண்டறிதல், வானிலை தகவல்கள், சந்தை விலைகள், மண் கண்காணிப்பு மற்றும் அரசு திட்டங்களின் விவரங்கள் - அனைத்தும் ஒரே இடத்தில்.",
        btnGetStarted: "தொடங்குங்கள்",
        btnExploreFeatures: "அம்சங்களை ஆராய்க",
        featuresTitle: "ஸ்மார்ட் விவசாயத்திற்கு தேவையான அனைத்தும்",
        f1Title: "🌱 பயிர் பரிந்துரை",
        f1Desc: "மண், வானிலை மற்றும் விவசாய சூழ்நிலைகளுக்கு ஏற்ப பொருத்தமான பயிர்களின் பரிந்துரைகளைப் பெறுங்கள்.",
        f2Title: "🤖 நோய் கண்டறிதல்",
        f2Desc: "பயிரின் புகைப்படத்தைப் பதிવેற்றி, நோய்களை AI மூலம் கண்டறியுங்கள்.",
        f3Title: "🌦️ வானிலை நிலவரம்",
        f3Desc: "உடனடி வானிலை தகவல்களையும் விவசாயத்திற்கு ஏற்ற வானிலை ஆলোசனைகளையும் பெறுங்கள்.",
        f4Title: "💰 சந்தை விலைகள்",
        f4Desc: "பயிர்களின் தற்போதைய சந்தை விலைகளை அறிந்து சிறந்த விற்பனை முடிவுகளை எடுங்கள்.",
        f5Title: "💧 மண் & IoT கண்காணிப்பு",
        f5Desc: "IoT சென்சார்கள் மூலம் மண்ணின் ஈரப்பதம், வெப்பநிலை மற்றும் நிலத்தின் தன்மையைக் கண்காணிக்கவும்.",
        f6Title: "🏛️ அரசு திட்டங்கள்",
        f6Desc: "விவசாயிகளுக்கான மானியங்கள், அரசு திட்டங்கள் மற்றும் நிதி உதவித் திட்டங்களை அறிந்திடுங்கள்.",
        dashboardWelcome: "ஸ்மார்ட் விவசாய உதவியாளருக்கு வரவேற்கிறோம் 🌱",
        dbWeather: "தற்போதைய வானிலை",
        dbSoil: "மண் ஈரப்பதம்",
        dbTemp: "வெப்பநிலை",
        dbHealth: "பயிர் ஆரோக்கியம்",
        dbMarket: "சந்தை விலை",
        dbCropRec: "பரிந்துரைக்கப்பட்ட பயிர்",
        ctaTitle: "இன்றே உங்கள் ஸ்மார்ட் விவசாயத்தைத் தொடங்குங்கள்",
        ctaDesc: "தொழில்நுட்பத்தைப் பயன்படுத்தி சிறந்த விவசாய முடிவுகளை எடுத்து உற்பத்தியைப் பெருக்குங்கள்.",
        ctaBtn: "தொடங்குங்கள்",
        footerAboutTitle: "ஸ்மார்ட் விவசாய உதவியாளர்",
        footerAboutDesc: "AI, IoT மற்றும் ஸ்மார்ட் தொழில்நுட்பங்கள் மூலம் விவசாயிகளை மேம்படுத்துதல்.",
        footerLinksTitle: "விரைவு இணைப்புகள்",
        footerHome: "முகப்பு",
        footerAbout: "பற்றி",
        footerFeatures: "அம்சங்கள்",
        footerContact: "தொடர்பு கொள்ள",
        footerPrivacy: "தனியுரிமைக் கொள்கை",
        footerTerms: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
        footerLanguagesTitle: "மொழிகள்",
        // legacy
        statFarmers: "உதவி பெற்ற விவசாயிகள்",
        statAccuracy: "துல்லியமான நோய் கண்டறிதல்",
        statSupport: "கிடைக்கும் நேரம்",
        diagnosisTitle: "பயிர் நோய் கண்டறிதல்",
        diagnosisDesc: "உங்கள் பயிர்களின் புகைப்படங்களை பதிவேற்றி, தகுந்த சிகிச்சைகளுடன் கூடிய AI நோய் கண்டறிதலைப் பெறுங்கள்.",
        diagnosisAction: "நோய் கண்டறியவும் →",
        marketTitle: "சந்தை விலைகள்",
        marketDesc: "பல்வேறு சந்தைகளில் உங்கள் பயிர்களின் தற்போதைய விலைகளை அறிந்து கொள்ளுங்கள்.",
        marketAction: "விலையை சரிபார்க்க →",
        subsidiesTitle: "அரசு மானியங்கள்",
        subsidiesDesc: "விவசாயிகளுக்கான அரசு திட்டங்கள் மற்றும் மானியங்களை ஆராயுங்கள்.",
        subsidiesAction: "திட்டங்களை பார்க்க →",
        weatherTitle: "வானிலை முன்னறிவிப்பு",
        weatherDesc: "விவசாயப் பணிகளைத் திட்டமிட துல்லியமான வானிலை முன்னறிவிப்பைப் பெறுங்கள்.",
        weatherAction: "வானிலை பார்க்க →",
        quickTitle: "விரைவு செயல்கள்",
        emergencyBtn: "அவசர உதவி",
        photoBtn: "புகைப்படம் எடுக்க",
        expertBtn: "வல்லுநரைத் தொடர்புகொள்ள",
        aiAssistantBtn: "AI உதவியாளர்",
        emergencyTitle: "அவசர விவசாய உதவி",
        pestControl: "பூச்சி கட்டுப்பாட்டு அவசர உதவி",
        diseaseOutbreak: "நோய் பரவல்",
        weatherAlert: "வானிலை எச்சரிக்கை",
        expertContactTitle: "விவசாய வல்லுநரைத் தொடர்பு கொள்ள",
        submitExpert: "அழைப்புக்கு கோரிக்கை வைக்கவும்",
        soilTitle: "மண் பகுப்பாய்வு",
        soilDesc: "மண்ணின் pH அளவுகள் மற்றும் கரிமக் கார்பனை பகுப்பாய்வு செய்து மண் ஆரோக்கியத்தை அறியுங்கள்.",
        soilAction: "மண்ணை சோதிக்க →",
        pestTitle: "பூச்சி கண்டறிதல்",
        pestDesc: "பயிர்களைத் தாக்கும் பூச்சிகளைக் கண்டறிந்து அவற்றுக்கான பூச்சிக்கொல்லி ஆলোசனைகளைப் பெறுங்கள்.",
        pestAction: "பூச்சியை கண்டறிய →",
        cropRecTitle: "பயிர் பரிந்துரை",
        cropRecDesc: "மண்ணின் ஊட்டச்சத்துக்கள் அடிப்படையில் சிறந்த பயிர் பரிந்துரைகளைப் பெறுங்கள்.",
        cropRecAction: "பரிந்துரையைப் பெற →",
        fertilizerTitle: "உர பரிந்துரை",
        fertilizerDesc: "பயிர்களுக்குத் தேவையான உரங்களின் அளவுகளை அறிந்து கொள்ளுங்கள்.",
        fertilizerAction: "உரங்களை கண்டறிய →",
        tipsTitle: "விவசாய குறிப்புகள் & முறைகள்",
        tipsCard1Title: "பயிர் நடவு காலங்கள்",
        tipsCard2Title: "நீர் மேலாண்மை குறிப்புகள்",
        tipsCard3Title: "பூச்சி மற்றும் நோய் தடுப்பு",
        chatExpertTitle: "வல்லுநருடன் அரட்டை",
        chatExpertDesc: "விவசாய வல்லுநர்களிடமிருந்து உங்கள் கேள்விகளுக்கு உடனுக்குடன் பதில் பெறுங்கள்.",
        chatExpertAction: "அரட்டையைத் தொடங்க →",
        loanCalcTitle: "கடன் கணக்கீட்டாளர்",
        loanCalcDesc: "விவசாயக் கடன்களுக்கான EMI-ஐ எளிதாகக் கணக்கிடுங்கள்.",
        loanCalcAction: "EMI-ஐ கணக்கிட →",
        yieldPredTitle: "விளைச்சல் மதிப்பீடு",
        yieldPredDesc: "மண் மற்றும் வானிலை அடிப்படையில் பயிர் விளைச்சலை மதிப்பிடுங்கள்.",
        yieldPredAction: "விளைச்சலை மதிப்பிட →",
        trainingVideosTitle: "பயிற்சி வீடியோக்கள்",
        trainingVideosDesc: "நவீன விவசாய முறைகள் குறித்த வழிகாட்டுதல் வீடியோக்களைப் பாருங்கள்.",
        trainingVideosAction: "வீடியோக்களைப் பார்க்க →"
    },
    gu: {
        appTitle: "🌱 સ્માર્ટ કૃષિ સહાયક",
        appSubtitle: "તમારો ખેતી માર્ગદર્શક",
        navHome: "હોમ",
        navCropRec: "પાકની ભલામણ",
        navDisease: "રોગની ઓળખ",
        navWeather: "હવામાન",
        navMarket: "બજાર ભાવો",
        navSoil: "જમીન અને IoT",
        navSchemes: "સરકારી યોજનાઓ",
        navAbout: "વિશે",
        navLanguage: "🌐 ભાષા",
        navLogin: "લોગિન",
        navStarted: "શરૂ કરો",
        heroTitle: "સ્માર્ટ ખેતી. બહેતર નિર્ણયો. ઉત્તમ પાક.",
        heroDesc: "એઆઈ-આધારિત પાકની ભલામણો, પાકના રોગોની ઓળખ, હવામાન અહેવાલ, બજાર ભાવો, જમીનની દેખરેખ અને સરકારી યોજનાઓની માહિતી - બધું જ એક જ જગ્યાએ મેળવો.",
        btnGetStarted: "શરૂ કરો",
        btnExploreFeatures: "ખાસિયતો જુઓ",
        featuresTitle: "સ્માર્ટ ખેતી માટે બધી જ જરૂરી સુવિધાઓ",
        f1Title: "🌱 પાકની ભલામણ",
        f1Desc: "જમીન, હવામાન અને ખેતીની સ્થિતિ અનુસાર યોગ્ય પાકની ભલામણ મેળવો.",
        f2Title: "🤖 રોગની ઓળખ",
        f2Desc: "પાકનો ફોટો અપલોડ કરી એઆઈ દ્વારા સંભવિત રોગો શોધી કાઢો.",
        f3Title: "🌦️ હવામાન અપડેટ્સ",
        f3Desc: "રીયલ-ટાઇમ હવામાન માહિતી અને ખેડૂત લક્ષી હવામાન સલાહ મેળવો.",
        f4Title: "💰 બજાર ભાવો",
        f4Desc: "વિવિધ બજારોના પાકના વર્તમાન ભાવો જાણી વેચાણનો યોગ્ય નિર્ણય લો.",
        f5Title: "💧 જમીન અને IoT દેખરેખ",
        f5Desc: "IoT સેન્સર્સની મદદથી જમીનનો ભેજ, તાપમાન અને સ્થિતિનું મોનિટરિંગ કરો.",
        f6Title: "🏛️ સરકારી યોજનાઓ",
        f6Desc: "ખેડૂતો માટે ઉપયોગી સબસિડીઓ, યોજનાઓ અને સરકારી સહાયતા મેળવો.",
        dashboardWelcome: "સ્માર્ટ કૃષિ સહાયકમાં આપનું સ્વાગત છે 🌱",
        dbWeather: "હાલનું હવામાન",
        dbSoil: "જમીનનો ભેજ",
        dbTemp: "તાપમાન",
        dbHealth: "પાકનું સ્વાસ્થ્ય",
        dbMarket: "બજાર ભાવ",
        dbCropRec: "ભલામણ કરેલ પાક",
        ctaTitle: "આજે જ તમારી સ્માર્ટ ખેતીની શરૂઆત કરો",
        ctaDesc: "ટેકનોલોજીનો ઉપયોગ કરી ઉત્તમ નિર્ણયો લો અને પાકની ઉત્પાદકતા વધારો.",
        ctaBtn: "શરૂ કરો",
        footerAboutTitle: "સ્માર્ટ કૃષિ સહાયક",
        footerAboutDesc: "એઆઈ, IoT અને સ્માર્ટ ટેકનોલોજી દ્વારા ખેડૂતોનું સશક્તિકરણ.",
        footerLinksTitle: "ઝડપી લિંક્સ",
        footerHome: "હોમ",
        footerAbout: "વિશે",
        footerFeatures: "ખાસિયતો",
        footerContact: "સંપર્ક",
        footerPrivacy: "ગોપનીયતા નીતિ",
        footerTerms: "નિયમો અને શરતો",
        footerLanguagesTitle: "ભાષાઓ",
        // legacy
        statFarmers: "મદદ મેળવેલ ખેડૂતો",
        statAccuracy: "રોગ ઓળખની ચોકસાઈ",
        statSupport: "ઉપલબ્ધતા",
        diagnosisTitle: "પાક રોગ નિદાન",
        diagnosisDesc: "તમારા પાકનો ફોટો અપલોડ કરી ઉપચારો સાથે ત્વરિત AI રોગ નિદાન મેળવો.",
        diagnosisAction: "રોગ નિદાન કરો →",
        marketTitle: "બજાર ભાવો",
        marketDesc: "જુદી જુદી મંડીઓમાં તમારા પાકના વર્તમાન ભાવો જાણો.",
        marketAction: "ભાવ તપાસો →",
        subsidiesTitle: "સરકારી સબસિડી",
        subsidiesDesc: "ખેડૂતો માટે ઉપલબ્ધ યોજનાઓ અને સહાયતા કાર્યક્રમો શોધો.",
        subsidiesAction: "યોજનાઓ જુઓ →",
        weatherTitle: "હવામાન આગાહી",
        weatherDesc: "ખેતી કાર્યોનું આયોજન કરવા માટે સચોટ હવામાન માહિતી મેળવો.",
        weatherAction: "હવામાન જુઓ →",
        quickTitle: "ઝડપી કાર્યો",
        emergencyBtn: "ઇમરજન્સી સહાય",
        photoBtn: "ફોટો લો",
        expertBtn: "નિષ્ણાતનો સંપર્ક કરો",
        aiAssistantBtn: "AI સહાયક",
        emergencyTitle: "ઇમરજન્સી કૃષિ સહાય",
        pestControl: "જંતુ નિયંત્રણ ઇમરજન્સી",
        diseaseOutbreak: "રોગ ફાટી નીકળવો",
        weatherAlert: "હવામાન ચેતવણી",
        expertContactTitle: "કૃષિ નિષ્ણાતનો સંપર્ક કરો",
        submitExpert: "કૉલ માટે વિનંતી કરો",
        soilTitle: "જમીન વિશ્લેષણ",
        soilDesc: "જમીનનો pH અને સેન્દ્રીય કાર્બન ચકાસી જમીનનું સ્વાસ્થ્ય જાણો.",
        soilAction: "જમીન ચકાસો →",
        pestTitle: "જંતુ ઓળખ",
        pestDesc: "પાકને નુકસાન કરતા જંતુઓની ઓળખ મેળવી નિયંત્રણ उपायો જાણો.",
        pestAction: "જંતુ શોધો →",
        cropRecTitle: "પાકની ભલામણ",
        cropRecDesc: "જમીનના પોષક તત્વોના આધારે યોગ્ય પાકની ભલામણ મેળવો.",
        cropRecAction: "ભલામણ મેળવો →",
        fertilizerTitle: "ખાતર ભલામણ",
        fertilizerDesc: "પાક માટે જરૂરી ખાતરોના પ્રમાણની માહિતી મેળવો.",
        fertilizerAction: "ખાતર શોધો →",
        tipsTitle: "ખેતી માટેની ઉપયોગી ટિપ્સ",
        tipsCard1Title: "વાવણીની શ્રેષ્ઠ ઋતુઓ",
        tipsCard2Title: "સ્માર્ટ સિંચાઈ પદ્ધતિઓ",
        tipsCard3Title: "જંતુ અને રોગ નિવારણ",
        chatExpertTitle: "નિષ્ણાત સાથે વાતચીત",
        chatExpertDesc: "કૃષિ નિષ્ણાતો સાથે વાતચીત કરી તમારા પ્રશ્નોના જવાબો મેળવો.",
        chatExpertAction: "વાતચીત શરૂ કરો →",
        loanCalcTitle: "લોન કેલ્ક્યુલેટર",
        loanCalcDesc: "ખેતી લોનના EMIની ગણતરી સરળતાથી કરો.",
        loanCalcAction: "EMI ગણતરી કરો →",
        yieldPredTitle: "પાક ઉત્પાદન અંદાજ",
        yieldPredDesc: "જમીન અને હવામાન આધારે સંભવિત ઉત્પાદનનો અંદાજ મેળવો.",
        yieldPredAction: "અંદાજ મેળવો →",
        trainingVideosTitle: "તાલીમ વીડિયો",
        trainingVideosDesc: "આધુનિક ખેતી પદ્ધતિઓના તાલીમ વીડિયો જુઓ.",
        trainingVideosAction: "વીડિયો જુઓ →"
    },
    bn: {
        appTitle: "🌱 স্মার্ট কৃষি সহায়ক",
        appSubtitle: "আপনার বিশ্বস্ত চাষের সঙ্গী",
        navHome: "হোম",
        navCropRec: "ফসল সুপারিশ",
        navDisease: "রোগ সনাক্তকরণ",
        navWeather: "আবহাওয়া",
        navMarket: "বাজার দর",
        navSoil: "মাটি ও IoT",
        navSchemes: "সরকারি প্রকল্প",
        navAbout: "সম্পর্কে",
        navLanguage: "🌐 ভাষা",
        navLogin: "লগইন",
        navStarted: "শুরু করুন",
        heroTitle: "স্মার্ট চাষাবাদ. সঠিক সিদ্ধান্ত. ভালো ফসল.",
        heroDesc: "এআই-ভিত্তিক ফসলের সুপারিশ, রোগ সনাক্তকরণ, রিয়েল-টাইম আবহাওয়া আপডেট, বাজার দর, মাটির স্বাস্থ্য পরীক্ষা এবং সরকারি প্রকল্পগুলির তথ্য - সব এক জায়গায় পান।",
        btnGetStarted: "শুরু করুন",
        btnExploreFeatures: "বৈশিষ্ট্যগুলি দেখুন",
        featuresTitle: "স্মার্ট চাষের জন্য প্রয়োজনীয় সবকিছু",
        f1Title: "🌱 ফসল সুপারিশ",
        f1Desc: "আপনার মাটির ধরন ও আবহাওয়া অনুযায়ী উপযুক্ত ফসলের চাষের পরামর্শ নিন।",
        f2Title: "🤖 রোগ সনাক্তকরণ",
        f2Desc: "ফসলের ছবি আপলোড করে এআই প্রযুক্তির সাহায্যে দ্রুত রোগ নির্ণয় করুন।",
        f3Title: "🌦️ আবহাওয়া আপডেট",
        f3Desc: "সঠিক আবহাওয়ার খবর এবং চাষের জন্য উপযোগী বিশেষ আবহাওয়া পরামর্শ পান।",
        f4Title: "💰 বাজার দর",
        f4Desc: "বিভিন্ন বাজারের ফসলের বর্তমান দাম জেনে সঠিক দামে ফসল বিক্রি করুন।",
        f5Title: "💧 মাটি ও IoT মনিটরিং",
        f5Desc: "IoT সেন্সরের সাহায্যে মাটির আর্দ্রতা, তাপমাত্রা ও জমির অবস্থা পরিমাপ করুন।",
        f6Title: "🏛️ সরকারি প্রকল্প",
        f6Desc: "কৃষকদের জন্য সরকারি ভরতুকি, প্রকল্প এবং সহায়তা কর্মসূচির বিবরণ জানুন।",
        dashboardWelcome: "স্মার্ট কৃষি সহায়কে স্বাগতম 🌱",
        dbWeather: "বর্তমান আবহাওয়া",
        dbSoil: "মাটির আর্দ্রতা",
        dbTemp: "তাপমাত্রা",
        dbHealth: "ফসলের স্বাস্থ্য",
        dbMarket: "বাজার মূল্য",
        dbCropRec: "প্রস্তাবিত ফসল",
        ctaTitle: "আজই আপনার স্মার্ট চাষের যাত্রা শুরু করুন",
        ctaDesc: "প্রযুক্তির সাহায্যে সঠিক কৃষি সিদ্ধান্ত নিন এবং ফসলের ফলন বাড়ান।",
        ctaBtn: "শুরু করুন",
        footerAboutTitle: "স্মার্ট কৃষি সহায়ক",
        footerAboutDesc: "AI, IoT এবং স্মার্ট প্রযুক্তি দিয়ে কৃষকদের ক্ষমতায়ন করা।",
        footerLinksTitle: "প্রয়োজনীয় লিঙ্ক",
        footerHome: "হোম",
        footerAbout: "সম্পর্কে",
        footerFeatures: "বৈশিষ্ট্য সমূহ",
        footerContact: "যোগাযোগ",
        footerPrivacy: "গোপনীয়তা নীতি",
        footerTerms: "শর্তাবলী",
        footerLanguagesTitle: "ভাষা সমূহ",
        // legacy
        statFarmers: "সাহায্যপ্রাপ্ত কৃষক",
        statAccuracy: "রোগ নির্ণয়ের নির্ভুলতা",
        statSupport: "সহায়তার সময়",
        diagnosisTitle: "ফসলের রোগ নির্ণয়",
        diagnosisDesc: "আপনার ফসলের ছবি আপলোড করে প্রতিকার সহ তাত্ক্ষণিক এআই রোগ নির্ণয় করুন।",
        diagnosisAction: "রোগ নির্ণয় করুন →",
        marketTitle: "বাজার দর",
        marketDesc: "বিভিন্ন বাজারে আপনার ফসলের রিয়েল-টাইম মূল্য জানুন।",
        marketAction: "বাজার দর দেখুন →",
        subsidiesTitle: "सरकारी सब्सिडी",
        subsidiesDesc: "কৃষকদের জন্য সরকারি প্রকল্প ও আর্থিক অনুদান সম্পর্কে জানুন।",
        subsidiesAction: "প্রকল্পগুলি দেখুন →",
        weatherTitle: "আবহাওয়ার পূর্বাভাস",
        weatherDesc: "কৃষি কাজ পরিকল্পনার জন্য সঠিক আবহাওয়ার পূর্বাভাস পান।",
        weatherAction: "আবহাওয়া দেখুন →",
        quickTitle: "দ্রুত লিংক",
        emergencyBtn: "জরুরী সহায়তা",
        photoBtn: "ছবি তুলুন",
        expertBtn: "বিশেষজ্ঞের পরামর্শ",
        aiAssistantBtn: "এআই সহকারী",
        emergencyTitle: "জরুরী কৃষি সহায়তা",
        pestControl: "পোকা দমনে জরুরী সহায়তা",
        diseaseOutbreak: "রোগের প্রাদুর্ভাব",
        weatherAlert: "আবহাওয়া সতর্কতা",
        expertContactTitle: "কৃষি বিশেষজ্ঞের সাথে যোগাযোগ",
        submitExpert: "কলের অনুরোধ জানান",
        soilTitle: "মাটি পরীক্ষা",
        soilDesc: "মাটির pH ও জৈব কার্বনের পরিমাণ মেপে মাটির উর্বরতা জানুন।",
        soilAction: "মাটি পরীক্ষা করুন →",
        pestTitle: "পোকামাকড় সনাক্তকরণ",
        pestDesc: "ফসলে আক্রমণকারী পোকামাকড় সনাক্ত করে প্রতিকারের উপায় জানুন।",
        pestAction: "পোকা সনাক্ত করুন →",
        cropRecTitle: "ফসলের সুপারিশ",
        cropRecDesc: "মাটির পুষ্টি উপাদানের ভিত্তিতে উপযুক্ত ফসল চাষের পরামর্শ পান।",
        cropRecAction: "সুপারিশ পান →",
        fertilizerTitle: "সার সুপারিশ",
        fertilizerDesc: "ফসলের জন্য সঠিক সার ও তার প্রয়োজনীয় পরিমাণ জানুন।",
        fertilizerAction: "সার খুঁজুন →",
        tipsTitle: "কৃষি পরামর্শ ও পদ্ধতি",
        tipsCard1Title: "ফসলের সঠিক সময়",
        tipsCard2Title: "স্মার্ট সেচ পদ্ধতি",
        tipsCard3Title: "পোকামাকড় ও রোগ প্রতিরোধ",
        chatExpertTitle: "বিশেষজ্ঞের সাথে চ্যাট",
        chatExpertDesc: "কৃষি বিশেষজ্ঞদের সাথে সরাসরি চ্যাট করে চাষের সমস্যা সমাধান করুন।",
        chatExpertAction: "চ্যাট শুরু করুন →",
        loanCalcTitle: "ঋণ ক্যালকুলেটর",
        loanCalcDesc: "কৃষি ঋণের মাসিক কিস্তি বা EMI হিসাব করুন।",
        loanCalcAction: "EMI হিসাব করুন →",
        yieldPredTitle: "ফলন অনুমান",
        yieldPredDesc: "মাটি ও আবহাওয়া বিশ্লেষণ করে সম্ভাব্য ফলন অনুমান করুন।",
        yieldPredAction: "ফলন অনুমান করুন →",
        trainingVideosTitle: "প্রশিক্ষণ ভিডিও",
        trainingVideosDesc: "আধুনিক চাষ পদ্ধতির উপর বিশেষজ্ঞ কৃষকদের ভিডিও গাইড দেখুন।",
        trainingVideosAction: "ভিডিও দেখুন →"
    }
};

// Current language state
let currentLang = 'en';
const languages = ['en', 'mr', 'hi', 'kn', 'te', 'ta', 'gu', 'bn'];
let currentLangIndex = 0;ॉल का अनुरोध करें",
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
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages.includes(savedLang)) {
        currentLang = savedLang;
        currentLangIndex = languages.indexOf(savedLang);
    } else {
        // Set default language to English on first visit
        currentLang = 'en';
        currentLangIndex = 0;
        localStorage.setItem('preferredLanguage', 'en');
    }
    // Always update language on page load
    updateLanguage();
    updateLangSelectorLabel();
    
    // Toggle language dropdown menu on click
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const show = langDropdown.classList.toggle('show');
            langBtn.setAttribute('aria-expanded', show);
        });
    }
    
    // Setup mobile hamburger menu toggle
    setupMobileMenu();
    
    // Highlight active nav link dynamically
    highlightActiveNavLink();
    
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
        
        // Close language dropdown if clicking outside
        const langDropdown = document.getElementById('langDropdown');
        const langBtn = document.getElementById('langBtn');
        if (langDropdown && langBtn && !langBtn.contains(event.target) && !langDropdown.contains(event.target)) {
            langDropdown.classList.remove('show');
            langBtn.setAttribute('aria-expanded', 'false');
        }
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
    updateLangSelectorLabel();
}

function changeLanguage(langCode) {
    if (languages.includes(langCode)) {
        currentLang = langCode;
        currentLangIndex = languages.indexOf(langCode);
        localStorage.setItem('preferredLanguage', langCode);
        updateLanguage();
        updateLangSelectorLabel();
    }
}

function updateLangSelectorLabel() {
    const labels = {
        en: 'English',
        mr: 'मराठी',
        hi: 'हिंदी',
        kn: 'ಕನ್ನಡ',
        te: 'తెలుగు',
        ta: 'தமிழ்',
        gu: 'ગુજરાતી',
        bn: 'বাংলা'
    };
    
    const labelEl = document.getElementById('currentLangLabel');
    if (labelEl) {
        labelEl.textContent = labels[currentLang];
    }
    
    // Update active dropdown item
    const options = document.querySelectorAll('.lang-option');
    options.forEach(opt => {
        if (opt.getAttribute('onclick')?.includes(`'${currentLang}'`)) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    // Update active footer language item
    const footerItems = document.querySelectorAll('.footer-lang-item');
    footerItems.forEach(item => {
        if (item.getAttribute('onclick')?.includes(`'${currentLang}'`)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function updateLanguage() {
    const elements = translations[currentLang];
    if (!elements) return;
    
    Object.keys(elements).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = elements[key];
            } else {
                element.textContent = elements[key];
            }
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

// Setup Hamburger Menu Drawer Event Handlers
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const expanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', expanded);
        });
        
        // Close menu when clicking navigation links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Highlight active navigation links based on current path
function highlightActiveNavLink() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (page === href || (href === 'index.html' && (page === '' || page === 'index.html')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
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
