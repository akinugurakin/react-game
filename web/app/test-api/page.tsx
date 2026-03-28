"use client";

import { useState } from "react";

export default function TestAPI() {
  const [result, setResult] = useState("Henüz test edilmedi");
  const [loading, setLoading] = useState(false);

  const testFetch = async () => {
    setLoading(true);
    setResult("Yükleniyor...");
    try {
      const res = await fetch("https://react-game-api.onrender.com/games/1/leaderboard");
      const text = await res.text();
      setResult(`Status: ${res.status}\nData: ${text}`);
    } catch (err: any) {
      setResult(`HATA: ${err.name}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>API Test Sayfası</h1>
      <button
        onClick={testFetch}
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer", marginTop: 20 }}
      >
        API&apos;yi Test Et
      </button>
      <pre style={{ marginTop: 20, padding: 20, background: "#f0f0f0", borderRadius: 8, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}
