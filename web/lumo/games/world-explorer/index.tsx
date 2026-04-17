"use client";

import { useState, useCallback } from "react";
import { GameBoard } from "./components/GameBoard";
import { IntroScreen } from "./components/IntroScreen";
import { ResultScreen } from "./components/ResultScreen";
import { worldExplorerConfig } from "./config";
import type { GameResult } from "./types";

interface WorldExplorerProps {
  playerName?: string;
  onScoreSubmit?: (data: {
    gameId: string;
    score: number;
    elapsedSeconds: number;
    totalAttempts: number;
  }) => Promise<void>;
}

type Screen = "intro" | "playing" | "result";

export default function WorldExplorer({
  playerName,
  onScoreSubmit,
}: WorldExplorerProps) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [result, setResult] = useState<GameResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleStart = useCallback(() => setScreen("playing"), []);

  const handleComplete = useCallback(
    async (gameResult: GameResult) => {
      setResult(gameResult);
      setScreen("result");

      if (onScoreSubmit) {
        setSubmitting(true);
        try {
          await onScoreSubmit({
            gameId: worldExplorerConfig.id,
            score: gameResult.score,
            elapsedSeconds: gameResult.elapsedSeconds,
            totalAttempts: gameResult.totalAttempts,
          });
        } finally {
          setSubmitting(false);
        }
      }
    },
    [onScoreSubmit]
  );

  const handleReplay = useCallback(() => {
    setResult(null);
    setScreen("playing");
  }, []);

  switch (screen) {
    case "intro":
      return <IntroScreen playerName={playerName} onStart={handleStart} />;
    case "playing":
      return <GameBoard onComplete={handleComplete} />;
    case "result":
      return result ? (
        <ResultScreen
          result={result}
          playerName={playerName}
          submitting={submitting}
          onReplay={handleReplay}
        />
      ) : null;
    default:
      return null;
  }
}
