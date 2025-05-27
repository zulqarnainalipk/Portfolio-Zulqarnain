import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Medal, X, Filter, Building, Clock, Info } from 'lucide-react';
import { fadeInUp, buttonAnimation } from '../lib/animation';
import { competitionAchievements } from '../data/enhancedPortfolioData';

type AchievementGroup = 'competitions' | 'awards' | 'all';

// Get achievement icon based on type
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

// Simple Achievement Card Component
const SimpleAchievementCard = ({ 
  achievement, 
  index, 
  onClick 
}: { 
  achievement: any; 
  index: number; 
  onClick: () => void; 
}) => {
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
      animate={{ 
        y: [0, -5, 0],
        transition: {
          duration: 2 + (index % 3),
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: index * 0.2
        }
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

const Achievements = () => {
  const [selectedGroup, setSelectedGroup] = useState<AchievementGroup>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);
  
  // Filter achievements based on selected group
  const filteredAchievements = selectedGroup === 'all' 
    ? achievementData 
    : selectedGroup === 'competitions'
      ? achievementData.filter(a => a.type === 'gold' || a.type === 'silver' || a.type === 'bronze')
      : achievementData.filter(a => a.type === 'star' || a.type === 'award');
  
  return (
    <section id="achievements" className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp()}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 flex items-center justify-center">
            <Trophy size={40} className="mr-3" /> Achievements & Awards
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recognition for excellence in competitions, research, and technical contributions.
          </p>
        </motion.div>
        
        {/* Filter buttons */}
        <motion.div 
          className="flex justify-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp(0.2)}
        >
          <motion.div 
            className="inline-flex bg-secondary/50 backdrop-blur-sm rounded-xl p-1.5 shadow-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <motion.button
              onClick={() => setSelectedGroup('all')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedGroup === 'all' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              variants={buttonAnimation}
              whileHover="hover"
              whileTap="tap"
            >
              <Filter size={16} />
              All
            </motion.button>
            
            <motion.button
              onClick={() => setSelectedGroup('competitions')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedGroup === 'competitions' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              variants={buttonAnimation}
              whileHover="hover"
              whileTap="tap"
            >
              <Trophy size={16} />
              Competitions
            </motion.button>
            
            <motion.button
              onClick={() => setSelectedGroup('awards')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedGroup === 'awards' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              variants={buttonAnimation}
              whileHover="hover"
              whileTap="tap"
            >
              <Star size={16} />
              Awards
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements && filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement, index) => (
              <SimpleAchievementCard
                key={`achievement-${index}-${achievement.title}`}
                achievement={achievement}
                index={index}
                onClick={() => setSelectedAchievement(index)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No achievements to display</p>
            </div>
          )}
        </div>
        
        {/* Achievement Detail Modal */}
        <AnimatePresence>
          {selectedAchievement !== null && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 30 
                }}
                className="bg-card p-6 rounded-xl shadow-2xl border border-border max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button 
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
                
                {/* Achievement header with icon */}
                <motion.div 
                  className="flex items-start space-x-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.2, 
                      type: 'spring', 
                      stiffness: 200,
                      damping: 15
                    }}
                    className="p-3 rounded-full"
                    style={{ 
                      backgroundColor: achievementData[selectedAchievement].type.includes('gold') ? 'rgba(255, 215, 0, 0.2)' :
                                       achievementData[selectedAchievement].type.includes('silver') ? 'rgba(192, 192, 192, 0.2)' :
                                       achievementData[selectedAchievement].type.includes('bronze') ? 'rgba(205, 127, 50, 0.2)' :
                                       achievementData[selectedAchievement].type.includes('star') ? 'rgba(0, 163, 136, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                      boxShadow: achievementData[selectedAchievement].type.includes('gold') ? '0 0 15px rgba(255, 215, 0, 0.3)' :
                                 achievementData[selectedAchievement].type.includes('silver') ? '0 0 15px rgba(192, 192, 192, 0.3)' :
                                 achievementData[selectedAchievement].type.includes('bronze') ? '0 0 15px rgba(205, 127, 50, 0.3)' :
                                 achievementData[selectedAchievement].type.includes('star') ? '0 0 15px rgba(0, 163, 136, 0.3)' : '0 0 15px rgba(99, 102, 241, 0.3)'
                    }}
                  >
                    {getAchievementIcon(achievementData[selectedAchievement].type)}
                  </motion.div>
                  
                  <div>
                    <motion.h3 
                      className="text-xl font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {achievementData[selectedAchievement].title}
                    </motion.h3>
                    <motion.p 
                      className="text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      {achievementData[selectedAchievement].competition}
                    </motion.p>
                  </div>
                </motion.div>
                
                {/* Achievement details with enhanced animations */}
                <motion.div 
                  className="space-y-4 bg-secondary/30 rounded-lg p-4 border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4 className="text-sm font-semibold text-primary flex items-center">
                      <Trophy size={14} className="mr-2" />
                      Organizer
                    </h4>
                    <p className="ml-6">{achievementData[selectedAchievement].organizer}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h4 className="text-sm font-semibold text-primary flex items-center">
                      <Star size={14} className="mr-2" />
                      Year
                    </h4>
                    <p className="ml-6">{achievementData[selectedAchievement].year}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h4 className="text-sm font-semibold text-primary flex items-center">
                      <Award size={14} className="mr-2" />
                      Details
                    </h4>
                    <p className="ml-6">{achievementData[selectedAchievement].description}</p>
                  </motion.div>
                </motion.div>
                
                {/* Close button */}
                <motion.div 
                  className="flex justify-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    onClick={() => setSelectedAchievement(null)}
                    className="px-5 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    variants={buttonAnimation}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Achievements;
