"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  50 benzersiz avatar - DiceBear "adventurer" stili                  */
/*  Cute, anime/ghibli tarz\u0131 ill\u00fcstrasyonlar                */
/* ------------------------------------------------------------------ */

const avatarSeeds = [
  // Karakterler - hayvanlar
  "totoro", "kiki", "ponyo", "haku", "chihiro",
  "satsuki", "mei", "howl", "sophie", "calcifer",
  "jiji", "mononoke", "ashitaka", "nausicaa", "laputa",
  // Hayvanlar
  "catbus", "kodama", "tanuki", "kitsune", "usagi",
  "tsubame", "sakana", "kuma", "shika", "fukuro",
  "kaeru", "cho", "ryu", "neko", "inu",
  // Doga
  "sakura", "momiji", "fuji", "umi", "sora",
  "hoshi", "tsuki", "kumo", "kaze", "yuki",
  // Fantezi
  "majo", "yurei", "oni", "tengu", "kappa",
  "yokai", "shinobi", "samurai", "geisha", "ronin",
  // Ekstra
  "hikari", "yume", "kokoro", "sensei", "gakusei",
];

const AVATAR_BASE = "https://api.dicebear.com/9.x/adventurer/svg";

function getAvatarUrl(seed: string): string {
  return `${AVATAR_BASE}?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=gradientLinear`;
}

type AvatarPickerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatarUrl: string) => void;
  currentAvatar?: string;
};

export function AvatarPicker({ isOpen, onClose, onSelect, currentAvatar }: AvatarPickerProps) {
  const [selected, setSelected] = useState<string | null>(currentAvatar || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#042940]">
              Avatar Se&#231;
            </h2>
            <p className="text-sm text-[#042940]/50">
              Profilini ki&#351;iselle&#351;tir
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#042940]/40 transition-colors hover:bg-[#042940]/5 hover:text-[#042940]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-3">
            {avatarSeeds.map((seed) => {
              const url = getAvatarUrl(seed);
              const isSelected = selected === url;
              return (
                <button
                  key={seed}
                  onClick={() => setSelected(url)}
                  className={cn(
                    "group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-200",
                    isSelected
                      ? "border-[#9FC131] ring-2 ring-[#9FC131]/30 scale-105"
                      : "border-transparent hover:border-[#042940]/10 hover:scale-105"
                  )}
                >
                  <img
                    src={url}
                    alt={seed}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#9FC131]/20">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#9FC131]">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#042940]/20 text-[#042940]"
          >
            &#304;ptal
          </Button>
          <Button
            onClick={() => {
              if (selected) {
                onSelect(selected);
                onClose();
              }
            }}
            disabled={!selected}
            className="bg-[#005C53] text-white hover:bg-[#005C53]/90 disabled:opacity-40"
          >
            Se&#231;
          </Button>
        </div>
      </div>
    </div>
  );
}
