"use client";

import { JSX, useState } from 'react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, FiSmartphone, FiShield, FiBriefcase,
  FiCpu, FiZap, FiGlobe, FiServer
} from 'react-icons/fi';

// Types
interface TechnologiesSectionProps {
  id: string;
  title: string;
  isVisible: boolean;
}

interface Capability {
  id: string;
  name: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  category: 'informatics' | 'electronics';
  applications: string[];
}

const TechnologiesSection = ({ id, title, isVisible }: TechnologiesSectionProps): JSX.Element => {
  const { isDarkMode, textClass, subTextClass } = useTheme();
  const [activeCategory, setActiveCategory] = useState<'informatics' | 'electronics' | 'all'>('all');
  const [expandedCapability, setExpandedCapability] = useState<string | null>(null);

  // Purple color palette
  const primaryPurple = "#7C3AED"; // Vibrant purple
  const secondaryPurple = "#A78BFA"; // Light purple
  const accentPurple = "#6D28D9"; // Deep purple

  // Capability data for informatics and electronics
  const capabilities: Capability[] = [
    // Informatics
    {
      id: 'web-solutions',
      name: 'Solutions Web',
      description: 'Applications web modernes et performantes',
      details: 'Conception d’interfaces web dynamiques et optimisées pour une expérience utilisateur fluide et une performance élevée.',
      icon: <FiCode size={24} />,
      category: 'informatics',
      applications: [
        'Sites vitrines interactifs',
        'Portails d’entreprise',
        'Tableaux de bord en temps réel',
        'Commerce en ligne'
      ]
    },
    {
      id: 'mobile-apps',
      name: 'Applications Mobiles',
      description: 'Apps sur mesure pour iOS et Android',
      details: 'Développement d’applications mobiles avec des interfaces intuitives et des fonctionnalités adaptées aux besoins des utilisateurs.',
      icon: <FiSmartphone size={24} />,
      category: 'informatics',
      applications: [
        'Applications de fidélisation',
        'Outils de productivité',
        'Services de géolocalisation',
        'Apps de gestion'
      ]
    },
    {
      id: 'ai-automation',
      name: 'Automatisation par IA',
      description: 'Solutions intelligentes pour l’automatisation',
      details: 'Mise en œuvre de systèmes d’intelligence artificielle pour automatiser les processus et analyser les données en temps réel.',
      icon: <FiBriefcase size={24} />,
      category: 'informatics',
      applications: [
        'Analyse prédictive',
        'Assistants virtuels',
        'Optimisation des flux de travail',
        'Personnalisation client'
      ]
    },
    {
      id: 'cybersecurity',
      name: 'Cybersécurité',
      description: 'Protection des données et systèmes',
      details: 'Solutions pour sécuriser les infrastructures numériques, protéger les données sensibles et assurer la conformité réglementaire.',
      icon: <FiShield size={24} />,
      category: 'informatics',
      applications: [
        'Audits de sécurité',
        'Protection contre les cyberattaques',
        'Gestion des identités',
        'Conformité RGPD'
      ]
    },
    // Electronics
    {
      id: 'circuit-design',
      name: 'Conception de Circuits',
      description: 'Circuits électroniques sur mesure',
      details: 'Développement de circuits optimisés pour des applications spécifiques, garantissant fiabilité et efficacité énergétique.',
      icon: <FiCpu size={24} />,
      category: 'electronics',
      applications: [
        'Dispositifs médicaux',
        'Systèmes industriels',
        'Électronique grand public',
        'Capteurs intelligents'
      ]
    },
    {
      id: 'embedded-systems',
      name: 'Systèmes Embarqués',
      description: 'Électronique intégrée performante',
      details: 'Conception de systèmes embarqués compacts pour des applications critiques avec des contraintes de taille et de puissance.',
      icon: <FiZap size={24} />,
      category: 'electronics',
      applications: [
        'Véhicules autonomes',
        'Domotique intelligente',
        'Équipements de surveillance',
        'Dispositifs portables'
      ]
    },
    {
      id: 'iot-connectivity',
      name: 'Connectivité IoT',
      description: 'Réseaux pour appareils connectés',
      details: 'Mise en place de réseaux sécurisés et évolutifs pour connecter des appareils IoT dans divers environnements.',
      icon: <FiGlobe size={24} />,
      category: 'electronics',
      applications: [
        'Villes intelligentes',
        'Surveillance environnementale',
        'Logistique connectée',
        'Maisons intelligentes'
      ]
    },
    {
      id: 'compact-servers',
      name: 'Serveurs Compacts',
      description: 'Solutions serveur locales et efficaces',
      details: 'Développement de serveurs compacts et économiques pour le traitement local des données, idéaux pour les petites infrastructures.',
      icon: <FiServer size={24} />,
      category: 'electronics',
      applications: [
        'Serveurs domestiques',
        'Prototypage IoT',
        'Gestion de données locales',
        'Applications éducatives'
      ]
    }
  ];

  // Filter capabilities by active category
  const filteredCapabilities = capabilities.filter(cap => 
    activeCategory === 'all' || cap.category === activeCategory
  );

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Intersection observers for animations
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [filtersRef, filtersInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [cardsRef, cardsInView] = useInView({ threshold: 0.15, triggerOnce: true });

  const handleScroll = (event: UIEvent): void => {
    // Your scroll handling logic
  };

  return (
    <motion.section
      initial="hidden"
      animate={isVisible || headerInView ? "visible" : "hidden"}
      variants={sectionVariants}
      className={`relative py-24 overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
      id={id}
    >
      {/* Subtle particle background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-10"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Decorative glows */}
      <motion.div
        className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${primaryPurple}, transparent)` }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accentPurple}, transparent)` }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: isDarkMode 
                ? `linear-gradient(135deg, ${primaryPurple}30, ${secondaryPurple}30)` 
                : `linear-gradient(135deg, ${primaryPurple}20, ${secondaryPurple}20)`,
              color: primaryPurple,
              boxShadow: `0 4px 12px ${primaryPurple}20`
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Nos Expertises
          </motion.span>
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800`}>
            {title}
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${subTextClass}`}>
            Des solutions avancées en informatique et électronique pour des projets innovants et performants.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          ref={filtersRef}
          initial={{ opacity: 0, y: 30 }}
          animate={filtersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            { key: 'all', label: 'Toutes' },
            { key: 'informatics', label: 'Informatique' },
            { key: 'electronics', label: 'Électronique' }
          ].map((category) => (
            <motion.button
              key={category.key}
              whileHover={{ scale: 1.05, boxShadow: `0 6px 16px ${primaryPurple}30` }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category.key as 'informatics' | 'electronics' | 'all')}
              className={`px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category.key
                  ? 'text-white'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              style={{
                background: activeCategory === category.key
                  ? `linear-gradient(135deg, ${primaryPurple}, ${accentPurple})`
                  : isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${
                  activeCategory === category.key ? 'transparent' : isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
                }`
              }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Capabilities grid */}
        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCapabilities.map((cap) => (
            <motion.div
              key={cap.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: `0 16px 32px ${primaryPurple}20`,
                borderColor: cap.category === 'informatics' ? primaryPurple : accentPurple
              }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                isDarkMode 
                  ? 'bg-gray-800/90 border border-gray-700/40' 
                  : 'bg-white/95 border border-gray-100'
              } backdrop-blur-md transition-all duration-300`}
            >
              {/* Decorative accent */}
              <div
                className="absolute top-0 left-0 w-24 h-24 rounded-full opacity-15"
                style={{
                  background: `radial-gradient(circle, ${
                    cap.category === 'informatics' ? primaryPurple : accentPurple
                  }, transparent)`,
                  transform: 'translate(-30%, -30%)',
                  filter: 'blur(20px)'
                }}
              />

              {/* Card header */}
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg mr-4"
                  style={{
                    background: `linear-gradient(135deg, ${
                      cap.category === 'informatics' ? primaryPurple : accentPurple
                    }20, transparent)`,
                    color: cap.category === 'informatics' ? primaryPurple : accentPurple,
                    boxShadow: `0 2px 8px ${cap.category === 'informatics' ? primaryPurple : accentPurple}20`
                  }}
                >
                  {cap.icon}
                </div>
                <h3 className={`text-2xl font-bold ${textClass}`}>{cap.name}</h3>
              </div>

              {/* Description and details */}
              <p className={`${subTextClass} text-base mb-6 leading-relaxed`}>{cap.description}</p>
              <p className={`${subTextClass} text-sm mb-6`}>{cap.details}</p>

              {/* Expand button */}
              <button
                onClick={() => setExpandedCapability(expandedCapability === cap.id ? null : cap.id)}
                className="flex items-center text-sm font-semibold mb-4"
                style={{
                  color: cap.category === 'informatics' ? primaryPurple : accentPurple
                }}
              >
                {expandedCapability === cap.id ? 'Réduire' : 'Voir les applications'}
                <motion.div
                  animate={{ x: expandedCapability === cap.id ? 0 : [0, 4, 0] }}
                  transition={{ duration: 1, repeat: expandedCapability === cap.id ? 0 : Infinity }}
                >
                  <FiZap className="ml-2" />
                </motion.div>
              </button>

              {/* Expanded applications */}
              <AnimatePresence>
                {expandedCapability === cap.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="pt-6 border-t"
                    style={{ borderTopColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  >
                    <h4 className={`text-base font-semibold mb-4 ${textClass}`}>
                      Applications Clés
                    </h4>
                    <ul className="space-y-3">
                      {cap.applications.map((app, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span
                            className="mr-2 mt-1 text-sm"
                            style={{
                              color: cap.category === 'informatics' ? primaryPurple : accentPurple
                            }}
                          >
                            •
                          </span>
                          <span className={`${subTextClass} text-sm`}>{app}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: `0 8px 20px ${cap.category === 'informatics' ? primaryPurple : accentPurple}30` }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 mt-6 rounded-lg text-white font-medium text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${
                          cap.category === 'informatics' ? primaryPurple : accentPurple
                        }, ${
                          cap.category === 'informatics' ? primaryPurple : accentPurple
                        }CC)`
                      }}
                    >
                      Explorer nos projets
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechnologiesSection;