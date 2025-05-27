import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  Award, 
  ChevronDown, 
  GraduationCap, 
  BookOpen, 
  Trophy,
  Zap,
  ExternalLink,
  BadgeCheck
} from 'lucide-react';
import { fadeInUp } from '../lib/animation';

const CertificationsNew = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { certifications } = portfolioData;

  // Group certifications by category
  const groupedCertifications = {
    all: certifications,
    specialization: certifications.filter(cert => cert.category === 'specialization'),
    course: certifications.filter(cert => cert.category === 'course'),
    workshop: certifications.filter(cert => cert.category === 'workshop'),
    competition: certifications.filter(cert => cert.category === 'competition'),
  };

  const categories = [
    { id: 'all', label: 'All Certificates', icon: <Award className="w-4 h-4" />, count: certifications.length },
    { id: 'specialization', label: 'Specializations', icon: <GraduationCap className="w-4 h-4" />, count: groupedCertifications.specialization.length },
    { id: 'course', label: 'Courses', icon: <BookOpen className="w-4 h-4" />, count: groupedCertifications.course.length },
    { id: 'workshop', label: 'Labs & Workshops', icon: <Zap className="w-4 h-4" />, count: groupedCertifications.workshop.length },
    { id: 'competition', label: 'Competition Awards', icon: <Trophy className="w-4 h-4" />, count: groupedCertifications.competition.length },
  ];

  const getCategoryColors = (category: string) => {
    switch(category) {
      case 'specialization':
        return {
          bg: 'from-amber-500/20 to-yellow-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-600',
          glow: '0 0 20px rgba(245, 158, 11, 0.3)'
        };
      case 'course':
        return {
          bg: 'from-blue-500/20 to-cyan-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-600',
          glow: '0 0 20px rgba(59, 130, 246, 0.3)'
        };
      case 'workshop':
        return {
          bg: 'from-purple-500/20 to-pink-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-600',
          glow: '0 0 20px rgba(147, 51, 234, 0.3)'
        };
      case 'competition':
        return {
          bg: 'from-emerald-500/20 to-green-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-600',
          glow: '0 0 20px rgba(16, 185, 129, 0.3)'
        };
      default:
        return {
          bg: 'from-gray-500/20 to-slate-500/10',
          border: 'border-gray-500/30',
          text: 'text-gray-600',
          glow: '0 0 20px rgba(107, 114, 128, 0.3)'
        };
    }
  };

  const filteredCertifications = groupedCertifications[selectedCategory as keyof typeof groupedCertifications] || certifications;

  return (
    <section id="certifications" className="py-16 md:py-24 bg-background text-foreground">
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
            <Award size={40} className="mr-3" /> Certifications & Awards
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional certifications, specializations, and competition achievements showcasing continuous learning and expertise.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span className="font-medium">{category.label}</span>
              <span className="bg-muted px-2 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredCertifications.map((cert, index) => {
              const colors = getCategoryColors(cert.category);
              
              return (
                <motion.div
                  key={`${cert.title}-${index}`}
                  className={`bg-card border-2 rounded-xl p-6 relative overflow-hidden cursor-pointer ${colors.border}`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: colors.glow,
                    transition: { duration: 0.3 }
                  }}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 4 + (index * 0.3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Certificate Image & Category Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className="w-16 h-16 rounded-lg overflow-hidden bg-muted border border-border"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/project_fallback.png';
                          }}
                        />
                      </motion.div>
                      
                      <motion.div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${colors.text} bg-background/80 backdrop-blur-sm`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {cert.category.charAt(0).toUpperCase() + cert.category.slice(1)}
                      </motion.div>
                    </div>

                    {/* Title & Issuer */}
                    <h3 className="font-bold text-foreground text-sm mb-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    
                    <p className={`text-sm font-medium mb-3 ${colors.text}`}>
                      {cert.issuer}
                    </p>

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <div className="flex items-center gap-2 mb-3">
                        <BadgeCheck className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground font-mono">
                          {cert.credentialId}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-auto"
                        >
                          <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-primary" />
                        </motion.button>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 2).map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.1 }}
                          className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                        >
                          {skill}
                        </motion.span>
                      ))}
                      {cert.skills.length > 2 && (
                        <span className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                          +{cert.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Floating decoration */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
                    style={{ backgroundColor: colors.text.replace('text-', '').replace('-600', '') }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Summary Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.slice(1).map((category, index) => {
            const colors = getCategoryColors(category.id);
            return (
              <motion.div
                key={category.id}
                className={`text-center p-4 rounded-lg bg-gradient-to-br ${colors.bg} border ${colors.border}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`inline-flex p-3 rounded-full bg-background/80 mb-3 ${colors.text}`}>
                  {category.icon}
                </div>
                <div className={`text-2xl font-bold ${colors.text}`}>
                  {category.count}
                </div>
                <div className="text-sm text-muted-foreground">
                  {category.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsNew;