"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Avatarlar                                                          */
/* ------------------------------------------------------------------ */

const avatars = [
  { id: "avatar-1", src: "/avatars/avatar-1.png", label: "Karakter 1" },
  { id: "avatar-2", src: "/avatars/avatar-2.png", label: "Karakter 2" },
  { id: "avatar-3", src: "/avatars/avatar-3.png", label: "Karakter 3" },
  { id: "avatar-4", src: "/avatars/avatar-4.png", label: "Karakter 4" },
  { id: "avatar-5", src: "/avatars/avatar-5.png", label: "Karakter 5" },
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
  onSelect: (avatarUrl: string, bgColor: string) => void;
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
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    currentAvatar || null
  );
  const [selectedBg, setSelectedBg] = useState<string>(
    currentBgColor || "#DBEAFE"
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#042940]">
              Avatar Se&#231;
            </h2>
            <p className="text-sm text-[#042940]/50">
              Karakterini ve arka plan rengini se&#231;
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#042940]/40 transition-colors hover:bg-[#042940]/5 hover:text-[#042940]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* &#214;nizleme */}
          {selectedAvatar && (
            <div className="flex justify-center border-b bg-[#FAFAFA] py-6">
              <div
                className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full shadow-lg"
                style={{ backgroundColor: selectedBg }}
              >
                <img
                  src={selectedAvatar}
                  alt="Se&#231;ilen avatar"
                  className="h-32 w-32 -mb-4 object-cover object-top"
                />
              </div>
            </div>
          )}

          {/* Arka plan rengi */}
          <div className="border-b px-6 py-4">
            <p className="mb-3 text-sm font-bold text-[#042940]">
              Arka Plan Rengi
            </p>
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
                      <Check
                        className={cn(
                          "mx-auto h-4 w-4",
                          color.value === "#042940" ? "text-white" : "text-[#042940]"
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Avatar grid */}
          <div className="px-6 py-4">
            <p className="mb-3 text-sm font-bold text-[#042940]">
              Karakter Se&#231;
            </p>
            <div className="grid grid-cols-5 gap-3">
              {avatars.map((avatar) => {
                const isSelected = selectedAvatar === avatar.src;
                return (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.src)}
                    className={cn(
                      "group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-[#9FC131] ring-2 ring-[#9FC131]/30 scale-105"
                        : "border-transparent hover:border-[#042940]/10 hover:scale-105"
                    )}
                    style={{ backgroundColor: selectedBg }}
                  >
                    <img
                      src={avatar.src}
                      alt={avatar.label}
                      className="h-[115%] w-[115%] -mb-[15%] object-cover object-top"
                    />
                    {isSelected && (
                      <div className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#9FC131]">
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
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#042940]/20 text-[#042940]"
          >
            &#304;ptal
          </Button>
          <Button
            onClick={() => {
              if (selectedAvatar) {
                onSelect(selectedAvatar, selectedBg);
                onClose();
              }
            }}
            disabled={!selectedAvatar}
            className="bg-[#005C53] text-white hover:bg-[#005C53]/90 disabled:opacity-40"
          >
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}
