"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search blogs"
        className="pl-11"
      />
    </div>
  );
}
