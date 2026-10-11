import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('📦 Copying static assets to dist...');

// Copy assets directory if it exists
const assetsSrc = path.join(rootDir, 'assets');
const assetsDest = path.join(distDir, 'assets');
if (fs.existsSync(assetsSrc)) {
    fs.cpSync(assetsSrc, assetsDest, { recursive: true });
    console.log('   ✓ Copied assets/ -> dist/assets/');
}

// Copy farmer_hero.jpg if it exists in root
const heroSrc = path.join(rootDir, 'farmer_hero.jpg');
const heroDest = path.join(distDir, 'farmer_hero.jpg');
if (fs.existsSync(heroSrc)) {
    fs.copyFileSync(heroSrc, heroDest);
    console.log('   ✓ Copied farmer_hero.jpg -> dist/farmer_hero.jpg');
}

// Copy manifest.json if it exists in root
const manifestSrc = path.join(rootDir, 'manifest.json');
const manifestDest = path.join(distDir, 'manifest.json');
if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, manifestDest);
    console.log('   ✓ Copied manifest.json -> dist/manifest.json');
}

console.log('✅ Static asset copying complete!');
