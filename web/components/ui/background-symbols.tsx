"use client";

import { useEffect, useState } from "react";

/* ================================================================== */
/*  SVG CIZIMLERI                                                      */
/* ================================================================== */

// ── MATEMATIK ──

const PieChartSvg = () => (
  <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
    <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M30 30 L30 6 A24 24 0 0 1 51 42 Z" fill="currentColor" opacity="0.12" />
    <path d="M30 30 L51 42 A24 24 0 0 1 12 46 Z" fill="currentColor" opacity="0.06" />
    <line x1="30" y1="30" x2="30" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="30" y1="30" x2="51" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="30" y1="30" x2="12" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

const BarChartSvg = () => (
  <svg viewBox="0 0 70 60" fill="none" className="w-full h-full">
    <line x1="10" y1="52" x2="65" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="10" y1="52" x2="10" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <rect x="16" y="30" width="8" height="22" fill="currentColor" opacity="0.15" rx="1" />
    <rect x="28" y="18" width="8" height="34" fill="currentColor" opacity="0.2" rx="1" />
    <rect x="40" y="25" width="8" height="27" fill="currentColor" opacity="0.12" rx="1" />
    <rect x="52" y="12" width="8" height="40" fill="currentColor" opacity="0.18" rx="1" />
  </svg>
);

const SqrtSvg = () => (
  <svg viewBox="0 0 60 50" fill="none" className="w-full h-full">
    <path d="M5 30 L12 28 L22 45 L30 8 L55 8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="33" y="7" fontSize="10" fill="currentColor" opacity="0.4" fontFamily="Nunito" fontWeight="700">25</text>
  </svg>
);

const FractionSvg = () => (
  <svg viewBox="0 0 40 60" fill="none" className="w-full h-full">
    <text x="14" y="22" fontSize="18" fill="currentColor" opacity="0.5" fontFamily="Nunito" fontWeight="700">3</text>
    <line x1="8" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <text x="14" y="50" fontSize="18" fill="currentColor" opacity="0.5" fontFamily="Nunito" fontWeight="700">4</text>
  </svg>
);

const ExponentSvg = () => (
  <svg viewBox="0 0 50 40" fill="none" className="w-full h-full">
    <text x="5" y="35" fontSize="24" fill="currentColor" opacity="0.5" fontFamily="Nunito" fontWeight="700">2</text>
    <text x="26" y="20" fontSize="14" fill="currentColor" opacity="0.5" fontFamily="Nunito" fontWeight="700">5</text>
  </svg>
);

const TriangleSvg = () => (
  <svg viewBox="0 0 60 55" fill="none" className="w-full h-full">
    <polygon points="30,5 55,50 5,50" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.06" />
    <text x="24" y="44" fontSize="8" fill="currentColor" opacity="0.4" fontFamily="Nunito">90°</text>
    <line x1="5" y1="50" x2="5" y2="43" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="5" y1="50" x2="12" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

const CompassSvg = () => (
  <svg viewBox="0 0 60 70" fill="none" className="w-full h-full">
    <circle cx="30" cy="8" r="3" fill="currentColor" opacity="0.3" />
    <line x1="30" y1="11" x2="20" y2="65" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <line x1="30" y1="11" x2="45" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M20 65 Q30 55 45 60" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
  </svg>
);

const AngleSvg = () => (
  <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
    <line x1="5" y1="45" x2="45" y2="45" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="5" y1="45" x2="35" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <path d="M15 45 A10 10 0 0 1 12 38" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
    <text x="16" y="42" fontSize="8" fill="currentColor" opacity="0.4" fontFamily="Nunito">45°</text>
  </svg>
);

// ── FIZIK ──

const AtomSvg = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.6" />
    <ellipse cx="40" cy="40" rx="30" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <ellipse cx="40" cy="40" rx="30" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(60 40 40)" />
    <ellipse cx="40" cy="40" rx="30" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(120 40 40)" />
    <circle cx="70" cy="40" r="2.5" fill="currentColor" opacity="0.5" />
    <circle cx="25" cy="26" r="2.5" fill="currentColor" opacity="0.5" />
    <circle cx="25" cy="54" r="2.5" fill="currentColor" opacity="0.5" />
  </svg>
);

const CircuitSvg = () => (
  <svg viewBox="0 0 90 60" fill="none" className="w-full h-full">
    <rect x="5" y="10" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="15" y1="10" x2="15" y2="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="10" y1="4" x2="20" y2="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <line x1="12" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="70" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="67" y1="13" x2="73" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="67" y1="7" x2="73" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="40" cy="50" r="2" fill="currentColor" opacity="0.5" />
    <line x1="42" y1="50" x2="55" y2="43" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const MagnetSvg = () => (
  <svg viewBox="0 0 50 60" fill="none" className="w-full h-full">
    <path d="M10 25 L10 45 A15 15 0 0 0 40 45 L40 25" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
    <rect x="5" y="15" width="15" height="12" fill="currentColor" opacity="0.15" rx="2" />
    <rect x="30" y="15" width="15" height="12" fill="currentColor" opacity="0.1" rx="2" />
    <text x="9" y="24" fontSize="7" fill="currentColor" opacity="0.5" fontFamily="Nunito" fontWeight="700">N</text>
    <text x="34" y="24" fontSize="7" fill="currentColor" opacity="0.5" fontFamily="Nunito" fontWeight="700">S</text>
  </svg>
);

const LensSvg = () => (
  <svg viewBox="0 0 80 50" fill="none" className="w-full h-full">
    <path d="M35 5 Q25 25, 35 45" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M45 5 Q55 25, 45 45" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
    <line x1="5" y1="25" x2="75" y2="25" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
    <line x1="5" y1="10" x2="40" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="40" y1="25" x2="75" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="60" cy="25" r="2" fill="currentColor" opacity="0.4" />
  </svg>
);

// ── KIMYA ──

const TestTubeSvg = () => (
  <svg viewBox="0 0 30 70" fill="none" className="w-full h-full">
    <path d="M10 10 L10 50 A5 5 0 0 0 20 50 L20 10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="7" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <rect x="10" y="38" width="10" height="15" rx="0" fill="currentColor" opacity="0.08" />
    <circle cx="13" cy="44" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="17" cy="48" r="1" fill="currentColor" opacity="0.2" />
  </svg>
);

const BeakerSvg = () => (
  <svg viewBox="0 0 50 60" fill="none" className="w-full h-full">
    <path d="M10 8 L10 45 Q10 52 17 52 L33 52 Q40 52 40 45 L40 8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="8" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <rect x="10" y="32" width="30" height="18" fill="currentColor" opacity="0.06" />
    <line x1="7" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="7" y1="30" x2="10" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="7" y1="40" x2="10" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

// ── BIYOLOJI ──

const DnaSvg = () => (
  <svg viewBox="0 0 40 100" fill="none" className="w-full h-full">
    <path d="M10 5 C10 20, 30 20, 30 35 C30 50, 10 50, 10 65 C10 80, 30 80, 30 95" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M30 5 C30 20, 10 20, 10 35 C10 50, 30 50, 30 65 C30 80, 10 80, 10 95" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    {[12, 27, 42, 57, 72, 87].map((y) => (
      <line key={y} x1="14" y1={y} x2="26" y2={y} stroke="currentColor" strokeWidth="1" opacity="0.3" />
    ))}
  </svg>
);

const MicrobeSvg = () => (
  <svg viewBox="0 0 70 70" fill="none" className="w-full h-full">
    <ellipse cx="35" cy="38" rx="18" ry="15" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="28" cy="35" r="2.5" fill="currentColor" opacity="0.4" />
    <circle cx="40" cy="33" r="2" fill="currentColor" opacity="0.4" />
    <path d="M20 28 C12 20, 8 25, 5 18" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M50 30 C58 24, 62 28, 65 22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M30 52 C28 60, 24 58, 22 65" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M42 52 C44 58, 48 56, 50 62" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M35 22 C34 14, 38 12, 36 6" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
  </svg>
);

const CellSvg = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <ellipse cx="40" cy="40" rx="32" ry="28" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="38" cy="38" rx="12" ry="10" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
    <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.2" />
    <ellipse cx="58" cy="32" rx="5" ry="3" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" transform="rotate(-20 58 32)" />
    <ellipse cx="22" cy="50" rx="4" ry="2.5" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
    <circle cx="52" cy="52" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M55 42 C58 40, 62 42, 60 45 C58 48, 54 46, 55 42" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.2" />
  </svg>
);

const FoodPyramidSvg = () => (
  <svg viewBox="0 0 80 70" fill="none" className="w-full h-full">
    <polygon points="40,5 75,65 5,65" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="18" y1="45" x2="62" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="26" y1="30" x2="54" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="33" y1="18" x2="47" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="40" cy="55" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="33" cy="55" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="55" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="30" cy="55" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="50" cy="55" r="1.5" fill="currentColor" opacity="0.2" />
  </svg>
);

const LeafSvg = () => (
  <svg viewBox="0 0 50 60" fill="none" className="w-full h-full">
    <path d="M25 55 C25 40, 10 30, 15 15 Q20 5, 35 10 C45 15, 40 35, 25 55Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1.5" />
    <path d="M25 55 C25 40, 22 30, 22 15" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
    <path d="M22 25 C18 22, 16 20, 16 18" stroke="currentColor" strokeWidth="0.7" opacity="0.25" fill="none" />
    <path d="M23 35 C19 33, 17 30, 16 27" stroke="currentColor" strokeWidth="0.7" opacity="0.25" fill="none" />
    <path d="M24 30 C28 27, 32 25, 34 22" stroke="currentColor" strokeWidth="0.7" opacity="0.25" fill="none" />
  </svg>
);

// ── COGRAFYA ──

const GlobeSvg = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.5" />
    {/* Meridyenler */}
    <ellipse cx="50" cy="50" rx="20" ry="40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" />
    <ellipse cx="50" cy="50" rx="8" ry="40" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
    <ellipse cx="50" cy="50" rx="33" ry="40" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.2" />
    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    {/* Paraleller */}
    <ellipse cx="50" cy="28" rx="37" ry="6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" />
    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
    <ellipse cx="50" cy="72" rx="37" ry="6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" />
    <ellipse cx="50" cy="38" rx="39" ry="4" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.2" />
    <ellipse cx="50" cy="62" rx="39" ry="4" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Kutup daireleri */}
    <ellipse cx="50" cy="20" rx="22" ry="3" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.15" strokeDasharray="3 2" />
    <ellipse cx="50" cy="80" rx="22" ry="3" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.15" strokeDasharray="3 2" />
  </svg>
);

const TurkeySvg = () => (
  <svg viewBox="0 0 120 60" fill="none" className="w-full h-full">
    <path
      d="M10 35 C12 30, 18 28, 22 25 C26 22, 30 20, 38 18 C42 17, 48 16, 55 15 C60 14, 68 14, 75 16 C80 18, 85 20, 90 22 C95 24, 100 28, 105 30 C108 32, 110 35, 108 38 C105 40, 100 42, 95 43 C90 44, 85 45, 78 44 C72 43, 68 44, 62 45 C56 46, 50 46, 44 45 C38 44, 32 42, 26 40 C20 38, 15 38, 10 35Z"
      stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.06"
    />
    <circle cx="33" cy="33" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="55" cy="30" r="1.2" fill="currentColor" opacity="0.3" />
    <circle cx="80" cy="28" r="1" fill="currentColor" opacity="0.3" />
  </svg>
);

const MountainSvg = () => (
  <svg viewBox="0 0 80 50" fill="none" className="w-full h-full">
    <polygon points="5,48 25,12 40,30 55,8 75,48" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.05" />
    <polygon points="50,18 55,8 60,18" fill="currentColor" opacity="0.1" />
    <line x1="5" y1="48" x2="75" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

// ── TARIH ──

const AtaturkSignSvg = () => (
  <svg viewBox="0 0 120 50" fill="none" className="w-full h-full">
    <path d="M10 35 C15 20, 25 15, 30 20 C35 25, 28 35, 35 30 C42 25, 40 15, 50 18 C55 20, 52 30, 58 25 L65 20 C68 18, 72 22, 70 28 L68 35" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M72 18 C78 15, 85 14, 90 16 C95 18, 92 25, 88 22 L95 20 C100 18, 105 22, 110 20" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round" />
    <line x1="5" y1="40" x2="115" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
  </svg>
);

const TugraSvg = () => (
  <svg viewBox="0 0 80 90" fill="none" className="w-full h-full">
    <path d="M25 70 C20 55, 15 40, 20 30 C25 20, 35 15, 40 20 C45 25, 38 35, 45 30 C52 25, 55 15, 60 20 C65 25, 58 40, 55 50" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round" />
    <line x1="42" y1="15" x2="44" y2="5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <line x1="48" y1="14" x2="50" y2="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <line x1="54" y1="16" x2="55" y2="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <path d="M20 72 C30 68, 50 68, 60 72" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
  </svg>
);

const HittiteSvg = () => (
  <svg viewBox="0 0 70 70" fill="none" className="w-full h-full">
    <circle cx="35" cy="35" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <circle cx="35" cy="35" r="6" fill="currentColor" opacity="0.15" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <line key={angle} x1={35 + Math.cos(rad) * 14} y1={35 + Math.sin(rad) * 14} x2={35 + Math.cos(rad) * 24} y2={35 + Math.sin(rad) * 24} stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      );
    })}
    <path d="M35 11 C33 5, 28 2, 25 5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
    <path d="M35 11 C37 5, 42 2, 45 5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
  </svg>
);

const ColumnsSvg = () => (
  <svg viewBox="0 0 70 60" fill="none" className="w-full h-full">
    <rect x="5" y="5" width="60" height="6" rx="1" fill="currentColor" opacity="0.12" />
    <rect x="10" y="11" width="5" height="38" fill="currentColor" opacity="0.1" />
    <rect x="25" y="11" width="5" height="38" fill="currentColor" opacity="0.1" />
    <rect x="40" y="11" width="5" height="38" fill="currentColor" opacity="0.1" />
    <rect x="55" y="11" width="5" height="38" fill="currentColor" opacity="0.1" />
    <rect x="3" y="49" width="64" height="5" rx="1" fill="currentColor" opacity="0.12" />
  </svg>
);

const ScrollSvg = () => (
  <svg viewBox="0 0 50 60" fill="none" className="w-full h-full">
    <path d="M12 8 C8 8, 8 14, 12 14 L38 14 C42 14, 42 8, 38 8" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <rect x="12" y="11" width="26" height="38" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="1.2" />
    <path d="M12 49 C8 49, 8 55, 12 55 L38 55 C42 55, 42 49, 38 49" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
    <line x1="17" y1="20" x2="33" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="17" y1="26" x2="30" y2="26" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="17" y1="32" x2="33" y2="32" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="17" y1="38" x2="28" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
  </svg>
);

/* ================================================================== */
/*  SEMBOL LISTESI                                                     */
/* ================================================================== */

type SymbolItem = {
  type: "text" | "svg";
  content?: string;
  Component?: React.FC;
  weight?: number; // daha sik cikma agirligi (varsayilan 1)
};

const allSymbols: SymbolItem[] = [
  // Matematik - metin (cok cesit)
  { type: "text", content: "+" },
  { type: "text", content: "+" },
  { type: "text", content: "\u2212" },
  { type: "text", content: "\u2212" },
  { type: "text", content: "\u00D7" },
  { type: "text", content: "\u00D7" },
  { type: "text", content: "\u00F7" },
  { type: "text", content: "\u00F7" },
  { type: "text", content: "=" },
  { type: "text", content: "=" },
  { type: "text", content: "<" },
  { type: "text", content: ">" },
  { type: "text", content: "\u2264" },
  { type: "text", content: "\u2265" },
  { type: "text", content: "x\u00B2" },
  { type: "text", content: "y\u00B3" },
  { type: "text", content: "\u03C0" },
  { type: "text", content: "\u221E" },
  { type: "text", content: "%" },
  { type: "text", content: "\u0394" },
  { type: "text", content: "2n" },
  { type: "text", content: "3x" },
  { type: "text", content: "a+b" },
  // Matematik - SVG
  { type: "svg", Component: PieChartSvg },
  { type: "svg", Component: PieChartSvg },
  { type: "svg", Component: BarChartSvg },
  { type: "svg", Component: BarChartSvg },
  { type: "svg", Component: SqrtSvg },
  { type: "svg", Component: SqrtSvg },
  { type: "svg", Component: FractionSvg },
  { type: "svg", Component: FractionSvg },
  { type: "svg", Component: ExponentSvg },
  { type: "svg", Component: TriangleSvg },
  { type: "svg", Component: CompassSvg },
  { type: "svg", Component: AngleSvg },
  // Fizik
  { type: "svg", Component: CircuitSvg },
  { type: "svg", Component: CircuitSvg },
  { type: "svg", Component: AtomSvg },
  { type: "svg", Component: AtomSvg },
  { type: "svg", Component: AtomSvg },
  { type: "svg", Component: MagnetSvg },
  { type: "svg", Component: LensSvg },
  // Kimya
  { type: "text", content: "H\u2082O" },
  { type: "text", content: "H\u2082O" },
  { type: "text", content: "pH" },
  { type: "text", content: "pH" },
  { type: "text", content: "CO\u2082" },
  { type: "text", content: "O\u2082" },
  { type: "text", content: "NaCl" },
  { type: "svg", Component: TestTubeSvg },
  { type: "svg", Component: TestTubeSvg },
  { type: "svg", Component: BeakerSvg },
  // Biyoloji
  { type: "svg", Component: MicrobeSvg },
  { type: "svg", Component: MicrobeSvg },
  { type: "svg", Component: MicrobeSvg },
  { type: "svg", Component: DnaSvg },
  { type: "svg", Component: DnaSvg },
  { type: "svg", Component: DnaSvg },
  { type: "svg", Component: CellSvg },
  { type: "svg", Component: CellSvg },
  { type: "svg", Component: FoodPyramidSvg },
  { type: "svg", Component: FoodPyramidSvg },
  { type: "svg", Component: LeafSvg },
  // Cografya - DUNYA EN COK
  { type: "svg", Component: GlobeSvg },
  { type: "svg", Component: GlobeSvg },
  { type: "svg", Component: GlobeSvg },
  { type: "svg", Component: GlobeSvg },
  { type: "svg", Component: GlobeSvg },
  { type: "svg", Component: TurkeySvg },
  { type: "svg", Component: TurkeySvg },
  { type: "svg", Component: TurkeySvg },
  { type: "svg", Component: MountainSvg },
  // Tarih
  { type: "svg", Component: AtaturkSignSvg },
  { type: "svg", Component: AtaturkSignSvg },
  { type: "svg", Component: TugraSvg },
  { type: "svg", Component: TugraSvg },
  { type: "svg", Component: HittiteSvg },
  { type: "svg", Component: HittiteSvg },
  { type: "svg", Component: ColumnsSvg },
  { type: "svg", Component: ScrollSvg },
];

/* ================================================================== */
/*  YERLESIM                                                           */
/* ================================================================== */

function rand() {
  return Math.random();
}

const BLOCK_COUNT = 14;
const ITEMS_PER_BLOCK = 40;

type PlacedItem = {
  symbol: SymbolItem;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  parallax: number;
  floatDuration: number;
  floatDelay: number;
  floatDistance: number;
  key: string;
};

function generateBlocks(): PlacedItem[][] {
  const blocks: PlacedItem[][] = [];

  for (let b = 0; b < BLOCK_COUNT; b++) {
    const blockItems: PlacedItem[] = [];
    for (let i = 0; i < ITEMS_PER_BLOCK; i++) {
      const idx = Math.floor(rand() * allSymbols.length);
      const symbol = allSymbols[idx];

      const isSvg = symbol.type === "svg";
      const baseSize = isSvg ? 60 : 20;
      const sizeRange = isSvg ? 120 : 36;
      const isGlobe = symbol.Component === GlobeSvg;
      const isTurkey = symbol.Component === TurkeySvg;
      const isAtaturk = symbol.Component === AtaturkSignSvg;
      const extraSize = isGlobe ? 60 : (isTurkey || isAtaturk) ? 30 : 0;

      blockItems.push({
        symbol,
        x: rand() * 90 + 5,
        y: rand() * 86 + 7,
        size: baseSize + Math.floor(rand() * sizeRange) + extraSize,
        opacity: 0.04 + rand() * 0.06,
        rotation: Math.floor(rand() * 30) - 15,
        parallax: rand() > 0.3 ? 0.02 + rand() * 0.05 : 0,
        floatDuration: 4 + rand() * 6,
        floatDelay: rand() * -10,
        floatDistance: 6 + Math.floor(rand() * 12),
        key: `${b}-${i}`,
      });
    }
    blocks.push(blockItems);
  }
  return blocks;
}

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */

export function BackgroundSymbols() {
  const [blocks] = useState(() => generateBlocks());
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
          style={{ top: `${bIdx * 100}vh`, height: "100vh" }}
        >
          {blockItems.map((el) => {
            const offsetY = el.parallax > 0 ? scrollY * el.parallax : 0;
            // 8 farkli ucusma varyasyonu arasinda dagit
            const floatVariant = Math.floor(Math.abs(Math.sin(parseInt(el.key.replace("-", "")) * 7 + 3)) * 8);
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
                  color: "#042940",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  lineHeight: 1,
                  transform: `rotate(${el.rotation}deg) translateY(${-offsetY}px)`,
                  animation: `float-${floatVariant} ${el.floatDuration}s ease-in-out ${el.floatDelay}s infinite alternate`,
                  willChange: el.parallax > 0 ? "transform" : undefined,
                }}
              >
                {el.symbol.type === "text" ? el.symbol.content : el.symbol.Component ? <el.symbol.Component /> : null}
              </div>
            );
          })}
        </div>
      ))}

      <style jsx>{`
        @keyframes float-0 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(4px, -10px) rotate(2deg); }
        }
        @keyframes float-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-5px, -14px) rotate(-2deg); }
        }
        @keyframes float-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(8px, -8px) rotate(3deg); }
        }
        @keyframes float-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-3px, -16px) rotate(-1deg); }
        }
        @keyframes float-4 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(6px, -12px) rotate(1deg); }
        }
        @keyframes float-5 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-7px, -6px) rotate(-3deg); }
        }
        @keyframes float-6 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(3px, -18px) rotate(2deg); }
        }
        @keyframes float-7 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-4px, -11px) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
}
