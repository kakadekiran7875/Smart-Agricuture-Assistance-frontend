/**
 * Smart Agriculture Assistant - Crop Recommendation Service
 */

import { api } from '../core/api.js';

export const cropService = {
    /**
     * Get crop recommendations based on soil NPK, pH, rainfall, temperature and humidity
     */
    async getRecommendation(soilData) {
        return api.post('/crop/recommend', soilData);
    },

    /**
     * Get historical crop recommendations for farmer profile
     */
    async getHistory(userId) {
        return api.get(`/crop/history?userId=${userId}`);
    }
};

export default cropService;

