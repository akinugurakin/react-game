"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";

export default function ParentApprovalPendingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const hydrated = useAuthHydrated();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-[#042940]/[0.02] px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Lightbulb className="h-10 w-10 text-brand-dark" />
            <div>
              <span className="text-2xl font-extrabold text-brand-dark">LUMO</span>
              <p className="text-[9px] font-normal text-brand-dark/40">Eğitsel Oyun Platformu</p>
            </div>
          </Link>
        </div>

        {/* Ana Kart */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            {/* İkon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#DBF227]/20"
            >
              <Mail className="h-10 w-10 text-[#005C53]" />
            </motion.div>

            <h1 className="text-2xl font-extrabold text-[#042940]">
              Ebeveyn Onayı Bekleniyor
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#042940]/50">
              Hesabın neredeyse hazır! Ebeveynine bir onay e-postası gönderdik.
              Ebeveynin e-postadaki bağlantıya tıkladığında hesabın aktif olacak.
            </p>

            {/* Durum Bilgisi */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-[#005C53]/5 p-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9FC131]" />
                <span className="text-left text-sm text-[#042940]/70">
                  Hesabın oluşturuldu
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-[#005C53]/5 p-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9FC131]" />
                <span className="text-left text-sm text-[#042940]/70">
                  Ebeveynine onay e-postası gönderildi
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-[#DBF227]/10 p-3">
                <Clock className="h-5 w-5 shrink-0 text-[#005C53] animate-pulse" />
                <span className="text-left text-sm font-medium text-[#042940]/70">
                  Ebeveyn onayı bekleniyor...
                </span>
              </div>
            </div>

            {/* Bilgi Notu */}
            <div className="mt-6 rounded-xl bg-[#042940]/[0.03] p-4">
              <p className="text-xs leading-relaxed text-[#042940]/50">
                E-posta gelmedi mi? Spam/önemsiz klasörünü kontrol edin.
                Sorun devam ederse aşağıdaki butona tıklayarak tekrar gönderebilirsiniz.
              </p>
            </div>

            {/* Aksiyonlar */}
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // TODO: Backend hazır olduğunda tekrar gönderme API'si
                  alert("Onay e-postası tekrar gönderildi!");
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Onay E-postasını Tekrar Gönder
              </Button>

              {process.env.NODE_ENV === "development" && (
                <Button
                  className="w-full bg-[#9FC131] text-white hover:bg-[#9FC131]/90"
                  onClick={() => router.push("/profil-sec")}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  (DEV) Profil Seçimine Git
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Alt Bilgi */}
        <p className="mt-6 text-center text-xs text-[#042940]/30">
          Yardıma mı ihtiyacınız var?{" "}
          <a href="mailto:destek@lumo.com.tr" className="font-medium text-[#005C53] hover:underline">
            destek@lumo.com.tr
          </a>
        </p>
      </motion.div>
    </div>
  );
}
