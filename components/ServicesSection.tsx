"use client";

import { useRef, useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FiCode, FiSmartphone, FiBriefcase, FiShield, 
  FiHome, FiCpu, FiWifi, FiTool, FiChevronRight 
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

// Types
type Technology = {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  category: 'informatique' | 'electronique';
};

type SectionProps = {
  id: string;
  title: string;
  isVisible: boolean;
};

const ServicesSection = ({ id, title, isVisible }: SectionProps) => {
  const { isDarkMode, textClass, subTextClass } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [activeCategory, setActiveCategory] = useState<'informatique' | 'electronique' | 'all'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  // Couleur principale inspirée du logo - plus vif pour un design amélioré
  const mainColor = "#36CBDE"; // Cyan bleuté du logo
  const secondaryColor = "#FF7940"; // Orange complémentaire pour le contraste
  
  // Effets de parallaxe AMÉLIORÉS - plus réactif, moins lent
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Animation plus rapide et responsive
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.6, 1, 1, 0.6]);
  const translateY = useTransform(scrollYProgress, [0.1, 0.9], [30, -30]);
  
  // Détection de visibilité des éléments - seuils réduits pour déclenchement plus rapide
  const [titleRef, titleInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filterRef, filterInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [gridRef, gridInView] = useInView({ threshold: 0.05, triggerOnce: true });
  
  // Construction des données de technologies
  useEffect(() => {
    const TECHNOLOGIES: Technology[] = [
      // Catégorie Informatique
      {
        id: 'web-dev',
        name: 'Développement Web',
        description: 'Sites performants et applications web optimisés pour votre business.',
        features: [
          'Sites vitrines à fort impact',
          'Applications web complexes',
          'Interfaces utilisateur réactives',
          'Performance et SEO optimisés'
        ],
        icon: <FiCode size={24} />,
        category: 'informatique'
      },
      {
        id: 'mobile-dev',
        name: 'Applications Mobiles',
        description: 'Apps iOS/Android sur mesure pour fidéliser vos clients.',
        features: [
          'Design natif pour chaque plateforme',
          'Performances optimisées',
          'Expérience utilisateur fluide',
          'Maintenance et support continu'
        ],
        icon: <FiSmartphone size={24} />,
        category: 'informatique'
      },
      {
        id: 'ai',
        name: 'Intelligence Artificielle',
        description: 'Automatisation et analyse de données par IA avancée.',
        features: [
          'Analyse prédictive avancée',
          'Chatbots et assistants virtuels',
          'Traitement du langage naturel',
          'Systèmes de recommandation'
        ],
        icon: <FiBriefcase size={24} />,
        category: 'informatique'
      },
      {
        id: 'cybersecurity',
        name: 'Cybersécurité',
        description: 'Protection robuste de vos données et infrastructures.',
        features: [
          'Audit et tests d\'intrusion',
          'Protection contre les ransomwares',
          'Conformité RGPD et normes ISO',
          'Formation de vos équipes'
        ],
        icon: <FiShield size={24} />,
        category: 'informatique'
      },
      // Catégorie Électronique
      {
        id: 'domotique',
        name: 'Domotique',
        description: 'Solutions intelligentes pour maisons et bâtiments connectés.',
        features: [
          'Systèmes sur mesure et évolutifs',
          'Économies d\'énergie garanties',
          'Intégration multi-protocoles',
          'Interface intuitive personnalisée'
        ],
        icon: <FiHome size={24} />,
        category: 'electronique'
      },
      {
        id: 'embedded',
        name: 'Systèmes Embarqués',
        description: 'Solutions hardware/software robustes pour l\'industrie.',
        features: [
          'Conception hardware optimisée',
          'Firmware haute performance',
          'Solutions basse consommation',
          'Résistance en environnements difficiles'
        ],
        icon: <FiCpu size={24} />,
        category: 'electronique'
      },
      {
        id: 'iot',
        name: 'IoT',
        description: 'Connectez et pilotez vos équipements à distance.',
        features: [
          'Écosystème complet IoT',
          'Tableau de bord en temps réel',
          'Maintenance prédictive',
          'Scalabilité et fiabilité'
        ],
        icon: <FiWifi size={24} />,
        category: 'electronique'
      },
      {
        id: 'pcb',
        name: 'Conception Électronique',
        description: 'Circuits imprimés et prototypes sur mesure rapides.',
        features: [
          'Design de PCB multicouches',
          'Prototypage rapide',
          'Tests et validation exhaustifs',
          'Production à l\'échelle'
        ],
        icon: <FiTool size={24} />,
        category: 'electronique'
      },
    ];

    // Chargement plus rapide
    setTimeout(() => {
      setTechnologies(TECHNOLOGIES);
      setIsLoading(false);
    }, 300); // Réduit à 300ms pour une expérience plus rapide
  }, []);

  // Filtrer les technologies selon la catégorie active
  const filteredTechnologies = technologies.filter(tech => 
    activeCategory === 'all' || tech.category === activeCategory
  );

  // Animation variants - optimisées pour plus de fluidité
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  const filterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  // Style de fond modernisé
  const backgroundStyle = isDarkMode 
    ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800'
    : 'bg-gradient-to-b from-gray-50 via-gray-50 to-white';

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity, y: translateY }}
      className={`relative py-20 overflow-hidden ${backgroundStyle}`}
      id={id}
    >
      {/* Grille de fond améliorée */}
      <div className="absolute inset-0 opacity-10">
        <div className={`w-full h-full ${isDarkMode ? 'bg-grid-dark' : 'bg-grid-light'}`}></div>
      </div>
      
      {/* Effet de lumière dynamique */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-15 blur-3xl" 
        style={{ background: `radial-gradient(circle, ${mainColor} 0%, transparent 70%)` }}>
      </div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10 blur-3xl" 
        style={{ background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)` }}>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* En-tête de section avec animation améliorée */}
        <motion.div
          ref={titleRef}
          variants={titleVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          className="mb-14 text-center"
        >
          <motion.span 
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4`}
            style={{ 
              background: isDarkMode ? `${mainColor}30` : `${mainColor}20`,
              color: mainColor,
              backdropFilter: "blur(8px)"
            }}
          >
            Nos expertises
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: mainColor }}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: titleInView ? '100px' : 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="h-1 mx-auto mt-4 rounded-full"
            style={{ background: `linear-gradient(90deg, ${mainColor}, ${secondaryColor})` }}
          />
        </motion.div>
        
        {/* Filtres de catégorie - design amélioré */}
        <motion.div 
          ref={filterRef}
          variants={filterVariants}
          initial="hidden"
          animate={filterInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
        >
          {['all', 'informatique', 'electronique'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ y: -3, boxShadow: `0 4px 12px ${mainColor}40` }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category as any)}
              className={`relative px-5 py-2 rounded-full font-medium transition-all`}
              style={{
                color: activeCategory === category ? 'white' : isDarkMode ? '#e0e0e0' : '#4a4a4a',
                background: activeCategory === category 
                  ? `linear-gradient(90deg, ${mainColor}, ${mainColor}DD)` 
                  : 'transparent',
                border: `1px solid ${activeCategory === category ? mainColor : isDarkMode ? '#4a4a4a' : '#d0d0d0'}`,
                backdropFilter: "blur(4px)"
              }}
            >
              <span className="relative z-10">
                {category === 'all' ? 'Toutes nos technologies' : 
                category === 'informatique' ? 'Solutions informatiques' : 'Solutions électroniques'}
              </span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* État de chargement amélioré */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full"
              style={{ 
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: `${mainColor} transparent ${secondaryColor} transparent`
              }}
            />
          </div>
        ) : (
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
            variants={{
              visible: { 
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {/* Cartes de technologies avec design amélioré */}
            <AnimatePresence mode="wait">
              {filteredTechnologies.map((tech) => (
                <motion.div
                  key={tech.id}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: isDarkMode 
                      ? `0 10px 25px -5px rgba(0,0,0,0.7), 0 0 10px ${mainColor}30` 
                      : `0 20px 25px -5px rgba(0,0,0,0.1), 0 0 10px ${mainColor}30`
                  }}
                  className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-200 transform-gpu ${
                    isDarkMode 
                      ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700/50' 
                      : 'bg-white/90 backdrop-blur-sm border border-gray-100'
                  }`}
                  style={{
                    boxShadow: selectedTech === tech.id 
                      ? `0 8px 30px ${mainColor}40` 
                      : isDarkMode 
                        ? '0 4px 20px rgba(0,0,0,0.2)' 
                        : '0 4px 20px rgba(0,0,0,0.05)',
                    borderColor: selectedTech === tech.id ? mainColor : 'transparent',
                  }}
                  onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Icône avec design amélioré */}
                    <div 
                      className="w-12 h-12 flex items-center justify-center rounded-full mb-5"
                      style={{ 
                        background: `linear-gradient(135deg, ${mainColor}30, ${mainColor}15)`,
                        color: mainColor,
                        boxShadow: `0 4px 10px ${mainColor}20`
                      }}
                    >
                      {tech.icon}
                    </div>
                    
                    {/* Contenu */}
                    <h3 className={`text-lg font-bold mb-2 ${textClass}`}>{tech.name}</h3>
                    <p className={`${subTextClass} text-sm`} style={{ minHeight: '40px' }}>
                      {tech.description}
                    </p>
                    
                    {/* Bouton "En savoir plus" avec animation améliorée */}
                    <div 
                      className="mt-4 flex items-center text-sm font-medium"
                      style={{ color: mainColor }}
                    >
                      {selectedTech === tech.id ? "Réduire" : "En savoir plus"}
                      <motion.div
                        animate={{ 
                          x: selectedTech === tech.id 
                            ? 0 
                            : [0, 3, 0]
                        }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                      >
                        <FiChevronRight className="ml-1" />
                      </motion.div>
                    </div>
                    
                    {/* Détails étendus avec animation plus fluide */}
                    <AnimatePresence>
                      {selectedTech === tech.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="mt-4 pt-4 border-t"
                          style={{ borderColor: isDarkMode ? '#3a3a3a' : '#e5e5e5' }}
                        >
                          <ul className="space-y-2 mb-4">
                            {tech.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 mt-1 text-xs" style={{ color: mainColor }}>●</span>
                                <span className={`${subTextClass} text-sm`}>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <motion.button
                            whileHover={{ scale: 1.02, boxShadow: `0 4px 12px ${mainColor}40` }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-4 py-2 mt-2 rounded-lg text-white text-sm font-medium"
                            style={{ 
                              background: `linear-gradient(135deg, ${mainColor}, ${mainColor}DD)`,
                            }}
                          >
                            Demander un devis gratuit
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      
      {/* Ligne de séparation stylisée */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      {/* Styles CSS pour la grille */}
      <style jsx global>{`
        .bg-grid-light {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
        }
        
        .bg-grid-dark {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
      `}</style>
    </motion.section>
  );
};

export default ServicesSection;