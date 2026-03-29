"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Lightbulb,
  Mail,
  Phone,
  MapPin,
  Calculator,
  BookOpen,
  FlaskConical,
  Globe,
  SpellCheck,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FOOTER LINKLERI                                                    */
/* ------------------------------------------------------------------ */

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Platform",
    links: [
      { title: "Nasıl Çalışır?", href: "#nasil-calisir" },
      { title: "Oyunlar", href: "/games" },
      { title: "Liderlik Tablosu", href: "/leaderboard?scope=turkiye" },
      { title: "Fiyatlandırma", href: "#fiyatlandirma" },
      { title: "Öğretmenler İçin", href: "#ogretmenler" },
    ],
  },
  {
    label: "Dersler",
    links: [
      { title: "Türkçe", href: "/games?subject=turkce", icon: BookOpen },
      { title: "Matematik", href: "/games?subject=matematik", icon: Calculator },
      { title: "Fen Bilimleri", href: "/games?subject=fen", icon: FlaskConical },
      { title: "Sosyal Bilgiler", href: "/games?subject=sosyal", icon: Globe },
      { title: "İngilizce", href: "/games?subject=ingilizce", icon: SpellCheck },
    ],
  },
  {
    label: "Kurumsal",
    links: [
      { title: "Hakkımızda", href: "#hakkimizda" },
      { title: "Gizlilik Politikası", href: "#gizlilik" },
      { title: "KVKK", href: "#kvkk" },
      { title: "Kullanım Koşulları", href: "#kosullar" },
      { title: "SSS", href: "#sss" },
    ],
  },
  {
    label: "Sosyal Medya",
    links: [
      { title: "Instagram", href: "#", icon: ExternalLink },
      { title: "YouTube", href: "#", icon: ExternalLink },
      { title: "Twitter / X", href: "#", icon: ExternalLink },
      { title: "Facebook", href: "#", icon: ExternalLink },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMASYON                                                          */
/* ------------------------------------------------------------------ */

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="relative w-full border-t bg-[#042940]">
      {/* Üst gradyan çizgi */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9FC131]/40 to-transparent" />

      <div className="container py-12 lg:py-16">
        <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">
          {/* Sol — Logo & Açıklama */}
          <AnimatedContainer className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Lightbulb className="h-8 w-8 text-[#DBF227]" />
              <div>
                <span className="text-xl font-extrabold text-white">LUMO</span>
                <p className="text-[10px] font-normal leading-tight text-white/40">
                  Eğitsel Oyun Platformu
                </p>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              MEB müfredatına uygun eğitsel oyunlarla çocuklarınız eğlenirken öğrensin.
              1-8. sınıf öğrencileri için tasarlandı.
            </p>

            {/* İletişim bilgileri */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Mail className="h-3.5 w-3.5" />
                <span>info@lumo.com.tr</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Phone className="h-3.5 w-3.5" />
                <span>0850 123 45 67</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <MapPin className="h-3.5 w-3.5" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </AnimatedContainer>

          {/* Sağ — Link kolonları */}
          <div className="mt-4 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
              <AnimatedContainer
                key={section.label}
                delay={0.1 + index * 0.1}
              >
                <div className="mb-10 md:mb-0">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/70">
                    {section.label}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center text-white/40 transition-all duration-300 hover:text-[#DBF227]"
                        >
                          {link.icon && (
                            <link.icon className="mr-1.5 h-3.5 w-3.5" />
                          )}
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Alt kısım — Copyright & badge'ler */}
        <AnimatedContainer delay={0.5}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} LUMO. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-[#9FC131]" />
                <span className="text-[10px] font-medium text-white/50">
                  KVKK Uyumlu
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-[#DBF227]" />
                <span className="text-[10px] font-medium text-white/50">
                  Reklamsız
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-[#005C53]" />
                <span className="text-[10px] font-medium text-white/50">
                  MEB Uyumlu
                </span>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </footer>
  );
}
