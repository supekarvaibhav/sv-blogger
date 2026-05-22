import api from "@/services/api";
import type { User } from "@/types";

export async function fetchUsers() {
  const response = await api.get<User[]>("/api/admin/users");
  return response.data;
}

export async function updateUserStatus(userId: number, isActive: boolean) {
  const response = await api.patch(`/api/admin/users/${userId}/status`, null, {
    params: { is_active: isActive }
  });
  return response.data as { updated: boolean };
}

export async function deleteBlogAsAdmin(blogId: number) {
  const response = await api.delete(`/api/admin/blogs/${blogId}`);
  return response.data as { deleted: boolean };
}

export async function deleteCommentAsAdmin(commentId: number) {
  const response = await api.delete(`/api/admin/comments/${commentId}`);
  return response.data as { deleted: boolean };
}

export async function fetchReports() {
  const response = await api.get("/api/admin/reports");
  return response.data as Array<{
    id: number;
    blog_id: number;
    reason: string;
    status: string;
    created_at: string;
  }>;
}

export async function resolveReport(reportId: number) {
  const response = await api.patch(`/api/admin/reports/${reportId}/resolve`);
  return response.data as { resolved: boolean };
}
