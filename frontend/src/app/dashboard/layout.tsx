"use client";

import { ReactNode } from "react";

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-[240px_1fr]">
        <DashboardSidebar />
        <div className="space-y-6">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
