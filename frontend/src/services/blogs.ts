import api from "@/services/api";
import type { Blog } from "@/types";

export interface BlogListResponse {
  items: Blog[];
  total: number;
  page: number;
  limit: number;
}

export async function fetchBlogs(params?: Record<string, string | number>) {
  const response = await api.get<BlogListResponse>("/api/blogs", { params });
  return response.data;
}

export async function fetchBlog(id: number) {
  const response = await api.get<Blog>(`/api/blogs/${id}`);
  return response.data;
}

export async function createBlog(payload: {
  title: string;
  content: string;
  category: string;
  tags?: string[];
  image?: string;
}) {
  const response = await api.post<Blog>("/api/blogs", payload);
  return response.data;
}

export async function updateBlog(id: number, payload: Partial<Blog>) {
  const response = await api.put<Blog>(`/api/blogs/${id}`, payload);
  return response.data;
}

export async function deleteBlog(id: number) {
  const response = await api.delete(`/api/blogs/${id}`);
  return response.data;
}
