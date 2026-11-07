/**
 * Smart Agriculture Assistant - Mandi Market Prices Service
 */

import { api } from '../core/api.js';

export const marketService = {
    /**
     * Get live commodity rates across regional APMC Mandis
     */
    async getCommodityPrices(state, commodity) {
        const query = new URLSearchParams({ state, commodity }).toString();
        return api.get(`/market/prices?${query}`);
    },

    /**
     * Get historical price trends for decision-making
     */
    async getTrends(commodityId, months = 6) {
        return api.get(`/market/trends/${commodityId}?months=${months}`);
    }
};

export default marketService;

