"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { isDarkMode, subTextClass, gradientText } = useTheme();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation du texte pour le copyright
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentYear(date.getFullYear());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Effet de suivi de souris pour les effets lumineux
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Counting animation for stats
  const stats = [
    { label: "Projets", value: 150, icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Clients", value: 50, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { label: "Équipe", value: 25, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
      color: isDarkMode ? "from-cyan-500 to-blue-600" : "from-blue-500 to-indigo-600"
    },
    { 
      name: "LinkedIn", 
      icon: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0Cn-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
      color: isDarkMode ? "from-cyan-400 to-emerald-500" : "from-blue-400 to-teal-500"
    },
    { 
      name: "Twitter", 
      icon: "M24 4.557c-.883.392 dieta-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
      color: isDarkMode ? "from-cyan-400 to-blue-700" : "from-blue-400 to-sky-600"
    },
    { 
      name: "GitHub", 
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      color: isDarkMode ? "from-purple-500 to-cyan-500" : "from-indigo-500 to-blue-500"
    }
  ];
  
  const glowVariants = {
    idle: {
      opacity: 0.3,
      scale: 1,
    },
    hover: {
      opacity: 0.8,
      scale: 1.5,
      transition: { duration: 0.5 }
    }
  };

  // Counting animation component
  const Counter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
      }
    }, [inView, end, duration]);

    return <span ref={ref}>{count}+</span>;
  };
  
  return (
    <footer 
      ref={footerRef} 
      className={`relative z-10 py-16 border-t overflow-hidden ${isDarkMode ? "border-gray-800 bg-gradient-to-b from-gray-900 to-black" : "border-gray-200 bg-gradient-to-b from-white to-gray-50"}`}
    >
      {/* Effet de lumière qui suit la souris */}
      <div 
        className={`pointer-events-none absolute opacity-30 rounded-full blur-3xl ${
          isDarkMode ? "bg-cyan-600" : "bg-blue-600"
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '300px',
          height: '300px',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Particules décoratives plus technologiques */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const delay = Math.random() * 5;
          const duration = Math.random() * 15 + 15;
          const initialLeft = Math.random() * 100;
          
          return (
            <motion.div 
              key={i}
              className={`absolute rounded-full ${
                isDarkMode 
                  ? Math.random() > 0.5 ? 'bg-cyan-400' : 'bg-blue-500' 
                  : Math.random() > 0.5 ? 'bg-blue-400' : 'bg-indigo-500'
              }`}
              initial={{ opacity: 0.1, y: Math.random() * 100, x: initialLeft + '%' }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -100, 0],
                x: [`${initialLeft}%`, `${initialLeft + (Math.random() * 10 - 5)}%`, `${initialLeft}%`]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: duration, 
                delay: delay,
                ease: "easeInOut"
              }}
              style={{
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
      </div>
      
      {/* Grille de circuit imprimé décorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`h-full w-full opacity-5 ${isDarkMode ? "bg-grid-dark" : "bg-grid-light"}`}></div>
      </div>
      
      {/* Ligne décorative supérieure avec effet d'éclaircissement amélioré */}
      <div className="relative w-full h-px mb-12">
        <motion.div 
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 ${
            isDarkMode 
              ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent" 
              : "bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          }`}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            width: ["50%", "70%", "50%"]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Logo et info - plus de sophistication */}
          <motion.div 
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6 relative">
              <motion.div 
                className={`absolute inset-0 rounded-full ${
                  isDarkMode ? "bg-cyan-500/30" : "bg-blue-500/20"
                }`} 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "blur(15px)" }}
              ></motion.div>
              
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: isDarkMode 
                      ? "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(8,145,178,0) 70%)" 
                      : "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)",
                    filter: "blur(10px)"
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Image 
                  src="/logo.png" 
                  alt="KobaTech Logo" 
                  width={70} 
                  height={70}
                  className="mr-4 drop-shadow-glow relative z-10"
                />
              </div>
              
              <div>
                <motion.h3 
                  className={`text-3xl font-bold text-transparent bg-clip-text ${gradientText}`}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  KobaTech
                </motion.h3>
                <div className="flex items-center">
                  <motion.span 
                    className={`inline-block w-2 h-2 rounded-full ${isDarkMode ? "bg-cyan-500" : "bg-blue-500"} mr-2`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.span>
                  <p className={`text-sm ${subTextClass} font-light`}>Innovation & Excellence</p>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="relative px-6 py-4 rounded-lg mb-6 max-w-md" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className={`absolute inset-0 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-gray-100/70"
              } backdrop-blur-sm`}></div>
              <div className={`absolute inset-0 rounded-lg opacity-30 ${
                isDarkMode 
                ? "bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-800/30" 
                : "bg-gradient-to-br from-blue-100 to-indigo-100/30 border border-blue-200/50"
              }`}></div>
              
              <p className={`${subTextClass} text-sm relative z-10 md:text-left leading-relaxed`}>
                Solutions technologiques innovantes pour entreprises visionnaires. Nous transformons vos idées en réalités numériques avec une expertise de pointe.
              </p>
            </motion.div>
            
            {/* Statistiques avec compteurs animés */}
            <div className="grid grid-cols-3 gap-4 w-full mt-2">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`flex flex-col items-center py-2 px-2 rounded-lg relative ${
                    isDarkMode ? "bg-gray-800/30" : "bg-white/50"
                  } backdrop-blur-sm border ${
                    isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  <svg 
                    className={`w-5 h-5 mb-1 ${
                      isDarkMode ? "text-cyan-400" : "text-blue-500"
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                  <span className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}>
                    <Counter end={stat.value} />
                  </span>
                  <span className={`text-xs ${subTextClass}`}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Réseaux sociaux - versions beaucoup plus tech et sophistiquées */}
          <motion.div 
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h4 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-gray-200" : "text-gray-700"} flex items-center`}>
              <motion.span 
                className={`inline-block w-2 h-6 rounded ${isDarkMode ? "bg-cyan-500" : "bg-blue-500"} mr-3`}
                animate={{ height: ["24px", "12px", "24px"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              ></motion.span>
              Suivez-nous
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={social.name}
                  href="#" 
                  className="relative group"
                  onMouseEnter={() => setHoverItem(social.name)}
                  onMouseLeave={() => setHoverItem(null)}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <motion.div 
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20`}
                    variants={glowVariants}
                    initial="idle"
                    animate={hoverItem === social.name ? "hover" : "idle"}
                    style={{ filter: "blur(10px)" }}
                  />
                  
                  <div className={`flex items-center p-3 rounded-xl ${
                    isDarkMode 
                      ? "bg-gray-800/80 border border-gray-700 group-hover:border-cyan-800" 
                      : "bg-white border border-gray-200 group-hover:border-blue-200"
                  } transition-colors duration-300`}>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      isDarkMode 
                        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
                        : "bg-gradient-to-br from-gray-50 to-white"
                    } mr-3 relative overflow-hidden group-hover:shadow-lg transition-all duration-300`}>
                      
                      <motion.div 
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${social.color}`}
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <svg 
                        viewBox="0 0 24 24" 
                        width="18" 
                        height="18" 
                        stroke="currentColor" 
                        fill="currentColor" 
                        className={`relative z-10 transition-colors duration-300 ${
                          isDarkMode
                            ? `text-gray-400 group-hover:text-white`
                            : `text-gray-600 group-hover:text-white`
                        }`}
                      >
                        <path d={social.icon} />
                      </svg>
                    </div>
                    
                    <div>
                      <span className={`block text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>{social.name}</span>
                      <span className={`text-xs ${subTextClass}`}>
                        Suivre
                        <motion.span 
                          className={`inline-block w-1 h-1 rounded-full ml-1 ${
                            isDarkMode ? "bg-cyan-500" : "bg-blue-500"
                          }`}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                        />
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Newsletter avec animation */}
            <motion.div 
              className={`mt-8 p-5 rounded-lg relative overflow-hidden w-full ${
                isDarkMode ? "bg-gray-800/30" : "bg-gray-50"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div 
                className="absolute -left-10 -top-10 w-40 h-40 rounded-full opacity-10"
                style={{ 
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(8,145,178,0) 70%)' 
                    : 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%)'
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                <h5 className={`font-semibold mb-3 flex items-center ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}>
                  <svg className={`w-5 h-5 mr-2 ${
                    isDarkMode ? "text-cyan-400" : "text-blue-500"
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                  Newsletter
                </h5>
                <p className={`text-sm ${subTextClass} mb-4`}>
                  Recevez nos dernières innovations technologiques
                </p>
                
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="votre@email.com" 
                    className={`w-full pl-4 pr-12 py-3 rounded-lg outline-none ${
                      isDarkMode 
                        ? "bg-gray-900/80 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-cyan-700" 
                        : "bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-300"
                    } transition-colors focus:ring-2 ${
                      isDarkMode ? "focus:ring-cyan-900/50" : "focus:ring-blue-100" 
                    }`}
                  />
                  <button 
                    className={`absolute right-1 top-1/2 transform -translate-y-1/2 rounded-lg p-2 ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:from-cyan-500 hover:to-blue-600" 
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                    } transition-all duration-300`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center mt-3">
                  <motion.div 
                    className={`relative h-0.5 w-full overflow-hidden ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <motion.div 
                      className={`absolute inset-y-0 left-0 ${
                        isDarkMode ? "bg-cyan-500" : "bg-blue-500"
                      }`}
                      initial={{ width: "15%" }}
                      animate={{ width: ["15%", "35%", "15%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                  <span className={`text-xs ml-3 ${subTextClass}`}>Sécurisé</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Ligne décorative avec animation plus tech */}
        <div className="relative w-full h-px my-12">
          <motion.div 
            className={`absolute top-0 left-0 w-full h-px ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          />
          
          <motion.div 
            className={`absolute top-0 left-0 h-px ${
              isDarkMode ? "bg-cyan-500" : "bg-blue-500"
            }`}
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Points lumineux le long de la ligne */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute top-0 h-2 w-2 rounded-full ${
                isDarkMode ? "bg-cyan-500" : "bg-blue-500"
              }`}
              style={{ 
                marginTop: "-4px",
                filter: `blur(${isDarkMode ? '2px' : '1px'})`
              }}
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8,
                delay: i * 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Copyright et signature */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className={`relative text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} flex items-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div 
              className={`mr-2 w-6 h-6 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-cyan-900/30" : "bg-blue-100"
              }`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
              </svg>
            </motion.div>
            <span className="font-medium">{currentYear}</span>
            <span className="mx-1 opacity-50">•</span>
            <span>KobaTech</span>
            <span className="mx-1 opacity-50">•</span>
            <span>Tous droits réservés</span>
          </motion.div>
          
          <motion.div 
            className={`text-xs ${subTextClass} mt-4 md:mt-0 flex items-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div 
              className={`relative px-3 py-1 rounded-full flex items-center ${
                isDarkMode ? "bg-gray-800/60" : "bg-gray-100/70"
              } overflow-hidden`}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${
                    isDarkMode ? 'rgba(34,211,238,0.3)' : 'rgba(59,130,246,0.3)'
                  } 0%, transparent 70%)`
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div 
                className={`inline-block w-2 h-2 rounded-full ${
                  isDarkMode ? "bg-cyan-500" : "bg-blue-500"
                } mr-2`}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <span className="relative z-10">
                Conçu avec{' '}
                <motion.svg
                  className={`inline-block w-3 h-3 mx-1 ${
                    isDarkMode ? "text-pink-500" : "text-pink-500"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </motion.svg>
                {' '}par l'équipe KobaTech
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Styles spécifiques au footer améliorés */}
      <style jsx>{`
        @keyframes footerLine {
          0% { left: 0; }
          100% { left: 70%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, -15px); }
        }
        
        .bg-grid-dark {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        
        .bg-grid-light {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px ${isDarkMode ? 'rgba(34, 211, 238, 0.3)' : 'rgba(59, 130, 246, 0.3)'});
        }
      `}</style>
    </footer>
  );
};

export default Footer;