// Pest Routes API Helper
function getApiBase() {
  if (typeof window !== 'undefined' && window.API_CONFIG && window.API_CONFIG.BASE_URL) {
    return window.API_CONFIG.BASE_URL;
  }
  return 'http://localhost:5001';
}

async function detectPest(crop, symptoms) {
  const primaryUrl = getApiBase();
  const urls = [
    primaryUrl + '/api/pest/detect',
    'http://localhost:5001/api/pest/detect'
  ];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: crop,
          symptoms: symptoms,
          language: (typeof window !== 'undefined' && window.currentLang) || 'en'
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.pest && data.pest !== 'No pest detected') {
          console.log('🐛 Pest detected in ' + crop + ':', data.pest);
          return data.pest;
        }
      }
    } catch (err) {
      console.warn('Pest API call failed for ' + url + ':', err.message);
    }
  }

  console.log('⚠️ Using client-side pest fallback');
  const s = (symptoms || '').toLowerCase();
  if (s.includes('hole') || s.includes('leaf')) return 'Leaf Folder';
  if (s.includes('yellow') || s.includes('curl')) return 'Whitefly';
  if (s.includes('root') || s.includes('wilt')) return 'Termites';
  return 'Aphids';
}

if (typeof window !== 'undefined') {
  window.detectPest = detectPest;
}
