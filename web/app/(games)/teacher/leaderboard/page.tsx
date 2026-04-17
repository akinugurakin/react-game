"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, Medal, Crown, MapPin, School,
  Calculator, BookOpen, FlaskConical, Globe, SpellCheck,
  ChevronDown, GraduationCap, Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BeanHead } from "beanheads";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  AVATAR                                                            */
/* ------------------------------------------------------------------ */

const avatarPool = [
  { skinTone: "light",  hair: "short",  hairColor: "brown",  eyes: "happy",   mouth: "grin",       body: "chest"   },
  { skinTone: "yellow", hair: "long",   hairColor: "black",  eyes: "normal",  mouth: "openSmile",  body: "breasts", lashes: true },
  { skinTone: "light",  hair: "buzz",   hairColor: "blonde", eyes: "content", mouth: "openSmile",  body: "chest"   },
  { skinTone: "light",  hair: "bob",    hairColor: "orange", eyes: "wink",    mouth: "grin",       body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "short",  hairColor: "black",  eyes: "happy",   mouth: "tongue",     body: "chest"   },
  { skinTone: "light",  hair: "pixie",  hairColor: "brown",  eyes: "normal",  mouth: "openSmile",  body: "breasts", lashes: true },
  { skinTone: "light",  hair: "short",  hairColor: "brown",  eyes: "squint",  mouth: "serious",    body: "chest"   },
  { skinTone: "light",  hair: "bun",    hairColor: "blonde", eyes: "happy",   mouth: "lips",       body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "buzz",   hairColor: "brown",  eyes: "content", mouth: "grin",       body: "chest"   },
  { skinTone: "light",  hair: "long",   hairColor: "pink",   eyes: "heart",   mouth: "openSmile",  body: "breasts", lashes: true },
];

function PlayerAvatar({ idx, size = 36 }: { idx: number; size?: number }) {
  const d = avatarPool[idx % avatarPool.length] as any;
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE]" style={{ width: size, height: size }}>
      <div style={{ width: size, height: size }}>
        <BeanHead skinTone={d.skinTone} hair={d.hair} hairColor={d.hairColor} eyes={d.eyes} eyebrows="raised" mouth={d.mouth} body={d.body} clothing="shirt" clothingColor="blue" accessory="none" hat="none" hatColor="white" facialHair="none" graphic="none" lashes={d.lashes || false} lipColor="red" faceMaskColor="white" mask={false} faceMask={false} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MÜFREDAт VERİSİ (Filtre ağacı için)                              */
/* ------------------------------------------------------------------ */

interface KazanimDef {
  kod: string;
  ad: string;
}

interface TemaDef {
  ad: string;
  kazanimlar: KazanimDef[];
}

interface DersDef {
  value: string;
  label: string;
  icon: React.ElementType;
  temalar: TemaDef[];
}

const DERSLER: DersDef[] = [
  {
    value: "matematik",
    label: "Matematik",
    icon: Calculator,
    temalar: [
      {
        ad: "Doğal Sayılar",
        kazanimlar: [
          { kod: "MAT.5.1.1", ad: "Doğal sayıları okur, yazar ve karşılaştırır" },
          { kod: "MAT.5.1.2", ad: "Doğal sayılarla dört işlem yapar" },
          { kod: "MAT.5.1.3", ad: "EBOB ve EKOK kavramlarını açıklar" },
        ],
      },
      {
        ad: "Kesirler",
        kazanimlar: [
          { kod: "MAT.5.2.1", ad: "Kesirleri karşılaştırır ve sıralar" },
          { kod: "MAT.5.2.2", ad: "Kesirlerle toplama ve çıkarma işlemi yapar" },
        ],
      },
      {
        ad: "Geometri ve Ölçme",
        kazanimlar: [
          { kod: "MAT.5.3.1", ad: "Üçgenin alanını hesaplar ve problem çözer" },
          { kod: "MAT.6.4.1", ad: "Dairenin çevre uzunluğunu ve alanını hesaplar" },
        ],
      },
      {
        ad: "Tam Sayılar",
        kazanimlar: [
          { kod: "MAT.6.1.1", ad: "Tam sayılarla toplama ve çıkarma işlemi yapar" },
          { kod: "MAT.6.1.2", ad: "Tam sayılarla çarpma işlemi yapar" },
        ],
      },
    ],
  },
  {
    value: "turkce",
    label: "Türkçe",
    icon: BookOpen,
    temalar: [
      {
        ad: "Okuma ve Anlama",
        kazanimlar: [
          { kod: "TUR.5.1.1", ad: "Metni sesli ve sessiz okur" },
          { kod: "TUR.5.1.2", ad: "Metnin ana fikrini belirler" },
          { kod: "TUR.6.1.1", ad: "Metnin içeriğini farklı metin türleriyle karşılaştırır" },
        ],
      },
      {
        ad: "Söz Varlığı ve Dil Bilgisi",
        kazanimlar: [
          { kod: "TUR.5.3.1", ad: "Eş anlamlı ve zıt anlamlı kelimeleri kullanır" },
          { kod: "TUR.5.3.2", ad: "Deyim ve atasözlerinin anlamlarını kavrar" },
          { kod: "TUR.6.2.1", ad: "Kelimelerin gerçek ve mecaz anlamlarını kavrar" },
        ],
      },
      {
        ad: "Yazma",
        kazanimlar: [
          { kod: "TUR.5.2.1", ad: "Yazma sürecinin aşamalarını uygular" },
          { kod: "TUR.5.2.2", ad: "İmlâ ve noktalama kurallarını doğru kullanır" },
        ],
      },
    ],
  },
  {
    value: "fen",
    label: "Fen Bilimleri",
    icon: FlaskConical,
    temalar: [
      {
        ad: "Canlılar ve Yaşam",
        kazanimlar: [
          { kod: "FEN.5.1.1", ad: "Besin zinciri ve besin ağı kavramlarını ilişkilendirir" },
          { kod: "FEN.5.1.2", ad: "Ekosistemde madde döngüsünü açıklar" },
          { kod: "FEN.6.1.2", ad: "Canlıları sınıflandırma kriterlerini belirler" },
        ],
      },
      {
        ad: "Madde ve Değişim",
        kazanimlar: [
          { kod: "FEN.5.2.1", ad: "Maddenin hallerini ve hal değişimlerini açıklar" },
          { kod: "FEN.6.2.1", ad: "Saf madde ve karışım kavramlarını ayırt eder" },
        ],
      },
      {
        ad: "Periyodik Sistem",
        kazanimlar: [
          { kod: "FB.8.5.1.1", ad: "Elementleri metal, ametal, yarı metal olarak sınıflandırır" },
        ],
      },
    ],
  },
  {
    value: "sosyal",
    label: "Sosyal Bilgiler",
    icon: Globe,
    temalar: [
      {
        ad: "Birey ve Toplum",
        kazanimlar: [
          { kod: "SOS.5.1.1", ad: "Aile ve toplumun bireyden beklentilerini açıklar" },
          { kod: "SOS.6.1.2", ad: "Demokrasi ve vatandaşlık kavramlarını ilişkilendirir" },
        ],
      },
      {
        ad: "Kültür ve Miras",
        kazanimlar: [
          { kod: "SOS.5.2.1", ad: "Türk kültürünün temel değerlerini örnekler" },
          { kod: "SOS.6.2.1", ad: "İpek Yolu'nun tarihî ve kültürel önemini açıklar" },
        ],
      },
    ],
  },
  {
    value: "ingilizce",
    label: "İngilizce",
    icon: SpellCheck,
    temalar: [
      {
        ad: "Hello! / Appearance",
        kazanimlar: [
          { kod: "ENG.5.1.1", ad: "Introduces themselves and others" },
          { kod: "ENG.6.1.1", ad: "Describes people's physical appearance and personality" },
        ],
      },
      {
        ad: "My Town / Breakfast",
        kazanimlar: [
          { kod: "ENG.5.2.1", ad: "Describes locations in town using prepositions" },
          { kod: "ENG.6.2.1", ad: "Talks about food preferences" },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  MOCK VERİ                                                         */
/* ------------------------------------------------------------------ */

type Player = { rank: number; username: string; avatarIdx: number; score: number; games: number };

const turkiyeData: Player[] = [
  { rank: 1, username: "Efe Yıldız",   avatarIdx: 0, score: 9850, games: 142 },
  { rank: 2, username: "Zeynep Kaya",  avatarIdx: 1, score: 9420, games: 138 },
  { rank: 3, username: "Ali Demir",    avatarIdx: 2, score: 9100, games: 131 },
  { rank: 4, username: "Ece Arslan",   avatarIdx: 3, score: 8750, games: 125 },
  { rank: 5, username: "Can Yılmaz",   avatarIdx: 4, score: 8500, games: 119 },
  { rank: 6, username: "Defne Koç",    avatarIdx: 5, score: 8200, games: 115 },
  { rank: 7, username: "Emre Akın",    avatarIdx: 6, score: 7900, games: 108 },
  { rank: 8, username: "Ayşe Gül",     avatarIdx: 7, score: 7650, games: 102 },
  { rank: 9, username: "Mert Can",     avatarIdx: 8, score: 7400, games: 98  },
  { rank: 10, username: "İrem Su",     avatarIdx: 9, score: 7100, games: 95  },
];

const okulData: Player[] = [
  { rank: 1, username: "Ece Arslan",   avatarIdx: 3, score: 4850, games: 65 },
  { rank: 2, username: "Can Yılmaz",   avatarIdx: 4, score: 4620, games: 61 },
  { rank: 3, username: "Emre Akın",    avatarIdx: 6, score: 4380, games: 58 },
  { rank: 4, username: "Defne Koç",    avatarIdx: 5, score: 3900, games: 52 },
  { rank: 5, username: "Mert Can",     avatarIdx: 8, score: 3650, games: 48 },
  { rank: 6, username: "İrem Su",      avatarIdx: 9, score: 3400, games: 45 },
  { rank: 7, username: "Burak Ay",     avatarIdx: 0, score: 3200, games: 42 },
  { rank: 8, username: "Seda Türk",    avatarIdx: 1, score: 2950, games: 39 },
  { rank: 9, username: "Yıldız Ela",   avatarIdx: 2, score: 2700, games: 36 },
  { rank: 10, username: "Onur Bey",    avatarIdx: 7, score: 2500, games: 33 },
];

const dataByScope: Record<string, Player[]> = { turkiye: turkiyeData, okul: okulData };

const scopeLabels: Record<string, { label: string; icon: React.ElementType }> = {
  turkiye: { label: "Türkiye Geneli", icon: MapPin },
  okul:    { label: "Okulum",         icon: School },
};

/* ------------------------------------------------------------------ */
/*  YARDIMCI                                                          */
/* ------------------------------------------------------------------ */

function getRankDisplay(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-sm font-bold text-[#042940]/40">#{rank}</span>;
}

/* ------------------------------------------------------------------ */
/*  FİLTRE BİLEŞENİ                                                   */
/* ------------------------------------------------------------------ */

interface FilterState {
  ders: string | null;
  tema: string | null;
  kazanim: string | null;
}

function FilterBar({
  filter,
  onChange,
}: {
  filter: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const [temaOpen, setTemaOpen] = useState(false);
  const [kazanimOpen, setKazanimOpen] = useState(false);

  const selectedDers = DERSLER.find((d) => d.value === filter.ders) ?? null;
  const selectedTema = selectedDers?.temalar.find((t) => t.ad === filter.tema) ?? null;

  function selectDers(value: string) {
    if (filter.ders === value) {
      onChange({ ders: null, tema: null, kazanim: null });
    } else {
      onChange({ ders: value, tema: null, kazanim: null });
    }
    setTemaOpen(false);
    setKazanimOpen(false);
  }

  function selectTema(ad: string) {
    if (filter.tema === ad) {
      onChange({ ...filter, tema: null, kazanim: null });
    } else {
      onChange({ ...filter, tema: ad, kazanim: null });
    }
    setTemaOpen(false);
    setKazanimOpen(false);
  }

  function selectKazanim(kod: string) {
    onChange({ ...filter, kazanim: filter.kazanim === kod ? null : kod });
    setKazanimOpen(false);
  }

  return (
    <div className="mb-6 space-y-3">
      {/* Ders seçimi */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange({ ders: null, tema: null, kazanim: null })}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
            filter.ders === null
              ? "bg-[#005C53] text-white shadow-md"
              : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
          )}
        >
          <Trophy className="h-4 w-4" /> Genel Sıralama
        </button>
        {DERSLER.map((d) => (
          <button
            key={d.value}
            onClick={() => selectDers(d.value)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              filter.ders === d.value
                ? "bg-[#005C53] text-white shadow-md"
                : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
            )}
          >
            <d.icon className="h-4 w-4" /> {d.label}
          </button>
        ))}
      </div>

      {/* Tema seçimi — yalnızca ders seçiliyse */}
      <AnimatePresence>
        {selectedDers && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="relative inline-block">
              <button
                onClick={() => { setTemaOpen(!temaOpen); setKazanimOpen(false); }}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  filter.tema
                    ? "bg-[#042940] text-white shadow-md"
                    : "bg-white text-[#042940]/60 shadow-sm hover:text-[#042940]"
                )}
              >
                <Lightbulb className="h-4 w-4" />
                {filter.tema ?? "Tema seç"}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", temaOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {temaOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute left-0 top-full z-20 mt-2 min-w-[240px] rounded-2xl bg-white p-2 shadow-xl ring-1 ring-[#042940]/10"
                  >
                    {selectedDers.temalar.map((t) => (
                      <button
                        key={t.ad}
                        onClick={() => selectTema(t.ad)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                          filter.tema === t.ad
                            ? "bg-[#042940] text-white font-semibold"
                            : "text-[#042940]/70 hover:bg-[#042940]/5"
                        )}
                      >
                        <Lightbulb className="h-3.5 w-3.5 shrink-0" /> {t.ad}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Kazanım seçimi — tema seçiliyse */}
            {selectedTema && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative ml-2 inline-block"
              >
                <button
                  onClick={() => { setKazanimOpen(!kazanimOpen); setTemaOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                    filter.kazanim
                      ? "bg-[#9FC131] text-[#042940] shadow-md"
                      : "bg-white text-[#042940]/60 shadow-sm hover:text-[#042940]"
                  )}
                >
                  <GraduationCap className="h-4 w-4" />
                  {filter.kazanim
                    ? selectedTema.kazanimlar.find((k) => k.kod === filter.kazanim)?.kod ?? "Kazanım"
                    : "Kazanım seç"}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", kazanimOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {kazanimOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 top-full z-20 mt-2 min-w-[320px] rounded-2xl bg-white p-2 shadow-xl ring-1 ring-[#042940]/10"
                    >
                      {selectedTema.kazanimlar.map((k) => (
                        <button
                          key={k.kod}
                          onClick={() => selectKazanim(k.kod)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                            filter.kazanim === k.kod
                              ? "bg-[#9FC131]/20 font-semibold text-[#042940]"
                              : "text-[#042940]/70 hover:bg-[#042940]/5"
                          )}
                        >
                          <span className="rounded border border-[#042940]/10 bg-[#042940]/5 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#042940]/60 shrink-0">
                            {k.kod}
                          </span>
                          <span className="truncate">{k.ad}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aktif filtre özeti */}
      {(filter.ders || filter.tema || filter.kazanim) && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#042940]/50">
          <span>Filtre:</span>
          {filter.ders && (
            <span className="rounded-full bg-[#005C53]/10 px-2.5 py-1 font-medium text-[#005C53]">
              {DERSLER.find((d) => d.value === filter.ders)?.label}
            </span>
          )}
          {filter.tema && (
            <span className="rounded-full bg-[#042940]/8 px-2.5 py-1 font-medium text-[#042940]">
              {filter.tema}
            </span>
          )}
          {filter.kazanim && (
            <span className="rounded-full bg-[#9FC131]/20 px-2.5 py-1 font-mono font-bold text-[#042940]">
              {filter.kazanim}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA İÇERİĞİ                                                     */
/* ------------------------------------------------------------------ */

function TeacherLeaderboardContent() {
  const searchParams = useSearchParams();
  const scope = searchParams.get("scope") || "turkiye";
  const scopeInfo = scopeLabels[scope] || scopeLabels.turkiye;
  const ScopeIcon = scopeInfo.icon;
  const players = dataByScope[scope] || turkiyeData;

  const [filter, setFilter] = useState<FilterState>({ ders: null, tema: null, kazanim: null });

  return (
    <div className="container py-8" onClick={() => {}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005C53]/10">
            <ScopeIcon className="h-5 w-5 text-[#005C53]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">Liderlik Tablosu</h1>
            <p className="text-sm text-muted-foreground">
              {scopeInfo.label} — Öğretmen Görünümü · {players.length} kişi
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filtreler */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <FilterBar filter={filter} onChange={setFilter} />
      </motion.div>

      {/* Top 3 */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {players.slice(0, 3).map((p, i) => (
          <Card
            key={p.rank}
            className={cn(
              "border-0 shadow-sm",
              i === 0 && "md:order-2",
              i === 1 && "md:order-1",
              i === 2 && "md:order-3"
            )}
          >
            <CardContent
              className={cn(
                "p-5 text-center",
                i === 0 && "bg-amber-50/50",
                i === 1 && "bg-gray-50/50",
                i === 2 && "bg-orange-50/50"
              )}
            >
              <div className="mb-3 flex justify-center">{getRankDisplay(p.rank)}</div>
              <div className="mx-auto mb-3 flex justify-center">
                <PlayerAvatar idx={p.avatarIdx} size={56} />
              </div>
              <p className="text-sm font-bold text-[#042940]">{p.username}</p>
              <p className="mt-1 text-2xl font-extrabold text-[#005C53]">
                {p.score.toLocaleString("tr-TR")}
              </p>
              <p className="text-xs text-muted-foreground">{p.games} oyun</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste */}
      {players.length > 3 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-[#042940]/5">
              {players.slice(3).map((p) => (
                <div key={p.rank} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center">
                    {getRankDisplay(p.rank)}
                  </div>
                  <PlayerAvatar idx={p.avatarIdx} size={36} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#042940]">{p.username}</p>
                    <p className="text-xs text-muted-foreground">{p.games} oyun</p>
                  </div>
                  <p className="text-sm font-extrabold text-[#005C53]">
                    {p.score.toLocaleString("tr-TR")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function TeacherLeaderboardPage() {
  return (
    <Suspense fallback={<div className="container py-8"><p className="text-muted-foreground">Yükleniyor...</p></div>}>
      <TeacherLeaderboardContent />
    </Suspense>
  );
}
