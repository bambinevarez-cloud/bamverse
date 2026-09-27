"use client";

import { motion } from "framer-motion";
import { MY_FEARS } from "@/data/content";

export function MyFears() {
  return (
    <section className="py-24 px-6 relative z-10 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-rose-dusty font-mono block mb-3">
          Capítulo VII
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light">
          {MY_FEARS.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto mt-6" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-space-900/90 via-wine-950/40 to-space-900/70 border border-rose-dusty/20 backdrop-blur-md shadow-2xl relative overflow-hidden"
      >
        <div className="font-sans text-candle-light/90 text-base sm:text-lg leading-relaxed whitespace-pre-line font-light space-y-4">
          {MY_FEARS.text}
        </div>

        <div className="mt-8 pt-6 border-t border-rose-dusty/15 flex justify-end">
          <span className="font-serif italic text-sm text-candle-gold/90">
            — Siempre contigo, Luis
          </span>
        </div>
      </motion.div>
    </section>
  );
}
