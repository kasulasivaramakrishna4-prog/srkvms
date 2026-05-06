const BASE_URL = "http://127.0.0.1:8000";

export const getVehicles = () => {
  return fetch(`${BASE_URL}/vehicles`).then((res) => res.json());
};

export const addVehicle = (data) => {
  return fetch(`${BASE_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const updateVehicle = (id, data) => {
  return fetch(`${BASE_URL}/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const deleteVehicle = (id) => {
  return fetch(`${BASE_URL}/vehicles/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const getDashboard = () => {
  return fetch(`${BASE_URL}/dashboard`).then((res) => res.json());
};

export const addEnquiry = (data) => {
  return fetch(`${BASE_URL}/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getEnquiries = () => {
  return fetch(`${BASE_URL}/enquiries`).then((res) => res.json());
};

export const addBooking = (data) => {
  return fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getBookings = () => {
  return fetch(`${BASE_URL}/bookings`).then((res) => res.json());
};

export const addService = (data) => {
  return fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getServices = () => {
  return fetch(`${BASE_URL}/services`).then((res) => res.json());
};
