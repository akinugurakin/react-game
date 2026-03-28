"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, useAuthHydrated } from "@/lib/auth";
import { api } from "@/lib/api";

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
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuthStore();
  const hydrated = useAuthHydrated();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Giriş yapmışsa dashboard'a yönlendir
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
      setAuth(data.user, data.access_token, data.refresh_token);
      router.push("/dashboard");
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
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Gamepad2 className="h-10 w-10 text-brand-dark" />
          <span className="text-2xl font-extrabold text-brand-dark">LUMO</span>
        </Link>
        <h1 className="text-3xl font-extrabold">Giriş Yap</h1>
        <p className="mt-2 text-muted-foreground">
          Hesabına giriş yap ve oynamaya başla
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-background p-8 shadow-sm">
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
          <Label htmlFor="password">Şifre</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••"
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
          <Link href="/register" className="font-semibold text-brand-dark hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </form>
    </div>
  );
}
