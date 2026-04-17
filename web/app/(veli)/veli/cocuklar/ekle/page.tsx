"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const AVATARS = [
  { id: "avatar_1", emoji: "🦁" }, { id: "avatar_2", emoji: "🐯" },
  { id: "avatar_3", emoji: "🦊" }, { id: "avatar_4", emoji: "🐧" },
  { id: "avatar_5", emoji: "🦋" }, { id: "avatar_6", emoji: "🐬" },
  { id: "avatar_7", emoji: "🦄" }, { id: "avatar_8", emoji: "🐸" },
  { id: "avatar_9", emoji: "🐼" }, { id: "avatar_10", emoji: "🦉" },
  { id: "avatar_11", emoji: "🐙" }, { id: "avatar_12", emoji: "🦕" },
];

const CLASS_LEVELS = [1, 2, 3, 4, 5, 6];

export default function CocukEklePage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    avatar: "avatar_1",
    pin: "",
    pin_confirm: "",
    class_level: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.pin.length < 4) {
      setError("PIN en az 4 haneli olmalıdır.");
      return;
    }
    if (form.pin !== form.pin_confirm) {
      setError("PIN'ler eşleşmiyor.");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/students",
        {
          first_name: form.first_name,
          last_name: form.last_name,
          avatar: form.avatar,
          pin: form.pin,
          class_level: form.class_level,
        },
        accessToken ?? undefined
      );
      setSuccess(true);
      setTimeout(() => router.push("/veli/cocuklar"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container max-w-lg py-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#9FC131]/10">
              <Check className="h-8 w-8 text-[#9FC131]" />
            </div>
            <h2 className="text-xl font-bold text-[#042940]">Profil Oluşturuldu!</h2>
            <p className="mt-2 text-sm text-[#042940]/50">
              {form.first_name} için profil hazır. Yönlendiriliyorsunuz...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-lg py-8">
      <Link href="/veli/cocuklar" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#042940]/50 hover:text-[#042940]">
        <ArrowLeft className="h-4 w-4" /> Çocuklarıma Dön
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8634A]/10">
            <UserPlus className="h-6 w-6 text-[#E8634A]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#042940]">Yeni Profil</h1>
            <p className="text-sm text-[#042940]/50">Çocuğunuz için profil oluşturun</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}

          {/* Ad Soyad */}
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="first_name">Ad</Label>
              <Input
                id="first_name"
                placeholder="Ali"
                value={form.first_name}
                onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                required
                maxLength={100}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="last_name">Soyad</Label>
              <Input
                id="last_name"
                placeholder="Yılmaz"
                value={form.last_name}
                onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                required
                maxLength={100}
              />
            </div>
          </div>

          {/* Sınıf */}
          <div className="space-y-2">
            <Label>Sınıf</Label>
            <div className="flex gap-2">
              {CLASS_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, class_level: lvl }))}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all",
                    form.class_level === lvl
                      ? "bg-[#005C53] text-white"
                      : "bg-gray-100 text-[#042940]/50 hover:bg-gray-200"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, avatar: av.id }))}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all",
                    form.avatar === av.id
                      ? "bg-[#005C53]/15 ring-2 ring-[#005C53]"
                      : "bg-gray-50 hover:bg-gray-100"
                  )}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* PIN */}
          <div className="space-y-3">
            <Label>PIN (4-6 rakam)</Label>
            <p className="text-xs text-[#042940]/50">
              Çocuğunuz bu PIN ile profil seçim ekranından giriş yapacak.
            </p>
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <Input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="PIN"
                  value={form.pin}
                  onChange={(e) => setForm((f) => ({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                  required
                  minLength={4}
                  maxLength={6}
                  className="text-center text-xl tracking-[0.4em] font-mono"
                />
              </div>
              <div className="flex-1 space-y-1">
                <Input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="PIN Tekrar"
                  value={form.pin_confirm}
                  onChange={(e) => setForm((f) => ({ ...f, pin_confirm: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                  required
                  minLength={4}
                  maxLength={6}
                  className="text-center text-xl tracking-[0.4em] font-mono"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#005C53] py-6 text-base font-bold hover:bg-[#005C53]/90"
            size="lg"
            disabled={loading}
          >
            {loading ? "Oluşturuluyor..." : "Profil Oluştur"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
