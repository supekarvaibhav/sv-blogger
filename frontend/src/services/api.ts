import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem("sv_auth");
    if (raw) {
      const stored = JSON.parse(raw) as { accessToken?: string };
      if (stored.accessToken) {
        config.headers.Authorization = `Bearer ${stored.accessToken}`;
      }
    }
  }
  return config;
});

export default api;
