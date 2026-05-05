// Use shared API base URL
const API_BASE = (typeof window !== 'undefined' && window.API_CONFIG)
  ? window.API_CONFIG.BASE_URL
  : 'http://10.232.236.239:5001';

async function getMarketPrices() {
  try {
    const res = await fetch(`${API_BASE}/api/market/prices`);
    if (!res.ok) throw new Error("Failed to fetch market prices");

    const data = await res.json();

    if (data.prices?.length > 0) {
      console.log("✅ Market Prices:");
      data.prices.forEach(p => console.log(`${p.crop}: ₹${p.pricePerQuintal}/quintal`));
      return data.prices;
    } else {
      console.log("⚠ No price data found");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
  return null;
}