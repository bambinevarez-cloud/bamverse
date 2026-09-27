"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { HERO_CONTENT } from "@/data/content";

interface HeroProps {
  onStart: () => void;
  onHeartFound: (id: number) => void;
  isHeartFound: boolean;
}

export function Hero({ onStart, onHeartFound, isHeartFound }: HeroProps) {
  const [returningMessage, setReturningMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem("bamverse_visited");
      if (hasVisited) {
        // Seleccionar aleatoriamente un mensaje cariñoso de reencuentro
        const msgs = HERO_CONTENT.returningMessages;
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        setReturningMessage(msg);
      } else {
        localStorage.setItem("bamverse_visited", "true");
      }
    } catch {
      // Manejo seguro de localStorage
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 overflow-hidden z-10">
      {/* Luz ambiental difuminada detrás del título */}
      <div className="absolute w-[320px] md:w-[550px] h-[320px] md:h-[550px] bg-wine-800/20 rounded-full blur-[110px] pointer-events-none -top-10 ambient-light" />
      <div className="absolute w-[240px] md:w-[400px] h-[240px] md:h-[400px] bg-rose-dusty/10 rounded-full blur-[90px] pointer-events-none bottom-10 ambient-light" />

      {/* Primer Corazón Secreto escondido entre las estrellas del firmamento */}
      <div className="absolute top-[18%] right-[14%] md:right-[22%] z-20">
        <button
          onClick={() => onHeartFound(1)}
          className={`relative group p-3 cursor-pointer transition-transform duration-500 ${
            isHeartFound ? "opacity-30" : "opacity-45 hover:opacity-100 hover:scale-125"
          }`}
          title="✦"
          aria-label="Detalle misterioso"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-rose-blush shadow-[0_0_12px_#E8B5C3] group-hover:scale-150 transition-all duration-300" />
          <Heart
            size={12}
            className="absolute inset-0 m-auto text-rose-dusty opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </button>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center z-10">
        {/* Aviso de visita recurrente */}
        {returningMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6 px-4 py-1.5 rounded-full bg-wine-950/60 border border-rose-dusty/25 text-rose-blush text-xs tracking-widest font-mono backdrop-blur-md"
          >
            {returningMessage}
          </motion.div>
        )}

        {/* Pista sutil previa */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.25em] uppercase text-rose-dusty mb-4 font-mono"
        >
          {HERO_CONTENT.preIntroHint}
        </motion.p>

        {/* Título Principal Cinematográfico */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_4px_35px_rgba(196,124,146,0.3)]"
        >
          <span className="bg-gradient-to-r from-candle-light via-rose-warm to-rose-blush bg-clip-text text-transparent">
            {HERO_CONTENT.title}
          </span>
        </motion.h1>

        {/* Subtítulo emocional */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-candle-gold/90 max-w-lg mb-10 leading-relaxed font-light"
        >
          “{HERO_CONTENT.tagline}”
        </motion.p>

        {/* Botón Principal: Déjame intentarlo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-wine-900 via-wine-800 to-space-850 border border-rose-dusty/40 text-candle-light font-serif text-base sm:text-lg tracking-wider shadow-[0_0_30px_rgba(122,34,59,0.35)] hover:shadow-[0_0_45px_rgba(232,181,195,0.45)] hover:border-rose-blush transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-blush/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles size={17} className="text-candle-gold group-hover:rotate-45 transition-transform duration-500" />
            <span className="relative z-10 font-medium">{HERO_CONTENT.buttonText}</span>
          </button>
        </motion.div>
      </div>

      {/* Flecha sutil indicadora */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-rose-dusty font-mono">desliza hacia abajo</span>
        <div className="w-4 h-6 border border-rose-dusty/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-1 bg-rose-blush rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
