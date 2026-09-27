"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HOW_I_SEE_YOU } from "@/data/content";
import { SITE_CONFIG } from "@/config/config";
import Image from "next/image";
import { Heart } from "lucide-react";

interface HowISeeYouProps {
  onHeartFound: (id: number) => void;
  isHeartFound: boolean;
}

export function HowISeeYou({ onHeartFound, isHeartFound }: HowISeeYouProps) {
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  return (
    <section className="py-28 px-6 relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center overflow-hidden">
      {/* Resplandor ambiental */}
      <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-wine-800/20 rounded-full blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ambient-light" />

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="mb-14 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-rose-dusty font-mono block mb-3">
          Capítulo VI
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light">
          {HOW_I_SEE_YOU.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto mt-6" />
      </motion.div>

      {/* Contenedor Central con Fotografía de Michelle ("Pecosa") y Frases Flotantes */}
      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center my-6">
        
        {/* Fotografía Cinematográfica */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4 }}
          className="relative group z-10"
        >
          {/* Halo de luz cálida detrás de la foto */}
          <div className="absolute -inset-2 bg-gradient-to-r from-wine-700 via-rose-dusty to-candle-gold rounded-3xl blur-xl opacity-35 group-hover:opacity-60 transition duration-1000" />
          
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border border-rose-dusty/40 shadow-2xl bg-space-950">
            <Image
              src={SITE_CONFIG.photos.pecosaMain}
              alt="Michelle — Mi Pecosa hermosa"
              fill
              className="object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-105 group-hover:filter-none transition-all duration-700"
              sizes="(max-width: 640px) 256px, 288px"
              priority
            />
            {/* Viñeta sutil sobre la foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
              <span className="font-serif text-xs text-rose-blush/80 tracking-widest uppercase font-mono">
                Pecosa ♡
              </span>
            </div>
          </div>

          {/* Corazón Secreto #4 oculto cerca de la foto */}
          <div className="absolute -bottom-3 -right-3 z-30">
            <button
              onClick={() => onHeartFound(4)}
              className={`p-2 transition-transform duration-300 ${
                isHeartFound ? "opacity-20" : "opacity-40 hover:opacity-100 hover:scale-125"
              }`}
              title="✦"
              aria-label="Detalle en la mirada"
            >
              <Heart size={14} className="text-rose-dusty hover:text-rose-blush" />
            </button>
          </div>
        </motion.div>

        {/* Nube de Palabras Flotantes que Orbitan y Aparecen Suavemente */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 max-w-lg z-20">
          {HOW_I_SEE_YOU.words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setActiveWordIndex(index)}
              onMouseLeave={() => setActiveWordIndex(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-serif transition-all duration-300 cursor-default ${
                activeWordIndex === index
                  ? "bg-rose-dusty/25 text-white border-rose-blush scale-105 shadow-[0_0_15px_rgba(232,181,195,0.4)]"
                  : "bg-space-900/60 border border-rose-dusty/20 text-rose-blush/90 backdrop-blur-sm"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Conclusión Final */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="font-serif italic text-base sm:text-xl text-candle-gold mt-10 max-w-md font-light"
        >
          “{HOW_I_SEE_YOU.conclusion}”
        </motion.p>
      </div>
    </section>
  );
}
