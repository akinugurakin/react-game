"use client";

import SozAvcisi from "@/games/soz-avcisi";

export default function TestPage() {
  return (
    <main className="min-h-screen py-8">
      <SozAvcisi
        playerName="Test Oyuncu"
        onScoreSubmit={async (data) => {
          console.log("Skor gönderildi:", data);
        }}
      />
    </main>
  );
}
