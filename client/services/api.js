export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const searchSpotify = async (query, type, token) => {
  const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=${type}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
};
