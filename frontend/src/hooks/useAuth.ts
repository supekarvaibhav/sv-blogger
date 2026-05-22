"use client";

import { useAppSelector } from "@/store/hooks";

export function useAuth() {
  const { user, isAuthenticated, hydrated } = useAppSelector((state) => state.auth);
  return { user, isAuthenticated, hydrated };
}
