"use client";

/**
 * Sayfa arka plan&#305;nda s&#252;rekli devam eden, yar&#305; saydam
 * e&#287;itim sembolleri ve form&#252;lleri g&#246;steren dekoratif katman.
 *
 * &#304;&#231;erik: Matematik, Fizik, Kimya, Biyoloji, Co&#287;rafya, Tarih
 */

const symbols = [
  // Matematik
  "&#960;", "&#8730;", "&#8747;", "&#8721;", "&#8734;", "&#916;",
  "&#177;", "&#247;", "&#215;", "&#8805;", "&#8804;", "&#8800;",
  "x&#178;", "&#189;", "&#8731;", "&#955;",
  "2+3", "a&#178;+b&#178;", "f(x)", "log",
  // Fizik
  "E=mc&#178;", "F=ma", "&#937;", "V=IR", "&#956;",
  "9.8 m/s&#178;", "Hz", "&#916;t", "&#952;",
  // Kimya
  "H&#8322;O", "CO&#8322;", "NaCl", "O&#8322;", "Fe",
  "pH", "mol", "&#916;H", "Au",
  // Biyoloji
  "DNA", "RNA", "ATP", "&#9827;",
  // Co&#287;rafya
  "&#127758;", "&#176;C", "km&#178;", "N-S",
  // Tarih
  "M.&#214;.", "M.S.",
];

/* Her sat&#305;r i&#231;in farkl&#305; h&#305;z, y&#246;n ve boyut &#252;retelim */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function generateRows() {
  const rows = [];
  const rowCount = 18; // dikey tekrar say&#305;s&#305;

  for (let r = 0; r < rowCount; r++) {
    const itemCount = 8 + Math.floor(seededRandom(r * 7) * 5); // 8-12 sembol
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      const idx = Math.floor(seededRandom(r * 100 + i * 13) * symbols.length);
      items.push(symbols[idx]);
    }

    const duration = 40 + seededRandom(r * 3) * 60; // 40-100s
    const direction = r % 2 === 0 ? 1 : -1; // alternatif y&#246;n
    const fontSize = 14 + Math.floor(seededRandom(r * 5) * 10); // 14-24px
    const opacity = 0.03 + seededRandom(r * 11) * 0.04; // 0.03-0.07

    rows.push({ items, duration, direction, fontSize, opacity, key: r });
  }
  return rows;
}

const rows = generateRows();

export function BackgroundSymbols() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {rows.map((row) => {
        // &#199;ift kopya i&#231;in yaz&#305; -> seamless loop
        const content = row.items.join("    \u00b7    ");
        const doubled = `${content}    \u00b7    ${content}`;

        return (
          <div
            key={row.key}
            className="whitespace-nowrap"
            style={{
              position: "absolute",
              top: `${(row.key / rows.length) * 100}%`,
              left: 0,
              width: "200%",
              fontSize: `${row.fontSize}px`,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              color: "#042940",
              opacity: row.opacity,
              animation: `scroll-${row.direction > 0 ? "left" : "right"} ${row.duration}s linear infinite`,
              userSelect: "none",
              lineHeight: 1,
            }}
            dangerouslySetInnerHTML={{ __html: doubled }}
          />
        );
      })}

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
