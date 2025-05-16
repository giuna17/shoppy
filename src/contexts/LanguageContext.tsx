// This file re-exports everything from the new structure
// to maintain backward compatibility

// Add auth context to avoid circular dependencies

import { createContext, useContext } from 'react';
import { translations } from '@/i18n/translations';
import { useState } from 'react';

// Пример контекста языка, можно доработать под ваши нужды
const LanguageContext = createContext({
  language: 'ru',
  setLanguage: (lang: string) => {},
  t: (key: string, params?: Record<string, any>) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('ru');

  const t = (key: string, params?: Record<string, any>) => {
    const entry = translations[key];
    if (!entry) return key;
    let text = entry[language] || entry['ru'] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export { LanguageContext };
