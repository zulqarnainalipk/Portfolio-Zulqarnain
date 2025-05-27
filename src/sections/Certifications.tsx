import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationTiers } from '../data/enhancedPortfolioData';
import { 
  Award, 
  ChevronDown, 
  ChevronUp, 
  BadgeCheck, 
  GraduationCap, 
  BookOpen, 
  CheckSquare,
  Bookmark
} from 'lucide-react';
import EnhancedCertificationCard from '../components/custom/EnhancedCertificationCard';
import { 
  fadeInUp, 
  staggerContainer, 
  staggeredCardEntrance, 
  buttonAnimation,
  enhancedGradientShift
} from '../lib/animation';
import UniversalCard from '../components/custom/UniversalCard';

const TierSection = ({ tier }: { tier: typeof certificationTiers[0] }) => {
  const [expanded, setExpanded] = useState(true);
  
  // Get tier styles
  const getTierStyles = (tier: number) => {
    switch(tier) {
      case 1:
        return {
          badgeClass: 'bg-amber-500/20 text-amber-600',
          icon: <GraduationCap size={20} />,
          borderColor: 'rgba(245, 158, 11, 0.3)',
          glowColor: 'rgba(245, 158, 11, 0.2)',
          gradientFrom: 'from-amber-500/10',
          gradientTo: 'to-yellow-500/5'
        };
      case 2:
        return {
          badgeClass: 'bg-emerald-500/20 text-emerald-600',
          icon: <BookOpen size={20} />,
          borderColor: 'rgba(16, 185, 129, 0.3)',
          glowColor: 'rgba(16, 185, 129, 0.2)',
          gradientFrom: 'from-emerald-500/10',
          gradientTo: 'to-green-500/5'
        };
      case 3:
        return {
          badgeClass: 'bg-blue-500/20 text-blue-600',
          icon: <CheckSquare size={20} />,
          borderColor: 'rgba(59, 130, 246, 0.3)',
          glowColor: 'rgba(59, 130, 246, 0.2)',
          gradientFrom: 'from-blue-500/10',
          gradientTo: 'to-cyan-500/5'
        };
      default:
        return {
          badgeClass: 'bg-gray-500/20 text-gray-600',
          icon: <Bookmark size={20} />,
          borderColor: 'rgba(107, 114, 128, 0.3)',
          glowColor: 'rgba(107, 114, 128, 0.2)',
          gradientFrom: 'from-gray-500/10',
          gradientTo: 'to-gray-400/5'
        };
    }
  };

  const tierStyles = getTierStyles(tier.tier);
  
  return (
    <motion.div 
      className="mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp()}
    >
      {/* Tier header with enhanced animations */}
      <motion.div 
        className="relative overflow-hidden flex items-center justify-between mb-8 cursor-pointer bg-secondary/40 p-4 rounded-xl border border-border"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ 
          scale: 1.01, 
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          borderColor: tierStyles.borderColor
        }}
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${tierStyles.gradientFrom} ${tierStyles.gradientTo} opacity-60`}
          variants={enhancedGradientShift}
          animate="animate"
        />
        
        <div className="flex items-center relative z-10">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${tierStyles.badgeClass} shadow-md`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
          >
            {tierStyles.icon}
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-bold text-primary flex items-center"
            whileHover={{ x: 5 }}
          >
            {tier.title}
          </motion.h3>
        </div>
        
        <motion.button 
          className="p-2 rounded-full hover:bg-background/50 transition-colors relative z-10"
          aria-label={expanded ? "Collapse section" : "Expand section"}
          variants={buttonAnimation}
          whileHover="hover"
          whileTap="tap"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.button>
      </motion.div>
      
      {/* Certifications grid with enhanced animations */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            variants={staggeredCardEntrance}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {tier.certifications.map((cert, index) => (
              <motion.div 
                key={`${tier.tier}-${index}`}
                custom={index}
              >
                <EnhancedCertificationCard 
                  certification={cert} 
                  index={index}
                  tierLevel={tier.tier}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp()}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 flex items-center justify-center">
            <Award size={40} className="mr-3" /> Certifications & Credentials
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Industry-recognized certifications validating my expertise in machine learning, data science, and advanced analytics.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          {certificationTiers.map((tier) => (
            <TierSection key={tier.tier} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
