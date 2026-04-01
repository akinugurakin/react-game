"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  POLİTİKA BÖLÜMLERİ                                                */
/* ------------------------------------------------------------------ */

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const LAST_UPDATED = "31 Mart 2026";

const SECTIONS: PolicySection[] = [
  {
    id: "giris",
    title: "1. Giriş ve Genel Bakış",
    content: [
      'LUMO Eğitsel Oyun Platformu ("Platform"), 6-14 yaş arası çocuklara yönelik eğitici oyunlar sunan bir çevrimiçi hizmettir. Çocukların kişisel verilerinin korunması en büyük önceliğimizdir.',
      "Bu Gizlilik Politikası, Platform üzerinden toplanan kişisel verilerin nasıl işlendiğini, korunduğunu ve hangi haklara sahip olduğunuzu açıklamaktadır.",
      "Platform, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK), Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ve ABD Çocukların Çevrimiçi Gizliliğini Koruma Yasası (COPPA) ile uyumlu şekilde çalışmaktadır.",
    ],
  },
  {
    id: "veri-sorumlusu",
    title: "2. Veri Sorumlusu",
    content: [
      "Veri Sorumlusu: LUMO Eğitim Teknolojileri A.Ş.",
      "Adres: İstanbul, Türkiye",
      "E-posta: kvkk@lumo.com.tr",
      "Telefon: 0850 123 45 67",
      "Kişisel verilerinize ilişkin tüm taleplerinizi yukarıdaki iletişim kanalları aracılığıyla bize iletebilirsiniz.",
    ],
  },
  {
    id: "toplanan-veriler",
    title: "3. Toplanan Kişisel Veriler",
    content: [
      "Çocuk kullanıcılardan toplanan veriler (minimum veri ilkesi):",
      "• Kullanıcı adı (takma ad — gerçek isim zorunlu değildir)",
      "• Yaş / sınıf düzeyi bilgisi",
      "• Oyun skorları ve ilerleme verileri",
      "• Oturum süreleri ve oyun tercihleri",
      "",
      "Ebeveyn/Veli hesabından toplanan veriler:",
      "• Ad, soyad ve e-posta adresi",
      "• Telefon numarası (doğrulama amaçlı)",
      "• Ödeme bilgileri (Stripe üzerinden işlenir, Platform tarafından saklanmaz)",
      "",
      "Otomatik olarak toplanan veriler:",
      "• Çerez verileri (yalnızca zorunlu oturum çerezleri)",
      "• Cihaz türü ve tarayıcı bilgisi (anonim, toplu istatistik amaçlı)",
      "",
      "Kesinlikle toplanmayan veriler:",
      "• Çocukların gerçek konum bilgisi (GPS)",
      "• Fotoğraf, video veya ses kayıtları",
      "• Biyometrik veriler",
      "• Davranışsal reklam profili oluşturmaya yönelik veriler",
      "• Üçüncü taraf sosyal medya verileri",
    ],
  },
  {
    id: "isleme-amaclari",
    title: "4. Verilerin İşlenme Amaçları",
    content: [
      "Toplanan kişisel veriler yalnızca aşağıdaki amaçlarla işlenmektedir:",
      "• Eğitim hizmetinin sunulması ve oyunların çalıştırılması",
      "• Öğrenme ilerlemesinin takip edilmesi ve raporlanması",
      "• Liderlik tablosunun oluşturulması (anonim kullanıcı adıyla)",
      "• Abonelik ve ödeme işlemlerinin yürütülmesi (yalnızca ebeveyn verileri)",
      "• Platform güvenliğinin sağlanması",
      "• Yasal yükümlülüklerin yerine getirilmesi",
      "",
      "Kişisel veriler hiçbir koşulda reklam, pazarlama veya profil oluşturma amacıyla kullanılmamaktadır. LUMO reklamsız bir platformdur.",
    ],
  },
  {
    id: "hukuki-dayanak",
    title: "5. Hukuki Dayanak",
    content: [
      "Kişisel verilerin işlenmesinde aşağıdaki hukuki dayanaklar kullanılmaktadır:",
      "• Ebeveyn/veli açık rızası (KVKK Madde 5/1, GDPR Madde 6/1-a, Madde 8)",
      "• Sözleşmenin ifası (abonelik hizmeti kapsamında, KVKK Madde 5/2-c)",
      "• Yasal yükümlülük (vergi ve muhasebe kayıtları, KVKK Madde 5/2-ç)",
      "",
      "Çocuk kullanıcılara ait tüm kişisel veriler, ebeveyn/veli açık rızası alınmadan işlenmemektedir.",
    ],
  },
  {
    id: "ebeveyn-onay",
    title: "6. Ebeveyn Onayı",
    content: [
      "LUMO, çocukların kişisel verilerini işlemeden önce doğrulanabilir ebeveyn onayı almaktadır.",
      "",
      "Onay alma süreci:",
      "• Kayıt sırasında ebeveyn/veli e-posta adresi istenir",
      "• Ebeveyne doğrulama e-postası gönderilir",
      "• Ebeveyn, onay formunu inceleyip kabul eder",
      "• Telefon numarası ile ek doğrulama yapılır",
      "",
      "Ebeveyn onayı olmadan çocuk hesabı aktif edilmez ve hiçbir kişisel veri kalıcı olarak saklanmaz.",
      "",
      "Ebeveynler, verdikleri onayı istedikleri zaman geri çekebilir. Onay geri çekildiğinde çocuğun hesabı devre dışı bırakılır ve tüm kişisel verileri silinir.",
    ],
  },
  {
    id: "veri-paylasimi",
    title: "7. Veri Paylaşımı ve Aktarımı",
    content: [
      "Kişisel veriler aşağıdaki sınırlı durumlar dışında üçüncü taraflarla paylaşılmaz:",
      "",
      "• Ödeme işlemleri: Stripe Inc. (yalnızca ebeveyn ödeme verileri — çocuk verileri Stripe ile paylaşılmaz)",
      "• Barındırma hizmetleri: Vercel (web uygulaması), Supabase (veritabanı)",
      "• Yasal zorunluluk: Mahkeme kararı veya yetkili makam talebi halinde",
      "",
      "Yurt dışı veri aktarımı:",
      "Teknik altyapı sağlayıcılarımız (Vercel, Stripe, Supabase) sunucuları yurt dışında bulunabilir. Bu aktarımlar KVKK Madde 9 ve GDPR Madde 46 kapsamında uygun güvenceler sağlanarak gerçekleştirilmektedir.",
      "",
      "Hiçbir koşulda çocuk verileri reklam şirketleri, veri simsarları veya pazarlama firmaları ile paylaşılmamaktadır.",
    ],
  },
  {
    id: "cerezler",
    title: "8. Çerez Politikası",
    content: [
      "LUMO, çocuk kullanıcıların güvenliğini ön planda tutarak minimum çerez politikası uygulamaktadır.",
      "",
      "Kullanılan çerezler:",
      "• Oturum çerezleri: Giriş durumunuzu korumak için (zorunlu)",
      "• Dil tercihi çerezi: Seçtiğiniz dili hatırlamak için (zorunlu)",
      "",
      "Kullanılmayan çerezler:",
      "• Reklam çerezleri — LUMO reklamsız bir platformdur",
      "• Davranışsal izleme çerezleri",
      "• Üçüncü taraf analitik çerezleri (Google Analytics vb.)",
      "• Sosyal medya çerezleri",
      "",
      "Platform üzerinde çocuklara yönelik hiçbir davranışsal izleme veya profil oluşturma yapılmamaktadır.",
    ],
  },
  {
    id: "guvenlik",
    title: "9. Veri Güvenliği",
    content: [
      "Kişisel verilerin güvenliği için aşağıdaki teknik ve idari tedbirler alınmaktadır:",
      "",
      "Teknik tedbirler:",
      "• SSL/TLS şifreleme ile veri iletimi",
      "• Şifrelerin bcrypt algoritması ile hash'lenmesi",
      "• Veritabanı erişiminde rol bazlı yetkilendirme",
      "• Düzenli güvenlik güncellemeleri ve yamaları",
      "• JWT tabanlı güvenli oturum yönetimi",
      "",
      "İdari tedbirler:",
      "• Çalışanlar için veri koruma eğitimleri",
      "• Veri erişim yetkilerinin sınırlandırılması (en az yetki ilkesi)",
      "• Veri ihlali müdahale planı",
      "• Düzenli güvenlik denetimleri",
    ],
  },
  {
    id: "saklama-silme",
    title: "10. Veri Saklama ve Silme",
    content: [
      "Kişisel veriler, işleme amacının gerektirdiği süre boyunca saklanır:",
      "",
      "• Çocuk hesap verileri: Hesap aktif olduğu sürece",
      "• Oyun ilerleme verileri: Hesap aktif olduğu sürece",
      "• Ödeme kayıtları: Yasal zorunluluk gereği 10 yıl (yalnızca ebeveyn verileri)",
      "• Oturum kayıtları: 30 gün",
      "",
      "Hesap kapatıldığında:",
      "• Çocuğun tüm kişisel verileri 30 gün içinde kalıcı olarak silinir",
      "• Liderlik tablosundaki kayıtlar anonimleştirilir",
      "• Yasal zorunluluk kapsamındaki ebeveyn ödeme kayıtları hariç tüm veriler imha edilir",
      "",
      "Ebeveynler, hesap kapatmadan da çocuğun verilerinin silinmesini talep edebilir.",
    ],
  },
  {
    id: "haklar",
    title: "11. Ebeveyn ve Kullanıcı Hakları",
    content: [
      "KVKK Madde 11 kapsamında ebeveynler/veliler aşağıdaki haklara sahiptir:",
      "",
      "• Kişisel veri işlenip işlenmediğini öğrenme",
      "• İşlenen veriler hakkında bilgi talep etme",
      "• İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme",
      "• Verilerin aktarıldığı üçüncü kişileri bilme",
      "• Eksik veya yanlış verilerin düzeltilmesini isteme",
      "• Verilerin silinmesini veya yok edilmesini isteme",
      "• Otomatik analiz yoluyla aleyhte bir sonuç çıkmasına itiraz etme",
      "• Hukuka aykırı işleme nedeniyle uğranılan zararın giderilmesini talep etme",
      "",
      "GDPR kapsamında ek haklar:",
      "• Veri taşınabilirliği hakkı (Madde 20)",
      "• İşlemeyi kısıtlama hakkı (Madde 18)",
      "• Unutulma hakkı (Madde 17)",
      "",
      "Haklarınızı kullanmak için kvkk@lumo.com.tr adresine başvurabilir veya Platform içindeki ebeveyn kontrol panelini kullanabilirsiniz. Başvurular en geç 30 gün içinde yanıtlanır.",
    ],
  },
  {
    id: "cocuklara-ozel",
    title: "12. Çocuklara Özel Korumalar",
    content: [
      "LUMO, çocuk kullanıcılar için aşağıdaki ek güvenlik önlemlerini uygulamaktadır:",
      "",
      "• Reklamsız deneyim: Platform üzerinde hiçbir reklam gösterilmez",
      "• Profil oluşturma yasağı: Çocukların davranışlarına dayalı profil oluşturulmaz",
      "• Sosyal etkileşim kısıtlamaları: Çocuklar arasında doğrudan mesajlaşma veya sohbet özelliği bulunmaz",
      "• Liderlik tablosunda anonimlik: Yalnızca kullanıcı adları görüntülenir, gerçek isimler gösterilmez",
      "• Dışa yönlendirme kısıtlaması: Platform, çocukları dış web sitelerine yönlendirmez",
      "• Satın alma koruması: Çocuklar doğrudan satın alma yapamaz, tüm ödemeler ebeveyn hesabı üzerinden gerçekleşir",
      "• İçerik denetimi: Tüm oyun içerikleri pedagojik açıdan değerlendirilir ve yaşa uygunluğu kontrol edilir",
    ],
  },
  {
    id: "uluslararasi",
    title: "13. Uluslararası Uyumluluk",
    content: [
      "KVKK (Türkiye): Platform, 6698 sayılı Kanun ve ilgili yönetmeliklere tam uyumlu şekilde çalışmaktadır. Veri Sorumluları Sicili'ne (VERBİS) kayıt yapılmıştır.",
      "",
      "GDPR (Avrupa Birliği): AB ülkelerinden erişen kullanıcılar için GDPR Madde 8 kapsamında çocuk verilerine ilişkin tüm yükümlülükler yerine getirilmektedir.",
      "",
      "COPPA (Amerika Birleşik Devletleri): ABD'den erişen 13 yaş altı kullanıcılar için COPPA gereksinimlerine uygun şekilde doğrulanabilir ebeveyn onayı alınmaktadır.",
    ],
  },
  {
    id: "degisiklikler",
    title: "14. Politika Değişiklikleri",
    content: [
      "Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişikliklerde:",
      "• Kayıtlı ebeveyn e-posta adreslerine bildirim gönderilir",
      "• Platform üzerinde belirgin bir duyuru yayınlanır",
      "• Çocuk verilerini etkileyen değişiklikler için yeniden ebeveyn onayı alınır",
      "",
      "Küçük düzeltmeler ve açıklamalar için e-posta bildirimi yapılmayabilir, ancak güncel politika her zaman bu sayfada yayınlanır.",
    ],
  },
  {
    id: "iletisim",
    title: "15. İletişim ve Şikayet",
    content: [
      "Gizlilik politikamız hakkında soru, talep veya şikayetleriniz için:",
      "",
      "E-posta: kvkk@lumo.com.tr",
      "Telefon: 0850 123 45 67",
      "Adres: İstanbul, Türkiye",
      "",
      "KVKK kapsamındaki başvurularınız için Kişisel Verileri Koruma Kurumu'na da başvuru yapabilirsiniz:",
      "Web: www.kvkk.gov.tr",
      "Telefon: 0312 216 50 50",
    ],
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

export default function PrivacyPolicyPage() {
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
              <Shield className="h-8 w-8 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Gizlilik Politikası
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              Çocuklarınızın kişisel verilerinin korunması en büyük önceliğimizdir.
              Bu politika, verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
            </p>
            <p className="mt-3 text-sm text-[#042940]/30">
              Son güncelleme: {LAST_UPDATED}
            </p>
          </motion.div>
        </section>

        {/* Hızlı Bilgi Kartları */}
        <section className="container pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                title: "Reklamsız Platform",
                desc: "Çocuklara yönelik hiçbir reklam veya davranışsal izleme yoktur.",
              },
              {
                title: "Ebeveyn Kontrolü",
                desc: "Tüm veriler ebeveyn onayı ile toplanır, istediğiniz zaman silinir.",
              },
              {
                title: "Minimum Veri",
                desc: "Yalnızca hizmet için gerekli olan minimum düzeyde veri toplarız.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-0 shadow-sm">
                <CardContent className="p-5 text-center">
                  <h3 className="text-sm font-bold text-[#005C53]">{item.title}</h3>
                  <p className="mt-1 text-xs text-[#042940]/50">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
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
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 sm:p-8">
                      <h2 className="mb-4 text-lg font-bold text-[#042940]">
                        {section.title}
                      </h2>
                      <div className="space-y-2">
                        {section.content.map((line, i) => {
                          if (line === "") {
                            return <div key={i} className="h-3" />;
                          }
                          if (line.startsWith("•")) {
                            return (
                              <p
                                key={i}
                                className="pl-4 text-sm leading-relaxed text-[#042940]/60"
                              >
                                {line}
                              </p>
                            );
                          }
                          return (
                            <p
                              key={i}
                              className="text-sm leading-relaxed text-[#042940]/60"
                            >
                              {line}
                            </p>
                          );
                        })}
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
              href="/gizlilik-politikasi/aydinlatma-metni"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              KVKK Aydınlatma Metni
            </Link>
            <Link
              href="/gizlilik-politikasi/cerez-politikasi"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Çerez Politikası
            </Link>
            <Link
              href="/gizlilik-politikasi/acik-riza"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Açık Rıza Metni
            </Link>
            <Link
              href="/gizlilik-politikasi/basvuru-formu"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Veri Sahibi Başvuru Formu
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
