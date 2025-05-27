import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Brain, BarChart, Database, Globe, Eye, Code, Cloud, Cpu } from 'lucide-react';
import { enhancedSkillCategories } from '../data/enhancedPortfolioData';
import EnhancedAnimatedCard from '../components/custom/EnhancedAnimatedCard';
import { fadeInUp } from '../lib/animation';

const Skills = () => {
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
            An interactive showcase of my technical expertise across machine learning, data science, and software engineering.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enhancedSkillCategories.map((category, index) => (
            <EnhancedAnimatedCard
              key={category.id}
              delay={index}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg"
              
            >
              <div className="text-center space-y-4">
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: category.color + '20',
                    border: `2px solid ${category.color}50`
                  }}
                >
                  {getCategoryIcon(category.icon, `w-8 h-8`)}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground">
                  {category.name}
                </h3>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.proficiency}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                  />
                </div>
                
                <span className="text-sm text-muted-foreground font-medium">
                  {category.proficiency}% Proficiency
                </span>
                
                {activeCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 border-t border-border pt-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.1 }}
                          className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </EnhancedAnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
