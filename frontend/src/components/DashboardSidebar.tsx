import Link from "next/link";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/create", label: "Create Blog" },
  { href: "/dashboard/my-blogs", label: "My Blogs" },
  { href: "/dashboard/saved", label: "Saved" },
  { href: "/profile", label: "Profile" }
];

export function DashboardSidebar() {
  return (
    <aside className="flex h-full flex-col gap-3 rounded-3xl border bg-card p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Dashboard</p>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="text-sm hover:text-foreground">
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
