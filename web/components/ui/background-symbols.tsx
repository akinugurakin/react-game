"use client";

/**
 * Sayfa arka planinda rastgele dagilmis, yari saydam
 * egitim sembolleri, formuller ve gorseller.
 * Ortaokul mufredatina uygun icerik.
 * Sayfanin tamamini kaplar, scroll ile birlikte hareket eder.
 */

const items = [
  // ── Matematik ──
  "\u03C0", "\u221A", "\u00B1", "\u00D7", "\u00F7", "\u2260", "\u2265", "\u2264",
  "\u221E", "\u0394", "\u03B1", "\u03B2", "\u2220", "\u25B3", "\u25CB", "\u25A1",
  "x\u00B2", "a+b", "3x", "\u00BD", "\u00BC", "\u00BE", "f(x)", "%",
  "\uD83D\uDCCF", "\uD83D\uDCCA",
  "\u2795", "\u2796", "\u2716",
  "\uD83D\uDD22",

  // ── Fizik ──
  "F=ma", "V=IR", "\u03A9", "Hz", "kg", "cm", "m/s",
  "\u26A1", "\uD83D\uDD0B", "\uD83C\uDF21\uFE0F", "\u2699\uFE0F",

  // ── Kimya ──
  "H\u2082O", "CO\u2082", "O\u2082", "NaCl", "Fe", "Au", "Cu",
  "pH", "mol",
  "\u2697\uFE0F", "\uD83E\uDDEA", "\u269B\uFE0F",

  // ── Biyoloji ──
  "DNA", "RNA",
  "\uD83E\uDDA0", "\uD83C\uDF31", "\uD83C\uDF3F", "\uD83D\uDD2C",
  "\uD83E\uDDB4", "\u2764\uFE0F", "\uD83E\uDDE0",

  // ── Cografya ──
  "\uD83C\uDF0D", "\uD83C\uDFD4\uFE0F", "\uD83C\uDF0A", "\uD83E\uDDED",
  "\u00B0C", "km\u00B2", "\uD83D\uDDFA\uFE0F",

  // ── Tarih ──
  "\uD83C\uDFDB\uFE0F", "\uD83D\uDCDC", "\u2694\uFE0F", "\uD83D\uDC51",
  "\uD83C\uDFF0", "\uD83C\uDFFA",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Tekrar eden blok olustur (her blok ~100vh yuksekliginde)
// 10 blok = ~10 sayfa yuksekliginde arka plan
const BLOCK_COUNT = 10;
const ITEMS_PER_BLOCK = 30;

function generateBlocks() {
  const blocks = [];

  for (let b = 0; b < BLOCK_COUNT; b++) {
    const blockItems = [];
    for (let i = 0; i < ITEMS_PER_BLOCK; i++) {
      const seed = b * 1000 + i;
      const idx = Math.floor(seededRandom(seed * 13 + 7) * items.length);
      const x = seededRandom(seed * 17 + 3) * 96 + 2;        // 2-98%
      const y = seededRandom(seed * 23 + 11) * 90 + 5;         // 5-95% blok icinde
      const size = 16 + Math.floor(seededRandom(seed * 31 + 5) * 30); // 16-46px
      const opacity = 0.03 + seededRandom(seed * 37 + 19) * 0.05;     // 0.03-0.08
      const rotation = Math.floor(seededRandom(seed * 41 + 29) * 60) - 30; // -30 ile 30

      blockItems.push({
        content: items[idx],
        x,
        y,
        size,
        opacity,
        rotation,
        key: `${b}-${i}`,
      });
    }
    blocks.push({ items: blockItems, index: b });
  }
  return blocks;
}

const blocks = generateBlocks();

export function BackgroundSymbols() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: `${BLOCK_COUNT * 100}vh` }}
      aria-hidden="true"
    >
      {blocks.map((block) => (
        <div
          key={block.index}
          className="absolute inset-x-0"
          style={{
            top: `${block.index * 100}vh`,
            height: "100vh",
          }}
        >
          {block.items.map((el) => (
            <span
              key={el.key}
              className="absolute select-none"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                fontSize: `${el.size}px`,
                opacity: el.opacity,
                transform: `rotate(${el.rotation}deg)`,
                color: "#042940",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {el.content}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
