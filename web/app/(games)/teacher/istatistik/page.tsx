"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  SpellCheck,
  Target,
  Brain,
  Lightbulb,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  MÜFREDAT VERİ YAPISI                                               */
/* ------------------------------------------------------------------ */

interface KavramsalBeceri {
  kod: string;
  ad: string;
  sinifOrtalama: number; // 0-100
  oyunSayisi: number;
}

interface AlanBecerisi {
  kod: string;
  ad: string;
  sinifOrtalama: number;
  kavramsalBeceriler: KavramsalBeceri[];
}

interface Tema {
  id: number;
  ad: string;
  dersSaati: number;
  sinifOrtalama: number;
  alanBecerileri: AlanBecerisi[];
}

interface Ders {
  ad: string;
  icon: React.ElementType;
  color: string;
  temalar: Tema[];
}

/* ------------------------------------------------------------------ */
/*  MOCK VERİ — MEB Maarif Müfredatı Yapısına Uygun                    */
/* ------------------------------------------------------------------ */

const DERSLER: Ders[] = [
  {
    ad: "Matematik",
    icon: Calculator,
    color: "bg-[#9FC131]",
    temalar: [
      {
        id: 1,
        ad: "Sayılar ve Nicelikler",
        dersSaati: 28,
        sinifOrtalama: 74,
        alanBecerileri: [
          {
            kod: "MAB2",
            ad: "Matematiksel Problem Çözme",
            sinifOrtalama: 78,
            kavramsalBeceriler: [
              { kod: "KB2.9", ad: "Genelleme", sinifOrtalama: 72, oyunSayisi: 45 },
              { kod: "KB2.3", ad: "Sınıflandırma", sinifOrtalama: 81, oyunSayisi: 38 },
              { kod: "KB2.7", ad: "Tahmin Etme", sinifOrtalama: 68, oyunSayisi: 32 },
            ],
          },
          {
            kod: "MAB1",
            ad: "Matematiksel Muhakeme",
            sinifOrtalama: 70,
            kavramsalBeceriler: [
              { kod: "KB1.2", ad: "Karşılaştırma", sinifOrtalama: 75, oyunSayisi: 40 },
              { kod: "KB1.5", ad: "Sıralama", sinifOrtalama: 82, oyunSayisi: 35 },
              { kod: "KB1.8", ad: "İlişkilendirme", sinifOrtalama: 65, oyunSayisi: 28 },
            ],
          },
        ],
      },
      {
        id: 2,
        ad: "Cebir",
        dersSaati: 20,
        sinifOrtalama: 68,
        alanBecerileri: [
          {
            kod: "MAB3",
            ad: "Matematiksel Temsil",
            sinifOrtalama: 65,
            kavramsalBeceriler: [
              { kod: "KB3.1", ad: "Modelleme", sinifOrtalama: 60, oyunSayisi: 22 },
              { kod: "KB3.4", ad: "Dönüştürme", sinifOrtalama: 70, oyunSayisi: 18 },
            ],
          },
          {
            kod: "MAB2",
            ad: "Matematiksel Problem Çözme",
            sinifOrtalama: 71,
            kavramsalBeceriler: [
              { kod: "KB2.1", ad: "Örüntü Bulma", sinifOrtalama: 74, oyunSayisi: 30 },
              { kod: "KB2.5", ad: "Çözüm Üretme", sinifOrtalama: 68, oyunSayisi: 25 },
            ],
          },
        ],
      },
      {
        id: 3,
        ad: "Geometri ve Ölçme",
        dersSaati: 24,
        sinifOrtalama: 72,
        alanBecerileri: [
          {
            kod: "MAB4",
            ad: "Uzamsal Düşünme",
            sinifOrtalama: 75,
            kavramsalBeceriler: [
              { kod: "KB4.1", ad: "Görselleştirme", sinifOrtalama: 78, oyunSayisi: 35 },
              { kod: "KB4.3", ad: "Konumlandırma", sinifOrtalama: 72, oyunSayisi: 28 },
            ],
          },
          {
            kod: "MAB5",
            ad: "Matematiksel Araç ve Teknoloji ile Çalışma",
            sinifOrtalama: 69,
            kavramsalBeceriler: [
              { kod: "KB5.2", ad: "Ölçme", sinifOrtalama: 71, oyunSayisi: 32 },
              { kod: "KB5.4", ad: "Hesaplama", sinifOrtalama: 67, oyunSayisi: 26 },
            ],
          },
        ],
      },
      {
        id: 4,
        ad: "Veri İşleme ve Olasılık",
        dersSaati: 16,
        sinifOrtalama: 76,
        alanBecerileri: [
          {
            kod: "MAB2",
            ad: "Matematiksel Problem Çözme",
            sinifOrtalama: 76,
            kavramsalBeceriler: [
              { kod: "KB2.8", ad: "Veri Analizi", sinifOrtalama: 79, oyunSayisi: 20 },
              { kod: "KB2.10", ad: "Yorumlama", sinifOrtalama: 73, oyunSayisi: 18 },
            ],
          },
        ],
      },
    ],
  },
  {
    ad: "Türkçe",
    icon: BookOpen,
    color: "bg-[#005C53]",
    temalar: [
      {
        id: 1,
        ad: "Okuma ve Anlama",
        dersSaati: 32,
        sinifOrtalama: 80,
        alanBecerileri: [
          {
            kod: "TAB1",
            ad: "Okuduğunu Anlama",
            sinifOrtalama: 82,
            kavramsalBeceriler: [
              { kod: "TK1.1", ad: "Ana Fikir Bulma", sinifOrtalama: 85, oyunSayisi: 40 },
              { kod: "TK1.3", ad: "Çıkarım Yapma", sinifOrtalama: 78, oyunSayisi: 35 },
            ],
          },
          {
            kod: "TAB2",
            ad: "Söz Varlığı",
            sinifOrtalama: 78,
            kavramsalBeceriler: [
              { kod: "TK2.1", ad: "Kelime Anlamı", sinifOrtalama: 82, oyunSayisi: 45 },
              { kod: "TK2.4", ad: "Bağlamdan Anlam", sinifOrtalama: 74, oyunSayisi: 30 },
            ],
          },
        ],
      },
      {
        id: 2,
        ad: "Yazma",
        dersSaati: 24,
        sinifOrtalama: 72,
        alanBecerileri: [
          {
            kod: "TAB3",
            ad: "Yazılı Anlatım",
            sinifOrtalama: 72,
            kavramsalBeceriler: [
              { kod: "TK3.1", ad: "Cümle Kurma", sinifOrtalama: 75, oyunSayisi: 28 },
              { kod: "TK3.3", ad: "Yazım Kuralları", sinifOrtalama: 69, oyunSayisi: 25 },
            ],
          },
        ],
      },
    ],
  },
  {
    ad: "Fen Bilimleri",
    icon: FlaskConical,
    color: "bg-[#042940]",
    temalar: [
      {
        id: 1,
        ad: "Canlılar ve Yaşam",
        dersSaati: 28,
        sinifOrtalama: 76,
        alanBecerileri: [
          {
            kod: "FAB1",
            ad: "Bilimsel Süreç Becerileri",
            sinifOrtalama: 76,
            kavramsalBeceriler: [
              { kod: "FK1.1", ad: "Gözlem", sinifOrtalama: 80, oyunSayisi: 30 },
              { kod: "FK1.3", ad: "Sınıflandırma", sinifOrtalama: 72, oyunSayisi: 25 },
            ],
          },
        ],
      },
      {
        id: 2,
        ad: "Madde ve Doğası",
        dersSaati: 20,
        sinifOrtalama: 70,
        alanBecerileri: [
          {
            kod: "FAB2",
            ad: "Bilimsel Muhakeme",
            sinifOrtalama: 70,
            kavramsalBeceriler: [
              { kod: "FK2.1", ad: "Deney Tasarlama", sinifOrtalama: 68, oyunSayisi: 22 },
              { kod: "FK2.4", ad: "Sonuç Çıkarma", sinifOrtalama: 72, oyunSayisi: 20 },
            ],
          },
        ],
      },
    ],
  },
  {
    ad: "Sosyal Bilgiler",
    icon: Globe,
    color: "bg-[#005C53]",
    temalar: [
      {
        id: 1,
        ad: "Birey ve Toplum",
        dersSaati: 20,
        sinifOrtalama: 74,
        alanBecerileri: [
          {
            kod: "SAB1",
            ad: "Sosyal Katılım",
            sinifOrtalama: 74,
            kavramsalBeceriler: [
              { kod: "SK1.1", ad: "Empati", sinifOrtalama: 78, oyunSayisi: 18 },
              { kod: "SK1.3", ad: "İş Birliği", sinifOrtalama: 70, oyunSayisi: 15 },
            ],
          },
        ],
      },
    ],
  },
  {
    ad: "İngilizce",
    icon: SpellCheck,
    color: "bg-[#9FC131]",
    temalar: [
      {
        id: 1,
        ad: "Listening & Speaking",
        dersSaati: 24,
        sinifOrtalama: 72,
        alanBecerileri: [
          {
            kod: "EAB1",
            ad: "Communicative Competence",
            sinifOrtalama: 72,
            kavramsalBeceriler: [
              { kod: "EK1.1", ad: "Vocabulary", sinifOrtalama: 76, oyunSayisi: 35 },
              { kod: "EK1.3", ad: "Listening Comprehension", sinifOrtalama: 68, oyunSayisi: 22 },
            ],
          },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  YARDIMCI FONKSİYONLAR                                              */
/* ------------------------------------------------------------------ */

function getScoreColor(score: number): string {
  if (score >= 80) return "text-[#9FC131]";
  if (score >= 60) return "text-[#005C53]";
  if (score >= 40) return "text-[#E8634A]";
  return "text-red-500";
}

function getBarColor(score: number): string {
  if (score >= 80) return "bg-[#9FC131]";
  if (score >= 60) return "bg-[#005C53]";
  if (score >= 40) return "bg-[#E8634A]";
  return "bg-red-500";
}

/* ------------------------------------------------------------------ */
/*  BİLEŞENLER                                                         */
/* ------------------------------------------------------------------ */

function KavramsalBeceriRow({ beceri }: { beceri: KavramsalBeceri }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#042940]/5">
        <Brain className="h-3.5 w-3.5 text-[#042940]/40" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="rounded bg-[#042940]/5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#042940]/50">{beceri.kod}</span>
            <span className="truncate text-xs font-medium text-[#042940]">{beceri.ad}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-2">
            <span className="text-[10px] text-[#042940]/30">{beceri.oyunSayisi} oyun</span>
            <span className={cn("text-xs font-bold", getScoreColor(beceri.sinifOrtalama))}>%{beceri.sinifOrtalama}</span>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#042940]/5">
          <div className={cn("h-full rounded-full transition-all", getBarColor(beceri.sinifOrtalama))} style={{ width: `${beceri.sinifOrtalama}%` }} />
        </div>
      </div>
    </div>
  );
}

function AlanBecerisiCard({ beceri }: { beceri: AlanBecerisi }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#042940]/5 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#005C53]/10">
            <Target className="h-4 w-4 text-[#005C53]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#005C53]/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#005C53]">{beceri.kod}</span>
              <span className="text-sm font-bold text-[#042940]">{beceri.ad}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-[#042940]/40">{beceri.kavramsalBeceriler.length} kavramsal beceri</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn("text-lg font-extrabold", getScoreColor(beceri.sinifOrtalama))}>%{beceri.sinifOrtalama}</span>
          <ChevronDown className={cn("h-4 w-4 text-[#042940]/30 transition-transform", open && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#042940]/5 px-4 py-2 space-y-1">
              {beceri.kavramsalBeceriler.map((kb) => (
                <KavramsalBeceriRow key={kb.kod} beceri={kb} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TemaCard({ tema, dersColor }: { tema: Tema; dersColor: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-sm overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-4">
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl text-white", dersColor)}>
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#042940]">{tema.ad}</h3>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-[#042940]/40">
                <span>{tema.dersSaati} ders saati</span>
                <span>{tema.alanBecerileri.length} alan becerisi</span>
                <span>{tema.alanBecerileri.reduce((s, a) => s + a.kavramsalBeceriler.length, 0)} kavramsal beceri</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className={cn("text-xl font-extrabold", getScoreColor(tema.sinifOrtalama))}>%{tema.sinifOrtalama}</p>
              <p className="text-[10px] text-[#042940]/30">sınıf ort.</p>
            </div>
            <ChevronRight className={cn("h-5 w-5 text-[#042940]/20 transition-transform", open && "rotate-90")} />
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#042940]/5 p-5 space-y-3">
                {tema.alanBecerileri.map((ab) => (
                  <AlanBecerisiCard key={`${tema.id}-${ab.kod}`} beceri={ab} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function IstatistikPage() {
  const [selectedDers, setSelectedDers] = useState(0);
  const ders = DERSLER[selectedDers];
  const DersIcon = ders.icon;

  const genel = {
    temaOrtalama: Math.round(ders.temalar.reduce((s, t) => s + t.sinifOrtalama, 0) / ders.temalar.length),
    toplamTema: ders.temalar.length,
    toplamAlanBecerisi: ders.temalar.reduce((s, t) => s + t.alanBecerileri.length, 0),
    toplamKavramsal: ders.temalar.reduce((s, t) => s + t.alanBecerileri.reduce((s2, a) => s2 + a.kavramsalBeceriler.length, 0), 0),
  };

  return (
    <div className="container py-8">
      {/* Başlık */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <BarChart3 className="h-5 w-5 text-[#005C53]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#042940]">Müfredat İstatistikleri</h1>
            <p className="mt-0.5 text-[#042940]/50">Tema, alan becerisi ve kavramsal beceri bazında sınıf performansı</p>
          </div>
        </div>
      </motion.div>

      {/* Ders Seçimi */}
      <div className="mb-6 flex flex-wrap gap-2">
        {DERSLER.map((d, i) => {
          const Icon = d.icon;
          return (
            <button
              key={d.ad}
              onClick={() => setSelectedDers(i)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                selectedDers === i
                  ? "bg-[#042940] text-white shadow-md"
                  : "bg-white text-[#042940]/50 shadow-sm hover:text-[#042940]"
              )}
            >
              <Icon className="h-4 w-4" />
              {d.ad}
            </button>
          );
        })}
      </div>

      {/* Genel İstatistikler */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Sınıf Ortalaması", value: `%${genel.temaOrtalama}`, icon: BarChart3, color: getScoreColor(genel.temaOrtalama) },
          { label: "Tema", value: genel.toplamTema.toString(), icon: Lightbulb, color: "text-[#042940]" },
          { label: "Alan Becerisi", value: genel.toplamAlanBecerisi.toString(), icon: Target, color: "text-[#005C53]" },
          { label: "Kavramsal Beceri", value: genel.toplamKavramsal.toString(), icon: Brain, color: "text-[#042940]/60" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042940]/5">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div>
                <p className={cn("text-xl font-extrabold", stat.color)}>{stat.value}</p>
                <p className="text-[10px] text-[#042940]/40">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sınıf Seçimi */}
      <div className="mb-6 flex items-center gap-2">
        <Users className="h-4 w-4 text-[#042940]/30" />
        <span className="text-sm text-[#042940]/40">Sınıf:</span>
        <div className="flex rounded-lg bg-white p-1 shadow-sm">
          {["5-A", "5-B", "6-A"].map((sinif, i) => (
            <button key={sinif} className={cn("rounded-md px-3 py-1 text-xs font-medium transition-all", i === 0 ? "bg-[#042940] text-white" : "text-[#042940]/40 hover:text-[#042940]")}>
              {sinif}
            </button>
          ))}
        </div>
      </div>

      {/* Tema Listesi */}
      <div className="space-y-4">
        {ders.temalar.map((tema) => (
          <TemaCard key={tema.id} tema={tema} dersColor={ders.color} />
        ))}
      </div>
    </div>
  );
}
