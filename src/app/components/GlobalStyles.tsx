"use client";

import { useTheme } from './ThemeContext';

const GlobalStyles = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      :root {
        --cyan-glow: ${isDarkMode 
          ? '0 0 15px rgba(0, 229, 255, 0.6)' 
          : '0 0 15px rgba(8, 145, 178, 0.6)'};
      }
      
      * {
        box-sizing: border-box;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      body {
        font-family: 'Inter', sans-serif;
        background-color: ${isDarkMode ? '#000' : '#fff'};
        margin: 0;
        padding: 0;
        color: ${isDarkMode ? '#fff' : '#1a202c'};
        overflow-x: hidden;
      }
      
      .shadow-glow {
        box-shadow: var(--cyan-glow);
      }
      
      .drop-shadow-glow {
        filter: drop-shadow(var(--cyan-glow));
      }
      
      @keyframes pulse {
        0% {
          opacity: 0.1;
          transform: scale(0.95);
        }
        100% {
          opacity: 0.3;
          transform: scale(1.05);
        }
      }
      
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
        100% {
          transform: translateY(0px);
        }
      }
      
      @keyframes scroll-down {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        75% {
          opacity: 1;
          transform: translateY(5px);
        }
        100% {
          opacity: 0;
          transform: translateY(5px);
        }
      }
      
      .animate-scroll-down {
        animation: scroll-down 1.5s infinite;
      }
      
      .animate-fade-in {
        animation: fade-in 1s forwards;
      }
      
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  );
};

export default GlobalStyles;