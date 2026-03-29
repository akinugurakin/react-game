"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BarChart3,
  Trophy,
  BookOpen,
  Plus,
  ChevronRight,
  TrendingUp,
  Clock,
  Gamepad2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth";
import { BeanHead } from "beanheads";

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const siniflar = [
  { id: 1, ad: "5-A", ogrenciSayisi: 28, ortalamaIlerleme: 78 },
  { id: 2, ad: "5-B", ogrenciSayisi: 25, ortalamaIlerleme: 65 },
  { id: 3, ad: "6-A", ogrenciSayisi: 30, ortalamaIlerleme: 72 },
];

const sonAktiviteler = [
  { ogrenci: "Efe Y\u0131ld\u0131z", oyun: "Matematik Yar\u0131\u015fmas\u0131", puan: 850, sinif: "5-A", sure: "3 dk" },
  { ogrenci: "Zeynep Kaya", oyun: "Kelime Av\u0131", puan: 720, sinif: "5-A", sure: "5 dk" },
  { ogrenci: "Ali Demir", oyun: "Atom Ke\u015ffi", puan: 680, sinif: "5-B", sure: "4 dk" },
  { ogrenci: "Ece Arslan", oyun: "Harita Ustas\u0131", puan: 640, sinif: "6-A", sure: "3 dk" },
  { ogrenci: "Can Y\u0131lmaz", oyun: "Vocabulary Builder", puan: 590, sinif: "5-A", sure: "4 dk" },
];

const enAktifOgrenciler = [
  { ad: "Efe Y\u0131ld\u0131z", oyunSayisi: 45, sinif: "5-A" },
  { ad: "Zeynep Kaya", oyunSayisi: 38, sinif: "5-A" },
  { ad: "Ali Demir", oyunSayisi: 32, sinif: "5-B" },
  { ad: "Ece Arslan", oyunSayisi: 28, sinif: "6-A" },
  { ad: "Can Y\u0131lmaz", oyunSayisi: 25, sinif: "5-A" },
];

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const username = user?.username || "\u00d6\u011fretmen";

  const toplamOgrenci = siniflar.reduce((a, s) => a + s.ogrenciSayisi, 0);
  const ortalamaIlerleme = Math.round(siniflar.reduce((a, s) => a + s.ortalamaIlerleme, 0) / siniflar.length);

  return (
    <div className="container py-8">
      {/* Ba\u015fl\u0131k */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold">Ho\u015f geldiniz, {username}</h1>
        <p className="mt-1 text-muted-foreground">\u00d6\u011fretmen Paneli</p>
      </motion.div>

      {/* \u0130statistik kartlar\u0131 */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Toplam \u00d6\u011frenci", value: toplamOgrenci.toString(), icon: Users, color: "bg-[#005C53]/10", iconColor: "text-[#005C53]" },
          { title: "S\u0131n\u0131f Say\u0131s\u0131", value: siniflar.length.toString(), icon: BookOpen, color: "bg-[#9FC131]/10", iconColor: "text-[#9FC131]" },
          { title: "Ortalama \u0130lerleme", value: `%${ortalamaIlerleme}`, icon: TrendingUp, color: "bg-[#DBF227]/10", iconColor: "text-[#9FC131]" },
          { title: "Bu Hafta Oynanan", value: "156", icon: Gamepad2, color: "bg-[#042940]/10", iconColor: "text-[#042940]" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
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
        {/* Sol — S\u0131n\u0131flar + Son Aktivite */}
        <div className="lg:col-span-2 space-y-8">
          {/* S\u0131n\u0131flar */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">S\u0131n\u0131flar\u0131m</h2>
              <Button size="sm" className="bg-[#005C53] text-white hover:bg-[#005C53]/90">
                <Plus className="mr-1 h-4 w-4" /> Yeni S\u0131n\u0131f
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {siniflar.map((sinif, index) => (
                <motion.div
                  key={sinif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="group cursor-pointer border-0 shadow-sm transition-all hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-bold">{sinif.ad}</h3>
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">{sinif.ogrenciSayisi} \u00f6\u011frenci</p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">\u0130lerleme</span>
                          <span className="font-bold text-[#9FC131]">%{sinif.ortalamaIlerleme}</span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-[#9FC131]" style={{ width: `${sinif.ortalamaIlerleme}%` }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Son Aktivite */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Son Aktivite</h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y">
                  {sonAktiviteler.map((a, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005C53]/10">
                          <span className="text-xs font-bold text-[#005C53]">
                            {a.ogrenci.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{a.ogrenci}</p>
                          <p className="text-xs text-muted-foreground">{a.oyun} &middot; {a.sinif}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#005C53]">{a.puan}</p>
                        <p className="text-xs text-muted-foreground">{a.sure}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sa\u011f — En Aktif \u00d6\u011frenciler */}
        <div>
          <h2 className="mb-4 text-xl font-bold">En Aktif \u00d6\u011frenciler</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                {enAktifOgrenciler.map((o, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DBF227]/20 text-xs font-bold text-[#042940]">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{o.ad}</p>
                      <p className="text-xs text-muted-foreground">{o.sinif}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Gamepad2 className="h-3.5 w-3.5" />
                      {o.oyunSayisi}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* H\u0131zl\u0131 eri\u015fim */}
          <div className="mt-6 space-y-3">
            <h2 className="text-xl font-bold">H\u0131zl\u0131 Eri\u015fim</h2>
            {[
              { label: "\u00d6\u011frenci Ekle", icon: Users, color: "bg-[#005C53]" },
              { label: "\u0130lerleme Raporu", icon: BarChart3, color: "bg-[#9FC131]" },
              { label: "S\u0131n\u0131f Liderlik Tablosu", icon: Trophy, color: "bg-[#042940]" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
              >
                <Card className="group cursor-pointer border-0 shadow-sm transition-all hover:shadow-md">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.color} text-white`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
