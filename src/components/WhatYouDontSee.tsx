"use client";

import { motion } from "framer-motion";
import { WHAT_YOU_DONT_SEE } from "@/data/content";

export function WhatYouDontSee() {
  return (
    <section className="py-28 px-6 relative z-10 max-w-3xl mx-auto text-center">
      {/* Luz ambiental sutil y tranquila */}
      <div className="absolute w-[280px] h-[280px] bg-wine-900/15 rounded-full blur-[100px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ambient-light" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2 }}
        className="mb-14"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-rose-dusty/80 font-mono block mb-3">
          Capítulo V
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light">
          {WHAT_YOU_DONT_SEE.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto mt-6" />
      </motion.div>

      {/* Párrafos que aparecen con ritmo suave */}
      <div className="space-y-6 sm:space-y-8 font-serif text-base sm:text-xl text-candle-gold/90 leading-relaxed font-light">
        {WHAT_YOU_DONT_SEE.paragraphs.map((paragraph, index) => {
          const isConclusion = index === WHAT_YOU_DONT_SEE.paragraphs.length - 1;

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: (index % 4) * 0.12 }}
              className={
                isConclusion
                  ? "text-rose-warm font-medium text-xl sm:text-2xl pt-6 italic"
                  : "text-candle-light/85"
              }
            >
              {paragraph}
            </motion.p>
          );
        })}
      </div>
    </section>
  );
}
