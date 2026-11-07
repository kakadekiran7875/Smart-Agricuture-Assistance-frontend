/**
 * Smart Agriculture Assistant - Plant Disease Diagnosis Service
 */

import { api } from '../core/api.js';

export const diseaseService = {
    /**
     * Upload crop leaf image for AI disease diagnosis
     */
    async diagnoseImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('/diagnosis/detect', formData);
    },

    /**
     * Get treatment advisory for diagnosed disease
     */
    async getTreatment(diseaseId) {
        return api.get(`/diagnosis/treatment/${diseaseId}`);
    }
};

export default diseaseService;

