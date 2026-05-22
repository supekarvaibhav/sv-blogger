import api from "@/services/api";
import type { Comment } from "@/types";

export async function createComment(payload: {
  blog_id: number;
  comment: string;
  rating?: number;
}) {
  const response = await api.post<Comment>("/api/comments", payload);
  return response.data;
}

export async function fetchComments(blogId: number) {
  const response = await api.get<Comment[]>(`/api/comments/${blogId}`);
  return response.data;
}
