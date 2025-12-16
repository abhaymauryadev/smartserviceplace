const BASE_URL = "/api/services";

// Get all services (with filters)
export async function getServices(params = {}) {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${BASE_URL}?${query}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}

// Get single service by ID
export async function getServiceById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch service");
  }

  return res.json();
}

// Create service (provider only)
export async function createService(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create service");
  }

  return res.json();
}

// Update service
export async function updateService(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update service");
  }

  return res.json();
}

// Delete service
export async function deleteService(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete service");
  }

  return res.json();
}
