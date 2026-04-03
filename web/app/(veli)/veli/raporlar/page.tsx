"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, Download, Gamepad2, Trophy, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHILDREN = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Zeynep" },
];

const WEEKLY_DATA = [
  { day: "Pzt", games: 3, time: 25, score: 82 },
  { day: "Sal", games: 2, time: 18, score: 75 },
  { day: "Çar", games: 4, time: 35, score: 88 },
  { day: "Per", games: 1, time: 10, score: 70 },
  { day: "Cum", games: 3, time: 28, score: 85 },
  { day: "Cmt", games: 5, time: 45, score: 90 },
  { day: "Paz", games: 2, time: 20, score: 78 },
];

export default function RaporlarPage() {
  const [selectedChild, setSelectedChild] = useState(1);
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const maxGames = Math.max(...WEEKLY_DATA.map((d) => d.games));

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <BarChart3 className="h-5 w-5 text-[#005C53]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#042940]">Raporlar</h1>
        </div>
        <p className="text-[#042940]/50 ml-[52px]">Çocuğunuzun haftalık ve aylık ilerleme raporları</p>
      </motion.div>

      {/* Filtreler */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl bg-white p-1 shadow-sm">
          {CHILDREN.map((c) => (
            <button key={c.id} onClick={() => setSelectedChild(c.id)} className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-all", selectedChild === c.id ? "bg-[#042940] text-white" : "text-[#042940]/50 hover:text-[#042940]")}>{c.name}</button>
          ))}
        </div>
        <div className="flex rounded-xl bg-white p-1 shadow-sm">
          <button onClick={() => setPeriod("weekly")} className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-all", period === "weekly" ? "bg-[#005C53] text-white" : "text-[#042940]/50 hover:text-[#042940]")}>Haftalık</button>
          <button onClick={() => setPeriod("monthly")} className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-all", period === "monthly" ? "bg-[#005C53] text-white" : "text-[#042940]/50 hover:text-[#042940]")}>Aylık</button>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="mr-2 h-4 w-4" /> Rapor İndir
        </Button>
      </div>

      {/* Özet Kartlar */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Toplam Oyun", value: WEEKLY_DATA.reduce((s, d) => s + d.games, 0).toString(), icon: Gamepad2, color: "bg-[#005C53]/10 text-[#005C53]" },
          { label: "Ortalama Başarı", value: `%${Math.round(WEEKLY_DATA.reduce((s, d) => s + d.score, 0) / WEEKLY_DATA.length)}`, icon: Trophy, color: "bg-[#9FC131]/10 text-[#9FC131]" },
          { label: "Toplam Süre", value: `${WEEKLY_DATA.reduce((s, d) => s + d.time, 0)} dk`, icon: Clock, color: "bg-[#042940]/10 text-[#042940]" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-3 p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-2xl font-extrabold text-[#042940]">{stat.value}</p>
                <p className="text-xs text-[#042940]/40">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Günlük Aktivite Grafiği */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h2 className="mb-6 text-lg font-bold text-[#042940]">Günlük Aktivite</h2>
          <div className="flex items-end justify-between gap-3" style={{ height: 180 }}>
            {WEEKLY_DATA.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full flex justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.games / maxGames) * 140}px` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-8 rounded-t-lg bg-[#005C53]"
                  />
                </div>
                <span className="text-xs font-medium text-[#042940]/50">{d.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
