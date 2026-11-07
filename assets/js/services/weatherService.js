/**
 * Smart Agriculture Assistant - Weather & Agro-Meteorological Service
 */

import { api } from '../core/api.js';

export const weatherService = {
    /**
     * Get live weather by GPS coordinates
     */
    async getCurrentWeather(lat, lon) {
        return api.get(`/weather/current?lat=${lat}&lon=${lon}`);
    },

    /**
     * Get 7-day agricultural weather forecast
     */
    async getForecast(city) {
        return api.get(`/weather/forecast?city=${encodeURIComponent(city)}`);
    },

    /**
     * Get weather advisories & spray window recommendations
     */
    async getAdvisories(region) {
        return api.get(`/weather/advisories?region=${encodeURIComponent(region)}`);
    }
};

export default weatherService;

