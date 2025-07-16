import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Music, Check as Chess, Code, Terminal } from 'lucide-react';

const About = ({ theme }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const [sectionRef, sectionInView] = useInView({
    threshold: 0.5,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [inView, controls, hasAnimated]);

  useEffect(() => {
    if (!sectionInView) return;
    const event = new CustomEvent('sectionInView', { detail: 'about' });
    window.dispatchEvent(event);
  }, [sectionInView]);

  const cards = [
    {
      icon: <Bot className="w-8 h-8 text-cyan-400" />,
      title: "AI & ML Enthusiast",
      description: "Exploring the frontiers of artificial intelligence and machine learning."
    },
    {
      icon: <Code className="w-8 h-8 text-cyan-400" />,
      title: "Software Developer",
      description: "Building elegant solutions to complex problems."
    },
    {
      icon: <Chess className="w-8 h-8 text-cyan-400" />,
      title: "Chess Player",
      description: "Strategist with a rating of 1800. Always thinking several moves ahead."
    },
    {
      icon: <Terminal className="w-8 h-8 text-cyan-400" />,
      title: "Backend Engineer",
      description: "Crafting the unseen magic that powers applications."
    }
  ];

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen py-20 relative ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50/50'
        }`}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              transition: {
                duration: 0.5,
                ease: "easeOut"
              }
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2
            data-text="ABOUT ME"
            className={`glitch-text text-4xl md:text-5xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
          >
            ABOUT ME
          </h2>
          <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="holographic p-6 md:p-8 rounded-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">Sudhanshu Shukla</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-white font-semibold">Age:</span> 20 (Born April 23, 2005)
              </p>
              <p>
                <span className="text-white font-semibold">Location:</span> Greater Noida, India
              </p>
              <p className="leading-relaxed">
                I’m an AI & ML undergrad who’s serious about mastering my craft. I solve problems with focus and calm, knowing my skills speak louder than words.
              </p>
              <p className="leading-relaxed">
                What began as curiosity has turned into a clear purpose: creating meaningful AI and software solutions that make an impact without the noise.
              </p>

            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-glass p-4 md:p-6 rounded-lg backdrop-blur-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:translate-y-[-5px]"
              >
                <div className="mb-4">{card.icon}</div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">{card.title}</h4>
                <p className="text-gray-400 text-sm md:text-base">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;