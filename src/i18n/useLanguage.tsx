import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Translations } from './translations';
import { translateText, getSavedLanguage, saveLanguage } from './languageUtils';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Check for saved language or use Russian as default
  const [language, setLanguage] = useState<string>(
    () => getSavedLanguage()
  );

  const handleSetLanguage = (lang: string) => {
    saveLanguage(lang);
    setLanguage(lang);
  };

  // Add translation function with parameter support
  const t = (key: string, params?: Record<string, any>): string => {
    return translateText(key, language, params);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Re-export translations for direct access if needed
export { translations };
export type { Translations };
