import { StatsCards } from "@/components/StatsCards";
import { BlogList } from "@/components/BlogList";
import { sampleBlogs } from "@/data/sampleBlogs";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Your dashboard</h1>
        <p className="mt-2 text-muted-foreground">Track your writing momentum.</p>
      </div>
      <StatsCards />
      <div>
        <h2 className="text-2xl font-semibold">Recent drafts</h2>
        <div className="mt-4">
          <BlogList blogs={sampleBlogs} />
        </div>
      </div>
      <div className="rounded-3xl border bg-card p-6">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <p className="mt-2 text-sm text-muted-foreground">No new notifications.</p>
      </div>
    </div>
  );
}
