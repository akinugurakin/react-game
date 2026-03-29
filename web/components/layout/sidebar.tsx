"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gamepad2,
  Lightbulb,
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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { BeanHeadAvatar } from "@/components/ui/avatar-picker";

import { SpellCheck } from "lucide-react";

const oyunAltMenusu = [
  { href: "/games?subject=turkce", icon: BookOpen, label: "T\u00fcrk\u00e7e" },
  { href: "/games?subject=matematik", icon: Calculator, label: "Matematik" },
  { href: "/games?subject=fen", icon: FlaskConical, label: "Fen Bilimleri" },
  { href: "/games?subject=sosyal", icon: Globe, label: "Sosyal Bilgiler" },
  { href: "/games?subject=ingilizce", icon: SpellCheck, label: "\u0130ngilizce" },
];

import { MapPin, School, UsersRound } from "lucide-react";

const liderlikAltMenusuOgrenci = [
  { href: "/leaderboard?scope=turkiye", icon: MapPin, label: "T\u00fcrkiye Geneli" },
  { href: "/leaderboard?scope=okul", icon: School, label: "Okulum" },
  { href: "/leaderboard?scope=sinif", icon: UsersRound, label: "S\u0131n\u0131f\u0131m" },
];

const liderlikAltMenusuOgretmen = [
  { href: "/leaderboard?scope=turkiye", icon: MapPin, label: "T\u00fcrkiye Geneli" },
  { href: "/leaderboard?scope=okul", icon: School, label: "Okulum" },
];

const studentMenuItems = [
  { href: "/dashboard", icon: User, label: "Profil" },
  { href: "/games", icon: Gamepad2, label: "Oyunlar", hasSubmenu: true },
  { href: "/leaderboard", icon: Trophy, label: "Liderlik", hasSubmenu: true },
];

const teacherMenuItems = [
  { href: "/teacher", icon: LayoutDashboard, label: "\u00d6\u011fretmen Paneli" },
  { href: "/games", icon: Gamepad2, label: "Oyunlar", hasSubmenu: true },
  { href: "/leaderboard", icon: Trophy, label: "Liderlik", hasSubmenu: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [oyunlarAcik, setOyunlarAcik] = useState(pathname.startsWith("/games"));
  const [liderlikAcik, setLiderlikAcik] = useState(pathname.startsWith("/leaderboard"));
  // URL search params'i takip et (client-side navigation icin)
  const [currentSearch, setCurrentSearch] = useState("");
  useEffect(() => {
    setCurrentSearch(window.location.search);
  }, [pathname]);
  // pathname degistiginde URL'yi de kontrol et
  useEffect(() => {
    const checkSearch = () => setCurrentSearch(window.location.search);
    // popstate ve pushstate'i dinle
    window.addEventListener("popstate", checkSearch);
    // Next.js client navigation icin kisa bir gecikme
    const timer = setTimeout(checkSearch, 50);
    return () => {
      window.removeEventListener("popstate", checkSearch);
      clearTimeout(timer);
    };
  }, [pathname]);
  const [avatarId, setAvatarId] = useState<string | null>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("lumo-avatar-id") || null;
    return null;
  });
  const [avatarBg, setAvatarBg] = useState<string>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("lumo-avatar-bg") || "#DBEAFE";
    return "#DBEAFE";
  });
  const isGuest = !isAuthenticated;
  // Öğretmen sayfasındaysa (giriş yapmamış olsa bile) öğretmen menüsü göster
  const isTeacherPath = pathname.startsWith("/teacher");
  const isTeacher = user?.role === "teacher" || isTeacherPath;
  const username = isGuest ? (isTeacherPath ? "Öğretmen" : "Misafir") : (user?.username || "Oyuncu");
  const initials = username.slice(0, 2).toUpperCase();
  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems;


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
            <Lightbulb className="h-7 w-7 text-brand-lime" />
            <div>
              <span className="text-lg font-extrabold text-white">LUMO</span>
              <p className="text-[10px] font-normal leading-tight text-white/40">E&#287;itsel Oyun Platformu</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <Lightbulb className="h-7 w-7 text-brand-lime" />
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
          <Link
            href="/dashboard"
            className="block transition-transform hover:scale-110"
          >
            {avatarId ? (
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full" style={{ backgroundColor: avatarBg }}>
                <BeanHeadAvatar avatarId={avatarId} size={36} />
              </div>
            ) : (
              <HexAvatar initials={initials} size="sm" gradient="from-brand-green to-brand-lime" />
            )}
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="shrink-0 transition-transform hover:scale-110"
              title="Profil"
            >
              {avatarId ? (
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full" style={{ backgroundColor: avatarBg }}>
                  <BeanHeadAvatar avatarId={avatarId} size={36} />
                </div>
              ) : (
                <HexAvatar initials={initials} size="sm" gradient="from-brand-green to-brand-lime" />
              )}
            </Link>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{username}</p>
              <p className="text-xs text-white/50">
                {isGuest ? "Giri\u015f yap\u0131lmad\u0131" : isTeacher ? "\u00d6\u011fretmen" : "\u00c7evrimi\u00e7i"}
              </p>
            </div>
          </div>
        )}
      </div>


      {/* Men&#252; */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const basePath = item.href.split("?")[0];
          const isActive = pathname === basePath || pathname.startsWith(basePath + "/");

          if (item.hasSubmenu) {
            const isOyunlar = item.href === "/games";
            const isLiderlik = item.href === "/leaderboard";
            const subMenuOpen = isOyunlar ? oyunlarAcik : liderlikAcik;
            const setSubMenuOpen = isOyunlar ? setOyunlarAcik : setLiderlikAcik;
            const subItems = isOyunlar ? oyunAltMenusu : (isTeacher ? liderlikAltMenusuOgretmen : liderlikAltMenusuOgrenci);
            const paramKey = isOyunlar ? "subject" : "scope";
            const allLabel = isOyunlar ? "T\u00fcm Oyunlar" : "Genel";
            const AllIcon = isOyunlar ? Gamepad2 : Trophy;

            return (
              <div key={item.href}>
                <button
                  onClick={() => {
                    if (collapsed) {
                      window.location.href = item.href;
                    } else {
                      setSubMenuOpen(!subMenuOpen);
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
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-brand-lime")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", subMenuOpen && "rotate-180")} />
                    </>
                  )}
                </button>

                {!collapsed && (
                  <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", subMenuOpen ? "mt-1 max-h-[250px] opacity-100" : "max-h-0 opacity-0")}>
                    <div className="ml-3 space-y-0.5 border-l border-white/10 pl-3">
                      {/* T&#252;m Oyunlar - sadece Oyunlar men&#252;s&#252;nde */}
                      {isOyunlar && (
                        <Link
                          href={basePath}
                          onClick={() => setTimeout(() => setCurrentSearch(""), 0)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                            pathname === basePath && !currentSearch.includes(paramKey)
                              ? "bg-white/10 text-white"
                              : "text-white/50 hover:bg-white/5 hover:text-white/80"
                          )}
                        >
                          <AllIcon className="h-4 w-4 shrink-0" />
                          <span>{allLabel}</span>
                        </Link>
                      )}

                      {subItems.map((sub) => {
                        const paramValue = sub.href.split("=")[1];
                        const isSubActive = pathname === basePath && currentSearch.includes(`${paramKey}=${paramValue}`);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setTimeout(() => setCurrentSearch(`?${paramKey}=${paramValue}`), 0)}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                              isSubActive ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/80"
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
        {isGuest ? (
          <Link
            href="/login"
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-lime transition-colors hover:bg-white/10",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Giri&#351; Yap</span>}
          </Link>
        ) : (
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
        )}

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
