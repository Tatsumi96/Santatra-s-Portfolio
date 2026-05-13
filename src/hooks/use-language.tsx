"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "fr" | "en" | "mg";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang && ["fr", "en", "mg"].includes(savedLang)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
