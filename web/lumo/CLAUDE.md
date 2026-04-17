# CLAUDE.md — LUMO: Eğitsel Oyun Üretim Platformu

Bu dosya, Claude Code'un LUMO projesini anlaması ve agent takımını doğru yönetmesi için yazılmıştır.

---

## Proje Ozeti

LUMO, ilkokul ve ortaokul ogrencilerine (3-8. sinif) yonelik egitsel mini oyunlar ureten bir **agent tabanli oyun fabrikasi**dir.

- **Disiplinler:** Turkce, Matematik, Fen Bilimleri, Sosyal Bilgiler, Ingilizce
- **Mufredat:** Turkiye Yuzyili Maarif Modeli'ne uygun
- **Eslestirme:** Her oyun belirli kazanimlarla ve sinif seviyesiyle eslestirilir
- **Hedef:** Platform icin surekli, tutarli, mufredata uygun oyun icerigi uretmek

---

## Agent Takimi

LUMO 5 uzman agent'tan olusur. Her agent kendi sorumluluk alaninda calisir ve ciktisi bir sonraki agent'a girdi olur.

### 1. Senaryo Agent'i (`scenario-agent`)
- **Gorev:** Oyun fikri ve senaryo uretir
- **Girdi:** Disiplin, sinif seviyesi, kazanim
- **Cikti:** Oyun senaryosu dokumani (JSON)
  - Oyun adi, hikaye, mekanik, hedef kazanim, zorluk seviyesi
  - Gorsel tema onerileri
  - Tahmini sure (dakika)
- **Kurallar:**
  - Yas grubuna uygun icerik (siddetsiz, pozitif)
  - Oyun mekanigi kazanimla dogrudan iliskili olmali
  - Turkce icerik, anlasilir dil

### 2. Kod Agent'i (`code-agent`)
- **Gorev:** Senaryoyu calisir React oyun bilesenine donusturur
- **Girdi:** Senaryo dokumani
- **Cikti:** Tam calisir oyun bileseni
  - React + TypeScript + Tailwind CSS
  - GameConfig uyumlu export
  - Skor hesaplama mantigi
  - Responsive tasarim (mobil + masaustu)
- **Kurallar:**
  - Her oyun tek bir klasorde, bagimsiz modul
  - Canvas/SVG veya DOM tabanli (oyuna gore)
  - Animasyonlar hafif (200-300ms)
  - Ses efektleri opsiyonel, varsayilan sessiz
  - Erisilebilirlik: buyuk tiklanabilir alanlar, yuksek kontrast

### 3. QA Agent'i (`qa-agent`)
- **Gorev:** Uretilen oyunu test eder ve kalite kontrol yapar
- **Girdi:** Oyun bileseni + senaryo dokumani
- **Cikti:** Test raporu (JSON)
  - Oynanabilirlik: baslanabilir mi, bitirilebilir mi, skor kaydedilir mi
  - Gorsel: responsive mi, UI kirik mi
  - Icerik: kazanimla uyumlu mu, yas grubuna uygun mu
  - Performans: render suresi, bellek kullanimi
  - Hata listesi (varsa)
- **Kurallar:**
  - Her oyun en az 1 happy-path testi icermeli
  - Basarisiz testlerde oyun kod agent'ina geri doner

### 4. Rozet Agent'i (`badge-agent`)
- **Gorev:** Her oyun icin basari rozeti sistemi tasarlar
- **Girdi:** Oyun bileseni + senaryo dokumani
- **Cikti:** Rozet tanimlari (JSON)
  - Rozet adi, aciklamasi, kosulu, ikon onerileri
  - Bronz / Gumus / Altin kademe sistemi
- **Kurallar:**
  - Her oyunda en az 3 rozet olmali
  - Kolay rozet: ilk tamamlama
  - Orta rozet: belirli skor esigi
  - Zor rozet: mukemmel performans veya ozel kosul
  - Rozet adlari cocuklara hitap eden, motive edici Turkce isimler

### 5. Kazanim Agent'i (`curriculum-agent`)
- **Gorev:** Oyunu mufredat kazanimlariyla eslestirir ve dogrular
- **Girdi:** Oyun bileseni + senaryo dokumani
- **Cikti:** Kazanim eslestirme dokumani (JSON)
  - Sinif seviyesi (1-8)
  - Disiplin
  - Unite/konu
  - Kazanim kodu ve aciklamasi
  - Uyumluluk skoru (1-5)
  - Oneri: ek kazanimlar veya duzeltmeler
- **Kurallar:**
  - Turkiye Yuzyili Maarif Modeli kazanimlari referans alinir
  - Bir oyun birden fazla kazanimla eslesebilir
  - Ana kazanim + yan kazanimlar olarak isaretlenir

---

## Oyun Uretim Pipeline'i

```
[Disiplin + Sinif + Kazanim]
        |
        v
  1. Senaryo Agent'i  -->  senaryo.json
        |
        v
  2. Kod Agent'i      -->  /games/{id}/
        |
        v
  3. QA Agent'i        -->  test-report.json
        |                     |
        | (basarili)          | (basarisiz --> Kod Agent'ina geri don)
        v
  4. Rozet Agent'i     -->  badges.json
        |
        v
  5. Kazanim Agent'i   -->  curriculum-map.json
        |
        v
  [Oyun Hazir - Platform'a Aktar]
```

---

## Oyun Standart Yapisi

Her uretilen oyun su klasor yapisina uyar:

```
games/
  {game-id}/
    index.tsx           # Ana oyun bileseni
    config.ts           # GameConfig (id, title, discipline, grade, duration)
    components/         # Oyun icin ozel bilesenler
    assets/             # Gorseller, ikonlar (SVG tercih edilir)
    scenario.json       # Senaryo dokumani
    badges.json         # Rozet tanimlari
    curriculum-map.json # Kazanim eslestirmesi
    test-report.json    # QA raporu
    __tests__/          # Test dosyalari
```

---

## GameConfig Tipi

```typescript
interface GameConfig {
  id: string;
  title: string;
  description: string;
  discipline: 'turkce' | 'matematik' | 'fen' | 'sosyal' | 'ingilizce';
  grade: 3 | 4 | 5 | 6 | 7 | 8;
  minAge: number;
  maxAge: number;
  duration: number; // dakika
  difficulty: 'kolay' | 'orta' | 'zor';
  thumbnailUrl?: string;
  curriculumCodes: string[]; // kazanim kodlari
  tags: string[];
}
```

---

## Rozet Sistemi

```typescript
interface Badge {
  id: string;
  gameId: string;
  name: string;        // Turkce, motive edici
  description: string; // Kazanim kosulu aciklamasi
  tier: 'bronz' | 'gumus' | 'altin';
  condition: {
    type: 'score' | 'completion' | 'time' | 'streak' | 'custom';
    threshold: number;
    comparison: 'gte' | 'lte' | 'eq';
  };
  iconSuggestion: string; // Gorsel aciklama
}
```

---

## Disiplin Bazli Oyun Mekanik Rehberi

### Turkce
- Kelime bulma, harf siralama, cumle tamamlama
- Okuma anlama (kisa metin + sorular)
- Eslestirme (es anlamli, zit anlamli)
- Hikaye siralama

### Matematik
- Islem bulmaca (dort islem, kesir, ondalik)
- Geometri tanimlama/eslestirme
- Oruntu tamamlama
- Zaman/para/olcu problemleri

### Fen Bilimleri
- Deney simülasyonu
- Siniflandirma (canli/cansiz, hayvan turleri)
- Surukle-birak etiketleme (organ, bitki parcalari)
- Dogru/yanlis bilgi ayiklama

### Sosyal Bilgiler
- Harita uzerinde konum bulma
- Tarih sirasi dizme (timeline)
- Eslestirme (ulke-baskent, bolge-ozellik)
- Senaryo tabanli vatandaslik/hak sorulari

### Ingilizce
- Kelime-resim eslestirme
- Cumle kurma (surukle-birak)
- Dinleme + secme (audio destekli)
- Basit diyalog tamamlama

---

## Teknik Kurallar

- **Dil:** TypeScript strict mode
- **UI:** React + Tailwind CSS
- **Turkce karakter:** Her zaman dogrudan UTF-8, asla \u escape kullanma
- **Responsive:** Mobile-first, min 320px genislik destegi
- **Performans:** Oyun yuklenmesi < 2sn, animasyonlar 60fps hedef
- **Erisilebilirlik:** WCAG AA, buyuk tiklanabilir alanlar (min 44x44px)
- **Bagimsizlik:** Her oyun kendi klasorunde, dis bagimlilik minimumda
- **Skor:** Her oyun 0-100 arasi normalize edilmis skor dondurur

---

## Sinif-Yas Eslestirmesi

| Sinif | Yas Araligi | Seviye |
|-------|-------------|--------|
| 3     | 8-9         | Ilkokul |
| 4     | 9-10        | Ilkokul |
| 5     | 10-11       | Ortaokul |
| 6     | 11-12       | Ortaokul |
| 7     | 12-13       | Ortaokul |
| 8     | 13-14       | Ortaokul |

---

## Genel Kurallar (Claude Code icin)

- Yeni dosya olusturmadan once mevcut yapiya bak
- Her router/page icin ayri dosya — tek dosyaya sikistirma
- Hata mesajlari kullaniciya Turkce gosterilmeli
- Console.log production'da kaldirilmali
- Commit mesajlari Ingilizce, conventional commits formatinda
- Oyun icerigi tamamen Turkce (Ingilizce disiplini haric)
- Cocuklara uygun icerik: siddetsiz, pozitif, tesvik edici
