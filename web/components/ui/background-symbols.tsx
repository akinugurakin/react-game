"use client";

import { useEffect, useState } from "react";

/**
 * Arka planda rastgele dagilan egitim sembolleri ve SVG cizimleri.
 * Scroll ile birlikte bazi elemanlar hafifce hareket eder (parallax).
 */

/* ------------------------------------------------------------------ */
/*  SVG CIZIMLERI                                                      */
/* ------------------------------------------------------------------ */

// Atom cizimi
const AtomSvg = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.6" />
    <ellipse cx="40" cy="40" rx="30" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <ellipse cx="40" cy="40" rx="30" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(60 40 40)" />
    <ellipse cx="40" cy="40" rx="30" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(120 40 40)" />
    <circle cx="70" cy="40" r="2.5" fill="currentColor" opacity="0.5" />
    <circle cx="25" cy="26" r="2.5" fill="currentColor" opacity="0.5" />
    <circle cx="25" cy="54" r="2.5" fill="currentColor" opacity="0.5" />
  </svg>
);

// Elektrik devresi
const CircuitSvg = () => (
  <svg viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="10" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    {/* Pil */}
    <line x1="15" y1="10" x2="15" y2="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="10" y1="4" x2="20" y2="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <line x1="12" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    {/* Ampul */}
    <circle cx="70" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="67" y1="13" x2="73" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="67" y1="7" x2="73" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* Anahtar */}
    <circle cx="40" cy="50" r="2" fill="currentColor" opacity="0.5" />
    <line x1="42" y1="50" x2="55" y2="43" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

// DNA sarmali
const DnaSvg = () => (
  <svg viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M10 5 C10 20, 30 20, 30 35 C30 50, 10 50, 10 65 C10 80, 30 80, 30 95" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M30 5 C30 20, 10 20, 10 35 C10 50, 30 50, 30 65 C30 80, 10 80, 10 95" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    {/* Basamaklar */}
    <line x1="14" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="11" y1="27" x2="29" y2="27" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="42" x2="26" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="11" y1="57" x2="29" y2="57" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="72" x2="26" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="11" y1="87" x2="29" y2="87" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

// Mikrop cizimi
const MicrobeSvg = () => (
  <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="35" cy="38" rx="18" ry="15" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="28" cy="35" r="2.5" fill="currentColor" opacity="0.4" />
    <circle cx="40" cy="33" r="2" fill="currentColor" opacity="0.4" />
    {/* Kamcilar */}
    <path d="M20 28 C12 20, 8 25, 5 18" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M50 30 C58 24, 62 28, 65 22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M30 52 C28 60, 24 58, 22 65" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M42 52 C44 58, 48 56, 50 62" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M35 22 C34 14, 38 12, 36 6" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
  </svg>
);

// Hucre gorseli
const CellSvg = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="40" cy="40" rx="32" ry="28" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
    {/* Cekirdek */}
    <ellipse cx="38" cy="38" rx="12" ry="10" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
    <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.2" />
    {/* Organeller */}
    <ellipse cx="58" cy="32" rx="5" ry="3" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" transform="rotate(-20 58 32)" />
    <ellipse cx="22" cy="50" rx="4" ry="2.5" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
    <circle cx="52" cy="52" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
    <circle cx="28" cy="30" r="2" fill="currentColor" opacity="0.15" />
  </svg>
);

// Besin piramidi
const FoodPyramidSvg = () => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="40,5 75,65 5,65" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="18" y1="45" x2="62" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="26" y1="30" x2="54" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="33" y1="18" x2="47" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Kucuk ikonlar */}
    <circle cx="40" cy="55" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="33" cy="55" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="55" r="2" fill="currentColor" opacity="0.3" />
    <rect x="36" y="35" width="8" height="5" rx="1" fill="currentColor" opacity="0.2" />
  </svg>
);

// Dunya + paralel meridyenler
const GlobeSvg = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    {/* Meridyenler */}
    <ellipse cx="40" cy="40" rx="15" ry="30" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
    <ellipse cx="40" cy="40" rx="7" ry="30" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.2" />
    {/* Paraleller */}
    <ellipse cx="40" cy="25" rx="28" ry="5" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
    <line x1="10" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <ellipse cx="40" cy="55" rx="28" ry="5" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
  </svg>
);

// Turkiye haritasi taslak
const TurkeySvg = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M10 35 C12 30, 18 28, 22 25 C26 22, 30 20, 38 18 C42 17, 48 16, 55 15 C60 14, 68 14, 75 16 C80 18, 85 20, 90 22 C95 24, 100 28, 105 30 C108 32, 110 35, 108 38 C105 40, 100 42, 95 43 C90 44, 85 45, 78 44 C72 43, 68 44, 62 45 C56 46, 50 46, 44 45 C38 44, 32 42, 26 40 C20 38, 15 38, 10 35Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      opacity="0.08"
    />
    <circle cx="45" cy="32" r="1.5" fill="currentColor" opacity="0.3" />
  </svg>
);

// Ataturk imzasi (stilize)
const AtaturkSignSvg = () => (
  <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M10 35 C15 20, 25 15, 30 20 C35 25, 28 35, 35 30 C42 25, 40 15, 50 18 C55 20, 52 30, 58 25 L65 20 C68 18, 72 22, 70 28 L68 35"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      opacity="0.5"
      strokeLinecap="round"
    />
    <path
      d="M72 18 C78 15, 85 14, 90 16 C95 18, 92 25, 88 22 L95 20 C100 18, 105 22, 110 20"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      opacity="0.5"
      strokeLinecap="round"
    />
    <line x1="5" y1="40" x2="115" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
  </svg>
);

// Osmanli tugrasi (stilize)
const TugraSvg = () => (
  <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M25 70 C20 55, 15 40, 20 30 C25 20, 35 15, 40 20 C45 25, 38 35, 45 30 C52 25, 55 15, 60 20 C65 25, 58 40, 55 50"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      opacity="0.5"
      strokeLinecap="round"
    />
    {/* Dikey cizgiler */}
    <line x1="42" y1="15" x2="44" y2="5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <line x1="48" y1="14" x2="50" y2="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <line x1="54" y1="16" x2="55" y2="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    {/* Alt kaidesi */}
    <path
      d="M20 72 C30 68, 50 68, 60 72"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.4"
      strokeLinecap="round"
    />
  </svg>
);

// Hitit gunes kursu (eti simgesi)
const HittiteSvg = () => (
  <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="35" cy="35" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <circle cx="35" cy="35" r="6" fill="currentColor" opacity="0.15" />
    {/* Isinlar */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 35 + Math.cos(rad) * 14;
      const y1 = 35 + Math.sin(rad) * 14;
      const x2 = 35 + Math.cos(rad) * 24;
      const y2 = 35 + Math.sin(rad) * 24;
      return (
        <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      );
    })}
    {/* Geyik boynuzlari */}
    <path d="M35 11 C33 5, 28 2, 25 5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
    <path d="M35 11 C37 5, 42 2, 45 5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// Daire grafigi
const PieChartSvg = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M30 30 L30 6 A24 24 0 0 1 51 42 Z" fill="currentColor" opacity="0.12" />
    <path d="M30 30 L51 42 A24 24 0 0 1 12 46 Z" fill="currentColor" opacity="0.06" />
    <line x1="30" y1="30" x2="30" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="30" y1="30" x2="51" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="30" y1="30" x2="12" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

// Sutun grafigi
const BarChartSvg = () => (
  <svg viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="10" y1="52" x2="65" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="10" y1="52" x2="10" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <rect x="16" y="30" width="8" height="22" fill="currentColor" opacity="0.15" rx="1" />
    <rect x="28" y="18" width="8" height="34" fill="currentColor" opacity="0.2" rx="1" />
    <rect x="40" y="25" width="8" height="27" fill="currentColor" opacity="0.12" rx="1" />
    <rect x="52" y="12" width="8" height="40" fill="currentColor" opacity="0.18" rx="1" />
  </svg>
);

// Karekok sembol
const SqrtSvg = () => (
  <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 30 L12 28 L22 45 L30 8 L55 8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="33" y="7" fontSize="10" fill="currentColor" opacity="0.4" fontFamily="Nunito" fontWeight="700">25</text>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  SEMBOL LISTESI                                                     */
/* ------------------------------------------------------------------ */

type SymbolItem = {
  type: "text" | "svg";
  content?: string;
  Component?: React.FC;
};

const allSymbols: SymbolItem[] = [
  // Matematik - metin
  { type: "text", content: "+" },
  { type: "text", content: "\u2212" },
  { type: "text", content: "\u00D7" },
  { type: "text", content: "\u00F7" },
  { type: "text", content: "=" },
  { type: "text", content: "<" },
  { type: "text", content: ">" },
  { type: "text", content: "x\u00B2" },
  { type: "text", content: "y\u00B3" },
  { type: "text", content: "\u00BD" },
  { type: "text", content: "\u00BE" },
  { type: "text", content: "\u2153" },
  // Matematik - SVG
  { type: "svg", Component: PieChartSvg },
  { type: "svg", Component: BarChartSvg },
  { type: "svg", Component: SqrtSvg },
  // Fizik
  { type: "svg", Component: CircuitSvg },
  { type: "svg", Component: AtomSvg },
  // Kimya
  { type: "text", content: "H\u2082O" },
  { type: "text", content: "pH" },
  // Biyoloji
  { type: "svg", Component: MicrobeSvg },
  { type: "svg", Component: DnaSvg },
  { type: "svg", Component: CellSvg },
  { type: "svg", Component: FoodPyramidSvg },
  // Cografya
  { type: "svg", Component: GlobeSvg },
  { type: "svg", Component: TurkeySvg },
  // Tarih
  { type: "svg", Component: AtaturkSignSvg },
  { type: "svg", Component: TugraSvg },
  { type: "svg", Component: HittiteSvg },
];

/* ------------------------------------------------------------------ */
/*  YERLESIM                                                           */
/* ------------------------------------------------------------------ */

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const BLOCK_COUNT = 12;
const ITEMS_PER_BLOCK = 22;

type PlacedItem = {
  symbol: SymbolItem;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  parallax: number; // 0 = sabit, 0.02-0.06 = hafif hareket
  key: string;
};

function generateBlocks(): PlacedItem[][] {
  const blocks: PlacedItem[][] = [];

  for (let b = 0; b < BLOCK_COUNT; b++) {
    const blockItems: PlacedItem[] = [];
    for (let i = 0; i < ITEMS_PER_BLOCK; i++) {
      const seed = b * 1000 + i;
      const idx = Math.floor(seededRandom(seed * 13 + 7) * allSymbols.length);
      const symbol = allSymbols[idx];

      const isSvg = symbol.type === "svg";
      const baseSize = isSvg ? 40 : 18;
      const sizeRange = isSvg ? 50 : 28;

      blockItems.push({
        symbol,
        x: seededRandom(seed * 17 + 3) * 92 + 4,
        y: seededRandom(seed * 23 + 11) * 88 + 6,
        size: baseSize + Math.floor(seededRandom(seed * 31 + 5) * sizeRange),
        opacity: 0.03 + seededRandom(seed * 37 + 19) * 0.05,
        rotation: Math.floor(seededRandom(seed * 41 + 29) * 40) - 20,
        parallax: seededRandom(seed * 47 + 31) > 0.5 ? 0.02 + seededRandom(seed * 53 + 37) * 0.04 : 0,
        key: `${b}-${i}`,
      });
    }
    blocks.push(blockItems);
  }
  return blocks;
}

const blocks = generateBlocks();

export function BackgroundSymbols() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: `${BLOCK_COUNT * 100}vh` }}
      aria-hidden="true"
    >
      {blocks.map((blockItems, bIdx) => (
        <div
          key={bIdx}
          className="absolute inset-x-0"
          style={{
            top: `${bIdx * 100}vh`,
            height: "100vh",
          }}
        >
          {blockItems.map((el) => {
            const offsetY = el.parallax > 0 ? scrollY * el.parallax : 0;

            return (
              <div
                key={el.key}
                className="absolute select-none"
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  width: el.symbol.type === "svg" ? `${el.size}px` : undefined,
                  height: el.symbol.type === "svg" ? `${el.size}px` : undefined,
                  fontSize: el.symbol.type === "text" ? `${el.size}px` : undefined,
                  opacity: el.opacity,
                  transform: `rotate(${el.rotation}deg) translateY(${-offsetY}px)`,
                  color: "#042940",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  lineHeight: 1,
                  willChange: el.parallax > 0 ? "transform" : undefined,
                }}
              >
                {el.symbol.type === "text" ? (
                  el.symbol.content
                ) : el.symbol.Component ? (
                  <el.symbol.Component />
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
