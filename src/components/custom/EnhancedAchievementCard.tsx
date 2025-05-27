import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Medal, Clock, Building, Info } from 'lucide-react';
import { 
  enhancedShine, 
  staggeredCardEntrance,
  bouncyAnimation,
  confettiAnimation
} from '../../lib/animation';
import { useInView } from 'react-intersection-observer';
import UniversalCard from './UniversalCard';

interface EnhancedAchievementCardProps {
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

const EnhancedAchievementCard: React.FC<EnhancedAchievementCardProps> = ({ achievement, index, onClick }) => {
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
    onClick();
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
    <UniversalCard
      ref={ref}
      index={index}
      className="relative w-full overflow-hidden min-h-[200px] bg-card"
      onClick={handleClick}
      animationType="bounce"
      borderColor={colors.border}
      glowColor={`${colors.primary}30`}
    >
      {/* Background gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} opacity-30 rounded-xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="p-5 h-full relative z-10">
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
          
          <div className="flex-1">
            <motion.h3 
              className={`text-lg font-bold ${colors.textColor}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {achievement.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {achievement.competition}
            </motion.p>
          </div>
        </div>
        
        <motion.div 
          className="mt-4 border-t border-border pt-4 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center text-xs text-muted-foreground">
            <Building size={14} className="mr-1.5" /> 
            {achievement.organizer}
          </div>
          
          <div className="flex items-center justify-end text-xs text-muted-foreground">
            <Clock size={14} className="mr-1.5" /> 
            {achievement.year}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-end mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="flex items-center text-xs text-primary"
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info size={14} className="mr-1" /> Details
          </motion.button>
        </motion.div>
        
        {/* Animated shine effect */}
        <motion.div 
          className="absolute top-0 right-0 h-20 w-20 opacity-0 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
          }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "mirror" as const,
            ease: "easeInOut"
          }}
        />
        
        {/* Badge for achievement type */}
        <motion.div
          className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ 
            backgroundColor: `${colors.primary}30`,
            color: colors.primary,
            boxShadow: `0 0 10px ${colors.primary}30`
          }}
          initial={{ opacity: 0, scale: 0, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {achievement.type.toUpperCase()}
        </motion.div>
      </div>
    </UniversalCard>
  );
};

export default EnhancedAchievementCard;