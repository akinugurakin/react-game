"use client";

import dynamic from "next/dynamic";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

const WorldExplorer = dynamic(
  () => import("@/lumo/games/world-explorer"),
  { ssr: false }
);

export default function WorldExplorerPage() {
  const { studentSessionToken } = useAuthStore();

  return (
    <WorldExplorer
      onScoreSubmit={async (data) => {
        const token = studentSessionToken;
        if (!token) return;
        try {
          await api.post(`/games/${data.gameId}/session`, {
            score: data.score,
            correct_count: 0,
            wrong_count: data.totalAttempts,
            duration_seconds: data.elapsedSeconds,
            platform: "web",
          }, token);
        } catch (err) {
          console.error("Skor kaydedilemedi:", err);
        }
      }}
    />
  );
}
