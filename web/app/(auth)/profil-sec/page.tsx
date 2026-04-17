"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, Shield, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore, useAuthHydrated, type StudentProfile } from "@/lib/auth";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

// Avatar emoji haritası
const AVATAR_EMOJIS: Record<string, string> = {
  avatar_1: "🦁", avatar_2: "🐯", avatar_3: "🦊", avatar_4: "🐧",
  avatar_5: "🦋", avatar_6: "🐬", avatar_7: "🦄", avatar_8: "🐸",
  avatar_9: "🐼", avatar_10: "🦉", avatar_11: "🐙", avatar_12: "🦕",
};

type SelectedProfile =
  | { type: "parent" }
  | { type: "student"; student: StudentProfile };

export default function ProfileSelectPage() {
  const router = useRouter();
  const { isAuthenticated, parent, accessToken, setStudentSession, setSubscriptionStatus } = useAuthStore();
  const hydrated = useAuthHydrated();

  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<SelectedProfile | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;
    api.get<StudentProfile[]>("/students", accessToken)
      .then(setStudents)
      .catch(() => setStudents([]))
      .finally(() => setLoadingStudents(false));
  }, [isAuthenticated, accessToken]);

  const handleProfileClick = (profile: SelectedProfile) => {
    setSelectedProfile(profile);
    setPin("");
    setError("");
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (selectedProfile?.type === "parent") {
        // Abonelik durumunu çek ve store'a kaydet
        try {
          interface SubStatus { is_active: boolean }
          const sub = await api.get<SubStatus | null>("/payments/subscription", accessToken ?? undefined);
          setSubscriptionStatus(sub?.is_active ?? false);
        } catch {
          setSubscriptionStatus(false);
        }
        router.push("/veli");
        return;
      }

      if (selectedProfile?.type === "student") {
        interface StudentLoginResponse {
          student_session_token: string;
          student: StudentProfile;
        }
        const data = await api.post<StudentLoginResponse>(
          "/auth/student/login",
          { student_id: selectedProfile.student.id, pin },
          accessToken ?? undefined
        );
        setStudentSession(data.student, data.student_session_token);
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş yapılamadı.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedProfile(null);
    setPin("");
    setError("");
  };

  const selectedStudentName =
    selectedProfile?.type === "student"
      ? selectedProfile.student.first_name
      : "Veli Paneli";

  const selectedStudentAvatar =
    selectedProfile?.type === "student"
      ? AVATAR_EMOJIS[selectedProfile.student.avatar] ?? "🦁"
      : null;

  if (!hydrated || !isAuthenticated) return null;

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-10 w-10 text-brand-dark" />
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">LUMO</span>
            <p className="text-[9px] font-normal text-brand-dark/40">Eğitsel Oyun Platformu</p>
          </div>
        </Link>
      </div>

      {!selectedProfile ? (
        /* ─── Profil Seçimi ─── */
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-[#042940]">Kim oynuyor?</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Devam etmek için bir profil seçin
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Veli profili */}
            <button
              onClick={() => handleProfileClick({ type: "parent" })}
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#042940]/5 shadow-md transition-all group-hover:shadow-lg group-hover:bg-[#042940]/10">
                <Shield className="h-10 w-10 text-[#042940]" />
              </div>
              <span className="text-sm font-semibold text-[#042940]">Veli Paneli</span>
            </button>

            {/* Öğrenci profilleri */}
            {loadingStudents ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-24 w-24 animate-pulse rounded-2xl bg-gray-100" />
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-100" />
                </div>
              ))
            ) : (
              students.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleProfileClick({ type: "student", student })}
                  className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
                >
                  <div
                    className={cn(
                      "flex h-24 w-24 items-center justify-center rounded-2xl bg-white text-4xl shadow-md",
                      "transition-all group-hover:shadow-lg group-hover:scale-105"
                    )}
                  >
                    {AVATAR_EMOJIS[student.avatar] ?? "🦁"}
                  </div>
                  <span className="text-sm font-semibold text-[#042940]">
                    {student.first_name}
                  </span>
                </button>
              ))
            )}

            {/* Profil Ekle */}
            <button
              onClick={() => router.push("/veli/cocuklar/ekle")}
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 transition-all group-hover:border-[#005C53] group-hover:bg-[#005C53]/5">
                <Plus className="h-8 w-8 text-gray-400 group-hover:text-[#005C53]" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground group-hover:text-[#042940]">
                Profil Ekle
              </span>
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Hoş geldin, {parent?.first_name}
          </p>
        </div>
      ) : (
        /* ─── PIN Girişi ─── */
        <div className="mx-auto max-w-sm space-y-6">
          <button
            onClick={handleBack}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Profil seçimine dön
          </button>

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">
              {selectedProfile.type === "parent" ? (
                <Shield className="h-9 w-9 text-[#042940]" />
              ) : (
                <span>{selectedStudentAvatar}</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-[#042940]">{selectedStudentName}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedProfile.type === "parent"
                ? "Veli paneline erişmek için PIN girin"
                : "Devam etmek için PIN girin"}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            <Input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="● ● ● ●"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="text-center text-2xl tracking-[0.5em] font-mono"
              autoFocus
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading || (selectedProfile.type === "student" && pin.length < 4)}
            >
              {loading ? "Doğrulanıyor..." : "Giriş"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
