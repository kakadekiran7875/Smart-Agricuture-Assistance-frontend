// Crop Routes API Helper
function getApiBase() {
  if (typeof window !== 'undefined' && window.API_CONFIG && window.API_CONFIG.BASE_URL) {
    return window.API_CONFIG.BASE_URL;
  }
  return 'http://localhost:5001';
}

async function getRecommendedCrop(nitrogen, phosphorus) {
  const primaryUrl = getApiBase();
  const urls = [
    primaryUrl + '/api/crop/recommend',
    'http://localhost:5001/api/crop/recommend'
  ];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nitrogen: parseFloat(nitrogen),
          phosphorus: parseFloat(phosphorus),
          language: (typeof window !== 'undefined' && window.currentLang) || 'en'
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.recommendedCrop) {
          console.log('✅ Recommended Crop:', data.recommendedCrop);
          return data.recommendedCrop;
        }
      }
    } catch (err) {
      console.warn('Crop API call failed for ' + url + ':', err.message);
    }
  }

  // Built-in rule fallback if backend is offline/slow
  console.log('⚠️ Using client-side crop recommendation fallback');
  const n = parseFloat(nitrogen);
  const p = parseFloat(phosphorus);
  if (n >= 300 && p >= 20) return 'Rice';
  if (n >= 200 && p >= 20) return 'Wheat';
  if (n >= 100 && p >= 15) return 'Maize';
  if (p >= 30) return 'Tomato';
  return 'Millet';
}

if (typeof window !== 'undefined') {
  window.getRecommendedCrop = getRecommendedCrop;
}
