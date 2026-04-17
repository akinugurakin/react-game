import type { GameConfig } from "@/types/game";

export const periyodikTabloConfig: GameConfig = {
  id: "periyodik-tablo",
  title: "Periyodik Kaos",
  description:
    "Metal, ametal, yarı metal ve soy gaz bloklarını yerleştir, ardından elementleri doğru hücrelere taşı.",
  discipline: "fen",
  grade: 8,
  minAge: 13,
  maxAge: 14,
  duration: 8,
  difficulty: "orta",
  kazanimlar: [
    { kod: "FB.8.5.1.1", katsayi: 1.0 }, // Elementleri metal, ametal, yarı metal olarak sınıflandırır
  ],
  tags: ["periyodik-tablo", "elementler", "siniflandirma", "suruklebirak"],
};
