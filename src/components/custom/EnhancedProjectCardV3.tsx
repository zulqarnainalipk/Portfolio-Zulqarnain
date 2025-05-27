import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { EnhancedProjectItem } from '../../data/enhancedPortfolioData';
import { 
  Github, 
  ExternalLink, 
  Award, 
  BarChart4, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Star
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { 
  enhancedShine,
  enhancedFloatingAnimation,
  buttonAnimation,
  confettiAnimation,
  staggeredCardEntrance
} from '../../lib/animation';

interface EnhancedProjectCardProps {
  project: EnhancedProjectItem;
  index: number;
}

const EnhancedProjectCardV3: React.FC<EnhancedProjectCardProps> = ({ project, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTechnologies, setShowTechnologies] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();

  // For magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  // Handle mouse move for magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Apply magnetic effect with smoothing
    x.set(mouseX * 0.3); // Reduce strength for smoother effect
    y.set(mouseY * 0.3);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    // Animate back to center smoothly
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Show confetti when featured project is first viewed
  useEffect(() => {
    if (inView && project.featured && !showConfetti) {
      setShowConfetti(true);
      
      // Hide confetti after animation completes
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [inView, project.featured, showConfetti]);

  // Start animations when card comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AutoML': '#10b981', // Emerald
      'Healthcare': '#3b82f6', // Blue
      'Computer Vision': '#ef4444', // Red
      'Remote Sensing': '#f59e0b', // Amber
      'NLP': '#8b5cf6', // Violet
      'Audio Processing': '#ec4899', // Pink
      'Privacy': '#6366f1', // Indigo
    };
    
    return colors[category] || '#6b7280'; // Gray as default
  };

  // Enhanced tech badge animations
  const techBadgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        delay: 0.1 + (i * 0.05),
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }),
    hover: { 
      y: -5, 
      scale: 1.1, 
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { 
      y: 0, 
      scale: 0.95, 
      transition: { duration: 0.1 } 
    }
  };

  // Enhanced breathing animation for the card
  const breathingAnimation = {
    initial: { 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      y: 0
    },
    animate: { 
      boxShadow: [
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        `0 15px 25px -5px ${getCategoryColor(project.category)}50, 0 10px 10px -6px rgba(0, 0, 0, 0.1)`,
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      ],
      y: [0, -3, 0],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut"
      }
    }
  };

  // Particle animation for featured projects
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    return [...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: 6 + Math.random() * 6,
          height: 6 + Math.random() * 6,
          backgroundColor: i % 3 === 0 ? getCategoryColor(project.category) : 
                           i % 3 === 1 ? '#FFD700' : '#ffffff',
          borderRadius: i % 2 === 0 ? '50%' : '2px',
          top: '-10px',
          left: 40 + (i * 10),
          zIndex: 10
        }}
        variants={confettiAnimation(i)}
        initial="initial"
        animate="animate"
      />
    ));
  };

  return (
    <motion.div
      ref={(node) => {
        // @ts-ignore - combine refs
        ref(node);
        cardRef.current = node;
      }}
      initial="hidden"
      animate={controls}
      variants={staggeredCardEntrance.child(index)}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: "transform"
      }}


      className="h-full bg-card rounded-xl overflow-hidden shadow-lg border border-border transition-all duration-300 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        y: -8, 
        boxShadow: `0 20px 25px -5px ${getCategoryColor(project.category)}40, 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
        borderColor: `${getCategoryColor(project.category)}60`,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      {/* Confetti animation for featured projects */}
      {project.featured && renderConfetti()}
      
      <div className="relative h-48 overflow-hidden group">
        {/* Enhanced Image with smooth scale transition */}
        <motion.div
          className="w-full h-full overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, filter: 'blur(5px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.15, 
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }}
          />
        </motion.div>
        
        {/* Enhanced overlay with gradient and interactive elements */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center">
            <motion.span 
              className="text-xs font-semibold px-3 py-1 rounded-full text-white backdrop-blur-sm" 
              style={{ 
                backgroundColor: `${getCategoryColor(project.category)}90`,
                boxShadow: `0 0 15px ${getCategoryColor(project.category)}50`
              }}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: `0 0 20px ${getCategoryColor(project.category)}`,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {project.category}
            </motion.span>
            
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
            >
              {project.github && (
                <motion.a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: 5,
                    boxShadow: '0 0 15px rgba(255,255,255,0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Github size={16} className="text-white" />
                </motion.a>
              )}
              
              {project.demo && (
                <motion.a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: -5,
                    boxShadow: '0 0 15px rgba(255,255,255,0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ExternalLink size={16} className="text-white" />
                </motion.a>
              )}
              
              {project.kaggle && (
                <motion.a 
                  href={project.kaggle} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: 5,
                    boxShadow: '0 0 15px rgba(255,255,255,0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Award size={16} className="text-white" />
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Enhanced shine effect with better tracking */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            variants={enhancedShine}
            animate="animate"
            style={{
              backgroundSize: '300% 100%',
              zIndex: 2
            }}
          />
        )}
        
        {/* Featured badge with animation */}
        {project.featured && (
          <motion.div
            className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-bl-md transform origin-top-right z-10"
            initial={{ scale: 0, x: 20 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ 
              delay: index * 0.1 + 0.3, 
              type: 'spring', 
              stiffness: 300, 
              damping: 15 
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 5px 15px rgba(255, 193, 7, 0.4)'
            }}
          >
            <div className="flex items-center">
              <Star size={12} className="mr-1" />
              Featured
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2 flex justify-between items-start">
          <motion.h3 
            className="text-xl font-bold text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.1 }}
          >
            {project.title}
          </motion.h3>
        </div>
        
        <motion.h4 
          className="text-sm text-muted-foreground mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {project.subtitle}
        </motion.h4>
        
        <motion.p 
          className="text-muted-foreground text-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-1.5 mb-4"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: index * 0.1 + 0.3 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {project.technologies.slice(0, 5).map((tech, i) => (
            <motion.span 
              key={i} 
              className="text-xs bg-secondary-foreground/10 px-2 py-1 rounded-full text-muted-foreground"
              variants={techBadgeVariants}
              whileHover="hover"
              whileTap="tap"
              custom={i}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 5 && (
            <motion.button
              onClick={() => setShowTechnologies(!showTechnologies)}
              className="text-xs bg-secondary-foreground/10 px-2 py-1 rounded-full text-primary flex items-center"
              variants={techBadgeVariants}
              whileHover="hover"
              whileTap="tap"
              custom={6}
            >
              +{project.technologies.length - 5}
              <motion.div
                animate={{ rotate: showTechnologies ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-1"
              >
                <ChevronDown size={12} />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
        
        {/* Expanded technologies with improved animations */}
        <AnimatePresence>
          {showTechnologies && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-4"
            >
              <motion.div 
                className="p-3 bg-secondary/30 rounded-md border border-border"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h5 className="text-xs font-semibold mb-2">All Technologies:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      className="text-xs bg-secondary-foreground/10 px-2 py-1 rounded-full text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        backgroundColor: `${getCategoryColor(project.category)}20`,
                        color: getCategoryColor(project.category)
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="mt-4 border-t border-border pt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <motion.button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary text-sm flex items-center focus:outline-none"
            variants={buttonAnimation}
            whileHover="hover"
            whileTap="tap"
          >
            <BarChart4 size={16} className="mr-1" />
            {showDetails ? "Hide Details" : "Show Metrics"}
            <motion.div
              animate={{ rotate: showDetails ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-1"
            >
              <ArrowRight size={14} />
            </motion.div>
          </motion.button>
          
          {/* Enhanced expanded details with better animations */}
          <AnimatePresence>
            {showDetails && (
              <motion.div 
                className="mt-3 space-y-3"
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <motion.div 
                  className="grid grid-cols-2 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {Object.entries(project.metrics).map(([key, value], i) => (
                    <motion.div 
                      key={key} 
                      className="bg-secondary-foreground/5 p-2 rounded-md border border-border/40"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                      whileHover={{ 
                        y: -3,
                        boxShadow: `0 8px 15px -5px ${getCategoryColor(project.category)}20`,
                        borderColor: `${getCategoryColor(project.category)}40`,
                        backgroundColor: `${getCategoryColor(project.category)}05`
                      }}
                    >
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {value}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="bg-secondary/30 p-3 rounded-md border border-border/40"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  whileHover={{ 
                    boxShadow: `0 10px 25px -5px ${getCategoryColor(project.category)}20`,
                    borderColor: `${getCategoryColor(project.category)}30`,
                    y: -2
                  }}
                >
                  <h5 className="text-xs font-semibold mb-2">Key Achievements:</h5>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    {project.keyAchievements.map((achievement, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                      >
                        <motion.span 
                          className="w-2 h-2 rounded-full bg-primary mt-1.5 mr-2.5 flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.2 }}
                          whileHover={{ scale: 1.5, backgroundColor: getCategoryColor(project.category) }}
                        />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-xs bg-secondary/40 p-2 rounded-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <span className="font-semibold">Duration:</span>
                  <span>{project.duration}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectCardV3;