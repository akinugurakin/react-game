"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BarChart3, Gamepad2, Trophy, Clock, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

interface StudentProfile {
  id: number;
  first_name: string;
}

interface DayData {
  date: string;
  games: number;
  time: number;
  score: number;
}

interface ActivityData {
  period: string;
  days: number;
  daily: DayData[];
  summary: {
    total_games: number;
    total_time: number;
    avg_score: number;
  };
}

const DAY_LABELS_TR = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

function dayLabel(dateStr: string, period: "weekly" | "monthly"): string {
  const d = new Date(dateStr);
  if (period === "weekly") return DAY_LABELS_TR[d.getUTCDay()];
  return String(d.getUTCDate());
}

export default function RaporlarPage() {
  const { accessToken } = useAuthStore();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(false);

  // Öğrencileri yükle
  useEffect(() => {
    if (!accessToken) return;
    api.get<StudentProfile[]>("/students", accessToken)
      .then((data) => {
        setStudents(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => {});
  }, [accessToken]);

  // Aktivite verisini yükle
  const loadActivity = useCallback(async () => {
    if (!accessToken || !selectedId) return;
    setLoading(true);
    try {
      const data = await api.get<ActivityData>(
        `/students/${selectedId}/activity?period=${period}`,
        accessToken
      );
      setActivity(data);
    } catch {
      setActivity(null);
    } finally {
      setLoading(false);
    }
  }, [accessToken, selectedId, period]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const daily = activity?.daily ?? [];
  const summary = activity?.summary ?? { total_games: 0, total_time: 0, avg_score: 0 };
  const maxGames = Math.max(...daily.map((d) => d.games), 1);

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <BarChart3 className="h-5 w-5 text-[#005C53]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#042940]">Raporlar</h1>
        </div>
        <p className="text-[#042940]/50 ml-[52px]">
          Çocuğunuzun haftalık ve aylık ilerleme raporları
        </p>
      </motion.div>

      {/* Filtreler */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {students.length > 0 && (
          <div className="flex rounded-xl bg-white p-1 shadow-sm">
            {students.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  selectedId === s.id
                    ? "bg-[#042940] text-white"
                    : "text-[#042940]/50 hover:text-[#042940]"
                )}
              >
                {s.first_name}
              </button>
            ))}
          </div>
        )}
        <div className="flex rounded-xl bg-white p-1 shadow-sm">
          <button
            onClick={() => setPeriod("weekly")}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              period === "weekly"
                ? "bg-[#005C53] text-white"
                : "text-[#042940]/50 hover:text-[#042940]"
            )}
          >
            Haftalık
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              period === "monthly"
                ? "bg-[#005C53] text-white"
                : "text-[#042940]/50 hover:text-[#042940]"
            )}
          >
            Aylık
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#005C53]" />
        </div>
      ) : (
        <>
          {/* Özet Kartlar */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            {[
              {
                label: "Toplam Oyun",
                value: summary.total_games.toString(),
                icon: Gamepad2,
                color: "bg-[#005C53]/10 text-[#005C53]",
              },
              {
                label: "Ortalama Başarı",
                value: summary.avg_score > 0 ? `%${summary.avg_score}` : "—",
                icon: Trophy,
                color: "bg-[#9FC131]/10 text-[#9FC131]",
              },
              {
                label: "Toplam Süre",
                value: `${summary.total_time} dk`,
                icon: Clock,
                color: "bg-[#042940]/10 text-[#042940]",
              },
            ].map((stat) => (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="flex items-center gap-3 p-5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-[#042940]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#042940]/40">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Günlük Aktivite Grafiği */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h2 className="mb-6 text-lg font-bold text-[#042940]">
                Günlük Aktivite
              </h2>

              {summary.total_games === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Gamepad2 className="h-10 w-10 text-[#042940]/20 mb-3" />
                  <p className="text-sm text-[#042940]/40">
                    Bu dönemde henüz oyun oynanmamış.
                  </p>
                </div>
              ) : (
                <div
                  className="flex items-end gap-1 overflow-x-auto pb-2"
                  style={{ height: 200 }}
                >
                  {daily.map((d) => (
                    <div
                      key={d.date}
                      className="flex flex-1 min-w-[28px] flex-col items-center gap-2"
                    >
                      <div className="relative w-full flex justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height: `${(d.games / maxGames) * 148}px`,
                          }}
                          transition={{ duration: 0.4, delay: 0.05 }}
                          className={cn(
                            "w-7 rounded-t-lg",
                            d.games > 0 ? "bg-[#005C53]" : "bg-[#042940]/10"
                          )}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-[#042940]/40">
                        {dayLabel(d.date, period)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
