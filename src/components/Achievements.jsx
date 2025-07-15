import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Award, Target } from 'lucide-react';

const Achievements = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.5,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  useEffect(() => {
    if (!sectionInView) return;
    // Update active section in parent component
    const event = new CustomEvent('sectionInView', { detail: 'achievements' });
    window.dispatchEvent(event);
  }, [sectionInView]);

  const achievements = [
    {
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
      title: "Chess Rating: 1800",
      description: "Achieved a competitive chess rating of 1800, demonstrating strategic thinking and planning abilities."
    }
  ];

  return (
    <section 
      id="achievements-section" 
      ref={sectionRef}
      className="min-h-screen py-20 relative"
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 30 },
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
          <h2 data-text="ACHIEVEMENTS" className="glitch-text text-4xl md:text-5xl font-bold mb-8">
            ACHIEVEMENTS
          </h2>
          <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-8"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="holographic p-6 rounded-lg mb-8 relative overflow-hidden"
            >
              {/* Achievement content */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="p-5 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg text-white">
                  {achievement.icon}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-gray-300">{achievement.description}</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="holographic p-8 rounded-lg mt-16 text-center"
          >
            <Award className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Continuous Learning & Growth</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              While I continue to build my formal achievement portfolio, I'm constantly participating in coding challenges, 
              debates, and continuously enhancing my skills through practical projects and applications. My journey is focused 
              on making a meaningful impact in the field of AI and software development.
            </p>
            
            <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-gray-300">Participating in hackathons</span>
              </div>
              <div className="hidden md:block h-5 w-0.5 bg-gray-700"></div>
              <div className="flex items-center">
                <Target className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-gray-300">Building real-world projects</span>
              </div>
              <div className="hidden md:block h-5 w-0.5 bg-gray-700"></div>
              <div className="flex items-center">
                <Target className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-gray-300">Expanding technical knowledge</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;