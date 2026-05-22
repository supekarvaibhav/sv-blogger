import { Blog } from "@/types";

export const sampleBlogs: Blog[] = [
  {
    id: 1,
    title: "Building an AI-ready blog in 2026",
    slug: "ai-ready-blog-2026",
    content: "This is a sample blog post.",
    category: "AI",
    tags: ["ai", "product"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    likes_count: 245,
    read_time: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: {
      id: 1,
      name: "SV Team",
      profile_image: null,
      bio: "Building the future of publishing."
    }
  },
  {
    id: 2,
    title: "Designing for calm, not clicks",
    slug: "designing-for-calm",
    content: "This is a sample blog post.",
    category: "Design",
    tags: ["ux", "design"],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    likes_count: 132,
    read_time: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: {
      id: 2,
      name: "Ava Collins",
      profile_image: null,
      bio: "Writing about product design."
    }
  }
];
