import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Brain, BarChart, Database, Globe, Eye, Code, Cloud, Cpu, ChevronDown } from 'lucide-react';
import { enhancedSkillCategories } from '../data/enhancedPortfolioData';
import { fadeInUp } from '../lib/animation';

const SkillsNew = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp()}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 flex items-center justify-center">
            <Lightbulb size={40} className="mr-3" /> Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Click on any skill category to explore detailed sub-skills and proficiency levels.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enhancedSkillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 }
              }}
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 4 + (index * 0.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }
              }}
              onClick={() => toggleCategory(category.id)}
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-20"
                style={{ 
                  background: `radial-gradient(circle at center, ${category.color}40, transparent 70%)`
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              />

              <div className="relative z-10 text-center space-y-4">
                {/* Icon with hover animation */}
                <motion.div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 relative"
                  style={{ 
                    backgroundColor: category.color + '20',
                    border: `2px solid ${category.color}50`
                  }}
                  whileHover={{ 
                    rotate: [0, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  {getCategoryIcon(category.icon, `w-8 h-8`)}
                  
                  {/* Pulse effect on icon */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: category.color }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4
                    }}
                  />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
                  {category.name}
                  <motion.div
                    animate={{ rotate: activeCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </h3>
                
                {/* Progress bar with animation */}
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-3 rounded-full relative"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.proficiency}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5 + 1.5
                      }}
                    />
                  </motion.div>
                </div>
                
                <motion.span 
                  className="text-sm font-medium"
                  style={{ color: category.color }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  {category.proficiency}% Proficiency
                </motion.span>
                
                {/* Expandable skills section */}
                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.9 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="space-y-3 border-t border-border pt-4"
                    >
                      <h4 className="text-sm font-medium text-foreground">Skills & Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ 
                              delay: skillIndex * 0.1,
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                            whileHover={{ 
                              scale: 1.1, 
                              y: -2,
                              transition: { duration: 0.2 }
                            }}
                            className="px-3 py-1 bg-muted rounded-full text-xs text-foreground font-medium border border-border hover:border-primary/50 transition-colors"
                            style={{ 
                              backgroundColor: category.color + '15',
                              borderColor: category.color + '30'
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Floating particles */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
                style={{ backgroundColor: category.color }}
                animate={{
                  y: [0, -12, 0],
                  x: [0, 3, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
              />
              <motion.div
                className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full opacity-40"
                style={{ backgroundColor: category.color }}
                animate={{
                  y: [0, -8, 0],
                  x: [0, -2, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.6,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsNew;