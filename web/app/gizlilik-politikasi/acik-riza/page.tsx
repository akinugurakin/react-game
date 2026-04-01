"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  BÖLÜMLER                                                           */
/* ------------------------------------------------------------------ */

interface Section {
  id: string;
  title: string;
  highlight?: boolean;
  content: React.ReactNode;
}

const LAST_UPDATED = "31 Mart 2026";

const SECTIONS: Section[] = [
  {
    id: "acik-riza-nedir",
    title: "1. Açık Rıza Nedir?",
    content: (
      <>
        <p>
          Açık rıza, 6698 sayılı Kişisel Verilerin Korunması Kanunu
          (&quot;KVKK&quot;) m.3/1-a uyarınca{" "}
          <strong>
            &quot;belirli bir konuya ilişkin, bilgilendirilmeye dayanan ve özgür
            iradeyle açıklanan rıza&quot;
          </strong>
          dır.
        </p>
        <p className="mt-2">
          LUMO Eğitim Platformu olarak, zorunlu veri işleme faaliyetleri dışında
          kalan işlemler için açık rızanızı talep etmekteyiz. Açık rızanızı
          vermek tamamen isteğe bağlıdır ve istediğiniz zaman geri
          çekebilirsiniz.
        </p>
      </>
    ),
  },
  {
    id: "ebeveyn-rizasi",
    title: "2. Ebeveyn/Vasi Açık Rızası",
    highlight: true,
    content: (
      <>
        <p>
          Platformumuz 6-14 yaş grubundaki çocuklara yönelik olduğundan, çocuk
          kullanıcılarımıza ilişkin tüm veri işleme faaliyetleri için yasal
          temsilcinin (ebeveyn/vasi) açık rızası aranmaktadır.
        </p>
        <div className="mt-4 rounded-lg border border-[#005C53]/15 bg-[#005C53]/[0.03] p-4">
          <h4 className="font-semibold text-[#042940]">
            Ebeveyn Onay Süreci
          </h4>
          <ol className="mt-2 space-y-2 list-decimal list-inside">
            <li>
              Kayıt sırasında 1-4. sınıf öğrencileri için ebeveyn e-posta
              adresi istenir
            </li>
            <li>Ebeveyne doğrulama ve onay e-postası gönderilir</li>
            <li>
              Ebeveyn, işlenen verileri ve amaçları içeren açık rıza formunu
              inceler
            </li>
            <li>
              Ebeveyn onayı olmadan çocuk hesabı aktif edilmez ve veriler kalıcı
              olarak saklanmaz
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: "riza-gereken-islemler",
    title: "3. Açık Rıza Gerektiren Veri İşleme Faaliyetleri",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#042940]/5">
              <th className="text-left p-3 border border-[#042940]/10 font-semibold text-[#042940]">
                Faaliyet
              </th>
              <th className="text-left p-3 border border-[#042940]/10 font-semibold text-[#042940]">
                İşlenen Veriler
              </th>
              <th className="text-left p-3 border border-[#042940]/10 font-semibold text-[#042940]">
                Amaç
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Liderlik tablosunda isim görünürlüğü",
                "Kullanıcı adı, skor",
                "Diğer kullanıcılara karşı sıralamada adınızın görünmesi",
              ],
              [
                "Liderlik tablosunda okul görünürlüğü",
                "Okul adı",
                "Okul bazlı sıralamada okul bilgisinin görünmesi",
              ],
              [
                "İsteğe bağlı çerezler",
                "Fonksiyonel ve analitik çerez verileri",
                "Tercih hatırlama ve platform geliştirme",
              ],
              [
                "Yurt dışına veri aktarımı",
                "Tüm kişisel veriler",
                "Altyapı sağlayıcılarının (Vercel, Supabase) yurt dışı sunucularında barındırma",
              ],
              [
                "Öğretmen tarafından öğrenci takibi",
                "Oyun skorları, ilerleme verileri",
                "Öğretmenin sınıf performansını görüntülemesi",
              ],
            ].map(([faaliyet, veriler, amac], i) => (
              <tr
                key={i}
                className={i % 2 === 1 ? "bg-[#042940]/[0.02]" : ""}
              >
                <td className="p-3 border border-[#042940]/10 font-medium text-[#042940]">
                  {faaliyet}
                </td>
                <td className="p-3 border border-[#042940]/10 text-[#042940]/60">
                  {veriler}
                </td>
                <td className="p-3 border border-[#042940]/10 text-[#042940]/60">
                  {amac}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "riza-gerektirmeyen",
    title: "4. Açık Rıza Gerektirmeyen Veri İşleme Faaliyetleri",
    content: (
      <>
        <p>
          Aşağıdaki veri işleme faaliyetleri KVKK m.5/2 kapsamında açık rıza
          aranmaksızın gerçekleştirilmektedir:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>Üyelik sözleşmesinin ifası</strong> (m.5/2-c): Hesap
            oluşturma, kimlik doğrulama, oyun hizmetinin sunulması
          </li>
          <li>
            <strong>Hukuki yükümlülük</strong> (m.5/2-ç): 5651 sayılı Kanun
            kapsamında log kayıtlarının tutulması
          </li>
          <li>
            <strong>Meşru menfaat</strong> (m.5/2-f): Platform güvenliğinin
            sağlanması, yetkisiz erişimlerin önlenmesi
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "riza-beyan",
    title: "5. Açık Rıza Beyanı",
    highlight: true,
    content: (
      <>
        <p>
          Aşağıdaki metin, platformumuzda kayıt sırasında ve ilgili işlemler
          öncesinde kullanıcılarımıza sunulan açık rıza beyanıdır:
        </p>
        <div className="mt-4 rounded-lg border border-[#042940]/15 bg-white p-5">
          <p className="text-[#042940] italic leading-relaxed">
            &quot;LUMO Eğitim Platformu tarafından hazırlanan Aydınlatma
            Metni&apos;ni okudum ve anladım. Kişisel verilerimin (ve/veya
            velisi/vasisi olduğum çocuğun kişisel verilerinin) yukarıda
            belirtilen amaçlarla işlenmesine, yurt içindeki ve yurt dışındaki
            üçüncü kişilere aktarılmasına özgür irademle açık rıza veriyorum.
          </p>
          <p className="mt-3 text-[#042940] italic leading-relaxed">
            Bu rızamı istediğim zaman, hiçbir gerekçe göstermeksizin geri
            çekebileceğimi biliyorum. Rızamı geri çekmem, geri çekme
            tarihine kadar yapılan veri işleme faaliyetlerinin hukuka
            uygunluğunu etkilemeyecektir.&quot;
          </p>
        </div>
      </>
    ),
  },
  {
    id: "riza-geri-cekme",
    title: "6. Açık Rızanın Geri Çekilmesi",
    content: (
      <>
        <p>
          Verdiğiniz açık rızayı istediğiniz zaman, hiçbir gerekçe
          göstermeksizin geri çekebilirsiniz.
        </p>
        <h4 className="mt-4 font-semibold text-[#042940]">
          Rıza Geri Çekme Yöntemleri
        </h4>
        <ul className="mt-2 space-y-2 list-disc list-inside">
          <li>
            <strong>Platform üzerinden:</strong> Profil sayfanızdaki
            &quot;Gizlilik Ayarları&quot; bölümünden ilgili izinleri
            kapatabilirsiniz
          </li>
          <li>
            <strong>Çerez tercihleri:</strong> Sayfanın altında bulunan
            &quot;Çerez Ayarları&quot; bağlantısından çerez tercihlerinizi
            değiştirebilirsiniz
          </li>
          <li>
            <strong>E-posta ile:</strong>{" "}
            <a
              href="mailto:kvkk@lumo.com.tr"
              className="text-[#005C53] underline underline-offset-2"
            >
              kvkk@lumo.com.tr
            </a>{" "}
            adresine başvurarak tüm rızalarınızı geri çekebilirsiniz
          </li>
        </ul>
        <h4 className="mt-4 font-semibold text-[#042940]">
          Rıza Geri Çekmenin Sonuçları
        </h4>
        <ul className="mt-2 space-y-2 list-disc list-inside">
          <li>
            Liderlik tablosu görünürlüğü rızası geri çekilirse: Adınız ve okul
            bilginiz liderlik tablosundan kaldırılır
          </li>
          <li>
            Çerez rızası geri çekilirse: İsteğe bağlı çerezler devre dışı
            bırakılır
          </li>
          <li>
            Yurt dışı aktarım rızası geri çekilirse: Hesabınız devre dışı
            bırakılabilir (platform altyapısı yurt dışı sunucularında
            barındırılmaktadır)
          </li>
          <li>
            Ebeveyn rızası geri çekilirse: Çocuk hesabı devre dışı bırakılır ve
            tüm veriler silinir
          </li>
        </ul>
        <p className="mt-3">
          Rızanızı geri çekmeniz, geri çekme tarihine kadar gerçekleştirilen
          veri işleme faaliyetlerinin hukuka uygunluğunu etkilemez.
        </p>
      </>
    ),
  },
  {
    id: "iletisim",
    title: "7. İletişim",
    content: (
      <>
        <p>
          Açık rıza süreçleri hakkında sorularınız veya talepleriniz için:
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
        <p className="mt-3">
          Başvurularınız en geç 30 gün içinde ücretsiz olarak
          sonuçlandırılacaktır.
        </p>
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

export default function AcikRizaPage() {
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
              <ShieldCheck className="h-8 w-8 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Açık Rıza Metni
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              Kişisel verilerinizin işlenmesine ilişkin açık rıza beyanı — KVKK
              Madde 5/1 kapsamında hazırlanmıştır.
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
                  <Card
                    className={
                      section.highlight
                        ? "border-[#005C53]/20 bg-[#005C53]/[0.03] shadow-sm"
                        : "border-0 shadow-sm"
                    }
                  >
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
            <Link
              href="/gizlilik-politikasi/cerez-politikasi"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Çerez Politikası
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
