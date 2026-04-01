"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  Lightbulb,
  UserCheck,
  Eye,
  Trash2,
  Ban,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ApprovalState = "review" | "approved" | "rejected" | "error";

const PARENT_RIGHTS = [
  {
    icon: Eye,
    title: "Verileri görüntüleme",
    desc: "Çocuğunuzun hesap verilerini istediğiniz zaman inceleyebilirsiniz.",
  },
  {
    icon: Trash2,
    title: "Verileri silme",
    desc: "Çocuğunuzun tüm verilerinin silinmesini talep edebilirsiniz.",
  },
  {
    icon: Ban,
    title: "Onayı geri çekme",
    desc: "Verdiğiniz onayı istediğiniz zaman geri çekebilirsiniz. Hesap devre dışı kalır.",
  },
];

const DATA_COLLECTED = [
  "Kullanıcı adı (takma ad)",
  "Sınıf düzeyi",
  "Oyun skorları ve ilerleme verileri",
  "Oturum süreleri",
];

const DATA_NOT_COLLECTED = [
  "Gerçek konum bilgisi",
  "Fotoğraf veya video",
  "Davranışsal reklam verileri",
  "Üçüncü taraf sosyal medya verileri",
];

export default function ParentApprovalPage() {
  const params = useParams();
  const token = params.token as string;
  const [state, setState] = useState<ApprovalState>("review");
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!consentChecked) return;
    setLoading(true);
    try {
      // TODO: Backend hazır olduğunda gerçek API'ye bağlanacak
      // await api.post(`/auth/parent-approval/${token}/approve`);
      await new Promise((r) => setTimeout(r, 1500));
      setState("approved");
    } catch {
      setState("error");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      // TODO: Backend hazır olduğunda gerçek API'ye bağlanacak
      // await api.post(`/auth/parent-approval/${token}/reject`);
      await new Promise((r) => setTimeout(r, 1000));
      setState("rejected");
    } catch {
      setState("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#042940]/[0.02] px-4 py-12">
      <div className="mx-auto max-w-2xl">
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

        {/* Onay İnceleme */}
        {state === "review" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Başlık */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#005C53]/10">
                <Shield className="h-8 w-8 text-[#005C53]" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#042940]">
                Ebeveyn Onay Formu
              </h1>
              <p className="mt-2 text-sm text-[#042940]/50">
                Çocuğunuz LUMO platformuna kayıt olmak istiyor.
                Lütfen aşağıdaki bilgileri inceleyip onaylayın.
              </p>
            </div>

            {/* Toplanan Veriler */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#042940]/70">
                  Toplanacak Veriler
                </h2>
                <div className="space-y-2">
                  {DATA_COLLECTED.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#9FC131]" />
                      <span className="text-sm text-[#042940]/60">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Toplanmayan Veriler */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#042940]/70">
                  Toplanmayacak Veriler
                </h2>
                <div className="space-y-2">
                  {DATA_NOT_COLLECTED.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span className="text-sm text-[#042940]/60">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ebeveyn Hakları */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#042940]/70">
                  Ebeveyn Olarak Haklarınız
                </h2>
                <div className="space-y-4">
                  {PARENT_RIGHTS.map((right) => (
                    <div key={right.title} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#005C53]/10">
                        <right.icon className="h-4 w-4 text-[#005C53]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#042940]">{right.title}</p>
                        <p className="text-xs text-[#042940]/50">{right.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detaylı Politikalar */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <Link
                href="/gizlilik-politikasi"
                target="_blank"
                className="rounded-full border border-[#042940]/10 px-4 py-1.5 text-[#042940]/50 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kvkk"
                target="_blank"
                className="rounded-full border border-[#042940]/10 px-4 py-1.5 text-[#042940]/50 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
              >
                KVKK Aydınlatma Metni
              </Link>
              <Link
                href="/kullanim-kosullari"
                target="_blank"
                className="rounded-full border border-[#042940]/10 px-4 py-1.5 text-[#042940]/50 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
              >
                Kullanım Koşulları
              </Link>
            </div>

            {/* Onay Checkbox + Butonlar */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-gray-300 text-[#005C53] focus:ring-[#005C53]"
                  />
                  <span className="text-sm leading-relaxed text-[#042940]/70">
                    Çocuğumun LUMO platformunu kullanmasını ve yukarıda belirtilen kişisel
                    verilerinin işlenmesini onaylıyorum. Gizlilik Politikası, KVKK Aydınlatma
                    Metni ve Kullanım Koşulları'nı okudum ve kabul ediyorum.
                  </span>
                </label>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="flex-1 bg-[#005C53] hover:bg-[#005C53]/90"
                    size="lg"
                    disabled={!consentChecked || loading}
                    onClick={handleApprove}
                  >
                    {loading ? (
                      "İşleniyor..."
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Onaylıyorum
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={loading}
                    onClick={handleReject}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Onaylamıyorum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Onaylandı */}
        {state === "approved" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#9FC131]/20">
                  <CheckCircle2 className="h-10 w-10 text-[#9FC131]" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#042940]">
                  Onay Başarılı!
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#042940]/50">
                  Çocuğunuzun hesabı aktif edildi. Artık LUMO platformunu kullanarak
                  eğlenceli oyunlarla öğrenmeye başlayabilir.
                </p>
                <div className="mt-6 rounded-xl bg-[#005C53]/5 p-4">
                  <p className="text-xs text-[#042940]/50">
                    Onayınızı istediğiniz zaman geri çekebilirsiniz.
                    Bunun için kvkk@lumo.com.tr adresine e-posta gönderebilir veya
                    ebeveyn kontrol panelini kullanabilirsiniz.
                  </p>
                </div>
                <Button
                  asChild
                  className="mt-6 bg-[#005C53] hover:bg-[#005C53]/90"
                  size="lg"
                >
                  <Link href="/">Ana Sayfaya Dön</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Reddedildi */}
        {state === "rejected" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-10 w-10 text-red-400" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#042940]">
                  Onay Verilmedi
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#042940]/50">
                  Çocuğunuzun hesabı aktif edilmeyecek ve toplanan tüm veriler
                  silinecektir. Fikrinizi değiştirirseniz yeni bir kayıt oluşturabilirsiniz.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6"
                  size="lg"
                >
                  <Link href="/">Ana Sayfaya Dön</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Hata */}
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                  <XCircle className="h-10 w-10 text-yellow-500" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#042940]">
                  Bir Hata Oluştu
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#042940]/50">
                  Onay işlemi sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin
                  veya destek ekibimizle iletişime geçin.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3">
                  <Button
                    onClick={() => setState("review")}
                    className="bg-[#005C53] hover:bg-[#005C53]/90"
                    size="lg"
                  >
                    Tekrar Dene
                  </Button>
                  <a
                    href="mailto:destek@lumo.com.tr"
                    className="text-sm text-[#005C53] hover:underline"
                  >
                    destek@lumo.com.tr
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
