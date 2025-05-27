import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Medal, Building, Clock, Info } from 'lucide-react';

// Get achievement icon based on type
const getAchievementIcon = (type: string) => {
  if (type.includes('gold')) {
    return <Trophy className="w-10 h-10 text-yellow-400 flex-shrink-0" />;
  } else if (type.includes('silver')) {
    return <Medal className="w-10 h-10 text-gray-300 flex-shrink-0" />;
  } else if (type.includes('bronze')) {
    return <Medal className="w-10 h-10 text-amber-600 flex-shrink-0" />;
  } else if (type.includes('star')) {
    return <Star className="w-10 h-10 text-green-500 flex-shrink-0" />;
  }
  return <Award className="w-10 h-10 text-primary flex-shrink-0" />;
};

// Get achievement colors based on type
const getAchievementColors = (type: string) => {
  if (type.includes('gold')) {
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
  } else if (type.includes('silver')) {
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
  } else if (type.includes('bronze')) {
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

interface AchievementProps {
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

const SimpleAchievementCard: React.FC<AchievementProps> = ({ achievement, index, onClick }) => {
  const colors = getAchievementColors(achievement.type);
  
  return (
    <motion.div 
      className="bg-card rounded-xl shadow-md border border-border overflow-hidden transition-all min-h-[200px] relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.1, duration: 0.5 }
      }}
      whileHover={{ 
        scale: 1.03, 
        y: -5, 
        boxShadow: `0 15px 30px -5px ${colors.primary}30`,
        borderColor: colors.border,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      onClick={onClick}
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} opacity-30 rounded-xl`}
      />
      
      <div className="p-5 h-full relative z-10">
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div className="relative">
            {getAchievementIcon(achievement.type)}
          </div>
          
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${colors.textColor}`}>
              {achievement.title}
            </h3>
            
            <p className="text-sm text-muted-foreground">
              {achievement.competition}
            </p>
          </div>
        </div>
        
        <div className="mt-4 border-t border-border pt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <Building size={14} className="mr-1.5" /> 
            {achievement.organizer}
          </div>
          
          <div className="flex items-center justify-end text-xs text-muted-foreground">
            <Clock size={14} className="mr-1.5" /> 
            {achievement.year}
          </div>
        </div>
        
        <div className="flex justify-end mt-3">
          <button
            className="flex items-center text-xs text-primary"
          >
            <Info size={14} className="mr-1" /> Details
          </button>
        </div>
        
        {/* Badge for achievement type */}
        <div
          className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ 
            backgroundColor: `${colors.primary}30`,
            color: colors.primary,
            boxShadow: `0 0 10px ${colors.primary}30`
          }}
        >
          {achievement.type.toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
};

export default SimpleAchievementCard;