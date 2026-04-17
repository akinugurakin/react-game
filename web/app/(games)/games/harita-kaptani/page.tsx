"use client";

import dynamic from "next/dynamic";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

const HaritaKaptani = dynamic(
  () => import("@/lumo/games/harita-kaptani"),
  { ssr: false }
);

export default function HaritaKaptaniPage() {
  const { studentSessionToken } = useAuthStore();

  return (
    <HaritaKaptani
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
