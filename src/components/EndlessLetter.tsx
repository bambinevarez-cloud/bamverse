"use client";

import { motion } from "framer-motion";
import { ENDLESS_LETTER } from "@/data/content";

export function EndlessLetter() {
  return (
    <section className="py-28 px-6 relative z-10 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-14"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-rose-dusty font-mono block mb-3">
          Capítulo IX
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light">
          {ENDLESS_LETTER.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto mt-6" />
      </motion.div>

      {/* Papel de Carta Íntima */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="letter-paper rounded-3xl p-8 sm:p-14 relative overflow-hidden"
      >
        {/* Marca de agua sutil de corazón */}
        <div className="absolute top-10 right-10 text-rose-dusty/5 text-9xl font-serif pointer-events-none select-none">
          ♡
        </div>

        <div className="font-sans text-candle-light/95 text-base sm:text-lg leading-loose whitespace-pre-line font-light space-y-4 relative z-10">
          {ENDLESS_LETTER.content}
        </div>
      </motion.div>
    </section>
  );
}
