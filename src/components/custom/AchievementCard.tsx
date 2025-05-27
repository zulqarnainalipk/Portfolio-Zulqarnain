import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Medal, ExternalLink, Clock, Building, Info } from 'lucide-react';
import { 
  enhancedFloatingAnimation, 
  enhancedShine, 
  staggeredCardEntrance,
  bouncyAnimation,
  confettiAnimation
} from '../../lib/animation';
import { useInView } from 'react-intersection-observer';
import AnimatedCard from './AnimatedCard';

interface AchievementCardProps {
  achievement: {
    title: string;
    competition: string;
    organizer: string;
    year: string;
    image: string;
    type: string;
    description: string;
  };
  index: number;
  onClick: () => void;
}

const EnhancedAchievementCard: React.FC<AchievementCardProps> = ({ achievement, index, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const iconRef = useRef<HTMLDivElement>(null);
  
  // Get icon and colors based on achievement type
  const getAchievementIcon = (type: string) => {
    if (type.includes('gold') || type.includes('winner') || type.includes('1st')) {
      return <Trophy className="w-10 h-10 text-yellow-400 flex-shrink-0" />;
    } else if (type.includes('silver') || type.includes('2nd')) {
      return <Medal className="w-10 h-10 text-gray-300 flex-shrink-0" />;
    } else if (type.includes('bronze') || type.includes('3rd')) {
      return <Medal className="w-10 h-10 text-amber-600 flex-shrink-0" />;
    } else if (type.includes('star')) {
      return <Star className="w-10 h-10 text-green-500 flex-shrink-0" />;
    }
    return <Award className="w-10 h-10 text-primary flex-shrink-0" />;
  };

  // Get achievement colors based on type
  const getAchievementColors = (type: string) => {
    if (type.includes('gold') || type.includes('winner') || type.includes('1st')) {
      return {
        primary: '#FFD700', // Gold
        secondary: '#FFC107', // Amber
        textColor: 'text-yellow-400',
        gradientFrom: 'from-yellow-400/20',
        gradientTo: 'to-amber-300/10',
        iconGlow: '0 0 15px rgba(255, 215, 0, 0.6)',
        border: 'rgba(255, 215, 0, 0.3)',
        borderHover: 'rgba(255, 215, 0, 0.6)'
      };
    } else if (type.includes('silver') || type.includes('2nd')) {
      return {
        primary: '#C0C0C0', // Silver
        secondary: '#A0AEC0', // Cool gray
        textColor: 'text-gray-300',
        gradientFrom: 'from-gray-300/20',
        gradientTo: 'to-gray-400/10',
        iconGlow: '0 0 15px rgba(192, 192, 192, 0.6)',
        border: 'rgba(192, 192, 192, 0.3)',
        borderHover: 'rgba(192, 192, 192, 0.6)'
      };
    } else if (type.includes('bronze') || type.includes('3rd')) {
      return {
        primary: '#CD7F32', // Bronze
        secondary: '#B7653C', // Brown
        textColor: 'text-amber-600',
        gradientFrom: 'from-amber-600/20',
        gradientTo: 'to-amber-700/10',
        iconGlow: '0 0 15px rgba(205, 127, 50, 0.6)',
        border: 'rgba(205, 127, 50, 0.3)',
        borderHover: 'rgba(205, 127, 50, 0.6)'
      };
    } else if (type.includes('star')) {
      return {
        primary: '#00A388', // Teal
        secondary: '#00BFA5', // Green
        textColor: 'text-green-500',
        gradientFrom: 'from-green-500/20',
        gradientTo: 'to-emerald-400/10',
        iconGlow: '0 0 15px rgba(0, 163, 136, 0.6)',
        border: 'rgba(0, 163, 136, 0.3)',
        borderHover: 'rgba(0, 163, 136, 0.6)'
      };
    }
    
    // Default - Award
    return {
      primary: '#6366F1', // Indigo
      secondary: '#818CF8', // Light indigo
      textColor: 'text-primary',
      gradientFrom: 'from-primary/20',
      gradientTo: 'to-indigo-400/10',
      iconGlow: '0 0 15px rgba(99, 102, 241, 0.6)',
      border: 'rgba(99, 102, 241, 0.3)',
      borderHover: 'rgba(99, 102, 241, 0.6)'
    };
  };

  // Get color values
  const colors = getAchievementColors(achievement.type);

  // Handle click
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      onClick();
    }
  };
  
  // Trigger the particles animation on hover
  const handleIconHover = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 1500);
  };
  
  // Render particles around the icon
  const renderParticles = () => {
    if (!showParticles) return null;
    
    return [...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 4 + (i % 3),
          height: 4 + (i % 3),
          backgroundColor: colors.primary,
          boxShadow: `0 0 5px ${colors.primary}`,
          top: '50%',
          left: '50%',
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
      className="group relative w-full"
      index={index}
      delay={index * 0.05}
      hoverEffect="magnetic"
      continuousAnimation="float"
      borderColor={colors.border}
      glowColor={`${colors.primary}30`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} opacity-30 rounded-xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Card with flip effect */}
      <AnimatePresence initial={false} mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            className="p-5 h-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-4">
              {/* Icon with animations */}
              <motion.div
                ref={iconRef}
                className="relative"
                whileHover={{ scale: 1.1 }}
                onHoverStart={handleIconHover}
                animate={showParticles ? "animate" : "initial"}
                variants={bouncyAnimation}
                style={{ 
                  filter: isHovered ? `drop-shadow(${colors.iconGlow})` : 'none',
                  transition: 'filter 0.3s ease-out'
                }}
              >
                {getAchievementIcon(achievement.type)}
                {renderParticles()}
              </motion.div>
              
              {/* Content with animations */}
              <div className="flex-1">
                <motion.h3 
                  className={`text-lg font-semibold ${isHovered ? colors.textColor : 'text-card-foreground'} transition-colors duration-300`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {achievement.title}
                </motion.h3>
                
                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Trophy size={12} className="mr-1.5 flex-shrink-0" />
                    {achievement.competition}
                  </p>
                  
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Building size={12} className="mr-1.5 flex-shrink-0" />
                    {achievement.organizer}
                  </p>
                  
                  <p className="text-muted-foreground text-xs flex items-center">
                    <Clock size={10} className="mr-1.5 flex-shrink-0" />
                    {achievement.year}
                  </p>
                </motion.div>
                
                <motion.p 
                  className="text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {achievement.description}
                </motion.p>
              </div>
            </div>
            
            {/* Flip instruction - subtle hint */}
            <div className="absolute bottom-2 right-2 flex items-center text-xs text-muted-foreground opacity-0 group-hover:opacity-70 transition-opacity">
              <span>Tap for details</span>
              <ExternalLink size={12} className="ml-1" />
            </div>
            
            {/* Enhanced shine effect */}
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
            key="back"
            className="p-5 h-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back content with enhanced animations */}
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.2, 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 15 
                }}
                className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg`}
                style={{ 
                  backgroundColor: `${colors.primary}20`,
                  boxShadow: colors.iconGlow
                }}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {getAchievementIcon(achievement.type)}
              </motion.div>
              
              <motion.div 
                className="text-center space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className={`text-lg font-bold mb-1 ${colors.textColor}`}>{achievement.title}</h3>
                <p className="text-muted-foreground text-sm">{achievement.competition}</p>
                <motion.div 
                  className={`text-sm font-medium mt-2 px-3 py-1 rounded-full inline-flex items-center`}
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: `${colors.primary}30`
                  }}
                >
                  {achievement.organizer} • {achievement.year}
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="text-sm text-center max-w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="flex items-start">
                  <Info size={16} className={`${colors.textColor} mr-2 flex-shrink-0 mt-0.5`} />
                  <p>{achievement.description}</p>
                </div>
              </motion.div>
              
              {/* Flip back button */}
              <motion.button
                className="absolute bottom-2 right-2 flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Flip back</span>
                <ExternalLink size={12} className="ml-1 rotate-180" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};

export default EnhancedAchievementCard;