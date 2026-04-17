"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, Clock, ArrowRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore, type StudentProfile } from "@/lib/auth";
import { api } from "@/lib/api";

const AVATAR_EMOJIS: Record<string, string> = {
  avatar_1: "🦁", avatar_2: "🐯", avatar_3: "🦊", avatar_4: "🐧",
  avatar_5: "🦋", avatar_6: "🐬", avatar_7: "🦄", avatar_8: "🐸",
  avatar_9: "🐼", avatar_10: "🦉", avatar_11: "🐙", avatar_12: "🦕",
};

export default function CocuklarPage() {
  const { accessToken } = useAuthStore();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    api.get<StudentProfile[]>("/students", accessToken)
      .then(setStudents)
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [accessToken]);

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-[#042940]">Çocuklarım</h1>
          <p className="mt-1 text-[#042940]/50">Çocuklarınızın profillerini yönetin</p>
        </div>
        <Button asChild className="bg-[#005C53] hover:bg-[#005C53]/90">
          <Link href="/veli/cocuklar/ekle">
            <Plus className="mr-2 h-4 w-4" /> Çocuk Ekle
          </Link>
        </Button>
      </motion.div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : students.length === 0 ? (
        <Link href="/veli/cocuklar/ekle">
          <Card className="border-2 border-dashed border-gray-200 shadow-none transition-colors hover:border-[#005C53] hover:bg-[#005C53]/5">
            <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#005C53]/10">
                <Plus className="h-7 w-7 text-[#005C53]" />
              </div>
              <p className="text-lg font-bold text-[#042940]">Henüz çocuk profili yok</p>
              <p className="text-sm text-[#042940]/50">İlk profili oluşturmak için buraya tıklayın</p>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {students.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link href={`/veli/cocuklar/${student.id}`}>
                <Card className="border-0 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#005C53]/10 text-3xl">
                        {AVATAR_EMOJIS[student.avatar] ?? "🦁"}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#042940]">
                          {student.first_name} {student.last_name}
                        </p>
                        <p className="text-sm text-[#042940]/40">{student.class_level}. Sınıf</p>
                      </div>
                      <ArrowRight className="ml-auto h-5 w-5 text-[#042940]/20" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-[#005C53]/5 p-3 text-center">
                        <Gamepad2 className="mx-auto mb-1 h-4 w-4 text-[#005C53]" />
                        <p className="text-lg font-bold text-[#042940]">—</p>
                        <p className="text-[10px] text-[#042940]/40">Toplam Oyun</p>
                      </div>
                      <div className="rounded-xl bg-[#9FC131]/5 p-3 text-center">
                        <Trophy className="mx-auto mb-1 h-4 w-4 text-[#9FC131]" />
                        <p className="text-lg font-bold text-[#042940]">—</p>
                        <p className="text-[10px] text-[#042940]/40">En İyi Skor</p>
                      </div>
                      <div className="rounded-xl bg-[#042940]/5 p-3 text-center">
                        <Clock className="mx-auto mb-1 h-4 w-4 text-[#042940]/60" />
                        <p className="text-lg font-bold text-[#042940]">—</p>
                        <p className="text-[10px] text-[#042940]/40">Süre</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
