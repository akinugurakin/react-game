import type { GameConfig } from "@/types/game";

export const haritaKaptaniConfig: GameConfig = {
  id: "harita-kaptani",
  title: "Harita Kaptanı",
  description:
    "Eski deniz haritaları bir fırtınada kayboldu! Kıtaları, okyanusları ve koordinatları yeniden keşfet.",
  discipline: "sosyal",
  grade: 6,
  minAge: 11,
  maxAge: 12,
  duration: 8,
  difficulty: "orta",
  kazanimlar: [
    { kod: "SB.6.2.1", katsayi: 1.0 }, // Harita, atlaslar ve GPS ile konum belirler
  ],
  tags: ["kita", "okyanus", "koordinat", "konum", "meridyen", "paralel"],
};
