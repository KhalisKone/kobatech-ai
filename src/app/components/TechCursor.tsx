import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

export interface TechCursorRef {
  updateProgress: (progress: number) => void;
}

interface TechCursorProps {
  progress: number;
}

const TechCursor = forwardRef<TechCursorRef, TechCursorProps>(({ progress: initialProgress }, ref) => {
  const [progress, setProgress] = useState(initialProgress);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    updateProgress: (newProgress: number) => {
      setProgress(newProgress);
    }
  }));

  if (!isVisible) return null;

  const cursorSize = 20;
  const ringSize = 40;
  const opacity = progress / 100;

  return (
    <>
      {/* Main cursor dot */}
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          backgroundColor: `rgba(0, 247, 255, ${opacity * 0.5})`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
          filter: `blur(${opacity * 2}px)`,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
        }}
      />

      {/* Outer ring */}
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `2px solid rgba(0, 247, 255, ${opacity * 0.3})`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          boxShadow: `0 0 10px rgba(0, 247, 255, ${opacity * 0.2})`,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      {/* Global styles for cursor animations */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
});

TechCursor.displayName = 'TechCursor';

export default TechCursor;
