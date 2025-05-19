// TechCursor.tsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface TechCursorProps {
  progress?: number;
}

const CurseurFuturiste = forwardRef<{ updateProgress: (progress: number) => void }, TechCursorProps>(
  ({ progress = 0 }, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [cursorProgress, setCursorProgress] = useState(progress);

    // Exposer la méthode pour mettre à jour la progression depuis le parent
    useImperativeHandle(ref, () => ({
      updateProgress: (newProgress: number) => {
        setCursorProgress(newProgress);
      }
    }));

    useEffect(() => {
      // Mettre à jour la progression lorsque la prop change
      setCursorProgress(progress);
    }, [progress]);

    useEffect(() => {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setHidden(false);
      };

      const handleMouseDown = () => setClicked(true);
      const handleMouseUp = () => setClicked(false);
      
      // Cacher le curseur lorsqu'il sort de la fenêtre
      const handleMouseLeave = () => setHidden(true);
      const handleMouseEnter = () => setHidden(false);

      window.addEventListener('mousemove', updatePosition);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('mouseenter', handleMouseEnter);

      // Masquer le curseur par défaut
      document.body.style.cursor = 'none';

      return () => {
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('mouseenter', handleMouseEnter);
        
        // Restaurer le curseur par défaut
        document.body.style.cursor = 'auto';
      };
    }, []);

    if (hidden) return null;

    return (
      <div 
        className="pointer-events-none fixed top-0 left-0 z-50" 
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Cercle principal */}
        <div
          className={`absolute rounded-full border transition-all duration-150 ${
            clicked ? 'border-cyan-500 scale-75' : 'border-blue-500'
          }`}
          style={{
            width: '30px',
            height: '30px',
            transform: 'translate(-50%, -50%)',
            boxShadow: clicked 
              ? '0 0 10px rgba(34, 211, 238, 0.7), inset 0 0 5px rgba(34, 211, 238, 0.5)' 
              : '0 0 5px rgba(59, 130, 246, 0.5), inset 0 0 3px rgba(59, 130, 246, 0.3)'
          }}
        />
        
        {/* Points de repère */}
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full" style={{ transform: 'translate(-50%, -50%)' }} />
        
        {/* Lignes directionnelles */}
        <div className="absolute w-6 h-px bg-blue-500 opacity-50" style={{ transform: 'translate(-100%, -50%)' }} />
        <div className="absolute w-6 h-px bg-blue-500 opacity-50" style={{ transform: 'translate(0%, -50%)' }} />
        <div className="absolute w-px h-6 bg-blue-500 opacity-50" style={{ transform: 'translate(-50%, -100%)' }} />
        <div className="absolute w-px h-6 bg-blue-500 opacity-50" style={{ transform: 'translate(-50%, 0%)' }} />
        
        {/* Indicateur de progression */}
        <div 
          className="absolute rounded-full border border-cyan-400"
          style={{
            width: '40px',
            height: '40px',
            transform: 'translate(-50%, -50%)',
            opacity: 0.3
          }}
        >
          {/* Cercle de progression */}
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            className="absolute top-0 left-0"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(34, 211, 238, 0.8)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 18 * cursorProgress / 100} ${2 * Math.PI * 18 * (1 - cursorProgress / 100)}`}
              strokeDashoffset="0"
              transform="rotate(-90, 20, 20)"
            />
          </svg>
          
          {/* Pourcentage de progression */}
          <div 
            className="absolute text-xs font-mono text-cyan-400"
            style={{
              top: '46px',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow: '0 0 2px rgba(0,0,0,0.5)'
            }}
          >
            {Math.round(cursorProgress)}%
          </div>
        </div>
      </div>
    );
  }
);

CurseurFuturiste.displayName = 'CurseurFuturiste';

export default CurseurFuturiste;