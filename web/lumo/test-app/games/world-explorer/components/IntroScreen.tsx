"use client";

import { worldExplorerConfig } from "../config";

interface IntroScreenProps {
  playerName?: string;
  onStart: () => void;
}

export function IntroScreen({ playerName, onStart }: IntroScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 px-4 max-w-md mx-auto text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl shadow-inner">
        🌍
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          {worldExplorerConfig.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Travel the world! Match landmarks, build sentences and ace the sports
          quiz to fill your passport with stamps.
        </p>
      </div>

      {/* How to play */}
      <div className="flex flex-col gap-2.5 w-full text-left bg-secondary rounded-xl p-4">
        <p className="text-[10px] font-bold text-foreground uppercase tracking-widest">
          3 Rounds
        </p>
        {[
          {
            n: "1",
            icon: "🗺️",
            title: "Landmark Match",
            desc: "Match 8 landmarks to their cities",
          },
          {
            n: "2",
            icon: "✏️",
            title: "Sentence Builder",
            desc: "Present Perfect + Question Tags",
          },
          {
            n: "3",
            icon: "🏅",
            title: "Sports Quiz",
            desc: "Read passages & answer questions",
          },
        ].map((r) => (
          <div key={r.n} className="flex items-start gap-3">
            <span className="text-xl leading-none mt-0.5">{r.icon}</span>
            <div>
              <p className="text-sm font-bold text-foreground">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Meta badges */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap justify-center">
        <span className="bg-muted px-2.5 py-1 rounded-full font-medium">
          ~{worldExplorerConfig.duration} min
        </span>
        <span className="bg-muted px-2.5 py-1 rounded-full font-medium">
          {worldExplorerConfig.difficulty}
        </span>
        <span className="bg-muted px-2.5 py-1 rounded-full font-medium">
          7th Grade English
        </span>
      </div>

      {/* Player greeting */}
      {playerName && (
        <p className="text-sm text-muted-foreground">
          Welcome,{" "}
          <span className="font-bold text-foreground">{playerName}</span>!
        </p>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={onStart}
        className="w-full py-3.5 px-6 bg-primary text-primary-foreground font-extrabold text-base rounded-xl shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-200 active:scale-[0.97]"
      >
        Start Exploring
      </button>
    </div>
  );
}
