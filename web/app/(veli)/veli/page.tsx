"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Gamepad2, Trophy, Clock, ArrowRight, TrendingUp, Calendar, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore, type StudentProfile } from "@/lib/auth";
import { api } from "@/lib/api";

const AVATAR_EMOJIS: Record<string, string> = {
  avatar_1: "🦁", avatar_2: "🐯", avatar_3: "🦊", avatar_4: "🐧",
  avatar_5: "🦋", avatar_6: "🐬", avatar_7: "🦄", avatar_8: "🐸",
  avatar_9: "🐼", avatar_10: "🦉", avatar_11: "🐙", avatar_12: "🦕",
};

export default function VeliDashboard() {
  const { parent, accessToken } = useAuthStore();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    api.get<StudentProfile[]>("/students", accessToken)
      .then(setStudents)
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [accessToken]);

  const stats = [
    {
      label: "Çocuk Sayısı",
      value: loading ? "..." : students.length.toString(),
      icon: Users,
      color: "bg-[#E8634A]/10 text-[#E8634A]",
    },
    {
      label: "Toplam Profil",
      value: loading ? "..." : students.length.toString(),
      icon: Gamepad2,
      color: "bg-[#005C53]/10 text-[#005C53]",
    },
    {
      label: "Aktif Sınıf",
      value: loading || students.length === 0 ? "—" : `${students[0].class_level}. Sınıf`,
      icon: Trophy,
      color: "bg-[#9FC131]/10 text-[#9FC131]",
    },
    {
      label: "Platform",
      value: "Web",
      icon: Clock,
      color: "bg-[#042940]/10 text-[#042940]",
    },
  ];

  return (
    <div className="container py-8">
      {/* Hoşgeldin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold text-[#042940]">
          Hoş geldin, {parent?.first_name ?? "Veli"}
        </h1>
        <p className="mt-1 text-[#042940]/50">
          Çocuklarınızın öğrenme yolculuğunu buradan takip edin
        </p>
      </motion.div>

      {/* İstatistik Kartları */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#042940]">{stat.value}</p>
                  <p className="text-xs text-[#042940]/40">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Çocuklarım */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#042940]">Çocuklarım</h2>
          <Link
            href="/veli/cocuklar"
            className="flex items-center gap-1 text-sm font-medium text-[#005C53] hover:underline"
          >
            Tümünü Gör <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : students.length === 0 ? (
          <Link href="/veli/cocuklar/ekle">
            <Card className="border-2 border-dashed border-gray-200 shadow-none transition-colors hover:border-[#005C53] hover:bg-[#005C53]/5">
              <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#005C53]/10">
                  <Plus className="h-6 w-6 text-[#005C53]" />
                </div>
                <p className="font-semibold text-[#042940]">İlk Çocuk Profilini Oluştur</p>
                <p className="text-sm text-[#042940]/50">
                  Çocuğunuz için bir profil ekleyin ve oyunlara başlayın
                </p>
              </CardContent>
            </Card>
          </Link>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
              >
                <Link href={`/veli/cocuklar/${student.id}`}>
                  <Card className="border-0 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#005C53]/10 text-2xl">
                        {AVATAR_EMOJIS[student.avatar] ?? "🦁"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#042940]">{student.first_name} {student.last_name}</p>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
                            {student.class_level}. Sınıf
                          </span>
                        </div>
                        <div className="mt-1 flex gap-3 text-xs text-[#042940]/40">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            İstatistiklere git
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#042940]/20" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {/* Profil Ekle butonu */}
            <Link href="/veli/cocuklar/ekle">
              <Card className="border-2 border-dashed border-gray-200 shadow-none h-full min-h-[84px] transition-colors hover:border-[#005C53] hover:bg-[#005C53]/5">
                <CardContent className="flex h-full items-center justify-center gap-2 p-5">
                  <Plus className="h-5 w-5 text-[#042940]/30" />
                  <span className="text-sm font-medium text-[#042940]/40">Profil Ekle</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}
      </div>

      {/* Son Aktiviteler — şimdilik placeholder, oyun session API'si bağlandığında doldurulacak */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-[#042940]">Son Aktiviteler</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center text-[#042940]/40">
            <Calendar className="h-8 w-8" />
            <p className="text-sm">Henüz oyun oturumu yok</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
