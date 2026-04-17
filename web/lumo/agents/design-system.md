# LUMO Tasarım Sistemi

Tüm oyunlar ve sayfalar bu tasarım sistemine uygun olmalıdır.

---

## Renk Paleti (HSL)

### Temel Renkler
| Token | HSL | Hex | Kullanım |
|-------|-----|-----|----------|
| `--background` | 60 20% 97% | #F8F7F2 | Sayfa arka planı |
| `--foreground` | 203 88% 13% | #042940 | Ana metin rengi |
| `--card` | 0 0% 100% | #FFFFFF | Kart arka planı |
| `--card-foreground` | 203 88% 13% | #042940 | Kart metin rengi |

### Marka Renkleri
| Token | HSL | Hex | Kullanım |
|-------|-----|-----|----------|
| `--primary` | 174 100% 18% | #005C53 | Ana butonlar, vurgular, linkler |
| `--primary-foreground` | 60 20% 97% | #F8F7F2 | Primary üzeri metin |
| `--accent` | 74 59% 47% | #9FC131 | İkincil vurgu, başarı göstergeleri |
| `--secondary` | 60 26% 92% | #EDE9DA | İkincil arka planlar |
| `--secondary-foreground` | 203 88% 13% | #042940 | Secondary üzeri metin |

### Yardımcı Renkler
| Token | HSL | Hex | Kullanım |
|-------|-----|-----|----------|
| `--muted` | 60 20% 93% | #EDECE5 | Pasif alanlar |
| `--muted-foreground` | 203 30% 40% | #476073 | İkincil metin |
| `--border` | 60 15% 85% | #DAD8CD | Kenarlıklar |
| `--destructive` | 0 84% 60% | #EF4444 | Hata, yanlış cevap |

### Özel Renkler
| Hex | Kullanım |
|-----|----------|
| `#005C53` | Teal — ana marka rengi |
| `#042940` | Koyu lacivert — başlıklar, koyu arka planlar |
| `#9FC131` | Yeşil — doğru cevap, başarı |
| `#DBF227` | Limon sarısı — özel vurgu, rozet parıltısı |

---

## Tipografi

- **Font:** Nunito (wght: 400, 500, 600, 700, 800)
- **Mono:** ui-monospace (skor, süre göstergeleri)
- **Boyutlar:** Tailwind varsayılanları (text-sm, text-base, text-lg, text-xl, text-2xl...)
- **Başlıklar:** font-bold veya font-extrabold
- **Gövde metin:** font-normal veya font-medium

---

## Border Radius

| Token | Değer |
|-------|-------|
| `--radius` | 0.75rem (12px) |
| `rounded-lg` | var(--radius) |
| `rounded-md` | calc(var(--radius) - 2px) = 10px |
| `rounded-sm` | calc(var(--radius) - 4px) = 8px |
| `rounded-full` | 9999px (daire) |

Oyun kartları ve butonlar: `rounded-lg` veya `rounded-xl` kullan.

---

## Shadow

| Seviye | Değer | Kullanım |
|--------|-------|----------|
| `shadow` | 0 1px 3px rgba(0,0,0,.1) | Kartlar (varsayılan) |
| `shadow-lg` | 0 10px 15px rgba(0,0,0,.1) | Hover durumu, aktif kartlar |
| `shadow-xl` | 0 20px 25px rgba(0,0,0,.1) | Modal, popup |

---

## Animasyonlar

- **Süre:** 150ms (micro), 200ms (standart), 300ms (geçiş), 500ms (giriş)
- **Easing:** ease-in-out varsayılan
- **Kart çevirme:** 300ms
- **Doğru cevap:** Yeşil parıltı + scale(1.05), 200ms
- **Yanlış cevap:** Kırmızı titreşim + shake, 300ms
- **Skor artışı:** sayı animasyonu, 500ms

---

## Oyun Bileşen Kuralları

### Oyun Kartları
- Arka plan: `bg-card` (#FFFFFF)
- Kenarlık: `border border-border`
- Köşe: `rounded-lg`
- Gölge: `shadow` → hover'da `shadow-lg`
- Padding: `p-4` veya `p-6`

### Butonlar
- Ana buton: `bg-primary text-primary-foreground` (#005C53 üzeri beyaz)
- İkincil buton: `bg-secondary text-secondary-foreground`
- Köşe: `rounded-md`
- Hover: opacity veya shadow değişimi
- Min boyut: 44x44px (erişilebilirlik)

### Skor / İlerleme Göstergesi
- Font: mono, font-bold
- Renk: `text-primary` veya `text-accent`
- Arka plan: `bg-muted rounded-full`
- İlerleme çubuğu dolgu: `bg-primary` veya `bg-accent`

### Doğru/Yanlış Geri Bildirimi
- Doğru: `bg-accent/20 border-accent text-accent` (#9FC131)
- Yanlış: `bg-destructive/20 border-destructive text-destructive` (#EF4444)

### Arka Plan
- Sayfa: `bg-background` (#F8F7F2)
- Oyun alanı: `bg-card` veya `bg-secondary`
- Asla koyu tema kullanma — her zaman açık arka plan
