import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Admin overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Active users", value: "1,204" },
          { label: "Open reports", value: "12" },
          { label: "Flagged posts", value: "6" }
        ].map((item) => (
          <Card key={item.label} className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {item.label}
            </span>
            <span className="text-2xl font-semibold">{item.value}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
