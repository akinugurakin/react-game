"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lightbulb, GraduationCap, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { SchoolPicker } from "@/components/ui/school-picker";
import { Suspense } from "react";

interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    username: string;
    age: number;
    avatar_url: string | null;
    is_active: boolean;
    created_at: string;
    role?: "student" | "teacher";
  };
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, setAuth } = useAuthStore();
  const hydrated = useAuthHydrated();
  const initialRole = searchParams.get("role") === "teacher" ? "teacher" : "student";
  const [step, setStep] = useState<"role" | "form">(searchParams.get("role") ? "form" : "role");
  const [role, setRole] = useState<"student" | "teacher">(initialRole as "student" | "teacher");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    sinif: "",
    parent_email: "",
    school_name: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [hydrated, isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: Record<string, unknown> = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role,
      };
      if (role === "student") {
        payload.sinif = parseInt(formData.sinif);
        if (formData.school_name) payload.school_name = formData.school_name;
        if (formData.parent_email) {
          payload.parent_email = formData.parent_email;
        }
      }
      if (role === "teacher") {
        payload.school_name = formData.school_name;
      }

      // TODO: Backend hazır olduğunda gerçek API'ye bağlanacak
      // Mock register
      const mockUser = {
        id: 1,
        email: formData.email,
        username: formData.username,
        age: role === "student" ? parseInt(formData.sinif) + 5 : 30,
        avatar_url: null,
        role: role as "student" | "teacher",
        parentApproved: role !== "student",
      };
      setAuth(mockUser, "mock-access-token", "mock-refresh-token");

      if (role === "student") {
        // Öğrenci kayıtlarında ebeveyn onayı bekleniyor sayfasına yönlendir
        router.push("/ebeveyn-onay/bekliyor");
      } else {
        router.push("/teacher");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return null;
  if (isAuthenticated) return null;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Lightbulb className="h-10 w-10 text-brand-dark" />
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">LUMO</span>
            <p className="text-[9px] font-normal text-brand-dark/40">Eğitsel Oyun Platformu</p>
          </div>
        </Link>
        <h1 className="text-3xl font-extrabold">Kayıt Ol</h1>
        <p className="mt-2 text-muted-foreground">
          {step === "role"
            ? "Nasıl kayıt olmak istiyorsun?"
            : role === "teacher"
              ? "Öğretmen hesabı oluştur"
              : "Yeni bir hesap oluştur ve oynamaya başla"}
        </p>
      </div>

      {step === "role" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setRole("student"); setStep("form"); }}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-transparent bg-background p-8 shadow-sm transition-all hover:border-[#005C53] hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#005C53]/10 transition-colors group-hover:bg-[#005C53] group-hover:text-white">
                <GraduationCap className="h-8 w-8 text-[#005C53] group-hover:text-white" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#042940]">Öğrenci</p>
                <p className="mt-1 text-xs text-muted-foreground">Oyun oyna, öğren</p>
              </div>
            </button>

            <button
              onClick={() => { setRole("teacher"); setStep("form"); }}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-transparent bg-background p-8 shadow-sm transition-all hover:border-[#9FC131] hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#9FC131]/10 transition-colors group-hover:bg-[#9FC131] group-hover:text-white">
                <Users className="h-8 w-8 text-[#9FC131] group-hover:text-white" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#042940]">Öğretmen</p>
                <p className="mt-1 text-xs text-muted-foreground">Sınıf yönet, takip et</p>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Zaten hesabın var mı?{" "}
            <Link href="/login" className="font-semibold text-brand-dark hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => { setStep("role"); setError(""); }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Rol seçimine dön
          </button>

          <div className={cn(
            "flex items-center gap-3 rounded-xl p-3",
            role === "teacher" ? "bg-[#9FC131]/10" : "bg-[#005C53]/10"
          )}>
            {role === "teacher" ? (
              <Users className="h-5 w-5 text-[#9FC131]" />
            ) : (
              <GraduationCap className="h-5 w-5 text-[#005C53]" />
            )}
            <span className="text-sm font-semibold text-[#042940]">
              {role === "teacher" ? "Öğretmen Kayıt" : "Öğrenci Kayıt"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-background p-8 shadow-sm">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" name="email" type="email" placeholder="ornek@email.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Ad Soyad</Label>
              <Input id="username" name="username" placeholder={role === "teacher" ? "Ayşe Yılmaz" : "Ali Demir"} value={formData.username} onChange={handleChange} required minLength={3} maxLength={50} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input id="password" name="password" type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" value={formData.password} onChange={handleChange} required minLength={6} />
            </div>

            {role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="sinif">Sınıf</Label>
                <select
                  id="sinif"
                  name="sinif"
                  value={formData.sinif}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sinif: e.target.value }))}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Sınıf seçin</option>
                  {[1,2,3,4,5,6,7,8].map((s) => (
                    <option key={s} value={s}>{s}. Sınıf</option>
                  ))}
                </select>
              </div>
            )}

            {role === "student" && (
              <div className="space-y-2">
                <Label>Okul (Opsiyonel)</Label>
                <SchoolPicker
                  value={formData.school_name}
                  onChange={(name) => setFormData((prev) => ({ ...prev, school_name: name }))}
                />
              </div>
            )}

            {role === "student" && (
              <div className="space-y-2 rounded-lg bg-[#005C53]/5 p-4">
                <p className="text-sm font-medium text-[#042940]">
                  Ebeveyn / Veli Bilgileri
                </p>
                <p className="text-xs text-muted-foreground">
                  Çocuk hesapları ebeveyn onayı gerektirir. Kayıt sonrası ebeveyn e-postasına bir onay bağlantısı gönderilecektir.
                </p>
                <Label htmlFor="parent_email">Ebeveyn E-postası</Label>
                <Input id="parent_email" name="parent_email" type="email" placeholder="ebeveyn@email.com" value={formData.parent_email} onChange={handleChange} required />
              </div>
            )}

            {role === "teacher" && (
              <div className="space-y-2">
                <Label>Okul</Label>
                <SchoolPicker
                  value={formData.school_name}
                  onChange={(name) => setFormData((prev) => ({ ...prev, school_name: name }))}
                />
              </div>
            )}

            <div className="space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#005C53] focus:ring-[#005C53]"
                  required
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  <Link href="/gizlilik-politikasi" target="_blank" className="font-semibold text-[#005C53] hover:underline">Gizlilik Politikası</Link>,{" "}
                  <Link href="/gizlilik-politikasi/aydinlatma-metni" target="_blank" className="font-semibold text-[#005C53] hover:underline">KVKK Aydınlatma Metni</Link>,{" "}
                  <Link href="/gizlilik-politikasi/acik-riza" target="_blank" className="font-semibold text-[#005C53] hover:underline">Açık Rıza Metni</Link> ve{" "}
                  <Link href="/kullanim-kosullari" target="_blank" className="font-semibold text-[#005C53] hover:underline">Kullanım Koşulları</Link>&apos;nı
                  okudum ve kabul ediyorum.
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading || !privacyAccepted}>
              {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Zaten hesabın var mı?{" "}
              <Link href="/login" className="font-semibold text-brand-dark hover:underline">
                Giriş Yap
              </Link>
            </p>
          </form>
        </div>
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
