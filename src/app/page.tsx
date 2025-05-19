"use client";

import { useState, useEffect, useRef, JSX } from 'react';
import Image from 'next/image';
import TechCursor, { TechCursorRef } from './components/TechCursor'; // Fixed import path

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function Home(): JSX.Element {
  
  const cursorRef = useRef<TechCursorRef | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [logoScale, setLogoScale] = useState(1);
  const [textOpacity, setTextOpacity] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Animation progressive du chargement
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        // Mise à jour du curseur avec la progression
        if (cursorRef.current) {
          cursorRef.current.updateProgress(prev + 2);
        }
        
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    
    return () => clearInterval(progressInterval);
  }, []);
  
  // Animation du logo et du texte
  useEffect(() => {
    const fadeInLogo = setTimeout(() => {
      setLogoScale(1);
    }, 200);
    
    const fadeInText = setTimeout(() => {
      setTextOpacity(1);
    }, 300);
    
    const pulseInterval = setInterval(() => {
      setLogoScale(scale => scale === 1 ? 1.05 : 1);
    }, 1500);
    
    return () => {
      clearTimeout(fadeInLogo);
      clearTimeout(fadeInText);
      clearInterval(pulseInterval);
    };
  }, []);
  
  // Redirection automatique après 3 secondes
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // Transition fluide avant la redirection
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease-out';
      
      setTimeout(() => {
        window.location.href = '/accueil';
      }, 500);
    }, 3000);
    
    return () => clearTimeout(redirectTimer);
  }, []);
  
  // Initialiser les particules pour l'animation
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    setParticles(newParticles);
  }, []);
  
  // Animation des particules
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let animationFrameId: number;
    
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      particles.forEach((particle, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - p2.x, 2) + Math.pow(particle.y - p2.y, 2)
          );
          
          if (distance < 100) {
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(32, 156, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      });
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const newX = particle.x + particle.speedX;
          const newY = particle.y + particle.speedY;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(64, 206, 255, ${particle.opacity})`;
          ctx.fill();
          
          return {
            ...particle,
            x: newX < 0 || newX > canvas.width ? particle.x - particle.speedX : newX,
            y: newY < 0 || newY > canvas.height ? particle.y - particle.speedY : newY,
            speedX: newX < 0 || newX > canvas.width ? -particle.speedX : particle.speedX,
            speedY: newY < 0 || newY > canvas.height ? -particle.speedY : particle.speedY
          };
        })
      );
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [particles]);
  
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas pour les particules animées */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* Conteneur principal amélioré et responsive */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Logo avec animation de flottement */}
        <div 
          className="relative mb-6 transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `scale(${logoScale})`,
            animation: "float 3s ease-in-out infinite"
          } as React.CSSProperties}
        >
          {/* Container du logo avec overlay futuriste */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Cercles lumineux autour du logo */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 247, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
                animation: 'pulse 3s ease-in-out infinite alternate'
              }}
            />
            
            {/* Anneaux décoratifs avec rotation */}
            <div className="absolute inset-0 rounded-full border border-cyan-500 opacity-30"
              style={{ animation: 'rotate 12s linear infinite' }}
            />
            <div className="absolute inset-4 rounded-full border border-blue-400 opacity-20"
              style={{ animation: 'rotate 24s linear infinite reverse' }}
            />
            
            {/* Logo amélioré avec effet lumineux */}
            <Image
              src="/logo.png"
              alt="KOBATECH AI Logo"
              width={200}
              height={200}
              className="relative z-10"
              style={{ 
                filter: 'drop-shadow(0 0 8px rgba(0, 247, 255, 0.6))',
                objectFit: 'contain',
              }}
              priority
              onError={() => console.error("Failed to load logo image")}
            />
          </div>
        </div>
        
        {/* Section texte améliorée */}  
        <div className="flex flex-col items-center">
          {/* Texte avec effet futuriste */}
          <h1 
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text relative z-10"
            style={{
              backgroundImage: "linear-gradient(90deg, #00f7ff, #3b82f6, #ff00cc)",
              backgroundSize: "200% auto",
              animation: "gradient 3s ease infinite",
              opacity: textOpacity,
              textShadow: "0 0 15px rgba(0, 247, 255, 0.5), 0 0 30px rgba(255, 0, 204, 0.3)",
              transition: "opacity 1.5s ease-in-out",
              letterSpacing: "0.1em",
              fontFamily: "'Exo 2', sans-serif"
            }}
          >
            KOBATECH AI
          </h1>
          
          {/* Sous-titre avec apparition progressive */}
          <p 
            className="mt-2 text-cyan-300 text-sm sm:text-base tracking-wider"
            style={{
              opacity: textOpacity * 0.8,
              transition: "opacity 2s ease-in-out",
              textShadow: "0 0 8px rgba(6, 182, 212, 0.4)",
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 300
            }}
          >
            DE L&apos;IDÉE À LA RÉALISATION
          </p>
          
          {/* Ligne décorative sous le texte */}
          <div 
            className="h-1 mt-3"
            style={{
              width: "min(80vw, 300px)", 
              background: "linear-gradient(90deg, transparent, #00f7ff, #ff00cc, transparent)",
              boxShadow: "0 0 10px rgba(0, 247, 255, 0.5)",
              opacity: textOpacity,
              transition: "opacity 2s ease-in-out"
            }}
          ></div>
          
          {/* Indicateur de chargement */}
          <div 
            className="mt-6 relative h-1 overflow-hidden rounded-full transition-all duration-1000"
            style={{ 
              width: "min(60vw, 250px)",
              opacity: textOpacity,
              background: "rgba(8, 145, 178, 0.2)",
            }}
          >
            <div 
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${loadingProgress}%`,
                background: "linear-gradient(90deg, #00f7ff, #ff00cc)",
                boxShadow: "0 0 10px rgba(6, 182, 212, 0.7)"
              }}
            ></div>
          </div>
          
          {/* Texte de chargement */}
          <p 
            className="mt-2 text-cyan-300 text-xs sm:text-sm font-mono"
            style={{ opacity: textOpacity * 0.7 }}
          >
            {loadingProgress < 100 ? 'CHARGEMENT...' : 'PRÊT'}
          </p>
        </div>
      </div>
      
      {/* Intégration du curseur personnalisé */}
      <TechCursor ref={cursorRef} progress={loadingProgress} />
      
      {/* Style global pour l'animation de flottement */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;700;900&display=swap');
        
        body {
          margin: 0;
          overflow: hidden;
          transition: opacity 0.5s ease-in-out;
        }
        
        @keyframes float {
          0% {
        transform: translateY(0px) scale(${logoScale});
          }
          50% {
        transform: translateY(-15px) scale(${logoScale});
          }
          100% {
        transform: translateY(0px) scale(${logoScale});
          }
        }
        
        @keyframes pulse {
          0% {
        opacity: 0.2;
        transform: scale(0.95);
          }
          100% {
        opacity: 0.4;
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
        
        @keyframes gradient {
          0% {
        background-position: 0% 50%;
          }
          50% {
        background-position: 100% 50%;
          }
          100% {
        background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}