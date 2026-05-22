import { BlogExplorer } from "@/components/BlogExplorer";

export default function BlogsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Discover blogs</h1>
        <p className="mt-2 text-muted-foreground">
          Search, filter, and explore stories from the SV community.
        </p>
      </div>
      <BlogExplorer />
    </section>
  );
}
