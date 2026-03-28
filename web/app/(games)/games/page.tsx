"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Play,
  Star,
  Users,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const allGames = [
  {
    id: 1,
    title: "Matematik Yarışması",
    description: "Toplama, çıkarma, çarpma ve bölme ile hızını test et. Süre bitmeden en çok soruyu doğru yanıtla!",
    icon: Calculator,
    color: "bg-brand-teal",
    minAge: 6,
    maxAge: 12,
    category: "Matematik",
    players: 1245,
    avgDuration: "3-5 dk",
  },
  {
    id: 2,
    title: "Kelime Avı",
    description: "Karışık harflerden anlamlı kelimeler oluştur. Kelime hazineni genişlet ve puan topla!",
    icon: BookOpen,
    color: "bg-brand-green",
    minAge: 7,
    maxAge: 12,
    category: "Dil",
    players: 890,
    avgDuration: "4-6 dk",
  },
  {
    id: 3,
    title: "Hafıza Kartları",
    description: "Kartları çevir ve eşleşen çiftleri bul. Ne kadar az hamlede bitirirsen o kadar çok puan!",
    icon: Brain,
    color: "bg-brand-dark",
    minAge: 6,
    maxAge: 10,
    category: "Hafıza",
    players: 1100,
    avgDuration: "3-4 dk",
  },
  {
    id: 4,
    title: "Bulmaca Dünyası",
    description: "Geometrik şekilleri doğru yere yerleştir. Uzamsal zekânı geliştir!",
    icon: Puzzle,
    color: "bg-brand-lime",
    minAge: 6,
    maxAge: 12,
    category: "Mantık",
    players: 670,
    avgDuration: "5-8 dk",
  },
];

export default function GamesPage() {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold">Oyunlar</h1>
        <p className="mt-1 text-muted-foreground">
          Eğitici oyunlarla eğlenerek öğren
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {allGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Icon Area */}
                  <div
                    className={`flex items-center justify-center ${game.color} p-8 text-white sm:w-48`}
                  >
                    <game.icon className="h-16 w-16" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium">
                          {game.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {game.minAge}-{game.maxAge} yaş
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{game.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {game.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {game.players} oyuncu
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {game.avgDuration}
                        </span>
                      </div>
                      <Button asChild size="sm">
                        <Link href={game.id === 1 ? "/games/math" : "#"}>
                          <Play className="mr-1 h-4 w-4" /> Oyna
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
