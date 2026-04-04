"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Trophy, Gamepad2, TrendingUp, Star, Clock,
  BookOpen, Calculator, FlaskConical, Globe, SpellCheck,
  BarChart3, GraduationCap, CheckCircle2, AlertCircle,
  ChevronDown, Target, Brain, Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BeanHead } from "beanheads";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  AVATAR                                                             */
/* ------------------------------------------------------------------ */

const avatarPool = [
  { skinTone: "light", hair: "short", hairColor: "brown", eyes: "happy", mouth: "grin", body: "chest" },
  { skinTone: "yellow", hair: "long", hairColor: "black", eyes: "normal", mouth: "openSmile", body: "breasts", lashes: true },
  { skinTone: "light", hair: "buzz", hairColor: "blonde", eyes: "content", mouth: "openSmile", body: "chest" },
  { skinTone: "light", hair: "bob", hairColor: "orange", eyes: "wink", mouth: "grin", body: "breasts", lashes: true },
  { skinTone: "yellow", hair: "short", hairColor: "black", eyes: "happy", mouth: "tongue", body: "chest" },
  { skinTone: "light", hair: "pixie", hairColor: "brown", eyes: "normal", mouth: "openSmile", body: "breasts", lashes: true },
];

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

type KazanimProgress = {
  code: string;
  description: string;
  grade: string;
  subject: string;
  correctRate: number;
  attempts: number;
};

type KavramsalBeceri = {
  kod: string;
  ad: string;
  basari: number;
  oyunSayisi: number;
};

type AlanBecerisi = {
  kod: string;
  ad: string;
  basari: number;
  kavramsallar: KavramsalBeceri[];
};

type TemaIstatistik = {
  ad: string;
  ders: string;
  dersSaati: number;
  basari: number;
  alanBecerileri: AlanBecerisi[];
};

const TEMA_ISTATISTIKLERI: TemaIstatistik[] = [
  {
    ad: "Sayılar ve Nicelikler", ders: "Matematik", dersSaati: 28, basari: 82,
    alanBecerileri: [
      { kod: "MAB2", ad: "Matematiksel Problem Çözme", basari: 85, kavramsallar: [
        { kod: "KB2.9", ad: "Genelleme", basari: 88, oyunSayisi: 12 },
        { kod: "KB2.3", ad: "Sınıflandırma", basari: 82, oyunSayisi: 10 },
        { kod: "KB2.7", ad: "Tahmin Etme", basari: 78, oyunSayisi: 8 },
      ]},
      { kod: "MAB1", ad: "Matematiksel Muhakeme", basari: 79, kavramsallar: [
        { kod: "KB1.2", ad: "Karşılaştırma", basari: 84, oyunSayisi: 9 },
        { kod: "KB1.5", ad: "Sıralama", basari: 80, oyunSayisi: 7 },
        { kod: "KB1.8", ad: "İlişkilendirme", basari: 72, oyunSayisi: 6 },
      ]},
    ],
  },
  {
    ad: "Cebir", ders: "Matematik", dersSaati: 20, basari: 70,
    alanBecerileri: [
      { kod: "MAB3", ad: "Matematiksel Temsil", basari: 68, kavramsallar: [
        { kod: "KB3.1", ad: "Modelleme", basari: 65, oyunSayisi: 5 },
        { kod: "KB3.4", ad: "Dönüştürme", basari: 72, oyunSayisi: 4 },
      ]},
    ],
  },
  {
    ad: "Okuma ve Anlama", ders: "Türkçe", dersSaati: 32, basari: 86,
    alanBecerileri: [
      { kod: "TAB1", ad: "Okuduğunu Anlama", basari: 88, kavramsallar: [
        { kod: "TK1.1", ad: "Ana Fikir Bulma", basari: 92, oyunSayisi: 11 },
        { kod: "TK1.3", ad: "Çıkarım Yapma", basari: 84, oyunSayisi: 8 },
      ]},
      { kod: "TAB2", ad: "Söz Varlığı", basari: 84, kavramsallar: [
        { kod: "TK2.1", ad: "Kelime Anlamı", basari: 88, oyunSayisi: 10 },
        { kod: "TK2.4", ad: "Bağlamdan Anlam", basari: 80, oyunSayisi: 7 },
      ]},
    ],
  },
  {
    ad: "Canlılar ve Yaşam", ders: "Fen Bilimleri", dersSaati: 28, basari: 72,
    alanBecerileri: [
      { kod: "FAB1", ad: "Bilimsel Süreç Becerileri", basari: 72, kavramsallar: [
        { kod: "FK1.1", ad: "Gözlem", basari: 78, oyunSayisi: 6 },
        { kod: "FK1.3", ad: "Sınıflandırma", basari: 66, oyunSayisi: 5 },
      ]},
    ],
  },
  {
    ad: "Birey ve Toplum", ders: "Sosyal Bilgiler", dersSaati: 20, basari: 80,
    alanBecerileri: [
      { kod: "SAB1", ad: "Sosyal Katılım", basari: 80, kavramsallar: [
        { kod: "SK1.1", ad: "Empati", basari: 85, oyunSayisi: 4 },
        { kod: "SK1.3", ad: "İş Birliği", basari: 75, oyunSayisi: 3 },
      ]},
    ],
  },
  {
    ad: "Listening & Speaking", ders: "İngilizce", dersSaati: 24, basari: 64,
    alanBecerileri: [
      { kod: "EAB1", ad: "Communicative Competence", basari: 64, kavramsallar: [
        { kod: "EK1.1", ad: "Vocabulary", basari: 70, oyunSayisi: 5 },
        { kod: "EK1.3", ad: "Listening Comprehension", basari: 58, oyunSayisi: 3 },
      ]},
    ],
  },
];

const ogrenciler: Record<string, Record<string, {
  ad: string; avatarIdx: number; sinif: string;
  haftalikPuan: number; aylikPuan: number; toplamPuan: number;
  oyunSayisi: number; rozetSayisi: number; enIyiDers: string;
  dersler: { ders: string; puan: number; oyun: number }[];
  sonOyunlar: { oyun: string; puan: number; tarih: string; sure: string }[];
  kazanimlar?: KazanimProgress[];
}>> = {
  "1": {
    "1": {
      ad: "Efe Yıldız", avatarIdx: 0, sinif: "5-A",
      haftalikPuan: 850, aylikPuan: 3200, toplamPuan: 9850,
      oyunSayisi: 142, rozetSayisi: 12, enIyiDers: "Matematik",
      dersler: [
        { ders: "Matematik", puan: 3200, oyun: 45 },
        { ders: "Türkçe", puan: 2100, oyun: 30 },
        { ders: "Fen Bilimleri", puan: 1800, oyun: 28 },
        { ders: "Sosyal Bilgiler", puan: 1500, oyun: 22 },
        { ders: "İngilizce", puan: 1250, oyun: 17 },
      ],
      sonOyunlar: [
        { oyun: "Matematik Yarışması", puan: 920, tarih: "Bugün", sure: "3 dk" },
        { oyun: "Kelime Avı", puan: 780, tarih: "Bugün", sure: "5 dk" },
        { oyun: "Atom Keşfi", puan: 650, tarih: "Dün", sure: "4 dk" },
        { oyun: "Harita Ustası", puan: 720, tarih: "Dün", sure: "3 dk" },
        { oyun: "Vocabulary Builder", puan: 580, tarih: "2 gün önce", sure: "4 dk" },
        { oyun: "Kesir Ustası", puan: 690, tarih: "3 gün önce", sure: "5 dk" },
      ],
      kazanimlar: [
        { code: "MAT.1.2.2", description: "Toplama ve çıkarma işlemlerinin sonuçlarını muhakeme edebilme", grade: "1. Sınıf", subject: "Matematik", correctRate: 92, attempts: 18 },
        { code: "MAT.2.2.4", description: "Çarpma ve bölme işlemlerini çözümleyebilme", grade: "2. Sınıf", subject: "Matematik", correctRate: 85, attempts: 14 },
        { code: "MAT.2.2.5", description: "Çarpma ve bölme işlemlerinin sonuçlarını muhakeme edebilme", grade: "2. Sınıf", subject: "Matematik", correctRate: 78, attempts: 12 },
        { code: "MAT.3.2.3", description: "Çarpma ve bölme işlemlerinin sonuçlarını muhakeme edebilme", grade: "3. Sınıf", subject: "Matematik", correctRate: 65, attempts: 8 },
        { code: "TUR.2.4.1", description: "Kelime hazinesini zenginleştirme ve kullanma", grade: "2. Sınıf", subject: "Türkçe", correctRate: 88, attempts: 15 },
        { code: "TUR.3.4.2", description: "Kelimelerin anlamlarını bağlamdan çıkarma", grade: "3. Sınıf", subject: "Türkçe", correctRate: 72, attempts: 10 },
        { code: "FEN.5.4.1", description: "Atomun temel yapısını ve bileşenlerini açıklama", grade: "5. Sınıf", subject: "Fen Bilimleri", correctRate: 70, attempts: 9 },
        { code: "SOS.4.2.1", description: "Türkiye'nin coğrafi bölgelerini ve özelliklerini tanıma", grade: "4. Sınıf", subject: "Sosyal Bilgiler", correctRate: 82, attempts: 11 },
        { code: "ING.2.1.1", description: "Temel İngilizce kelimeleri görsel eşleştirme ile öğrenme", grade: "2. Sınıf", subject: "İngilizce", correctRate: 60, attempts: 7 },
      ],
    },
  },
};

const dersIkonlari: Record<string, React.ElementType> = {
  "Matematik": Calculator, "Türkçe": BookOpen, "Fen Bilimleri": FlaskConical,
  "Sosyal Bilgiler": Globe, "İngilizce": SpellCheck,
};

const dersRenkleri: Record<string, string> = {
  "Matematik": "bg-[#005C53]", "Türkçe": "bg-[#9FC131]", "Fen Bilimleri": "bg-[#042940]",
  "Sosyal Bilgiler": "bg-[#005C53]", "İngilizce": "bg-[#9FC131]",
};

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function StudentDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const studentId = params.studentId as string;

  // Fallback data
  const data = ogrenciler[classId]?.[studentId] || {
    ad: `Öğrenci ${studentId}`, avatarIdx: (parseInt(studentId) - 1) % 6, sinif: classId === "1" ? "5-A" : classId === "2" ? "5-B" : "6-A",
    haftalikPuan: 500, aylikPuan: 2000, toplamPuan: 6000, oyunSayisi: 80, rozetSayisi: 5, enIyiDers: "Matematik",
    dersler: [
      { ders: "Matematik", puan: 2000, oyun: 25 }, { ders: "Türkçe", puan: 1500, oyun: 20 },
      { ders: "Fen Bilimleri", puan: 1200, oyun: 15 }, { ders: "Sosyal Bilgiler", puan: 800, oyun: 12 },
      { ders: "İngilizce", puan: 500, oyun: 8 },
    ],
    sonOyunlar: [
      { oyun: "Matematik Yarışması", puan: 700, tarih: "Bugün", sure: "3 dk" },
      { oyun: "Kelime Avı", puan: 550, tarih: "Dün", sure: "4 dk" },
      { oyun: "Atom Keşfi", puan: 480, tarih: "2 gün önce", sure: "5 dk" },
    ],
    kazanimlar: [
      { code: "MAT.1.2.2", description: "Toplama ve çıkarma işlemlerinin sonuçlarını muhakeme edebilme", grade: "1. Sınıf", subject: "Matematik", correctRate: 75, attempts: 10 },
      { code: "MAT.2.2.4", description: "Çarpma ve bölme işlemlerini çözümleyebilme", grade: "2. Sınıf", subject: "Matematik", correctRate: 68, attempts: 8 },
      { code: "TUR.2.4.1", description: "Kelime hazinesini zenginleştirme ve kullanma", grade: "2. Sınıf", subject: "Türkçe", correctRate: 72, attempts: 9 },
      { code: "FEN.5.4.1", description: "Atomun temel yapısını ve bileşenlerini açıklama", grade: "5. Sınıf", subject: "Fen Bilimleri", correctRate: 55, attempts: 5 },
    ],
  };

  const d = avatarPool[data.avatarIdx % avatarPool.length];
  const maxDersPuan = Math.max(...data.dersler.map((d) => d.puan));

  return (
    <div className="container py-8">
      {/* Geri */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link href={`/teacher/class/${classId}`} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {data.sinif} Sınıfı
        </Link>
      </motion.div>

      {/* Profil banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="mb-8">
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="h-14 bg-gradient-to-r from-[#042940] via-[#005C53] to-[#9FC131]" />
          <CardContent className="px-6 pb-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE] ring-4 ring-white">
                <div style={{ width: 56, height: 56 }}>
                  <BeanHead skinTone={d.skinTone as any} hair={d.hair as any} hairColor={d.hairColor as any} eyes={d.eyes as any} eyebrows="raised" mouth={d.mouth as any} body={d.body as any} clothing="shirt" clothingColor="blue" accessory="none" hat="none" hatColor="white" facialHair="none" graphic="none" lashes={d.lashes || false} lipColor="red" faceMaskColor="white" mask={false} faceMask={false} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-[#042940]">{data.ad}</h1>
                <p className="text-sm text-muted-foreground">{data.sinif} &middot; {data.oyunSayisi} oyun &middot; {data.rozetSayisi} rozet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* İstatistikler */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Haftalık Puan", value: data.haftalikPuan.toLocaleString("tr-TR"), icon: TrendingUp, color: "bg-[#005C53]/10", iconColor: "text-[#005C53]" },
          { title: "Aylık Puan", value: data.aylikPuan.toLocaleString("tr-TR"), icon: BarChart3, color: "bg-[#9FC131]/10", iconColor: "text-[#9FC131]" },
          { title: "Toplam Puan", value: data.toplamPuan.toLocaleString("tr-TR"), icon: Trophy, color: "bg-[#DBF227]/10", iconColor: "text-[#9FC131]" },
          { title: "Toplam Oyun", value: data.oyunSayisi.toString(), icon: Gamepad2, color: "bg-[#042940]/10", iconColor: "text-[#042940]" },
        ].map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}><stat.icon className={`h-6 w-6 ${stat.iconColor}`} /></div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-extrabold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Müfredat Bazlı İstatistikler */}
      <MufredatIstatistikleri />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sol — Ders bazlı ilerleme */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Ders Bazlı İlerleme</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="space-y-4">
                {data.dersler.map((ders) => {
                  const Icon = dersIkonlari[ders.ders] || BookOpen;
                  const renk = dersRenkleri[ders.ders] || "bg-[#005C53]";
                  const yuzde = Math.round((ders.puan / maxDersPuan) * 100);
                  return (
                    <div key={ders.ders}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-[#042940]/60" />
                          <span className="text-sm font-medium">{ders.ders}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{ders.oyun} oyun</span>
                          <span className="font-bold text-[#005C53]">{ders.puan.toLocaleString("tr-TR")}</span>
                        </div>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${yuzde}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className={`h-full rounded-full ${renk}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ — Son Oyunlar */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Son Oyunlar</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                {data.sonOyunlar.map((oyun, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-semibold">{oyun.oyun}</p>
                      <p className="text-xs text-muted-foreground">{oyun.tarih} &middot; {oyun.sure}</p>
                    </div>
                    <p className="text-sm font-bold text-[#005C53]">{oyun.puan}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MÜFREDAT İSTATİSTİKLERİ BİLEŞENİ                                  */
/* ------------------------------------------------------------------ */

function getScoreColor(s: number) { return s >= 80 ? "text-[#9FC131]" : s >= 60 ? "text-[#005C53]" : s >= 40 ? "text-[#E8634A]" : "text-red-500"; }
function getBarColor(s: number) { return s >= 80 ? "bg-[#9FC131]" : s >= 60 ? "bg-[#005C53]" : s >= 40 ? "bg-[#E8634A]" : "bg-red-500"; }

function MufredatIstatistikleri() {
  const [selectedDers, setSelectedDers] = useState<string | null>(null);
  const dersler = ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce"];
  const filtered = selectedDers
    ? TEMA_ISTATISTIKLERI.filter((t) => t.ders === selectedDers)
    : TEMA_ISTATISTIKLERI;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-[#005C53]" />
        <h2 className="text-xl font-bold">Müfredat İstatistikleri</h2>
      </div>

      {/* Ders filtresi */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedDers(null)}
          className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-all", !selectedDers ? "bg-[#042940] text-white" : "bg-white text-[#042940]/50 shadow-sm hover:text-[#042940]")}
        >
          Tümü
        </button>
        {dersler.map((d) => {
          const Icon = dersIkonlari[d] || BookOpen;
          return (
            <button key={d} onClick={() => setSelectedDers(d)} className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all", selectedDers === d ? "bg-[#042940] text-white" : "bg-white text-[#042940]/50 shadow-sm hover:text-[#042940]")}>
              <Icon className="h-3 w-3" /> {d}
            </button>
          );
        })}
      </div>

      {/* Tema kartları */}
      <div className="space-y-3">
        {filtered.map((tema) => (
          <TemaKarti key={`${tema.ders}-${tema.ad}`} tema={tema} />
        ))}
      </div>
    </motion.div>
  );
}

function TemaKarti({ tema }: { tema: TemaIstatistik }) {
  const [open, setOpen] = useState(false);
  const DersIcon = dersIkonlari[tema.ders] || BookOpen;
  const dersRenk = dersRenkleri[tema.ders] || "bg-[#005C53]";

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-5 text-left">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-white", dersRenk)}>
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#042940]">{tema.ad}</h3>
            <div className="flex items-center gap-2 text-[11px] text-[#042940]/40">
              <span>{tema.ders}</span>
              <span>·</span>
              <span>{tema.dersSaati} ders saati</span>
              <span>·</span>
              <span>{tema.alanBecerileri.length} alan becerisi</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn("text-lg font-extrabold", getScoreColor(tema.basari))}>%{tema.basari}</span>
          <ChevronDown className={cn("h-4 w-4 text-[#042940]/20 transition-transform", open && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="border-t border-[#042940]/5 p-5 space-y-3">
              {tema.alanBecerileri.map((ab) => (
                <AlanBecerisiKarti key={ab.kod} beceri={ab} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function AlanBecerisiKarti({ beceri }: { beceri: AlanBecerisi }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#042940]/5 bg-[#042940]/[0.01]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-3 text-left">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#005C53]/10">
            <Target className="h-4 w-4 text-[#005C53]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-[#005C53]/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#005C53]">{beceri.kod}</span>
              <span className="text-xs font-bold text-[#042940]">{beceri.ad}</span>
            </div>
            <p className="text-[10px] text-[#042940]/40">{beceri.kavramsallar.length} kavramsal beceri</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-bold", getScoreColor(beceri.basari))}>%{beceri.basari}</span>
          <ChevronDown className={cn("h-3.5 w-3.5 text-[#042940]/20 transition-transform", open && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="border-t border-[#042940]/5 px-3 py-2 space-y-2">
              {beceri.kavramsallar.map((kb) => (
                <div key={kb.kod} className="flex items-center gap-2 py-1.5">
                  <Brain className="h-3.5 w-3.5 shrink-0 text-[#042940]/30" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-[#042940]/5 px-1 py-0.5 text-[9px] font-mono font-bold text-[#042940]/50">{kb.kod}</span>
                        <span className="text-[11px] font-medium text-[#042940]">{kb.ad}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[9px] text-[#042940]/30">{kb.oyunSayisi} oyun</span>
                        <span className={cn("text-[11px] font-bold", getScoreColor(kb.basari))}>%{kb.basari}</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#042940]/5">
                      <div className={cn("h-full rounded-full", getBarColor(kb.basari))} style={{ width: `${kb.basari}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
