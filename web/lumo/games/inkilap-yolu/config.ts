import type { GameConfig } from "@/types/game";

export const config: GameConfig = {
  id: "inkilap-yolu",
  title: "İnkılap Yolu",
  description:
    "Samsun'dan Cumhuriyet'e uzanan yolculukta olayları kronolojik sıraya diz, kavramları eşleştir ve Millî Mücadele'nin dönüm noktalarını keşfet!",
  discipline: "sosyal",
  grade: 8,
  minAge: 13,
  maxAge: 14,
  duration: 10,
  difficulty: "orta",
  kazanimlar: [
    { kod: "İTA.8.3.1", katsayi: 1.0 }, // Mondros Ateşkesi'ne Osmanlı'nın tepkisini açıklar
    { kod: "İTA.8.3.2", katsayi: 0.9 }, // Millî Mücadele'nin başlamasını sağlayan gelişmeleri sıralar
    { kod: "İTA.8.3.3", katsayi: 0.8 }, // Kurtuluş Savaşı'nın önemli dönüm noktalarını değerlendirir
    { kod: "İTA.8.4.1", katsayi: 0.7 }, // Cumhuriyetin ilanını ve önemini açıklar
  ],
  tags: [
    "inkilap-tarihi",
    "milli-mucadele",
    "kronoloji",
    "ataturk",
    "cumhuriyet",
    "eslestirme",
    "timeline",
    "tarih",
    "8-sinif",
  ],
};
