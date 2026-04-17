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
  curriculumCodes: [
    "ENG.7.6.R3",
    "ENG.7.6.V1",
    "ENG.7.6.G1",
    "ENG.7.6.L3",
    "ENG.7.6.W3",
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
