const BASE_URL = "/api/payments";

// Create payment order
export async function createPaymentOrder(data) {
  const res = await fetch(`${BASE_URL}/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create payment order");
  }

  return res.json();
}

// Verify payment (after success)
export async function verifyPayment(data) {
  const res = await fetch(`${BASE_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Payment verification failed");
  }

  return res.json();
}
