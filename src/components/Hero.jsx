import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Hero = ({ setActiveSection }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef(null);
  
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
    <div className="h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900 z-0"></div>
      
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
              
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-purple-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700"></div>
              
              {/* Glitch effect lines */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/4 left-0 w-full h-px bg-cyan-500/50 animate-glitch-h"></div>
                <div className="absolute top-1/3 left-0 w-full h-px bg-purple-500/50 animate-glitch-h delay-100"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/50 animate-glitch-h delay-200"></div>
              </div>
            </div>
          </div>
          
          {/* Floating particles */}
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
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter hover:text-cyan-400 transition-colors duration-300"
          data-value="SUDHANSHU SHUKLA"
          ref={textRef}
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
          AI & ML Engineer <span className="text-gray-500">|</span> Problem Solver <span className="text-gray-500">|</span> Chess Player
        </motion.p>
        
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <a
            href="#about"
            className="relative px-8 py-3 overflow-hidden group bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg text-white font-medium shadow-lg"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-700"></span>
            <span className="relative">Explore My Work</span>
          </a>
          
          <a
            href="#contact"
            className="px-8 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors duration-300"
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 2.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down">
          <ChevronDown className="w-8 h-8 text-white/50 animate-bounce" />
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;