const BASE_URL = "/api/bookings";

// Create booking
export async function createBooking(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }

  return res.json();
}

// Get bookings for logged-in user/provider
export async function getMyBookings() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

// Update booking status (provider)
export async function updateBookingStatus(bookingId, status) {
  const res = await fetch(`${BASE_URL}/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update booking status");
  }

  return res.json();
}

// Cancel booking (user)
export async function cancelBooking(bookingId) {
  const res = await fetch(`${BASE_URL}/${bookingId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to cancel booking");
  }

  return res.json();
}
