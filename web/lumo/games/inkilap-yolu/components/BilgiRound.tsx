"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { RoundResult } from "./GameBoard";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question:
      "Mustafa Kemal hangi cephede 'Anafartalar Kahramanı' unvanını aldı?",
    options: [
      "Kafkas Cephesi",
      "Çanakkale Cephesi",
      "Kanal Cephesi",
      "Suriye Cephesi",
    ],
    correctAnswer: 1,
    explanation:
      "Mustafa Kemal, 1915'te Çanakkale Cephesi'nde Anafartalar Grubu komutanı olarak büyük başarı göstermiştir.",
  },
  {
    question: "Erzurum Kongresi'nde alınan en önemli karar nedir?",
    options: [
      "Saltanatın kaldırılması",
      "Millî sınırlar içinde vatanın bütünlüğü",
      "Cumhuriyet'in ilanı",
      "Halifeliğin kaldırılması",
    ],
    correctAnswer: 1,
    explanation:
      "Erzurum Kongresi'nde millî sınırlar içinde vatanın bir bütün olduğu ve parçalanamayacağı kararı alınmıştır.",
  },
  {
    question: "İstiklâl Marşı'nın yazarı kimdir?",
    options: [
      "Yahya Kemal Beyatlı",
      "Ziya Gökalp",
      "Mehmet Âkif Ersoy",
      "Namık Kemal",
    ],
    correctAnswer: 2,
    explanation:
      "İstiklâl Marşı, Mehmet Âkif Ersoy tarafından yazılmış ve 12 Mart 1921'de TBMM tarafından kabul edilmiştir.",
  },
  {
    question: "Büyük Taarruz'un başkomutanı kimdir?",
    options: [
      "İsmet Paşa",
      "Kâzım Karabekir",
      "Mustafa Kemal Paşa",
      "Fevzi Çakmak",
    ],
    correctAnswer: 2,
    explanation:
      "Büyük Taarruz, Başkomutan Mustafa Kemal Paşa'nın doğrudan komutasında 26 Ağustos 1922'de başlamıştır.",
  },
  {
    question: "Lozan Antlaşması hangi yıl imzalandı?",
    options: ["1921", "1922", "1923", "1924"],
    correctAnswer: 2,
    explanation:
      "Lozan Barış Antlaşması 24 Temmuz 1923'te imzalanmış ve yeni Türk devletinin uluslararası alanda tanınmasını sağlamıştır.",
  },
  {
    question: "Sakarya Meydan Muharebesi'nin önemi nedir?",
    options: [
      "İlk diplomatik zafer",
      "Türk ordusunun savunmadan taarruza geçtiği dönüm noktası",
      "İstanbul'un kurtuluşu",
      "Saltanatın kaldırılması",
    ],
    correctAnswer: 1,
    explanation:
      "Sakarya Muharebesi, Türk ordusunun savunma dönemini sona erdirip taarruz dönemine geçtiği kritik dönüm noktasıdır.",
  },
  {
    question: "Sivas Kongresi'nin en önemli kararı nedir?",
    options: [
      "TBMM'nin açılması",
      "Cumhuriyet'in ilanı",
      "Tüm cemiyetlerin birleştirilmesi",
      "Düzenli ordunun kurulması",
    ],
    correctAnswer: 2,
    explanation:
      "Sivas Kongresi'nde tüm millî cemiyetler 'Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti' adı altında birleştirilmiştir.",
  },
  {
    question:
      "Cumhuriyet'in ilanıyla birlikte ilk cumhurbaşkanı kim seçildi?",
    options: [
      "İsmet İnönü",
      "Fevzi Çakmak",
      "Mustafa Kemal Atatürk",
      "Kâzım Karabekir",
    ],
    correctAnswer: 2,
    explanation:
      "29 Ekim 1923'te Cumhuriyet ilan edilmiş ve Mustafa Kemal Atatürk oybirliğiyle ilk cumhurbaşkanı seçilmiştir.",
  },
];

interface BilgiRoundProps {
  onComplete: (result: RoundResult, streak: number) => void;
}

export function BilgiRound({ onComplete }: BilgiRoundProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correct, setCorrect] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showExplanation, setShowExplanation] = useState(false);
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

  const finishRound = useCallback(
    (correctCount: number, mistakeCount: number, remainingTime: number) => {
      if (completedRef.current) return;
      completedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);

      onComplete(
        {
          key: "bilgi-yarismasi",
          correct: correctCount,
          total: QUESTIONS.length,
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
      finishRound(correct, mistakes, 0);
    }
  }, [timeLeft, correct, mistakes, finishRound]);

  const handleOptionClick = (optionIndex: number) => {
    if (feedback !== null || selectedOption !== null) return;

    const question = QUESTIONS[questionIndex];
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === question.correctAnswer;

    if (isCorrect) {
      setFeedback("correct");
      setCorrect((c) => c + 1);
      setStreak((s) => s + 1);
    } else {
      setFeedback("wrong");
      setMistakes((m) => m + 1);
      setStreak(0);
    }

    setShowExplanation(true);

    setTimeout(() => {
      const nextIdx = questionIndex + 1;
      if (nextIdx >= QUESTIONS.length) {
        finishRound(
          isCorrect ? correct + 1 : correct,
          !isCorrect ? mistakes + 1 : mistakes,
          timeLeft
        );
      } else {
        setQuestionIndex(nextIdx);
        setSelectedOption(null);
        setFeedback(null);
        setShowExplanation(false);
      }
    }, 2500);
  };

  const currentQuestion = QUESTIONS[questionIndex];
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col gap-4">
      {/* Süre ve ilerleme */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {questionIndex + 1}/{QUESTIONS.length}
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

      {/* Soru ilerleme çubuğu */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${(questionIndex / QUESTIONS.length) * 100}%`,
          }}
        />
      </div>

      {/* Soru */}
      <div className="bg-muted/40 rounded-lg p-4 border border-border">
        <p className="text-base font-bold text-foreground leading-snug">
          {currentQuestion.question}
        </p>
      </div>

      {/* Seçenekler */}
      <div className="flex flex-col gap-2">
        {currentQuestion.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const isCorrectOption = i === currentQuestion.correctAnswer;
          const showCorrect = feedback !== null && isCorrectOption;
          const showWrong = feedback === "wrong" && isSelected;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleOptionClick(i)}
              disabled={feedback !== null}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-sm font-semibold text-left transition-all duration-200 ${
                showCorrect
                  ? "border-accent bg-accent/10 text-accent-foreground"
                  : showWrong
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-card-foreground hover:border-primary/40 hover:shadow active:scale-[0.98]"
              }`}
            >
              <span
                className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                  showCorrect
                    ? "bg-accent text-white"
                    : showWrong
                      ? "bg-destructive text-white"
                      : isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                }`}
              >
                {showCorrect ? "✓" : showWrong ? "✗" : optionLetters[i]}
              </span>
              <span className="leading-snug">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Açıklama */}
      {showExplanation && (
        <div
          className={`rounded-lg p-3 text-xs leading-relaxed border ${
            feedback === "correct"
              ? "bg-accent/10 border-accent/30 text-accent-foreground"
              : "bg-destructive/10 border-destructive/30 text-foreground"
          }`}
        >
          <span className="font-bold">
            {feedback === "correct" ? "Doğru! " : "Yanlış. "}
          </span>
          {currentQuestion.explanation}
        </div>
      )}

      {/* Streak */}
      {streak >= 3 && (
        <div className="text-center">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {streak} seri doğru!
          </span>
        </div>
      )}
    </div>
  );
}
