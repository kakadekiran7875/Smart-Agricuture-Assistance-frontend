// Central API configuration
const API_CONFIG = {
    BASE_URL: 'http://10.232.236.239:5001',
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
};

// Backward compatibility for older scripts that expect window.CONFIG / API_BASE_URL
window.API_CONFIG = API_CONFIG;
window.CONFIG = {
    BACKEND_IP: '10.232.236.239',
    BACKEND_PORT: '5001',
    BACKEND_URL: API_CONFIG.BASE_URL,
    API_BASE_URL: `${API_CONFIG.BASE_URL}/api`
};

console.log('✅ API configuration loaded');
console.log(`   Backend URL: ${API_CONFIG.BASE_URL}`);
