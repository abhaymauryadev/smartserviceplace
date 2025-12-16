// Format currency (INR by default)
export function formatCurrency(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount);
}

// Generate random booking ID (human readable)
export function generateBookingCode() {
  return `BK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

// Calculate average rating
export function calculateAverageRating(totalRating, totalReviews) {
  if (totalReviews === 0) return 0;
  return Number((totalRating / totalReviews).toFixed(1));
}

// Safe JSON parse
export function safeJsonParse(value, fallback = {}) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// Capitalize string
export function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
