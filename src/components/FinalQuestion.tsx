"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FINAL_QUESTION } from "@/data/content";
import confetti from "canvas-confetti";

export function FinalQuestion() {
  const [step, setStep] = useState<"initial" | "paused" | "question" | "answered">("initial");

  const handleInitialClick = () => {
    setStep("paused");
    setTimeout(() => {
      setStep("question");
    }, 1200);
  };

  const handleAnswer = () => {
    setStep("answered");

    // Lluvia suave de estrellas y partículas románticas
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E8B5C3", "#C47C92", "#EACCA4", "#FFFFFF"],
        ticks: 200,
        gravity: 0.8,
      });

      setTimeout(() => {
        confetti({
          particleCount: 35,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#E8B5C3", "#EACCA4"],
          ticks: 220,
        });
      }, 400);
    } catch {
      // Confetti fallback
    }
  };

  return (
    <section className="min-h-screen py-32 px-6 relative z-10 flex flex-col items-center justify-center text-center bg-black/95 transition-colors duration-1000">
      <div className="max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === "initial" && (
            <motion.div
              key="step-initial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <p className="font-serif italic text-xl sm:text-2xl text-candle-gold/90 font-light">
                “{FINAL_QUESTION.preface}”
              </p>

              <button
                onClick={handleInitialClick}
                className="px-8 py-3.5 rounded-full bg-wine-900/80 hover:bg-wine-800 border border-rose-dusty/40 text-candle-light font-serif text-lg tracking-wider shadow-[0_0_25px_rgba(122,34,59,0.3)] hover:shadow-[0_0_35px_rgba(232,181,195,0.4)] transition-all duration-400 cursor-pointer"
              >
                {FINAL_QUESTION.buttonPrompt}
              </button>
            </motion.div>
          )}

          {step === "paused" && (
            <motion.div
              key="step-paused"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-rose-dusty font-mono text-sm tracking-widest"
            >
              ...
            </motion.div>
          )}

          {step === "question" && (
            <motion.div
              key="step-question"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="space-y-10"
            >
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-relaxed">
                {FINAL_QUESTION.question}
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
                <button
                  onClick={handleAnswer}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-wine-800 to-wine-700 hover:from-wine-700 hover:to-rose-dusty border border-rose-blush/50 text-white font-serif text-lg tracking-wider shadow-[0_0_30px_rgba(232,181,195,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  {FINAL_QUESTION.option1}
                </button>

                <button
                  onClick={handleAnswer}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-space-900 to-wine-950 hover:from-wine-900 hover:to-space-850 border border-candle-gold/40 text-candle-light font-serif text-lg tracking-wider shadow-[0_0_20px_rgba(234,204,164,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  {FINAL_QUESTION.option2}
                </button>
              </div>
            </motion.div>
          )}

          {step === "answered" && (
            <motion.div
              key="step-answered"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-4"
            >
              <div className="text-3xl mb-3">❤️</div>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-rose-warm font-light leading-relaxed">
                “{FINAL_QUESTION.response}”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
