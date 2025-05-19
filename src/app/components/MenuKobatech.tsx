"use client";

import { useState, useEffect, JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuKobatechProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const MenuKobatech = ({ isDarkMode, toggleDarkMode }: MenuKobatechProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [animationActive, setAnimationActive] = useState(false);
  const pathname = usePathname();

  // Animation d'entrée
  useEffect(() => {
    setAnimationActive(true);
    const timer = setTimeout(() => setAnimationActive(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Effet de défilement avec parallaxe
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Fermeture automatique du menu lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Calcul des classes dynamiques pour le thème
  const primaryGradient = isDarkMode 
    ? 'from-cyan-500 via-blue-500 to-indigo-600' 
    : 'from-cyan-600 via-blue-600 to-indigo-700';
  
  const accentGradient = isDarkMode
    ? 'from-blue-400 via-cyan-300 to-teal-400'
    : 'from-blue-600 via-cyan-500 to-teal-500';

  const glowEffect = isDarkMode
    ? 'shadow-[0_0_15px_rgba(56,189,248,0.5)]'
    : 'shadow-[0_0_10px_rgba(6,182,212,0.3)]';

  const bgClass = isDarkMode
    ? 'bg-gray-900/90 border-gray-800'
    : 'bg-white/95 border-gray-200';

  const navItems = [
    { name: 'Accueil', href: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Services', href: '/services', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { name: 'Projets', href: '/projets', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
    { name: 'Technologies', href: '/technologies', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Contact', href: '/contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
      ${bgClass} backdrop-blur-lg border-b ${scrolled ? 'py-2' : 'py-4'}`}>
      
      {/* Effet visuel tech - Lignes animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`${isDarkMode ? 'opacity-20' : 'opacity-10'} w-full h-full`}>
          {/* Lignes horizontales */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          
          {/* Lignes verticales décoratives */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          {/* Grid tech pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <nav className="flex justify-between items-center">
          {/* Logo avec animation */}
          <div className="relative z-10">
            <Link 
              href="/" 
              className={`relative flex items-center ${
                animationActive ? 'animate-pulse duration-1000' : ''
              }`}
            >
              {/* Logo Symbol */}
              <div className={`mr-2 h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br ${primaryGradient} ${glowEffect}`}>
                <span className="text-white font-bold text-lg">KB</span>
              </div>
              
              {/* Logo Text */}
              <div className="relative">
                <span className={`text-xl md:text-2xl font-bold relative z-10 text-transparent bg-clip-text bg-gradient-to-r ${primaryGradient}`}>
                  KobaTech
                </span>
                
                {/* Line under logo */}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r ${accentGradient}`}></span>
                
                {/* Tech decoration */}
                <span className="absolute top-0 -right-4 text-xs text-cyan-500 opacity-70">.AI</span>
              </div>
            </Link>
          </div>

          {/* Menu Desktop avec animation hover */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center px-3 py-2 rounded-md text-sm lg:text-base font-medium group transition-all duration-300
                    ${active 
                      ? `${isDarkMode ? 'text-cyan-400 bg-cyan-900/30' : 'text-cyan-600 bg-cyan-50'} ${glowEffect}` 
                      : `${isDarkMode ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-700 hover:text-cyan-600'}`
                    }`}
                  onMouseEnter={() => setHoverIndex(null)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {/* Icon */}
                  <svg 
                    className={`w-4 h-4 mr-1 transition-transform duration-300 ${hoverIndex === null ? 'scale-125' : ''}`} 
                    stroke="currentColor" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                  </svg>
                  
                  {/* Text with animated underline */}
                  <span className="relative">
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${accentGradient} transition-all duration-300 group-hover:w-full
                      ${active ? 'w-full' : ''}`}></span>
                  </span>
                  
                  {/* Tech decorations */}
                  {active && (
                    <span className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-cyan-400 opacity-70 animate-pulse"></span>
                  )}
                  {hoverIndex === null && !active && (
                    <span className="absolute -right-1 -bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-50"></span>
                  )}
                </Link>
              );
            })}
            
            {/* Theme Toggle with upgraded design */}
            <button
              onClick={toggleDarkMode}
              className={`relative ml-2 p-2 rounded-md transition-all duration-500 overflow-hidden
                ${isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'
                } ${glowEffect}`}
              aria-label="Toggle theme"
            >
              <div className="relative z-10 flex items-center justify-center">
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </div>
              
              {/* Ripple animation on click */}
              <span className={`absolute inset-0 rounded-md overflow-hidden ${!isDarkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 hover:opacity-10' : 'bg-gradient-to-br from-yellow-300 to-orange-400 opacity-0 hover:opacity-10'}`}></span>
            </button>
          </div>

          {/* Mobile Menu Button - Advanced */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`relative p-2 rounded-md transition-all duration-300 ${
                isDarkMode 
                  ? `${isMenuOpen ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-300'} hover:bg-gray-800/80` 
                  : `${isMenuOpen ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700'} hover:bg-gray-100`
              } ${isMenuOpen ? glowEffect : ''}`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative flex justify-center items-center">
                <span className={`absolute block w-5 h-0.5 transition-all duration-300 ease-in-out rounded-full ${
                  isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                } ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                
                <span className={`absolute block w-5 h-0.5 transition-all duration-300 ease-in-out rounded-full ${
                  isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                
                <span className={`absolute block w-5 h-0.5 transition-all duration-300 ease-in-out rounded-full ${
                  isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                } ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu - Futuristic Panel */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden relative ${
            isMenuOpen ? 'max-h-screen opacity-100 mt-4 mb-2' : 'max-h-0 opacity-0 mt-0 mb-0'
          }`}
        >
          <div className={`relative rounded-lg ${
            isDarkMode ? 'bg-gray-900/90 border border-gray-800' : 'bg-white/95 border border-gray-200'
          } ${glowEffect} p-1 backdrop-blur-lg`}>
            
            {/* Tech decoration overlays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="absolute top-4 -left-1 w-1 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 opacity-70"></div>
              <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-20"></div>
            </div>
            
            <div className="divide-y divide-gray-800/20">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between p-3 rounded-md transition-all duration-300 ${
                      active 
                        ? `${isDarkMode ? 'bg-cyan-900/30 text-cyan-400' : 'bg-cyan-50 text-cyan-600'} ${glowEffect}` 
                        : `${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                    }`}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 p-1.5 rounded-md ${
                        active 
                          ? `bg-gradient-to-br ${isDarkMode ? 'from-cyan-600 to-blue-800' : 'from-cyan-500 to-blue-700'}`
                          : `${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`
                      }`}>
                        <svg className="w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                        </svg>
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {active && (
                      <span className="block w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                    )}
                  </Link>
                );
              })}
            </div>
            
            {/* Theme Toggle Mobile */}
            <div className="mt-1 p-2 border-t border-gray-800/20">
              <button
                onClick={toggleDarkMode}
                className={`w-full py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-between ${
                  isDarkMode 
                    ? 'bg-gray-800/70 text-gray-200 hover:bg-gray-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 p-1 rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-700 text-yellow-300' 
                      : 'bg-gray-200 text-indigo-600'
                  }`}>
                    {isDarkMode ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{isDarkMode ? 'Mode Clair' : 'Mode Sombre'}</span>
                </div>
                <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full transform transition-transform duration-300 ${
                    isDarkMode 
                      ? 'translate-x-7 bg-yellow-300' 
                      : 'translate-x-1 bg-indigo-600'
                  }`}></div>
                </div>
              </button>
            </div>
            
            {/* Tech Indicator */}
            <div className="flex items-center justify-center p-2 mt-1 text-xs">
              <div className={`px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                isDarkMode ? 'bg-gray-800 text-cyan-400' : 'bg-gray-100 text-cyan-600'
              }`}>
                <span className="block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono">KobaTech AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification Bar - Optional tech element */}
      {scrolled && (
        <div className={`absolute bottom-0 left-0 w-full h-0.5 overflow-hidden ${isDarkMode ? 'opacity-60' : 'opacity-40'}`}>
          <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 animate-gradient-x"></div>
        </div>
      )}
      
      {/* Global Style */}
      <style jsx global>{`
        @keyframes gradient-x {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
        
        @keyframes circuit-animate {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        .circuit-animate {
          animation: circuit-animate 4s ease-in-out infinite;
        }
        
        @keyframes data-flow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        .data-flow {
          animation: data-flow 10s linear infinite;
        }
      `}</style>
    </header>
  );
}

export default MenuKobatech;