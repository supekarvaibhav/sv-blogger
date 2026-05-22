"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditBlogPage() {
  const [title, setTitle] = useState("Editing draft");
  const [category, setCategory] = useState("Design");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("## Update your story here");

  const handleUpdate = async () => {
    toast.success("Changes saved");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Edit blog</h1>
      <div className="space-y-4 rounded-3xl border bg-card p-6">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
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
        <Button onClick={handleUpdate}>Save changes</Button>
      </div>
    </div>
  );
}
