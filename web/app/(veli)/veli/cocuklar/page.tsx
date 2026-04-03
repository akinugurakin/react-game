"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Gamepad2, Trophy, Clock, ArrowRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_CHILDREN = [
  { id: 1, name: "Ali", sinif: 5, avatar: "AL", totalGames: 87, avgScore: 78, totalTime: 1240, lastActive: "Bugün" },
  { id: 2, name: "Zeynep", sinif: 3, avatar: "ZE", totalGames: 54, avgScore: 85, totalTime: 780, lastActive: "Bugün" },
];

export default function CocuklarPage() {
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

      <div className="grid gap-4 sm:grid-cols-2">
        {MOCK_CHILDREN.map((child, i) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link href={`/veli/cocuklar/${child.id}`}>
              <Card className="border-0 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#005C53]/10 text-lg font-bold text-[#005C53]">
                      {child.avatar}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#042940]">{child.name}</p>
                      <p className="text-sm text-[#042940]/40">{child.sinif}. Sınıf · Son aktivite: {child.lastActive}</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-[#042940]/20" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-[#005C53]/5 p-3 text-center">
                      <Gamepad2 className="mx-auto mb-1 h-4 w-4 text-[#005C53]" />
                      <p className="text-lg font-bold text-[#042940]">{child.totalGames}</p>
                      <p className="text-[10px] text-[#042940]/40">Toplam Oyun</p>
                    </div>
                    <div className="rounded-xl bg-[#9FC131]/5 p-3 text-center">
                      <Trophy className="mx-auto mb-1 h-4 w-4 text-[#9FC131]" />
                      <p className="text-lg font-bold text-[#042940]">%{child.avgScore}</p>
                      <p className="text-[10px] text-[#042940]/40">Ortalama</p>
                    </div>
                    <div className="rounded-xl bg-[#042940]/5 p-3 text-center">
                      <Clock className="mx-auto mb-1 h-4 w-4 text-[#042940]/60" />
                      <p className="text-lg font-bold text-[#042940]">{Math.round(child.totalTime / 60)} sa</p>
                      <p className="text-[10px] text-[#042940]/40">Toplam Süre</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
