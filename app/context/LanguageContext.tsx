import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { translations, type Language, type TranslationSchema } from "../i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("language") as Language | null;
      if (stored === "de" || stored === "en") {
        setLanguageState(stored);
      }
    } catch (e) {}
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang;
    } catch (e) {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const nextLang = prev === "en" ? "de" : "en";
      try {
        localStorage.setItem("language", nextLang);
        document.documentElement.lang = nextLang;
      } catch (e) {}
      return nextLang;
    });
  }, []);

  const value: LanguageContextType = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    }),
    [language, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      language: "en",
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: translations.en,
    };
  }
  return context;
}
