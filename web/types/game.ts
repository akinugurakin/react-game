/**
 * Bir oyunun belirli bir kazanımla ilişkisini tanımlar.
 * katsayi: 0-1 arası, oyunun o kazanımı ne ölçüde kapsadığını gösterir.
 * Örnek: Periyodik Kaos → FB.8.5.1.1 için katsayi: 1.0 (tam ilişkili)
 */
export interface KazanimEslestirme {
  kod: string;      // MEB kazanım kodu, örn. "FB.8.5.1.1"
  katsayi: number;  // 0-1 arası ilişki katsayısı
}

export interface GameConfig {
  id: string;
  title: string;
  description: string;
  discipline: "turkce" | "matematik" | "fen" | "sosyal" | "ingilizce";
  grade: 3 | 4 | 5 | 6 | 7 | 8;
  minAge: number;
  maxAge: number;
  duration: number;
  difficulty: "kolay" | "orta" | "zor";
  thumbnailUrl?: string;
  kazanimlar: KazanimEslestirme[];
  tags: string[];
}
