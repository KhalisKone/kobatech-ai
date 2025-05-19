"use client";

import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '../components/ThemeContext';
import { useTheme } from '../components/ThemeContext';
import CurseurFuturiste, { TechCursorRef } from '../components/TechCursor';
import MenuKobatech from '../components/MenuKobatech';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TechnologiesSection from '../components/TechnologiesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import GlobalStyles from '../components/GlobalStyles';

function AccueilKobatechContent() {
  const { isDarkMode, toggleDarkMode, bgClass, textClass, overlayClass } = useTheme();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({
    services: false,
    technologies: false,
    contact: false
  });
  
  // Use the imported TechCursorRef interface with null initial value
  const cursorRef = useRef<TechCursorRef | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        // Mise à jour du curseur avec la progression
        if (cursorRef.current) {
          cursorRef.current.updateProgress(prev + 2);
        }
        
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        return prev + 2;
      });
    }, 50);

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
export default function Page() {
  return (
    <ThemeProvider>
      <AccueilKobatechContent />
    </ThemeProvider>
  );
}