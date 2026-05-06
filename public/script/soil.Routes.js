// Use shared API base URL
const API_BASE = (typeof window !== 'undefined' && window.API_CONFIG)
  ? window.API_CONFIG.BASE_URL
  : 'http://localhost:5001';

async function analyzeSoil(ph, organicCarbon) {
  try {
    const res = await fetch(`${API_BASE}/api/soil/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ph, organicCarbon }),
    });

    if (!res.ok) throw new Error("Failed to analyze soil");

    const data = await res.json();

    if (data.soilQuality) {
      console.log("✅ Soil Quality:", data.soilQuality);
      return data.soilQuality;
    } else {
      console.log("⚠ No soil analysis result found");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
  return null;
}