# CLAUDE.md — Eğitici Oyun Platformu (Lumo)

Bu dosya, Claude Code'un projeyi anlaması ve doğru kararlar alması için yazılmıştır.

---

## 🎯 Proje Özeti

6-12 yaş çocuklara yönelik, eğitici mini oyunlar içeren **ücretli abonelik platformu**.  
Veli hesabı açar → öğrenci profilleri oluşturur → çocuklar oyunlar oynayarak ilerlemesini takip eder.  
Platform; web tarayıcı, iOS/Android tablet ve akıllı tahta üzerinde çalışır.

---

## 🏗️ Platform Hedefleri

| Platform | Teknoloji | Durum |
|---|---|---|
| Web (tarayıcı) | Next.js 14 | Aktif geliştirme |
| iOS Tablet | Flutter | Planlama aşaması |
| Android Tablet | Flutter | Planlama aşaması |
| Akıllı Tahta | Web — Board Mode | Sonraki aşama |
| Mobil (telefon) | Flutter | Sonraki aşama |

> **Not:** Flutter codebase tek bir repoda, tablet-first tasarımla geliştirilir. Telefon desteği adaptive layout sayesinde ücretsiz gelir ama öncelik değil. Akıllı tahta için ayrı uygulama yazmıyoruz — web sürümüne "Board Mode" eklenecek (büyük ekran responsive + touch optimize).

---

## 🏗️ Mimari & Teknoloji Seçimleri

### Frontend — Web
- **Framework:** Next.js 14 (App Router)
- **UI:** React + Tailwind CSS
- **Tasarım Dili:** Minimal & sade — temiz beyaz/açık arka planlar, büyük tipografi, az ikon
- **Board Mode:** `/board` route altında akıllı tahta için özel layout (tam ekran, büyük dokunma alanları, öğretmen kontrolü)

### Frontend — Tablet (iOS & Android)
- **Framework:** Flutter
- **Hedef:** iPad ve Android tablet (≥10 inç ekran) — tablet-first layout
- **Adaptive Layout:** `flutter_adaptive_scaffold` veya manuel LayoutBuilder ile tablet/telefon ayrımı
- **Oyun Yöntemi:** Web oyunları `webview_flutter` ile render edilir (oyun kodunu iki kez yazmamak için); Flutter-native oyunlar eklenebilir
- **Durum Yönetimi:** Riverpod
- **HTTP Client:** Dio + Retrofit

### Backend (Ortak — Tüm Platformlar)
- **Framework:** FastAPI (Python)
  - Async-native, otomatik OpenAPI dokümantasyonu
  - Pydantic ile güçlü veri validasyonu
- **Veritabanı:** PostgreSQL
- **ORM:** SQLAlchemy (async)
- **Cache / Session:** Redis
- **Auth:** JWT (access token 15 dk + refresh token 7 gün)
- **Migration:** Alembic

### Ödeme
- **Sağlayıcı:** Stripe
  - Subscription (aylık / yıllık plan)
  - 7 günlük ücretsiz trial (kart alınır, ücret çekilmez)
  - Stripe Webhook ile ödeme durumu senkronizasyonu

---

## 🐳 Docker Altyapısı

**Tüm servisler Docker ile ayağa kalkar.** Geliştirme ve production aynı docker-compose dosyaları üzerinden çalışır.

### Servis Haritası

```
docker-compose.yml (root)
├── backend        → FastAPI :8000
├── postgres       → PostgreSQL :5432
├── redis          → Redis :6379
├── web            → Next.js :3000
└── nginx          → Reverse proxy :80/:443 (production)
```

### Klasör Yapısı (Docker)

```
/
├── docker-compose.yml              # Geliştirme ortamı
├── docker-compose.prod.yml         # Production override
├── .env.example                    # Tüm env değişkenleri (şablon)
│
├── web/
│   └── Dockerfile                  # Next.js image
│
├── backend/
│   └── Dockerfile                  # FastAPI image
│
├── nginx/
│   ├── nginx.conf                  # Production reverse proxy config
│   └── Dockerfile
│
├── tablet/                         # Flutter uygulaması
│   └── (Docker yok — native build)
│
└── CLAUDE.md
```

### docker-compose.yml (geliştirme — şablon)

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: lumo
      POSTGRES_USER: lumo
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql+asyncpg://lumo:${DB_PASSWORD}@postgres:5432/lumo
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app   # hot reload
    command: uvicorn app.main:app --host 0.0.0.0 --reload

  web:
    build: ./web
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    depends_on:
      - backend
    volumes:
      - ./web:/app      # hot reload
      - /app/node_modules
      - /app/.next

volumes:
  postgres_data:
```

> **Tablet geliştirme:** Flutter native build ile çalışır, Docker kullanmaz. Backend'e `http://localhost:8000` veya gerçek sunucu IP'si ile bağlanır.

---

## 📁 Tam Klasör Yapısı

```
/
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── CLAUDE.md
│
├── web/                            # Next.js uygulaması
│   ├── Dockerfile
│   ├── app/
│   │   ├── (auth)/                 # login, register
│   │   ├── (dashboard)/            # veli paneli
│   │   ├── (games)/                # oyun sayfaları
│   │   ├── (board)/                # akıllı tahta modu (Board Mode)
│   │   ├── leaderboard/
│   │   └── api/                    # Next.js API routes (proxy)
│   ├── components/
│   │   ├── ui/                     # atomik bileşenler
│   │   ├── games/                  # oyun bileşenleri
│   │   ├── board/                  # akıllı tahta bileşenleri
│   │   └── layout/                 # header, footer, sidebar
│   ├── lib/
│   │   ├── api.ts
│   │   └── auth.ts
│   └── public/
│
├── tablet/                         # Flutter tablet uygulaması
│   ├── lib/
│   │   ├── main.dart
│   │   ├── core/
│   │   │   ├── api/                # Dio + Retrofit API client
│   │   │   ├── auth/               # JWT token yönetimi
│   │   │   └── theme/              # Lumo tema ve renkler
│   │   ├── features/
│   │   │   ├── onboarding/         # Splash, karşılama
│   │   │   ├── auth/               # Veli giriş/kayıt
│   │   │   ├── profile_select/     # Netflix tarzı profil seçimi
│   │   │   ├── games/              # Oyun listesi + WebView oynatıcı
│   │   │   ├── progress/           # Öğrenci ilerleme
│   │   │   └── parent_dashboard/   # Veli paneli
│   │   └── shared/
│   │       ├── widgets/            # Ortak widget'lar
│   │       └── models/             # Data class'lar
│   ├── android/
│   ├── ios/
│   └── pubspec.yaml
│
├── backend/                        # FastAPI uygulaması
│   ├── Dockerfile
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── games.py
│   │   │   ├── progress.py
│   │   │   ├── leaderboard.py
│   │   │   └── payments.py
│   │   └── services/
│   ├── alembic/
│   ├── tests/
│   └── requirements.txt
│
└── nginx/
    ├── Dockerfile
    └── nginx.conf
```

---

## 👨‍👩‍👧 Kullanıcı Modeli (Parent-First)

### Temel Mimari Karar
- Öğrenci kendi başına hesap oluşturmaz
- **Veli** hesap açar → plan seçer → trial başlatır → öğrenci profili oluşturur
- Öğrenci girişi **Netflix benzeri** profil seçimi + PIN ile yapılır

### Onboarding Akışı
1. Veli kayıt (ad, email, şifre, onay kutuları)
2. Plan seçimi (aylık / yıllık)
3. 7 gün ücretsiz deneme (0 TL + 3D Secure + kart kaydı)
4. Öğrenci profili oluşturma (ad, soyad, avatar, PIN, sınıf/yaş)

### Giriş Sistemi
- **Veli:** email + şifre → veli dashboard
- **Öğrenci:** profil seçimi + PIN → öğrenci deneyimi
- PIN veli tarafından belirlenir, bcrypt ile hash'lenir, rate limit uygulanır

---

## 🗃️ Veritabanı Modelleri

```
parent_users
  id, firstName, lastName, email, passwordHash
  createdAt, isActive

student_profiles
  id, parentId (FK), firstName, lastName, avatar
  pinHash, classLevel, createdAt

subscriptions
  id, parentId (FK), stripeCustomerId, stripeSubscriptionId
  planType (monthly | yearly), status (trial | active | cancelled | past_due)
  trialStart, trialEnd, currentPeriodEnd, autoRenew

payment_methods
  id, parentId (FK), tokenizedCardRef, last4, brand

games
  id, title, description, category, minAge, maxAge
  thumbnailUrl, isPublished, webPath

game_sessions
  id, studentId (FK), gameId (FK), score, durationSeconds
  platform (web | tablet | board), completedAt

student_progress
  id, studentId (FK), gameId (FK)
  totalPlays, bestScore, totalTimeSpent, lastPlayedAt

leaderboard_entries
  id, studentId (FK), gameId (FK), score, rank
  period (weekly | alltime), updatedAt
```

> `game_sessions.platform` alanı ile hangi platformdan oynandığı takip edilir.

---

## 🔐 Auth Akışı

1. Veli kayıt → şifre bcrypt ile hash'lenir
2. Login → JWT access token (15 dk) + refresh token (7 gün) döner
3. Her istekte `Authorization: Bearer <token>` header'ı
4. Token süresi dolunca refresh endpoint çağrılır
5. Öğrenci PIN doğrulaması → kısa süreli student_session token döner

---

## 💳 Ödeme Akışı (Stripe)

1. Veli plan seçer → `/payments/create-checkout-session`
2. Stripe Checkout sayfasına yönlendirilir (3D Secure dahil)
3. Başarılı → Stripe Webhook → `subscriptions` tablosu güncellenir
4. 7 gün sonra otomatik ücretlendirme
5. Abonelik bittiyse oyunlara erişim engellenir (`is_subscribed` middleware)

---

## 🎮 Oyun Yapısı

### Web
- Oyunlar React bileşenleri olarak geliştirilir
- Her oyunun `GameConfig`: `{ id, title, component, minAge, maxAge, webPath }`
- Oyun bitince `POST /games/{id}/session` ile skor + platform kaydedilir

### Tablet (Flutter)
- Web oyunlar `webview_flutter` ile açılır — oyun kodu tekrar yazılmaz
- WebView ↔ Flutter arası iletişim: `JavascriptChannel` ile skor/tamamlanma eventi gönderilir
- Flutter-native oyunlar gerekirse `features/games/native/` altına eklenir

### Akıllı Tahta (Board Mode)
- Web uygulamasının `/board` route'u üzerinden çalışır
- Özellikler: tam ekran, 60fps+ animasyon, büyük dokunma alanları (≥48px), çoklu dokunma
- Öğretmen paneli: sınıf oyunu başlatma, skor yansıtma, oyun sırası yönetimi
- Ayrı uygulama YOK — web responsive tasarımın uzantısı

---

## 🏆 Liderlik Tablosu

- Haftalık ve tüm zamanlar olmak üzere 2 kategori
- Her oyun için ayrı liderlik tablosu
- Sıralama: skor (desc), süre (asc)
- Haftalık tablo her Pazartesi 00:00 UTC sıfırlanır (cron job)
- Maksimum 100 kişi gösterilir

---

## 🎨 Tasarım Prensipleri

- **Renk paleti:** Beyaz arka plan, canlı ama sade 1-2 vurgu rengi (indigo + sarı)
- **Tipografi:** Yuvarlak, okunabilir font (Nunito veya Poppins)
- **Komponent stili:** Büyük butonlar, bol padding, yuvarlatılmış köşeler
- **Tablet tasarım:** Yatay layout, 2-3 sütun grid, büyük dokunma alanları (≥48px)
- **Board Mode tasarım:** Çok büyük tipografi (≥32px), yüksek kontrast, 1080p+ optimize
- **İllüstrasyon:** Düz (flat) vektör çizimler
- **Animasyon:** 200-300ms — dikkat dağıtmayan
- **Erişilebilirlik:** WCAG AA kontrast, büyük tıklanabilir alanlar

---

## 🌍 Dil & Lokalizasyon

- Öncelikli dil: **Türkçe**
- İkincil dil: **İngilizce** (web: `next-intl`, Flutter: `flutter_localizations`)
- Tarih/saat: Türkiye (Europe/Istanbul) timezone

---

## ✅ Geliştirme Öncelikleri (Sıralı)

### Faz 1 — Temel Altyapı
1. [ ] Docker altyapısı kurulumu (docker-compose, Dockerfile'lar)
2. [ ] Backend: Auth (kayıt / giriş / JWT / PIN)
3. [ ] Backend: Stripe abonelik entegrasyonu

### Faz 2 — Web MVP
4. [ ] Frontend: Landing page + kayıt/giriş sayfaları
5. [ ] Frontend: Abonelik satın alma akışı
6. [ ] Frontend: Veli dashboard + öğrenci profil yönetimi
7. [ ] Frontend: Öğrenci oyun sayfası
8. [ ] İlk 3 oyun prototipi
9. [ ] Liderlik tablosu

### Faz 3 — Tablet Uygulaması
10. [ ] Flutter proje kurulumu + tema + API client
11. [ ] Veli auth (giriş/kayıt)
12. [ ] Profil seçimi + PIN (Netflix UI)
13. [ ] Oyun listesi + WebView oynatıcı
14. [ ] Öğrenci ilerleme ekranı
15. [ ] App Store & Google Play yayını

### Faz 4 — Akıllı Tahta (Board Mode)
16. [ ] Web: `/board` route + Board Mode layout
17. [ ] Öğretmen kontrol paneli
18. [ ] Sınıf oyunu / skor yansıtma

### Sonraki
- [ ] Admin paneli (oyun yönetimi, kullanıcı istatistikleri)
- [ ] Telefon desteği (Flutter adaptive layout zaten hazır)
- [ ] Push notification (tablet için)

---

## ⚙️ Ortam Değişkenleri

```env
# --- Ortak ---
DB_PASSWORD=supersecret

# --- Backend ---
DATABASE_URL=postgresql+asyncpg://lumo:${DB_PASSWORD}@postgres:5432/lumo
REDIS_URL=redis://redis:6379
SECRET_KEY=...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
ALLOWED_ORIGINS=http://localhost:3000,https://lumo.com.tr

# --- Frontend (Next.js) ---
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# --- Flutter (tablet) ---
# lib/core/config/env.dart içinde ya da --dart-define ile
API_BASE_URL=https://api.lumo.com.tr
```

---

## 🧪 Test Stratejisi

- **Backend:** pytest + httpx (async test client)
- **Frontend:** Jest + React Testing Library
- **Flutter:** flutter_test + mockito
- **E2E:** Playwright (web), integration_test (Flutter)
- Her yeni özellik için en az 1 happy-path testi yazılmalı

---

## 📌 Genel Kurallar (Claude Code için)

- Yeni dosya oluşturmadan önce mevcut yapıya bak
- Tip güvenliği: TypeScript strict mode, Python type hints, Dart null-safety zorunlu
- Her router/page için ayrı dosya — tek dosyaya sıkıştırma
- Hata mesajları kullanıcıya Türkçe gösterilmeli
- `console.log` production'da kaldırılmalı — logger kullan
- Commit mesajları İngilizce, conventional commits formatında
- Docker dışına bağımlılık ekleme — yeni servis gerekirse docker-compose'a ekle

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

Bu kural tüm TSX/JSX/Dart dosyaları, string literal'ler ve değişken atamaları için geçerlidir.
