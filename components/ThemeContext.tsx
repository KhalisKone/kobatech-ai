"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

// Définition du type pour le contexte
type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textClass: string;
  subTextClass: string;
  gradientText: string;
  overlayClass: string;
  bgClass: string;
};

// Création du contexte avec des valeurs par défaut
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  textClass: 'text-gray-900',
  subTextClass: 'text-gray-600',
  gradientText: 'bg-gradient-to-r from-cyan-600 to-blue-800',
  overlayClass: 'from-white/70 via-white/40 to-white/90',
  bgClass: 'bg-white'
});

// Props pour le provider
type ThemeProviderProps = {
  children: ReactNode;
};

// Provider du contexte
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Classes dynamiques selon le mode clair/sombre
  const bgClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const gradientText = isDarkMode 
    ? 'bg-gradient-to-r from-cyan-400 to-blue-600' 
    : 'bg-gradient-to-r from-cyan-600 to-blue-800';
  const overlayClass = isDarkMode 
    ? 'from-black/70 via-black/40 to-black/90' 
    : 'from-white/70 via-white/40 to-white/90';
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        textClass,
        subTextClass,
        gradientText,
        overlayClass,
        bgClass
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook pour utiliser le contexte
export const useTheme = () => useContext(ThemeContext);