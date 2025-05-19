"use client";

import { useRef } from 'react';
import { useTheme } from './ThemeContext';

type SectionProps = {
  id: string;
  title: string;
  isVisible: boolean;
};

const ContactSection = ({ id, title, isVisible }: SectionProps) => {
  const { gradientText } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 z-10 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
      id={id}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${gradientText}`}>
          {title}
        </h2>
        
        {/* Formulaire de contact sera ajouté ici */}
      </div>
    </section>
  );
};

export default ContactSection;