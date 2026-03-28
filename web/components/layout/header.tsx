"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Gamepad2,
  Menu,
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Trophy,
  BarChart3,
  Star,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MegaMenu, { type MegaMenuItem } from "@/components/ui/mega-menu";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";

const NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Oyunlar",
    subMenus: [
      {
        title: "Kategoriler",
        items: [
          {
            label: "Matematik Yarışması",
            description: "Toplama, çıkarma ile hızını test et",
            icon: Calculator,
            href: "/games",
          },
          {
            label: "Kelime Avı",
            description: "Harflerden anlamlı kelimeler oluştur",
            icon: BookOpen,
            href: "/games",
          },
          {
            label: "Hafıza Kartları",
            description: "Eşleşen kartları bul",
            icon: Brain,
            href: "/games",
          },
          {
            label: "Bulmaca Dünyası",
            description: "Şekilleri doğru yere yerleştir",
            icon: Puzzle,
            href: "/games",
          },
        ],
      },
      {
        title: "Keşfet",
        items: [
          {
            label: "Tüm Oyunlar",
            description: "Eğitici oyun kataloğunu keşfet",
            icon: Gamepad2,
            href: "/games",
          },
          {
            label: "Popüler",
            description: "En çok oynanan oyunlar",
            icon: Star,
            href: "/games",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Topluluk",
    subMenus: [
      {
        title: "Sıralama",
        items: [
          {
            label: "Liderlik Tablosu",
            description: "Bu haftanın en iyileri",
            icon: Trophy,
            href: "/leaderboard",
          },
          {
            label: "Tüm Zamanlar",
            description: "Tarih boyunca en yüksek skorlar",
            icon: BarChart3,
            href: "/leaderboard",
          },
        ],
      },
      {
        title: "Oyuncular",
        items: [
          {
            label: "Aktif Oyuncular",
            description: "Şu an online olan oyuncular",
            icon: Users,
            href: "/leaderboard",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Hakkımızda",
    subMenus: [
      {
        title: "Platform",
        items: [
          {
            label: "Güvenlik",
            description: "Çocuklar için güvenli ortam",
            icon: Shield,
            href: "#",
          },
          {
            label: "Yardım",
            description: "Sıkça sorulan sorular",
            icon: HelpCircle,
            href: "#",
          },
        ],
      },
    ],
  },
];

export function Header() {
  const t = useTranslations("auth");
  const { isAuthenticated, user, logout } = useAuthStore();
  const hydrated = useAuthHydrated();
  const username = user?.username || "Oyuncu";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-brand-dark" />
            <span className="text-xl font-extrabold text-brand-dark">
              React Game
            </span>
          </Link>

          {/* Mega Menu — Desktop */}
          <div className="hidden lg:block">
            <MegaMenu items={NAV_ITEMS} />
          </div>
        </div>

        <nav className="hidden items-center gap-3 md:flex">
          {!hydrated ? (
            <div className="h-9 w-32" /> /* Hydration placeholder */
          ) : isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <HexAvatar initials={initials} size="sm" />
                <span className="text-sm font-medium">{username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Çıkış
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button asChild size="sm" className="shadow-sm shadow-brand-teal/20">
                <Link href="/register">{t("register")}</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6 text-brand-dark" />
                  <span className="font-extrabold text-brand-dark">React Game</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              <Link href="/games" className="text-lg font-semibold">
                Oyunlar
              </Link>
              <Link href="/leaderboard" className="text-lg font-semibold">
                Liderlik
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-lg font-semibold">
                    Dashboard
                  </Link>
                  <Button variant="outline" onClick={logout}>
                    Çıkış
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link href="/login">{t("login")}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">{t("register")}</Link>
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
