import React, { useState, ReactNode } from 'react';
import { translations, Translations } from './translations';
import { translateText, getSavedLanguage, saveLanguage } from './languageUtils';
import { LanguageContext, LanguageContextType } from './useLanguage.utils';

export type TranslationParam = string | number | boolean;

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
  const t = (key: string, params?: Record<string, TranslationParam>): string => {
    return translateText(key, language, params);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
