import { sampleBlogs } from "@/data/sampleBlogs";
import { BlogCard } from "@/components/BlogCard";

export function TrendingSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Trending stories</h2>
        <p className="text-sm text-muted-foreground">Most liked this week</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {sampleBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
