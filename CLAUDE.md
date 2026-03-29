# CLAUDE.md — Eğitici Oyun Platformu

Bu dosya, Claude Code'un projeyi anlaması ve doğru kararlar alması için yazılmıştır.

---

## 🎯 Proje Özeti

6-12 yaş çocuklara yönelik, eğitici mini oyunlar içeren **ücretli abonelik platformu**.  
Kullanıcılar kayıt olur, abone olur ve oyunlar oynayarak ilerlemelerini takip eder.  
Liderlik tablosu ile motivasyon artırılır.

---

## 🏗️ Mimari & Teknoloji Seçimleri

### Frontend — Web
- **Framework:** Next.js 14 (App Router)
- **UI:** React + Tailwind CSS
- **Tasarım Dili:** Minimal & sade — temiz beyaz/açık arka planlar, büyük tipografi, az ikon

### Frontend — Mobil
- **Framework:** Flutter (iOS & Android)
- API ile web backend'i paylaşır

### Backend
- **Framework:** FastAPI (Python)
  - Hızlı, async-native, otomatik OpenAPI dökümantasyonu
  - Pydantic ile güçlü veri validasyonu
- **Veritabanı:** PostgreSQL
- **ORM:** SQLAlchemy (async)
- **Cache / Session:** Redis
- **Auth:** JWT (access + refresh token)

### Ödeme
- **Sağlayıcı:** Stripe
  - Subscription (aylık / yıllık plan)
  - Stripe Webhook ile ödeme durumu senkronizasyonu

### Deployment
- Frontend (Next.js): Vercel
- Backend (FastAPI): Railway veya Render
- Veritabanı: Supabase (PostgreSQL managed)
- Flutter: App Store & Google Play

---

## 📁 Önerilen Klasör Yapısı

```
/
├── web/                        # Next.js uygulaması
│   ├── app/
│   │   ├── (auth)/             # login, register sayfaları
│   │   ├── (dashboard)/        # kullanıcı paneli
│   │   ├── (games)/            # oyun sayfaları
│   │   ├── leaderboard/        # liderlik tablosu
│   │   └── api/                # Next.js API routes (opsiyonel, proxy)
│   ├── components/
│   │   ├── ui/                 # buton, kart, modal gibi atomik bileşenler
│   │   ├── games/              # oyun bileşenleri
│   │   └── layout/             # header, footer, sidebar
│   ├── lib/
│   │   ├── api.ts              # backend API client
│   │   └── auth.ts             # auth helpers
│   └── public/
│
├── mobile/                     # Flutter uygulaması
│   ├── lib/
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── services/           # API calls
│   │   └── models/
│   └── pubspec.yaml
│
├── backend/                    # FastAPI uygulaması
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   │   ├── config.py       # env variables
│   │   │   ├── security.py     # JWT helpers
│   │   │   └── database.py     # DB bağlantısı
│   │   ├── models/             # SQLAlchemy modelleri
│   │   ├── schemas/            # Pydantic schemas
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── games.py
│   │   │   ├── progress.py
│   │   │   ├── leaderboard.py
│   │   │   └── payments.py
│   │   └── services/           # iş mantığı katmanı
│   ├── alembic/                # DB migration
│   ├── tests/
│   └── requirements.txt
│
└── CLAUDE.md
```

---

## 🗃️ Veritabanı Modelleri (Ana Tablolar)

```
users
  id, email, password_hash, username, age, avatar_url
  created_at, is_active

subscriptions
  id, user_id (FK), stripe_customer_id, stripe_subscription_id
  plan (monthly | yearly), status (active | cancelled | past_due)
  current_period_end

games
  id, title, description, category, min_age, max_age
  thumbnail_url, is_published

game_sessions
  id, user_id (FK), game_id (FK), score, duration_seconds
  completed_at

progress
  id, user_id (FK), game_id (FK)
  total_plays, best_score, total_time_spent, last_played_at

leaderboard_entries
  id, user_id (FK), game_id (FK), score, rank
  period (weekly | alltime), updated_at
```

---

## 🔐 Auth Akışı

1. Kullanıcı kayıt olur → şifre bcrypt ile hash'lenir
2. Login → JWT access token (15 dk) + refresh token (7 gün) döner
3. Her istekte `Authorization: Bearer <token>` header'ı gönderilir
4. Token süresi dolunca refresh endpoint'i çağrılır
5. Ebeveyn onayı: 13 yaş altı kullanıcılar için ebeveyn e-postası istenir

---

## 💳 Ödeme Akışı (Stripe)

1. Kullanıcı plan seçer → `/payments/create-checkout-session` çağrılır
2. Stripe Checkout sayfasına yönlendirilir
3. Başarılı ödeme → Stripe Webhook → `subscriptions` tablosu güncellenir
4. Abonelik durumu her API isteğinde kontrol edilir (`is_subscribed` middleware)
5. Abonelik bittiyse kullanıcı oyunlara erişemez

---

## 🎮 Oyun Yapısı

- Oyunlar React bileşenleri olarak geliştirilir (web)
- Her oyunun bir `GameConfig` tipi vardır: `{ id, title, component, minAge, maxAge }`
- Oyun bitince `POST /games/{id}/session` ile skor kaydedilir
- Flutter tarafında oyunlar WebView içinde çalışır (web oyunlarını yeniden kullanmak için) ya da Flutter-native yazılır

---

## 🏆 Liderlik Tablosu

- Haftalık ve tüm zamanlar olmak üzere 2 kategori
- Her oyun için ayrı liderlik tablosu
- Sıralama: skor (desc), süre (asc) — ikinci kriter bağ bozar
- Haftalık tablo her Pazartesi 00:00 UTC sıfırlanır (cron job)
- Maksimum 100 kişi gösterilir

---

## 🎨 Tasarım Prensipleri

- **Renk paleti:** Beyaz arka plan, vurgu rengi olarak canlı ama sade 1-2 renk (örn. indigo + sarı)
- **Tipografi:** Yuvarlak, okunabilir font (örn. Nunito veya Poppins)
- **Komponent stili:** Büyük butonlar, bol padding, yuvarlatılmış köşeler
- **İllüstrasyon:** Düz (flat) vektör çizimler, gerçekçi fotoğraf yok
- **Animasyon:** Hafif, hızlı (200-300ms) — dikkat dağıtmayan
- **Erişilebilirlik:** WCAG AA kontrast uyumu, büyük tıklanabilir alanlar

---

## 🌍 Dil & Lokalizasyon

- Öncelikli dil: **Türkçe**
- İkincil dil: **İngilizce** (i18n altyapısı kurulsun, `next-intl` önerilir)
- Tarih/saat: Türkiye (Europe/Istanbul) timezone

---

## ✅ Geliştirme Öncelikleri (Sıralı)

1. [ ] Backend: Auth (kayıt / giriş / JWT)
2. [ ] Backend: Stripe abonelik entegrasyonu
3. [ ] Frontend: Landing page + kayıt/giriş sayfaları
4. [ ] Frontend: Abonelik satın alma akışı
5. [ ] Frontend: Dashboard (ilerleme, oynanan oyunlar)
6. [ ] İlk oyun prototipi (1 oyun)
7. [ ] Liderlik tablosu
8. [ ] Flutter mobil uygulama
9. [ ] Admin paneli (oyun yönetimi, kullanıcı istatistikleri)

---

## ⚙️ Ortam Değişkenleri (.env)

```
# Backend
DATABASE_URL=postgresql+asyncpg://...
REDIS_URL=redis://...
SECRET_KEY=...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Frontend (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

---

## 🧪 Test Stratejisi

- **Backend:** pytest + httpx (async test client)
- **Frontend:** Jest + React Testing Library
- **E2E:** Playwright
- Her yeni özellik için en az 1 happy-path testi yazılmalı

---

## 📌 Genel Kurallar (Claude Code için)

- Yeni dosya oluşturmadan önce mevcut yapıya bak
- Tip güvenliği: TypeScript strict mode, Python type hints zorunlu
- Her router/page için ayrı dosya — tek dosyaya sıkıştırma
- Hata mesajları kullanıcıya Türkçe gösterilmeli
- Console.log production'da kaldırılmalı — logger kullan
- Commit mesajları İngilizce, conventional commits formatında

### ⚠️ Türkçe Karakter Kuralı (KRİTİK)

TSX/JSX dosyalarında Türkçe karakterler **her zaman doğrudan UTF-8** olarak yazılmalıdır.
`\u` escape sequence'leri ASLA kullanılmamalıdır.

**DOĞRU:**
```tsx
<p>Öğrenci Ekle</p>
<span>Sınıfım</span>
const label = "Türkçe";
```

**YANLIŞ:**
```tsx
<p>\u00d6\u011frenci Ekle</p>
<span>S\u0131n\u0131f\u0131m</span>
const label = "T\u00fcrk\u00e7e";
```

Bu kural tüm TSX/JSX dosyaları, string literal'ler, JSX text content ve değişken atamaları için geçerlidir.
Dosya encoding'i UTF-8 olmalıdır (Next.js varsayılanı zaten UTF-8'dir).
