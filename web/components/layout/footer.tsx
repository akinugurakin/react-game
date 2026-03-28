import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-brand-dark" />
          <span className="text-sm font-bold text-brand-dark">React Game</span>
        </div>
        <nav className="flex gap-6">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Hakkımızda
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Gizlilik
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Kullanım Koşulları
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            İletişim
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          &copy; 2026 React Game. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
