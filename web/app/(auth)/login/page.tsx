"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lightbulb, GraduationCap, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface LoginResponse {
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

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuthStore();
  const hydrated = useAuthHydrated();
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [hydrated, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      setAuth(
        { ...data.user, role: data.user.role || role },
        data.access_token,
        data.refresh_token
      );
      router.push(role === "teacher" ? "/teacher" : "/dashboard");
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
            <p className="text-[9px] font-normal text-brand-dark/40">E&#287;itsel Oyun Platformu</p>
          </div>
        </Link>
        {step !== "role" && (
          <p className="mt-2 text-muted-foreground">
            {role === "teacher" ? "Öğretmen hesabına giriş yap" : "Hesabına giriş yap ve oynamaya başla"}
          </p>
        )}
      </div>

      {step === "role" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Öğrenci */}
            <button
              onClick={() => { setRole("student"); setStep("form"); }}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-transparent bg-background p-8 shadow-sm transition-all hover:border-[#005C53] hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#005C53]/10 transition-colors group-hover:bg-[#005C53] group-hover:text-white">
                <GraduationCap className="h-8 w-8 text-[#005C53] group-hover:text-white" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#042940]">&#214;&#287;renci</p>
                <p className="mt-1 text-xs text-muted-foreground">Oyun oyna, &#246;&#287;ren</p>
              </div>
            </button>

            {/* Öğretmen */}
            <button
              onClick={() => { setRole("teacher"); setStep("form"); }}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-transparent bg-background p-8 shadow-sm transition-all hover:border-[#9FC131] hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#9FC131]/10 transition-colors group-hover:bg-[#9FC131] group-hover:text-white">
                <Users className="h-8 w-8 text-[#9FC131] group-hover:text-white" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#042940]">&#214;&#287;retmen</p>
                <p className="mt-1 text-xs text-muted-foreground">Sınıf y&#246;net, takip et</p>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Hesabın yok mu?{" "}
            <Link href="/register" className="font-semibold text-brand-dark hover:underline">
              Kayıt Ol
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Geri butonu */}
          <button
            onClick={() => { setStep("role"); setError(""); }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Rol se&#231;imine d&#246;n
          </button>

          {/* Rol g&#246;stergesi */}
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
              {role === "teacher" ? "Öğretmen Girişi" : "Öğrenci Girişi"}
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
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">&#350;ifre</Label>
              <Input
                id="password"
                type="password"
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Hesabın yok mu?{" "}
              <Link href={`/register${role === "teacher" ? "?role=teacher" : ""}`} className="font-semibold text-brand-dark hover:underline">
                Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
