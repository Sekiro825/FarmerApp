import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    [languageCode: string]: string;
  };
}

const translations: Translations = {
  // Common
  'welcome': {
    en: 'Welcome',
    hi: 'स्वागत',
    ml: 'സ്വാഗതം'
  },
  'home': {
    en: 'Home',
    hi: 'मुख्य',
    ml: 'ഹോം'
  },
  'profile': {
    en: 'Profile',
    hi: 'प्रोफाइल',
    ml: 'പ്രൊഫൈൽ'
  },
  'community': {
    en: 'Community',
    hi: 'समुदाय',
    ml: 'കമ്മ്യൂണിറ്റി'
  },
  // Add more translations as needed
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}