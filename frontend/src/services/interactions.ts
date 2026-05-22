import api from "@/services/api";

export async function toggleLike(blogId: number) {
  const response = await api.post("/api/likes", null, {
    params: { blog_id: blogId }
  });
  return response.data as { liked: boolean };
}

export async function toggleBookmark(blogId: number) {
  const response = await api.post("/api/bookmarks", null, {
    params: { blog_id: blogId }
  });
  return response.data as { bookmarked: boolean };
}

export async function fetchBookmarks() {
  const response = await api.get("/api/bookmarks");
  return response.data as Array<{ id: number; blog_id: number }>;
}
