import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    server: {
        port: 5173,
        open: true,
        host: true,
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                diagnosis: resolve(__dirname, 'pages/diagnosis.html'),
                market: resolve(__dirname, 'pages/market.html'),
                subsidies: resolve(__dirname, 'pages/subsidies.html'),
                weather: resolve(__dirname, 'pages/weather.html'),
                'soil-analysis': resolve(__dirname, 'pages/soil-analysis.html'),
                'pest-detection': resolve(__dirname, 'pages/pest-detection.html'),
                'crop-recommendation': resolve(__dirname, 'pages/crop-recommendation.html'),
                'fertilizer-recommendation': resolve(__dirname, 'pages/fertilizer-recommendation.html'),
                'chat-expert': resolve(__dirname, 'pages/chat-expert.html'),
                'loan-calculator': resolve(__dirname, 'pages/loan-calculator.html'),
                'yield-prediction': resolve(__dirname, 'pages/yield-prediction.html'),
                'training-videos': resolve(__dirname, 'pages/training-videos.html'),
                'nearby-stores': resolve(__dirname, 'pages/nearby-stores.html'),
                'test-crop': resolve(__dirname, 'pages/test-crop.html'),
                'test-fertilizer-api': resolve(__dirname, 'pages/test-fertilizer-api.html'),
            },
        },
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
});
