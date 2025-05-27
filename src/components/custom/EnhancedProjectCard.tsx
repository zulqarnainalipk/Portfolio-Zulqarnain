import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { EnhancedProjectItem } from '../../data/enhancedPortfolioData';
import { Github, ExternalLink, Award, BarChart4 } from 'lucide-react';

interface EnhancedProjectCardProps {
  project: EnhancedProjectItem;
}

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AutoML': '#10b981', // Emerald
      'Healthcare': '#3b82f6', // Blue
      'Computer Vision': '#ef4444', // Red
      'Remote Sensing': '#f59e0b', // Amber
      'NLP': '#8b5cf6', // Violet
      'Audio Processing': '#ec4899', // Pink
      'Privacy': '#6366f1', // Indigo
    };
    
    return colors[category] || '#6b7280'; // Gray as default
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="group h-full bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-border transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex justify-between items-center">
            <span 
              className="text-xs font-semibold px-2 py-1 rounded-full" 
              style={{ backgroundColor: getCategoryColor(project.category), color: 'white' }}
            >
              {project.category}
            </span>
            
            <div className="flex space-x-2">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 p-1 rounded-full hover:bg-white/40 transition-colors"
                >
                  <Github size={16} className="text-white" />
                </a>
              )}
              
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 p-1 rounded-full hover:bg-white/40 transition-colors"
                >
                  <ExternalLink size={16} className="text-white" />
                </a>
              )}
              
              {project.kaggle && (
                <a 
                  href={project.kaggle} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 p-1 rounded-full hover:bg-white/40 transition-colors"
                >
                  <Award size={16} className="text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
          {project.featured && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <h4 className="text-sm text-muted-foreground mb-3">{project.subtitle}</h4>
        
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span 
              key={i} 
              className="text-xs bg-secondary-foreground/10 px-2 py-1 rounded-full text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-xs bg-secondary-foreground/10 px-2 py-1 rounded-full text-muted-foreground">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
        
        <div className="mt-3 border-t border-border pt-3">
          <button 
            onClick={toggleDetails}
            className="text-primary text-sm flex items-center focus:outline-none"
          >
            <BarChart4 size={16} className="mr-1" />
            {showDetails ? "Hide Details" : "Show Metrics"}
          </button>
          
          {showDetails && (
            <motion.div 
              className="mt-3 grid grid-cols-2 gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="bg-secondary-foreground/5 p-2 rounded-md">
                  <div className="text-xs text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {value}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectCard;