import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, CheckCircle, Calendar, Building } from 'lucide-react';
import EnhancedAnimatedCard from '../components/custom/EnhancedAnimatedCard';
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animation';

const Experience = () => {
  const { experience } = portfolioData;

  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp()}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 flex items-center justify-center">
            <Briefcase size={40} className="mr-3" /> Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My journey in machine learning engineering and data science consulting across multiple domains.
          </p>
        </motion.div>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {experience.map((exp, index) => (
            <EnhancedAnimatedCard
              key={index}
              delay={index}
              className="p-8 border-l-4 border-primary relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-4 right-4 text-primary/10">
                <Briefcase size={48} />
              </div>

              {/* Header */}
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row md:items-center md:justify-between mb-4"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Highlight badge for freelance */}
                  {exp.company.includes('Freelance') && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="mt-4 md:mt-0"
                    >
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        Current Role
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Achievements */}
              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {exp.description.map((detail, i) => (
                  <motion.div 
                    key={i}
                    variants={staggerItem()}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </motion.div>
                    <p className="text-foreground text-sm leading-relaxed">
                      {detail}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Floating animation dot */}
              <motion.div
                className="absolute top-8 left-0 w-3 h-3 bg-primary rounded-full"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              />
            </EnhancedAnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
