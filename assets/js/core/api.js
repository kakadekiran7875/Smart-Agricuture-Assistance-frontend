/**
 * Smart Agriculture Assistant - Unified API Client (Core Engine)
 * Enterprise-grade fetch wrapper with timeouts, error normalization, and logging.
 */

import { API_BASE_URL } from '../config.js';

class ApiClient {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL || 'http://localhost:5000/api';
        this.defaultTimeout = 15000; // 15 seconds
    }

    /**
     * Internal request dispatcher with AbortController timeout
     */
    async request(endpoint, options = {}) {
        const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
        const timeout = options.timeout || this.defaultTimeout;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const config = {
            ...options,
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                ...(options.headers || {})
            }
        };

        // Don't set Content-Type for FormData (browser sets boundary automatically)
        if (options.body && !(options.body instanceof FormData) && !config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const error = new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                error.status = response.status;
                error.data = errorData;
                throw error;
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                console.error(`[API Timeout] Request to ${url} exceeded ${timeout}ms`);
                throw new Error('Request timed out. Please check your internet connection.');
            }
            console.error(`[API Error] ${url}:`, error.message);
            throw error;
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, body, options = {}) {
        const payload = body instanceof FormData ? body : JSON.stringify(body);
        return this.request(endpoint, { ...options, method: 'POST', body: payload });
    }

    put(endpoint, body, options = {}) {
        const payload = body instanceof FormData ? body : JSON.stringify(body);
        return this.request(endpoint, { ...options, method: 'PUT', body: payload });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

export const api = new ApiClient();
export default api;

