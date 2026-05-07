const API_URL = "https://your-railway-url.up.railway.app";

const requestJson = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || data.error || "Request failed");
  }

  return data;
};

export const getVehicles = () => {
  return requestJson(`${API_URL}/vehicles`);
};

export const addVehicle = (data) => {
  return requestJson(`${API_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateVehicle = (id, data) => {
  return requestJson(`${API_URL}/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteVehicle = (id) => {
  return requestJson(`${API_URL}/vehicles/${id}`, {
    method: "DELETE",
  });
};

export const getDashboard = () => {
  return requestJson(`${API_URL}/dashboard`);
};

export const addEnquiry = async (data) => {
  return requestJson(`${API_URL}/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getEnquiries = () => {
  return requestJson(`${API_URL}/enquiries`);
};

export const addBooking = async (data) => {
  return requestJson(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getBookings = () => {
  return requestJson(`${API_URL}/bookings`);
};

export const addService = async (data) => {
  return requestJson(`${API_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getServices = () => {
  return requestJson(`${API_URL}/services`);
};
