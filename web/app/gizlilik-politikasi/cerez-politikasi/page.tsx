"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cookie, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  BÖLÜMLER                                                           */
/* ------------------------------------------------------------------ */

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const LAST_UPDATED = "31 Mart 2026";

const SECTIONS: Section[] = [
  {
    id: "cerez-nedir",
    title: "1. Çerez Nedir?",
    content: (
      <>
        <p>
          Çerezler (cookies), web sitelerinin tarayıcınıza yerleştirdiği küçük
          metin dosyalarıdır. Bu dosyalar, platformumuzu kullanırken deneyiminizi
          iyileştirmek, güvenliğinizi sağlamak ve tercihlerinizi hatırlamak için
          kullanılır.
        </p>
        <p className="mt-2">
          LUMO olarak çocuk kullanıcılarımızın güvenliğini ön planda tutarak
          minimum çerez politikası uygulamaktayız. Platformumuzda hiçbir reklam
          veya davranışsal izleme çerezi kullanılmamaktadır.
        </p>
      </>
    ),
  },
  {
    id: "cerez-turleri",
    title: "2. Kullandığımız Çerez Türleri",
    content: (
      <div className="space-y-4">
        {/* Zorunlu */}
        <div className="rounded-lg border border-[#005C53]/15 bg-[#005C53]/[0.03] p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#005C53]/10 px-2 py-0.5 text-xs font-bold text-[#005C53]">
              ZORUNLU
            </span>
            <span className="text-xs text-[#042940]/40">
              Kapatılamaz
            </span>
          </div>
          <h4 className="mt-2 font-semibold text-[#042940]">
            Zorunlu Çerezler
          </h4>
          <p className="mt-1 text-[#042940]/50">
            Platformun temel işlevleri için gereklidir. Bu çerezler olmadan
            giriş yapmanız, oturum açmanız veya güvenli şekilde oyun oynamanız
            mümkün değildir.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#042940]/10">
                  <th className="pb-2 pr-4 text-left font-semibold text-[#042940]">Çerez Adı</th>
                  <th className="pb-2 pr-4 text-left font-semibold text-[#042940]">Amaç</th>
                  <th className="pb-2 text-left font-semibold text-[#042940]">Süre</th>
                </tr>
              </thead>
              <tbody className="text-[#042940]/50">
                <tr className="border-b border-[#042940]/5">
                  <td className="py-2 pr-4 font-mono">auth-storage</td>
                  <td className="py-2 pr-4">Oturum bilgileri (JWT token)</td>
                  <td className="py-2">7 gün</td>
                </tr>
                <tr className="border-b border-[#042940]/5">
                  <td className="py-2 pr-4 font-mono">lumo-cookie-consent</td>
                  <td className="py-2 pr-4">Çerez tercihleriniz</td>
                  <td className="py-2">1 yıl</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Fonksiyonel */}
        <div className="rounded-lg border border-[#042940]/10 p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#DBF227]/30 px-2 py-0.5 text-xs font-bold text-[#042940]/70">
              İSTEĞE BAĞLI
            </span>
            <span className="text-xs text-[#042940]/40">
              Onayınızla etkinleşir
            </span>
          </div>
          <h4 className="mt-2 font-semibold text-[#042940]">
            Fonksiyonel Çerezler
          </h4>
          <p className="mt-1 text-[#042940]/50">
            Dil tercihinizi, tema ayarlarınızı ve profil görünüm tercihlerinizi
            hatırlamak için kullanılır.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#042940]/10">
                  <th className="pb-2 pr-4 text-left font-semibold text-[#042940]">Çerez Adı</th>
                  <th className="pb-2 pr-4 text-left font-semibold text-[#042940]">Amaç</th>
                  <th className="pb-2 text-left font-semibold text-[#042940]">Süre</th>
                </tr>
              </thead>
              <tbody className="text-[#042940]/50">
                <tr className="border-b border-[#042940]/5">
                  <td className="py-2 pr-4 font-mono">lumo-school</td>
                  <td className="py-2 pr-4">Okul tercihi</td>
                  <td className="py-2">1 yıl</td>
                </tr>
                <tr className="border-b border-[#042940]/5">
                  <td className="py-2 pr-4 font-mono">lumo-avatar-id</td>
                  <td className="py-2 pr-4">Avatar seçimi</td>
                  <td className="py-2">1 yıl</td>
                </tr>
                <tr className="border-b border-[#042940]/5">
                  <td className="py-2 pr-4 font-mono">lumo-show-name</td>
                  <td className="py-2 pr-4">İsim görünürlük tercihi</td>
                  <td className="py-2">1 yıl</td>
                </tr>
                <tr className="border-b border-[#042940]/5">
                  <td className="py-2 pr-4 font-mono">lumo-show-school</td>
                  <td className="py-2 pr-4">Okul görünürlük tercihi</td>
                  <td className="py-2">1 yıl</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Analitik */}
        <div className="rounded-lg border border-[#042940]/10 p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#DBF227]/30 px-2 py-0.5 text-xs font-bold text-[#042940]/70">
              İSTEĞE BAĞLI
            </span>
            <span className="text-xs text-[#042940]/40">
              Onayınızla etkinleşir
            </span>
          </div>
          <h4 className="mt-2 font-semibold text-[#042940]">
            Analitik Çerezler
          </h4>
          <p className="mt-1 text-[#042940]/50">
            Platformun nasıl kullanıldığını anlamamıza ve hizmet kalitemizi
            artırmamıza yardımcı olur. Bu çerezler kişisel profil oluşturmaz ve
            üçüncü taraflarla paylaşılmaz.
          </p>
        </div>

        {/* Kullanılmayan */}
        <div className="rounded-lg border border-red-100 bg-red-50/50 p-4">
          <h4 className="font-semibold text-red-900/80">
            Kullanmadığımız Çerezler
          </h4>
          <ul className="mt-2 space-y-1 text-red-800/60">
            <li>Reklam çerezleri — LUMO reklamsız bir platformdur</li>
            <li>Davranışsal izleme çerezleri</li>
            <li>Üçüncü taraf sosyal medya çerezleri</li>
            <li>Çapraz site takip çerezleri</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "cerez-yonetimi",
    title: "3. Çerez Tercihlerinizi Yönetme",
    content: (
      <>
        <p>
          Çerez tercihlerinizi istediğiniz zaman aşağıdaki yöntemlerle
          değiştirebilirsiniz:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>Platform üzerinden:</strong> Sayfanın altında bulunan
            &quot;Çerez Ayarları&quot; bağlantısına tıklayarak tercihlerinizi
            güncelleyebilirsiniz.
          </li>
          <li>
            <strong>Tarayıcı ayarlarından:</strong> Tarayıcınızın gizlilik
            ayarları üzerinden çerezleri silebilir veya engelleyebilirsiniz.
            Ancak zorunlu çerezleri engellemek platformun düzgün çalışmasını
            engelleyebilir.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cocuk-guvenligi",
    title: "4. Çocuk Kullanıcılar ve Çerezler",
    content: (
      <>
        <p>
          Çocuk kullanıcılarımızın güvenliği için özel önlemler almaktayız:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            Çocuklara yönelik hiçbir davranışsal izleme veya profil oluşturma
            yapılmamaktadır
          </li>
          <li>
            Reklam çerezleri kullanılmamaktadır
          </li>
          <li>
            Çocuk kullanıcıların verileri yalnızca eğitim hizmetinin sunulması
            amacıyla işlenmektedir
          </li>
          <li>
            Üçüncü taraf çerezleri minimum düzeyde tutulmaktadır
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hukuki-dayanak",
    title: "5. Hukuki Dayanak",
    content: (
      <>
        <p>
          Çerez kullanımımız aşağıdaki mevzuata uygun olarak
          gerçekleştirilmektedir:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
          </li>
          <li>
            5809 sayılı Elektronik Haberleşme Kanunu
          </li>
          <li>
            Kişisel Verileri Koruma Kurulu&apos;nun Çerez Uygulamalarına İlişkin
            Rehberi
          </li>
        </ul>
        <p className="mt-3">
          Zorunlu çerezler, hizmetin sunulması için gerekli olduğundan
          KVKK m.5/2-c (sözleşmenin ifası) kapsamında açık rıza aranmaksızın
          kullanılmaktadır. İsteğe bağlı çerezler ise yalnızca açık rızanız
          (KVKK m.5/1) ile etkinleştirilmektedir.
        </p>
      </>
    ),
  },
  {
    id: "degisiklikler",
    title: "6. Politika Değişiklikleri",
    content: (
      <p>
        Bu Çerez Politikası zaman zaman güncellenebilir. Önemli değişiklikler
        platformda duyurulacak ve gerektiğinde çerez tercihleriniz yeniden
        sorulacaktır. Güncel politika her zaman bu sayfada yayınlanır.
      </p>
    ),
  },
  {
    id: "iletisim",
    title: "7. İletişim",
    content: (
      <>
        <p>
          Çerez politikamız hakkında sorularınız için bize ulaşabilirsiniz:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>E-posta:</strong>{" "}
            <a
              href="mailto:kvkk@lumo.com.tr"
              className="text-[#005C53] underline underline-offset-2"
            >
              kvkk@lumo.com.tr
            </a>
          </li>
          <li>
            <strong>Telefon:</strong> 0850 123 45 67
          </li>
        </ul>
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  İÇİNDEKİLER                                                       */
/* ------------------------------------------------------------------ */

function TableOfContents() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#042940]/70">
          İçindekiler
        </h2>
        <nav className="space-y-1.5">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-[#042940]/60 transition-colors hover:bg-[#005C53]/5 hover:text-[#005C53]"
            >
              <ChevronRight className="h-3 w-3 shrink-0" />
              {section.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function CerezPolitikasiPage() {
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
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DBF227]/20">
              <Cookie className="h-8 w-8 text-[#042940]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Çerez Politikası
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              LUMO platformunda çerezleri nasıl kullandığımızı ve gizlilik
              tercihlerinizi nasıl yönetebileceğinizi öğrenin.
            </p>
            <p className="mt-3 text-sm text-[#042940]/30">
              Son güncelleme: {LAST_UPDATED}
            </p>
          </motion.div>
        </section>

        {/* İçerik */}
        <section className="container pb-16">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </motion.div>

            <div className="space-y-8">
              {SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.03 }}
                >
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 sm:p-8">
                      <h2 className="mb-4 text-lg font-bold text-[#042940]">
                        {section.title}
                      </h2>
                      <div className="space-y-2 text-sm leading-relaxed text-[#042940]/60">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
