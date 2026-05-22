"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { fetchUsers, updateUserStatus } from "@/services/admin";
import type { User } from "@/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    load();
  }, []);

  const toggleStatus = async (user: User) => {
    try {
      await updateUserStatus(user.id, !user.is_active);
      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id ? { ...item, is_active: !item.is_active } : item
        )
      );
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Manage users</h1>
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between rounded-2xl border bg-card p-4">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button size="sm" onClick={() => toggleStatus(user)}>
              {user.is_active ? "Suspend" : "Activate"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
