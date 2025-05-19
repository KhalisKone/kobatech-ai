"use client";

import { JSX, useEffect, useRef } from 'react';

// Define the props interface
interface ParticleBackgroundProps {
  isDarkMode: boolean;
}

const ParticleBackground = ({ isDarkMode }: ParticleBackgroundProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Effet pour l'animation de fond
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    
    // Initialisation des particules
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 15);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    // Redimensionnement du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation des particules
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Couleur adaptée au thème
      const particleColor = isDarkMode ? 
        'rgba(0, 210, 255, ' : 
        'rgba(0, 150, 255, ';
      
      // Dessin des connexions entre particules
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${particleColor}${0.15 * (1 - distance / 120)})`;
            ctx.stroke();
          }
        }
      }
      
      // Dessin et mise à jour des particules
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Dessin de la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-0"
      />
      <div className={`fixed inset-0 bg-gradient-to-b ${
        isDarkMode 
          ? "from-black/70 via-black/40 to-black/90" 
          : "from-white/70 via-white/40 to-white/90"
      } z-0`}></div>
    </>
  );
};

export default ParticleBackground;