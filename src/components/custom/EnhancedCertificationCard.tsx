import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, ChevronDown, ChevronUp, ExternalLink, 
  FileCheck, Lightbulb, CheckCircle, BookOpen, 
  Code, Trophy, ArrowRight
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { 
  enhancedCardFlip, 
  enhancedShine, 
  staggeredCardEntrance, 
  enhancedSkillTag, 
  buttonAnimation,
  enhancedGradientShift,
  confettiAnimation
} from '../../lib/animation';
import AnimatedCard from './AnimatedCard';

interface CertificationCardProps { 
  certification: { 
    title: string; 
    issuer: string; 
    image: string; 
    credentialId?: string;
    skills: string[];
    impactLevel: 'high' | 'medium' | 'low';
  };
  index: number;
  tierLevel: number;
}

const EnhancedCertificationCard: React.FC<CertificationCardProps> = ({ 
  certification, 
  index,
  tierLevel 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const iconRef = useRef<HTMLDivElement>(null);
  
  // Get tier colors and styles
  const getTierStyles = (tier: number) => {
    switch(tier) {
      case 1:
        return {
          bg: 'from-amber-500/20 to-yellow-500/10',
          badgeBg: 'bg-amber-500',
          badgeGlow: '0 0 15px rgba(245, 158, 11, 0.6)',
          borderHover: 'rgba(245, 158, 11, 0.5)',
          iconColor: 'text-amber-500',
          primary: '#F59E0B',
          secondary: '#FCD34D'
        };
      case 2:
        return {
          bg: 'from-emerald-500/20 to-green-500/10',
          badgeBg: 'bg-emerald-500',
          badgeGlow: '0 0 15px rgba(16, 185, 129, 0.6)',
          borderHover: 'rgba(16, 185, 129, 0.5)',
          iconColor: 'text-emerald-500',
          primary: '#10B981',
          secondary: '#34D399'
        };
      case 3:
        return {
          bg: 'from-blue-500/20 to-cyan-500/10',
          badgeBg: 'bg-blue-500',
          badgeGlow: '0 0 15px rgba(59, 130, 246, 0.6)',
          borderHover: 'rgba(59, 130, 246, 0.5)',
          iconColor: 'text-blue-500',
          primary: '#3B82F6',
          secondary: '#60A5FA'
        };
      default:
        return {
          bg: 'from-gray-500/20 to-gray-400/10',
          badgeBg: 'bg-gray-500',
          badgeGlow: '0 0 15px rgba(107, 114, 128, 0.6)',
          borderHover: 'rgba(107, 114, 128, 0.5)',
          iconColor: 'text-gray-500',
          primary: '#6B7280',
          secondary: '#9CA3AF'
        };
    }
  };
  
  const getImpactColor = (level: string) => {
    switch(level) {
      case 'high': return 'text-emerald-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };
  
  // Get issuer icon
  const getIssuerIcon = (issuer: string) => {
    const issuerLower = issuer.toLowerCase();
    
    if (issuerLower.includes('ibm')) {
      return <CheckCircle className={`${tierStyles.iconColor}`} />;
    } else if (issuerLower.includes('coursera') || issuerLower.includes('stanford') || issuerLower.includes('university') || issuerLower.includes('college')) {
      return <BookOpen className={`${tierStyles.iconColor}`} />;
    } else if (issuerLower.includes('google') || issuerLower.includes('cloud') || issuerLower.includes('aws') || issuerLower.includes('azure') || issuerLower.includes('microsoft')) {
      return <Code className={`${tierStyles.iconColor}`} />;
    } else if (issuerLower.includes('deeplearning')) {
      return <Lightbulb className={`${tierStyles.iconColor}`} />;
    } else if (issuerLower.includes('kaggle') || issuerLower.includes('tensorflow')) {
      return <Trophy className={`${tierStyles.iconColor}`} />;
    }
    
    return <Award className={`${tierStyles.iconColor}`} />;
  };

  const tierStyles = getTierStyles(tierLevel);

  // Handle flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    
    // Show confetti when flipping to back
    if (!isFlipped) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };
  
  // Render confetti particles
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    return [...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: 4 + (i % 3),
          height: 4 + (i % 3),
          backgroundColor: i % 2 === 0 ? tierStyles.primary : tierStyles.secondary,
          boxShadow: `0 0 4px ${tierStyles.primary}`,
          top: '10%',
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
    <AnimatedCard
      ref={ref}
      className="relative h-full"
      index={index}
      delay={index * 0.05}
      hoverEffect="tilt"
      continuousAnimation="float"
      borderColor={tierStyles.borderHover}
      glowColor={`${tierStyles.primary}30`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleFlip}
    >
      {/* Background gradient animation */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${tierStyles.bg} rounded-xl opacity-40`}
        variants={enhancedGradientShift}
        animate="animate"
      />
      
      {renderConfetti()}
      
      <div 
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        <AnimatePresence initial={false} mode="wait">
          {!isFlipped ? (
            // Front of card with enhanced animations
            <motion.div 
              key="front"
              className="p-5 h-full relative z-10"
              variants={enhancedCardFlip}
              initial="back"
              animate="front"
              exit="back"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  {/* Tier badge with glow effect */}
                  <motion.div 
                    className={`absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${tierStyles.badgeBg} z-10`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      boxShadow: isHovered ? tierStyles.badgeGlow : 'none'
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.2,
                      boxShadow: { duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: tierStyles.badgeGlow
                    }}
                  >
                    {tierLevel}
                  </motion.div>
                  
                  {/* Certificate image or icon */}
                  {certification.image ? (
                    <motion.div
                      className="relative overflow-hidden rounded-md"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: tierStyles.badgeGlow,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <img 
                        src={certification.image} 
                        alt={`${certification.title} badge`} 
                        className="w-20 h-20 object-contain flex-shrink-0 p-1 border border-border bg-background shadow-md rounded-md" 
                      />
                      
                      {/* Enhanced shine effect on hover */}
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
                    </motion.div>
                  ) : (
                    <motion.div 
                      className={`w-20 h-20 flex items-center justify-center rounded-md`}
                      style={{ 
                        backgroundColor: `${tierStyles.primary}15`,
                        boxShadow: isHovered ? tierStyles.badgeGlow : 'none'
                      }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        boxShadow: tierStyles.badgeGlow
                      }}
                    >
                      <Award className={`w-12 h-12 ${tierStyles.iconColor}`} />
                    </motion.div>
                  )}
                </div>
                
                {/* Certificate information */}
                <div className="flex-grow">
                  <motion.h3 
                    className="text-lg font-semibold text-card-foreground leading-tight"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {certification.title}
                  </motion.h3>
                  
                  <motion.div 
                    className="flex items-center mt-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {getIssuerIcon(certification.issuer)}
                    <p className="text-sm text-muted-foreground ml-1">{certification.issuer}</p>
                  </motion.div>
                  
                  {/* Skills tags with enhanced animations */}
                  <motion.div 
                    className="flex flex-wrap gap-1 mt-3"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.4
                        }
                      }
                    }}
                  >
                    {certification.skills.slice(0, 3).map((skill, i) => (
                      <motion.span 
                        key={i} 
                        className="text-xs bg-secondary-foreground/10 px-2 py-0.5 rounded-full text-muted-foreground"
                        variants={enhancedSkillTag}
                        whileHover="hover"
                        custom={i}
                        style={{
                          boxShadow: isHovered ? `0 0 8px ${tierStyles.primary}20` : 'none'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                    
                    {certification.skills.length > 3 && (
                      <motion.span 
                        className={`text-xs px-2 py-0.5 rounded-full`}
                        variants={enhancedSkillTag}
                        custom={4}
                        style={{ 
                          backgroundColor: `${tierStyles.primary}20`,
                          color: tierStyles.primary
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: `${tierStyles.primary}30`
                        }}
                      >
                        +{certification.skills.length - 3}
                      </motion.span>
                    )}
                  </motion.div>
                  
                  {/* Impact level badge */}
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactColor(certification.impactLevel)}/20 ${getImpactColor(certification.impactLevel)} inline-block`}>
                      {certification.impactLevel.charAt(0).toUpperCase() + certification.impactLevel.slice(1)} Impact
                    </span>
                  </motion.div>
                </div>
              </div>
              
              {/* Flip hint with animation */}
              <motion.div 
                className="absolute bottom-2 right-2 flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: 2 }}
              >
                <span>View details</span>
                <ArrowRight size={10} className="ml-1" />
              </motion.div>
            </motion.div>
          ) : (
            // Back of card with enhanced animations
            <motion.div 
              key="back"
              className="p-5 h-full relative z-10"
              variants={enhancedCardFlip}
              initial="front"
              animate="back"
              exit="front"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <motion.h3 
                    className={`text-lg font-semibold text-center mb-3 ${tierStyles.iconColor}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {certification.title}
                  </motion.h3>
                  
                  <motion.div 
                    className="flex justify-center mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
                  >
                    <motion.div 
                      className="px-3 py-1 rounded-full text-sm font-medium flex items-center"
                      style={{ 
                        backgroundColor: `${tierStyles.primary}20`,
                        color: tierStyles.primary
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: `${tierStyles.primary}30`
                      }}
                    >
                      {getIssuerIcon(certification.issuer)}
                      <span className="ml-1">{certification.issuer}</span>
                    </motion.div>
                  </motion.div>
                  
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Code size={14} className="mr-1" />
                        Skills Covered:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {certification.skills.map((skill, i) => (
                          <motion.span 
                            key={i}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ 
                              backgroundColor: `${tierStyles.primary}15`,
                              color: tierStyles.primary
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.05), duration: 0.3 }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: `${tierStyles.primary}25`
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <span className="text-sm font-medium flex items-center">
                        <Trophy size={14} className="mr-1" />
                        Impact Level:
                      </span>
                      <span className={`text-sm font-semibold ${getImpactColor(certification.impactLevel)}`}>
                        {certification.impactLevel.charAt(0).toUpperCase() + certification.impactLevel.slice(1)}
                      </span>
                    </motion.div>
                    
                    {certification.credentialId && (
                      <motion.div 
                        className="flex items-center space-x-2 text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <FileCheck size={14} className={tierStyles.iconColor} />
                        <span className="text-muted-foreground truncate text-xs">
                          ID: {certification.credentialId.substring(0, 12)}...
                        </span>
                        <motion.a 
                          href={`https://www.credly.com/go/${certification.credentialId}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`hover:underline flex items-center text-xs`}
                          style={{ color: tierStyles.primary }}
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Verify <ExternalLink size={10} className="ml-1" />
                        </motion.a>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Flip back button with animation */}
                <motion.div 
                  className="flex justify-center mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <motion.button
                    className={`text-xs flex items-center px-3 py-1.5 rounded-full`}
                    style={{ 
                      backgroundColor: `${tierStyles.primary}20`,
                      color: tierStyles.primary
                    }}
                    variants={buttonAnimation}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <ChevronDown size={12} className="mr-1" />
                    Flip back
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedCard>
  );
};

export default EnhancedCertificationCard;