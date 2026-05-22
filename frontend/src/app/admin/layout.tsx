"use client";

import { ReactNode } from "react";

import { AdminGuard } from "@/components/AdminGuard";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <div className="space-y-6">{children}</div>
      </div>
    </AdminGuard>
  );
}
