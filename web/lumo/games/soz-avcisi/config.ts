import type { GameConfig } from "@/types/game";

export const sozAvcisiConfig: GameConfig = {
  id: "soz-avcisi",
  title: "Söz Avcısı",
  description:
    "Kelime Ormanı'nda eş anlamlı, zıt anlamlı kelimeleri ve deyimlerin anlamlarını eşleştir!",
  discipline: "turkce",
  grade: 6,
  minAge: 11,
  maxAge: 12,
  duration: 8,
  difficulty: "orta",
  thumbnailUrl: "/games/soz-avcisi/thumbnail.svg",
  kazanimlar: [
    { kod: "T.O.6.21", katsayi: 0.9 }, // Eş anlamlı ve zıt anlamlı kelimeleri kullanır
    { kod: "T.O.6.22", katsayi: 0.7 }, // Deyimlerin anlamlarını kavrar
  ],
  tags: [
    "soz-varligi",
    "es-anlamli",
    "zit-anlamli",
    "deyimler",
    "eslestirme",
    "kelime-oyunu",
  ],
};
