"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Gamepad2,
  Menu,
  Calculator,
  FlaskConical,
  Globe,
  HelpCircle,
  Users,
  Shield,
  GraduationCap,
  Phone,
  CreditCard,
  MessageCircleQuestion,
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
        title: "Dersler",
        items: [
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
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Platform",
    subMenus: [
      {
        title: "Keşfet",
        items: [
          {
            label: "Nasıl Çalışır?",
            description: "LUMO platformunu tanıyın",
            icon: HelpCircle,
            href: "#nasil-calisir",
          },
          {
            label: "Öğretmenler İçin",
            description: "Sınıfınızı oluşturun, ilerlemeyi takip edin",
            icon: GraduationCap,
            href: "#ogretmenler",
          },
          {
            label: "Veliler İçin",
            description: "Güvenli ortam, ebeveyn kontrolü",
            icon: Users,
            href: "#veliler",
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
        title: "Bilgi",
        items: [
          {
            label: "Fiyatlandırma",
            description: "Basit ve şeffaf planlar",
            icon: CreditCard,
            href: "#fiyatlandirma",
          },
          {
            label: "SSS",
            description: "Sıkça sorulan sorular",
            icon: MessageCircleQuestion,
            href: "#sss",
          },
          {
            label: "İletişim",
            description: "Bize ulaşın",
            icon: Phone,
            href: "#iletisim",
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
              LUMO
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
                  <span className="font-extrabold text-brand-dark">LUMO</span>
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
