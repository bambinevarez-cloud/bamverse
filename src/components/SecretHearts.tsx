"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface SecretHeartsProps {
  foundHearts: number[];
  latestToast: string | null;
  onOpenSecretSection: () => void;
  allFound: boolean;
}

export function SecretHearts({
  foundHearts,
  latestToast,
  onOpenSecretSection,
  allFound,
}: SecretHeartsProps) {
  return (
    <>
      {/* Contador Flotante Discreto en la Esquina Superior Izquierda */}
      <div className="fixed top-5 left-5 z-50 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-space-900/80 backdrop-blur-md border border-rose-dusty/25 shadow-lg font-mono text-xs text-rose-blush">
          <Heart size={13} className={foundHearts.length > 0 ? "fill-rose-dusty text-rose-dusty" : "text-rose-dusty/60"} />
          <span>{foundHearts.length} / 5</span>
        </div>

        {/* Botón para Abrir Sección Secreta cuando se descubren los 5 */}
        {allFound && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={onOpenSecretSection}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-wine-700 to-rose-dusty border border-rose-blush text-white font-mono text-xs shadow-[0_0_20px_rgba(232,181,195,0.4)] flex items-center gap-1.5 cursor-pointer animate-pulse"
          >
            <span>Abrir ❤️</span>
          </motion.button>
        )}
      </div>

      {/* Toast Flotante cuando se descubre un corazón */}
      <AnimatePresence>
        {latestToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-wine-950/90 border border-rose-blush/40 backdrop-blur-lg shadow-2xl text-center text-rose-warm font-serif text-sm sm:text-base flex items-center gap-2"
          >
            <Heart size={16} className="text-rose-dusty fill-rose-dusty animate-bounce" />
            <span>{latestToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
