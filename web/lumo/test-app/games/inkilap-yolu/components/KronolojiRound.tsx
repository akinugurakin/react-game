"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { RoundResult } from "./GameBoard";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  sortOrder: number;
  shortDescription: string;
  hint: string;
}

const EVENTS: TimelineEvent[] = [
  {
    id: "evt-01",
    title: "Samsun'a Çıkış",
    date: "19 Mayıs 1919",
    sortOrder: 1,
    shortDescription:
      "Mustafa Kemal'in Millî Mücadele'yi başlatmak üzere Samsun'a ayak basması",
    hint: "Millî Mücadele'nin başlangıç noktası",
  },
  {
    id: "evt-02",
    title: "Amasya Genelgesi",
    date: "22 Haziran 1919",
    sortOrder: 2,
    shortDescription:
      "Vatanın bütünlüğü ve milletin bağımsızlığının tehlikede olduğunun ilan edilmesi",
    hint: "İlk kez milletin kendi kaderini belirlemesi gerektiği vurgulandı",
  },
  {
    id: "evt-03",
    title: "Erzurum Kongresi",
    date: "23 Temmuz 1919",
    sortOrder: 3,
    shortDescription:
      "Doğu illerinin temsilcileriyle toplanan bölgesel kongre",
    hint: "Millî sınırlar içinde vatanın bütünlüğü kararının alındığı kongre",
  },
  {
    id: "evt-04",
    title: "Sivas Kongresi",
    date: "4 Eylül 1919",
    sortOrder: 4,
    shortDescription:
      "Tüm cemiyetlerin birleştirildiği ulusal kongre",
    hint: "Mücadelenin ulusal boyut kazandığı kongre",
  },
  {
    id: "evt-05",
    title: "TBMM'nin Açılışı",
    date: "23 Nisan 1920",
    sortOrder: 5,
    shortDescription:
      "Ankara'da Büyük Millet Meclisi'nin açılması",
    hint: "Bugün Ulusal Egemenlik ve Çocuk Bayramı olarak kutlanır",
  },
  {
    id: "evt-06",
    title: "Sakarya Muharebesi",
    date: "23 Ağustos 1921",
    sortOrder: 6,
    shortDescription:
      "Türk ordusunun savunmadan taarruza geçtiği dönüm noktası",
    hint: "22 gün 22 gece süren muharebe",
  },
  {
    id: "evt-07",
    title: "Büyük Taarruz",
    date: "26 Ağustos 1922",
    sortOrder: 7,
    shortDescription:
      "Başkomutan Mustafa Kemal önderliğinde düşmanın kesin yenilgisi",
    hint: "Dumlupınar'da kazanılan zafer",
  },
  {
    id: "evt-08",
    title: "Cumhuriyet'in İlanı",
    date: "29 Ekim 1923",
    sortOrder: 8,
    shortDescription:
      "Türkiye Cumhuriyeti'nin resmen ilan edilmesi",
    hint: "Her yıl Cumhuriyet Bayramı olarak kutladığımız tarih",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface KronolojiRoundProps {
  onComplete: (result: RoundResult, streak: number) => void;
}

export function KronolojiRound({ onComplete }: KronolojiRoundProps) {
  const [availableEvents] = useState(() => shuffle(EVENTS));
  const [placedEvents, setPlacedEvents] = useState<(TimelineEvent | null)[]>(
    () => Array(EVENTS.length).fill(null)
  );
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null
  );
  const [feedback, setFeedback] = useState<Map<number, "correct" | "wrong">>(
    new Map()
  );
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [hintIndex, setHintIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const placedIds = new Set(
    placedEvents.filter(Boolean).map((e) => e!.id)
  );

  const correctCount = placedEvents.filter(Boolean).length;

  const finishRound = useCallback(
    (correct: number, mistakeCount: number, remainingTime: number) => {
      if (completedRef.current) return;
      completedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);

      onComplete(
        {
          key: "kronoloji",
          correct,
          total: EVENTS.length,
          timeBonus: remainingTime > 30,
          mistakes: mistakeCount,
        },
        streak
      );
    },
    [onComplete, streak]
  );

  // Süre doldu
  useEffect(() => {
    if (timeLeft === 0 && !completedRef.current) {
      finishRound(correctCount, mistakes, 0);
    }
  }, [timeLeft, correctCount, mistakes, finishRound]);

  // Tümü yerleştirildi
  useEffect(() => {
    if (correctCount === EVENTS.length && !completedRef.current) {
      setTimeout(() => {
        finishRound(correctCount, mistakes, timeLeft);
      }, 600);
    }
  }, [correctCount, mistakes, timeLeft, finishRound]);

  const handleEventSelect = (event: TimelineEvent) => {
    if (placedIds.has(event.id)) return;
    setSelectedEvent(event);
    setHintIndex(null);
  };

  const handleSlotClick = (slotIndex: number) => {
    if (!selectedEvent) return;
    if (placedEvents[slotIndex] !== null) return;

    // Doğru slot mu? (sortOrder === slotIndex + 1)
    const isCorrect = selectedEvent.sortOrder === slotIndex + 1;

    if (isCorrect) {
      const newPlaced = [...placedEvents];
      newPlaced[slotIndex] = selectedEvent;
      setPlacedEvents(newPlaced);
      setStreak((s) => s + 1);
      setFeedback((prev) => new Map(prev).set(slotIndex, "correct"));
      setSelectedEvent(null);
    } else {
      setMistakes((m) => m + 1);
      setStreak(0);
      setFeedback((prev) => new Map(prev).set(slotIndex, "wrong"));
      setTimeout(() => {
        setFeedback((prev) => {
          const next = new Map(prev);
          next.delete(slotIndex);
          return next;
        });
      }, 600);
    }
  };

  const handleHintClick = (index: number) => {
    setHintIndex(hintIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Süre ve ilerleme */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {correctCount}/{EVENTS.length} yerleştirildi
        </span>
        <span
          className={`font-mono text-sm font-bold px-2.5 py-1 rounded-full ${
            timeLeft <= 20
              ? "text-destructive bg-destructive/10"
              : "text-foreground bg-muted"
          }`}
        >
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Süre çubuğu */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            timeLeft <= 20 ? "bg-destructive" : "bg-primary"
          }`}
          style={{ width: `${(timeLeft / 120) * 100}%` }}
        />
      </div>

      {/* Zaman çizelgesi slotları */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
          Zaman Çizelgesi (1919 — 1923)
        </p>
        {EVENTS.map((_, slotIndex) => {
          const placed = placedEvents[slotIndex];
          const slotFeedback = feedback.get(slotIndex);

          return (
            <button
              key={slotIndex}
              type="button"
              onClick={() => handleSlotClick(slotIndex)}
              disabled={placed !== null || !selectedEvent}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 text-sm transition-all duration-200 text-left min-h-[52px] ${
                placed
                  ? "border-accent bg-accent/10 text-foreground"
                  : slotFeedback === "wrong"
                    ? "border-destructive bg-destructive/10 animate-shake"
                    : selectedEvent
                      ? "border-dashed border-primary/40 bg-primary/5 hover:border-primary hover:bg-primary/10 cursor-pointer"
                      : "border-dashed border-muted bg-muted/20 cursor-default"
              }`}
            >
              <span
                className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  placed
                    ? "bg-accent text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {placed ? "✓" : slotIndex + 1}
              </span>
              {placed ? (
                <div className="flex-1 min-w-0">
                  <span className="font-bold">{placed.title}</span>
                  <span className="text-muted-foreground ml-2 text-xs">
                    {placed.date}
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground text-xs">
                  {slotIndex + 1}. olayı buraya yerleştir
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Seçilebilir olay kartları */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
          Olaylar
        </p>
        <div className="grid grid-cols-2 gap-2">
          {availableEvents.map((event, i) => {
            const isPlaced = placedIds.has(event.id);
            const isSelected = selectedEvent?.id === event.id;
            const showHint = hintIndex === i;

            return (
              <div key={event.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleEventSelect(event)}
                  disabled={isPlaced}
                  className={`w-full flex flex-col gap-1 px-3 py-2.5 rounded-lg border-2 text-sm transition-all duration-200 text-left ${
                    isPlaced
                      ? "border-accent/30 bg-accent/5 opacity-50 cursor-default"
                      : isSelected
                        ? "border-primary bg-primary/10 text-primary scale-[1.02] shadow-lg"
                        : "border-border bg-card text-card-foreground hover:border-primary/40 hover:shadow active:scale-[0.97]"
                  }`}
                >
                  <span className="font-bold text-sm leading-tight">
                    {event.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {event.date}
                  </span>
                  {isPlaced && (
                    <span className="absolute top-2 right-2 text-accent text-xs font-bold">
                      ✓
                    </span>
                  )}
                </button>
                {/* İpucu butonu */}
                {!isPlaced && (
                  <button
                    type="button"
                    onClick={() => handleHintClick(i)}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                    title="İpucu"
                  >
                    ?
                  </button>
                )}
                {showHint && !isPlaced && (
                  <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-foreground text-background text-[11px] rounded-lg shadow-lg z-10 leading-snug">
                    {event.hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak */}
      {streak >= 3 && (
        <div className="text-center">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {streak} seri doğru!
          </span>
        </div>
      )}

      {mistakes > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Hata: {mistakes}
        </p>
      )}
    </div>
  );
}
