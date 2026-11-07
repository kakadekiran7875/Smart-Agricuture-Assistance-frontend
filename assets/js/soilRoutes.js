// Soil Routes API Helper
function getApiBase() {
  if (typeof window !== 'undefined' && window.API_CONFIG && window.API_CONFIG.BASE_URL) {
    return window.API_CONFIG.BASE_URL;
  }
  return 'http://localhost:5001';
}

async function analyzeSoil(ph, organicCarbon) {
  const primaryUrl = getApiBase();
  const urls = [
    primaryUrl + '/api/soil/analyze',
    'http://localhost:5001/api/soil/analyze'
  ];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ph: parseFloat(ph),
          organicCarbon: parseFloat(organicCarbon),
          language: (typeof window !== 'undefined' && window.currentLang) || 'en'
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.soilQuality) {
          console.log('✅ Soil Quality:', data.soilQuality);
          return data.soilQuality;
        }
      }
    } catch (err) {
      console.warn('Soil API call failed for ' + url + ':', err.message);
    }
  }

  console.log('⚠️ Using client-side soil analysis fallback');
  const phVal = parseFloat(ph);
  const oc = parseFloat(organicCarbon);
  if (phVal >= 6.5 && phVal <= 7.5 && oc >= 0.75) return 'Excellent';
  if (phVal >= 6.0 && phVal <= 8.0 && oc >= 0.5) return 'Good';
  if (phVal >= 5.5 && phVal <= 8.5) return 'Fair';
  return 'Poor';
}

if (typeof window !== 'undefined') {
  window.analyzeSoil = analyzeSoil;
}
