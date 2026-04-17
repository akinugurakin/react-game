/**
 * Kıtalar, okyanuslar ve koordinat soruları.
 * lat/lng → küre üzerindeki 3D pozisyona dönüştürme yardımcıları da burada.
 */

export interface GeoLabel {
  id: string;
  name: string;
  type: "kita" | "okyanus";
  /** Etiketin yaklaşık merkez koordinatı (derece) */
  lat: number;
  lng: number;
  /** Harita üzerindeki tahmini renk */
  color: string;
}

export const CONTINENTS: GeoLabel[] = [
  { id: "asya", name: "Asya", type: "kita", lat: 40, lng: 80, color: "#DBF227" },
  { id: "avrupa", name: "Avrupa", type: "kita", lat: 50, lng: 15, color: "#005C53" },
  { id: "afrika", name: "Afrika", type: "kita", lat: 5, lng: 20, color: "#D6D58E" },
  { id: "kuzey-amerika", name: "Kuzey Amerika", type: "kita", lat: 45, lng: -100, color: "#1aa295" },
  { id: "guney-amerika", name: "Güney Amerika", type: "kita", lat: -15, lng: -60, color: "#9FC131" },
  { id: "okyanusya", name: "Okyanusya", type: "kita", lat: -25, lng: 135, color: "#53671a" },
  { id: "antarktika", name: "Antarktika", type: "kita", lat: -82, lng: 0, color: "#b3e0db" },
];

export const OCEANS: GeoLabel[] = [
  { id: "buyuk-okyanus", name: "Büyük Okyanus", type: "okyanus", lat: 0, lng: -160, color: "#005C53" },
  { id: "atlas-okyanusu", name: "Atlas Okyanusu", type: "okyanus", lat: 15, lng: -35, color: "#005C53" },
  { id: "hint-okyanusu", name: "Hint Okyanusu", type: "okyanus", lat: -15, lng: 75, color: "#005C53" },
];

/** Phase 1'de yerleştirilecek etiketler: yönler + ekvator + kıtalar + 3 okyanus */
export interface SpecialLabel {
  id: string;
  name: string;
  type: "yon" | "ekvator";
  lat: number;
  lng: number;
  color: string;
}

export const SPECIAL_LABELS: SpecialLabel[] = [
  { id: "ekvator", name: "Ekvator", type: "ekvator", lat: 0, lng: 20, color: "#E63946" },
];

/** Yön etiketleri — küre üzerine tıklama değil, ok butonuyla seçilir. */
export interface DirectionLabel {
  id: "kuzey" | "guney" | "dogu" | "bati";
  name: string;
  arrow: "↑" | "↓" | "→" | "←";
}

export const DIRECTION_LABELS: DirectionLabel[] = [
  { id: "kuzey", name: "Kuzey", arrow: "↑" },
  { id: "guney", name: "Güney", arrow: "↓" },
  { id: "dogu", name: "Doğu", arrow: "→" },
  { id: "bati", name: "Batı", arrow: "←" },
];

/** Küre üzerine tıklanarak yerleştirilen etiketler */
export const CLICKABLE_LABELS: Array<GeoLabel | SpecialLabel> = [...SPECIAL_LABELS, ...CONTINENTS, ...OCEANS];

/** Tüm etiketler (globe üzerinde gösterim için) */
export const ALL_LABELS: Array<GeoLabel | SpecialLabel> = [...SPECIAL_LABELS, ...CONTINENTS, ...OCEANS];

export interface CoordQuestion {
  id: string;
  question: string;
  /** Doğru cevap koordinatı */
  lat: number;
  lng: number;
  /** Kabul edilebilir hata yarıçapı (derece) */
  toleranceDeg: number;
  hint?: string;
}

export const COORD_QUESTIONS: CoordQuestion[] = [
  { id: "turkiye", question: "Türkiye'nin konumunu bul (yaklaşık 39°K, 35°D)", lat: 39, lng: 35, toleranceDeg: 8 },
  { id: "ekvator-afrika", question: "Ekvator'un Afrika'yı kestiği noktayı bul", lat: 0, lng: 25, toleranceDeg: 12 },
  { id: "greenwich", question: "Başlangıç meridyeninin (0°) Avrupa'yı kestiği noktayı bul", lat: 51, lng: 0, toleranceDeg: 10 },
  { id: "kuzey-kutup", question: "Kuzey Kutup Noktası'nı bul (90°K)", lat: 90, lng: 0, toleranceDeg: 8 },
  { id: "guney-kutup", question: "Güney Kutup Noktası'nı bul (90°G)", lat: -90, lng: 0, toleranceDeg: 8 },
  { id: "japonya", question: "Japonya'nın konumunu bul (yaklaşık 36°K, 140°D)", lat: 36, lng: 140, toleranceDeg: 10 },
  { id: "brezilya", question: "Brezilya'nın konumunu bul (yaklaşık 10°G, 50°B)", lat: -10, lng: -50, toleranceDeg: 12 },
];

export interface DirectionQuestion {
  id: string;
  question: string;
  /** Doğru cevabın koordinatları */
  lat: number;
  lng: number;
  toleranceDeg: number;
}

export const DIRECTION_QUESTIONS: DirectionQuestion[] = [
  { id: "turkiye-kuzey", question: "Türkiye'nin kuzeyindeki denizi bul", lat: 42, lng: 35, toleranceDeg: 10 },
  { id: "turkiye-guney", question: "Türkiye'nin güneyindeki denizi bul", lat: 35, lng: 35, toleranceDeg: 10 },
  { id: "turkiye-bati", question: "Türkiye'nin batısındaki denizi bul", lat: 39, lng: 25, toleranceDeg: 10 },
  { id: "afrika-dogu", question: "Afrika'nın doğusundaki okyanusunu bul", lat: -5, lng: 55, toleranceDeg: 15 },
  { id: "amerika-bati", question: "Kuzey Amerika'nın batısındaki okyanusunu bul", lat: 35, lng: -140, toleranceDeg: 15 },
  { id: "avrupa-guney", question: "Avrupa'nın güneyindeki denizi bul", lat: 37, lng: 15, toleranceDeg: 12 },
];

// ── Yardımcı fonksiyonlar ──

const DEG2RAD = Math.PI / 180;

/** lat/lng → birim küre üzerindeki [x, y, z]. Y yukarı, Z öne. */
export function latLngToXYZ(lat: number, lng: number, radius = 1): [number, number, number] {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lng + 180) * DEG2RAD;
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

/** İki lat/lng arasındaki büyük daire mesafesi (derece). */
export function greatCircleDeg(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = (lat2 - lat1) * DEG2RAD;
  const dLng = (lng2 - lng1) * DEG2RAD;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * DEG2RAD) * Math.cos(lat2 * DEG2RAD) * Math.sin(dLng / 2) ** 2;
  return (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) / DEG2RAD;
}
