import React, { JSX, useEffect, useRef } from 'react';

export interface ParticleBackgroundProps {
  isDarkMode: boolean;
}

const ParticleBackground = ({ isDarkMode }: ParticleBackgroundProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: isDarkMode ? 0.8 : 0.4,
        zIndex: 0
      }}
    />
  );
};

export default ParticleBackground;
