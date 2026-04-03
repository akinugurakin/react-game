"use client";

import { motion } from "framer-motion";
import { CreditCard, Check, ArrowRight, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CURRENT_PLAN = {
  name: "Yıllık Plan",
  price: 300,
  status: "active" as const,
  renewDate: "15 Ocak 2027",
  childrenCount: 2,
};

const PAYMENT_HISTORY = [
  { date: "15 Oca 2026", amount: "3.600 ₺", status: "Ödendi", plan: "Yıllık Plan" },
  { date: "15 Oca 2025", amount: "3.600 ₺", status: "Ödendi", plan: "Yıllık Plan" },
];

export default function AbonelikPage() {
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
        <Card className="mb-6 border-0 bg-gradient-to-r from-[#042940] to-[#005C53] shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[#DBF227] px-3 py-0.5 text-xs font-bold text-[#042940]">Aktif</span>
                  <span className="text-lg font-bold text-white">{CURRENT_PLAN.name}</span>
                </div>
                <div className="flex gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Yenileme: {CURRENT_PLAN.renewDate}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{CURRENT_PLAN.childrenCount} çocuk</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-white">{CURRENT_PLAN.price} ₺<span className="text-base font-normal text-white/40">/ay</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Aksiyonlar */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <Button asChild variant="outline" className="py-6">
          <Link href="/ucretlendirme">
            Plan Değiştir <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" className="py-6 text-[#E8634A] border-[#E8634A]/20 hover:bg-[#E8634A]/5">
          Aboneliği İptal Et
        </Button>
      </div>

      {/* Ödeme Geçmişi */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <h2 className="mb-4 text-lg font-bold text-[#042940]">Ödeme Geçmişi</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-4 gap-4 border-b border-[#042940]/5 px-5 py-3 text-xs font-semibold text-[#042940]/40">
              <span>Tarih</span>
              <span>Plan</span>
              <span>Tutar</span>
              <span>Durum</span>
            </div>
            {PAYMENT_HISTORY.map((p, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 border-b border-[#042940]/5 px-5 py-3.5 text-sm last:border-0">
                <span className="text-[#042940]/60">{p.date}</span>
                <span className="text-[#042940]/60">{p.plan}</span>
                <span className="font-medium text-[#042940]">{p.amount}</span>
                <span className="flex items-center gap-1 text-[#9FC131]">
                  <Check className="h-3.5 w-3.5" /> {p.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
