import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { enhancedSkillCategories } from '../../data/enhancedPortfolioData';
import { 
  progressBar, 
  enhancedSkillTag, 
  enhancedTypingContainer, 
  enhancedTypingCharacter,
  enhancedGradientShift,
  waveAnimation,
  progressCircle,
  particleEffect,
  confettiAnimation
} from '../../lib/animation';
import { Brain, BarChart, Database, Globe, Eye, Code, Cloud, Cpu, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import AnimatedCard from './AnimatedCard';

// Map skill category IDs to their respective icons
const getCategoryIcon = (iconName: string, className: string) => {
  const icons: Record<string, JSX.Element> = {
    'Brain': <Brain className={className} />,
    'BarChart': <BarChart className={className} />,
    'Database': <Database className={className} />,
    'Globe': <Globe className={className} />,
    'Eye': <Eye className={className} />,
    'Code': <Code className={className} />,
    'Cloud': <Cloud className={className} />,
    'Cpu': <Cpu className={className} />
  };
  
  return icons[iconName] || <Code className={className} />;
};

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

// Animated counter for proficiency percentages
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2,
  prefix = '',
  suffix = ''
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = Math.min(value, 100);
      const totalFrames = Math.min(end * 2, 120); // Cap at 120 frames for performance
      const increment = end / totalFrames;
      const timePerFrame = (duration * 1000) / totalFrames;
      
      const counter = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        
        if (start >= end) {
          clearInterval(counter);
          setCount(end);
        }
      }, timePerFrame);
      
      controls.start("visible");
      
      return () => clearInterval(counter);
    }
  }, [value, duration, inView, controls]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      className="text-right text-sm font-medium"
    >
      {prefix}{count}{suffix}
    </motion.div>
  );
};

// Enhanced animated skill bar with gradient and pulse effect
const EnhancedSkillBar: React.FC<{ 
  name: string; 
  percentage: number; 
  color: string;
  delay?: number;
}> = ({ 
  name, 
  percentage, 
  color,
  delay = 0
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <div 
      ref={ref} 
      className="mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-1">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay, duration: 0.5 }}
        >
          {/* Skill name with typing effect */}
          <motion.h4 
            className="text-sm font-medium"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ delay: delay, duration: 0.5 }}
          >
            {name}
          </motion.h4>
          
          {/* Show small star icon if percentage is > 90 */}
          {percentage > 90 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.5, type: "spring" }}
              className="ml-1"
            >
              <Star size={12} className="text-yellow-400" />
            </motion.div>
          )}
        </motion.div>
        
        <AnimatedCounter value={percentage} suffix="%" />
      </div>
      
      {/* Skill bar container */}
      <div 
        className="h-3 w-full bg-secondary-foreground/10 rounded-full overflow-hidden relative"
        style={{ boxShadow: isHovered ? `0 0 8px ${color}80` : "none" }}
      >
        {/* Progress bar with gradient */}
        <motion.div 
          className="h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: isHovered ? `0 0 10px ${color}` : "none"
          }}
          initial="hidden"
          animate={controls}
          custom={percentage}
          variants={progressBar(delay, 1)}
        />
        
        {/* Animated glow effect */}
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ width: `${percentage}%`, background: `${color}50` }}
            animate={{ 
              boxShadow: [`0 0 5px ${color}80`, `0 0 12px ${color}`, `0 0 5px ${color}80`] 
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" as const }}
          />
        )}
        
        {/* Progress markers */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="h-full w-px bg-background/60"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced floating skill tag with subtle physics
const EnhancedFloatingSkillTag: React.FC<{
  skill: string;
  index: number;
  color: string;
}> = ({ skill, index, color }) => {
  // Create random but stable positions and animation parameters
  const position = useRef({
    left: `${10 + (index * 11) % 75}%`,
    top: `${5 + (index * 13) % 80}%`,
    animDuration: 4 + (index % 5),
    animDelay: index * 0.15,
    rotation: (index % 2 === 0) ? [-1, 1, -1] : [1, -1, 1]
  });
  
  return (
    <motion.div
      className="absolute rounded-full px-3 py-1 text-xs font-medium text-white shadow-lg"
      style={{
        left: position.current.left,
        top: position.current.top,
        backgroundColor: `${color}dd`, // Less transparency
        zIndex: index % 3,
        boxShadow: `0 2px 10px ${color}50`,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -15, 0],
        rotate: position.current.rotation,
        boxShadow: [
          `0 2px 10px ${color}30`,
          `0 4px 15px ${color}50`,
          `0 2px 10px ${color}30`
        ]
      }}
      transition={{
        opacity: { duration: 0.5, delay: position.current.animDelay },
        scale: { duration: 0.5, delay: position.current.animDelay },
        y: { 
          duration: position.current.animDuration, 
          repeat: Infinity, 
          repeatType: "mirror" as const, 
          ease: "easeInOut",
          delay: position.current.animDelay
        },
        rotate: {
          duration: position.current.animDuration * 1.2,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
          delay: position.current.animDelay
        },
        boxShadow: {
          duration: position.current.animDuration * 0.8,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: `0 5px 20px ${color}70`,
        transition: { duration: 0.2 }
      }}
    >
      {skill}
    </motion.div>
  );
};

// Enhanced typing animation component
const EnhancedTypingAnimation: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const words = text.split(' ');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  
  return (
    <motion.div
      ref={ref}
      className={`${className || ''} overflow-hidden`}
      variants={enhancedTypingContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1.5">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={enhancedTypingCharacter}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

// Animated particles component
const ParticleEffect: React.FC<{ color: string; count?: number }> = ({ color, count = 15 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ 
            width: 2 + (i % 3) * 2,
            height: 2 + (i % 3) * 2,
            backgroundColor: color,
            top: `${20 + Math.sin(i) * 60}%`,
            left: `${20 + Math.cos(i) * 60}%`,
            opacity: 0.6,
            boxShadow: `0 0 5px ${color}`
          }}
          animate={particleEffect.animate(i)}
        />
      ))}
    </div>
  );
};

// Enhanced skill category card with animated background and effects
const EnhancedSkillCategoryCard: React.FC<{
  category: typeof enhancedSkillCategories[0];
  index: number;
}> = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Display only first 3 skills by default, show all when showAllSkills is true
  const displaySkills = showAllSkills 
    ? category.skills 
    : category.skills.slice(0, 3);
  
  return (
    <AnimatedCard
      ref={ref}
      index={index}
      delay={index * 0.1}
      className="p-6 backdrop-blur-sm bg-secondary/60"
      hoverEffect="magnetic"
      continuousAnimation={index % 2 === 0 ? "float" : "breathe"}
      borderColor={`${category.color}40`}
      glowColor={`${category.color}30`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 opacity-10 z-0 rounded-xl"
        style={{ 
          background: `linear-gradient(120deg, ${category.color}20, transparent, ${category.color}30)`,
          backgroundSize: '300% 300%'
        }}
        variants={enhancedGradientShift}
        animate="animate"
      />
      
      {/* Particle effect for hover */}
      {isHovered && <ParticleEffect color={category.color} />}
      
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.7 }}
            className="p-2 bg-secondary/80 rounded-full shadow-md"
          >
            {getCategoryIcon(category.icon, `w-8 h-8 text-[${category.color}]`)}
          </motion.div>
          
          <EnhancedTypingAnimation 
            text={category.name}
            className="text-xl font-semibold ml-3"
          />
        </div>
        
        <EnhancedSkillBar 
          name={`${category.name} Proficiency`} 
          percentage={category.proficiency} 
          color={category.color}
          delay={index * 0.1}
        />
        
        {/* Skills list with advanced animations */}
        <motion.ul 
          className="space-y-2 mt-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3 + (index * 0.1)
              }
            }
          }}
        >
          {displaySkills.map((skill, skillIndex) => (
            <motion.li 
              key={skillIndex} 
              className="text-muted-foreground flex items-center text-sm"
              variants={enhancedSkillTag}
              whileHover="hover"
              custom={skillIndex}
            >
              <motion.span 
                className="w-2.5 h-2.5 rounded-full mr-2.5 shrink-0" 
                style={{
                  backgroundColor: category.color,
                  boxShadow: isHovered ? `0 0 5px ${category.color}` : 'none'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + skillIndex * 0.1, duration: 0.2 }}
                whileHover={{ scale: 1.5 }}
              />
              <span className="transition-colors duration-200 hover:text-foreground">
                {skill}
              </span>
            </motion.li>
          ))}
          
          {/* Show more/less toggle if there are more than 3 skills */}
          {category.skills.length > 3 && (
            <motion.li 
              className="text-primary flex items-center justify-end text-xs cursor-pointer mt-2"
              onClick={() => setShowAllSkills(!showAllSkills)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllSkills ? 'Show less' : `+${category.skills.length - 3} more skills`}
            </motion.li>
          )}
        </motion.ul>
      </div>
    </AnimatedCard>
  );
};

// Wave background effect component
const WaveBackground: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-[30%] opacity-10"
          style={{ 
            top: `${30 + (i * 20)}%`,
            background: `linear-gradient(90deg, transparent, ${color}50, transparent)`,
            height: `${10 + (i * 5)}%`,
            borderRadius: '50%',
            filter: 'blur(10px)'
          }}
          variants={waveAnimation}
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

// Main enhanced 2D Skills Visualization Component
const SkillsVisualization2D: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Extract all unique skills for the floating animation
  const allSkills = React.useMemo(() => {
    const skills: string[] = [];
    enhancedSkillCategories.forEach(category => {
      category.skills.forEach(skill => {
        if (!skills.includes(skill)) {
          skills.push(skill);
        }
      });
    });
    return skills;
  }, []);
  
  // Get a stable color for each skill
  const getSkillColor = (index: number) => {
    const categoryIndex = index % enhancedSkillCategories.length;
    return enhancedSkillCategories[categoryIndex].color;
  };
  
  return (
    <div className="w-full space-y-12">
      {/* Enhanced Floating Skills Visualization */}
      <div 
        ref={ref}
        className="relative h-[350px] md:h-[450px] w-full rounded-xl overflow-hidden bg-secondary/30 shadow-xl border border-border"
      >
        {/* Wave background animation */}
        <WaveBackground color="#6366f1" />
        
        {/* Floating skill tags */}
        {inView && allSkills.slice(0, 30).map((skill, index) => (
          <EnhancedFloatingSkillTag 
            key={index} 
            skill={skill} 
            index={index} 
            color={getSkillColor(index)} 
          />
        ))}
        
        {/* Enhanced central glowing orb */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 20px rgba(0, 163, 136, 0.3)',
              '0 0 60px rgba(0, 163, 136, 0.6)',
              '0 0 20px rgba(0, 163, 136, 0.3)'
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut"
          }}
        >
          {/* Pulsing inner circle */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ 
              scale: [0.6, 1, 0.6],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut"
            }}
          />
          
          {/* Central icon */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-10 h-10 text-primary" />
          </motion.div>
        </motion.div>
        
        {/* Orbiting particles */}
        {inView && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-primary/80"
            style={{
              boxShadow: '0 0 8px rgba(0, 163, 136, 0.6)',
            }}
            animate={{
              x: Math.cos(i * Math.PI / 4) * 120,
              y: Math.sin(i * Math.PI / 4) * 120,
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "linear",
              delay: i * 0.5,
              times: [0, 0.5, 1]
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Skill Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {enhancedSkillCategories.map((category, index) => (
          <EnhancedSkillCategoryCard 
            key={category.id} 
            category={category} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsVisualization2D;