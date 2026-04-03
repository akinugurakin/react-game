"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChildSettings {
  id: number;
  name: string;
  avatar: string;
  dailyLimit: number;
  todayUsed: number;
  enabled: boolean;
}

const initialSettings: ChildSettings[] = [
  { id: 1, name: "Ali", avatar: "AL", dailyLimit: 60, todayUsed: 35, enabled: true },
  { id: 2, name: "Zeynep", avatar: "ZE", dailyLimit: 45, todayUsed: 20, enabled: true },
];

const LIMIT_OPTIONS = [30, 45, 60, 90, 120, 180, 240];

export default function EkranSuresiPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const updateChild = (id: number, updates: Partial<ChildSettings>) => {
    setSettings((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    setSaved(false);
  };

  return (
    <div className="container max-w-2xl py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8634A]/10">
            <Clock className="h-5 w-5 text-[#E8634A]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#042940]">Ekran Süresi</h1>
        </div>
        <p className="text-[#042940]/50 ml-[52px]">Günlük oyun süresi limitlerini ayarlayın</p>
      </motion.div>

      <div className="space-y-4">
        {settings.map((child, i) => {
          const usagePercent = Math.min(100, Math.round((child.todayUsed / child.dailyLimit) * 100));
          return (
            <motion.div key={child.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#005C53]/10 text-sm font-bold text-[#005C53]">{child.avatar}</div>
                      <div>
                        <p className="font-bold text-[#042940]">{child.name}</p>
                        <p className="text-xs text-[#042940]/40">Bugün: {child.todayUsed} / {child.dailyLimit} dk</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateChild(child.id, { enabled: !child.enabled })}
                      className={cn(
                        "relative h-7 w-12 rounded-full transition-colors",
                        child.enabled ? "bg-[#005C53]" : "bg-[#042940]/15"
                      )}
                    >
                      <span className={cn(
                        "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
                        child.enabled ? "translate-x-5" : "translate-x-0.5"
                      )} />
                    </button>
                  </div>

                  {/* Bugünkü kullanım */}
                  <div className="mb-5">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-[#042940]/40">
                      <span>Bugünkü kullanım</span>
                      <span className="font-bold text-[#042940]">%{usagePercent}</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all", usagePercent > 80 ? "bg-[#E8634A]" : "bg-[#005C53]")}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Limit seçimi */}
                  {child.enabled && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-[#042940]/50">Günlük Limit</p>
                      <div className="flex flex-wrap gap-2">
                        {LIMIT_OPTIONS.map((limit) => (
                          <button
                            key={limit}
                            onClick={() => updateChild(child.id, { dailyLimit: limit })}
                            className={cn(
                              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                              child.dailyLimit === limit
                                ? "bg-[#005C53] text-white"
                                : "bg-[#042940]/5 text-[#042940]/60 hover:bg-[#042940]/10"
                            )}
                          >
                            {limit >= 60 ? `${limit / 60} saat` : `${limit} dk`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6">
        <Button
          onClick={() => setSaved(true)}
          className="w-full bg-[#005C53] py-6 text-base hover:bg-[#005C53]/90"
        >
          {saved ? "Kaydedildi ✓" : "Değişiklikleri Kaydet"}
        </Button>
      </motion.div>

      <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#005C53]/5 p-4">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#005C53]" />
        <p className="text-xs leading-relaxed text-[#042940]/50">
          Ekran süresi limiti dolduğunda çocuğunuz yeni oyun başlatamaz. Devam eden oyun tamamlanabilir. Limitler her gün gece yarısı sıfırlanır.
        </p>
      </div>
    </div>
  );
}
