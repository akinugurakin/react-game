"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus, Mail, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function CocukEklePage() {
  const [method, setMethod] = useState<"code" | "email" | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

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
            <h1 className="text-2xl font-extrabold text-[#042940]">Çocuk Ekle</h1>
            <p className="text-sm text-[#042940]/50">Çocuğunuzun hesabını bağlayın</p>
          </div>
        </div>

        {success ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#9FC131]/10">
                <UserPlus className="h-8 w-8 text-[#9FC131]" />
              </div>
              <h2 className="text-xl font-bold text-[#042940]">Davet Gönderildi!</h2>
              <p className="mt-2 text-sm text-[#042940]/50">
                Çocuğunuza davet gönderildi. Onay verdikten sonra hesabınıza bağlanacaktır.
              </p>
              <Button asChild className="mt-6 bg-[#005C53] hover:bg-[#005C53]/90">
                <Link href="/veli/cocuklar">Çocuklarıma Dön</Link>
              </Button>
            </CardContent>
          </Card>
        ) : !method ? (
          <div className="grid gap-4">
            <Card className="border-0 shadow-sm cursor-pointer transition-shadow hover:shadow-md" onClick={() => setMethod("code")}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#005C53]/10">
                  <Key className="h-6 w-6 text-[#005C53]" />
                </div>
                <div>
                  <p className="font-bold text-[#042940]">Davet Kodu ile</p>
                  <p className="text-sm text-[#042940]/50">Çocuğunuzun hesabındaki davet kodunu girin</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm cursor-pointer transition-shadow hover:shadow-md" onClick={() => setMethod("email")}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8634A]/10">
                  <Mail className="h-6 w-6 text-[#E8634A]" />
                </div>
                <div>
                  <p className="font-bold text-[#042940]">E-posta ile</p>
                  <p className="text-sm text-[#042940]/50">Çocuğunuzun kayıtlı e-postasını girin</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <button onClick={() => setMethod(null)} className="mb-4 flex items-center gap-1.5 text-sm text-[#042940]/50 hover:text-[#042940]">
                <ArrowLeft className="h-4 w-4" /> Geri
              </button>
              <form onSubmit={handleSubmit} className="space-y-4">
                {method === "code" ? (
                  <div className="space-y-2">
                    <Label>Davet Kodu</Label>
                    <Input placeholder="Örn: LUMO-AB12CD" required />
                    <p className="text-xs text-[#042940]/40">Çocuğunuzun hesap ayarlarından davet kodunu bulabilirsiniz.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Çocuğunuzun E-postası</Label>
                    <Input type="email" placeholder="cocuk@email.com" required />
                    <p className="text-xs text-[#042940]/40">Çocuğunuzun LUMO hesabına kayıtlı e-posta adresini girin.</p>
                  </div>
                )}
                <Button type="submit" className="w-full bg-[#005C53] hover:bg-[#005C53]/90">
                  Davet Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
