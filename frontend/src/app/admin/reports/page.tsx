"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { fetchReports, resolveReport } from "@/services/admin";

interface Report {
  id: number;
  blog_id: number;
  reason: string;
  status: string;
  created_at: string;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (error) {
        toast.error("Failed to load reports");
      }
    };
    load();
  }, []);

  const handleResolve = async (reportId: number) => {
    try {
      await resolveReport(reportId);
      setReports((prev) =>
        prev.map((item) =>
          item.id === reportId ? { ...item, status: "resolved" } : item
        )
      );
    } catch (error) {
      toast.error("Failed to resolve report");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Reports</h1>
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="rounded-2xl border bg-card p-4">
            <p className="font-medium">Blog {report.blog_id}</p>
            <p className="text-sm text-muted-foreground">{report.reason}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs uppercase text-muted-foreground">{report.status}</span>
              {report.status !== "resolved" && (
                <Button size="sm" onClick={() => handleResolve(report.id)}>
                  Resolve
                </Button>
              )}
            </div>
          </div>
        ))}
        {!reports.length && (
          <p className="text-sm text-muted-foreground">No reports found.</p>
        )}
      </div>
    </div>
  );
}
