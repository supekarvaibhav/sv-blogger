import api from "@/services/api";
import type { User } from "@/types";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  verification_token?: string;
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post<AuthResponse>("/api/auth/register", data);
  return response.data;
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await api.post<AuthResponse>("/api/auth/login", data);
  return response.data;
}

export async function getMe() {
  const response = await api.get<User>("/api/auth/me");
  return response.data;
}
