"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, ArrowRight, Calendar, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

interface Subscription {
  id: number;
  plan_type: "monthly" | "yearly";
  status: "trial" | "active" | "cancelled" | "past_due" | "expired";
  trial_start: string | null;
  trial_end: string | null;
  current_period_end: string | null;
  auto_renew: boolean;
  is_active: boolean;
}

const PLAN_LABELS: Record<string, string> = {
  monthly: "Aylık Plan",
  yearly: "Yıllık Plan",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  trial: { label: "Deneme Süresi", color: "bg-[#DBF227] text-[#042940]" },
  active: { label: "Aktif", color: "bg-[#9FC131]/20 text-[#9FC131]" },
  cancelled: { label: "İptal Edildi", color: "bg-gray-100 text-gray-500" },
  past_due: { label: "Ödeme Başarısız", color: "bg-[#E8634A]/10 text-[#E8634A]" },
  expired: { label: "Sona Erdi", color: "bg-gray-100 text-gray-500" },
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function AbonelikPage() {
  const { accessToken } = useAuthStore();
  const [sub, setSub] = useState<Subscription | null | "loading">("loading");
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;
    api.get<Subscription | null>("/payments/subscription", accessToken)
      .then(setSub)
      .catch(() => setSub(null));
  }, [accessToken]);

  const handleCancel = async () => {
    if (!confirm("Aboneliğinizi iptal etmek istediğinizden emin misiniz? Mevcut dönem sonuna kadar erişiminiz devam eder.")) return;
    setCancelLoading(true);
    // Stripe müşteri portalı — şimdilik ücretlendirme sayfasına yönlendir
    window.location.href = "/ucretlendirme";
  };

  return (
    <div className="container max-w-3xl py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <CreditCard className="h-5 w-5 text-[#005C53]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#042940]">Abonelik</h1>
        </div>
        <p className="text-[#042940]/50 ml-[52px]">Plan ve ödeme bilgilerinizi yönetin</p>
      </motion.div>

      {/* Mevcut Plan */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        {sub === "loading" ? (
          <div className="mb-6 h-32 animate-pulse rounded-2xl bg-gray-100" />
        ) : !sub ? (
          <Card className="mb-6 border-2 border-dashed border-gray-200 shadow-none">
            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
              <AlertCircle className="h-8 w-8 text-[#042940]/30" />
              <p className="font-semibold text-[#042940]">Aktif abonelik bulunamadı</p>
              <p className="text-sm text-[#042940]/50">Oyunlara erişmek için bir plan seçin.</p>
              <Button asChild className="mt-2 bg-[#005C53] hover:bg-[#005C53]/90">
                <Link href="/ucretlendirme">Plan Seç</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-6 border-0 bg-gradient-to-r from-[#042940] to-[#005C53] shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${STATUS_LABELS[sub.status]?.color}`}>
                        {STATUS_LABELS[sub.status]?.label}
                      </span>
                      <span className="text-lg font-bold text-white">
                        {PLAN_LABELS[sub.plan_type]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-white/50">
                      {sub.status === "trial" && sub.trial_end && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Deneme bitiş: {formatDate(sub.trial_end)}
                        </span>
                      )}
                      {sub.status === "active" && sub.current_period_end && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Yenileme: {formatDate(sub.current_period_end)}
                        </span>
                      )}
                      {!sub.auto_renew && (
                        <span className="text-[#E8634A]/70">Otomatik yenileme kapalı</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-white">
                      {sub.plan_type === "monthly" ? "450" : "300"}
                      <span className="text-base font-normal text-white/40"> ₺/ay</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aksiyonlar */}
            <div className="mb-8 flex gap-4">
              <Button asChild variant="outline" className="flex-1 py-6">
                <Link href="/ucretlendirme">
                  Plan Değiştir <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {sub.is_active && (
                <Button
                  variant="outline"
                  className="flex-1 py-6 text-[#E8634A] border-[#E8634A]/20 hover:bg-[#E8634A]/5"
                  onClick={handleCancel}
                  disabled={cancelLoading}
                >
                  {cancelLoading ? "İşleniyor..." : "Aboneliği İptal Et"}
                </Button>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Ödeme Geçmişi — Stripe entegrasyonu sonrası */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <h2 className="mb-4 text-lg font-bold text-[#042940]">Ödeme Geçmişi</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center text-[#042940]/40">
            <Check className="h-6 w-6" />
            <p className="text-sm">Ödeme geçmişi Stripe portalından görüntülenebilir.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
