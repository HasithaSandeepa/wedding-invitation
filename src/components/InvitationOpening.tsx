"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

interface InvitationOpeningProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const InvitationOpening: React.FC<InvitationOpeningProps> = ({ isOpen, onOpen }) => {
  const { lang, setLang, t, config, isSinhala } = useLanguage();
  const [closing, setClosing] = useState(false);

  if (isOpen) return null;

  const handleOpen = () => {
    // Trigger audio playback immediately on user click gesture
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding:play-music"));
    }
    setClosing(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <div
      aria-hidden="false"
      data-lp-gate=""
      className={`fixed inset-0 z-[900] grid place-items-center overflow-hidden transition-opacity duration-700 ${
        closing ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{
        backgroundColor: "#F5EEDF",
        backgroundImage: "url(/lotus-mandala/texture.webp)",
        backgroundRepeat: "repeat",
        backgroundSize: "450px 800px",
      }}
    >
      {/* Background Mandala Mask */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: 0.16 }}>
        <div className="absolute top-1/2 right-0 h-[200vw] w-[200vw] -translate-y-1/2 translate-x-1/2 md:right-auto md:left-1/2 md:h-[min(150vw,900px)] md:w-[min(150vw,900px)] md:-translate-x-1/2">
          <div className="gpd-mandala" />
        </div>
      </div>

      {/* Opening Invitation Box Content */}
      <div className="relative flex flex-col items-center px-8 text-center z-10">
        {/* Lotus Flourish Top Motif */}
        <div
          className="gpd-flourish"
          style={{
            width: "min(56vw, 260px)",
            height: "min(20vw, 94px)",
          }}
          aria-hidden="true"
        />

        {/* Title */}
        <p className="mt-7" aria-label="සාදර ඇරයුමයි !">
          <span
            style={{
              fontFamily: "var(--font-sinhala)",
              fontSize: "clamp(1.7rem, 7vw, 2.8rem)",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#8C6420",
            }}
          >
            {isSinhala ? "සාදර ඇරයුමයි !" : "Cordially Invited !"}
          </span>
        </p>

        {/* Couple Names */}
        <p className="mt-4" style={{ fontSize: "clamp(1.4rem, 5.5vw, 2.1rem)" }}>
          <span style={{ color: "#B98A2F", fontWeight: 700, fontFamily: "var(--font-sinhala)" }}>
            {isSinhala ? config.couple.groom.nameOnlySi : config.couple.groom.firstNameEn}
          </span>
          <span style={{ margin: "0 0.5rem", color: "#8C6420", fontFamily: "var(--font-sinhala)" }}>
            {isSinhala ? "සහ" : "and"}
          </span>
          <span style={{ color: "#B98A2F", fontWeight: 700, fontFamily: "var(--font-sinhala)" }}>
            {isSinhala ? config.couple.bride.nameOnlySi : config.couple.bride.firstNameEn}
          </span>
        </p>

        {/* Open Button */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open invitation"
          className="mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-2 text-[1.1rem] transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{
            fontFamily: "var(--font-sinhala)",
            fontWeight: 700,
            color: "#FDF8EC",
            background: "linear-gradient(135deg, #B98A2F, #8C6420)",
            boxShadow: "0 12px 24px -12px rgba(120,86,30,0.7)",
          }}
        >
          {isSinhala ? "විවෘත කරන්න" : "Open Invitation"}
        </button>

        {/* Language Switcher */}
        <div
          className="flex items-center gap-0.5 rounded-full p-1 mt-6"
          role="group"
          aria-label="Invitation language"
          style={{
            background: "rgba(255, 253, 246, 0.9)",
            border: "1px solid rgba(185, 138, 47, 0.45)",
            boxShadow: "0 10px 24px -12px rgba(120,86,30,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <button
            type="button"
            onClick={() => setLang("si")}
            aria-pressed={lang === "si"}
            className="rounded-full px-3.5 py-1 text-[0.82rem] font-bold transition-colors"
            style={{
              background: lang === "si" ? "linear-gradient(135deg, #B98A2F, #8C6420)" : "transparent",
              color: lang === "si" ? "#FDF8EC" : "#8C6420",
            }}
          >
            සිං
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className="rounded-full px-3.5 py-1 text-[0.82rem] font-bold transition-colors"
            style={{
              background: lang === "en" ? "linear-gradient(135deg, #B98A2F, #8C6420)" : "transparent",
              color: lang === "en" ? "#FDF8EC" : "#8C6420",
            }}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};
