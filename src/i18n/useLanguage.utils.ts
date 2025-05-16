import { createContext } from 'react';
import type { TranslationParam } from './useLanguage';

export type { TranslationParam };

export type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, params?: Record<string, TranslationParam>) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined); 