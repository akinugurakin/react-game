"use client";

import { Lightbulb } from "lucide-react";

interface CardProps {
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
  isWrong: boolean;
  onClick: () => void;
  disabled: boolean;
}

const faceBase: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

export function Card({ word, isFlipped, isMatched, isWrong, onClick, disabled }: CardProps) {
  const revealed = isFlipped || isMatched;

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", perspective: 600 }}
    >
      {/* Arka yüz (LUMO) */}
      <div
        onClick={disabled ? undefined : onClick}
        style={{
          ...faceBase,
          flexDirection: "column",
          gap: 6,
          cursor: disabled ? "default" : "pointer",
          background: isWrong ? "#f87171" : "#005C53",
          transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <Lightbulb style={{ width: 32, height: 32, color: "#DBF227" }} />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)" }}>
          LUMO
        </span>
      </div>

      {/* Ön yüz (kelime) */}
      <div
        style={{
          ...faceBase,
          flexDirection: "column",
          gap: 4,
          background: isMatched ? "#f4fce8" : "#ffffff",
          border: isMatched ? "2px solid #9FC131" : "2px solid rgba(0,92,83,0.15)",
          transform: revealed ? "rotateY(0deg)" : "rotateY(-180deg)",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            color: "#042940",
            textAlign: "center",
            lineHeight: 1.3,
            padding: "0 10px",
            fontSize: 16,
          }}
        >
          {word}
        </span>
        {isMatched && (
          <span style={{ position: "absolute", top: 6, right: 8, fontSize: 12, color: "#9FC131" }}>✓</span>
        )}
      </div>
    </div>
  );
}
