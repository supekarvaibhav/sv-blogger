"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { BlogCard } from "@/components/BlogCard";
import { GridSkeleton } from "@/components/Skeletons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchBlog } from "@/services/blogs";
import { fetchComments } from "@/services/comments";
import type { Blog, Comment } from "@/types";
import { sampleBlogs } from "@/data/sampleBlogs";

export default function BlogDetailsPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: blog?.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const load = async () => {
      const blogId = Number(params?.id);
      if (!blogId) return;
      setLoading(true);
      try {
        const data = await fetchBlog(blogId);
        setBlog(data);
        const list = await fetchComments(blogId);
        setComments(list);
      } catch (error) {
        setBlog(sampleBlogs[0]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <GridSkeleton />
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p>Blog not found.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 space-y-10">
      <div className="space-y-4">
        <BlogCard blog={blog} />
        <Button variant="ghost" onClick={handleShare}>
          Share blog
        </Button>
      </div>
      <div className="rounded-3xl border bg-card p-6">
        <h2 className="text-2xl font-semibold">Story</h2>
        <p className="mt-4 text-sm text-muted-foreground whitespace-pre-line">
          {blog.content}
        </p>
      </div>
      <div className="rounded-3xl border bg-card p-6">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="mt-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-2xl border bg-background p-4">
              <p className="font-medium">{comment.user.name}</p>
              <p className="text-sm text-muted-foreground">{comment.comment}</p>
            </div>
          ))}
          {!comments.length && (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          )}
        </div>
        <div className="mt-6 space-y-3">
          <Textarea placeholder="Share your thoughts" />
          <Button>Add Comment</Button>
        </div>
      </div>
    </section>
  );
}
