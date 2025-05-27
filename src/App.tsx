import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import SkillsNew from './sections/SkillsNew';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import AchievementsNew from './sections/AchievementsNew';
import Publications from './sections/Publications';
import Education from './sections/Education';
import CertificationsNew from './sections/CertificationsNew';
import LabExperience from './sections/LabExperience';
import Volunteering from './sections/Volunteering';
import Contact from './sections/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import FloatingActionButton from './components/custom/FloatingActionButton';
import { useTheme } from './context/ThemeProvider';

function App() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  
  // Simulate loading to show entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Different star colors based on theme
  const getStarColor = () => {
    switch(theme) {
      case 'neural-dark': return '#00FFFF';
      case 'data-green': return '#22C55E';
      case 'ml-orange': return '#0EA5E9';
      default: return undefined; // Default star color
    }
  };
  
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div 
                className="w-16 h-16 mb-4 mx-auto border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.h1 
                className="text-2xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading Portfolio...
              </motion.h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen w-full"
          >
            <Canvas
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
              camera={{ position: [0, 0, 5], fov: 75 }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars 
                  radius={100} 
                  depth={50} 
                  count={5000} 
                  factor={4} 
                  saturation={0} 
                  fade 
                  speed={1}
                />
              </Suspense>
            </Canvas>

            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Hero />
                <About />
                <SkillsNew />
                <Experience />
                <Projects />
                <AchievementsNew />
                <Publications />
                <Education />
                <CertificationsNew />
                <LabExperience />
                <Volunteering />
                <Contact />
              </main>
              <Footer />
              <FloatingActionButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
