"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Minus, Send, Bot, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickQuestion {
  label: string;
  answer: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    label: "LUMO nedir?",
    answer:
      "LUMO, 3-8. sınıf öğrencileri için MEB müfredatına uygun eğitsel oyunlar sunan bir platformdur. Rozetler, puanlar ve liderlik tablosuyla öğrenmeyi eğlenceli hale getiriyoruz. Güvenli, reklamsız ve tamamen çocuk odaklı bir ortam sunuyoruz.",
  },
  {
    label: "Hangi derslerde oyunlar var?",
    answer:
      "Platformumuzda 5 ana ders kategorisinde 20'den fazla oyun bulunuyor: Matematik (Matematik Yarışması, Kesir Ustası, Bulmaca Dünyası), Türkçe (Kelime Avı, Hafıza Kartları, Cümle Kurma), Fen Bilimleri (Atom Keşfi, Canlılar Alemi, Deney Labı), Sosyal Bilgiler (Tarih Yolculuğu, Harita Ustası) ve İngilizce (Vocabulary Builder, Grammar Quest). Tüm oyunlar MEB kazanımlarına uygun olarak tasarlanmıştır.",
  },
  {
    label: "Ücretsiz deneme nasıl çalışır?",
    answer:
      "7 gün boyunca tüm oyunlara ücretsiz erişim sağlayabilirsiniz. Kredi kartı bilgisi gerekmez ve deneme süresi bittiğinde onayınız olmadan ücretlendirme yapılmaz.",
  },
  {
    label: "Kardeş paketi nedir?",
    answer:
      "Kardeş paketimizle birden fazla çocuğunuzu uygun fiyatla platforma ekleyebilirsiniz. 1. çocuk tam fiyat, 2. çocuk %50 indirimli, 3. çocuk %75 indirimli! Her çocuğun kendi profili, ilerlemesi, rozetleri ve liderlik tablosu sıralaması ayrıdır.",
  },
  {
    label: "Hangi sınıf seviyelerine uygun oyunlar var?",
    answer:
      "LUMO, 3. sınıftan 8. sınıfa kadar (6-14 yaş) tüm seviyeleri desteklemektedir. Her oyun, sınıf seviyesine göre MEB kazanımlarına uygun zorluk derecesiyle tasarlanmıştır. Çocuğunuz kendi sınıfını seçerek seviyesine uygun oyunlara erişebilir.",
  },
  {
    label: "Veliler ilerlemeyi nasıl takip eder?",
    answer:
      "Veli panelinden çocuğunuzun oynadığı oyunları, puanlarını ve ders bazlı ilerlemesini görebilirsiniz. Günlük ekran süresi limiti (30-240 dk) belirleyebilir, haftalık ve aylık ilerleme raporlarını indirebilirsiniz. Birden fazla çocuğu tek hesaptan yönetmek de mümkün.",
  },
  {
    label: "Öğretmen panelinde neler var?",
    answer:
      "Öğretmenler sınıflarını oluşturup öğrencilerini ekleyebilir, oyun atayabilir ve kazanım bazlı istatistikleri takip edebilir. Tema, alan becerisi ve kavramsal beceri bazında detaylı performans raporları, sınıf liderlik tablosu ve öğrenci aktivite takibi mevcuttur.",
  },
  {
    label: "Güvenlik nasıl sağlanıyor?",
    answer:
      "LUMO tamamen reklamsız ve güvenli bir platformdur. KVKK'ya tam uyumlu çalışıyoruz, veriler şifreli olarak saklanır ve üçüncü taraflarla paylaşılmaz. Öğrenciler arası mesajlaşma yoktur. 13 yaş altı kullanıcılar için veli onayı zorunludur.",
  },
];

const botGreeting: Message = {
  id: "greeting",
  text: "Merhaba! 👋 Ben LUMO asistanı. Size nasıl yardımcı olabilirim? Aşağıdaki sorulardan birini seçebilir veya kendi sorunuzu yazabilirsiniz.",
  sender: "bot",
  timestamp: new Date(),
};

function findAnswer(input: string): string {
  const lower = input.toLowerCase();

  const keywords: { keys: string[]; answer: string }[] = [
    {
      keys: ["lumo", "nedir", "ne işe yarar", "platform"],
      answer: quickQuestions[0].answer,
    },
    {
      keys: ["ders", "konu", "müfredat", "branş", "oyun", "matematik", "türkçe", "fen", "sosyal", "ingilizce"],
      answer: quickQuestions[1].answer,
    },
    {
      keys: ["ücretsiz", "deneme", "bedava", "free", "trial", "deniyim"],
      answer: quickQuestions[2].answer,
    },
    {
      keys: ["kardeş", "indirim", "ikinci çocuk", "çocuk ekle"],
      answer: quickQuestions[3].answer,
    },
    {
      keys: ["sınıf", "seviye", "yaş", "kaçıncı", "uygun"],
      answer: quickQuestions[4].answer,
    },
    {
      keys: ["veli", "ebeveyn", "takip", "ilerleme", "rapor", "ekran süresi", "limit"],
      answer: quickQuestions[5].answer,
    },
    {
      keys: ["öğretmen", "sınıf yönet", "öğrenci ekle", "atama", "kazanım", "panel"],
      answer: quickQuestions[6].answer,
    },
    {
      keys: ["güvenlik", "gizlilik", "kvkk", "reklam", "veri", "güvenli"],
      answer: quickQuestions[7].answer,
    },
    {
      keys: ["fiyat", "ücret", "abonelik", "paket", "plan", "aylık", "yıllık"],
      answer:
        "Aylık (450 ₺/ay) ve yıllık (300 ₺/ay, %33 tasarruf) abonelik seçeneklerimiz var. Yıllık planda öncelikli oyun erişimi, aylık ilerleme raporları ve özel rozetler de dahildir. Ayrıca kardeş paketi ve burs paketi seçeneklerimiz de mevcut!",
    },
    {
      keys: ["merhaba", "selam", "hey", "hi", "hello"],
      answer:
        "Merhaba! Size nasıl yardımcı olabilirim? Aşağıdaki hızlı sorulardan birini seçebilir veya kendi sorunuzu yazabilirsiniz.",
    },
    {
      keys: ["teşekkür", "sağol", "eyvallah", "thanks"],
      answer:
        "Rica ederim! Başka bir sorunuz olursa çekinmeden sorabilirsiniz. 😊",
    },
    {
      keys: ["iletişim", "destek", "mail", "e-posta", "telefon"],
      answer:
        "Bizimle iletişime geçmek için info@lumo.com.tr adresine e-posta gönderebilirsiniz. En kısa sürede size dönüş yapacağız.",
    },
  ];

  for (const entry of keywords) {
    if (entry.keys.some((key) => lower.includes(key))) {
      return entry.answer;
    }
  }

  return "Bu konuda size yardımcı olamıyorum, ancak info@lumo.com.tr adresine yazarak detaylı bilgi alabilirsiniz. Başka bir sorunuz var mı?";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([botGreeting]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  function addBotMessage(text: string) {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 600);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowQuickQuestions(false);

    const answer = findAnswer(trimmed);
    addBotMessage(answer);
  }

  function handleQuickQuestion(q: QuickQuestion) {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: q.label,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setShowQuickQuestions(false);
    addBotMessage(q.answer);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  function handleResetToQuestions() {
    setMessages([botGreeting]);
    setShowQuickQuestions(true);
  }

  return (
    <>
      {/* Floating toggle button - always chat icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary/90"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Sohbeti aç"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl sm:w-[400px]"
            style={{ maxHeight: "min(600px, calc(100vh - 140px))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-primary px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white">LUMO Asistan</h3>
                <p className="text-xs text-white/70">
                  Sorularınıza yardımcı oluyorum
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                aria-label="Küçült"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.sender === "user"
                        ? "rounded-br-md bg-primary text-white"
                        : "rounded-bl-md bg-muted text-foreground"
                    )}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              {/* Quick questions */}
              <AnimatePresence>
                {showQuickQuestions && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: messages.length <= 1 ? 0.3 : 0, duration: 0.2 }}
                    className="space-y-2 pt-1"
                  >
                    {quickQuestions.map((q) => (
                      <button
                        key={q.label}
                        onClick={() => handleQuickQuestion(q)}
                        className="group flex w-full items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <span>{q.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Back to questions button */}
              <AnimatePresence>
                {!showQuickQuestions && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="pt-1"
                  >
                    <button
                      onClick={handleResetToQuestions}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-3.5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
                    >
                      <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-45" />
                      <span>Sorulara Dön</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t bg-background px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Bir soru yazın..."
                  className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Gönder"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
