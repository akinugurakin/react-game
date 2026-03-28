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
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuthStore();
  const hydrated = useAuthHydrated();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    age: "",
    parent_email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const age = parseInt(formData.age) || 0;
  const needsParent = age > 0 && age < 13;

  // Giriş yapmışsa dashboard'a yönlendir
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
        age: parseInt(formData.age),
      };
      if (needsParent && formData.parent_email) {
        payload.parent_email = formData.parent_email;
      }

      const data = await api.post<RegisterResponse>("/auth/register", payload);
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
          <span className="text-2xl font-extrabold text-brand-dark">React Game</span>
        </Link>
        <h1 className="text-3xl font-extrabold">Kayıt Ol</h1>
        <p className="mt-2 text-muted-foreground">
          Yeni bir hesap oluştur ve oynamaya başla
        </p>
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
            name="email"
            type="email"
            placeholder="ornek@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Kullanıcı Adı</Label>
          <Input
            id="username"
            name="username"
            placeholder="oyuncu123"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Şifre</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Yaş</Label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="8"
            min={4}
            max={100}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {needsParent && (
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              13 yaş altı kullanıcılar için ebeveyn e-postası gereklidir.
            </p>
            <Label htmlFor="parent_email">Ebeveyn E-postası</Label>
            <Input
              id="parent_email"
              name="parent_email"
              type="email"
              placeholder="ebeveyn@email.com"
              value={formData.parent_email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
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
  );
}
