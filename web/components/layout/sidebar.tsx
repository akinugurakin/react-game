"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gamepad2,
  LayoutDashboard,
  Trophy,
  Calculator,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";
import { HexAvatar } from "@/components/ui/hex-avatar";

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/games", icon: Gamepad2, label: "Oyunlar" },
  { href: "/games/math", icon: Calculator, label: "Matematik" },
  { href: "/leaderboard", icon: Trophy, label: "Liderlik" },
  { href: "/profile", icon: User, label: "Profil" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const username = user?.username || "Oyuncu";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r bg-brand-dark text-white transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-brand-lime" />
            <span className="text-lg font-extrabold text-white">React Game</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <Gamepad2 className="h-7 w-7 text-brand-lime" />
          </Link>
        )}
      </div>

      {/* Kullanıcı */}
      <div className={cn("border-b border-white/10 p-4", collapsed && "flex justify-center")}>
        {collapsed ? (
          <HexAvatar initials={initials} size="sm" gradient="from-brand-green to-brand-lime" />
        ) : (
          <div className="flex items-center gap-3">
            <HexAvatar initials={initials} size="sm" gradient="from-brand-green to-brand-lime" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{username}</p>
              <p className="text-xs text-white/50">Çevrimiçi</p>
            </div>
          </div>
        )}
      </div>

      {/* Menü */}
      <nav className="flex-1 space-y-1 p-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-teal text-white shadow-md"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-brand-lime")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Alt kısım */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <button
          onClick={logout}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/10 hover:text-white",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span>Küçült</span>}
        </button>
      </div>
    </aside>
  );
}
