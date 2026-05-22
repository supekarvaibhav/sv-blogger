import Link from "next/link";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/reports", label: "Reports" }
];

export function AdminSidebar() {
  return (
    <aside className="flex h-full flex-col gap-3 rounded-3xl border bg-card p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="text-sm hover:text-foreground">
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
