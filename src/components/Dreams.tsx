"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DREAMS } from "@/data/content";
import { Sparkles, Star } from "lucide-react";

export function Dreams() {
  const [activeStar, setActiveStar] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
      {/* Luz ambiental dorada que comienza a iluminar suavemente la experiencia */}
      <div className="absolute w-[400px] h-[400px] bg-candle-gold/10 rounded-full blur-[140px] pointer-events-none top-1/3 left-1/2 -translate-x-1/2 ambient-light" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-candle-gold font-mono block mb-3">
          Capítulo VIII
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          {DREAMS.title}
        </h2>
        <div className="w-12 h-[1px] bg-candle-gold/40 mx-auto mb-4" />
        <p className="text-xs sm:text-sm tracking-wider uppercase text-rose-dusty font-mono">
          {DREAMS.subtitle}
        </p>
      </motion.div>

      {/* Constelación de Estrellas Interactivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10">
        {DREAMS.stars.map((dream, index) => {
          const isOpen = activeStar === index;

          return (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
            >
              <button
                onClick={() => setActiveStar(isOpen ? null : index)}
                className={`w-full p-6 rounded-2xl border text-left transition-all duration-400 cursor-pointer flex flex-col justify-between ${
                  isOpen
                    ? "bg-gradient-to-br from-wine-900/90 via-space-900 to-space-950 border-candle-gold/70 shadow-[0_0_25px_rgba(234,204,164,0.25)] scale-[1.02]"
                    : "bg-space-900/70 hover:bg-space-850/80 border-rose-dusty/20 hover:border-candle-gold/40 shadow-lg hover:-translate-y-1"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-2.5">
                    <Star
                      size={17}
                      className={isOpen ? "text-candle-gold fill-candle-gold" : "text-rose-dusty"}
                    />
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-candle-light">
                      {dream.title}
                    </h3>
                  </div>
                  <Sparkles
                    size={14}
                    className={`transition-opacity duration-300 ${isOpen ? "text-candle-gold opacity-100" : "opacity-0"}`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="font-sans text-sm sm:text-base text-candle-light/90 leading-relaxed font-light pt-2 border-t border-rose-dusty/15 mt-2"
                    >
                      “{dream.text}”
                    </motion.p>
                  )}
                </AnimatePresence>

                {!isOpen && (
                  <span className="text-[11px] text-rose-dusty/60 font-mono uppercase tracking-wider mt-2">
                    Toca para iluminar ✦
                  </span>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
