"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BeanHead } from "beanheads";
import type { AvatarProps } from "beanheads";

/* ------------------------------------------------------------------ */
/*  50 \u00f6nceden tan\u0131ml\u0131 Beanheads avatar                */
/*  A\u011f\u0131rl\u0131kl\u0131 olarak a\u00e7\u0131k ten tonlar\u0131 */
/* ------------------------------------------------------------------ */

type AvatarConfig = AvatarProps & { id: string };

const avatarConfigs: AvatarConfig[] = [
  // ── K\u0131z karakterler (a\u00e7\u0131k ten) ──
  { id: "g1", skinTone: "light", hair: "long", hairColor: "brown", eyes: "happy", mouth: "openSmile", clothing: "dress", clothingColor: "red", body: "breasts", lashes: true },
  { id: "g2", skinTone: "light", hair: "bun", hairColor: "blonde", eyes: "content", mouth: "lips", lipColor: "pink", clothing: "vneck", clothingColor: "blue", body: "breasts", lashes: true },
  { id: "g3", skinTone: "yellow", hair: "pixie", hairColor: "black", eyes: "normal", mouth: "grin", clothing: "shirt", clothingColor: "green", body: "breasts", lashes: true },
  { id: "g4", skinTone: "light", hair: "bob", hairColor: "orange", eyes: "wink", mouth: "openSmile", clothing: "dress", clothingColor: "blue", body: "breasts", lashes: true },
  { id: "g5", skinTone: "yellow", hair: "long", hairColor: "brown", eyes: "squint", mouth: "lips", lipColor: "red", clothing: "tankTop", clothingColor: "red", body: "breasts", lashes: true },
  { id: "g6", skinTone: "light", hair: "pixie", hairColor: "pink", eyes: "heart", mouth: "openSmile", clothing: "shirt", clothingColor: "white", body: "breasts", lashes: true },
  { id: "g7", skinTone: "red", hair: "long", hairColor: "black", eyes: "normal", mouth: "grin", clothing: "dress", clothingColor: "green", body: "breasts", lashes: true },
  { id: "g8", skinTone: "light", hair: "bob", hairColor: "blue", eyes: "happy", mouth: "tongue", clothing: "vneck", clothingColor: "white", body: "breasts", lashes: true },
  { id: "g9", skinTone: "yellow", hair: "bun", hairColor: "brown", eyes: "content", mouth: "openSmile", clothing: "dressShirt", clothingColor: "blue", body: "breasts", lashes: true },
  { id: "g10", skinTone: "light", hair: "long", hairColor: "blonde", eyes: "normal", mouth: "lips", lipColor: "purple", clothing: "dress", clothingColor: "red", body: "breasts", lashes: true },
  { id: "g11", skinTone: "light", hair: "pixie", hairColor: "brown", eyes: "wink", mouth: "grin", clothing: "shirt", clothingColor: "red", body: "breasts", lashes: true, accessory: "roundGlasses" },
  { id: "g12", skinTone: "yellow", hair: "bob", hairColor: "black", eyes: "happy", mouth: "openSmile", clothing: "tankTop", clothingColor: "green", body: "breasts", lashes: true },

  // ── Erkek karakterler (a\u00e7\u0131k ten) ──
  { id: "b1", skinTone: "light", hair: "short", hairColor: "brown", eyes: "normal", mouth: "grin", clothing: "shirt", clothingColor: "blue", body: "chest" },
  { id: "b2", skinTone: "light", hair: "buzz", hairColor: "black", eyes: "happy", mouth: "openSmile", clothing: "dressShirt", clothingColor: "white", body: "chest" },
  { id: "b3", skinTone: "yellow", hair: "short", hairColor: "blonde", eyes: "squint", mouth: "serious", clothing: "vneck", clothingColor: "green", body: "chest" },
  { id: "b4", skinTone: "light", hair: "short", hairColor: "orange", eyes: "normal", mouth: "grin", clothing: "shirt", clothingColor: "red", body: "chest", accessory: "roundGlasses" },
  { id: "b5", skinTone: "yellow", hair: "buzz", hairColor: "brown", eyes: "content", mouth: "openSmile", clothing: "tankTop", clothingColor: "blue", body: "chest" },
  { id: "b6", skinTone: "light", hair: "short", hairColor: "black", eyes: "happy", mouth: "tongue", clothing: "shirt", clothingColor: "white", body: "chest" },
  { id: "b7", skinTone: "red", hair: "short", hairColor: "brown", eyes: "normal", mouth: "grin", clothing: "dressShirt", clothingColor: "blue", body: "chest", facialHair: "stubble" },
  { id: "b8", skinTone: "light", hair: "buzz", hairColor: "blonde", eyes: "wink", mouth: "openSmile", clothing: "vneck", clothingColor: "red", body: "chest" },
  { id: "b9", skinTone: "yellow", hair: "short", hairColor: "black", eyes: "leftTwitch", mouth: "open", clothing: "shirt", clothingColor: "green", body: "chest" },
  { id: "b10", skinTone: "light", hair: "short", hairColor: "brown", eyes: "happy", mouth: "grin", clothing: "tankTop", clothingColor: "white", body: "chest" },
  { id: "b11", skinTone: "light", hair: "buzz", hairColor: "brown", eyes: "normal", mouth: "openSmile", clothing: "shirt", clothingColor: "blue", body: "chest", accessory: "tinyGlasses" },
  { id: "b12", skinTone: "yellow", hair: "short", hairColor: "orange", eyes: "content", mouth: "grin", clothing: "dressShirt", clothingColor: "green", body: "chest" },

  // ── \u015Eapkal\u0131 / aksesuarl\u0131 karakterler ──
  { id: "h1", skinTone: "light", hair: "none", hat: "beanie", hatColor: "red", eyes: "happy", mouth: "grin", clothing: "shirt", clothingColor: "blue", body: "chest" },
  { id: "h2", skinTone: "yellow", hair: "none", hat: "turban", hatColor: "blue", eyes: "normal", mouth: "openSmile", clothing: "dressShirt", clothingColor: "white", body: "chest" },
  { id: "h3", skinTone: "light", hair: "long", hairColor: "blonde", eyes: "content", mouth: "lips", lipColor: "pink", clothing: "dress", clothingColor: "green", body: "breasts", lashes: true, accessory: "shades" },
  { id: "h4", skinTone: "light", hair: "none", hat: "beanie", hatColor: "green", eyes: "squint", mouth: "serious", clothing: "vneck", clothingColor: "black", body: "chest" },
  { id: "h5", skinTone: "yellow", hair: "bob", hairColor: "brown", eyes: "happy", mouth: "openSmile", clothing: "shirt", clothingColor: "red", body: "breasts", lashes: true, accessory: "roundGlasses" },

  // ── Farkl\u0131 sa\u00e7 renkleri ──
  { id: "c1", skinTone: "light", hair: "long", hairColor: "white", eyes: "normal", mouth: "lips", lipColor: "turqoise", clothing: "dress", clothingColor: "white", body: "breasts", lashes: true },
  { id: "c2", skinTone: "light", hair: "pixie", hairColor: "blue", eyes: "happy", mouth: "grin", clothing: "shirt", clothingColor: "blue", body: "chest" },
  { id: "c3", skinTone: "yellow", hair: "short", hairColor: "pink", eyes: "heart", mouth: "tongue", clothing: "tankTop", clothingColor: "red", body: "chest" },
  { id: "c4", skinTone: "light", hair: "bob", hairColor: "white", eyes: "wink", mouth: "openSmile", clothing: "vneck", clothingColor: "green", body: "breasts", lashes: true },

  // ── Koyu ten (az say\u0131da) ──
  { id: "d1", skinTone: "brown", hair: "short", hairColor: "black", eyes: "happy", mouth: "grin", clothing: "shirt", clothingColor: "blue", body: "chest" },
  { id: "d2", skinTone: "brown", hair: "long", hairColor: "black", eyes: "normal", mouth: "openSmile", clothing: "dress", clothingColor: "red", body: "breasts", lashes: true },
  { id: "d3", skinTone: "dark", hair: "buzz", hairColor: "black", eyes: "content", mouth: "openSmile", clothing: "dressShirt", clothingColor: "white", body: "chest" },

  // ── E\u011flenceli karakterler ──
  { id: "f1", skinTone: "light", hair: "balding", hairColor: "white", eyes: "dizzy", mouth: "open", clothing: "dressShirt", clothingColor: "white", body: "chest", accessory: "tinyGlasses" },
  { id: "f2", skinTone: "yellow", hair: "short", hairColor: "brown", eyes: "dizzy", mouth: "sad", clothing: "shirt", clothingColor: "blue", body: "chest" },
  { id: "f3", skinTone: "light", hair: "long", hairColor: "pink", eyes: "heart", mouth: "tongue", clothing: "tankTop", clothingColor: "red", body: "breasts", lashes: true },
  { id: "f4", skinTone: "light", hair: "buzz", hairColor: "blonde", eyes: "simple", mouth: "tongue", clothing: "shirt", clothingColor: "green", body: "chest" },
  { id: "f5", skinTone: "yellow", hair: "bob", hairColor: "orange", eyes: "wink", mouth: "grin", clothing: "vneck", clothingColor: "blue", body: "breasts", lashes: true },
  { id: "f6", skinTone: "light", hair: "short", hairColor: "black", eyes: "squint", mouth: "serious", clothing: "dressShirt", clothingColor: "black", body: "chest", facialHair: "mediumBeard" },

  // ── Ekstra \u00e7e\u015fitlilik ──
  { id: "e1", skinTone: "red", hair: "pixie", hairColor: "brown", eyes: "normal", mouth: "openSmile", clothing: "shirt", clothingColor: "white", body: "breasts", lashes: true },
  { id: "e2", skinTone: "light", hair: "short", hairColor: "brown", eyes: "content", mouth: "grin", clothing: "shirt", clothingColor: "red", body: "chest", hat: "beanie", hatColor: "blue" },
  { id: "e3", skinTone: "yellow", hair: "long", hairColor: "blonde", eyes: "happy", mouth: "openSmile", clothing: "dress", clothingColor: "blue", body: "breasts", lashes: true, hat: "none" },
  { id: "e4", skinTone: "light", hair: "afro", hairColor: "brown", eyes: "happy", mouth: "grin", clothing: "shirt", clothingColor: "green", body: "chest" },
  { id: "e5", skinTone: "light", hair: "afro", hairColor: "black", eyes: "normal", mouth: "openSmile", clothing: "vneck", clothingColor: "red", body: "breasts", lashes: true },
  { id: "e6", skinTone: "yellow", hair: "balding", hairColor: "brown", eyes: "normal", mouth: "grin", clothing: "dressShirt", clothingColor: "blue", body: "chest", accessory: "roundGlasses" },
];

/* ------------------------------------------------------------------ */
/*  Arka plan renkleri                                                 */
/* ------------------------------------------------------------------ */

const bgColors = [
  { name: "Buz Mavisi", value: "#DBEAFE" },
  { name: "Lavanta", value: "#E9D5FF" },
  { name: "G\u00fcl", value: "#FECDD3" },
  { name: "Seftali", value: "#FED7AA" },
  { name: "Limon", value: "#FEF08A" },
  { name: "Nane", value: "#A7F3D0" },
  { name: "G\u00f6ky\u00fcz\u00fc", value: "#BAE6FD" },
  { name: "Leylak", value: "#DDD6FE" },
  { name: "Teal", value: "#99F6E4" },
  { name: "Lime", value: "#D9F99D" },
  { name: "Mercan", value: "#FECACA" },
  { name: "Amber", value: "#FDE68A" },
  { name: "Krem", value: "#F5F4EF" },
  { name: "Gri", value: "#E5E7EB" },
  { name: "Beyaz", value: "#FFFFFF" },
  { name: "Koyu", value: "#042940" },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

type AvatarPickerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatarId: string, bgColor: string) => void;
  currentAvatar?: string;
  currentBgColor?: string;
};

export function AvatarPicker({
  isOpen,
  onClose,
  onSelect,
  currentAvatar,
  currentBgColor,
}: AvatarPickerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    currentAvatar || null
  );
  const [selectedBg, setSelectedBg] = useState<string>(
    currentBgColor || "#DBEAFE"
  );

  if (!isOpen) return null;

  const selectedConfig = avatarConfigs.find((a) => a.id === selectedId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative mx-4 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#042940]">Avatar Se&#231;</h2>
            <p className="text-sm text-[#042940]/50">Karakterini ve rengini se&#231;</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-[#042940]/40 hover:bg-[#042940]/5 hover:text-[#042940]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* &#214;nizleme */}
          <div className="flex justify-center border-b bg-[#FAFAFA] py-6">
            <div
              className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full shadow-lg"
              style={{ backgroundColor: selectedBg }}
            >
              {selectedConfig ? (
                <BeanHead
                  {...selectedConfig}
                  mask={false}
                  faceMask={false}
                />
              ) : (
                <span className="text-3xl text-[#042940]/20">?</span>
              )}
            </div>
          </div>

          {/* Arka plan rengi */}
          <div className="border-b px-6 py-4">
            <p className="mb-3 text-sm font-bold text-[#042940]">Arka Plan Rengi</p>
            <div className="flex flex-wrap gap-2">
              {bgColors.map((color) => {
                const isSelected = selectedBg === color.value;
                return (
                  <button
                    key={color.value}
                    onClick={() => setSelectedBg(color.value)}
                    title={color.name}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      isSelected
                        ? "scale-110 border-[#9FC131] ring-2 ring-[#9FC131]/30"
                        : "border-gray-200 hover:scale-110 hover:border-gray-300"
                    )}
                    style={{ backgroundColor: color.value }}
                  >
                    {isSelected && (
                      <Check className={cn("mx-auto h-4 w-4", color.value === "#042940" ? "text-white" : "text-[#042940]")} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Avatar grid */}
          <div className="px-6 py-4">
            <p className="mb-3 text-sm font-bold text-[#042940]">Karakter Se&#231;</p>
            <div className="grid grid-cols-6 gap-2.5 sm:grid-cols-8">
              {avatarConfigs.map((config) => {
                const isSelected = selectedId === config.id;
                return (
                  <button
                    key={config.id}
                    onClick={() => setSelectedId(config.id)}
                    className={cn(
                      "relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-2 p-0.5 transition-all duration-200",
                      isSelected
                        ? "border-[#9FC131] ring-2 ring-[#9FC131]/30 scale-105"
                        : "border-transparent hover:border-[#042940]/10 hover:scale-105"
                    )}
                    style={{ backgroundColor: selectedBg }}
                  >
                    <BeanHead
                      {...config}
                      mask={false}
                      faceMask={false}
                    />
                    {isSelected && (
                      <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#9FC131]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <Button variant="outline" onClick={onClose} className="border-[#042940]/20 text-[#042940]">
            &#304;ptal
          </Button>
          <Button
            onClick={() => {
              if (selectedId) {
                onSelect(selectedId, selectedBg);
                onClose();
              }
            }}
            disabled={!selectedId}
            className="bg-[#005C53] text-white hover:bg-[#005C53]/90 disabled:opacity-40"
          >
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar i\u00e7in mini avatar renderlay\u0131c\u0131               */
/* ------------------------------------------------------------------ */

export function BeanHeadAvatar({ avatarId, size = 36 }: { avatarId: string; size?: number }) {
  const config = avatarConfigs.find((a) => a.id === avatarId);
  if (!config) return null;
  return (
    <div style={{ width: size, height: size }}>
      <BeanHead {...config} mask={false} faceMask={false} />
    </div>
  );
}
