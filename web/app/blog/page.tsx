"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Calculator,
  BookOpen,
  Brain,
  Gamepad2,
  FlaskConical,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackgroundSymbols } from "@/components/ui/background-symbols";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  BLOG YAZILAR (statik mock)                                         */
/* ------------------------------------------------------------------ */

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  icon: React.ElementType;
  date: string;
  readTime: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "oyunla-ogrenme-neden-etkili",
    title: "Oyunla Öğrenme Neden Bu Kadar Etkili?",
    excerpt:
      "Araştırmalar, oyunlaştırılmış öğrenmenin çocukların motivasyonunu %40 artırdığını gösteriyor. Peki bunun arkasındaki bilim nedir?",
    category: "Eğitim",
    categoryColor: "bg-blue-500/10 text-blue-600",
    icon: Brain,
    date: "28 Mart 2026",
    readTime: "5 dk",
    featured: true,
  },
  {
    id: "matematik-korkusunu-yenmek",
    title: "Çocuklarda Matematik Korkusunu Yenmenin 5 Yolu",
    excerpt:
      "Matematik kaygısı birçok çocukta görülen yaygın bir durum. Eğlenceli aktiviteler ve doğru yaklaşımla bu korku aşılabilir.",
    category: "Matematik",
    categoryColor: "bg-amber-500/10 text-amber-600",
    icon: Calculator,
    date: "24 Mart 2026",
    readTime: "4 dk",
  },
  {
    id: "ekran-suresi-dengesi",
    title: "Ekran Süresi ve Eğitim: Doğru Dengeyi Bulmak",
    excerpt:
      "Dijital çağda çocukların ekran süresini yönetmek zor olabilir. Eğitsel içeriklerle ekran süresini verimli hale getirmenin yolları.",
    category: "Aile",
    categoryColor: "bg-emerald-500/10 text-emerald-600",
    icon: Lightbulb,
    date: "20 Mart 2026",
    readTime: "6 dk",
  },
  {
    id: "fen-bilimleri-deney-oyunlari",
    title: "Evde Yapılabilecek 10 Eğlenceli Fen Deneyi",
    excerpt:
      "Mutfak malzemeleriyle yapılabilecek basit ama etkileyici deneylerle çocuğunuzun bilim sevgisini artırın.",
    category: "Fen Bilimleri",
    categoryColor: "bg-purple-500/10 text-purple-600",
    icon: FlaskConical,
    date: "15 Mart 2026",
    readTime: "7 dk",
  },
  {
    id: "okuma-aliskanligi-kazandirma",
    title: "Çocuğunuza Okuma Alışkanlığı Kazandırmanın Yolları",
    excerpt:
      "Kelime oyunları ve interaktif hikayeler, çocukların okuma becerilerini geliştirmenin en etkili yöntemlerinden biri.",
    category: "Türkçe",
    categoryColor: "bg-rose-500/10 text-rose-600",
    icon: BookOpen,
    date: "10 Mart 2026",
    readTime: "5 dk",
  },
  {
    id: "oyun-temelli-sinif-yonetimi",
    title: "Öğretmenler İçin: Oyun Temelli Sınıf Yönetimi",
    excerpt:
      "Sınıf içi motivasyonu artırmak ve öğrenci katılımını güçlendirmek için oyunlaştırma tekniklerini nasıl kullanabilirsiniz?",
    category: "Öğretmenler",
    categoryColor: "bg-sky-500/10 text-sky-600",
    icon: Gamepad2,
    date: "5 Mart 2026",
    readTime: "6 dk",
  },
];

const CATEGORIES = [
  "Tümü",
  "Eğitim",
  "Matematik",
  "Türkçe",
  "Fen Bilimleri",
  "Aile",
  "Öğretmenler",
];

/* ------------------------------------------------------------------ */
/*  SAYFA                                                              */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F4EF]">
      <BackgroundSymbols />
      <Header />
      <main className="relative z-10">
        <div className="container py-12">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl font-extrabold text-[#042940]">Blog</h1>
            <p className="mt-3 text-lg text-[#042940]/50">
              Eğitim, oyunlaştırma ve çocuk gelişimi hakkında faydalı içerikler
            </p>
          </motion.div>

          {/* Kategori Filtreleri */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  i === 0
                    ? "bg-[#005C53] text-white shadow-md"
                    : "bg-white text-[#042940]/60 hover:bg-[#042940]/5 hover:text-[#042940]"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Öne Çıkan Yazı */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-10"
            >
              <Card className="overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    {/* Sol — Görsel alanı */}
                    <div className="flex items-center justify-center bg-gradient-to-br from-[#005C53] to-[#042940] p-12">
                      <featured.icon className="h-24 w-24 text-white/20" />
                    </div>
                    {/* Sağ — İçerik */}
                    <div className="flex flex-col justify-center p-8">
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className={cn(
                            "rounded-lg px-3 py-1 text-xs font-semibold",
                            featured.categoryColor
                          )}
                        >
                          {featured.category}
                        </span>
                        <span className="text-xs text-[#042940]/40">
                          Öne Çıkan
                        </span>
                      </div>
                      <h2 className="mb-3 text-2xl font-extrabold text-[#042940]">
                        {featured.title}
                      </h2>
                      <p className="mb-6 text-sm leading-relaxed text-[#042940]/60">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#042940]/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {featured.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featured.readTime} okuma
                        </span>
                      </div>
                      <button className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#005C53] transition-colors hover:text-[#042940]">
                        Devamını Oku
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Yazı Listesi */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => {
              const PostIcon = post.icon;
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                >
                  <Card className="group h-full overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                    <CardContent className="flex h-full flex-col p-0">
                      {/* Üst — Renk alanı */}
                      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#042940]/5 to-[#005C53]/10">
                        <PostIcon className="h-12 w-12 text-[#005C53]/20 transition-transform group-hover:scale-110" />
                      </div>
                      {/* Alt — İçerik */}
                      <div className="flex flex-1 flex-col p-5">
                        <span
                          className={cn(
                            "mb-3 w-fit rounded-lg px-2.5 py-0.5 text-xs font-semibold",
                            post.categoryColor
                          )}
                        >
                          {post.category}
                        </span>
                        <h3 className="mb-2 text-base font-bold text-[#042940] line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mb-4 flex-1 text-xs leading-relaxed text-[#042940]/50 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between border-t border-[#042940]/5 pt-3">
                          <div className="flex items-center gap-3 text-[10px] text-[#042940]/40">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#005C53]/40 transition-transform group-hover:translate-x-1 group-hover:text-[#005C53]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
