import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Hero = ({ setActiveSection }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef(null);
  
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
    <div className="h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden pt-16">
      <div className="absolute inset-0"></div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-4xl"
      >
        <motion.div 
          variants={item}
          className="mb-12 relative w-64 h-64 md:w-80 md:h-80 mx-auto group"
        >
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-full animate-spin-slow"></div>
          
          {/* Image container with glass effect */}
          <div className="absolute inset-1 rounded-full bg-slate-900/50 backdrop-blur-sm p-2">
            <div className="relative w-full h-full overflow-hidden rounded-full">
              {/* Main image */}
              <LazyLoadImage
                src="Sudhanshu.jpg"
                placeholderSrc="Sudhanshu.jpg"
                alt="Sudhanshu Shukla"
                effect="blur"
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
        >
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse">
              SUDHANSHU SHUKLA
            </span>
            <span className="relative group-hover:animate-glitch-h">
              SUDHANSHU SHUKLA
            </span>
          </span>
          {}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-px bg-cyan-500/50 animate-glitch-h"></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-purple-500/50 animate-glitch-h delay-100"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/50 animate-glitch-h delay-200"></div>
          </div>
        </motion.h1>
        
        <motion.div 
          variants={item}
          className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto my-8"
        ></motion.div>
        
        <motion.p
          variants={item} 
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          AI & ML Engineer <span className="text-gray-500">|</span> Problem Solver <span className="text-gray-500">|</span> Chess Player
        </motion.p>
        
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-4 mt-8 relative z-20"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
            <span className="relative z-10">Explore My Work</span>
          </a>
          
          <a
            href="#contact"
            className="group relative px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
            <span className="relative z-10">Get In Touch</span>
          </a>
          
          <button
            onClick={handleDownload}
            className="group relative px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </span>
            </button>
          <a
            href="https://github.com/sudhanshu-shukl/Portfolio" target = "_blank"
            className="group relative px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 group-hover:animate-pulse"></div>
            <span className="relative z-10">Source Code</span>
          </a>

        </motion.div>
      </motion.div>
      

    </div>
  );
};

export default Hero;