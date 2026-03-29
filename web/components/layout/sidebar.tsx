"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { AvatarPicker, BeanHeadAvatar } from "@/components/ui/avatar-picker";

import { SpellCheck } from "lucide-react";

import { MapPin, School, UsersRound } from "lucide-react";

function getOyunAltMenusu(prefix: string) {
  return [
    { href: `${prefix}?subject=turkce`, icon: BookOpen, label: "Türkçe" },
    { href: `${prefix}?subject=matematik`, icon: Calculator, label: "Matematik" },
    { href: `${prefix}?subject=fen`, icon: FlaskConical, label: "Fen Bilimleri" },
    { href: `${prefix}?subject=sosyal`, icon: Globe, label: "Sosyal Bilgiler" },
    { href: `${prefix}?subject=ingilizce`, icon: SpellCheck, label: "İngilizce" },
  ];
}

function getLiderlikAltMenusu(prefix: string, showSinif: boolean) {
  const items = [
    { href: `${prefix}?scope=turkiye`, icon: MapPin, label: "Türkiye Geneli" },
    { href: `${prefix}?scope=okul`, icon: School, label: "Okulum" },
  ];
  if (showSinif) {
    items.push({ href: `${prefix}?scope=sinif`, icon: UsersRound, label: "Sınıfım" });
  }
  return items;
}

const studentMenuItems = [
  { href: "/dashboard", icon: User, label: "Profil" },
  { href: "/games", icon: Gamepad2, label: "Oyunlar", hasSubmenu: true },
  { href: "/leaderboard", icon: Trophy, label: "Liderlik", hasSubmenu: true },
];

const teacherMenuItems = [
  { href: "/teacher", icon: LayoutDashboard, label: "Öğretmen Paneli" },
  { href: "/teacher/games", icon: Gamepad2, label: "Oyunlar", hasSubmenu: true },
  { href: "/teacher/leaderboard", icon: Trophy, label: "Liderlik", hasSubmenu: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
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
  // Avatar değişikliklerini sync et (dashboard'dan değiştirildiğinde)
  useEffect(() => {
    const sync = () => {
      const newId = localStorage.getItem("lumo-avatar-id");
      const newBg = localStorage.getItem("lumo-avatar-bg") || "#DBEAFE";
      if (newId !== avatarId) setAvatarId(newId);
      if (newBg !== avatarBg) setAvatarBg(newBg);
    };
    // Her sayfa değişiminde kontrol et
    sync();
    // Storage event (farklı tab'lardan)
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [pathname, avatarId, avatarBg]);
  const isGuest = !isAuthenticated;
  // Öğretmen sayfasındaysa öğretmen modu, değilse öğrenci/misafir
  const isTeacher = user?.role === "teacher" || pathname.startsWith("/teacher");
  const username = isGuest ? (isTeacher ? "Öğretmen" : "Misafir") : (user?.username || "Misafir");
  const initials = username.slice(0, 2).toUpperCase();
  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems;

  // Avatar picker (öğretmen modda sidebar'dan açılabilir)
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const handleAvatarSelect = (id: string, bgColor: string) => {
    setAvatarId(id);
    setAvatarBg(bgColor);
    localStorage.setItem("lumo-avatar-id", id);
    localStorage.setItem("lumo-avatar-bg", bgColor);
    window.dispatchEvent(new StorageEvent("storage", { key: "lumo-avatar-id", newValue: id }));
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
            <Lightbulb className="h-7 w-7 text-brand-lime" />
            <div>
              <span className="text-lg font-extrabold text-white">LUMO</span>
              <p className="text-[10px] font-normal leading-tight text-white/40">Eğitsel Oyun Platformu</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <Lightbulb className="h-7 w-7 text-brand-lime" />
          </Link>
        )}
      </div>

      {/* Kullanıcı */}
      <div
        className={cn(
          "border-b border-white/10 p-4",
          collapsed && "flex justify-center"
        )}
      >
        {(() => {
          // Öğretmen modda: avatar tıklanınca picker açılsın
          // Misafir/öğrenci modda: avatar tıklanınca dashboard'a gitsin
          const avatarContent = avatarId ? (
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full" style={{ backgroundColor: avatarBg }}>
              <BeanHeadAvatar avatarId={avatarId} size={36} />
            </div>
          ) : (
            <HexAvatar initials={initials} size="sm" gradient="from-brand-green to-brand-lime" />
          );

          if (collapsed) {
            return isTeacher ? (
              <button onClick={() => setAvatarPickerOpen(true)} className="transition-transform hover:scale-110">{avatarContent}</button>
            ) : (
              <Link href="/dashboard" className="block transition-transform hover:scale-110">{avatarContent}</Link>
            );
          }

          return (
            <div className="flex items-center gap-3">
              {isTeacher ? (
                <button onClick={() => setAvatarPickerOpen(true)} className="shrink-0 transition-transform hover:scale-110" title="Avatar değiştir">{avatarContent}</button>
              ) : (
                <Link href="/dashboard" className="shrink-0 transition-transform hover:scale-110" title="Profil">{avatarContent}</Link>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{username}</p>
                <p className="text-xs text-white/50">
                  {isGuest ? (isTeacher ? "Öğretmen" : "Giriş yapılmadı") : isTeacher ? "Öğretmen" : "Çevrimiçi"}
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Avatar Seçici (öğretmen modu) */}
      <AvatarPicker
        isOpen={avatarPickerOpen}
        onClose={() => setAvatarPickerOpen(false)}
        onSelect={handleAvatarSelect}
        currentAvatar={avatarId || undefined}
        currentBgColor={avatarBg}
      />


      {/* Menü */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const basePath = item.href.split("?")[0];
          const isActive = pathname === basePath || pathname.startsWith(basePath + "/");

          if (item.hasSubmenu) {
            const isOyunlar = item.href === "/games";
            const isLiderlik = item.href === "/leaderboard";
            const subMenuOpen = isOyunlar ? oyunlarAcik : liderlikAcik;
            const setSubMenuOpen = isOyunlar ? setOyunlarAcik : setLiderlikAcik;
            const gamesPrefix = isTeacher ? "/teacher/games" : "/games";
            const leaderboardPrefix = isTeacher ? "/teacher/leaderboard" : "/leaderboard";
            const subItems = isOyunlar ? getOyunAltMenusu(gamesPrefix) : getLiderlikAltMenusu(leaderboardPrefix, !isTeacher);
            const paramKey = isOyunlar ? "subject" : "scope";
            const allLabel = isOyunlar ? "Tüm Oyunlar" : "Genel";
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
                      {/* Tüm Oyunlar - sadece Oyunlar menüsünde */}
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

          // Normal menü öğesi
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

      {/* Alt kısım */}
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
            {!collapsed && <span>Giriş Yap</span>}
          </Link>
        ) : (
          <button
            onClick={() => {
              logout();
              localStorage.removeItem("lumo-avatar-id");
              localStorage.removeItem("lumo-avatar-bg");
              router.push("/");
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Çıkış Yap</span>}
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
          {!collapsed && <span>Küçült</span>}
        </button>
      </div>
    </aside>
  );
}
