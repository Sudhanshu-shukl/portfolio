import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Navbar = ({ activeSection, setActiveSection, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { text: "Home", href: "#home", id: "home" },
    { text: "About", href: "#about", id: "about" },
    { text: "Education", href: "#education", id: "education" },
    { text: "Skills", href: "#skills", id: "skills" },
    { text: "Projects", href: "#projects", id: "projects" },
    { text: "Experience", href: "#experience", id: "experience" },
    { text: "Achievements", href: "#achievements", id: "achievements" },
    { text: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full top-0 z-40 transition-all duration-500 backdrop-blur-lg ${
        isScrolled 
          ? 'bg-slate-900/90 py-0 shadow-lg' 
          : 'bg-slate-900/70 py-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a 
            href="#home" 
            className="text-2xl font-bold group"
          >
            <span className="text-gradient group-hover:opacity-80 transition-opacity">
              S/S
            </span>
          </a>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-1 py-2 transition-all duration-300 hover:text-cyan-400 ${
                  activeSection === link.id 
                    ? 'text-cyan-400' 
                    : 'text-white/80'
                }`}
                onClick={() => setActiveSection(link.id)}
              >
                {link.text}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-3 rounded-full focus:outline-none bg-slate-800/70 hover:bg-slate-700 transition-all duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 mr-4 z-50 md:hidden"
          >
            <div className="bg-slate-800/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl min-w-48">
              <nav className="py-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      activeSection === link.id 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'text-white hover:bg-slate-700/50'
                    }`}
                    onClick={() => {
                      setActiveSection(link.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    {link.text}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;