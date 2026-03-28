"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gamepad2,
  LayoutDashboard,
  Trophy,
  Calculator,
  FlaskConical,
  Globe,
  BookOpen,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { AvatarPicker } from "@/components/ui/avatar-picker";

const oyunAltMenusu = [
  { href: "/games?subject=turkce", icon: BookOpen, label: "T\u00fcrk\u00e7e" },
  { href: "/games?subject=matematik", icon: Calculator, label: "Matematik" },
  { href: "/games?subject=fen", icon: FlaskConical, label: "Fen Bilimleri" },
  { href: "/games?subject=sosyal", icon: Globe, label: "Sosyal Bilgiler" },
];

const menuItems = [
  { href: "/dashboard", icon: User, label: "Profil" },
  { href: "/games", icon: Gamepad2, label: "Oyunlar", hasSubmenu: true },
  { href: "/leaderboard", icon: Trophy, label: "Liderlik" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [oyunlarAcik, setOyunlarAcik] = useState(
    pathname.startsWith("/games")
  );
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("lumo-avatar") || null;
      }
      return null;
    }
  );
  const username = user?.username || "Oyuncu";
  const initials = username.slice(0, 2).toUpperCase();

  const handleAvatarSelect = (url: string) => {
    setAvatarUrl(url);
    localStorage.setItem("lumo-avatar", url);
  };

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
            <span className="text-lg font-extrabold text-white">LUMO</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <Gamepad2 className="h-7 w-7 text-brand-lime" />
          </Link>
        )}
      </div>

      {/* Kullan&#305;c&#305; */}
      <div
        className={cn(
          "border-b border-white/10 p-4",
          collapsed && "flex justify-center"
        )}
      >
        {collapsed ? (
          <button
            onClick={() => setAvatarPickerOpen(true)}
            className="transition-transform hover:scale-110"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="h-9 w-9 rounded-full" />
            ) : (
              <HexAvatar initials={initials} size="sm" gradient="from-brand-green to-brand-lime" />
            )}
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAvatarPickerOpen(true)}
              className="shrink-0 transition-transform hover:scale-110"
              title="Avatar de&#287;i&#351;tir"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-9 w-9 rounded-full" />
              ) : (
                <HexAvatar initials={initials} size="sm" gradient="from-brand-green to-brand-lime" />
              )}
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{username}</p>
              <p className="text-xs text-white/50">
                &#199;evrimi&#231;i
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Avatar Se&#231;ici */}
      <AvatarPicker
        isOpen={avatarPickerOpen}
        onClose={() => setAvatarPickerOpen(false)}
        onSelect={handleAvatarSelect}
        currentAvatar={avatarUrl || undefined}
      />

      {/* Men&#252; */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/games"
              ? pathname === "/games" || pathname.startsWith("/games")
              : pathname === item.href;

          // Oyunlar &#246;zel davran&#305;&#351;
          if (item.hasSubmenu) {
            return (
              <div key={item.href}>
                {/* Ana buton */}
                <button
                  onClick={() => {
                    if (collapsed) {
                      // Collapsed modda direkt sayfaya git
                      window.location.href = item.href;
                    } else {
                      setOyunlarAcik(!oyunlarAcik);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-brand-teal text-white shadow-md"
                      : "text-white/60 hover:bg-white/10 hover:text-white",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive && "text-brand-lime"
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200",
                          oyunlarAcik && "rotate-180"
                        )}
                      />
                    </>
                  )}
                </button>

                {/* Alt men&#252; */}
                {!collapsed && (
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      oyunlarAcik
                        ? "mt-1 max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="ml-3 space-y-0.5 border-l border-white/10 pl-3">
                      {/* T&#252;m Oyunlar */}
                      <Link
                        href="/games"
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                          pathname === "/games" &&
                            !pathname.includes("subject")
                            ? "bg-white/10 text-white"
                            : "text-white/50 hover:bg-white/5 hover:text-white/80"
                        )}
                      >
                        <Gamepad2 className="h-4 w-4 shrink-0" />
                        <span>T&#252;m Oyunlar</span>
                      </Link>

                      {oyunAltMenusu.map((sub) => {
                        const subjectValue = sub.href.split("=")[1];
                        const isSubActive = typeof window !== "undefined" && pathname === "/games" && window.location.search.includes(`subject=${subjectValue}`);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                              isSubActive
                                ? "bg-white/10 text-white"
                                : "text-white/50 hover:bg-white/5 hover:text-white/80"
                            )}
                          >
                            <sub.icon className="h-4 w-4 shrink-0" />
                            <span>{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Normal men&#252; &#246;&#287;esi
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
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive && "text-brand-lime"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Alt k&#305;s&#305;m */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <button
          onClick={logout}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>&#199;&#305;k&#305;&#351; Yap</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/10 hover:text-white",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
          {!collapsed && <span>K&#252;&#231;&#252;lt</span>}
        </button>
      </div>
    </aside>
  );
}
