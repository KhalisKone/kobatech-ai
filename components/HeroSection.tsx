"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeContext';

type HeroSectionProps = {
  onScroll: () => void;
};

const HeroSection = ({ onScroll }: HeroSectionProps) => {
  const { isDarkMode, subTextClass } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Effet de parallaxe pour le hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Effet parallaxe sur l'élément hero
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        heroRef.current.style.opacity = `${1 - scrollPosition / 800}`;
      }
      
      // Appel de la fonction de défilement du parent
      onScroll();
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);
  
  return (
    <section className="relative min-h-screen flex items-center z-10 overflow-hidden" id="accueil">
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              style={{
                background: isDarkMode 
                  ? "linear-gradient(90deg, #ffffff, #00e5ff)" 
                  : "linear-gradient(90deg, #1e3a8a, #0891b2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: isDarkMode 
                  ? "0 0 40px rgba(0, 229, 255, 0.3)" 
                  : "0 0 40px rgba(8, 145, 178, 0.2)"
              }}
            >
              L'innovation <br/>
              <span className={isDarkMode ? "text-cyan-400" : "text-cyan-600"}>redéfinie.</span>
            </h1>
            
            <p className={`${subTextClass} text-lg mb-8 max-w-lg`}>
              Bienvenue chez KobaTech, où la technologie rencontre l'excellence pour propulser votre entreprise vers l'avenir.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className={`py-3 px-8 ${
                isDarkMode 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600" 
                  : "bg-gradient-to-r from-cyan-600 to-blue-700"
              } rounded-lg font-medium hover:shadow-glow transition-all duration-300 text-white`}>
                Découvrir
              </button>
              <button className={`py-3 px-8 border ${
                isDarkMode 
                  ? "border-cyan-500/30 hover:bg-cyan-500/10" 
                  : "border-cyan-700/30 hover:bg-cyan-700/10"
              } rounded-lg font-medium transition-all duration-300`}>
                En savoir plus
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative" ref={heroRef}>
            {/* Conteneur pour le logo avec effets */}
            <div className="relative">
              {/* Cercles lumineux */}
              <div className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(0, 229, 255, 0.6) 0%, rgba(0, 0, 0, 0) 70%)' 
                    : 'radial-gradient(circle, rgba(8, 145, 178, 0.6) 0%, rgba(255, 255, 255, 0) 70%)',
                  animation: 'pulse 4s ease-in-out infinite alternate'
                }}
              />
              
              {/* Anneaux rotatifs */}
              <div className={`absolute inset-0 rounded-full border ${
                isDarkMode ? "border-cyan-500/20" : "border-cyan-700/20"
              }`}
                style={{ animation: 'rotate 15s linear infinite' }}
              />
              <div className={`absolute inset-8 rounded-full border ${
                isDarkMode ? "border-cyan-500/20" : "border-cyan-700/20"
              }`}
                style={{ animation: 'rotate 25s linear infinite reverse' }}
              />
              
              {/* Logo KobaTech avec animation flottante */}
              <div className={`aspect-square w-full max-w-lg mx-auto ${
                isDarkMode 
                  ? "bg-gradient-to-br from-transparent to-cyan-900/20" 
                  : "bg-gradient-to-br from-transparent to-cyan-700/10" 
              } rounded-full flex items-center justify-center`}>
                <div className="w-3/4 h-3/4 relative flex items-center justify-center" 
                     style={{ animation: 'float 6s ease-in-out infinite' }}>
                  <div className={`absolute w-full h-full rounded-full ${
                    isDarkMode ? "bg-blue-500/10" : "bg-blue-700/5"
                  }`} style={{ animation: 'pulse 4s ease-in-out infinite' }}></div>
                  <Image 
                    src="/logo.png" 
                    alt="KobaTech Logo" 
                    width={280} 
                    height={280}
                    className="drop-shadow-glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className={`${subTextClass} text-sm mb-2`}>Découvrez</p>
        <div className={`w-6 h-10 border-2 ${
          isDarkMode ? "border-cyan-500/50" : "border-cyan-700/50"
        } rounded-full flex items-start justify-center p-1`}>
          <div className={`w-2 h-2 ${
            isDarkMode ? "bg-cyan-400" : "bg-cyan-600"
          } rounded-full animate-scroll-down`}></div>
        </div>
      </div>
      
      {/* Ligne de séparation avec gradient */}
      <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${
        isDarkMode 
          ? "via-cyan-500/50" 
          : "via-cyan-700/50"
      } to-transparent`}></div>
    </section>
  );
};

export default HeroSection;