"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECRET_LETTERS } from "@/data/content";
import { Mail, X, Heart } from "lucide-react";

interface SecretLettersProps {
  onHeartFound: (id: number) => void;
  isHeartFound: boolean;
}

export function SecretLetters({ onHeartFound, isHeartFound }: SecretLettersProps) {
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-rose-dusty font-mono block mb-3">
          Capítulo IV
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light mb-4">
          {SECRET_LETTERS.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto mb-4" />
        <p className="text-xs sm:text-sm tracking-wider uppercase text-rose-dusty/80 font-mono">
          {SECRET_LETTERS.subtitle}
        </p>
      </motion.div>

      {/* Rejilla de los 5 Sobres Cerrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {SECRET_LETTERS.letters.map((letter, index) => {
          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full max-w-sm"
            >
              <button
                onClick={() => setActiveLetter(index)}
                className="w-full p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-wine-950/80 via-space-900/90 to-wine-950/60 border border-rose-dusty/25 hover:border-rose-blush/60 shadow-lg hover:shadow-[0_0_30px_rgba(232,181,195,0.25)] hover:-translate-y-1.5 transition-all duration-400 group flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
              >
                {/* Sello de cera digital */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-wine-700 to-wine-900 border border-rose-dusty/50 flex items-center justify-center text-candle-gold shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={20} />
                </div>

                <span className="font-serif text-lg sm:text-xl font-medium text-candle-light group-hover:text-rose-warm transition-colors">
                  {letter.title}
                </span>

                <span className="text-xs text-rose-dusty/70 mt-2 font-mono uppercase tracking-wider group-hover:text-rose-blush transition-colors">
                  Tocar para abrir
                </span>
              </button>
            </motion.div>
          );
        })}

        {/* Espacio para Corazón Secreto #3 escondido entre los sobres */}
        <div className="flex items-center justify-center p-6">
          <button
            onClick={() => onHeartFound(3)}
            className={`p-3 rounded-full border border-dashed transition-all duration-500 ${
              isHeartFound
                ? "border-rose-dusty/20 text-rose-dusty/20 opacity-30"
                : "border-rose-dusty/30 text-rose-dusty/40 hover:text-rose-blush hover:border-rose-blush/60 hover:scale-110"
            }`}
            title="✦"
            aria-label="Detalle guardado"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>

      {/* Modal / Carta Abierta */}
      <AnimatePresence>
        {activeLetter !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-lg letter-paper rounded-2xl p-7 sm:p-9 text-left shadow-2xl overflow-hidden"
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-space-900/60 border border-rose-dusty/30 text-rose-dusty hover:text-white flex items-center justify-center transition-colors"
                aria-label="Cerrar carta"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💌</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-warm">
                  {SECRET_LETTERS.letters[activeLetter].title}
                </h3>
              </div>

              <div className="w-10 h-[1px] bg-rose-dusty/30 mb-6" />

              <div className="font-sans text-candle-light/95 text-base sm:text-lg leading-relaxed whitespace-pre-line font-light">
                {SECRET_LETTERS.letters[activeLetter].content}
              </div>

              <div className="mt-8 pt-4 border-t border-rose-dusty/15 flex justify-end">
                <span className="font-serif italic text-sm text-candle-gold/80">
                  — Tu Güerito
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
