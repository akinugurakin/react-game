"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileCheck, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  KVKK m.11 HAKLARI                                                  */
/* ------------------------------------------------------------------ */

const KVKK_HAKLARI = [
  {
    id: "ogrenme",
    label: "Kişisel verilerimin işlenip işlenmediğini öğrenmek istiyorum",
  },
  {
    id: "bilgi",
    label:
      "Kişisel verilerim işlenmişse buna ilişkin bilgi talep ediyorum",
  },
  {
    id: "amac",
    label:
      "Kişisel verilerimin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenmek istiyorum",
  },
  {
    id: "ucuncu-taraf",
    label:
      "Yurt içinde veya yurt dışında kişisel verilerimin aktarıldığı üçüncü kişileri bilmek istiyorum",
  },
  {
    id: "duzeltme",
    label:
      "Kişisel verilerimin eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini istiyorum",
  },
  {
    id: "silme",
    label:
      "KVKK m.7 kapsamında kişisel verilerimin silinmesini / yok edilmesini istiyorum",
  },
  {
    id: "bildirim",
    label:
      "Düzeltme / silme işlemlerinin kişisel verilerimin aktarıldığı üçüncü kişilere bildirilmesini istiyorum",
  },
  {
    id: "itiraz",
    label:
      "İşlenen verilerin otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhime bir sonuç ortaya çıkmasına itiraz ediyorum",
  },
  {
    id: "zarar",
    label:
      "Kişisel verilerimin kanuna aykırı işlenmesi sebebiyle uğradığım zararın giderilmesini talep ediyorum",
  },
];

/* ------------------------------------------------------------------ */
/*  FORM                                                               */
/* ------------------------------------------------------------------ */

interface FormData {
  basvuruTuru: "kendim" | "cocugum";
  adSoyad: string;
  tcKimlik: string;
  email: string;
  telefon: string;
  adres: string;
  cocukAdSoyad: string;
  cocukKullaniciAdi: string;
  secilenHaklar: string[];
  aciklama: string;
}

const INITIAL_FORM: FormData = {
  basvuruTuru: "kendim",
  adSoyad: "",
  tcKimlik: "",
  email: "",
  telefon: "",
  adres: "",
  cocukAdSoyad: "",
  cocukKullaniciAdi: "",
  secilenHaklar: [],
  aciklama: "",
};

export default function BasvuruFormuPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleHak = (hakId: string) => {
    setForm((prev) => ({
      ...prev,
      secilenHaklar: prev.secilenHaklar.includes(hakId)
        ? prev.secilenHaklar.filter((h) => h !== hakId)
        : [...prev.secilenHaklar, hakId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend API entegrasyonu — POST /api/kvkk-basvuru
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-[#042940]/[0.02]">
        {/* Hero */}
        <section className="container py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#005C53]/10">
              <FileCheck className="h-8 w-8 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Veri Sahibi Başvuru Formu
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              KVKK Madde 11 kapsamındaki haklarınızı kullanmak için aşağıdaki
              formu doldurabilirsiniz.
            </p>
          </motion.div>
        </section>

        <section className="container pb-16">
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <SuccessMessage onReset={() => setSubmitted(false)} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {/* Bilgilendirme */}
                <Card className="mb-8 border-[#DBF227]/30 bg-[#DBF227]/[0.06] shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-sm leading-relaxed text-[#042940]/60">
                      <strong className="text-[#042940]">Bilgilendirme:</strong>{" "}
                      Başvurunuz en geç <strong>30 gün</strong> içinde ücretsiz
                      olarak sonuçlandırılacaktır. Kimlik doğrulama amacıyla
                      T.C. kimlik numaranız talep edilmektedir. Başvuru öncesinde{" "}
                      <Link
                        href="/gizlilik-politikasi/aydinlatma-metni"
                        className="font-medium text-[#005C53] underline underline-offset-2"
                      >
                        Aydınlatma Metni
                      </Link>
                      &apos;ni incelemenizi öneririz.
                    </p>
                  </CardContent>
                </Card>

                {/* Form */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Başvuru Türü */}
                      <fieldset>
                        <legend className="mb-3 text-base font-bold text-[#042940]">
                          Başvuru Türü
                        </legend>
                        <div className="flex gap-3">
                          {[
                            {
                              value: "kendim" as const,
                              label: "Kendim için",
                            },
                            {
                              value: "cocugum" as const,
                              label: "Çocuğum / vesayetim altındaki kişi için",
                            },
                          ].map((opt) => (
                            <label
                              key={opt.value}
                              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                form.basvuruTuru === opt.value
                                  ? "border-[#005C53] bg-[#005C53]/5 text-[#005C53]"
                                  : "border-[#042940]/10 text-[#042940]/50 hover:border-[#042940]/20"
                              }`}
                            >
                              <input
                                type="radio"
                                name="basvuruTuru"
                                value={opt.value}
                                checked={form.basvuruTuru === opt.value}
                                onChange={() =>
                                  updateField("basvuruTuru", opt.value)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`h-4 w-4 rounded-full border-2 ${
                                  form.basvuruTuru === opt.value
                                    ? "border-[#005C53] bg-[#005C53]"
                                    : "border-[#042940]/20"
                                }`}
                              >
                                {form.basvuruTuru === opt.value && (
                                  <div className="flex h-full items-center justify-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                  </div>
                                )}
                              </div>
                              {opt.label}
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      {/* Kişisel Bilgiler */}
                      <fieldset>
                        <legend className="mb-4 text-base font-bold text-[#042940]">
                          Başvuran Bilgileri
                        </legend>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <InputField
                            label="Ad Soyad"
                            required
                            value={form.adSoyad}
                            onChange={(v) => updateField("adSoyad", v)}
                            placeholder="Ad Soyad"
                          />
                          <InputField
                            label="T.C. Kimlik No"
                            required
                            value={form.tcKimlik}
                            onChange={(v) => updateField("tcKimlik", v)}
                            placeholder="11 haneli T.C. kimlik numarası"
                            maxLength={11}
                            pattern="[0-9]{11}"
                          />
                          <InputField
                            label="E-posta"
                            type="email"
                            required
                            value={form.email}
                            onChange={(v) => updateField("email", v)}
                            placeholder="ornek@email.com"
                          />
                          <InputField
                            label="Telefon"
                            type="tel"
                            value={form.telefon}
                            onChange={(v) => updateField("telefon", v)}
                            placeholder="05XX XXX XX XX"
                          />
                        </div>
                        <div className="mt-4">
                          <InputField
                            label="Adres (opsiyonel)"
                            value={form.adres}
                            onChange={(v) => updateField("adres", v)}
                            placeholder="Tebligat adresi"
                          />
                        </div>
                      </fieldset>

                      {/* Çocuk Bilgileri */}
                      {form.basvuruTuru === "cocugum" && (
                        <motion.fieldset
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          <legend className="mb-4 text-base font-bold text-[#042940]">
                            Çocuk / Vesayet Altındaki Kişi Bilgileri
                          </legend>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                              label="Ad Soyad"
                              required
                              value={form.cocukAdSoyad}
                              onChange={(v) =>
                                updateField("cocukAdSoyad", v)
                              }
                              placeholder="Çocuğun adı soyadı"
                            />
                            <InputField
                              label="LUMO Kullanıcı Adı"
                              value={form.cocukKullaniciAdi}
                              onChange={(v) =>
                                updateField("cocukKullaniciAdi", v)
                              }
                              placeholder="Platformdaki kullanıcı adı"
                            />
                          </div>
                        </motion.fieldset>
                      )}

                      {/* Hak Seçimi */}
                      <fieldset>
                        <legend className="mb-2 text-base font-bold text-[#042940]">
                          Kullanmak İstediğiniz Haklar
                        </legend>
                        <p className="mb-4 text-xs text-[#042940]/40">
                          KVKK Madde 11 kapsamında bir veya birden fazla hak
                          seçebilirsiniz.
                        </p>
                        <div className="space-y-2">
                          {KVKK_HAKLARI.map((hak) => (
                            <label
                              key={hak.id}
                              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                                form.secilenHaklar.includes(hak.id)
                                  ? "border-[#005C53]/30 bg-[#005C53]/[0.03]"
                                  : "border-[#042940]/8 hover:border-[#042940]/15"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={form.secilenHaklar.includes(hak.id)}
                                onChange={() => toggleHak(hak.id)}
                                className="sr-only"
                              />
                              <div
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                  form.secilenHaklar.includes(hak.id)
                                    ? "border-[#005C53] bg-[#005C53]"
                                    : "border-[#042940]/15"
                                }`}
                              >
                                {form.secilenHaklar.includes(hak.id) && (
                                  <svg
                                    className="h-3 w-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm text-[#042940]/70">
                                {hak.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      {/* Açıklama */}
                      <fieldset>
                        <legend className="mb-3 text-base font-bold text-[#042940]">
                          Açıklama ve Talepleriniz
                        </legend>
                        <textarea
                          value={form.aciklama}
                          onChange={(e) =>
                            updateField("aciklama", e.target.value)
                          }
                          rows={5}
                          className="w-full rounded-xl border border-[#042940]/10 bg-white px-4 py-3 text-sm text-[#042940] placeholder-[#042940]/30 outline-none transition-colors focus:border-[#005C53]/50 focus:ring-2 focus:ring-[#005C53]/10"
                          placeholder="Talebinizle ilgili detaylı açıklama yazabilirsiniz..."
                        />
                      </fieldset>

                      {/* Onay ve Gönder */}
                      <div className="space-y-4 border-t border-[#042940]/10 pt-6">
                        <p className="text-xs leading-relaxed text-[#042940]/40">
                          Bu formu göndererek, başvurunuzun değerlendirilmesi
                          amacıyla yukarıda belirttiğiniz kişisel verilerin LUMO
                          Eğitim Teknolojileri A.Ş. tarafından işlenmesini kabul
                          etmiş olursunuz. Başvurunuz en geç 30 gün içinde
                          sonuçlandırılacaktır.
                        </p>

                        <button
                          type="submit"
                          disabled={
                            !form.adSoyad ||
                            !form.tcKimlik ||
                            !form.email ||
                            form.secilenHaklar.length === 0
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#005C53] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#005C53]/90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Send className="h-4 w-4" />
                          Başvuruyu Gönder
                        </button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Alternatif Başvuru */}
                <Card className="mt-8 border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-bold text-[#042940]">
                      Alternatif Başvuru Yöntemleri
                    </h3>
                    <div className="mt-3 space-y-2 text-sm text-[#042940]/50">
                      <p>
                        <strong>E-posta:</strong>{" "}
                        <a
                          href="mailto:kvkk@lumo.com.tr"
                          className="text-[#005C53] underline underline-offset-2"
                        >
                          kvkk@lumo.com.tr
                        </a>{" "}
                        adresine kimlik doğrulama bilgilerinizle birlikte
                        başvurabilirsiniz.
                      </p>
                      <p>
                        <strong>Posta:</strong> İstanbul, Türkiye — noter
                        aracılığıyla veya iadeli taahhütlü posta ile
                        gönderebilirsiniz.
                      </p>
                      <p>
                        <strong>Kişisel Verileri Koruma Kurumu:</strong>{" "}
                        <a
                          href="https://www.kvkk.gov.tr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#005C53] underline underline-offset-2"
                        >
                          www.kvkk.gov.tr
                        </a>{" "}
                        üzerinden de başvuru yapabilirsiniz.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {/* İlgili Sayfalar */}
        <section className="container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/gizlilik-politikasi"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/gizlilik-politikasi/aydinlatma-metni"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Aydınlatma Metni
            </Link>
            <Link
              href="/gizlilik-politikasi/acik-riza"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Açık Rıza Metni
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  INPUT FIELD                                                        */
/* ------------------------------------------------------------------ */

function InputField({
  label,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
  maxLength,
  pattern,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  pattern?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#042940]/70">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        className="w-full rounded-xl border border-[#042940]/10 bg-white px-4 py-2.5 text-sm text-[#042940] placeholder-[#042940]/30 outline-none transition-colors focus:border-[#005C53]/50 focus:ring-2 focus:ring-[#005C53]/10"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BAŞARI MESAJI                                                      */
/* ------------------------------------------------------------------ */

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-0 shadow-sm">
        <CardContent className="p-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#042940]">
            Başvurunuz Alındı
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#042940]/50">
            Başvurunuz başarıyla iletilmiştir. KVKK kapsamında talebiniz en geç{" "}
            <strong className="text-[#042940]">30 gün</strong> içinde
            değerlendirilerek tarafınıza bilgi verilecektir. Başvuru durumunuz
            hakkında{" "}
            <a
              href="mailto:kvkk@lumo.com.tr"
              className="text-[#005C53] underline underline-offset-2"
            >
              kvkk@lumo.com.tr
            </a>{" "}
            adresinden bilgi alabilirsiniz.
          </p>
          <button
            onClick={onReset}
            className="mt-8 rounded-xl border border-[#042940]/10 px-6 py-2.5 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
          >
            Yeni Başvuru Yap
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
