import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sun, AlertTriangle } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Hero = ({ setActiveSection }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef(null);
  const [isPrankOpen, setIsPrankOpen] = useState(false);
  const [showHiMessage, setShowHiMessage] = useState(false);
  
  const handleDownload = () => {
    const downloadUrl = 'https://drive.google.com/file/d/1R8GabtOQ7JDsV2kWA2kYOt8z_p1vm7iQ/view?usp=sharing';
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Sudhanshu_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProfileClick = () => {
    setShowHiMessage(true);
    setTimeout(() => {
      setShowHiMessage(false);
    }, 2000);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('home');
        }
      },
      { threshold: 0.5 }
    );
    
    const element = document.getElementById('home');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [setActiveSection]);
  
  useEffect(() => {
    if (hasAnimated || !textRef.current) return;
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    const originalText = textRef.current.dataset.value;
    
    const interval = setInterval(() => {
      textRef.current.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
        setHasAnimated(true);
      }
      
      iteration += 1 / 3;
    }, 50);
    
    return () => clearInterval(interval);
  }, [hasAnimated]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden pt-22">
      <div className="absolute inset-0"></div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-4xl"
      >
        <motion.div 
          variants={item}
          className="mb-12 relative w-64 h-64 md:w-80 md:h-80 mx-auto group cursor-pointer"
          onClick={handleProfileClick}
        >
          {/* Cool animated border */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Multiple rotating rings */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin" style={{animationDuration: '12s'}}></div>
            <div className="absolute inset-1 rounded-full border border-purple-500/40 animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
            <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-spin" style={{animationDuration: '15s'}}></div>
            
            {/* Floating border particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`border-particle-${i}`}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${50 + 45 * Math.cos((i * 45) * Math.PI / 180)}%`,
                  top: `${50 + 45 * Math.sin((i * 45) * Math.PI / 180)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Image container with glass effect */}
          <div className="absolute inset-1 rounded-full bg-slate-900/50 backdrop-blur-sm p-2">
            <div className="relative w-full h-full overflow-hidden rounded-full">
              {/* Animated background behind image */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {/* Floating particles in the circle */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`circle-particle-${i}`}
                    className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
                
                {/* Rotating gradient orbs */}
                <div className="absolute inset-0 rounded-full">
                  <div 
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-spin"
                    style={{
                      left: '20%',
                      top: '30%',
                      animationDuration: '8s'
                    }}
                  />
                  <div 
                    className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-spin"
                    style={{
                      right: '25%',
                      top: '20%',
                      animationDuration: '6s',
                      animationDirection: 'reverse'
                    }}
                  />
                  <div 
                    className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 animate-spin"
                    style={{
                      left: '60%',
                      bottom: '25%',
                      animationDuration: '10s'
                    }}
                  />
                </div>
                
                {/* Subtle mesh pattern */}
                <div 
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 70%)
                    `,
                    animation: 'pulse 4s ease-in-out infinite'
                  }}
                />
              </div>
              
              {/* Main image */}
              <LazyLoadImage
                src="Sudhanshu.png"
                placeholderSrc="Sudhanshu.png"
                alt="Sudhanshu Shukla"
                effect="blur"
                className="relative z-10"
              />
              
              {}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-purple-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700"></div>
              
              {}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/4 left-0 w-full h-px bg-cyan-500/50 animate-glitch-h"></div>
                <div className="absolute top-1/3 left-0 w-full h-px bg-purple-500/50 animate-glitch-h delay-100"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/50 animate-glitch-h delay-200"></div>
              </div>
            </div>
          </div>
          
          {}
          <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-500 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Hi Message */}
          {showHiMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: -20 }}
              className="absolute top-1/2 -right-32 transform -translate-y-1/2 z-50"
            >
              <div className="bg-white text-gray-800 px-6 py-4 rounded-xl shadow-2xl border border-gray-200 backdrop-blur-sm">
                <span className="text-lg font-semibold">Hi! What's up</span>
                <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-gray-200 rotate-45"></div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.h2 
          variants={item}
          className="text-xl md:text-2xl mb-4 text-gray-300"
        >
          <span className="text-gradient">Welcome to my digital universe</span>
        </motion.h2>
        
        <motion.h1 
          variants={item}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter group cursor-pointer relative"
          data-value="SUDHANSHU SHUKLA"
          ref={textRef}
          style={{background: 'linear-gradient(to top, #9CA3AF, #D1D5DB, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}
        >
          SUDHANSHU SHUKLA
        </motion.h1>
        
        <motion.div 
          variants={item}
          className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto my-8"
        ></motion.div>
        
        <motion.p
          variants={item} 
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          Software Engineer <span className="text-gray-500">|</span> Problem Solver <span className="text-gray-500">|</span> 6+ years of coding
        </motion.p>
        
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-8 relative z-20 px-4"
        >
          {/* Primary buttons - full width on mobile, flex on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="group relative px-6 sm:px-8 py-3 sm:py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg text-center sm:text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
              <span className="relative z-10 text-sm sm:text-base">Explore My Work</span>
            </a>
            
            <a
              href="#contact"
              className="group relative px-6 sm:px-8 py-3 sm:py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg text-center sm:text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
              <span className="relative z-10 text-sm sm:text-base">Get In Touch</span>
            </a>
          </div>
          
          {/* Secondary buttons - smaller on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="group relative px-6 sm:px-8 py-3 sm:py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">Download Resume</span>
                <span className="sm:hidden">Resume</span>
              </span>
            </button>
            
            <a
              href="https://github.com/sudhanshu-shukl/Portfolio" target="_blank"
              className="group relative px-6 sm:px-8 py-3 sm:py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg text-center sm:text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
              <span className="relative z-10 text-sm sm:text-base">Source Code</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
      

    </div>
  );
};

export default Hero;