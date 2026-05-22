export type UserRole = "user" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  profile_image?: string | null;
  bio?: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags?: string[] | null;
  image?: string | null;
  likes_count: number;
  read_time: number;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
    profile_image?: string | null;
    bio?: string | null;
  };
}

export interface Comment {
  id: number;
  blog_id: number;
  comment: string;
  rating?: number | null;
  created_at: string;
  user: {
    id: number;
    name: string;
    profile_image?: string | null;
  };
}
