"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHISPER_THOUGHTS } from "@/data/content";

export function Whispers() {
  const [currentWhisper, setCurrentWhisper] = useState<string | null>(null);

  useEffect(() => {
    // Intervalo aleatorio para mostrar un pensamiento fugaz
    const showRandomWhisper = () => {
      const thought = WHISPER_THOUGHTS[Math.floor(Math.random() * WHISPER_THOUGHTS.length)];
      setCurrentWhisper(thought);

      setTimeout(() => {
        setCurrentWhisper(null);
      }, 4500);
    };

    // Primera aparición tras 15 segundos
    const initialTimeout = setTimeout(showRandomWhisper, 15000);
    const interval = setInterval(showRandomWhisper, 28000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
      <AnimatePresence>
        {currentWhisper && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 0.85, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-2 rounded-full bg-space-950/80 border border-rose-dusty/25 backdrop-blur-md shadow-lg text-xs md:text-sm font-serif italic text-candle-gold/90"
          >
            {currentWhisper}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
