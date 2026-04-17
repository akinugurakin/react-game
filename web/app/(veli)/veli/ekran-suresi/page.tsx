"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

const AVATAR_EMOJIS: Record<string, string> = {
  avatar_1: "🦁", avatar_2: "🐯", avatar_3: "🦊", avatar_4: "🐧",
  avatar_5: "🦋", avatar_6: "🐬", avatar_7: "🦄", avatar_8: "🐸",
  avatar_9: "🐼", avatar_10: "🦉", avatar_11: "🐙", avatar_12: "🦕",
};

const LIMIT_OPTIONS = [30, 45, 60, 90, 120, 180, 240];

interface ChildScreenTime {
  id: number;
  first_name: string;
  avatar: string;
  daily_limit_minutes: number;
  screen_time_enabled: boolean;
  today_used_minutes: number;
}

export default function EkranSuresiPage() {
  const { accessToken } = useAuthStore();
  const [children, setChildren] = useState<ChildScreenTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState<Record<number, Partial<ChildScreenTime>>>({});

  useEffect(() => {
    if (!accessToken) return;
    api.get<ChildScreenTime[]>("/students/screen-time", accessToken)
      .then(setChildren)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [accessToken]);

  const updateLocal = (id: number, updates: Partial<ChildScreenTime>) => {
    setChildren((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    setDirty((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), ...updates } }));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!accessToken) return;
    setSaving(true);
    try {
      await Promise.all(
        Object.entries(dirty).map(([id, updates]) =>
          api.patch(`/students/${id}/screen-time`, updates, accessToken)
        )
      );
      setDirty({});
      setSaved(true);
    } catch {
      // sessizce geç
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#005C53]" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8634A]/10">
            <Clock className="h-5 w-5 text-[#E8634A]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#042940]">Ekran Süresi</h1>
        </div>
        <p className="text-[#042940]/50 ml-[52px]">
          Günlük oyun süresi limitlerini ayarlayın
        </p>
      </motion.div>

      {children.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Clock className="h-10 w-10 text-[#042940]/20 mb-3" />
            <p className="text-sm text-[#042940]/40">
              Henüz çocuk profili eklenmemiş.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {children.map((child, i) => {
              const usagePercent = Math.min(
                100,
                child.daily_limit_minutes > 0
                  ? Math.round((child.today_used_minutes / child.daily_limit_minutes) * 100)
                  : 0
              );
              return (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#005C53]/10 text-xl">
                            {AVATAR_EMOJIS[child.avatar] ?? "🦁"}
                          </div>
                          <div>
                            <p className="font-bold text-[#042940]">
                              {child.first_name}
                            </p>
                            <p className="text-xs text-[#042940]/40">
                              Bugün: {child.today_used_minutes} / {child.daily_limit_minutes} dk
                            </p>
                          </div>
                        </div>
                        {/* Toggle */}
                        <button
                          onClick={() =>
                            updateLocal(child.id, {
                              screen_time_enabled: !child.screen_time_enabled,
                            })
                          }
                          className={cn(
                            "relative h-7 w-12 rounded-full transition-colors",
                            child.screen_time_enabled
                              ? "bg-[#005C53]"
                              : "bg-[#042940]/15"
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
                              child.screen_time_enabled
                                ? "translate-x-5"
                                : "translate-x-0.5"
                            )}
                          />
                        </button>
                      </div>

                      {/* Bugünkü kullanım */}
                      <div className="mb-5">
                        <div className="mb-1.5 flex items-center justify-between text-xs text-[#042940]/40">
                          <span>Bugünkü kullanım</span>
                          <span
                            className={cn(
                              "font-bold",
                              usagePercent > 80
                                ? "text-[#E8634A]"
                                : "text-[#042940]"
                            )}
                          >
                            %{usagePercent}
                          </span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              usagePercent > 80
                                ? "bg-[#E8634A]"
                                : "bg-[#005C53]"
                            )}
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Limit seçimi */}
                      {child.screen_time_enabled && (
                        <div>
                          <p className="mb-2 text-xs font-medium text-[#042940]/50">
                            Günlük Limit
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {LIMIT_OPTIONS.map((limit) => (
                              <button
                                key={limit}
                                onClick={() =>
                                  updateLocal(child.id, {
                                    daily_limit_minutes: limit,
                                  })
                                }
                                className={cn(
                                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                                  child.daily_limit_minutes === limit
                                    ? "bg-[#005C53] text-white"
                                    : "bg-[#042940]/5 text-[#042940]/60 hover:bg-[#042940]/10"
                                )}
                              >
                                {limit >= 60
                                  ? `${limit / 60} saat`
                                  : `${limit} dk`}
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Button
              onClick={handleSave}
              disabled={saving || Object.keys(dirty).length === 0}
              className="w-full bg-[#005C53] py-6 text-base hover:bg-[#005C53]/90 disabled:opacity-50"
            >
              {saving
                ? "Kaydediliyor..."
                : saved
                  ? "Kaydedildi ✓"
                  : "Değişiklikleri Kaydet"}
            </Button>
          </motion.div>
        </>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#005C53]/5 p-4">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#005C53]" />
        <p className="text-xs leading-relaxed text-[#042940]/50">
          Ekran süresi limiti dolduğunda çocuğunuz yeni oyun başlatamaz. Devam
          eden oyun tamamlanabilir. Limitler her gün gece yarısı sıfırlanır.
        </p>
      </div>
    </div>
  );
}
