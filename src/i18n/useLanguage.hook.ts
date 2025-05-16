import { useContext } from 'react';
import { LanguageContextType, LanguageContext } from './useLanguage.utils';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 