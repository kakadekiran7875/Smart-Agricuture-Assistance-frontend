/**
 * Smart Agriculture Assistant - Master JavaScript Module Entrypoint
 * Aggregates all core engines, agricultural services, and utilities.
 */

// Core Engines
export * from './core/api.js';
export * from './core/i18n.js';
export * from './core/theme.js';

// Agricultural Services
export * from './services/cropService.js';
export * from './services/diseaseService.js';
export * from './services/weatherService.js';
export * from './services/marketService.js';
export * from './services/soilService.js';
export * from './services/fertilizerService.js';

// Utilities
export * from './utils/dom.js';
export * from './utils/formatters.js';

