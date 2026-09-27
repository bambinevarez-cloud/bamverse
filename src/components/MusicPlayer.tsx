"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";
import { SITE_CONFIG } from "@/config/config";

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

export function MusicPlayer({ isPlaying, onTogglePlay, volume, onVolumeChange }: MusicPlayerProps) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Sintetizador de Piano y Acordes Románticos Ambientales
  // Si no hay un MP3 externo, este sintetizador produce una progresión armónica íntima y hermosa
  useEffect(() => {
    if (SITE_CONFIG.audio.customAudioPath) {
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio(SITE_CONFIG.audio.customAudioPath);
        audioElementRef.current.loop = true;
      }
      audioElementRef.current.volume = volume;
      if (isPlaying) {
        audioElementRef.current.play().catch(() => {});
      } else {
        audioElementRef.current.pause();
      }
      return;
    }

    // Usar Web Audio API nativo
    if (!isPlaying) {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
      return;
    }

    const initAudio = async () => {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      }

      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }

      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(volume * 0.18, audioCtxRef.current.currentTime);
      }

      // Progresión romántica íntima: Dmaj9 -> Bm9 -> Gmaj7 -> Aadd9
      const chordProgression = [
        [146.83, 220.00, 293.66, 369.99, 440.00], // Dmaj9
        [123.47, 185.00, 246.94, 293.66, 369.99], // Bm9
        [98.00, 146.83, 196.00, 246.94, 293.66],  // Gmaj7
        [110.00, 164.81, 220.00, 277.18, 329.63], // Aadd9
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!isPlaying || !audioCtxRef.current || !gainNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const chord = chordProgression[chordIndex];
        const now = ctx.currentTime;

        chord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = noteIdx === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, now + noteIdx * 0.12);

          const noteTime = now + noteIdx * 0.12;
          noteGain.gain.setValueAtTime(0.001, noteTime);
          noteGain.gain.exponentialRampToValueAtTime(0.07, noteTime + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 5.5);

          osc.connect(noteGain);
          noteGain.connect(gainNodeRef.current!);

          osc.start(noteTime);
          osc.stop(noteTime + 5.5);
        });

        chordIndex = (chordIndex + 1) % chordProgression.length;
        loopTimeoutRef.current = setTimeout(playChord, 5200);
      };

      playChord();
    };

    initAudio();

    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, [isPlaying]);

  // Actualizar volumen dinámicamente
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = volume;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume * 0.18, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <div
        className="relative flex items-center bg-space-900/80 backdrop-blur-md border border-rose-dusty/20 rounded-full p-1.5 shadow-lg shadow-black/50 transition-all duration-300"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full flex items-center justify-center text-rose-blush hover:text-white transition-colors"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
          aria-label="Control de música"
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>

        {showVolumeSlider && (
          <div className="flex items-center gap-2 px-2 pr-3 animate-in fade-in duration-200">
            <button
              onClick={() => onVolumeChange(volume === 0 ? 0.4 : 0)}
              className="text-candle-gold hover:text-white"
            >
              {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-wine-900 rounded-lg appearance-none cursor-pointer accent-rose-dusty"
              aria-label="Volumen de la música"
            />
          </div>
        )}
      </div>
    </div>
  );
}
