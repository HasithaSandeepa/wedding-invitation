"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "@/translations";
import { weddingConfig, WeddingConfig } from "@/config/wedding";
import { homecomingConfig } from "@/config/homecoming";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
  config: WeddingConfig;
  isSinhala: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; eventId?: "wedding" | "homecoming" }> = ({ children, eventId = "wedding" }) => {
  const [lang, setLangState] = useState<Language>("si");

  useEffect(() => {
    // Check saved preference or default to Sinhala for traditional Sri Lankan feel
    const saved = localStorage.getItem("wedding_invitation_lang") as Language;
    if (saved === "si" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("wedding_invitation_lang", newLang);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === "si" ? "en" : "si");
  };

  const isSinhala = lang === "si";
  const t = translations[lang];

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        config: eventId === "homecoming" ? homecomingConfig : weddingConfig,
        isSinhala,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
