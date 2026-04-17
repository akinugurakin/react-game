import type { GameConfig } from "@/types/game";

export const esAnlamliHafizaConfig: GameConfig = {
  id: "es-anlamli-hafiza",
  title: "Eş Anlamlı Hafıza",
  description:
    "Kartları çevir, eş anlamlı kelime çiftlerini bul ve hafızanı güçlendir.",
  discipline: "turkce",
  grade: 4,
  minAge: 8,
  maxAge: 12,
  duration: 5,
  difficulty: "orta",
  kazanimlar: [
    { kod: "TDL.4.6.1", katsayi: 0.9 }, // Eş anlamlı kelimeleri tanır ve kullanır (4. sınıf)
    { kod: "TDL.5.6.1", katsayi: 0.9 }, // Eş anlamlı kelimeleri tanır ve kullanır (5. sınıf)
  ],
  tags: ["es-anlamli", "kelime", "hafiza", "eslestirme"],
};
