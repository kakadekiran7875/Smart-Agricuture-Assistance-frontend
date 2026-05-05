import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Base public path - use '/' for root deployment
    base: '/',

    // Server configuration for development
    server: {
        port: 5173,
        open: true, // Automatically open browser when dev server starts
        host: true, // Allow access from network
    },

    // Build configuration
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // Generate sourcemaps for debugging
        sourcemap: false,
        // Rollup options
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                diagnosis: resolve(__dirname, 'diagnosis.html'),
                market: resolve(__dirname, 'market.html'),
                subsidies: resolve(__dirname, 'subsidies.html'),
                weather: resolve(__dirname, 'weather.html'),
                'soil-analysis': resolve(__dirname, 'soil-analysis.html'),
                'pest-detection': resolve(__dirname, 'pest-detection.html'),
                'crop-recommendation': resolve(__dirname, 'crop-recommendation.html'),
                'fertilizer-recommendation': resolve(__dirname, 'fertilizer-recommendation.html'),
                'chat-expert': resolve(__dirname, 'chat-expert.html'),
                'loan-calculator': resolve(__dirname, 'loan-calculator.html'),
                'yield-prediction': resolve(__dirname, 'yield-prediction.html'),
                'training-videos': resolve(__dirname, 'training-videos.html'),
                'nearby-stores': resolve(__dirname, 'nearby-stores.html'),
            },
        },
    },

    // Ensure proper module resolution
    resolve: {
        extensions: ['.js', '.json'],
    },
});
