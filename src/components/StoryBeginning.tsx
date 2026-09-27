"use client";

import { motion } from "framer-motion";
import { STORY_BEGINNING } from "@/data/content";
import { Sparkles } from "lucide-react";

export function StoryBeginning() {
  return (
    <section id="story-beginning" className="py-24 px-6 relative z-10 max-w-3xl mx-auto">
      {/* Título de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-rose-dusty font-mono block mb-3">
          Capítulo I
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light mb-6">
          {STORY_BEGINNING.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto mb-6" />
        <p className="font-serif italic text-base sm:text-lg text-candle-gold/90 leading-relaxed max-w-xl mx-auto whitespace-pre-line font-light">
          {STORY_BEGINNING.intro}
        </p>
      </motion.div>

      {/* Los 3 Momentos */}
      <div className="space-y-12 sm:space-y-16">
        {STORY_BEGINNING.moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: index * 0.15 }}
            className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-space-900/90 to-wine-950/40 border border-rose-dusty/15 backdrop-blur-md shadow-xl hover:border-rose-dusty/35 transition-all duration-500 group"
          >
            {/* Destello de fondo sutil */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-dusty/5 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-dusty/10 transition-colors" />

            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-candle-gold" />
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.2em] font-mono text-rose-blush font-semibold">
                {moment.subtitle}
              </h3>
            </div>

            <div className="font-sans text-candle-light/90 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light space-y-3">
              {moment.text}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
