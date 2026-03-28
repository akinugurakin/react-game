import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-brand-dark" />
            <span className="text-sm font-bold text-brand-dark">LUMO</span>
          </div>
          <p className="text-xs text-muted-foreground">
            MEB müfredatına uygun eğitsel oyun platformu
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
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
            KVKK
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
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            SSS
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          &copy; 2026 LUMO. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
