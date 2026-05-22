"use client";

import { cn } from "@/lib/utils";

const categories = ["All", "AI", "Design", "Product", "Culture", "Engineering"];

interface CategoryFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilters({ value, onChange }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            value === category
              ? "border-primary bg-primary text-white"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
