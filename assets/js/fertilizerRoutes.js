// Fertilizer Routes API Helper
function getApiBase() {
  if (typeof window !== 'undefined' && window.API_CONFIG && window.API_CONFIG.BASE_URL) {
    return window.API_CONFIG.BASE_URL;
  }
  return 'http://localhost:5001';
}

async function getFertilizerRecommendation(crop, nitrogen, phosphorus, potassium) {
  const primaryUrl = getApiBase();
  const urls = [
    primaryUrl + '/api/fertilizer/recommend',
    'http://localhost:5001/api/fertilizer/recommend'
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
          nitrogen: parseFloat(nitrogen),
          phosphorus: parseFloat(phosphorus),
          potassium: parseFloat(potassium),
          language: (typeof window !== 'undefined' && window.currentLang) || 'en'
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.recommendedFertilizer) {
          console.log('✅ Fertilizer for ' + crop + ':', data.recommendedFertilizer);
          return data.recommendedFertilizer;
        }
      }
    } catch (err) {
      console.warn('Fertilizer API call failed for ' + url + ':', err.message);
    }
  }

  console.log('⚠️ Using client-side fertilizer fallback');
  const n = parseFloat(nitrogen);
  const p = parseFloat(phosphorus);
  const k = parseFloat(potassium);
  if (n < 100 && p < 40) return 'Urea & DAP';
  if (n < 100) return 'Urea (46% N)';
  if (p < 40) return 'DAP (18-46-0)';
  if (k < 40) return 'MOP (Potash)';
  return 'NPK 19-19-19';
}

if (typeof window !== 'undefined') {
  window.getFertilizerRecommendation = getFertilizerRecommendation;
}
