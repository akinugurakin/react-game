"use client";

import dynamic from "next/dynamic";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

const PeriyodikTablo = dynamic(
  () => import("@/lumo/games/periyodik-tablo"),
  { ssr: false }
);

export default function PeriyodikTabloPage() {
  const { studentSessionToken } = useAuthStore();

  return (
    <PeriyodikTablo
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
