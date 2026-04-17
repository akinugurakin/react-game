"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";
import { Lightbulb, Crown, Sparkles, Check, Shield, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Fiyat hesaplama                                                    */
/* ------------------------------------------------------------------ */
const PRICES = {
  monthly: { base: 450, label: "Aylık Plan", period: "ay" },
  yearly: { base: 300, label: "Yıllık Plan", period: "ay" },
};

const CHILD_DISCOUNTS = [1, 0.5, 0.25]; // 1., 2., 3. çocuk

function calculatePrice(plan: "monthly" | "yearly", childCount: number) {
  const base = PRICES[plan].base;
  let total = 0;
  for (let i = 0; i < childCount; i++) {
    const discount = CHILD_DISCOUNTS[Math.min(i, CHILD_DISCOUNTS.length - 1)];
    total += base * discount;
  }
  return Math.round(total);
}

function getChildBreakdown(plan: "monthly" | "yearly", childCount: number) {
  const base = PRICES[plan].base;
  const items = [];
  for (let i = 0; i < childCount; i++) {
    const discount = CHILD_DISCOUNTS[Math.min(i, CHILD_DISCOUNTS.length - 1)];
    const price = Math.round(base * discount);
    const label =
      i === 0
        ? "1. Çocuk"
        : i === 1
          ? "2. Çocuk (%50 indirim)"
          : `${i + 1}. Çocuk (%75 indirim)`;
    items.push({ label, price });
  }
  return items;
}

function OnboardingContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const initialPlan = planParam === "monthly" ? "monthly" : "yearly";

  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [plan, setPlan] = useState<"monthly" | "yearly">(initialPlan);
  const [childCount, setChildCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const monthlyTotal = calculatePrice(plan, childCount);
  const breakdown = getChildBreakdown(plan, childCount);
  const planInfo = PRICES[plan];

  /* ---- Plan seçildi → Stripe Checkout'a yönlendir ---- */
  const handleCheckout = async () => {
    if (!accessToken) {
      window.location.href = "/login";
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await api.post<{ checkout_url: string }>(
        "/payments/create-checkout-session",
        { plan_type: plan },
        accessToken
      );
      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-10 w-10 text-brand-dark" />
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">LUMO</span>
            <p className="text-[9px] font-normal text-brand-dark/40">Eğitsel Oyun Platformu</p>
          </div>
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  Plan + Çocuk Sayısı                               */}
      {/* ═══════════════════════════════════════════════════ */}
      {(
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-[#042940]">Planınızı Seçin</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              7 gün ücretsiz deneyin, memnun kalmazsanız iptal edin
            </p>
          </div>

          {/* Plan seçimi */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPlan("monthly")}
              className={cn(
                "rounded-2xl border-2 p-4 text-left transition-all",
                plan === "monthly"
                  ? "border-[#005C53] bg-[#005C53]/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <Sparkles className={cn("h-5 w-5 mb-2", plan === "monthly" ? "text-[#005C53]" : "text-gray-400")} />
              <p className="font-bold text-[#042940]">Aylık</p>
              <p className="text-xl font-extrabold text-[#042940]">450 <span className="text-sm font-normal text-[#042940]/40">₺/ay</span></p>
            </button>
            <button
              onClick={() => setPlan("yearly")}
              className={cn(
                "relative rounded-2xl border-2 p-4 text-left transition-all",
                plan === "yearly"
                  ? "border-[#005C53] bg-[#005C53]/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              {plan === "yearly" && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-[#DBF227] px-2 py-0.5 text-[10px] font-bold text-[#042940]">
                  %33 tasarruf
                </span>
              )}
              <Crown className={cn("h-5 w-5 mb-2", plan === "yearly" ? "text-[#005C53]" : "text-gray-400")} />
              <p className="font-bold text-[#042940]">Yıllık</p>
              <p className="text-xl font-extrabold text-[#042940]">300 <span className="text-sm font-normal text-[#042940]/40">₺/ay</span></p>
            </button>
          </div>

          {/* Çocuk sayısı */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#042940]">Çocuk Sayısı</p>
                <p className="text-xs text-muted-foreground">Her ek çocukta indirim uygulanır</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChildCount(Math.max(1, childCount - 1))}
                  disabled={childCount <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border bg-gray-50 transition-colors hover:bg-gray-100 disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-xl font-extrabold text-[#042940]">{childCount}</span>
                <button
                  onClick={() => setChildCount(Math.min(5, childCount + 1))}
                  disabled={childCount >= 5}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border bg-gray-50 transition-colors hover:bg-gray-100 disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Fiyat detayı */}
            {childCount > 1 && (
              <div className="mt-4 space-y-2 border-t pt-4">
                {breakdown.map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-[#042940]/60">{item.label}</span>
                    <span className="font-semibold text-[#042940]">{item.price} ₺/ay</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Toplam */}
          <div className="rounded-2xl bg-[#042940] p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Bugün ödenecek</p>
                <p className="text-2xl font-extrabold">0 ₺</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">7 gün sonra</p>
                <p className="text-2xl font-extrabold">{monthlyTotal} ₺<span className="text-sm font-normal text-white/40">/{planInfo.period}</span></p>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Deneme süresi içinde iptal ederseniz hiçbir ücret alınmaz.
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive text-center">
              {error}
            </div>
          )}

          <Button
            onClick={handleCheckout}
            className="w-full py-6 text-base font-bold"
            size="lg"
            disabled={loading}
          >
            {loading ? "Yönlendiriliyor..." : "Güvenli Ödemeye Geç →"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Stripe ile güvenli ödeme. Kart bilgileriniz Lumo sunucularında saklanmaz.
          </p>

          <div className="text-center">
            <button
              onClick={() => router.push("/profil-sec")}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline transition-colors"
            >
              Şimdilik ücretsiz oyunlarla devam et
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function OnboardingPaymentPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><p className="text-muted-foreground">Yükleniyor...</p></div>}>
      <OnboardingContent />
    </Suspense>
  );
}
