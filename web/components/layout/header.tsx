"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Lightbulb,
  Menu,
  Calculator,
  FlaskConical,
  Globe,
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

import { BookOpen, SpellCheck } from "lucide-react";

const NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Oyunlar",
    href: "/games",
    subMenus: [
      {
        title: "Dersler",
        items: [
          {
            label: "Türkçe",
            description: "Kelime, dilbilgisi ve yazım oyunları",
            icon: BookOpen,
            href: "/games?subject=turkce",
          },
          {
            label: "Matematik",
            description: "Sayılar, işlemler, geometri ve daha fazlası",
            icon: Calculator,
            href: "/games?subject=matematik",
          },
          {
            label: "Fen Bilimleri",
            description: "Canlılar, madde, fiziksel olaylar",
            icon: FlaskConical,
            href: "/games?subject=fen",
          },
          {
            label: "Sosyal Bilgiler",
            description: "Tarih, coğrafya, vatandaşlık",
            icon: Globe,
            href: "/games?subject=sosyal",
          },
          {
            label: "İngilizce",
            description: "Kelime, dilbilgisi ve dinleme",
            icon: SpellCheck,
            href: "/games?subject=ingilizce",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Liderlik Tablosu",
    href: "/leaderboard",
  },
  {
    id: 3,
    label: "Rozetler",
    href: "/badges",
  },
  {
    id: 4,
    label: "Planlar",
    href: "/ucretlendirme",
  },
  {
    id: 5,
    label: "Blog",
    href: "/blog",
  },
  {
    id: 6,
    label: "Hakkımızda",
    href: "/about",
  },
  {
    id: 7,
    label: "SSS",
    href: "/sss",
  },
];

export function Header() {
  const t = useTranslations("auth");
  const { isAuthenticated, parent, activeStudent, logout } = useAuthStore();
  const hydrated = useAuthHydrated();
  const username = activeStudent?.first_name || parent?.first_name || "Oyuncu";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-[#F5F4EF]/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Lightbulb className="h-8 w-8 text-brand-dark" />
            <div>
              <span className="text-xl font-extrabold text-brand-dark">LUMO</span>
              <p className="text-[9px] font-normal leading-tight text-brand-dark/40">Eğitsel Oyun Platformu</p>
            </div>
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
                  <Lightbulb className="h-6 w-6 text-brand-dark" />
                  <span className="font-extrabold text-brand-dark">LUMO</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              <Link href="/games" className="text-lg font-semibold">
                Oyunlar
              </Link>
              <Link href="/leaderboard" className="text-lg font-semibold">
                Liderlik Tablosu
              </Link>
              <Link href="/badges" className="text-lg font-semibold">
                Rozetler
              </Link>
              <Link href="/ucretlendirme" className="text-lg font-semibold">
                Planlar
              </Link>
              <Link href="/blog" className="text-lg font-semibold">
                Blog
              </Link>
              <Link href="/about" className="text-lg font-semibold">
                Hakkımızda
              </Link>
              <Link href="/sss" className="text-lg font-semibold">
                SSS
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
    {/* fixed header altında boşluk */}
    <div className="h-16" />
    </>
  );
}
