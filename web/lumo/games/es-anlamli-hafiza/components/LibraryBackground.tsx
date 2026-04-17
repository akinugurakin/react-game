"use client";

import React, { useMemo } from "react";

/** Kütüphane/sözlük atmosferi — kitap ve ansiklopedi siluetleri, yüzen harfler, ızgara çizgiler */
export function LibraryBackground() {
  const floaters = useMemo(
    () =>
      ["A", "B", "C", "D", "E", "F", "G", "H", "İ", "K", "L", "M",
       "N", "O", "P", "R", "S", "T", "U", "V", "Y", "Z", "Ş", "Ğ"].map((ch, i) => ({
        id: i,
        char: ch,
        left: Math.random() * 100,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 12,
        opacity: 0.06 + Math.random() * 0.1,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sıcak degrade arka plan */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 10%, rgba(219,242,39,0.12) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 85% 90%, rgba(0,92,83,0.10) 0%, transparent 50%), " +
            "linear-gradient(160deg, #fdfaf4 0%, #f4faf9 60%, #f0f8f6 100%)",
        }}
      />

      {/* Izgara çizgiler — kütüphane defter çizgisi etkisi */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.045,
          backgroundImage:
            "linear-gradient(#042940 1px, transparent 1px), linear-gradient(90deg, #042940 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />


      {/* Sağ alt: açık kitap */}
      <svg className="absolute bottom-6 right-6 opacity-20" width="160" height="110" viewBox="0 0 160 110" fill="none">
        {/* Sol sayfa */}
        <path d="M10 15 Q10 10 16 10 L78 10 L78 95 Q50 88 16 95 Q10 95 10 88 Z" fill="#f5f0e8" stroke="#005C53" strokeWidth="2" />
        {/* Sağ sayfa */}
        <path d="M82 10 L144 10 Q150 10 150 15 L150 88 Q150 95 144 95 Q110 88 82 95 Z" fill="#f5f0e8" stroke="#005C53" strokeWidth="2" />
        {/* Cilt çizgisi */}
        <line x1="80" y1="10" x2="80" y2="95" stroke="#005C53" strokeWidth="3" />
        {/* Sol sayfa çizgileri */}
        <line x1="22" y1="28" x2="70" y2="28" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="22" y1="38" x2="70" y2="38" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="22" y1="48" x2="70" y2="48" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="22" y1="58" x2="70" y2="58" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="22" y1="68" x2="60" y2="68" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        {/* Sağ sayfa çizgileri */}
        <line x1="90" y1="28" x2="138" y2="28" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="38" x2="138" y2="38" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="48" x2="138" y2="48" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="58" x2="138" y2="58" stroke="#005C53" strokeWidth="1" opacity="0.4" />
        <line x1="90" y1="68" x2="125" y2="68" stroke="#005C53" strokeWidth="1" opacity="0.4" />
      </svg>


      {/* Sağ üst: kalem / dolmakalem */}
      <svg className="absolute right-8 top-8 opacity-18" width="30" height="150" viewBox="0 0 30 150" fill="none">
        {/* Gövde */}
        <rect x="8" y="20" width="14" height="110" rx="4" fill="#005C53" />
        {/* Uç */}
        <path d="M8 130 L15 150 L22 130 Z" fill="#042940" />
        {/* Klips */}
        <rect x="18" y="20" width="4" height="60" rx="2" fill="#9FC131" />
        {/* Başlık */}
        <rect x="6" y="10" width="18" height="12" rx="3" fill="#042940" />
        <circle cx="15" cy="16" r="2" fill="#DBF227" />
      </svg>

      {/* Yüzen Türkçe harfler */}
      {floaters.map((f) => (
        <span
          key={f.id}
          className="absolute bottom-[-30px] select-none font-bold text-[#005C53]"
          style={{
            left: `${f.left}%`,
            fontSize: f.size,
            opacity: f.opacity,
            animation: `lib-float ${f.duration}s linear ${f.delay}s infinite`,
            fontFamily: "Georgia, serif",
          }}
        >
          {f.char}
        </span>
      ))}

      <style>{`
        @keyframes lib-float {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translateY(-45vh) rotate(12deg); }
          100% { transform: translateY(-105vh) rotate(-8deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
