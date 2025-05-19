"use client";

import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '../../../components/ThemeContext';
import { useTheme } from '../../../components/ThemeContext';
import CurseurFuturiste from '../../../components/TechCursor';
import MenuKobatech from '../../../components/MenuKobatech';
import Footer from '../../../components/Footer';
import ParticleBackground from '../../../components/ParticleBackground';
import GlobalStyles from '../../../components/GlobalStyles';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiChevronDown, FiMail, FiPhone } from 'react-icons/fi';
import { FaLaptopCode, FaMobileAlt, FaBrain, FaShieldAlt, FaDesktop, FaCloud, FaHome, FaMicrochip, FaNetworkWired, FaPrint, FaIndustry } from 'react-icons/fa';

// Type pour les cartes de services
type ServiceCard = {
  id: number;
  category: 'informatique' | 'electronique';
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  color: string;
};

// Composant pour afficher chaque service
function ServiceDetailCard({ service, isVisible, isDarkMode }: { 
  service: ServiceCard; 
  isVisible: boolean;
  isDarkMode: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-full"
    >
      <div className={`rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 transform hover:scale-[1.02] ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${service.color} text-white mr-4`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-bold">{service.title}</h3>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {service.description}
          </p>
        </div>
        <div className="p-6 flex-grow">
          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Fonctionnalités</h4>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className={`mr-2 mt-1 ${service.color.replace('bg-', 'text-')}`}>
                  <FiCheck className="h-5 w-5" />
                </span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`p-6 ${isDarkMode ? 'bg-gray-850' : 'bg-gray-50'}`}>
          <button 
            className={`w-full py-3 px-4 rounded-md transition-all duration-300 ${service.color} hover:opacity-90 text-white font-medium flex items-center justify-center`}
          >
            <span>En savoir plus</span>
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Composant pour les catégories de services
function ServicesDetailSection() {
  const { isDarkMode } = useTheme();
  const [visibleServices, setVisibleServices] = useState<{ [key: number]: boolean }>({});
  const servicesRef = useRef<HTMLDivElement>(null);
  
  // Données des services avec des couleurs spécifiques
  const servicesData: ServiceCard[] = [
    // Services Informatiques
    {
      id: 1,
      category: 'informatique',
      title: 'Développement de site web',
      description: 'Solutions web personnalisées et optimisées pour tous vos besoins numériques.',
      icon: <FaLaptopCode className="text-xl" />,
      features: [
        'Sites responsifs adaptés à tous les appareils',
        'Optimisation SEO pour un meilleur classement',
        'Intégration de CMS modernes',
        'Solutions e-commerce complètes',
        'Maintenance et support technique'
      ],
      color: 'bg-indigo-500'
    },
    {
      id: 2,
      category: 'informatique',
      title: 'Développement mobile',
      description: 'Applications mobiles natives et hybrides pour iOS et Android.',
      icon: <FaMobileAlt className="text-xl" />,
      features: [
        'Applications natives iOS et Android',
        'Applications cross-platform',
        'Interfaces utilisateur intuitives',
        'Intégration avec des API tierces',
        'Support et mises à jour continues'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 3,
      category: 'informatique',
      title: 'Intelligence artificielle',
      description: 'Solutions d\'IA innovantes pour automatiser et optimiser vos processus.',
      icon: <FaBrain className="text-xl" />,
      features: [
        'Apprentissage automatique',
        'Traitement du langage naturel',
        'Vision par ordinateur',
        'Systèmes de recommandation',
        'Chatbots et assistants virtuels'
      ],
      color: 'bg-purple-500'
    },
    {
      id: 4,
      category: 'informatique',
      title: 'Cybersécurité & Protection des données',
      description: 'Protégez vos données et systèmes contre les menaces numériques.',
      icon: <FaShieldAlt className="text-xl" />,
      features: [
        'Audit de sécurité complet',
        'Protection contre les intrusions',
        'Conformité RGPD',
        'Formation et sensibilisation',
        'Gestion des incidents de sécurité'
      ],
      color: 'bg-green-500'
    },
    {
      id: 5,
      category: 'informatique',
      title: 'Développement application bureau',
      description: 'Applications bureau sur mesure pour Windows, macOS et Linux.',
      icon: <FaDesktop className="text-xl" />,
      features: [
        'Interfaces utilisateur modernes',
        'Solutions multi-plateformes',
        'Intégration avec vos systèmes',
        'Mises à jour automatiques',
        'Support technique personnalisé'
      ],
      color: 'bg-red-500'
    },
    {
      id: 6,
      category: 'informatique',
      title: 'Cloud Computing & Hébergement',
      description: 'Solutions cloud performantes et sécurisées pour vos applications et données.',
      icon: <FaCloud className="text-xl" />,
      features: [
        'Hébergement sécurisé et évolutif',
        'Migration vers le cloud',
        'Solutions IaaS, PaaS et SaaS',
        'Optimisation des performances',
        'Sauvegarde et récupération'
      ],
      color: 'bg-cyan-500'
    },
    
    // Services Électroniques
    {
      id: 7,
      category: 'electronique',
      title: 'Domotique & Maison connectée',
      description: 'Rendez votre maison intelligente avec nos solutions de domotique avancées.',
      icon: <FaHome className="text-xl" />,
      features: [
        'Systèmes de contrôle centralisés',
        'Éclairage intelligent',
        'Sécurité et surveillance connectée',
        'Gestion énergétique optimisée',
        'Intégration avec assistants vocaux'
      ],
      color: 'bg-teal-500'
    },
    {
      id: 8,
      category: 'electronique',
      title: 'Systèmes embarqués avancés',
      description: 'Conception et développement de systèmes embarqués sur mesure.',
      icon: <FaMicrochip className="text-xl" />,
      features: [
        'Développement sur microcontrôleurs',
        'Systèmes temps réel (RTOS)',
        'Optimisation énergétique',
        'Interfaces homme-machine',
        'Diagnostics et debug embarqués'
      ],
      color: 'bg-amber-500'
    },
    {
      id: 9,
      category: 'electronique',
      title: 'Objets connectés & IoT',
      description: 'Créez des objets connectés innovants pour répondre à vos besoins spécifiques.',
      icon: <FaNetworkWired className="text-xl" />,
      features: [
        'Conception matérielle et logicielle',
        'Connectivité sans fil avancée',
        'Gestion des données IoT',
        'Tableaux de bord et visualisation',
        'Maintenance prédictive'
      ],
      color: 'bg-emerald-500'
    },
    {
      id: 10,
      category: 'electronique',
      title: 'Prototypage électronique & PCB',
      description: 'Du concept à la réalisation, nous concevons vos prototypes électroniques.',
      icon: <FaMicrochip className="text-xl" />,
      features: [
        'Conception de schémas électroniques',
        'Design de PCB multi-couches',
        'Prototypage rapide',
        'Tests et validation',
        'Préparation pour la production'
      ],
      color: 'bg-orange-500'
    },
    {
      id: 11,
      category: 'electronique',
      title: 'Impression 3D & Fabrication',
      description: 'Services d\'impression 3D et de fabrication pour vos projets.',
      icon: <FaPrint className="text-xl" />,
      features: [
        'Impression 3D haute précision',
        'Multiples matériaux disponibles',
        'Conception assistée par ordinateur',
        'Prototypage rapide',
        'Production en petites séries'
      ],
      color: 'bg-pink-500'
    },
    {
      id: 12,
      category: 'electronique',
      title: 'Électronique industrielle & automatisation',
      description: 'Solutions d\'automatisation industrielle pour optimiser vos processus.',
      icon: <FaIndustry className="text-xl" />,
      features: [
        'Systèmes de contrôle industriel',
        'Automates programmables (PLC)',
        'SCADA et HMI',
        'Systèmes d\'acquisition de données',
        'Maintenance prédictive'
      ],
      color: 'bg-rose-500'
    }
  ];
  
  // Effet pour l'animation d'entrée des services
  useEffect(() => {
    const handleScroll = () => {
      if (!servicesRef.current) return;
      
      const cards = servicesRef.current.querySelectorAll('.service-card');
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.85;
        
        if (isInView) {
          setVisibleServices(prev => ({ ...prev, [index]: true }));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Déclencher une fois au chargement
    setTimeout(handleScroll, 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const [activeCategory, setActiveCategory] = useState<'informatique' | 'electronique' | 'all'>('all');
  
  const filteredServices = servicesData.filter(service => 
    activeCategory === 'all' || service.category === activeCategory
  );

  return (
    <section className="py-20 px-4 md:px-8" id="services-detail" ref={servicesRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold mb-6 relative inline-block ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Nos Services Premium
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`max-w-3xl mx-auto text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Découvrez notre gamme complète de services technologiques haut de gamme. De l'idée à la réalité, nous transformons vos visions en solutions concrètes avec excellence.
          </motion.p>
        </div>
        
        {/* Onglets de catégories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className={`inline-flex rounded-xl shadow-sm p-1 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                activeCategory === 'all' 
                  ? `${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white shadow-lg` 
                  : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
              }`}
            >
              Tous les services
            </button>
            <button
              onClick={() => setActiveCategory('informatique')}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                activeCategory === 'informatique' 
                  ? `${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white shadow-lg` 
                  : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
              }`}
            >
              Solutions Informatiques
            </button>
            <button
              onClick={() => setActiveCategory('electronique')}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                activeCategory === 'electronique' 
                  ? `${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white shadow-lg` 
                  : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
              }`}
            >
              Innovations Électroniques
            </button>
          </div>
        </motion.div>
        
        {/* Grille de services */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <div key={service.id} className="service-card">
                <ServiceDetailCard 
                  service={service} 
                  isVisible={!!visibleServices[index]} 
                  isDarkMode={isDarkMode}
                />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// Section CTA améliorée
function ServicesCTASection() {
  const { isDarkMode } = useTheme();
  
  return (
    <section className={`py-24 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} relative overflow-hidden`}>
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400 rounded-full opacity-10"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full opacity-10"></div>
        {isDarkMode && (
          <>
            <div className="absolute top-20 right-20 w-40 h-40 bg-blue-300 rounded-full opacity-5"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-300 rounded-full opacity-5"></div>
          </>
        )}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Prêt à concrétiser votre projet technologique ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-lg mb-8 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}
          >
            Contactez notre équipe d'experts pour discuter de votre projet et recevoir une solution sur mesure qui répond exactement à vos besoins.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className={`px-8 py-4 rounded-xl font-medium transition-all ${
              isDarkMode 
                ? 'bg-white text-blue-900 hover:bg-gray-100 shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 shadow-lg hover:shadow-xl'
            } transform hover:-translate-y-1 flex items-center justify-center`}>
              <FiMail className="mr-2" />
              Demander un devis personnalisé
            </button>
            <button className={`px-8 py-4 rounded-xl font-medium transition-all ${
              isDarkMode 
                ? 'bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-lg hover:shadow-xl' 
                : 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50 shadow-lg hover:shadow-xl'
            } transform hover:-translate-y-1 flex items-center justify-center`}>
              <FiPhone className="mr-2" />
              Parler à un expert
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Composant FAQ amélioré
function ServicesFAQSection() {
  const { isDarkMode } = useTheme();
  const [openItems, setOpenItems] = useState<{[key: number]: boolean}>({});
  
  const faqItems = [
    {
      question: "Comment se déroule un projet avec KOBATECH AI ?",
      answer: "Notre processus commence par une consultation initiale approfondie pour comprendre vos besoins spécifiques. Nous élaborons ensuite une proposition technique et financière détaillée. Une fois validée, notre équipe d'experts passe à la phase de conception et de développement, avec des points d'étape réguliers. Nous effectuons des tests rigoureux avant la livraison finale et proposons un accompagnement post-projet."
    },
    {
      question: "Quels sont vos délais de réalisation pour un projet web ou électronique ?",
      answer: "Les délais varient selon la complexité du projet. Pour un site vitrine : 2-3 semaines. Un site e-commerce : 4-8 semaines. Un projet IoT complexe : 2-4 mois. Nous établissons toujours un calendrier réaliste dès le début et tenons nos engagements de délai grâce à notre méthodologie agile."
    },
    {
      question: "Proposez-vous des services de maintenance après la livraison ?",
      answer: "Absolument. Nous proposons plusieurs formules de maintenance adaptées : Basique (mises à jour critiques), Standard (mises à jour + support), Premium (maintenance complète + améliorations). Nos contrats incluent des sauvegardes régulières, des audits de sécurité, et une disponibilité technique 24/7 pour les clients Premium."
    },
    {
      question: "Comment assurez-vous la confidentialité et la sécurité des données ?",
      answer: "La sécurité est au cœur de nos préoccupations. Nous appliquons les standards les plus stricts : chiffrement AES-256, authentification à deux facteurs, audits de sécurité trimestriels, conformité RGPD et ISO 27001. Nos développeurs sont certifiés en sécurité informatique et nous utilisons des infrastructures sécurisées de niveau bancaire."
    },
    {
      question: "Quelle est votre politique en matière de propriété intellectuelle ?",
      answer: "Tous les droits de propriété intellectuelle des solutions développées vous sont transférés après paiement intégral. Nous fournissons une documentation complète et le code source commenté. Pour les projets spécifiques, nous pouvons signer des accords de confidentialité et de non-concurrence."
    },
    {
      question: "Travaillez-vous avec des clients internationaux ? Quels sont vos modes de collaboration ?",
      answer: "Oui, 40% de nos clients sont internationaux. Nous sommes habitués au travail à distance avec des outils collaboratifs performants (Jira, Slack, Zoom). Nous proposons des créneaux horaires flexibles pour s'adapter à votre fuseau et des réunions bilingues (Français/Anglais). Nos processus sont conçus pour une collaboration transparente à distance."
    }
  ];
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Questions Fréquentes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Trouvez des réponses à vos questions sur nos services, nos méthodes de travail et notre approche client.
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-4 rounded-xl overflow-hidden transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              } ${openItems[index] ? 'shadow-lg' : 'shadow-md'}`}
            >
              <button 
                className={`w-full px-6 py-5 text-left flex justify-between items-center transition-colors duration-300 ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => toggleItem(index)}
              >
                <span className={`font-medium text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openItems[index] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </motion.div>
              </button>
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: openItems[index] ? 'auto' : 0,
                  opacity: openItems[index] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className={`overflow-hidden ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <div className={`p-6 pt-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  {item.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section Contact améliorée
function ContactSection() {
  const { isDarkMode } = useTheme();
  
  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Contactez KOBATECH AI
            </h2>
            <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Notre équipe est à votre disposition pour discuter de votre projet et vous proposer la solution technologique la plus adaptée à vos besoins.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Téléphone</h4>
                  <div className={`mt-1 space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>+226 63 04 80 97</p>
                    <p>+226 56 17 84 48</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Email</h4>
                  <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>kobatechai@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Adresse</h4>
                  <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ouagadougou, Zogona</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <form className={`p-8 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Envoyez-nous un message
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    placeholder="Votre email"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sujet</label>
                <input 
                  type="text" 
                  id="subject" 
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  placeholder="Objet de votre message"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  placeholder="Décrivez votre projet ou votre demande"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
                } shadow-lg hover:shadow-xl`}
              >
                Envoyer le message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Composant principal pour la page des services
function ServicesContent() {
  const { isDarkMode, bgClass, textClass, overlayClass } = useTheme();
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const cursorRef = useRef<{ updateProgress: (progress: number) => void }>(null);
  
  // Effet pour animer la barre de chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 1;
        if (cursorRef.current) {
          cursorRef.current.updateProgress(newProgress);
        }
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${bgClass} min-h-screen overflow-x-hidden font-sans ${textClass}`}>
      {/* Animation de fond avec particules */}
      <ParticleBackground isDarkMode={isDarkMode} />
      
      {/* Overlay avec gradient */}
      <div className={`fixed inset-0 bg-gradient-to-b ${overlayClass} z-0`}></div>
      
      {/* Navigation principale */}
      <MenuKobatech 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => {}} 
      />
      
      {/* Hero Section pour la page des services */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } leading-tight`}
            >
              Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Technologiques</span> sur Mesure
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              KOBATECH AI transforme vos idées en réalité avec des solutions informatiques et électroniques innovantes, conçues pour répondre à vos besoins spécifiques.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className={`px-8 py-4 rounded-xl font-medium transition-all ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white'
              } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}>
                Explorer nos services
              </button>
              <button className={`px-8 py-4 rounded-xl font-medium transition-all ${
                isDarkMode 
                  ? 'bg-transparent border-2 border-white text-white hover:bg-white/10' 
                  : 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
              } shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center`}>
                <FiPhone className="mr-2" />
                Contact rapide
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-600 rounded-full blur-3xl opacity-10"></div>
        </div>
      </section>
      
      {/* Sections de contenu */}
      <ServicesDetailSection />
      <ServicesCTASection />
      <ServicesFAQSection />
      <ContactSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Curseur personnalisé */}
      <CurseurFuturiste ref={cursorRef} progress={loadingProgress} />
      
      {/* Styles globaux */}
      <GlobalStyles />
    </div>
  );
}

// Composant principal avec ThemeProvider
export default function Services() {
  return (
    <ThemeProvider>
      <ServicesContent />
    </ThemeProvider>
  );
}