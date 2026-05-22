import api from "@/services/api";

export async function createReport(payload: { blog_id: number; reason: string }) {
  const response = await api.post("/api/reports", payload);
  return response.data;
}
