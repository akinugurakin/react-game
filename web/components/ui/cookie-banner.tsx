"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings2, Check } from "lucide-react";

const COOKIE_CONSENT_KEY = "lumo-cookie-consent";

interface CookiePreferences {
  necessary: boolean; // her zaman true
  analytics: boolean;
  functional: boolean;
}

function getStoredConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function saveConsent(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      // İlk ziyaret — banner göster
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      functional: true,
    };
    saveConsent(allAccepted);
    setVisible(false);
  };

  const handleRejectOptional = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      functional: false,
    };
    saveConsent(onlyNecessary);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent({ ...preferences, necessary: true });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#042940]/10 bg-white shadow-2xl shadow-black/10">
            {/* Ana Banner */}
            <div className="p-5 sm:p-6">
              {/* Başlık */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DBF227]/30">
                    <Cookie className="h-5 w-5 text-[#042940]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#042940]">
                      Çerez Tercihleriniz
                    </h3>
                    <p className="mt-0.5 text-xs text-[#042940]/40">
                      KVKK ve 5809 sayılı Kanun uyarınca
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRejectOptional}
                  className="rounded-lg p-1.5 text-[#042940]/30 transition-colors hover:bg-[#042940]/5 hover:text-[#042940]/60"
                  aria-label="Kapat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Açıklama */}
              <p className="mt-4 text-sm leading-relaxed text-[#042940]/60">
                LUMO olarak platformumuzun düzgün çalışması için zorunlu çerezler
                kullanıyoruz. İsteğe bağlı çerezleri yalnızca onayınızla
                etkinleştiriyoruz.{" "}
                <Link
                  href="/gizlilik-politikasi/cerez-politikasi"
                  className="font-medium text-[#005C53] underline underline-offset-2"
                >
                  Çerez Politikası
                </Link>
              </p>

              {/* Detay Paneli */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 rounded-xl bg-[#042940]/[0.03] p-4">
                      {/* Zorunlu */}
                      <CookieToggle
                        label="Zorunlu Çerezler"
                        description="Oturum yönetimi ve güvenlik için gereklidir. Kapatılamaz."
                        checked={true}
                        disabled={true}
                      />
                      {/* Fonksiyonel */}
                      <CookieToggle
                        label="Fonksiyonel Çerezler"
                        description="Dil tercihi ve tema ayarlarını hatırlar."
                        checked={preferences.functional}
                        onChange={(v) =>
                          setPreferences((p) => ({ ...p, functional: v }))
                        }
                      />
                      {/* Analitik */}
                      <CookieToggle
                        label="Analitik Çerezler"
                        description="Platformu nasıl geliştireceğimizi anlamamıza yardımcı olur. Kişisel profil oluşturmaz."
                        checked={preferences.analytics}
                        onChange={(v) =>
                          setPreferences((p) => ({ ...p, analytics: v }))
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Butonlar */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#042940]/50 transition-colors hover:text-[#005C53]"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  {showDetails ? "Detayları Gizle" : "Çerez Ayarları"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleRejectOptional}
                    className="rounded-xl border border-[#042940]/10 px-4 py-2.5 text-sm font-semibold text-[#042940]/60 transition-colors hover:border-[#042940]/20 hover:text-[#042940]"
                  >
                    Sadece Zorunlu
                  </button>

                  {showDetails ? (
                    <button
                      onClick={handleSavePreferences}
                      className="flex items-center gap-1.5 rounded-xl bg-[#005C53] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005C53]/90"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Seçimi Kaydet
                    </button>
                  ) : (
                    <button
                      onClick={handleAcceptAll}
                      className="rounded-xl bg-[#005C53] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005C53]/90"
                    >
                      Tümünü Kabul Et
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  TOGGLE SWITCH                                                      */
/* ------------------------------------------------------------------ */

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-[#042940]">{label}</p>
        <p className="mt-0.5 text-xs text-[#042940]/45">{description}</p>
      </div>
      <button
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#005C53]" : "bg-[#042940]/15"
        } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        aria-label={`${label} ${checked ? "açık" : "kapalı"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
