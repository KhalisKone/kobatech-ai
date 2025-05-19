"use client";

import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '../../../components/ThemeContext';
import { useTheme } from '../../../components/ThemeContext';
import CurseurFuturiste from '../../../components/TechCursor';
import MenuKobatech from '../../../components/MenuKobatech';
import HeroSection from '../../../components/HeroSection';
import ServicesSection from '../../../components/ServicesSection';
import TechnologiesSection from '../../../components/TechnologiesSection';
import ContactSection from '../../../components/ContactSection';
import Footer from '../../../components/Footer';
import ParticleBackground from '../../../components/ParticleBackground';
import GlobalStyles from '../../../components/GlobalStyles';

// Define the interface for the CurseurFuturiste component ref
interface CurseurFuturisteRef {
  updateProgress: (progress: number) => void;
}

// Composant interne qui utilise le contexte
function AccueilKobatechContent() {
  const { isDarkMode, toggleDarkMode, bgClass, textClass, overlayClass } = useTheme();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({
    services: false,
    technologies: false,
    contact: false
  });
  
  // Use the defined interface for the ref
  const cursorRef = useRef<CurseurFuturisteRef>(null);
  
  // Effet pour animer la barre de chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 1;
        if (cursorRef.current) {
          cursorRef.current.updateProgress(newProgress);
        }
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);
  
  // Effet de détection de visibilité pour les animations à l'entrée
  useEffect(() => {
    const handleScroll = () => {
      const checkVisibility = (sectionId: string, key: keyof typeof isVisible) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.75;
          
          if (isInView && !isVisible[key]) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        }
      };
      
      checkVisibility('services', 'services');
      checkVisibility('technologies', 'technologies');
      checkVisibility('contact', 'contact');
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);
  
  return (
    <div className={`relative ${bgClass} min-h-screen overflow-x-hidden font-sans ${textClass}`}>
      {/* Animation de fond avec particules */}
      <ParticleBackground isDarkMode={isDarkMode} />
      
      {/* Overlay avec gradient */}
      <div className={`fixed inset-0 bg-gradient-to-b ${overlayClass} z-0`}></div>
      
      {/* Navigation principale */}
      <MenuKobatech 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      {/* Section Hero */}
      <HeroSection onScroll={() => {
        // Implement scroll functionality here or remove if not needed
        console.log('Hero section scrolled');
      }} />
      
      {/* Section Services */}
      <ServicesSection 
        id="services" 
        title="Nos Services" 
        isVisible={isVisible.services}
      />
      
      {/* Section Technologies */}
      <TechnologiesSection 
        id="technologies" 
        title="Nos Technologies" 
        isVisible={isVisible.technologies} 
      />
      
      {/* Section Contact */}
      <ContactSection 
        id="contact" 
        title="Contactez-nous" 
        isVisible={isVisible.contact} 
      />
      
      {/* Footer */}
      <Footer />
      
      {/* Curseur personnalisé */}
      <CurseurFuturiste ref={cursorRef} progress={loadingProgress} />
      
      {/* Styles globaux */}
      <GlobalStyles />
    </div>
  );
}

// Composant principal qui englobe le contenu avec le ThemeProvider
export default function AccueilKobatech() {
  return (
    <ThemeProvider>
      <AccueilKobatechContent />
    </ThemeProvider>
  );
}