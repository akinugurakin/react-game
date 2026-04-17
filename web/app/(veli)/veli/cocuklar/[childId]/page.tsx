"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Gamepad2, Trophy, Clock, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

/* ---- Sabitler ---- */

const AVATAR_EMOJIS: Record<string, string> = {
  avatar_1: "🦁", avatar_2: "🐯", avatar_3: "🦊", avatar_4: "🐧",
  avatar_5: "🦋", avatar_6: "🐬", avatar_7: "🦄", avatar_8: "🐸",
  avatar_9: "🐼", avatar_10: "🦉", avatar_11: "🐙", avatar_12: "🦕",
};

const GAME_NAMES: Record<string, string> = {
  "math": "Matematik Yarışması",
  "es-anlamli-hafiza": "Eş Anlamlı Hafıza",
  "harita-kaptani": "Harita Kaptanı",
  "periyodik-tablo": "Periyodik Tablo",
};

// Oyun → ders eşlemesi
const GAME_SUBJECT: Record<string, string> = {
  "math": "Matematik",
  "kesir-ustasi": "Matematik",
  "es-anlamli-hafiza": "Türkçe",
  "kelime-avi": "Türkçe",
  "cumle-kurma": "Türkçe",
  "harita-kaptani": "Sosyal Bilgiler",
  "tarih-yolculugu": "Sosyal Bilgiler",
  "periyodik-tablo": "Fen Bilimleri",
  "canlilar-alemi": "Fen Bilimleri",
  "vocabulary-builder": "İngilizce",
  "grammar-quest": "İngilizce",
};

const SUBJECTS = ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce"] as const;
type Subject = (typeof SUBJECTS)[number];

const SUBJECT_COLORS: Record<Subject, string> = {
  "Türkçe": "#005C53",
  "Matematik": "#9FC131",
  "Fen Bilimleri": "#E8634A",
  "Sosyal Bilgiler": "#042940",
  "İngilizce": "#DBF227",
};

/* ---- Tipler ---- */

interface StudentStats {
  student_id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  class_level: number;
  total_games: number;
  best_score: number;
  total_time: number;
  total_correct: number;
  total_wrong: number;
  recent_sessions: {
    game_id: string;
    score: number;
    duration_seconds: number;
    completed_at: string;
  }[];
}

/* ---- Yardımcılar ---- */

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}sn`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}dk`;
  const h = Math.floor(m / 60);
  return `${h}s ${m % 60}dk`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return "Bugün";
  if (diffDays === 1) return "Dün";
  return `${diffDays} gün önce`;
}

// Ders bazlı skor hesapla (oyun sessionlarından)
function calcSubjectScores(sessions: StudentStats["recent_sessions"]): Record<Subject, number> {
  const counts: Record<Subject, { total: number; count: number }> = {
    "Türkçe": { total: 0, count: 0 },
    "Matematik": { total: 0, count: 0 },
    "Fen Bilimleri": { total: 0, count: 0 },
    "Sosyal Bilgiler": { total: 0, count: 0 },
    "İngilizce": { total: 0, count: 0 },
  };
  sessions.forEach((s) => {
    const subject = GAME_SUBJECT[s.game_id] as Subject | undefined;
    if (subject && counts[subject]) {
      counts[subject].total += s.score;
      counts[subject].count += 1;
    }
  });
  const result = {} as Record<Subject, number>;
  SUBJECTS.forEach((sub) => {
    const { total, count } = counts[sub];
    // 0-100 arası normalize et (max score ~1000)
    result[sub] = count > 0 ? Math.min(100, Math.round((total / count / 10))) : 0;
  });
  return result;
}

/* ---- FIFA Tarzı Radar (Beşgen) Grafik ---- */

interface RadarChartProps {
  scores: Record<Subject, number>;
}

function RadarChart({ scores }: RadarChartProps) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 85;
  const levels = 5;
  const n = SUBJECTS.length;

  // Her köşe için açı (üstten başla, saat yönünde)
  function angleFor(i: number) {
    return (Math.PI * 2 * i) / n - Math.PI / 2;
  }

  function point(r: number, i: number) {
    const a = angleFor(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  // Arka plan ızgarası
  const gridPolygons = Array.from({ length: levels }, (_, l) => {
    const r = (maxR * (l + 1)) / levels;
    const pts = SUBJECTS.map((_, i) => {
      const p = point(r, i);
      return `${p.x},${p.y}`;
    }).join(" ");
    return pts;
  });

  // Eksen çizgileri
  const axes = SUBJECTS.map((_, i) => {
    const p = point(maxR, i);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  // Veri poligonu
  const dataPoints = SUBJECTS.map((sub, i) => {
    const r = (scores[sub] / 100) * maxR;
    const p = point(r, i);
    return `${p.x},${p.y}`;
  });

  // Etiketler
  const labels = SUBJECTS.map((sub, i) => {
    const r = maxR + 18;
    const p = point(r, i);
    return { sub, x: p.x, y: p.y };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Izgara */}
      {gridPolygons.map((pts, l) => (
        <polygon key={l} points={pts}
          fill={l % 2 === 0 ? "#f0fdf4" : "white"}
          stroke="#e2e8f0" strokeWidth="1" />
      ))}

      {/* Eksenler */}
      {axes.map((ax, i) => (
        <line key={i} x1={ax.x1} y1={ax.y1} x2={ax.x2} y2={ax.y2}
          stroke="#cbd5e1" strokeWidth="1" />
      ))}

      {/* Veri alanı */}
      <polygon
        points={dataPoints.join(" ")}
        fill="#005C53"
        fillOpacity="0.25"
        stroke="#005C53"
        strokeWidth="2"
      />

      {/* Veri noktaları */}
      {SUBJECTS.map((sub, i) => {
        const r = (scores[sub] / 100) * maxR;
        const p = point(r, i);
        return (
          <circle key={i} cx={p.x} cy={p.y} r="4"
            fill="#005C53" stroke="white" strokeWidth="2" />
        );
      })}

      {/* Etiketler */}
      {labels.map(({ sub, x, y }) => {
        const score = scores[sub as Subject];
        const color = SUBJECT_COLORS[sub as Subject];
        return (
          <g key={sub}>
            <text x={x} y={y - 6} textAnchor="middle" fontSize="9" fontWeight="600"
              fill="#042940" dominantBaseline="middle">
              {sub}
            </text>
            <text x={x} y={y + 7} textAnchor="middle" fontSize="10" fontWeight="800"
              fill={color} dominantBaseline="middle">
              {score}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---- Ana sayfa ---- */

export default function ChildDetailPage({ params }: { params: { childId: string } }) {
  const { accessToken } = useAuthStore();
  const [stats, setStats] = useState<StudentStats | null | "loading">("loading");

  useEffect(() => {
    if (!accessToken) return;
    api.get<StudentStats>(`/students/${params.childId}/stats`, accessToken)
      .then(setStats)
      .catch(() => setStats(null));
  }, [accessToken, params.childId]);

  if (stats === "loading") {
    return (
      <div className="container py-8">
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#042940]/30" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container py-8">
        <Link href="/veli/cocuklar" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#042940]/50 hover:text-[#042940]">
          <ArrowLeft className="h-4 w-4" /> Çocuklarıma Dön
        </Link>
        <Card className="border-2 border-dashed border-gray-200 shadow-none">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <AlertCircle className="h-8 w-8 text-[#042940]/30" />
            <p className="font-semibold text-[#042940]">Öğrenci bulunamadı</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const accuracy = stats.total_correct + stats.total_wrong > 0
    ? Math.round((stats.total_correct / (stats.total_correct + stats.total_wrong)) * 100)
    : 0;

  const subjectScores = calcSubjectScores(stats.recent_sessions);

  return (
    <div className="container py-8">
      <Link href="/veli/cocuklar" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#042940]/50 hover:text-[#042940]">
        <ArrowLeft className="h-4 w-4" /> Çocuklarıma Dön
      </Link>

      {/* Profil başlık */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#005C53]/10 text-3xl">
            {AVATAR_EMOJIS[stats.avatar] ?? "🦁"}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#042940]">
              {stats.first_name} {stats.last_name}
            </h1>
            <p className="text-[#042940]/50">{stats.class_level}. Sınıf</p>
          </div>
        </div>
      </motion.div>

      {/* Stat kartları */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Toplam Oyun", value: String(stats.total_games), icon: Gamepad2, color: "bg-[#005C53]/10 text-[#005C53]" },
          { label: "En İyi Skor", value: stats.best_score.toLocaleString("tr-TR"), icon: Trophy, color: "bg-[#9FC131]/10 text-[#9FC131]" },
          { label: "Toplam Süre", value: formatTime(stats.total_time), icon: Clock, color: "bg-[#042940]/10 text-[#042940]" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#042940]">{stat.value}</p>
                  <p className="text-xs text-[#042940]/40">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* ── FIFA Tarzı Radar Grafik ── */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#042940]">Ders Performansı</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center p-6">
              {stats.total_games === 0 ? (
                <div className="py-8 text-center text-sm text-[#042940]/40">
                  <p>Henüz oyun oynamamış.</p>
                  <p className="mt-1">Oynadıkça ders performansı burada görünecek.</p>
                </div>
              ) : (
                <>
                  <RadarChart scores={subjectScores} />
                  {/* Ders efsanesi */}
                  <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 w-full max-w-xs">
                    {SUBJECTS.map((sub) => (
                      <div key={sub} className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: SUBJECT_COLORS[sub] }} />
                        <span className="text-xs text-[#042940]/70">{sub}</span>
                        <span className="ml-auto text-xs font-bold text-[#042940]">{subjectScores[sub]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-[#042940]/30 text-center">
                    Skor 0–100 arası. Daha fazla oyun oyndukça doğruluk artar.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Sağ kolon: Başarı + Son oyunlar ── */}
        <div className="space-y-6">

          {/* Genel doğruluk */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#042940]">Genel Başarı</h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5 space-y-4">
                {stats.total_games === 0 ? (
                  <p className="text-sm text-[#042940]/40 text-center py-4">Henüz oyun oynamamış.</p>
                ) : (
                  <>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-[#042940]">Doğruluk Oranı</span>
                        <span className="font-bold text-[#042940]">%{accuracy}</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-[#9FC131] transition-all"
                          style={{ width: `${accuracy}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-[#042940]/40">
                        {stats.total_correct} doğru · {stats.total_wrong} yanlış
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#005C53]/5 p-4 text-center">
                      <p className="text-3xl font-extrabold text-[#005C53]">{stats.best_score}</p>
                      <p className="text-xs text-[#042940]/40 mt-1">En yüksek skor</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Son oyunlar */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#042940]">Son Oyunlar</h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                {stats.recent_sessions.length === 0 ? (
                  <div className="p-6 text-center text-sm text-[#042940]/40">Henüz oyun oynamadı.</div>
                ) : (
                  stats.recent_sessions.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 border-b border-[#042940]/5 px-5 py-3.5 last:border-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#005C53]/10">
                        <TrendingUp className="h-4 w-4 text-[#005C53]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#042940]">
                          {GAME_NAMES[s.game_id] || s.game_id}
                        </p>
                        <p className="text-xs text-[#042940]/40">
                          {formatDate(s.completed_at)} · {formatTime(s.duration_seconds)}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-[#042940]">{s.score}</span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
