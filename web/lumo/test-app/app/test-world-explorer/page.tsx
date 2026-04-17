"use client";

import WorldExplorer from "@/games/world-explorer";

export default function TestWorldExplorerPage() {
  return (
    <main className="min-h-screen py-8">
      <WorldExplorer
        playerName="Test Player"
        onScoreSubmit={async (data) => {
          console.log("Score submitted:", data);
        }}
      />
    </main>
  );
}
