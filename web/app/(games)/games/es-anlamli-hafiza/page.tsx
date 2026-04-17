"use client";

import dynamic from "next/dynamic";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

const EsAnlamliHafiza = dynamic(
  () => import("@/lumo/games/es-anlamli-hafiza"),
  { ssr: false }
);

export default function EsAnlamliHafizaPage() {
  const { studentSessionToken } = useAuthStore();

  return (
    <EsAnlamliHafiza
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
