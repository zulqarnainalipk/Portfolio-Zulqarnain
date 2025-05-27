import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Medal, X, Filter } from 'lucide-react';
import { fadeInUp, buttonAnimation } from '../lib/animation';
import SimpleAchievementCard from '../components/custom/SimpleAchievementCard';

// Achievement data
const achievementData = [
  {
    title: "Winner 1st Place",
    competition: "TechQuest 2024 Data Science Competition",
    organizer: "IUB BWP",
    year: "2024",
    image: "/images/techquest_winner.jpg",
    type: "gold",
    description: "First place in university-level data science competition"
  },
  {
    title: "Bronze Medal",
    competition: "BirdCLEF 2024",
    organizer: "Kaggle",
    year: "2024",
    image: "/images/bronze_medal.png",
    type: "bronze",
    description: "Audio-based bird species identification challenge"
  },
  {
    title: "Bronze Medal",
    competition: "RSNA 2024",
    organizer: "Kaggle",
    year: "2024",
    image: "/images/bronze_medal.png",
    type: "bronze",
    description: "Medical imaging and radiology AI challenge"
  },
  {
    title: "GREEN Star",
    competition: "Aerosol Optical Depth Estimation",
    organizer: "Solafune, Inc.",
    year: "2024",
    image: "/images/green_star_award.jpg",
    type: "star",
    description: "Environmental monitoring satellite data competition"
  },
  {
    title: "Gold Medal",
    competition: "CGIAR Root Volume Estimation",
    organizer: "Zindi",
    year: "2024",
    image: "/images/zindi_gold_medal.jpg",
    type: "gold",
    description: "Agricultural AI for crop root system analysis"
  },
  {
    title: "Bronze Medal",
    competition: "ITU AI/ML in 5G Challenge",
    organizer: "Zindi",
    year: "2024",
    image: "/images/bronze_medal.png",
    type: "bronze",
    description: "Telecommunications and 5G network optimization"
  }
];

type AchievementGroup = 'competitions' | 'awards' | 'all';

const AchievementsSection = () => {
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
                    {achievementData[selectedAchievement].type.includes('gold') ? (
                      <Trophy className="w-10 h-10 text-yellow-400" />
                    ) : achievementData[selectedAchievement].type.includes('silver') ? (
                      <Medal className="w-10 h-10 text-gray-300" />
                    ) : achievementData[selectedAchievement].type.includes('bronze') ? (
                      <Medal className="w-10 h-10 text-amber-600" />
                    ) : achievementData[selectedAchievement].type.includes('star') ? (
                      <Star className="w-10 h-10 text-green-500" />
                    ) : (
                      <Award className="w-10 h-10 text-primary" />
                    )}
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

export default AchievementsSection;