// Use shared API base URL
const API_BASE = (typeof window !== 'undefined' && window.API_CONFIG)
  ? window.API_CONFIG.BASE_URL
  : 'http://10.232.236.239:5001';

async function getRecommendedCrop(nitrogen, phosphorus) {
  try {
    const res = await fetch(`${API_BASE}/api/crop/recommend`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nitrogen, phosphorus }),
    });

    if (!res.ok) throw new Error("Failed to fetch crop recommendation");

    const data = await res.json();

    if (data.recommendedCrop) {
      console.log("✅ Recommended Crop:", data.recommendedCrop);
      return data.recommendedCrop;
    } else {
      console.log("⚠ No recommendation received");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
  return null;
}