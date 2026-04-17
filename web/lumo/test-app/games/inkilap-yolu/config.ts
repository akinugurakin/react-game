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
  curriculumCodes: [
    "İTA.8.3.1",
    "İTA.8.3.2",
    "İTA.8.3.3",
    "İTA.8.4.1",
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
