import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Blog } from "@/types";
import { formatDate, formatReadingTime } from "@/utils/format";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      {blog.image && (
        <div className="relative h-44 overflow-hidden rounded-2xl">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{formatDate(blog.created_at)}</span>
        <span>·</span>
        <span>{formatReadingTime(blog.read_time)}</span>
        <span>·</span>
        <span>{blog.author.name}</span>
      </div>
      <Link href={`/blogs/${blog.id}`} className="text-xl font-semibold">
        {blog.title}
      </Link>
      <p className="text-sm text-muted-foreground">
        {blog.content.length > 140 ? `${blog.content.slice(0, 140)}...` : blog.content}
      </p>
      <div className="mt-auto flex flex-wrap gap-2">
        <Badge>{blog.category}</Badge>
        {blog.tags?.slice(0, 2)?.map((tag) => (
          <Badge key={tag} className="bg-accent text-accent-foreground">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
