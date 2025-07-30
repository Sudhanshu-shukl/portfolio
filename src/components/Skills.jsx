import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Cloud, MonitorSmartphone, Brush, Brain } from 'lucide-react';

const Skills = () => {
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
    // Ye hai to update active section in parent component
    const event = new CustomEvent('sectionInView', { detail: 'skills' });
    window.dispatchEvent(event);
  }, [sectionInView]);

  const skillCategories = [
    {
      icon: <Code className="w-8 h-8 text-cyan-400" />,
      title: "Programming Languages",
      skills: [
        { name: "C", proficiency: 70 },
        { name: "C++", proficiency: 75 },
        { name: "Java", proficiency: 80 },
        { name: "Python", proficiency: 85 },
        { name: "PHP", proficiency: 60 },
        { name: "JavaScript", proficiency: 90 },
      ],
    },
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-cyan-400" />,
      title: "Web Development",
      skills: [
        { name: "HTML", proficiency: 95 },
        { name: "CSS", proficiency: 90 },
        { name: "JavaScript", proficiency: 90 },
        { name: "ReactJS", proficiency: 85 },
        { name: "Next.js", proficiency: 80 },
      ],
    },
    {
      icon: <Database className="w-8 h-8 text-cyan-400" />,
      title: "Database Management",
      skills: [
        { name: "SQL", proficiency: 80 },
        { name: "Database Design", proficiency: 75 },
        { name: "Query Optimization", proficiency: 70 },
      ],
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-400" />,
      title: "Cloud Computing",
      skills: [
        { name: "Cloud Architecture", proficiency: 65 },
        { name: "Service Deployment", proficiency: 70 },
      ],
    },
    {
      icon: <Brain className="w-8 h-8 text-cyan-400" />,
      title: "Machine Learning",
      skills: [
        { name: "Data Analysis", proficiency: 75 },
        { name: "Model Training", proficiency: 70 },
        { name: "Algorithm Design", proficiency: 65 },
      ],
    },
    {
      icon: <Brush className="w-8 h-8 text-cyan-400" />,
      title: "Design Tools",
      skills: [
        { name: "Adobe Photoshop", proficiency: 60 },
      ],
    },
  ];

  const softSkills = [
    "Problem-solving",
    "Critical thinking",
    "Effective communication",
    "Team collaboration",
    "Time management",
    "Adaptability",
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 relative bg-slate-900/50"
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
          <h2 data-text="SKILLS" className="glitch-text text-4xl md:text-5xl font-bold mb-8">
            SKILLS
          </h2>
          <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="holographic p-6 rounded-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-slate-800/70 rounded-lg mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={hasAnimated ? { width: `${skill.proficiency}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 + 0.05 * idx }}
                      className="h-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-md"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Soft Skills</h3>
          
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ x: -30, opacity: 0 }}
                animate={hasAnimated ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + 0.1 * index }}
                className="flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500 mr-3"></div>
                <span className="text-gray-300">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;