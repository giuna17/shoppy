import { translations } from './translations';

type TranslationParam = string | number | boolean;

/**
 * Translates a key with optional parameters
 */
export const translateText = (
  key: string,
  language: string,
  params?: Record<string, TranslationParam>
): string => {
  if (translations[key] && translations[key][language]) {
    let text = translations[key][language];
    
    // Replace parameters if they exist
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, value.toString());
      });
    }
    
    return text;
  }
  
  // Return key if translation not found
  return key;
};

/**
 * Get saved language from localStorage or return default
 */
export const getSavedLanguage = (): string => {
  return localStorage.getItem('language') || 'ru';
};

/**
 * Save language to localStorage
 */
export const saveLanguage = (language: string): void => {
  localStorage.setItem('language', language);
};
