"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handlePlayMusic = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Audio autoplay prevented or error:", err);
          });
      }
    };

    window.addEventListener("wedding:play-music", handlePlayMusic);
    return () => {
      window.removeEventListener("wedding:play-music", handlePlayMusic);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Audio play error:", err);
        });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/golden-poruwa/music.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? t.music.pause : t.music.play}
        aria-pressed={isPlaying}
        className="fixed bottom-24 right-3 z-[500] grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 sm:right-5"
        style={{
          background: "linear-gradient(150deg, #D8B45F, #B98A2F 55%, #8C6420)",
          color: "#FDF8EC",
          boxShadow: "0 10px 22px -10px rgba(120,86,30,0.7), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        {isPlaying ? (
          <Volume2 className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <VolumeX className="h-[18px] w-[18px]" aria-hidden="true" />
        )}
      </button>
    </>
  );
};
