/**
 * Kazanım Puanı Hesaplama Sistemi
 *
 * Her kazanım 0-100 arası bir başarı puanına sahiptir.
 * Bu puan, öğrencinin ilgili kazanımı kapsayan oyunlardaki
 * performansının ağırlıklı ortalamasıdır.
 *
 * Formula:
 *   kazanim_puani = Σ(oyun_puan_yuzde × katsayi) / Σ(katsayi)
 *
 * Örnek:
 *   - Periyodik Kaos: puan=%80, katsayi=1.0  → katkı: 80
 *   - Atom Gezgini:   puan=%60, katsayi=0.7  → katkı: 42
 *   Kazanım puanı = (80 + 42) / (1.0 + 0.7) = 122 / 1.7 ≈ 72
 *
 * Sadece öğrencinin oynadığı oyunlar hesaba katılır.
 * Hiç oynanmamış kazanım için puan 0 döner.
 */

export interface OyunKazanimPerformans {
  oyunId: string;
  kazanimKodu: string;
  katsayi: number;        // Oyunun bu kazanımla ilişki katsayısı (0-1)
  oyunPuanYuzde: number;  // Öğrencinin bu oyundaki skor yüzdesi (0-100)
}

/**
 * Bir öğrencinin belirli bir kazanımdaki başarı puanını hesaplar.
 * @param performanslar - Kazanım için ilgili oyunların performans listesi
 * @returns 0-100 arası kazanım puanı
 */
export function hesaplaKazanimPuani(
  performanslar: OyunKazanimPerformans[]
): number {
  if (performanslar.length === 0) return 0;

  const toplamAgirlik = performanslar.reduce((s, p) => s + p.katsayi, 0);
  if (toplamAgirlik === 0) return 0;

  const agirlikliToplam = performanslar.reduce(
    (s, p) => s + p.oyunPuanYuzde * p.katsayi,
    0
  );

  return Math.round(agirlikliToplam / toplamAgirlik);
}

/**
 * Bir öğrencinin tüm kazanımlardaki başarı puanlarını hesaplar.
 * @param tumPerformanslar - Öğrencinin tüm oyun-kazanım performansları
 * @returns kazanım kodu → puan (0-100) eşleştirmesi
 */
export function hesaplaTumKazanimPuanlari(
  tumPerformanslar: OyunKazanimPerformans[]
): Record<string, number> {
  const byKazanim: Record<string, OyunKazanimPerformans[]> = {};

  for (const p of tumPerformanslar) {
    if (!byKazanim[p.kazanimKodu]) byKazanim[p.kazanimKodu] = [];
    byKazanim[p.kazanimKodu].push(p);
  }

  const result: Record<string, number> = {};
  for (const [kod, performanslar] of Object.entries(byKazanim)) {
    result[kod] = hesaplaKazanimPuani(performanslar);
  }
  return result;
}

/**
 * Kazanım puanını başarı seviyesine dönüştürür.
 */
export function kazanimBasariSeviyesi(
  puan: number
): "cok-iyi" | "iyi" | "gelisiyor" | "baslangic" {
  if (puan >= 80) return "cok-iyi";
  if (puan >= 60) return "iyi";
  if (puan >= 40) return "gelisiyor";
  return "baslangic";
}
