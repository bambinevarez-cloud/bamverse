"use client";

import { useEffect, useRef } from "react";

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const isMobile = width < 768;
    const STAR_COUNT = isMobile ? 85 : 160;

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      color: string;
      speedY: number;
    }

    const stars: Star[] = [];

    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(245, 216, 224, ", // Rosa cálido
      "rgba(234, 204, 164, ", // Luz de vela dorada
      "rgba(217, 138, 158, ", // Rosa viejo
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const baseAlpha = Math.random() * 0.6 + 0.15;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speedY: (Math.random() - 0.5) * 0.15,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.01;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y += star.speedY;

        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        star.alpha = star.baseAlpha + Math.sin(angle * star.twinkleSpeed * 100) * 0.2;
        if (star.alpha < 0.05) star.alpha = 0.05;
        if (star.alpha > 0.9) star.alpha = 0.9;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
