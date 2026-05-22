"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBlog } from "@/services/blogs";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = async () => {
    try {
      await createBlog({
        title,
        category,
        content,
        image: image || undefined,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : undefined
      });
      toast.success("Blog published!");
      setTitle("");
      setCategory("");
      setImage("");
      setTags("");
      setContent("");
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Failed to publish");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Create a new blog</h1>
        <p className="mt-2 text-muted-foreground">Share your ideas with the community.</p>
      </div>
      <div className="space-y-4 rounded-3xl border bg-card p-6">
        <Input placeholder="Blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <RichTextEditor value={content} onChange={setContent} />
        <Button onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  );
}
