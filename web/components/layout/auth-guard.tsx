"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";

// TODO: Backend hazır olduğunda BYPASS'ı kaldır
const DEV_BYPASS = true;

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!DEV_BYPASS && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!DEV_BYPASS && !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  return <>{children}</>;
}
