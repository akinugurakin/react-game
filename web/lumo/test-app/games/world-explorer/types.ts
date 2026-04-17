// ---------- Round result ----------

export interface RoundResult {
  key: RoundId;
  correct: number;
  total: number;
  timeBonus: boolean;
  mistakes: number;
}

// ---------- Game result ----------

export interface GameResult {
  score: number;
  totalAttempts: number;
  correctAnswers: number;
  bestStreak: number;
  rounds: RoundResult[];
  elapsedSeconds: number;
}

// ---------- Round identifiers ----------

export type RoundId = "landmark-match" | "sentence-builder" | "sports-quiz";

export const ROUND_ORDER: RoundId[] = [
  "landmark-match",
  "sentence-builder",
  "sports-quiz",
];

export const ROUND_META: Record<
  RoundId,
  { label: string; hint: string; icon: string }
> = {
  "landmark-match": {
    label: "Landmark Match",
    hint: "Tap a landmark, then tap its city",
    icon: "🗺️",
  },
  "sentence-builder": {
    label: "Sentence Builder",
    hint: "Tap words in order to build the sentence",
    icon: "✏️",
  },
  "sports-quiz": {
    label: "Sports Quiz",
    hint: "Read the passage, pick the right answer",
    icon: "🏅",
  },
};
