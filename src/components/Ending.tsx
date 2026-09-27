"use client";

import { motion } from "framer-motion";
import { ENDING_CONTENT } from "@/data/content";
import { SITE_CONFIG } from "@/config/config";
import Image from "next/image";
import { Heart } from "lucide-react";

interface EndingProps {
  onHeartFound: (id: number) => void;
  isHeartFound: boolean;
}

export function Ending({ onHeartFound, isHeartFound }: EndingProps) {
  return (
    <section className="py-32 px-6 relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
      {/* Luz tenue final */}
      <div className="absolute w-[350px] h-[350px] bg-wine-800/15 rounded-full blur-[130px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ambient-light" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4 }}
        className="space-y-12"
      >
        <p className="font-serif italic text-lg sm:text-2xl text-candle-gold/90 font-light leading-relaxed max-w-xl mx-auto">
          “{ENDING_CONTENT.message}”
        </p>

        {/* Marco especial para fotografía de los dos (o emblema de pareja) */}
        <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-tr from-wine-700 via-rose-dusty to-candle-gold shadow-2xl flex items-center justify-center overflow-hidden">
          {SITE_CONFIG.photos.coupleEnding ? (
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={SITE_CONFIG.photos.coupleEnding}
                alt="Luis y Michelle"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-space-950 flex flex-col items-center justify-center p-4">
              <span className="text-3xl text-rose-blush mb-1">♡</span>
              <span className="font-serif text-sm tracking-widest uppercase text-candle-gold/80 font-mono">
                Pecosa & Güerito
              </span>
            </div>
          )}
        </div>

        {/* Nombres y Apodos */}
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-candle-light via-rose-warm to-rose-blush bg-clip-text text-transparent">
            {ENDING_CONTENT.names}
          </h2>

          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-rose-dusty">
            {ENDING_CONTENT.nicknames}
          </p>
        </div>

        <div className="w-16 h-[1px] bg-rose-dusty/30 mx-auto" />

        {/* Última Frase */}
        <div className="relative inline-block">
          <p className="font-serif italic text-base sm:text-xl text-candle-light/80 font-light">
            “{ENDING_CONTENT.finalThought}”
          </p>

          {/* Quinto Corazón Secreto oculto cerca del final */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2">
            <button
              onClick={() => onHeartFound(5)}
              className={`p-1.5 transition-transform duration-300 ${
                isHeartFound ? "opacity-25" : "opacity-40 hover:opacity-100 hover:scale-125"
              }`}
              title="✦"
              aria-label="El último detalle"
            >
              <Heart size={14} className="text-rose-blush fill-rose-blush/30" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
