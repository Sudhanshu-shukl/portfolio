import React, { useEffect, useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sentry from './components/Sentry';

// Lazy load components
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Education = React.lazy(() => import('./components/Education'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const Contact = React.lazy(() => import('./components/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse w-32 h-32 bg-indigo-500/20 rounded-full"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Preload images and assets
    const preloadAssets = async () => {
      // Simulate asset loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };
    
    preloadAssets();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [loading]);

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`relative font-sans ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} text-white min-h-screen transition-colors duration-300`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <CustomCursor />
            <ParticleBackground theme={theme} />
            <Navbar 
              activeSection={activeSection} 
              theme={theme} 
              toggleTheme={toggleTheme}
            />
            <Sentry />
            
            <motion.main
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<SectionLoader />}>
                <section id="home" className="min-h-screen">
                  <Hero setActiveSection={handleSetActiveSection} theme={theme} />
                </section>
                
                <section id="about" className="min-h-screen">
                  <About theme={theme} />
                </section>
                
                <section id="education" className="min-h-screen">
                  <Education theme={theme} />
                </section>
                
                <section id="skills" className="min-h-screen">
                  <Skills theme={theme} />
                </section>
                
                <section id="projects" className="min-h-screen">
                  <Projects theme={theme} />
                </section>
                
                <section id="achievements" className="min-h-screen">
                  <Achievements theme={theme} />
                </section>
                
                <section id="contact" className="min-h-screen">
                  <Contact theme={theme} />
                </section>

                <Footer theme={theme} />
              </Suspense>
            </motion.main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;