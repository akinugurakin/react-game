"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function PageLines() {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -340]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -270]);

  const layers = [y1, y2, y3, y4, y5];

  // Matematik — 5-8. sınıf müfredatı
  const mathItems = [
    { x: 5, y: 3, text: "2 + 3 = 5", size: "text-4xl", l: 0 },
    { x: 72, y: 12, text: "7 × 8 = 56", size: "text-3xl", l: 1 },
    { x: 35, y: 28, text: "½ + ¼ = ¾", size: "text-3xl", l: 2 },
    { x: 85, y: 42, text: "a² + b² = c²", size: "text-3xl", l: 3 },
    { x: 15, y: 55, text: "π ≈ 3,14", size: "text-4xl", l: 4 },
    { x: 58, y: 68, text: "% 25", size: "text-5xl", l: 0 },
    { x: 8, y: 82, text: "∞", size: "text-7xl", l: 1 },
    { x: 78, y: 90, text: "√9 = 3", size: "text-4xl", l: 2 },
    { x: 42, y: 48, text: "x + 5 = 12", size: "text-3xl", l: 3 },
    { x: 22, y: 15, text: "3/4", size: "text-5xl", l: 4 },
    { x: 65, y: 35, text: "12 ÷ 4 = 3", size: "text-3xl", l: 0 },
    { x: 48, y: 85, text: "2ⁿ", size: "text-5xl", l: 1 },
  ];

  // Fizik — 6-8. sınıf fen bilimleri
  const physicsItems = [
    { x: 55, y: 5, text: "F = m × a", size: "text-4xl", l: 2 },
    { x: 18, y: 38, text: "V = I × R", size: "text-3xl", l: 3 },
    { x: 82, y: 58, text: "v = yol / t", size: "text-3xl", l: 4 },
    { x: 38, y: 72, text: "⚡", size: "text-6xl", l: 0 },
    { x: 70, y: 25, text: "kg", size: "text-5xl", l: 1 },
    { x: 10, y: 68, text: "m/s", size: "text-4xl", l: 2 },
    { x: 88, y: 78, text: "Newton", size: "text-3xl", l: 3 },
    { x: 30, y: 8, text: "🔋", size: "text-5xl", l: 4 },
  ];

  // Kimya — 7-8. sınıf fen bilimleri
  const chemItems = [
    { x: 45, y: 18, text: "H₂O", size: "text-5xl", l: 3 },
    { x: 8, y: 45, text: "CO₂", size: "text-4xl", l: 0 },
    { x: 75, y: 48, text: "NaCl", size: "text-4xl", l: 1 },
    { x: 28, y: 62, text: "O₂", size: "text-5xl", l: 2 },
    { x: 62, y: 82, text: "Fe", size: "text-5xl", l: 4 },
    { x: 90, y: 32, text: "⚗", size: "text-5xl", l: 3 },
    { x: 52, y: 55, text: "pH", size: "text-4xl", l: 0 },
  ];

  // Biyoloji — 5-8. sınıf fen bilimleri
  const bioItems = [
    { x: 25, y: 22, text: "🦠", size: "text-5xl", l: 1 },
    { x: 68, y: 42, text: "🌿", size: "text-6xl", l: 2 },
    { x: 12, y: 75, text: "🔬", size: "text-5xl", l: 3 },
    { x: 82, y: 65, text: "🫀", size: "text-5xl", l: 4 },
    { x: 48, y: 92, text: "🧪", size: "text-5xl", l: 0 },
    { x: 58, y: 15, text: "🌱", size: "text-5xl", l: 1 },
  ];

  // Tarih — 5-8. sınıf
  const historyItems = [
    { x: 78, y: 20, text: "🏛", size: "text-6xl", l: 0 },
    { x: 52, y: 40, text: "⏳", size: "text-6xl", l: 2 },
    { x: 65, y: 75, text: "⚔", size: "text-5xl", l: 0 },
    { x: 15, y: 95, text: "🏰", size: "text-6xl", l: 2 },
    { x: 72, y: 95, text: "📜", size: "text-5xl", l: 3 },
    { x: 35, y: 10, text: "1071", size: "text-4xl", l: 4 },
    { x: 88, y: 85, text: "1453", size: "text-4xl", l: 1 },
    { x: 5, y: 60, text: "1923", size: "text-4xl", l: 3 },
  ];

  // Coğrafya — 5-8. sınıf
  const geoItems = [
    { x: 32, y: 5, text: "🌍", size: "text-6xl", l: 4 },
    { x: 5, y: 30, text: "🗺", size: "text-6xl", l: 1 },
    { x: 88, y: 52, text: "🧭", size: "text-6xl", l: 3 },
    { x: 20, y: 58, text: "🏔", size: "text-6xl", l: 4 },
    { x: 40, y: 88, text: "🌋", size: "text-6xl", l: 1 },
    { x: 62, y: 60, text: "☀", size: "text-6xl", l: 2 },
    { x: 45, y: 78, text: "🌊", size: "text-5xl", l: 0 },
  ];

  // SVG atom modeli
  const atoms = [
    { x: 42, y: 32, s: 200, l: 2 },
    { x: 80, y: 70, s: 160, l: 4 },
    { x: 15, y: 85, s: 180, l: 1 },
  ];

  // SVG dünya küresi
  const globes = [
    { x: 60, y: 22, s: 180, l: 1 },
    { x: 10, y: 62, s: 200, l: 3 },
    { x: 75, y: 88, s: 160, l: 0 },
  ];

  // SVG üçgen (pisagor)
  const triangles = [
    { x: 28, y: 42, s: 160, l: 0 },
    { x: 72, y: 55, s: 140, l: 3 },
    { x: 50, y: 78, s: 150, l: 1 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ====== DALGALI ÇİZGİLER ====== */}
      <motion.svg style={{ y: y1 }} className="absolute inset-0 h-[500vh] w-full opacity-[0.07]" viewBox="0 0 1440 5000" fill="none" preserveAspectRatio="none">
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={`wa-${i}`} d={`M 0 ${i * 500 + 250} Q 360 ${i * 500 + 80} 720 ${i * 500 + 250} Q 1080 ${i * 500 + 420} 1440 ${i * 500 + 250}`} stroke="#005C53" strokeWidth="1.5" />
        ))}
      </motion.svg>
      <motion.svg style={{ y: y2 }} className="absolute inset-0 h-[500vh] w-full opacity-[0.05]" viewBox="0 0 1440 5000" fill="none" preserveAspectRatio="none">
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={`wb-${i}`} d={`M 0 ${i * 500 + 120} Q 360 ${i * 500 + 350} 720 ${i * 500 + 120} Q 1080 ${i * 500 - 60} 1440 ${i * 500 + 120}`} stroke="#042940" strokeWidth="1.2" />
        ))}
      </motion.svg>

      {/* ====== MATEMATİK ====== */}
      {mathItems.map(({ x, y, text, size, l }, i) => (
        <motion.div key={`math-${i}`} className={`absolute ${size} font-mono font-bold select-none`} style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.08, color: "#005C53" }}>
          {text}
        </motion.div>
      ))}

      {/* ====== FİZİK ====== */}
      {physicsItems.map(({ x, y, text, size, l }, i) => (
        <motion.div key={`phys-${i}`} className={`absolute ${size} font-mono font-bold select-none`} style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.08, color: "#005C53" }}>
          {text}
        </motion.div>
      ))}

      {/* ====== KİMYA ====== */}
      {chemItems.map(({ x, y, text, size, l }, i) => (
        <motion.div key={`chem-${i}`} className={`absolute ${size} font-mono font-bold select-none`} style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.08, color: "#005C53" }}>
          {text}
        </motion.div>
      ))}

      {/* ====== BİYOLOJİ ====== */}
      {bioItems.map(({ x, y, text, size, l }, i) => (
        <motion.div key={`bio-${i}`} className={`absolute ${size} select-none`} style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.12 }}>
          {text}
        </motion.div>
      ))}

      {/* ====== TARİH ====== */}
      {historyItems.map(({ x, y, text, size, l }, i) => (
        <motion.div key={`hist-${i}`} className={`absolute ${size} select-none ${/\d/.test(text) ? "font-mono font-bold" : ""}`} style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: /\d/.test(text) ? 0.07 : 0.10, color: /\d/.test(text) ? "#f59e0b" : undefined }}>
          {text}
        </motion.div>
      ))}

      {/* ====== COĞRAFYA ====== */}
      {geoItems.map(({ x, y, text, size, l }, i) => (
        <motion.div key={`geo-${i}`} className={`absolute ${size} select-none`} style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.10 }}>
          {text}
        </motion.div>
      ))}

      {/* ====== SVG ATOM MODELLERİ ====== */}
      {atoms.map(({ x, y, s, l }, i) => (
        <motion.div key={`atom-${i}`} className="absolute" style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.09 }}>
          <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="12" fill="#005C53" opacity="0.4" />
            <ellipse cx="100" cy="100" rx="80" ry="30" stroke="#005C53" strokeWidth="1.5" transform="rotate(0 100 100)" />
            <ellipse cx="100" cy="100" rx="80" ry="30" stroke="#005C53" strokeWidth="1.5" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="80" ry="30" stroke="#9FC131" strokeWidth="1.5" transform="rotate(120 100 100)" />
            <circle cx="180" cy="100" r="5" fill="#005C53" opacity="0.6" />
            <circle cx="60" cy="58" r="5" fill="#005C53" opacity="0.6" />
            <circle cx="60" cy="142" r="5" fill="#9FC131" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      {/* ====== SVG DÜNYA KÜRESİ ====== */}
      {globes.map(({ x, y, s, l }, i) => (
        <motion.div key={`globe-${i}`} className="absolute" style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.08 }}>
          <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#005C53" strokeWidth="1.5" />
            <ellipse cx="100" cy="100" rx="90" ry="20" stroke="#005C53" strokeWidth="1" />
            <ellipse cx="100" cy="70" rx="75" ry="15" stroke="#005C53" strokeWidth="1" />
            <ellipse cx="100" cy="130" rx="75" ry="15" stroke="#005C53" strokeWidth="1" />
            <ellipse cx="100" cy="100" rx="20" ry="90" stroke="#005C53" strokeWidth="1" />
            <ellipse cx="100" cy="100" rx="55" ry="90" stroke="#005C53" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* ====== SVG DİK ÜÇGEN (Pisagor) ====== */}
      {triangles.map(({ x, y, s, l }, i) => (
        <motion.div key={`tri-${i}`} className="absolute" style={{ y: layers[l], left: `${x}%`, top: `${y}%`, opacity: 0.08 }}>
          <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
            {/* Dik üçgen */}
            <path d="M 20 140 L 20 30 L 140 140 Z" stroke="#005C53" strokeWidth="2" fill="none" />
            {/* Dik açı işareti */}
            <path d="M 20 120 L 40 120 L 40 140" stroke="#005C53" strokeWidth="1.5" fill="none" />
            {/* Kenar etiketleri */}
            <text x="8" y="88" fill="#005C53" fontSize="14" fontFamily="monospace" opacity="0.6">a</text>
            <text x="75" y="155" fill="#005C53" fontSize="14" fontFamily="monospace" opacity="0.6">b</text>
            <text x="78" y="78" fill="#005C53" fontSize="14" fontFamily="monospace" opacity="0.6">c</text>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
