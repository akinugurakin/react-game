"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lightbulb, Check, Phone, KeyRound, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuthStore, useAuthHydrated, type ParentUser } from "@/lib/auth";
import { api } from "@/lib/api";

/* ---- Tipler ---- */

interface RegisterResponse {
  message: string;
  phone_number: string;
  dev_code: string | null;
}

interface VerifyResponse {
  access_token: string;
  refresh_token: string;
  parent: ParentUser;
}

/* ---- Adım göstergesi ---- */

const STEPS = [
  { id: 1, label: "Hesap", icon: UserPlus },
  { id: 2, label: "Doğrulama", icon: Phone },
  { id: 3, label: "Çocuk Profili", icon: KeyRound },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
            current > step.id
              ? "bg-[#9FC131] text-white"
              : current === step.id
                ? "bg-[#005C53] text-white"
                : "bg-gray-100 text-gray-400"
          )}>
            {current > step.id ? <Check className="h-4 w-4" /> : step.id}
          </div>
          {!current && <span className="text-xs text-muted-foreground hidden sm:block">{step.label}</span>}
          {i < STEPS.length - 1 && (
            <div className={cn("h-px w-8 transition-all", current > step.id ? "bg-[#9FC131]" : "bg-gray-200")} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ---- Adım 1: Bilgi formu ---- */

function Step1Form({ onSuccess, plan }: { onSuccess: (phone: string, devCode: string | null) => void; plan: string }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone_number: "", password: "" });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [childConsent, setChildConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post<RegisterResponse>("/auth/register", {
        ...form,
        kvkk_accepted: privacyAccepted,
      });
      onSuccess(data.phone_number, data.dev_code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-background p-8 shadow-sm">
      <div className="text-center mb-2">
        <h1 className="text-2xl font-extrabold text-[#042940]">Hesap Oluştur</h1>
        <p className="mt-1 text-sm text-muted-foreground">Çocuğunuz için güvenli bir öğrenme ortamı</p>
      </div>

      {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <div className="flex gap-3">
        <div className="flex-1 space-y-2">
          <Label htmlFor="first_name">Ad</Label>
          <Input id="first_name" placeholder="Ayşe" value={form.first_name}
            onChange={(e) => setForm(f => ({ ...f, first_name: e.target.value }))} required maxLength={100} />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="last_name">Soyad</Label>
          <Input id="last_name" placeholder="Yılmaz" value={form.last_name}
            onChange={(e) => setForm(f => ({ ...f, last_name: e.target.value }))} required maxLength={100} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input id="email" type="email" placeholder="ornek@email.com" value={form.email}
          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone_number">Telefon Numarası</Label>
        <div className="flex">
          <span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">+90</span>
          <Input
            id="phone_number"
            type="tel"
            placeholder="5XX XXX XX XX"
            value={form.phone_number}
            onChange={(e) => setForm(f => ({ ...f, phone_number: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
            required
            minLength={10}
            maxLength={10}
            className="rounded-l-none"
          />
        </div>
        <p className="text-xs text-muted-foreground">SMS doğrulama kodu bu numaraya gönderilecek</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Şifre</Label>
        <Input id="password" type="password" placeholder="En az 8 karakter"
          value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
          required minLength={8} />
      </div>

      <div className="space-y-3 pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked={childConsent} onChange={(e) => setChildConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#005C53]" required />
          <span className="text-xs leading-relaxed text-muted-foreground">
            Çocuğum için hesap oluşturuyorum ve 18 yaşından büyüğüm.
          </span>
        </label>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#005C53]" required />
          <span className="text-xs leading-relaxed text-muted-foreground">
            <Link href="/gizlilik-politikasi" target="_blank" className="font-semibold text-[#005C53] hover:underline">Gizlilik Politikası</Link>,{" "}
            <Link href="/gizlilik-politikasi/aydinlatma-metni" target="_blank" className="font-semibold text-[#005C53] hover:underline">KVKK</Link> ve{" "}
            <Link href="/kullanim-kosullari" target="_blank" className="font-semibold text-[#005C53] hover:underline">Kullanım Koşulları</Link>&apos;nı
            okudum, kabul ediyorum.
          </span>
        </label>
      </div>

      <Button type="submit" className="w-full" size="lg"
        disabled={loading || !privacyAccepted || !childConsent}>
        {loading ? "Hesap oluşturuluyor..." : "Devam Et →"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className="font-semibold text-brand-dark hover:underline">Giriş Yap</Link>
      </p>
    </form>
  );
}

/* ---- Adım 2: OTP doğrulama ---- */

function Step2OTP({
  phone,
  devCode,
  onSuccess,
  onBack,
}: {
  phone: string;
  devCode: string | null;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // Dev modda kodu otomatik doldur
  useEffect(() => {
    if (devCode) setCode(devCode);
  }, [devCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post<VerifyResponse>("/auth/verify-phone", {
        phone_number: phone,
        code,
      });
      setAuth(data.parent, data.access_token, data.refresh_token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Doğrulama başarısız.");
    } finally {
      setLoading(false);
    }
  };

  const maskedPhone = phone.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-background p-8 shadow-sm">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#005C53]/10">
          <Phone className="h-8 w-8 text-[#005C53]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#042940]">Telefonu Doğrula</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-[#042940]">+90 {maskedPhone}</span> numarasına<br />
          gönderilen 6 haneli kodu girin
        </p>
        {devCode && (
          <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2 text-xs text-amber-700">
            🔧 Dev modu — Kod: <span className="font-mono font-bold">{devCode}</span>
          </div>
        )}
      </div>

      {error && <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">{error}</div>}

      <div className="space-y-2">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder="— — — — — —"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="text-center text-3xl tracking-[0.6em] font-mono h-16"
          autoFocus
          required
        />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading || code.length < 6}>
        {loading ? "Doğrulanıyor..." : "Doğrula ve Devam Et"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {resendCooldown > 0 ? (
          <span>{resendCooldown}sn sonra tekrar gönderebilirsiniz</span>
        ) : (
          <button type="button" onClick={() => setResendCooldown(60)}
            className="font-semibold text-[#005C53] hover:underline">
            Kodu Tekrar Gönder
          </button>
        )}
      </div>

      <button type="button" onClick={onBack}
        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Geri dön
      </button>
    </form>
  );
}

/* ---- Adım 3: İlk çocuk profili ---- */

const AVATARS = [
  { id: "avatar_1", emoji: "🦁" }, { id: "avatar_2", emoji: "🐯" },
  { id: "avatar_3", emoji: "🦊" }, { id: "avatar_4", emoji: "🐧" },
  { id: "avatar_5", emoji: "🦋" }, { id: "avatar_6", emoji: "🐬" },
  { id: "avatar_7", emoji: "🦄" }, { id: "avatar_8", emoji: "🐸" },
  { id: "avatar_9", emoji: "🐼" }, { id: "avatar_10", emoji: "🦉" },
  { id: "avatar_11", emoji: "🐙" }, { id: "avatar_12", emoji: "🦕" },
];

const CLASS_LEVELS = [1, 2, 3, 4, 5, 6];

function Step3ChildProfile({ onSuccess }: { onSuccess: () => void }) {
  const { accessToken } = useAuthStore();
  const [form, setForm] = useState({
    first_name: "", last_name: "", avatar: "avatar_1",
    pin: "", pin_confirm: "", class_level: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.pin.length < 4) { setError("PIN en az 4 haneli olmalıdır."); return; }
    if (form.pin !== form.pin_confirm) { setError("PIN'ler eşleşmiyor."); return; }
    setLoading(true);
    try {
      await api.post("/students", {
        first_name: form.first_name,
        last_name: form.last_name,
        avatar: form.avatar,
        pin: form.pin,
        class_level: form.class_level,
      }, accessToken ?? undefined);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-background p-8 shadow-sm">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-extrabold text-[#042940]">İlk Profili Oluştur</h2>
        <p className="mt-1 text-sm text-muted-foreground">Çocuğunuz bu profil ile oynayacak</p>
      </div>

      {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <div className="flex gap-3">
        <div className="flex-1 space-y-2">
          <Label htmlFor="child_first_name">Çocuğun Adı</Label>
          <Input id="child_first_name" placeholder="Ali" value={form.first_name}
            onChange={(e) => setForm(f => ({ ...f, first_name: e.target.value }))} required maxLength={100} />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="child_last_name">Soyadı</Label>
          <Input id="child_last_name" placeholder="Yılmaz" value={form.last_name}
            onChange={(e) => setForm(f => ({ ...f, last_name: e.target.value }))} required maxLength={100} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sınıf</Label>
        <div className="flex gap-2">
          {CLASS_LEVELS.map((lvl) => (
            <button key={lvl} type="button"
              onClick={() => setForm(f => ({ ...f, class_level: lvl }))}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all",
                form.class_level === lvl ? "bg-[#005C53] text-white" : "bg-gray-100 text-[#042940]/50 hover:bg-gray-200"
              )}>
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Avatar</Label>
        <div className="grid grid-cols-6 gap-2">
          {AVATARS.map((av) => (
            <button key={av.id} type="button" onClick={() => setForm(f => ({ ...f, avatar: av.id }))}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all",
                form.avatar === av.id ? "bg-[#005C53]/15 ring-2 ring-[#005C53]" : "bg-gray-50 hover:bg-gray-100"
              )}>
              {av.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>PIN (4-6 rakam)</Label>
        <p className="text-xs text-muted-foreground">Çocuğunuz bu PIN ile giriş yapacak</p>
        <div className="flex gap-3">
          <Input type="password" inputMode="numeric" pattern="[0-9]*" placeholder="PIN"
            value={form.pin} onChange={(e) => setForm(f => ({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
            required minLength={4} maxLength={6} className="text-center text-xl tracking-[0.4em] font-mono" />
          <Input type="password" inputMode="numeric" pattern="[0-9]*" placeholder="Tekrar"
            value={form.pin_confirm} onChange={(e) => setForm(f => ({ ...f, pin_confirm: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
            required minLength={4} maxLength={6} className="text-center text-xl tracking-[0.4em] font-mono" />
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#005C53] hover:bg-[#005C53]/90" size="lg" disabled={loading}>
        {loading ? "Oluşturuluyor..." : "Profil Oluştur ve Devam Et"}
      </Button>
    </form>
  );
}

/* ---- Ana bileşen ---- */

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "yearly";
  const { isAuthenticated } = useAuthStore();
  const hydrated = useAuthHydrated();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && isAuthenticated && step === 1) {
      router.replace(`/kayit/odeme?plan=${plan}`);
    }
  }, [hydrated, isAuthenticated, step, router, plan]);

  if (!hydrated) return null;
  if (isAuthenticated && step === 1) return null;

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-6 flex items-center gap-2">
          <Lightbulb className="h-10 w-10 text-brand-dark" />
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">LUMO</span>
            <p className="text-[9px] font-normal text-brand-dark/40">Eğitsel Oyun Platformu</p>
          </div>
        </Link>
      </div>

      <StepIndicator current={step} />

      {step === 1 && (
        <Step1Form
          plan={plan}
          onSuccess={(p, dc) => {
            setPhone(p);
            setDevCode(dc);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <Step2OTP
          phone={phone}
          devCode={devCode}
          onSuccess={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Step3ChildProfile
          onSuccess={() => router.push(`/kayit/odeme?plan=${plan}`)}
        />
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><p className="text-muted-foreground">Yükleniyor...</p></div>}>
      <RegisterContent />
    </Suspense>
  );
}
