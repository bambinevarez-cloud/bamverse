"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SECRET_SECTION } from "@/data/content";
import { X, Heart } from "lucide-react";

interface SecretSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecretSection({ isOpen, onClose }: SecretSectionProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto letter-paper rounded-3xl p-7 sm:p-12 shadow-2xl border border-rose-blush/30"
          >
            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-space-900/60 border border-rose-dusty/30 text-rose-dusty hover:text-white flex items-center justify-center transition-colors"
              aria-label="Cerrar carta secreta"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <Heart size={22} className="text-rose-dusty fill-rose-dusty" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rose-warm">
                {SECRET_SECTION.title}
              </h2>
            </div>

            <div className="w-12 h-[1px] bg-rose-dusty/30 mb-8" />

            <div className="font-sans text-candle-light/95 text-base sm:text-lg leading-relaxed whitespace-pre-line font-light space-y-4">
              {SECRET_SECTION.content}
            </div>

            <div className="mt-10 pt-6 border-t border-rose-dusty/15 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-wine-900/60 hover:bg-wine-800 border border-rose-dusty/40 text-candle-light font-serif text-sm tracking-wider transition-colors"
              >
                Volver a nuestro universo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
