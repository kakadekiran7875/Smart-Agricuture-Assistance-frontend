// Central API configuration (idempotent declaration)
(function(window) {
    'use strict';

    const isLocalhost = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === ''
    );

    const defaultBaseUrl = isLocalhost 
        ? 'http://localhost:5001' 
        : 'https://smart-agricuture-assistance-backend.onrender.com';

    const BASE_URL = (typeof window !== 'undefined' && window.localStorage && localStorage.getItem('API_BASE_URL')) || defaultBaseUrl;

    window.API_CONFIG = {
        BASE_URL: BASE_URL,
        ENDPOINTS: {
            AUTH_LOGIN: '/api/auth/login',
            AUTH_REGISTER: '/api/auth/register',
            AUTH_PROFILE: '/api/auth/profile',
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
            LOCATION_REVERSE_GEOCODE: '/api/location/reverse-geocode',
            HEALTH: '/health'
        }
    };

    window.CONFIG = {
        BACKEND_IP: isLocalhost ? 'localhost' : 'smart-agricuture-assistance-backend.onrender.com',
        BACKEND_PORT: isLocalhost ? '5001' : '443',
        BACKEND_URL: window.API_CONFIG.BASE_URL,
        API_BASE_URL: window.API_CONFIG.BASE_URL + '/api'
    };

    console.log('✅ API configuration loaded');
    console.log('🌐 Backend URL: ' + window.API_CONFIG.BASE_URL);
})(typeof window !== 'undefined' ? window : globalThis);
