import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { enhancedProjects } from '../data/enhancedPortfolioData';
import { Layers, Filter, Search, Code, Database, Eye, Satellite, Cpu, MessageCircle, ShieldCheck } from 'lucide-react';
import EnhancedProjectCardV3 from '../components/custom/EnhancedProjectCardV3';
import EnhancedAnimatedCard from '../components/custom/EnhancedAnimatedCard';
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animation';

type Category = 'All' | 'AutoML' | 'Healthcare' | 'Computer Vision' | 'Remote Sensing' | 'NLP' | 'Audio Processing' | 'Privacy';

// Category icon mapping
const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'AutoML': return <Cpu size={16} />;
    case 'Healthcare': return <MessageCircle size={16} />;
    case 'Computer Vision': return <Eye size={16} />;
    case 'Remote Sensing': return <Satellite size={16} />;
    case 'NLP': return <MessageCircle size={16} />;
    case 'Audio Processing': return <Code size={16} />;
    case 'Privacy': return <ShieldCheck size={16} />;
    default: return <Database size={16} />;
  }
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(enhancedProjects);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  // Get unique categories for filter
  const categories = ['All', ...Array.from(new Set(enhancedProjects.map(p => p.category)))] as Category[];
  
  // Filter projects based on selected category and search term
  useEffect(() => {
    let results = enhancedProjects;
    
    if (selectedCategory !== 'All') {
      results = results.filter(project => project.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        project.technologies.some(tech => tech.toLowerCase().includes(term))
      );
    }
    
    if (showFeaturedOnly) {
      results = results.filter(project => project.featured);
    }
    
    setFilteredProjects(results);
  }, [selectedCategory, searchTerm, showFeaturedOnly]);
  
  return (
    <section id="projects" className="py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp()}
        >
          <h2 
            className="text-4xl sm:text-5xl font-bold text-primary mb-4 flex items-center justify-center"
          >
            <Layers size={40} className="mr-3" /> Machine Learning Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A curated portfolio of ML/AI projects showcasing problem-solving across diverse domains and technologies.
          </p>
        </motion.div>
        
        {/* Filters with Animations */}
        <motion.div 
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp(0.2)}
        >
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={staggerContainer(0.05)}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary text-muted-foreground hover:bg-secondary-foreground/20'
                }`}
                whileHover={{ scale: 1.05, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                variants={staggerItem(0.3)}
                custom={index}
              >
                {category !== 'All' && getCategoryIcon(category)}
                {category}
              </motion.button>
            ))}
          </motion.div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <motion.div 
              className="relative flex-grow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 w-full rounded-md bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-all duration-300 focus:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
            
            <motion.button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
                showFeaturedOnly 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary-foreground/20'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Filter size={16} />
              Featured
            </motion.button>
          </div>
        </motion.div>
        
        {/* Projects Grid with Enhanced Animations */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredProjects.map((project, index) => (
              <div key={project.id}>
                <EnhancedProjectCardV3 project={project} index={index} />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground">
              No projects found matching your criteria. Try adjusting your filters.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
