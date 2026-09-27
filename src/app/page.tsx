"use client";

import { useState, useEffect, useRef } from "react";
import { AmbientCanvas } from "@/components/AmbientCanvas";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Hero } from "@/components/Hero";
import { RelationshipCounter } from "@/components/RelationshipCounter";
import { StoryBeginning } from "@/components/StoryBeginning";
import { WhatISawInYou } from "@/components/WhatISawInYou";
import { WhatYouMakeMeFeel } from "@/components/WhatYouMakeMeFeel";
import { SecretLetters } from "@/components/SecretLetters";
import { WhatYouDontSee } from "@/components/WhatYouDontSee";
import { HowISeeYou } from "@/components/HowISeeYou";
import { MyFears } from "@/components/MyFears";
import { Dreams } from "@/components/Dreams";
import { EndlessLetter } from "@/components/EndlessLetter";
import { FinalQuestion } from "@/components/FinalQuestion";
import { Ending } from "@/components/Ending";
import { SecretHearts } from "@/components/SecretHearts";
import { SecretSection } from "@/components/SecretSection";
import { Whispers } from "@/components/Whispers";
import { SECRET_HEARTS_DATA } from "@/data/content";

export default function Home() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.4);
  const [foundHearts, setFoundHearts] = useState<number[]>([]);
  const [latestToast, setLatestToast] = useState<string | null>(null);
  const [isSecretSectionOpen, setIsSecretSectionOpen] = useState(false);

  const endingRef = useRef<HTMLDivElement | null>(null);

  // Cargar progreso de corazones desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bamverse_hearts");
      if (saved) {
        setFoundHearts(JSON.parse(saved));
      }
    } catch {
      // LocalStorage seguro
    }
  }, []);

  // Manejar el hallazgo de un corazón secreto
  const handleHeartFound = (id: number) => {
    if (foundHearts.includes(id)) {
      // Ya fue encontrado antes
      const heartItem = SECRET_HEARTS_DATA.find((h) => h.id === id);
      if (heartItem) showToast(heartItem.text);
      return;
    }

    const updated = [...foundHearts, id];
    setFoundHearts(updated);
    try {
      localStorage.setItem("bamverse_hearts", JSON.stringify(updated));
    } catch {
      // LocalStorage seguro
    }

    const heartItem = SECRET_HEARTS_DATA.find((h) => h.id === id);
    if (heartItem) {
      showToast(heartItem.text);
    }
  };

  const showToast = (message: string) => {
    setLatestToast(message);
    setTimeout(() => {
      setLatestToast(null);
    }, 4500);
  };

  // Iniciar experiencia desde la portada
  const handleStartExperience = () => {
    setIsPlayingMusic(true);
    const storySection = document.getElementById("story-beginning");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Atenuación suave de la música al llegar al final de la experiencia
  useEffect(() => {
    const handleScroll = () => {
      if (!endingRef.current) return;
      const rect = endingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Si la sección final está visible en pantalla, bajar el volumen gradualmente
      if (rect.top < windowHeight && rect.bottom > 0) {
        const factor = Math.max(0.12, Math.min(0.4, (rect.top / windowHeight) * 0.4));
        setMusicVolume(factor);
      } else {
        setMusicVolume(0.4);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-space-950 overflow-x-hidden selection:bg-wine-800 selection:text-white">
      {/* Fondo de estrellas y partículas dinámicas */}
      <AmbientCanvas />

      {/* Controlador de Música */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
        volume={musicVolume}
        onVolumeChange={setMusicVolume}
      />

      {/* Sistema de 5 Corazones Secretos */}
      <SecretHearts
        foundHearts={foundHearts}
        latestToast={latestToast}
        onOpenSecretSection={() => setIsSecretSectionOpen(true)}
        allFound={foundHearts.length === 5}
      />

      {/* Modal de Sección Secreta */}
      <SecretSection
        isOpen={isSecretSectionOpen}
        onClose={() => setIsSecretSectionOpen(false)}
      />

      {/* Pensamientos íntimos flotantes esporádicos */}
      <Whispers />

      {/* 1. Portada */}
      <Hero
        onStart={handleStartExperience}
        onHeartFound={handleHeartFound}
        isHeartFound={foundHearts.includes(1)}
      />

      {/* Contador de la Historia */}
      <RelationshipCounter />

      {/* 2. Cómo empezó todo */}
      <StoryBeginning />

      {/* 3. Lo que vi en ti */}
      <WhatISawInYou
        onHeartFound={handleHeartFound}
        isHeartFound={foundHearts.includes(2)}
      />

      {/* 4. Lo que provocas en mí */}
      <WhatYouMakeMeFeel />

      {/* 5. Cosas que nunca te digo */}
      <SecretLetters
        onHeartFound={handleHeartFound}
        isHeartFound={foundHearts.includes(3)}
      />

      {/* 6. Lo que tú no ves */}
      <WhatYouDontSee />

      {/* 7. Si pudiera enseñarte cómo te veo (Fotografía Central de Pecosa) */}
      <HowISeeYou
        onHeartFound={handleHeartFound}
        isHeartFound={foundHearts.includes(4)}
      />

      {/* 8. Mis miedos */}
      <MyFears />

      {/* 9. Lo que sueño contigo */}
      <Dreams />

      {/* 10. Una carta que no termina */}
      <EndlessLetter />

      {/* 11. La pregunta */}
      <FinalQuestion />

      {/* 12. Final */}
      <div ref={endingRef}>
        <Ending
          onHeartFound={handleHeartFound}
          isHeartFound={foundHearts.includes(5)}
        />
      </div>
    </main>
  );
}
