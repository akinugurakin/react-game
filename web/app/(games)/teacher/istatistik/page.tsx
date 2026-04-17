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
  GraduationCap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  TİPLER                                                             */
/* ------------------------------------------------------------------ */

interface OgrenmeKazanimi {
  kod: string;           // e.g. "MAT.5.1.1"
  ad: string;
  sinifOrtalama: number; // 0-100
  ilgiliOyunSayisi: number;
}

interface KavramsalBeceri {
  kod: string;
  ad: string;
  sinifOrtalama: number;
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
  kazanimlar: OgrenmeKazanimi[];
  alanBecerileri: AlanBecerisi[];
}

interface Ders {
  ad: string;
  icon: React.ElementType;
  color: string;
  temalar: Record<number, Tema[]>; // sınıf seviyesi → tema listesi
}

interface SinifBilgisi {
  id: string;
  ad: string;
  grade: number;
}

/* ------------------------------------------------------------------ */
/*  SINIFLAR                                                           */
/* ------------------------------------------------------------------ */

const SINIFLAR: SinifBilgisi[] = [
  { id: "5-A", ad: "5-A", grade: 5 },
  { id: "5-B", ad: "5-B", grade: 5 },
  { id: "6-A", ad: "6-A", grade: 6 },
];

/* ------------------------------------------------------------------ */
/*  VERİ — MEB Maarif Müfredatı Yapısına Uygun                        */
/* ------------------------------------------------------------------ */

const DERSLER: Ders[] = [
  {
    ad: "Matematik",
    icon: Calculator,
    color: "bg-[#9FC131]",
    temalar: {
      5: [
        {
          id: 1,
          ad: "Doğal Sayılar",
          dersSaati: 28,
          sinifOrtalama: 74,
          kazanimlar: [
            { kod: "MAT.5.1.1", ad: "10 000 000'a kadar doğal sayıları okur, yazar ve karşılaştırır", sinifOrtalama: 82, ilgiliOyunSayisi: 3 },
            { kod: "MAT.5.1.2", ad: "Doğal sayılarla dört işlem yapar ve sonucu tahmin eder", sinifOrtalama: 76, ilgiliOyunSayisi: 5 },
            { kod: "MAT.5.1.3", ad: "EBOB ve EKOK kavramlarını açıklar ve hesaplar", sinifOrtalama: 65, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "MAB2",
              ad: "Matematiksel Problem Çözme",
              sinifOrtalama: 78,
              kavramsalBeceriler: [
                { kod: "KB2.9", ad: "Genelleme", sinifOrtalama: 72, oyunSayisi: 45 },
                { kod: "KB2.3", ad: "Sınıflandırma", sinifOrtalama: 81, oyunSayisi: 38 },
              ],
            },
          ],
        },
        {
          id: 2,
          ad: "Kesirler",
          dersSaati: 24,
          sinifOrtalama: 68,
          kazanimlar: [
            { kod: "MAT.5.2.1", ad: "Kesirleri karşılaştırır ve sıralar", sinifOrtalama: 70, ilgiliOyunSayisi: 4 },
            { kod: "MAT.5.2.2", ad: "Kesirlerle toplama ve çıkarma işlemi yapar", sinifOrtalama: 63, ilgiliOyunSayisi: 3 },
            { kod: "MAT.5.2.3", ad: "Bir doğal sayının belirtilen basit kesir kadarını hesaplar", sinifOrtalama: 71, ilgiliOyunSayisi: 2 },
          ],
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
          ],
        },
        {
          id: 3,
          ad: "Geometri ve Ölçme",
          dersSaati: 20,
          sinifOrtalama: 72,
          kazanimlar: [
            { kod: "MAT.5.3.1", ad: "Üçgenin alanını hesaplar ve problem çözer", sinifOrtalama: 75, ilgiliOyunSayisi: 3 },
            { kod: "MAT.5.3.2", ad: "Dikdörtgeni parçalara ayırarak çeşitli şekiller oluşturur", sinifOrtalama: 69, ilgiliOyunSayisi: 2 },
          ],
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
          ],
        },
        {
          id: 4,
          ad: "Veri ve Olasılık",
          dersSaati: 16,
          sinifOrtalama: 76,
          kazanimlar: [
            { kod: "MAT.5.4.1", ad: "Sütun grafiğini ve çizgi grafiğini yorumlar", sinifOrtalama: 79, ilgiliOyunSayisi: 3 },
            { kod: "MAT.5.4.2", ad: "Basit olayların olma olasılığını tahmin eder", sinifOrtalama: 73, ilgiliOyunSayisi: 2 },
          ],
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
      6: [
        {
          id: 1,
          ad: "Tam Sayılar",
          dersSaati: 24,
          sinifOrtalama: 71,
          kazanimlar: [
            { kod: "MAT.6.1.1", ad: "Tam sayılarla toplama ve çıkarma işlemi yapar", sinifOrtalama: 74, ilgiliOyunSayisi: 4 },
            { kod: "MAT.6.1.2", ad: "Tam sayılarla çarpma işlemi yapar", sinifOrtalama: 68, ilgiliOyunSayisi: 3 },
            { kod: "MAT.6.1.3", ad: "Tam sayılarla bölme işlemi yapar ve probleme uygular", sinifOrtalama: 65, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "MAB2",
              ad: "Matematiksel Problem Çözme",
              sinifOrtalama: 69,
              kavramsalBeceriler: [
                { kod: "KB2.9", ad: "Genelleme", sinifOrtalama: 65, oyunSayisi: 30 },
                { kod: "KB2.3", ad: "Sınıflandırma", sinifOrtalama: 73, oyunSayisi: 28 },
              ],
            },
          ],
        },
        {
          id: 2,
          ad: "Kesirler ve Ondalıklı Sayılar",
          dersSaati: 20,
          sinifOrtalama: 66,
          kazanimlar: [
            { kod: "MAT.6.2.1", ad: "Kesirlerle çarpma işlemi yapar", sinifOrtalama: 62, ilgiliOyunSayisi: 3 },
            { kod: "MAT.6.2.2", ad: "Ondalıklı sayılarla dört işlem yapar", sinifOrtalama: 70, ilgiliOyunSayisi: 4 },
          ],
          alanBecerileri: [
            {
              kod: "MAB3",
              ad: "Matematiksel Temsil",
              sinifOrtalama: 63,
              kavramsalBeceriler: [
                { kod: "KB3.1", ad: "Modelleme", sinifOrtalama: 58, oyunSayisi: 18 },
                { kod: "KB3.4", ad: "Dönüştürme", sinifOrtalama: 68, oyunSayisi: 15 },
              ],
            },
          ],
        },
        {
          id: 3,
          ad: "Oran ve Orantı",
          dersSaati: 20,
          sinifOrtalama: 69,
          kazanimlar: [
            { kod: "MAT.6.3.1", ad: "Oran kavramını açıklar ve iki çokluk arasındaki oranı belirler", sinifOrtalama: 72, ilgiliOyunSayisi: 3 },
            { kod: "MAT.6.3.2", ad: "Doğru orantıyı kavrar ve problem çözer", sinifOrtalama: 66, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "MAB1",
              ad: "Matematiksel Muhakeme",
              sinifOrtalama: 69,
              kavramsalBeceriler: [
                { kod: "KB1.2", ad: "Karşılaştırma", sinifOrtalama: 72, oyunSayisi: 22 },
                { kod: "KB1.5", ad: "Sıralama", sinifOrtalama: 66, oyunSayisi: 18 },
              ],
            },
          ],
        },
        {
          id: 4,
          ad: "Geometri",
          dersSaati: 24,
          sinifOrtalama: 73,
          kazanimlar: [
            { kod: "MAT.6.4.1", ad: "Dairenin çevre uzunluğunu ve alanını hesaplar", sinifOrtalama: 75, ilgiliOyunSayisi: 3 },
            { kod: "MAT.6.4.2", ad: "Prizmaların hacmini hesaplar", sinifOrtalama: 71, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "MAB4",
              ad: "Uzamsal Düşünme",
              sinifOrtalama: 73,
              kavramsalBeceriler: [
                { kod: "KB4.1", ad: "Görselleştirme", sinifOrtalama: 76, oyunSayisi: 28 },
                { kod: "KB4.3", ad: "Konumlandırma", sinifOrtalama: 70, oyunSayisi: 22 },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    ad: "Türkçe",
    icon: BookOpen,
    color: "bg-[#005C53]",
    temalar: {
      5: [
        {
          id: 1,
          ad: "Okuma ve Anlama",
          dersSaati: 32,
          sinifOrtalama: 80,
          kazanimlar: [
            { kod: "TUR.5.1.1", ad: "Metni türünün özelliklerine göre sesli ve sessiz okur", sinifOrtalama: 83, ilgiliOyunSayisi: 4 },
            { kod: "TUR.5.1.2", ad: "Metnin ana fikrini ve yardımcı fikirleri belirler", sinifOrtalama: 78, ilgiliOyunSayisi: 3 },
            { kod: "TUR.5.1.3", ad: "Okuma stratejilerini kullanarak metni anlamlandırır", sinifOrtalama: 80, ilgiliOyunSayisi: 5 },
          ],
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
          ],
        },
        {
          id: 2,
          ad: "Yazma",
          dersSaati: 24,
          sinifOrtalama: 72,
          kazanimlar: [
            { kod: "TUR.5.2.1", ad: "Yazma sürecinin aşamalarını uygular", sinifOrtalama: 74, ilgiliOyunSayisi: 2 },
            { kod: "TUR.5.2.2", ad: "İmlâ ve noktalama kurallarını doğru kullanır", sinifOrtalama: 70, ilgiliOyunSayisi: 3 },
          ],
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
        {
          id: 3,
          ad: "Söz Varlığı ve Dil Bilgisi",
          dersSaati: 20,
          sinifOrtalama: 76,
          kazanimlar: [
            { kod: "TUR.5.3.1", ad: "Eş anlamlı ve zıt anlamlı kelimeleri yerinde kullanır", sinifOrtalama: 79, ilgiliOyunSayisi: 4 },
            { kod: "TUR.5.3.2", ad: "Deyim ve atasözlerinin anlamlarını kavrar", sinifOrtalama: 73, ilgiliOyunSayisi: 3 },
          ],
          alanBecerileri: [
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
      ],
      6: [
        {
          id: 1,
          ad: "Okuma ve Anlama",
          dersSaati: 30,
          sinifOrtalama: 77,
          kazanimlar: [
            { kod: "TUR.6.1.1", ad: "Okuduğu metnin içeriğini farklı metin türleriyle karşılaştırır", sinifOrtalama: 75, ilgiliOyunSayisi: 3 },
            { kod: "TUR.6.1.2", ad: "Metinde kullanılan dil ve anlatım özelliklerini belirler", sinifOrtalama: 79, ilgiliOyunSayisi: 4 },
          ],
          alanBecerileri: [
            {
              kod: "TAB1",
              ad: "Okuduğunu Anlama",
              sinifOrtalama: 77,
              kavramsalBeceriler: [
                { kod: "TK1.1", ad: "Ana Fikir Bulma", sinifOrtalama: 80, oyunSayisi: 35 },
                { kod: "TK1.3", ad: "Çıkarım Yapma", sinifOrtalama: 74, oyunSayisi: 30 },
              ],
            },
          ],
        },
        {
          id: 2,
          ad: "Söz Varlığı ve Dil Bilgisi",
          dersSaati: 22,
          sinifOrtalama: 73,
          kazanimlar: [
            { kod: "TUR.6.2.1", ad: "Kelimelerin gerçek ve mecaz anlamlarını kavrar", sinifOrtalama: 76, ilgiliOyunSayisi: 4 },
            { kod: "TUR.6.2.2", ad: "Fiil, sıfat ve zarfları yerinde kullanır", sinifOrtalama: 70, ilgiliOyunSayisi: 3 },
          ],
          alanBecerileri: [
            {
              kod: "TAB2",
              ad: "Söz Varlığı",
              sinifOrtalama: 73,
              kavramsalBeceriler: [
                { kod: "TK2.1", ad: "Kelime Anlamı", sinifOrtalama: 76, oyunSayisi: 40 },
                { kod: "TK2.4", ad: "Bağlamdan Anlam", sinifOrtalama: 70, oyunSayisi: 28 },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    ad: "Fen Bilimleri",
    icon: FlaskConical,
    color: "bg-[#042940]",
    temalar: {
      5: [
        {
          id: 1,
          ad: "Canlılar ve Yaşam",
          dersSaati: 28,
          sinifOrtalama: 76,
          kazanimlar: [
            { kod: "FEN.5.1.1", ad: "Besin zinciri ve besin ağı kavramlarını ilişkilendirir", sinifOrtalama: 78, ilgiliOyunSayisi: 3 },
            { kod: "FEN.5.1.2", ad: "Ekosistemde madde döngüsünü açıklar", sinifOrtalama: 72, ilgiliOyunSayisi: 2 },
            { kod: "FEN.5.1.3", ad: "Çevre kirliliğinin canlılar üzerindeki etkilerini örneklendirir", sinifOrtalama: 78, ilgiliOyunSayisi: 4 },
          ],
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
          ad: "Madde ve Değişim",
          dersSaati: 20,
          sinifOrtalama: 70,
          kazanimlar: [
            { kod: "FEN.5.2.1", ad: "Maddenin hallerini ve hal değişimlerini açıklar", sinifOrtalama: 73, ilgiliOyunSayisi: 3 },
            { kod: "FEN.5.2.2", ad: "Isı ve sıcaklık kavramlarını ayırt eder", sinifOrtalama: 67, ilgiliOyunSayisi: 2 },
          ],
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
      6: [
        {
          id: 1,
          ad: "Canlılar Dünyası",
          dersSaati: 26,
          sinifOrtalama: 74,
          kazanimlar: [
            { kod: "FEN.6.1.1", ad: "Hücrenin temel yapısını ve organellerini açıklar", sinifOrtalama: 71, ilgiliOyunSayisi: 3 },
            { kod: "FEN.6.1.2", ad: "Canlıları sınıflandırma kriterlerini belirler", sinifOrtalama: 77, ilgiliOyunSayisi: 4 },
          ],
          alanBecerileri: [
            {
              kod: "FAB1",
              ad: "Bilimsel Süreç Becerileri",
              sinifOrtalama: 74,
              kavramsalBeceriler: [
                { kod: "FK1.1", ad: "Gözlem", sinifOrtalama: 77, oyunSayisi: 28 },
                { kod: "FK1.3", ad: "Sınıflandırma", sinifOrtalama: 71, oyunSayisi: 22 },
              ],
            },
          ],
        },
        {
          id: 2,
          ad: "Madde ve Endüstri",
          dersSaati: 22,
          sinifOrtalama: 68,
          kazanimlar: [
            { kod: "FEN.6.2.1", ad: "Saf madde ve karışım kavramlarını ayırt eder", sinifOrtalama: 70, ilgiliOyunSayisi: 3 },
            { kod: "FEN.6.2.2", ad: "Karışımları ayırma yöntemlerini açıklar ve uygular", sinifOrtalama: 66, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "FAB2",
              ad: "Bilimsel Muhakeme",
              sinifOrtalama: 68,
              kavramsalBeceriler: [
                { kod: "FK2.1", ad: "Deney Tasarlama", sinifOrtalama: 65, oyunSayisi: 20 },
                { kod: "FK2.4", ad: "Sonuç Çıkarma", sinifOrtalama: 71, oyunSayisi: 18 },
              ],
            },
          ],
        },
        {
          id: 3,
          ad: "Işık ve Ses",
          dersSaati: 18,
          sinifOrtalama: 72,
          kazanimlar: [
            { kod: "FEN.6.3.1", ad: "Işığın yansıma ve kırılma özelliklerini açıklar", sinifOrtalama: 75, ilgiliOyunSayisi: 2 },
            { kod: "FEN.6.3.2", ad: "Sesin oluşumunu ve yayılmasını açıklar", sinifOrtalama: 69, ilgiliOyunSayisi: 3 },
          ],
          alanBecerileri: [
            {
              kod: "FAB1",
              ad: "Bilimsel Süreç Becerileri",
              sinifOrtalama: 72,
              kavramsalBeceriler: [
                { kod: "FK1.1", ad: "Gözlem", sinifOrtalama: 75, oyunSayisi: 25 },
                { kod: "FK1.5", ad: "Ölçme", sinifOrtalama: 69, oyunSayisi: 20 },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    ad: "Sosyal Bilgiler",
    icon: Globe,
    color: "bg-[#005C53]",
    temalar: {
      5: [
        {
          id: 1,
          ad: "Birey ve Toplum",
          dersSaati: 20,
          sinifOrtalama: 74,
          kazanimlar: [
            { kod: "SOS.5.1.1", ad: "Aile ve toplumun bireyden beklentilerini açıklar", sinifOrtalama: 78, ilgiliOyunSayisi: 2 },
            { kod: "SOS.5.1.2", ad: "Haklarını ve sorumluluklarını bilir", sinifOrtalama: 70, ilgiliOyunSayisi: 3 },
          ],
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
        {
          id: 2,
          ad: "Kültür ve Miras",
          dersSaati: 18,
          sinifOrtalama: 72,
          kazanimlar: [
            { kod: "SOS.5.2.1", ad: "Türk kültürünün temel değerlerini örnekler", sinifOrtalama: 76, ilgiliOyunSayisi: 3 },
            { kod: "SOS.5.2.2", ad: "Kültürel mirasın korunmasının önemini tartışır", sinifOrtalama: 68, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "SAB2",
              ad: "Kültürel Okuryazarlık",
              sinifOrtalama: 72,
              kavramsalBeceriler: [
                { kod: "SK2.1", ad: "Kültürel Farkındalık", sinifOrtalama: 75, oyunSayisi: 14 },
                { kod: "SK2.3", ad: "Gelenek ve Görenekler", sinifOrtalama: 69, oyunSayisi: 12 },
              ],
            },
          ],
        },
      ],
      6: [
        {
          id: 1,
          ad: "Birey ve Toplum",
          dersSaati: 20,
          sinifOrtalama: 71,
          kazanimlar: [
            { kod: "SOS.6.1.1", ad: "Türkiye'deki sosyal grupların özelliklerini karşılaştırır", sinifOrtalama: 73, ilgiliOyunSayisi: 2 },
            { kod: "SOS.6.1.2", ad: "Demokrasi ve vatandaşlık kavramlarını ilişkilendirir", sinifOrtalama: 69, ilgiliOyunSayisi: 3 },
          ],
          alanBecerileri: [
            {
              kod: "SAB1",
              ad: "Sosyal Katılım",
              sinifOrtalama: 71,
              kavramsalBeceriler: [
                { kod: "SK1.1", ad: "Empati", sinifOrtalama: 74, oyunSayisi: 16 },
                { kod: "SK1.3", ad: "İş Birliği", sinifOrtalama: 68, oyunSayisi: 14 },
              ],
            },
          ],
        },
        {
          id: 2,
          ad: "İpek Yolu'nda Türkler",
          dersSaati: 22,
          sinifOrtalama: 68,
          kazanimlar: [
            { kod: "SOS.6.2.1", ad: "İpek Yolu'nun tarihî ve kültürel önemini açıklar", sinifOrtalama: 70, ilgiliOyunSayisi: 3 },
            { kod: "SOS.6.2.2", ad: "Göç kavramını ve etkilerini örneklendirir", sinifOrtalama: 66, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "SAB3",
              ad: "Tarihsel Düşünme",
              sinifOrtalama: 68,
              kavramsalBeceriler: [
                { kod: "SK3.1", ad: "Zaman ve Kronoloji", sinifOrtalama: 71, oyunSayisi: 18 },
                { kod: "SK3.2", ad: "Tarihsel Empati", sinifOrtalama: 65, oyunSayisi: 14 },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    ad: "İngilizce",
    icon: SpellCheck,
    color: "bg-[#9FC131]",
    temalar: {
      5: [
        {
          id: 1,
          ad: "Hello!",
          dersSaati: 20,
          sinifOrtalama: 73,
          kazanimlar: [
            { kod: "ENG.5.1.1", ad: "Introduces themselves and others using appropriate expressions", sinifOrtalama: 77, ilgiliOyunSayisi: 3 },
            { kod: "ENG.5.1.2", ad: "Asks and answers questions about personal information", sinifOrtalama: 69, ilgiliOyunSayisi: 4 },
          ],
          alanBecerileri: [
            {
              kod: "EAB1",
              ad: "Communicative Competence",
              sinifOrtalama: 73,
              kavramsalBeceriler: [
                { kod: "EK1.1", ad: "Vocabulary", sinifOrtalama: 76, oyunSayisi: 35 },
                { kod: "EK1.3", ad: "Listening Comprehension", sinifOrtalama: 70, oyunSayisi: 22 },
              ],
            },
          ],
        },
        {
          id: 2,
          ad: "My Town",
          dersSaati: 18,
          sinifOrtalama: 69,
          kazanimlar: [
            { kod: "ENG.5.2.1", ad: "Describes locations in town using prepositions", sinifOrtalama: 71, ilgiliOyunSayisi: 3 },
            { kod: "ENG.5.2.2", ad: "Reads and understands short texts about towns", sinifOrtalama: 67, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "EAB2",
              ad: "Reading Comprehension",
              sinifOrtalama: 69,
              kavramsalBeceriler: [
                { kod: "EK2.1", ad: "Text Understanding", sinifOrtalama: 72, oyunSayisi: 20 },
                { kod: "EK2.3", ad: "Vocabulary in Context", sinifOrtalama: 66, oyunSayisi: 18 },
              ],
            },
          ],
        },
      ],
      6: [
        {
          id: 1,
          ad: "Appearance and Personality",
          dersSaati: 22,
          sinifOrtalama: 71,
          kazanimlar: [
            { kod: "ENG.6.1.1", ad: "Describes people's physical appearance and personality", sinifOrtalama: 74, ilgiliOyunSayisi: 4 },
            { kod: "ENG.6.1.2", ad: "Uses adjectives to compare people and things", sinifOrtalama: 68, ilgiliOyunSayisi: 3 },
          ],
          alanBecerileri: [
            {
              kod: "EAB1",
              ad: "Communicative Competence",
              sinifOrtalama: 71,
              kavramsalBeceriler: [
                { kod: "EK1.1", ad: "Vocabulary", sinifOrtalama: 74, oyunSayisi: 32 },
                { kod: "EK1.3", ad: "Listening Comprehension", sinifOrtalama: 68, oyunSayisi: 20 },
              ],
            },
          ],
        },
        {
          id: 2,
          ad: "Yummy Breakfast",
          dersSaati: 18,
          sinifOrtalama: 74,
          kazanimlar: [
            { kod: "ENG.6.2.1", ad: "Talks about food preferences using target vocabulary", sinifOrtalama: 77, ilgiliOyunSayisi: 3 },
            { kod: "ENG.6.2.2", ad: "Reads and understands a simple menu", sinifOrtalama: 71, ilgiliOyunSayisi: 2 },
          ],
          alanBecerileri: [
            {
              kod: "EAB2",
              ad: "Reading Comprehension",
              sinifOrtalama: 74,
              kavramsalBeceriler: [
                { kod: "EK2.1", ad: "Text Understanding", sinifOrtalama: 77, oyunSayisi: 18 },
                { kod: "EK2.3", ad: "Vocabulary in Context", sinifOrtalama: 71, oyunSayisi: 15 },
              ],
            },
          ],
        },
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  YARDIMCI FONKSİYONLAR                                             */
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
/*  BİLEŞENLER                                                        */
/* ------------------------------------------------------------------ */

function OgrenmeKazanimiRow({ kazanim }: { kazanim: OgrenmeKazanimi }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#042940]/[0.03] px-3 py-2.5 hover:bg-[#042940]/[0.06] transition-colors">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm shrink-0">
        <GraduationCap className="h-3.5 w-3.5 text-[#042940]/50" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="rounded border border-[#042940]/10 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#042940]/60 shrink-0">
              {kazanim.kod}
            </span>
            <span className="truncate text-xs text-[#042940]/70">{kazanim.ad}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-3">
            <span className="text-[10px] text-[#042940]/30">{kazanim.ilgiliOyunSayisi} oyun</span>
            <span className={cn("text-sm font-bold", getScoreColor(kazanim.sinifOrtalama))}>
              %{kazanim.sinifOrtalama}
            </span>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#042940]/5">
          <div
            className={cn("h-full rounded-full transition-all", getBarColor(kazanim.sinifOrtalama))}
            style={{ width: `${kazanim.sinifOrtalama}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function KavramsalBeceriRow({ beceri }: { beceri: KavramsalBeceri }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#042940]/5">
        <Brain className="h-3.5 w-3.5 text-[#042940]/40" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="rounded bg-[#042940]/5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#042940]/50">
              {beceri.kod}
            </span>
            <span className="truncate text-xs font-medium text-[#042940]">{beceri.ad}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-2">
            <span className="text-[10px] text-[#042940]/30">{beceri.oyunSayisi} oyun</span>
            <span className={cn("text-xs font-bold", getScoreColor(beceri.sinifOrtalama))}>
              %{beceri.sinifOrtalama}
            </span>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#042940]/5">
          <div
            className={cn("h-full rounded-full transition-all", getBarColor(beceri.sinifOrtalama))}
            style={{ width: `${beceri.sinifOrtalama}%` }}
          />
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
              <span className="rounded bg-[#005C53]/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#005C53]">
                {beceri.kod}
              </span>
              <span className="text-sm font-bold text-[#042940]">{beceri.ad}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-[#042940]/40">
              {beceri.kavramsalBeceriler.length} kavramsal beceri
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn("text-lg font-extrabold", getScoreColor(beceri.sinifOrtalama))}>
            %{beceri.sinifOrtalama}
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-[#042940]/30 transition-transform", open && "rotate-180")}
          />
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
                <span>{tema.kazanimlar.length} öğrenme çıktısı</span>
                <span>{tema.alanBecerileri.length} alan becerisi</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className={cn("text-xl font-extrabold", getScoreColor(tema.sinifOrtalama))}>
                %{tema.sinifOrtalama}
              </p>
              <p className="text-[10px] text-[#042940]/30">sınıf ort.</p>
            </div>
            <ChevronRight
              className={cn("h-5 w-5 text-[#042940]/20 transition-transform", open && "rotate-90")}
            />
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
              <div className="border-t border-[#042940]/5 p-5 space-y-5">
                {/* Öğrenme Çıktıları */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-3.5 w-3.5 text-[#042940]/40" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#042940]/40">
                      Öğrenme Çıktıları
                    </span>
                  </div>
                  <div className="space-y-2">
                    {tema.kazanimlar.map((k) => (
                      <OgrenmeKazanimiRow key={k.kod} kazanim={k} />
                    ))}
                  </div>
                </div>

                {/* Beceri Boyutu */}
                {tema.alanBecerileri.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-3.5 w-3.5 text-[#042940]/40" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#042940]/40">
                        Beceri Boyutu
                      </span>
                    </div>
                    <div className="space-y-3">
                      {tema.alanBecerileri.map((ab) => (
                        <AlanBecerisiCard key={`${tema.id}-${ab.kod}`} beceri={ab} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAYFA                                                             */
/* ------------------------------------------------------------------ */

export default function IstatistikPage() {
  const [selectedDers, setSelectedDers] = useState(0);
  const [selectedSinif, setSelectedSinif] = useState("5-A");

  const sinifBilgisi = SINIFLAR.find((s) => s.id === selectedSinif)!;
  const ders = DERSLER[selectedDers];
  const DersIcon = ders.icon;
  const temalar = ders.temalar[sinifBilgisi.grade] ?? [];

  const genel = {
    temaOrtalama:
      temalar.length > 0
        ? Math.round(temalar.reduce((s, t) => s + t.sinifOrtalama, 0) / temalar.length)
        : 0,
    toplamTema: temalar.length,
    toplamKazanim: temalar.reduce((s, t) => s + t.kazanimlar.length, 0),
    toplamAlanBecerisi: temalar.reduce((s, t) => s + t.alanBecerileri.length, 0),
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
            <p className="mt-0.5 text-[#042940]/50">
              Tema ve öğrenme çıktısı bazında sınıf performansı
            </p>
          </div>
        </div>
      </motion.div>

      {/* Ders Seçimi */}
      <div className="mb-4 flex flex-wrap gap-2">
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

      {/* Sınıf Seçimi */}
      <div className="mb-6 flex items-center gap-2">
        <Users className="h-4 w-4 text-[#042940]/30" />
        <span className="text-sm text-[#042940]/40">Sınıf:</span>
        <div className="flex rounded-lg bg-white p-1 shadow-sm">
          {SINIFLAR.map((sinif) => (
            <button
              key={sinif.id}
              onClick={() => setSelectedSinif(sinif.id)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-all",
                selectedSinif === sinif.id
                  ? "bg-[#042940] text-white"
                  : "text-[#042940]/40 hover:text-[#042940]"
              )}
            >
              {sinif.ad}
            </button>
          ))}
        </div>
      </div>

      {/* Genel İstatistikler */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Sınıf Ortalaması",
            value: `%${genel.temaOrtalama}`,
            icon: BarChart3,
            color: getScoreColor(genel.temaOrtalama),
          },
          { label: "Tema", value: genel.toplamTema.toString(), icon: Lightbulb, color: "text-[#042940]" },
          {
            label: "Öğrenme Çıktısı",
            value: genel.toplamKazanim.toString(),
            icon: GraduationCap,
            color: "text-[#9FC131]",
          },
          {
            label: "Alan Becerisi",
            value: genel.toplamAlanBecerisi.toString(),
            icon: Target,
            color: "text-[#005C53]",
          },
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

      {/* Tema Listesi */}
      {temalar.length > 0 ? (
        <div className="space-y-4">
          {temalar.map((tema) => (
            <TemaCard key={tema.id} tema={tema} dersColor={ders.color} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
          <DersIcon className="mb-3 h-10 w-10 text-[#042940]/20" />
          <p className="text-sm text-[#042940]/40">Bu sınıf için veri bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
