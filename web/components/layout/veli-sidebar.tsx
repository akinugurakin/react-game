"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Lightbulb,
  LayoutDashboard,
  Users,
  BarChart3,
  Clock,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";

const menuItems = [
  { href: "/veli", icon: LayoutDashboard, label: "Ana Sayfa" },
  { href: "/veli/cocuklar", icon: Users, label: "Çocuklarım" },
  { href: "/veli/raporlar", icon: BarChart3, label: "Raporlar" },
  { href: "/veli/ekran-suresi", icon: Clock, label: "Ekran Süresi" },
  { href: "/veli/abonelik", icon: CreditCard, label: "Abonelik" },
];

export function VeliSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const username = user?.username || "Veli";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r bg-[#042940] text-white transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/veli" className="flex items-center gap-2 overflow-hidden">
          <Lightbulb className="h-7 w-7 shrink-0 text-[#DBF227]" />
          {!collapsed && (
            <span className="text-lg font-extrabold tracking-tight">LUMO</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Veli badge */}
      {!collapsed && (
        <div className="mx-4 mb-4 flex items-center gap-2 rounded-lg bg-[#E8634A]/15 px-3 py-1.5">
          <Heart className="h-3.5 w-3.5 text-[#E8634A]" />
          <span className="text-xs font-semibold text-[#E8634A]">Veli Paneli</span>
        </div>
      )}

      {/* Menü */}
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/veli" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Alt kısım — kullanıcı + çıkış */}
      <div className="border-t border-white/10 p-3">
        {!collapsed && (
          <div className="mb-2 px-3 py-2">
            <p className="truncate text-sm font-semibold">{username}</p>
            <p className="truncate text-xs text-white/40">{user?.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/5 hover:text-white/80",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </aside>
  );
}
