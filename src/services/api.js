const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// import.meta.env.VITE_API_URL ||

// Fetch all events
export const fetchEvents = async (
  page = 1,
  perPage = 10,
  sortBy = "title",
  sortOrder = "asc"
) => {
  const response = await fetch(
    `${API_URL}/events?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  const data = await response.json();
  return data;
};

// Fetch event by ID
export const fetchEventById = async (id) => {
  const response = await fetch(`${API_URL}/events/${id}`);
  const data = await response.json();
  return data;
};

// Register a participant
export const registerForEvent = async (eventId, formData) => {
  const response = await fetch(`${API_URL}/events/${eventId}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
};

// Fetch participants for a specific event
export const fetchParticipants = async (eventId) => {
  const response = await fetch(`${API_URL}/events/${eventId}/participants`);
  const data = await response.json();
  return data;
};
