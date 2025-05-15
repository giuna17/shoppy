
// This file re-exports everything from the new structure
// to maintain backward compatibility
export * from '../i18n/useLanguage';
export * from '../i18n/translations';
export * from '../i18n/languageUtils';

// Add auth context to avoid circular dependencies
export * from '../contexts/AuthContext';
