"use client";

import { VeliSidebar } from "@/components/layout/veli-sidebar";

export default function VeliLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <VeliSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
