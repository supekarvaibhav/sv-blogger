import { BlogList } from "@/components/BlogList";
import { sampleBlogs } from "@/data/sampleBlogs";

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Manage blogs</h1>
      <BlogList blogs={sampleBlogs} />
    </div>
  );
}
