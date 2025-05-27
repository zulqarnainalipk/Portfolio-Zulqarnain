import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Medal, X, Building, Clock, Info } from 'lucide-react';
import { competitionAchievements } from '../data/enhancedPortfolioData';
import EnhancedAnimatedCard from '../components/custom/EnhancedAnimatedCard';
import { fadeInUp } from '../lib/animation';

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
      primary: '#FFD700',
      secondary: '#FFC107',
      textColor: 'text-yellow-400',
      gradientFrom: 'from-yellow-400/20',
      gradientTo: 'to-amber-300/10',
      iconGlow: '0 0 15px rgba(255, 215, 0, 0.6)',
      border: 'rgba(255, 215, 0, 0.3)',
      borderHover: 'rgba(255, 215, 0, 0.6)'
    };
  } else if (type.includes('star')) {
    return {
      primary: '#10B981',
      secondary: '#059669',
      textColor: 'text-green-500',
      gradientFrom: 'from-green-400/20',
      gradientTo: 'to-emerald-300/10',
      iconGlow: '0 0 15px rgba(16, 185, 129, 0.6)',
      border: 'rgba(16, 185, 129, 0.3)',
      borderHover: 'rgba(16, 185, 129, 0.6)'
    };
  } else {
    return {
      primary: '#CD7F32',
      secondary: '#B8860B',
      textColor: 'text-amber-600',
      gradientFrom: 'from-amber-400/20',
      gradientTo: 'to-orange-300/10',
      iconGlow: '0 0 15px rgba(205, 127, 50, 0.6)',
      border: 'rgba(205, 127, 50, 0.3)',
      borderHover: 'rgba(205, 127, 50, 0.6)'
    };
  }
};

const AchievementsNew = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  return (
    <section id="achievements" className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp()}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 flex items-center justify-center">
            <Trophy size={40} className="mr-3" /> Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recognition and awards from data science competitions and technical challenges across various platforms.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {competitionAchievements.map((achievement, index) => {
            const colors = getAchievementColors(achievement.type);
            const icon = getAchievementIcon(achievement.type);
            
            return (
              <EnhancedAnimatedCard
                key={`${achievement.competition}-${index}`}
                delay={index}
                className={`
                  group relative overflow-hidden
                  bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo}
                  border-2 cursor-pointer transition-all duration-300
                  hover:shadow-xl
                `}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <div className="relative z-10">
                  {/* Icon and Image */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className="p-3 rounded-full bg-background/80 backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      style={{ 
                        boxShadow: colors.iconGlow,
                      }}
                    >
                      {icon}
                    </motion.div>
                    
                    {achievement.image && (
                      <motion.div
                        className="w-12 h-12 rounded-lg overflow-hidden border-2"
                        style={{ borderColor: colors.border }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Title and Year */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{achievement.year}</span>
                    </div>
                  </div>
                  
                  {/* Competition and Organizer */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {achievement.competition}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span>{achievement.organizer}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                  
                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  >
                    <Info className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
                
                {/* Floating decorative elements */}
                <motion.div
                  className="absolute top-6 right-6 w-2 h-2 rounded-full opacity-60"
                  style={{ backgroundColor: colors.primary }}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                />
              </EnhancedAnimatedCard>
            );
          })}
        </div>

        {/* Modal for detailed view */}
        <AnimatePresence>
          {selectedAchievement && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
            >
              <motion.div
                className="bg-background rounded-2xl p-8 max-w-md w-full relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedAchievement.title}
                  </h3>
                  <p className="text-lg text-primary font-semibold">
                    {selectedAchievement.competition}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedAchievement.organizer} • {selectedAchievement.year}
                  </p>
                  <p className="text-foreground leading-relaxed">
                    {selectedAchievement.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AchievementsNew;