import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Code, Brain, Medal, Award, Layers, BarChart, AtSign, Sun, Moon, Cpu, Database, LineChart, Palette } from 'lucide-react';
import { useTheme, Theme, themeNames } from '../../context/ThemeProvider';

// Define navigation items with icons
const navItems = [
  { id: 'skills', icon: <Brain size={20} />, label: 'Skills' },
  { id: 'projects', icon: <Layers size={20} />, label: 'Projects' },
  { id: 'achievements', icon: <Medal size={20} />, label: 'Achievements' },
  { id: 'certifications', icon: <Award size={20} />, label: 'Certifications' },
  { id: 'publications', icon: <BarChart size={20} />, label: 'Publications' },
  { id: 'contact', icon: <AtSign size={20} />, label: 'Contact' },
];

const FloatingActionButton: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Listen for scroll to show/hide the scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isThemeMenuOpen) setIsThemeMenuOpen(false);
  };

  // Toggle theme menu
  const toggleThemeMenu = () => {
    setIsThemeMenuOpen(!isThemeMenuOpen);
    if (isOpen) setIsOpen(false);
  };

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get theme icon
  const getThemeIcon = (themeKey: string) => {
    switch (themeKey) {
      case 'light':
        return <Sun size={16} />;
      case 'dark':
        return <Moon size={16} />;
      case 'neural-dark':
        return <Cpu size={16} />;
      case 'data-green':
        return <Database size={16} />;
      case 'ml-orange':
        return <LineChart size={16} />;
      default:
        return <Palette size={16} />;
    }
  };

  // Get current theme icon
  const getCurrentThemeIcon = () => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return getThemeIcon(systemTheme);
    }
    return getThemeIcon(theme);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && !isOpen && !isThemeMenuOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Theme switcher button */}
      <motion.button
        className="absolute bottom-0 right-16 p-4 rounded-full bg-secondary text-foreground shadow-lg hover:bg-secondary/80 transition-colors"
        whileTap={{ scale: 0.95 }}
        onClick={toggleThemeMenu}
        aria-label="Theme menu"
      >
        {getCurrentThemeIcon()}
      </motion.button>

      {/* Main floating button */}
      <motion.button
        className="p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        aria-label="Navigation menu"
      >
        <Code size={24} />
      </motion.button>

      {/* Navigation menu items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute bottom-16 right-0 space-y-2 min-w-40"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center p-2 px-3 rounded-lg bg-secondary text-foreground shadow-md hover:bg-secondary-foreground/20 transition-colors w-full"
                onClick={() => scrollToSection(item.id)}
                aria-label={`Go to ${item.label}`}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme menu items */}
      <AnimatePresence>
        {isThemeMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute bottom-16 right-16 space-y-2 min-w-40"
          >
            {Object.entries(availableThemes).map(([key, name], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center p-2 px-3 rounded-lg shadow-md transition-colors w-full justify-between ${
                  theme === key 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary text-foreground hover:bg-secondary-foreground/20'
                }`}
                onClick={() => {
                  setTheme(key as Theme);
                  setIsThemeMenuOpen(false);
                }}
                aria-label={`Switch to ${name} theme`}
              >
                <span className="flex items-center">
                  <span className="mr-2">{getThemeIcon(key)}</span>
                  <span className="text-sm">{name}</span>
                </span>
                {theme === key && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton;