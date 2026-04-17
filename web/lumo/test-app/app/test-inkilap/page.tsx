"use client";

import InkilapYolu from "@/games/inkilap-yolu";

export default function TestInkilapPage() {
  return (
    <main className="min-h-screen py-8">
      <InkilapYolu
        playerName="Test Oyuncu"
        onScoreSubmit={async (data) => {
          console.log("Skor gönderildi:", data);
        }}
      />
    </main>
  );
}
