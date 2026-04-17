import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---- Tipler ----

export interface ParentUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface StudentProfile {
  id: number;
  parent_id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  class_level: number;
  created_at: string;
}

// ---- Auth Store ----

interface AuthState {
  parent: ParentUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // Abonelik durumu (profil-sec sonrası yüklenir)
  hasActiveSubscription: boolean;

  // Aktif öğrenci oturumu
  activeStudent: StudentProfile | null;
  studentSessionToken: string | null;

  setAuth: (parent: ParentUser, accessToken: string, refreshToken: string) => void;
  setStudentSession: (student: StudentProfile, token: string) => void;
  setSubscriptionStatus: (active: boolean) => void;
  clearStudentSession: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  updateParent: (updates: Partial<ParentUser>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      parent: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hasActiveSubscription: false,
      activeStudent: null,
      studentSessionToken: null,

      setAuth: (parent, accessToken, refreshToken) =>
        set({ parent, accessToken, refreshToken, isAuthenticated: true }),

      setStudentSession: (student, token) =>
        set({ activeStudent: student, studentSessionToken: token }),

      setSubscriptionStatus: (active) =>
        set({ hasActiveSubscription: active }),

      clearStudentSession: () =>
        set({ activeStudent: null, studentSessionToken: null }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      updateParent: (updates) =>
        set((state) => ({
          parent: state.parent ? { ...state.parent, ...updates } : null,
        })),

      logout: () =>
        set({
          parent: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          hasActiveSubscription: false,
          activeStudent: null,
          studentSessionToken: null,
        }),
    }),
    { name: "lumo-auth" }
  )
);

// ---- Hydration hook ----

export function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    if (useAuthStore.persist.hasHydrated()) setHydrated(true);
    return () => unsub();
  }, []);
  return hydrated;
}

// ---- Token refresh ----

export async function refreshAccessToken(): Promise<boolean> {
  const { refreshToken, setTokens, logout } = useAuthStore.getState();
  if (!refreshToken) {
    logout();
    return false;
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      logout();
      return false;
    }

    const data = await res.json();
    setTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    logout();
    return false;
  }
}
