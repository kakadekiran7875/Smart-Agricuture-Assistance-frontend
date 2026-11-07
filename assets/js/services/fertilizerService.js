/**
 * Smart Agriculture Assistant - Fertilizer Recommendation Service
 */

import { api } from '../core/api.js';

export const fertilizerService = {
    /**
     * Calculate optimal fertilizer requirement based on soil test & target crop
     */
    async calculateDose(crop, soilNPK) {
        return api.post('/fertilizer/calculate', { crop, ...soilNPK });
    },

    /**
     * Get organic fertilizer alternatives
     */
    async getOrganicAlternatives(cropId) {
        return api.get(`/fertilizer/organic/${cropId}`);
    }
};

export default fertilizerService;

