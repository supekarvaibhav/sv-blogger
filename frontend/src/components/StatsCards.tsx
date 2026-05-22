import { Card } from "@/components/ui/card";

const stats = [
  { label: "Total Posts", value: "24" },
  { label: "Followers", value: "1.2k" },
  { label: "Likes", value: "3.4k" },
  { label: "Bookmarks", value: "680" }
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </span>
          <span className="text-2xl font-semibold">{stat.value}</span>
        </Card>
      ))}
    </div>
  );
}
