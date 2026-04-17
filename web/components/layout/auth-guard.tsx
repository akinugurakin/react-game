"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";

// Dashboard guard — requires an active student session
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const { studentSessionToken, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (!studentSessionToken) {
      router.replace("/profil-sec");
    }
  }, [hydrated, isAuthenticated, studentSessionToken, router]);

  if (!hydrated) return null;

  if (!isAuthenticated || !studentSessionToken) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  return <>{children}</>;
}
