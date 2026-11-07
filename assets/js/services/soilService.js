/**
 * Smart Agriculture Assistant - Soil & IoT Sensor Service
 */

import { api } from '../core/api.js';

export const soilService = {
    /**
     * Analyze soil sample NPK, organic carbon & pH
     */
    async analyzeSoil(soilData) {
        return api.post('/soil/analyze', soilData);
    },

    /**
     * Get live telemetry from farmer's IoT soil moisture & temperature probes
     */
    async getSensorTelemetry(deviceId) {
        return api.get(`/soil/iot/${deviceId}`);
    }
};

export default soilService;

