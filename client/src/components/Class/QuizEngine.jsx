import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconCheck } from "@tabler/icons-react";
import { recordStudyActivity } from "../../utils/streak";

/** DB/API may use snake_case; UI expects question + options + correctAnswer index */
function normalizeQuestions(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const q = raw[i];
    if (!q || typeof q !== "object") continue;
    const text =
      q.question ??
      q.question_text ??
      q.title ??
      "";
    let options = Array.isArray(q.options) ? q.options.map(String) : [];
    options = options.filter((o) => o && String(o).trim().length > 0);
    if (!String(text).trim() || options.length < 2) continue;

    const ca = q.correctAnswer ?? q.correct_answer ?? 0;
    let correctAnswer =
      typeof ca === "number" && Number.isFinite(ca)
        ? Math.min(Math.max(0, Math.floor(ca)), options.length - 1)
        : parseInt(ca, 10);
    if (!Number.isFinite(correctAnswer))
      correctAnswer = 0;
    correctAnswer = Math.min(Math.max(0, correctAnswer), options.length - 1);

    out.push({ question: String(text).trim(), options, correctAnswer });
  }
  return out;
}

export default function QuizEngine({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const randomizedQuestions = useMemo(() => {
    const normalized = normalizeQuestions(questions);
    return normalized
      .map((q) => {
        const optionsWithIndices = q.options.map((opt, idx) => ({
          text: opt,
          originalIndex: idx,
        }));
        const shuffledOptions = [...optionsWithIndices].sort(
          () => Math.random() - 0.5,
        );
        const newCorrectIndex = shuffledOptions.findIndex(
          (opt) => opt.originalIndex === q.correctAnswer,
        );
        const safeCorrect =
          newCorrectIndex >= 0 ? newCorrectIndex : 0;
        return {
          ...q,
          options: shuffledOptions.map((opt) => opt.text),
          correctAnswer: safeCorrect,
        };
      })
      .sort(() => Math.random() - 0.5);
  }, [questions]);

  const n = randomizedQuestions.length;
  const currentQ = n > 0 ? randomizedQuestions[currentIndex] : null;
  const progress =
    n === 0 ? 0 : Math.min(100, ((currentIndex + 1) / n) * 100);

  const handleSelect = (idx) => {
    if (status !== "idle" || !currentQ) return;
    setSelectedOptionIndex(idx);
  };

  const checkAnswer = () => {
    if (selectedOptionIndex === null || !currentQ) return;

    if (selectedOptionIndex === currentQ.correctAnswer) {
      setStatus("correct");
      setScore((prev) => {
        const next = prev + 1;
        scoreRef.current = next;
        return next;
      });
      recordStudyActivity();
    } else {
      setStatus("incorrect");
    }
  };

  const handleNext = () => {
    if (!n || !currentQ) {
      onComplete(0, 0);
      return;
    }
    if (currentIndex < n - 1) {
      setCurrentIndex((curr) => curr + 1);
      setSelectedOptionIndex(null);
      setStatus("idle");
    } else {
      onComplete(scoreRef.current, n);
    }
  };

  if (!n || !currentQ) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0c0f] px-6 text-center">
        <p className="mb-6 max-w-md text-lg text-zinc-300">
          Quiz belum punya soal yang valid. Pastikan di admin setiap soal punya teks
          pertanyaan dan minimal 2 opsi jawaban.
        </p>
        <button
          type="button"
          onClick={() => onComplete(0, 0)}
          className="rounded-2xl bg-zinc-800 px-8 py-3 font-semibold text-white ring-1 ring-zinc-600 transition hover:bg-zinc-700"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0c0c0f] font-sans">
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center gap-4 border-b border-zinc-800/80 px-4 sm:h-20 sm:px-6">
        <button
          type="button"
          onClick={() => onComplete(scoreRef.current, n)}
          className="rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
          aria-label="Tutup quiz"
        >
          <IconX size={24} />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-emerald-500/90"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
        <span className="shrink-0 font-mono text-xs text-zinc-500">
          {currentIndex + 1}/{n}
        </span>
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-8 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            className="flex w-full max-w-2xl flex-col items-center"
          >
            <h2 className="mb-8 text-center text-xl font-bold leading-snug text-white sm:text-2xl">
              {currentQ.question}
            </h2>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = status === "correct" && isSelected;
                const isWrong = status === "incorrect" && isSelected;
                const showCorrect =
                  status === "incorrect" && idx === currentQ.correctAnswer;

                let cardStyle =
                  "border-zinc-700/80 bg-zinc-900/60 hover:border-zinc-500 hover:bg-zinc-800/80";

                if (isSelected && status === "idle") {
                  cardStyle =
                    "border-emerald-500/50 bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-500/30";
                } else if (isCorrect || showCorrect) {
                  cardStyle =
                    "border-emerald-500/60 bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/25";
                } else if (isWrong) {
                  cardStyle =
                    "border-red-500/50 bg-red-500/10 text-red-200 ring-1 ring-red-500/20";
                }

                return (
                  <motion.button
                    key={`${currentIndex}-${idx}`}
                    type="button"
                    whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
                    whileTap={{ scale: status === "idle" ? 0.99 : 1 }}
                    onClick={() => handleSelect(idx)}
                    disabled={status !== "idle"}
                    className={`min-h-[88px] rounded-2xl border-2 px-4 py-4 text-left text-base font-medium transition-all duration-200 ${cardStyle} flex items-center justify-center text-center`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom actions */}
      <div
        className={`shrink-0 border-t px-4 py-4 sm:px-6 ${
          status === "idle"
            ? "border-zinc-800 bg-[#0f0f12]"
            : status === "correct"
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-red-500/30 bg-red-500/5"
        } transition-colors duration-300`}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            {status === "correct" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-lg font-bold text-emerald-400"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-black">
                  <IconCheck size={20} />
                </span>
                Benar!
              </motion.div>
            )}
            {status === "incorrect" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-lg font-bold text-red-400"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white">
                  <IconX size={20} />
                </span>
                Coba lagi soal berikutnya.
              </motion.div>
            )}
          </div>

          <button
            type="button"
            onClick={status === "idle" ? checkAnswer : handleNext}
            disabled={selectedOptionIndex === null && status === "idle"}
            className={`shrink-0 rounded-2xl px-8 py-3.5 text-sm font-bold tracking-wide transition-all sm:text-base ${
              selectedOptionIndex === null && status === "idle"
                ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
                : status === "idle"
                  ? "bg-white text-zinc-900 shadow-lg shadow-white/10 hover:brightness-110"
                  : status === "correct"
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-white text-zinc-900 hover:brightness-110"
            }`}
          >
            {status === "idle" ? "Periksa jawaban" : currentIndex < n - 1 ? "Lanjut" : "Selesai"}
          </button>
        </div>
      </div>
    </div>
  );
}
