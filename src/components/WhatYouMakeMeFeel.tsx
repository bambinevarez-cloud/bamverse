"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHAT_YOU_MAKE_ME_FEEL } from "@/data/content";
import { Heart } from "lucide-react";

export function WhatYouMakeMeFeel() {
  const [selectedEmotion, setSelectedEmotion] = useState(0);

  return (
    <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-rose-dusty font-mono block mb-3">
          Capítulo III
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light mb-4">
          {WHAT_YOU_MAKE_ME_FEEL.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto mb-6" />
        <p className="font-serif italic text-base sm:text-lg text-candle-gold/90 max-w-xl mx-auto font-light">
          “{WHAT_YOU_MAKE_ME_FEEL.subtitle}”
        </p>
      </motion.div>

      {/* Selector de Emociones */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
        {WHAT_YOU_MAKE_ME_FEEL.emotions.map((emotion, index) => {
          const isSelected = selectedEmotion === index;
          return (
            <button
              key={emotion.name}
              onClick={() => setSelectedEmotion(index)}
              className={`px-4 sm:px-6 py-2.5 rounded-full font-serif text-sm sm:text-base transition-all duration-400 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-wine-800 to-wine-700 text-white border border-rose-blush/60 shadow-[0_0_20px_rgba(232,181,195,0.35)] scale-105"
                  : "bg-space-900/80 text-rose-dusty hover:text-candle-light border border-rose-dusty/20 hover:border-rose-dusty/40"
              }`}
            >
              {emotion.name}
            </button>
          );
        })}
      </div>

      {/* Tarjeta de Reflexión de la Emoción Seleccionada */}
      <div className="relative min-h-[160px] sm:min-h-[180px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEmotion}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-wine-950/70 via-space-900/90 to-space-950 border border-rose-dusty/20 backdrop-blur-md shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 text-rose-dusty/20">
              <Heart size={20} />
            </div>
            <div className="absolute bottom-4 right-4 text-rose-dusty/20">
              <Heart size={20} />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-warm mb-4">
              {WHAT_YOU_MAKE_ME_FEEL.emotions[selectedEmotion].name}
            </h3>

            <p className="font-sans text-candle-light/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-light">
              “{WHAT_YOU_MAKE_ME_FEEL.emotions[selectedEmotion].text}”
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
