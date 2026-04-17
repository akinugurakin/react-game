"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { VeliSidebar } from "@/components/layout/veli-sidebar";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";

export default function VeliLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <VeliSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
