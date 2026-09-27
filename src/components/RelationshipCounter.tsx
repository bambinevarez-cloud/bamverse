"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/config";

// Fecha oficial de inicio de la relación: 1 de junio de 2026 a las 00:00:00
export const RELATIONSHIP_START = new Date(SITE_CONFIG.relationshipStartDate || "2026-06-01T00:00:00");

export function RelationshipCounter() {
  const [mounted, setMounted] = useState(false);
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const now = new Date();
      // Comparar la fecha actual del dispositivo con el 1 de junio de 2026
      const diff = Math.max(0, now.getTime() - RELATIONSHIP_START.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimePassed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-xl mx-auto"
      >
        <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-rose-dusty mb-3 font-mono">
          Llevamos escribiendo esta historia…
        </p>

        {/* Cuatro bloques de tiempo con separadores discretos */}
        <div className="flex items-center justify-center gap-2 sm:gap-5 my-6 max-w-full">
          {/* DÍAS */}
          <div className="flex flex-col items-center min-w-[55px] sm:min-w-[70px]">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-candle-light tracking-tight">
              {mounted ? timePassed.days : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-dusty/80 mt-1 font-mono">
              días
            </span>
          </div>

          <span className="font-serif text-lg sm:text-2xl text-rose-dusty/40 mb-4 sm:mb-5 select-none">:</span>

          {/* HORAS */}
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-candle-light tracking-tight">
              {mounted ? String(timePassed.hours).padStart(2, "0") : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-dusty/80 mt-1 font-mono">
              horas
            </span>
          </div>

          <span className="font-serif text-lg sm:text-2xl text-rose-dusty/40 mb-4 sm:mb-5 select-none">:</span>

          {/* MINUTOS */}
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-candle-light tracking-tight">
              {mounted ? String(timePassed.minutes).padStart(2, "0") : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-dusty/80 mt-1 font-mono">
              minutos
            </span>
          </div>

          <span className="font-serif text-lg sm:text-2xl text-rose-dusty/40 mb-4 sm:mb-5 select-none">:</span>

          {/* SEGUNDOS */}
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-candle-gold tracking-tight">
              {mounted ? String(timePassed.seconds).padStart(2, "0") : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-dusty/80 mt-1 font-mono">
              segundos
            </span>
          </div>
        </div>

        <p className="font-serif italic text-base sm:text-lg text-candle-gold/85 font-light">
          “Y todavía siento que apenas estamos comenzando.”
        </p>
      </motion.div>
    </section>
  );
}
