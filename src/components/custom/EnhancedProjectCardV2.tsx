import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedProjectItem } from '../../data/enhancedPortfolioData';
import { Github, ExternalLink, Award, BarChart4, ChevronDown, ChevronUp } from 'lucide-react';

interface EnhancedProjectCardProps {
  project: EnhancedProjectItem;
}

const EnhancedProjectCardV2: React.FC<EnhancedProjectCardProps> = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTechnologies, setShowTechnologies] = useState(false);

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

  return (
    <motion.div 
      className="h-full bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-border transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5, 
        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex justify-between items-center">
            <span 
              className="text-xs font-semibold px-2 py-1 rounded-full text-white" 
              style={{ backgroundColor: getCategoryColor(project.category) }}
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
            <button
              onClick={() => setShowTechnologies(!showTechnologies)}
              className="text-xs bg-secondary-foreground/10 px-2 py-1 rounded-full text-primary flex items-center"
            >
              +{project.technologies.length - 5}
              {showTechnologies ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
            </button>
          )}
        </div>
        
        {showTechnologies && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="p-3 bg-secondary/30 rounded-md">
              <h5 className="text-xs font-semibold mb-2">All Technologies:</h5>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-secondary-foreground/10 px-2 py-1 rounded-full text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="mt-3 border-t border-border pt-3">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary text-sm flex items-center focus:outline-none"
          >
            <BarChart4 size={16} className="mr-1" />
            {showDetails ? "Hide Details" : "Show Metrics"}
          </button>
          
          {showDetails && (
            <motion.div 
              className="mt-3 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-2">
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
              </div>
              
              <div className="bg-secondary/30 p-3 rounded-md">
                <h5 className="text-xs font-semibold mb-2">Key Achievements:</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {project.keyAchievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold">Duration:</span>
                <span>{project.duration}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectCardV2;