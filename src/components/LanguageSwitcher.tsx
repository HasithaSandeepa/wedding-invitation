"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Invitation language"
      className={`inline-flex items-center p-1 rounded-full bg-parchment-50/90 border border-gold-antique/40 shadow-gold-sm backdrop-blur-md ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("si")}
        aria-pressed={lang === "si"}
        className={`px-3.5 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
          lang === "si"
            ? "bg-gradient-to-r from-gold-antique to-gold-deep text-parchment-50 shadow-sm"
            : "text-gold-deep hover:text-ink-charcoal"
        }`}
      >
        සිංහල
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3.5 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
          lang === "en"
            ? "bg-gradient-to-r from-gold-antique to-gold-deep text-parchment-50 shadow-sm"
            : "text-gold-deep hover:text-ink-charcoal"
        }`}
      >
        English
      </button>
    </div>
  );
};
