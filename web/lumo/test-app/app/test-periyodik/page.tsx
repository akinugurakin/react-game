"use client";

import PeriyodikTablo from "@/games/periyodik-tablo";

export default function TestPeriyodikPage() {
  return (
    <main className="min-h-screen">
      <PeriyodikTablo
        playerName="Test Oyuncu"
        onScoreSubmit={async (data) => {
          console.log("Skor gönderildi:", data);
        }}
      />
    </main>
  );
}
