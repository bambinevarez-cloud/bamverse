"use client";

import { motion } from "framer-motion";
import { WHAT_I_SAW_IN_YOU } from "@/data/content";
import { Sparkles, Smile, Sun, Heart, Shield, Eye } from "lucide-react";

interface WhatISawInYouProps {
  onHeartFound: (id: number) => void;
  isHeartFound: boolean;
}

export function WhatISawInYou({ onHeartFound, isHeartFound }: WhatISawInYouProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Smile": return <Smile size={18} />;
      case "Sun": return <Sun size={18} />;
      case "Heart": return <Heart size={18} />;
      case "Shield": return <Shield size={18} />;
      case "Eye": return <Eye size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

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
          Capítulo II
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-candle-light mb-4">
          {WHAT_I_SAW_IN_YOU.title}
        </h2>
        <div className="w-12 h-[1px] bg-rose-dusty/40 mx-auto" />
      </motion.div>

      {/* Cuadrícula de Tarjetas Interactivas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {WHAT_I_SAW_IN_YOU.cards.map((card, index) => {
          const isPequitasCard = card.id === "pequitas";

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-space-900/95 via-wine-950/50 to-space-900/80 border border-rose-dusty/15 hover:border-rose-blush/40 backdrop-blur-md shadow-lg hover:shadow-[0_10px_30px_rgba(122,34,59,0.25)] hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
            >
              {/* Luz sutil en hover */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-dusty/0 group-hover:bg-rose-dusty/10 rounded-full blur-xl pointer-events-none transition-colors duration-500" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-full bg-wine-900/60 border border-rose-dusty/30 flex items-center justify-center text-rose-blush group-hover:scale-110 group-hover:border-rose-blush transition-all duration-300">
                    {getIcon(card.icon)}
                  </div>

                  {/* Corazón Secreto #2 escondido discretamente en la tarjeta de pequitas */}
                  {isPequitasCard && (
                    <button
                      onClick={() => onHeartFound(2)}
                      className={`p-1.5 transition-transform duration-300 ${
                        isHeartFound ? "opacity-25" : "opacity-40 hover:opacity-100 hover:scale-125"
                      }`}
                      title="✦"
                      aria-label="Pequita especial"
                    >
                      <div className="w-2 h-2 rounded-full bg-candle-gold shadow-[0_0_8px_#EACCA4]" />
                    </button>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-candle-light mb-3 group-hover:text-rose-warm transition-colors">
                  {card.title}
                </h3>

                <p className="font-sans text-candle-light/85 text-sm sm:text-base leading-relaxed font-light">
                  {card.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
