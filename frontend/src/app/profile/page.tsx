"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { updateProfile } from "@/services/users";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleSave = async () => {
    try {
      await updateProfile({ name, bio });
      toast.success("Profile updated");
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Failed to update profile");
    }
  };

  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Profile settings</h1>
        <div className="mt-6 space-y-4 rounded-3xl border bg-card p-6">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </section>
    </ProtectedRoute>
  );
}
