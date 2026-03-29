"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Trophy, Gamepad2, TrendingUp, Star, Clock,
  BookOpen, Calculator, FlaskConical, Globe, SpellCheck,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BeanHead } from "beanheads";

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

const ogrenciler: Record<string, Record<string, {
  ad: string; avatarIdx: number; sinif: string;
  haftalikPuan: number; aylikPuan: number; toplamPuan: number;
  oyunSayisi: number; rozetSayisi: number; enIyiDers: string;
  dersler: { ders: string; puan: number; oyun: number }[];
  sonOyunlar: { oyun: string; puan: number; tarih: string; sure: string }[];
}>> = {
  "1": {
    "1": {
      ad: "Efe Y\u0131ld\u0131z", avatarIdx: 0, sinif: "5-A",
      haftalikPuan: 850, aylikPuan: 3200, toplamPuan: 9850,
      oyunSayisi: 142, rozetSayisi: 12, enIyiDers: "Matematik",
      dersler: [
        { ders: "Matematik", puan: 3200, oyun: 45 },
        { ders: "T\u00fcrk\u00e7e", puan: 2100, oyun: 30 },
        { ders: "Fen Bilimleri", puan: 1800, oyun: 28 },
        { ders: "Sosyal Bilgiler", puan: 1500, oyun: 22 },
        { ders: "\u0130ngilizce", puan: 1250, oyun: 17 },
      ],
      sonOyunlar: [
        { oyun: "Matematik Yar\u0131\u015fmas\u0131", puan: 920, tarih: "Bug\u00fcn", sure: "3 dk" },
        { oyun: "Kelime Av\u0131", puan: 780, tarih: "Bug\u00fcn", sure: "5 dk" },
        { oyun: "Atom Ke\u015ffi", puan: 650, tarih: "D\u00fcn", sure: "4 dk" },
        { oyun: "Harita Ustas\u0131", puan: 720, tarih: "D\u00fcn", sure: "3 dk" },
        { oyun: "Vocabulary Builder", puan: 580, tarih: "2 g\u00fcn \u00f6nce", sure: "4 dk" },
        { oyun: "Kesir Ustas\u0131", puan: 690, tarih: "3 g\u00fcn \u00f6nce", sure: "5 dk" },
      ],
    },
  },
};

const dersIkonlari: Record<string, React.ElementType> = {
  "Matematik": Calculator, "T\u00fcrk\u00e7e": BookOpen, "Fen Bilimleri": FlaskConical,
  "Sosyal Bilgiler": Globe, "\u0130ngilizce": SpellCheck,
};

const dersRenkleri: Record<string, string> = {
  "Matematik": "bg-[#005C53]", "T\u00fcrk\u00e7e": "bg-[#9FC131]", "Fen Bilimleri": "bg-[#042940]",
  "Sosyal Bilgiler": "bg-[#005C53]", "\u0130ngilizce": "bg-[#9FC131]",
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
    ad: `\u00d6\u011frenci ${studentId}`, avatarIdx: (parseInt(studentId) - 1) % 6, sinif: classId === "1" ? "5-A" : classId === "2" ? "5-B" : "6-A",
    haftalikPuan: 500, aylikPuan: 2000, toplamPuan: 6000, oyunSayisi: 80, rozetSayisi: 5, enIyiDers: "Matematik",
    dersler: [
      { ders: "Matematik", puan: 2000, oyun: 25 }, { ders: "T\u00fcrk\u00e7e", puan: 1500, oyun: 20 },
      { ders: "Fen Bilimleri", puan: 1200, oyun: 15 }, { ders: "Sosyal Bilgiler", puan: 800, oyun: 12 },
      { ders: "\u0130ngilizce", puan: 500, oyun: 8 },
    ],
    sonOyunlar: [
      { oyun: "Matematik Yar\u0131\u015fmas\u0131", puan: 700, tarih: "Bug\u00fcn", sure: "3 dk" },
      { oyun: "Kelime Av\u0131", puan: 550, tarih: "D\u00fcn", sure: "4 dk" },
      { oyun: "Atom Ke\u015ffi", puan: 480, tarih: "2 g\u00fcn \u00f6nce", sure: "5 dk" },
    ],
  };

  const d = avatarPool[data.avatarIdx % avatarPool.length];
  const maxDersPuan = Math.max(...data.dersler.map((d) => d.puan));

  return (
    <div className="container py-8">
      {/* Geri */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link href={`/teacher/class/${classId}`} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {data.sinif} S\u0131n\u0131f\u0131
        </Link>
      </motion.div>

      {/* Profil banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="mb-8">
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="h-24 bg-gradient-to-r from-[#042940] via-[#005C53] to-[#9FC131]" />
          <CardContent className="relative px-6 pb-6">
            <div className="-mt-10 flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE] ring-4 ring-white">
                <div style={{ width: 72, height: 72 }}>
                  <BeanHead skinTone={d.skinTone as any} hair={d.hair as any} hairColor={d.hairColor as any} eyes={d.eyes as any} eyebrows="raised" mouth={d.mouth as any} body={d.body as any} clothing="shirt" clothingColor="blue" accessory="none" hat="none" hatColor="white" facialHair="none" graphic="none" lashes={d.lashes || false} lipColor="red" faceMaskColor="white" mask={false} faceMask={false} />
                </div>
              </div>
              <div className="mb-1">
                <h1 className="text-2xl font-extrabold">{data.ad}</h1>
                <p className="text-sm text-muted-foreground">{data.sinif} &middot; {data.oyunSayisi} oyun &middot; {data.rozetSayisi} rozet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* \u0130statistikler */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Haftal\u0131k Puan", value: data.haftalikPuan.toLocaleString("tr-TR"), icon: TrendingUp, color: "bg-[#005C53]/10", iconColor: "text-[#005C53]" },
          { title: "Ayl\u0131k Puan", value: data.aylikPuan.toLocaleString("tr-TR"), icon: BarChart3, color: "bg-[#9FC131]/10", iconColor: "text-[#9FC131]" },
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

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sol — Ders bazl\u0131 ilerleme */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Ders Bazl\u0131 \u0130lerleme</h2>
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

        {/* Sa\u011f — Son Oyunlar */}
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
