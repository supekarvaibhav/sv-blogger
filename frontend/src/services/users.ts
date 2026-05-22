import api from "@/services/api";
import type { User } from "@/types";

export async function updateProfile(payload: {
  name?: string;
  profile_image?: string;
  bio?: string;
}) {
  const response = await api.patch<User>("/api/users/me", payload);
  return response.data;
}

export async function toggleFollow(userId: number) {
  const response = await api.post(`/api/users/${userId}/follow`);
  return response.data as { following: boolean };
}
