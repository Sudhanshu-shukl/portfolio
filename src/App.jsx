import React, { useEffect, useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
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
const Experience = React.lazy(() => import('./components/Experience'));
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
    const preloadAssets = async () => {
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

  useEffect(() => {
    if (loading) return;
    const sectionIds = [
      'home',
      'about',
      'education',
      'skills',
      'projects',
      'experience',
      'achievements',
      'contact',
    ];
    let observer;
    let timeoutId;
    function setupObserver() {
      const sections = sectionIds.map(id => document.getElementById(id));
      if (sections.some(section => !section)) {
        timeoutId = setTimeout(setupObserver, 100);
        return;
      }
      observer = new window.IntersectionObserver((entries) => {
        console.log('IntersectionObserver entries:', entries.map(e => ({id: e.target.id, isIntersecting: e.isIntersecting, top: e.boundingClientRect.top})));
        const visible = entries.filter(entry => entry.isIntersecting);
        if (visible.length > 0) {
          const closest = visible.reduce((prev, curr) => {
            return Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev;
          });
          setActiveSection(closest.target.id);
        }
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      });
      sections.forEach(section => {
        if (section) observer.observe(section);
      });
    }
    setupObserver();
    return () => {
      if (observer) observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`relative font-sans w-full overflow-x-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} text-white min-h-screen transition-colors duration-300`}>
      {}
      {loading ? (
        <LoadingScreen key="loading" />
      ) : (
        <>
          <ParticleBackground theme={theme} />
          <Navbar 
            activeSection={activeSection} 
            setActiveSection={handleSetActiveSection}
            theme={theme} 
            toggleTheme={toggleTheme}
          />
          <Sentry />

          <main className="relative z-10">
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
              
              <section id="experience" className="min-h-screen">
                <Experience theme={theme} />
              </section>
              
              <section id="achievements" className="min-h-screen">
                <Achievements theme={theme} />
              </section>
              
              <section id="contact" className="min-h-screen">
                <Contact theme={theme} />
              </section>

              <Footer theme={theme} />
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
}

export default App;