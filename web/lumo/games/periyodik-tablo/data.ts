/**
 * Periyodik tablo verisi.
 *
 * Tablo 7 periyot × 18 grup olarak modellenir. Sadece kazanım kapsamındaki
 * hücreler "geçerli"dir; diğerleri görünmez (boş alan) olarak kalır.
 *
 * Kategori renkleri site brand paleti üzerinden seçilmiştir.
 */

export type Category =
  | "alkali-toprak"
  | "gecis-metal"
  | "diger-metal"
  | "ametal"
  | "yarimetal"
  | "soygaz";

export interface Cell {
  /** Periyot — 1..7 */
  period: number;
  /** Grup — 1..18 */
  group: number;
  /** Element sembolü */
  symbol: string;
  /** Atom numarası */
  number: number;
  /** Türkçe element adı */
  name: string;
  /** Hangi blok parçasına ait */
  category: Category;
}

export const CELLS: Cell[] = [
  // Periyot 1
  { period: 1, group: 1,  symbol: "H",  number: 1,  name: "Hidrojen", category: "ametal" },
  { period: 1, group: 18, symbol: "He", number: 2,  name: "Helyum",   category: "soygaz"   },

  // Periyot 2
  { period: 2, group: 1,  symbol: "Li", number: 3,  name: "Lityum",     category: "alkali-toprak" },
  { period: 2, group: 2,  symbol: "Be", number: 4,  name: "Berilyum",   category: "alkali-toprak" },
  { period: 2, group: 13, symbol: "B",  number: 5,  name: "Bor",        category: "yarimetal"     },
  { period: 2, group: 14, symbol: "C",  number: 6,  name: "Karbon",     category: "ametal"        },
  { period: 2, group: 15, symbol: "N",  number: 7,  name: "Azot",       category: "ametal"        },
  { period: 2, group: 16, symbol: "O",  number: 8,  name: "Oksijen",    category: "ametal"        },
  { period: 2, group: 17, symbol: "F",  number: 9,  name: "Flor",       category: "ametal"        },
  { period: 2, group: 18, symbol: "Ne", number: 10, name: "Neon",       category: "soygaz"        },

  // Periyot 3
  { period: 3, group: 1,  symbol: "Na", number: 11, name: "Sodyum",     category: "alkali-toprak" },
  { period: 3, group: 2,  symbol: "Mg", number: 12, name: "Magnezyum",  category: "alkali-toprak" },
  // Al — hiçbir blokta yok, boş "hayalet" hücre. Aşama 2'de yerleştirilir.
  { period: 3, group: 13, symbol: "Al", number: 13, name: "Alüminyum",  category: "diger-metal" },
  { period: 3, group: 14, symbol: "Si", number: 14, name: "Silisyum",   category: "yarimetal"     },
  { period: 3, group: 15, symbol: "P",  number: 15, name: "Fosfor",     category: "ametal"        },
  { period: 3, group: 16, symbol: "S",  number: 16, name: "Kükürt",     category: "ametal"        },
  { period: 3, group: 17, symbol: "Cl", number: 17, name: "Klor",       category: "ametal"        },
  { period: 3, group: 18, symbol: "Ar", number: 18, name: "Argon",      category: "soygaz"        },

  // Periyot 4
  { period: 4, group: 1,  symbol: "K",  number: 19, name: "Potasyum",   category: "alkali-toprak" },
  { period: 4, group: 2,  symbol: "Ca", number: 20, name: "Kalsiyum",   category: "alkali-toprak" },
  { period: 4, group: 14, symbol: "Ge", number: 32, name: "Germanyum",  category: "yarimetal"     },
  { period: 4, group: 15, symbol: "As", number: 33, name: "Arsenik",    category: "yarimetal"     },
  { period: 4, group: 16, symbol: "Se", number: 34, name: "Selenyum",   category: "ametal"        },
  { period: 4, group: 17, symbol: "Br", number: 35, name: "Brom",       category: "ametal"        },
  { period: 4, group: 18, symbol: "Kr", number: 36, name: "Kripton",    category: "soygaz"        },

  // Periyot 5
  { period: 5, group: 15, symbol: "Sb", number: 51, name: "Antimon",    category: "yarimetal"     },
  { period: 5, group: 16, symbol: "Te", number: 52, name: "Tellür",     category: "yarimetal"     },
  { period: 5, group: 17, symbol: "I",  number: 53, name: "İyot",       category: "ametal"        },
  { period: 5, group: 18, symbol: "Xe", number: 54, name: "Ksenon",     category: "soygaz"        },

  // Periyot 6
  { period: 6, group: 16, symbol: "Po", number: 84, name: "Polonyum",   category: "yarimetal"     },
  { period: 6, group: 17, symbol: "At", number: 85, name: "Astatin",    category: "yarimetal"     },
  { period: 6, group: 18, symbol: "Rn", number: 86, name: "Radon",      category: "soygaz"        },
];

export type BlockId =
  | "hidrojen"
  | "alkali-toprak"
  | "gecis-metal"
  | "diger-metal"
  | "ametal"
  | "yarimetal"
  | "soygaz";

export interface BlockDef {
  id: BlockId;
  label: string;
  /** Aşama 1 sırasında bu bloğun kaplayacağı hücreler */
  cells: Array<{ period: number; group: number }>;
  /** Blok ham rengi */
  hex: string;
  /** Üzerine yazılacak yazı rengi */
  textColor: "#ffffff" | "#042940";
}

// Renk paleti — 4 ana sınıf.
const C = {
  metal: "#005C53",        // koyu yeşil (site brand teal)
  ametal: "#E63946",       // kırmızı
  yarimetal: "#DBF227",    // lime sarı (eski ametal rengi)
  soygaz: "#845EC2",       // mor
} as const;

/** Geçiş metalleri için yardımcı: periyot 4-7, grup 3-12 (4×10 = 40 hücre). */
const transitionCells: Array<{ period: number; group: number }> = (() => {
  const out: Array<{ period: number; group: number }> = [];
  for (let p = 4; p <= 7; p++) {
    for (let g = 3; g <= 12; g++) out.push({ period: p, group: g });
  }
  return out;
})();

export const BLOCKS: BlockDef[] = [
  {
    id: "hidrojen",
    label: "Ametal",
    cells: [{ period: 1, group: 1 }],
    hex: C.ametal,
    textColor: "#ffffff",
  },
  {
    id: "alkali-toprak",
    label: "Metal",
    cells: [
      { period: 2, group: 1 }, { period: 2, group: 2 },
      { period: 3, group: 1 }, { period: 3, group: 2 },
      { period: 4, group: 1 }, { period: 4, group: 2 },
      { period: 5, group: 1 }, { period: 5, group: 2 },
      { period: 6, group: 1 }, { period: 6, group: 2 },
      { period: 7, group: 1 }, { period: 7, group: 2 },
    ],
    hex: C.metal,
    textColor: "#ffffff",
  },
  {
    id: "gecis-metal",
    label: "Metal",
    cells: transitionCells,
    hex: C.metal,
    textColor: "#ffffff",
  },
  {
    id: "diger-metal",
    label: "Metal",
    cells: [
      { period: 3, group: 13 }, // Al
      { period: 4, group: 13 }, // Ga
      { period: 5, group: 13 }, // In
      { period: 5, group: 14 }, // Sn
      { period: 6, group: 13 }, // Tl
      { period: 6, group: 14 }, // Pb
      { period: 6, group: 15 }, // Bi
      { period: 7, group: 13 }, // Nh
      { period: 7, group: 14 }, // Fl
      { period: 7, group: 15 }, // Mc
      { period: 7, group: 16 }, // Lv
    ],
    hex: C.metal,
    textColor: "#ffffff",
  },
  {
    id: "ametal",
    label: "Ametal",
    cells: [
      { period: 2, group: 14 }, { period: 2, group: 15 }, { period: 2, group: 16 }, { period: 2, group: 17 },
      { period: 3, group: 15 }, { period: 3, group: 16 }, { period: 3, group: 17 },
      { period: 4, group: 16 }, { period: 4, group: 17 },
      { period: 5, group: 17 },
    ],
    hex: C.ametal,
    textColor: "#ffffff",
  },
  {
    id: "yarimetal",
    label: "Yarı Metal",
    cells: [
      { period: 2, group: 13 },
      { period: 3, group: 14 },
      { period: 4, group: 14 }, { period: 4, group: 15 },
      { period: 5, group: 15 }, { period: 5, group: 16 },
      { period: 6, group: 16 }, { period: 6, group: 17 },
    ],
    hex: C.yarimetal,
    textColor: "#042940",
  },
  {
    id: "soygaz",
    label: "Soy Gaz",
    cells: [
      { period: 1, group: 18 },
      { period: 2, group: 18 },
      { period: 3, group: 18 },
      { period: 4, group: 18 },
      { period: 5, group: 18 },
      { period: 6, group: 18 },
    ],
    hex: C.soygaz,
    textColor: "#ffffff",
  },
];

/** Aşama 2'de yerleştirilecek elementler: ilk 20 + 6 soy gaz (He, Ne, Ar zaten ilk 20 içinde). */
export const PHASE2_SYMBOLS = [
  "H","He","Li","Be","B","C","N","O","F","Ne",
  "Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca",
  "Kr","Xe","Rn",
];

/** Standart periyodik tablo dolu hücreleri (lantanit/aktinit hariç). */
export const STANDARD_LAYOUT: Array<{ period: number; group: number }> = (() => {
  const out: Array<{ period: number; group: number }> = [];
  // Periyot 1
  out.push({ period: 1, group: 1 }, { period: 1, group: 18 });
  // Periyot 2-3: 1,2,13-18
  for (const p of [2, 3]) {
    out.push({ period: p, group: 1 }, { period: p, group: 2 });
    for (let g = 13; g <= 18; g++) out.push({ period: p, group: g });
  }
  // Periyot 4-7: 1-18 (lantanit/aktinit yok)
  for (const p of [4, 5, 6, 7]) {
    for (let g = 1; g <= 18; g++) out.push({ period: p, group: g });
  }
  return out;
})();

/** Yardımcı: kategori → blok rengi (Phase 2'de hücre arka planı için). */
export const CATEGORY_COLORS: Record<Category, string> = {
  ametal: "#E63946",
  "alkali-toprak": "#005C53",
  "gecis-metal": "#005C53",
  "diger-metal": "#005C53",
  yarimetal: "#DBF227",
  soygaz: "#845EC2",
};
