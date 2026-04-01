"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollText, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  KULLANIM KOŞULLARI BÖLÜMLERİ                                      */
/* ------------------------------------------------------------------ */

interface TermsSection {
  id: string;
  title: string;
  content: string[];
}

const LAST_UPDATED = "31 Mart 2026";

const SECTIONS: TermsSection[] = [
  {
    id: "genel",
    title: "1. Genel Hükümler",
    content: [
      'Bu Kullanım Koşulları ("Koşullar"), LUMO Eğitim Teknolojileri A.Ş. ("Şirket", "biz") tarafından sunulan LUMO Eğitsel Oyun Platformu\'nun ("Platform") kullanımına ilişkin kuralları belirler.',
      "Platform'a erişerek veya kullanarak bu Koşulları kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız Platform'u kullanmamanız gerekmektedir.",
      "Platform, 6-14 yaş arası çocuklara yönelik eğitici oyunlar sunan bir abonelik hizmetidir. Çocuk kullanıcılar yalnızca ebeveyn/veli onayı ve denetimi altında Platform'u kullanabilir.",
    ],
  },
  {
    id: "tanimlar",
    title: "2. Tanımlar",
    content: [
      "• Platform: LUMO Eğitsel Oyun Platformu web sitesi ve mobil uygulaması",
      "• Kullanıcı: Platform'a kayıt olan ve hizmetlerden yararlanan tüm kişiler",
      "• Çocuk Kullanıcı: 18 yaşından küçük olan kullanıcılar",
      "• Ebeveyn/Veli: Çocuk kullanıcının yasal temsilcisi",
      "• Öğretmen: Platform'un eğitmen özelliklerini kullanan eğitim profesyonelleri",
      "• Abonelik: Platform'un ücretli hizmetlerine erişim sağlayan üyelik planı",
      "• İçerik: Platform üzerindeki oyunlar, materyaller, metinler ve görseller",
    ],
  },
  {
    id: "kayit",
    title: "3. Kayıt ve Hesap Oluşturma",
    content: [
      "Hesap oluşturma koşulları:",
      "• Platform'a kayıt olmak için 18 yaşından büyük olmak veya ebeveyn/veli onayına sahip olmak gerekmektedir",
      "• Çocuk kullanıcılar için hesap, ebeveyn/veli tarafından veya ebeveyn/veli onayıyla oluşturulmalıdır",
      "• Kayıt sırasında verilen bilgilerin doğru ve güncel olması zorunludur",
      "• Her kullanıcı yalnızca bir hesap oluşturabilir",
      "",
      "Hesap güvenliği:",
      "• Hesap bilgilerinizin gizliliğinden siz sorumlusunuz",
      "• Şifrenizi üçüncü kişilerle paylaşmamanız gerekmektedir",
      "• Hesabınızda yetkisiz erişim fark ettiğinizde derhal bizi bilgilendirmelisiniz",
      "• Ebeveynler, çocuklarının hesap kullanımından sorumludur",
    ],
  },
  {
    id: "abonelik",
    title: "4. Abonelik ve Ödeme",
    content: [
      "Abonelik planları:",
      "• Platform, aylık ve yıllık abonelik planları sunmaktadır",
      "• Abonelik ücreti, seçilen plana göre belirlenir ve satın alma sırasında açıkça belirtilir",
      "• Ücretsiz deneme süresi sunulabilir; süre sonunda otomatik olarak ücretli aboneliğe geçiş yapılmaz",
      "",
      "Ödeme koşulları:",
      "• Ödemeler Stripe ödeme altyapısı üzerinden güvenli şekilde işlenir",
      "• Kredi/banka kartı bilgileri Şirket tarafından saklanmaz, doğrudan Stripe tarafından işlenir",
      "• Abonelik, dönem sonunda otomatik olarak yenilenir",
      "• Otomatik yenileme, dönem bitiminden en az 24 saat önce iptal edilebilir",
      "",
      "İptal ve iade:",
      "• Abonelik, hesap ayarlarından veya müşteri hizmetleri aracılığıyla iptal edilebilir",
      "• İptal edilen abonelik, mevcut dönem sonuna kadar aktif kalır",
      "• İade politikası, 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümlerine tabidir",
      "• Dijital içerik hizmetlerinde cayma hakkı, hizmetin kullanılmaya başlanmasıyla sona erer",
    ],
  },
  {
    id: "kullanim-kurallari",
    title: "5. Kullanım Kuralları",
    content: [
      "Platform'u kullanırken aşağıdaki kurallara uymanız gerekmektedir:",
      "",
      "Kabul edilen kullanım:",
      "• Platform'u yalnızca eğitim amaçlı kullanmak",
      "• Diğer kullanıcılara saygılı davranmak",
      "• Liderlik tablosunda adil rekabet etmek",
      "• Hesap bilgilerinizi güncel tutmak",
      "",
      "Yasak olan davranışlar:",
      "• Platform'un güvenlik önlemlerini aşmaya veya atlatmaya çalışmak",
      "• Otomatik botlar veya scriptler kullanarak oyun oynamak",
      "• Sahte hesaplar oluşturmak veya başkasının hesabını kullanmak",
      "• Platform içeriklerini izinsiz kopyalamak, dağıtmak veya değiştirmek",
      "• Diğer kullanıcılara zarar verecek davranışlarda bulunmak",
      "• Platform'u ticari amaçla kullanmak (öğretmen hesapları hariç)",
      "• Zararlı yazılım veya kod yaymaya çalışmak",
    ],
  },
  {
    id: "icerik",
    title: "6. İçerik ve Fikri Mülkiyet",
    content: [
      "Platform üzerindeki tüm içerikler (oyunlar, görseller, metinler, sesler, tasarımlar, yazılım kodu) Şirket'in veya lisans verenlerinin fikri mülkiyeti altındadır ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile korunmaktadır.",
      "",
      "Kullanıcılar:",
      "• İçerikleri yalnızca kişisel, ticari olmayan eğitim amaçlı kullanabilir",
      "• İçerikleri kopyalayamaz, çoğaltamaz, dağıtamaz veya türev eserler oluşturamaz",
      "• LUMO markasını, logosunu veya ticari markalarını izinsiz kullanamaz",
      "",
      "Öğretmenler, Platform'u sınıf ortamında eğitim amaçlı kullanabilir, ancak içerikleri platform dışında dağıtamazlar.",
    ],
  },
  {
    id: "cocuk-guvenligi",
    title: "7. Çocuk Güvenliği",
    content: [
      "LUMO, çocuk kullanıcıların güvenliğini en üst düzeyde sağlamayı taahhüt eder:",
      "",
      "• Platform tamamen reklamsızdır; çocuklara hiçbir reklam gösterilmez",
      "• Çocuklar arasında doğrudan iletişim (mesajlaşma, sohbet) özelliği bulunmaz",
      "• Çocuklar dış web sitelerine yönlendirilmez",
      "• Çocuklar doğrudan satın alma yapamaz; tüm ödemeler ebeveyn hesabı üzerinden gerçekleşir",
      "• Liderlik tablosunda yalnızca kullanıcı adları gösterilir, gerçek kimlik bilgileri paylaşılmaz",
      "• Tüm oyun içerikleri MEB müfredatına uygun ve yaşa uygun olarak tasarlanır",
      "• Çocuk verilerinin korunmasına ilişkin detaylar Gizlilik Politikamızda yer almaktadır",
    ],
  },
  {
    id: "ogretmen",
    title: "8. Öğretmen Hesapları",
    content: [
      "Öğretmen hesaplarına ilişkin özel kurallar:",
      "",
      "• Öğretmenler, sınıf oluşturabilir ve öğrencilerini platforma davet edebilir",
      "• Öğretmenler, yalnızca kendi sınıflarındaki öğrencilerin ilerleme verilerini görebilir",
      "• Öğrenci verilerinin sınıf dışında paylaşılması yasaktır",
      "• Öğretmenler, Platform'u yalnızca eğitim amaçlı kullanabilir",
      "• Okul/kurum adına toplu abonelik koşulları ayrıca belirlenir",
    ],
  },
  {
    id: "sorumluluk",
    title: "9. Sorumluluk Sınırlamaları",
    content: [
      "Şirket, Platform'un kesintisiz ve hatasız çalışacağını garanti etmez. Teknik bakım, güncelleme veya beklenmedik durumlar nedeniyle geçici erişim kesintileri yaşanabilir.",
      "",
      "Şirket'in sorumlu olmadığı durumlar:",
      "• İnternet bağlantı sorunlarından kaynaklanan erişim problemleri",
      "• Kullanıcının hesap bilgilerini paylaşması sonucu oluşan zararlar",
      "• Mücbir sebep halleri (doğal afet, savaş, pandemi vb.)",
      "• Platform dışı üçüncü taraf hizmetlerindeki aksaklıklar",
      "",
      "Şirket, Platform'un eğitim içeriklerinin doğruluğu ve güncelliği konusunda azami özeni gösterir, ancak resmi eğitim materyallerinin yerine geçtiğini taahhüt etmez.",
    ],
  },
  {
    id: "fesih",
    title: "10. Hesap Askıya Alma ve Fesih",
    content: [
      "Şirket, aşağıdaki durumlarda kullanıcı hesabını askıya alabilir veya feshedebilir:",
      "",
      "• Kullanım kurallarının ihlal edilmesi",
      "• Sahte veya yanıltıcı bilgilerle kayıt olunması",
      "• Platform güvenliğini tehdit eden davranışlar",
      "• Yasal makamlardan gelen talepler",
      "",
      "Hesap feshinde:",
      "• Kullanıcıya önceden bildirim yapılır (acil durumlar hariç)",
      "• Kalan abonelik süresi için orantılı iade yapılır",
      "• Kişisel veriler, Gizlilik Politikası'nda belirtilen sürelerde silinir",
    ],
  },
  {
    id: "degisiklikler",
    title: "11. Koşullarda Değişiklik",
    content: [
      "Şirket, bu Kullanım Koşullarını önceden bildirimde bulunarak değiştirme hakkını saklı tutar.",
      "",
      "• Önemli değişiklikler, kayıtlı e-posta adreslerine ve Platform üzerinden bildirilir",
      "• Değişiklikler, bildirim tarihinden itibaren 30 gün sonra yürürlüğe girer",
      "• Değişiklikleri kabul etmeyen kullanıcılar, yürürlük tarihine kadar hesabını kapatabilir",
      "• Platform'u kullanmaya devam etmek, güncellenmiş koşulları kabul ettiğiniz anlamına gelir",
    ],
  },
  {
    id: "uyusmazlik",
    title: "12. Uyuşmazlık Çözümü",
    content: [
      "Bu Koşullar, Türkiye Cumhuriyeti kanunlarına tabidir.",
      "",
      "Uyuşmazlık halinde:",
      "• Öncelikle dostane çözüm yolu aranır",
      "• Çözüme ulaşılamaması halinde İstanbul Mahkemeleri ve İcra Daireleri yetkilidir",
      "• Tüketici hakları kapsamındaki uyuşmazlıklar için Tüketici Hakem Heyetleri'ne başvuru yapılabilir",
      "",
      "6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili yönetmelikler saklıdır.",
    ],
  },
  {
    id: "iletisim",
    title: "13. İletişim",
    content: [
      "Bu Kullanım Koşulları hakkında sorularınız için:",
      "",
      "E-posta: iletisim@lumo.com.tr",
      "Telefon: 0850 123 45 67",
      "Adres: İstanbul, Türkiye",
    ],
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

export default function TermsPage() {
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
              <ScrollText className="h-8 w-8 text-[#005C53]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#042940] sm:text-5xl">
              Kullanım Koşulları
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#042940]/50">
              LUMO Eğitsel Oyun Platformu'nu kullanmadan önce lütfen bu koşulları dikkatle okuyunuz.
            </p>
            <p className="mt-3 text-sm text-[#042940]/30">
              Son güncelleme: {LAST_UPDATED}
            </p>
          </motion.div>
        </section>

        {/* İçerik */}
        <section className="container pb-16">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
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
              href="/gizlilik-politikasi"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/kvkk"
              className="rounded-full border border-[#042940]/10 px-5 py-2 text-sm font-medium text-[#042940]/60 transition-colors hover:border-[#005C53]/30 hover:text-[#005C53]"
            >
              KVKK Aydınlatma Metni
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
