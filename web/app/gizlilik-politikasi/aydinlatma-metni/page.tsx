"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";
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
    id: "veri-sorumlusu",
    title: "1. Veri Sorumlusunun Kimliği",
    content: (
      <>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
          kapsamında veri sorumlusu sıfatıyla hareket eden{" "}
          <strong>LUMO Eğitim Teknolojileri A.Ş.</strong> (&quot;Lumo&quot; veya
          &quot;Platform&quot;) olarak, kişisel verilerinizin güvenliğine büyük
          önem vermekteyiz.
        </p>
        <p>
          Bu aydınlatma metni, platformumuzu kullanan öğrenciler, veliler/vasiler
          ve öğretmenler başta olmak üzere tüm kullanıcılarımızı KVKK&apos;nın
          10. maddesi uyarınca bilgilendirmek amacıyla hazırlanmıştır.
        </p>
      </>
    ),
  },
  {
    id: "cocuk-verileri",
    title: "2. Çocuk Kullanıcılarımıza İlişkin Özel Bilgilendirme",
    highlight: true,
    content: (
      <>
        <p>
          Lumo, 6-14 yaş grubundaki çocuklara yönelik bir eğitim platformudur.
          Çocuklarımızın kişisel verilerinin korunmasına azami özen
          göstermekteyiz.
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>1-4. sınıf öğrencileri</strong> için kayıt sırasında
            ebeveyn/vasi e-posta adresi alınmakta ve ebeveyn onayı
            aranmaktadır.
          </li>
          <li>
            Çocuklara ait veriler yalnızca eğitim hizmetinin sunulması amacıyla
            işlenmekte olup, hiçbir şekilde reklam veya profilleme amacıyla
            kullanılmamaktadır.
          </li>
          <li>
            Ebeveynler, çocuklarına ait verilerin silinmesini her zaman talep
            edebilir.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "islenen-veriler",
    title: "3. İşlenen Kişisel Veriler",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#042940]/5">
              <th className="text-left p-3 border border-[#042940]/10 font-semibold text-[#042940]">
                Veri Kategorisi
              </th>
              <th className="text-left p-3 border border-[#042940]/10 font-semibold text-[#042940]">
                Toplanan Veriler
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Kimlik Bilgileri", "Kullanıcı adı, sınıf/yaş bilgisi"],
              [
                "İletişim Bilgileri",
                "E-posta adresi, ebeveyn e-posta adresi (1-4. sınıf öğrencileri için)",
              ],
              [
                "Hesap Bilgileri",
                "Şifre (şifrelenmiş/hashlenmiş olarak), avatar tercihi, profil ayarları",
              ],
              [
                "Eğitim ve Oyun Verileri",
                "Oyun skorları, doğru/yanlış sayıları, oynama süresi, tamamlanma zamanı, ilerleme durumu, kazanılan rozetler",
              ],
              ["Okul Bilgileri", "İl, ilçe, okul adı (isteğe bağlı)"],
              [
                "İşlem Güvenliği Bilgileri",
                "IP adresi, giriş/çıkış zamanları, oturum bilgileri (JWT token)",
              ],
            ].map(([category, data], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-[#042940]/[0.02]" : ""}>
                <td className="p-3 border border-[#042940]/10 font-medium text-[#042940]">
                  {category}
                </td>
                <td className="p-3 border border-[#042940]/10 text-[#042940]/60">
                  {data}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "isleme-amaclari",
    title: "4. Kişisel Verilerin İşlenme Amaçları",
    content: (
      <>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>Üyelik kaydının oluşturulması ve kimlik doğrulama işlemlerinin yürütülmesi</li>
          <li>Eğitici oyun hizmetlerinin sunulması ve kişiselleştirilmesi</li>
          <li>Öğrenci ilerleme ve performans takibinin sağlanması</li>
          <li>Liderlik tablosu ve sıralama hizmetlerinin sunulması</li>
          <li>Öğretmenlerin sınıf ve öğrenci yönetimi yapabilmesi</li>
          <li>Ebeveyn onay süreçlerinin yürütülmesi (1-4. sınıf öğrencileri için)</li>
          <li>Platform güvenliğinin sağlanması ve yetkisiz erişimlerin önlenmesi</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Hizmet kalitesinin artırılması ve teknik sorunların giderilmesi</li>
        </ul>
      </>
    ),
  },
  {
    id: "hukuki-sebepler",
    title: "5. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri",
    content: (
      <>
        <p>
          Kişisel verileriniz, KVKK&apos;nın 5. maddesinde belirtilen aşağıdaki
          hukuki sebeplere dayanılarak işlenmektedir:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>Açık rızanızın bulunması</strong> (KVKK m.5/1) — Zorunlu
            olmayan veri işleme faaliyetleri için
          </li>
          <li>
            <strong>Sözleşmenin kurulması veya ifası</strong> (KVKK m.5/2-c) —
            Üyelik sözleşmesi kapsamında hizmet sunulması
          </li>
          <li>
            <strong>Hukuki yükümlülüğün yerine getirilmesi</strong> (KVKK
            m.5/2-ç) — Yasal düzenlemelere uyum
          </li>
          <li>
            <strong>Meşru menfaat</strong> (KVKK m.5/2-f) — Platform
            güvenliğinin sağlanması, hizmet kalitesinin artırılması
          </li>
        </ul>
        <p className="mt-3">
          <strong>Çocuk kullanıcılar için:</strong> Tüm veri işleme faaliyetleri
          yasal temsilcinin (ebeveyn/vasi) açık rızasına dayanmaktadır.
        </p>
      </>
    ),
  },
  {
    id: "veri-aktarimi",
    title: "6. Kişisel Verilerin Aktarılması",
    content: (
      <>
        <p>
          Kişisel verileriniz, yukarıda belirtilen amaçlarla sınırlı olmak üzere
          aşağıdaki taraflara aktarılabilmektedir:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>Barındırma hizmet sağlayıcıları:</strong> Platformun
            çalışması için gerekli sunucu ve altyapı hizmetleri (Vercel,
            Render/Railway, Supabase)
          </li>
          <li>
            <strong>Yasal merciler:</strong> Mevzuat gereği talep edilmesi
            halinde yetkili kamu kurum ve kuruluşları
          </li>
        </ul>
        <p className="mt-3">
          Kişisel verileriniz, hizmet sağlayıcılarımızın sunucularının yurt
          dışında bulunması sebebiyle yurt dışına aktarılabilmektedir. Bu
          aktarım, KVKK&apos;nın 9. maddesi kapsamında açık rızanıza
          dayanmaktadır. Yurt dışına veri aktarımı yapılan ülkelerde yeterli
          korumanın bulunmasına ve hizmet sağlayıcılarımızla gerekli
          sözleşmelerin yapılmasına özen gösterilmektedir.
        </p>
      </>
    ),
  },
  {
    id: "saklama-suresi",
    title: "7. Kişisel Verilerin Saklanma Süresi",
    content: (
      <>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>Hesap bilgileri:</strong> Üyelik devam ettiği sürece ve hesap
            silindikten sonra 6 ay
          </li>
          <li>
            <strong>Oyun ve ilerleme verileri:</strong> Üyelik devam ettiği
            sürece
          </li>
          <li>
            <strong>İşlem güvenliği verileri (log kayıtları):</strong> 5651
            sayılı Kanun uyarınca 2 yıl
          </li>
          <li>
            <strong>Ebeveyn onay kayıtları:</strong> Üyelik devam ettiği sürece
            ve hesap silindikten sonra 1 yıl
          </li>
        </ul>
        <p className="mt-3">
          Saklama süresi dolan veriler, periyodik imha süreleri içinde silinir,
          yok edilir veya anonim hâle getirilir.
        </p>
      </>
    ),
  },
  {
    id: "haklar",
    title: "8. Veri Sahibi Olarak Haklarınız",
    content: (
      <>
        <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
          <li>
            Kişisel verilerinizin işlenme amacını ve bunların amacına uygun
            kullanılıp kullanılmadığını öğrenme
          </li>
          <li>
            Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı
            üçüncü kişileri bilme
          </li>
          <li>
            Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde
            bunların düzeltilmesini isteme
          </li>
          <li>
            KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel
            verilerinizin silinmesini veya yok edilmesini isteme
          </li>
          <li>
            Düzeltme ve silme işlemlerinin, kişisel verilerinizin aktarıldığı
            üçüncü kişilere bildirilmesini isteme
          </li>
          <li>
            İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz
            edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz
            etme
          </li>
          <li>
            Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle
            zarara uğramanız hâlinde zararın giderilmesini talep etme
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gizlilik-ayarlari",
    title: "9. Platform İçi Gizlilik Ayarları",
    content: (
      <>
        <p>
          Lumo platformunda aşağıdaki gizlilik ayarlarını yönetebilirsiniz:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>İsim görünürlüğü:</strong> Liderlik tablosunda adınızın
            görünüp görünmeyeceğini ayarlayabilirsiniz
          </li>
          <li>
            <strong>Okul görünürlüğü:</strong> Liderlik tablosunda okul
            bilginizin görünüp görünmeyeceğini ayarlayabilirsiniz
          </li>
        </ul>
        <p className="mt-3">
          Bu ayarlar profil sayfanızdaki &quot;Gizlilik Ayarları&quot; bölümünden
          değiştirilebilir.
        </p>
      </>
    ),
  },
  {
    id: "basvuru",
    title: "10. Başvuru Yöntemi",
    content: (
      <>
        <p>
          Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerden
          biriyle bize başvurabilirsiniz:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>
            <strong>E-posta:</strong>{" "}
            <a
              href="mailto:kvkk@lumo.com.tr"
              className="text-[#005C53] underline"
            >
              kvkk@lumo.com.tr
            </a>
          </li>
          <li>
            <strong>Telefon:</strong> 0850 123 45 67
          </li>
          <li>
            <strong>Posta:</strong> İstanbul, Türkiye
          </li>
        </ul>
        <p className="mt-3">
          Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç 30 gün
          içinde ücretsiz olarak sonuçlandırılacaktır. İşlemin ayrıca bir maliyet
          gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından
          belirlenen tarifedeki ücret alınabilecektir.
        </p>
      </>
    ),
  },
  {
    id: "degisiklikler",
    title: "11. Aydınlatma Metninde Yapılacak Değişiklikler",
    content: (
      <p>
        Bu aydınlatma metni, yasal düzenlemeler veya veri işleme
        faaliyetlerimizdeki değişiklikler doğrultusunda güncellenebilir.
        Güncellemeler bu sayfada yayımlanacak olup, önemli değişiklikler e-posta
        yoluyla bildirilecektir.
      </p>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  İÇİNDEKİLER NAVİGASYONU                                           */
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

export default function AydinlatmaMetniPage() {
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
              <FileText className="h-8 w-8 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Aydınlatma Metni
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni — KVKK
              Madde 10 kapsamında hazırlanmıştır.
            </p>
            <p className="mt-3 text-sm text-[#042940]/30">
              Son güncelleme: {LAST_UPDATED}
            </p>
          </motion.div>
        </section>

        {/* İçerik */}
        <section className="container pb-16">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar — İçindekiler (Desktop) */}
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

            {/* Ana İçerik */}
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
              href="/kullanim-kosullari"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Kullanım Koşulları
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
