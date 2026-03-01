import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Donation API
export const donationApi = {
  create: async (username: string, data: any) => {
    const response = await api.post(`/donation/${username}`, data);
    return response.data;
  },
  getByStreamer: async (username: string, limit?: number) => {
    const response = await api.get(`/donation/${username}`, {
      params: { limit },
    });
    return response.data;
  },
};

// Streamer API
export const streamerApi = {
  getProfile: async (username: string) => {
    const response = await api.get(`/streamer/profile/${username}`);
    return response.data;
  },
  getMyProfile: async () => {
    const response = await api.get("/streamer/me");
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post("/streamer", data);
    return response.data;
  },
  updateSettings: async (data: any) => {
    const response = await api.put("/streamer/settings", data);
    return response.data;
  },
};
