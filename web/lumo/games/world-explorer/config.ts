import type { GameConfig } from "@/types/game";

export const worldExplorerConfig: GameConfig = {
  id: "world-explorer",
  title: "World Explorer",
  description:
    "Travel the world, match landmarks to cities, build sentences, and test your sports knowledge!",
  discipline: "ingilizce",
  grade: 7,
  minAge: 12,
  maxAge: 13,
  duration: 10,
  difficulty: "orta",
  thumbnailUrl: "/games/world-explorer/thumbnail.svg",
  kazanimlar: [
    { kod: "ENG.7.6.R3", katsayi: 0.9 }, // Dünya kültürlerine dair metinleri okur ve anlar
    { kod: "ENG.7.6.V1", katsayi: 0.8 }, // Konu bağlamında sözcük dağarcığını genişletir
    { kod: "ENG.7.6.G1", katsayi: 0.7 }, // Present perfect zamanı doğru kullanır
    { kod: "ENG.7.6.L3", katsayi: 0.6 }, // Kısa diyalogları dinleyerek anlamlandırır
    { kod: "ENG.7.6.W3", katsayi: 0.5 }, // Soru eklerini (question tags) doğru kullanır
  ],
  tags: [
    "english",
    "vocabulary",
    "present-perfect",
    "question-tags",
    "world-culture",
    "capitals",
    "landmarks",
    "sports",
    "drag-and-drop",
    "sentence-building",
    "reading-comprehension",
  ],
};
