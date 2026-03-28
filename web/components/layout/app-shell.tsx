"use client";

import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function AppShell({
  children,
  publicContent,
}: {
  children: React.ReactNode;
  publicContent?: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const hydrated = useAuthHydrated();

  if (!hydrated) return null;

  // Giriş yapmamışsa — public anasayfa
  if (!isAuthenticated && publicContent) {
    return <>{publicContent}</>;
  }

  // Giriş yapmışsa — sidebar + içerik
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <main>{children}</main>
        </div>
      </div>
    );
  }

  // Fallback — public content veya children
  return <>{publicContent || children}</>;
}
