import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = ({ theme }) => {
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
    const event = new CustomEvent('sectionInView', { detail: 'experience' });
    window.dispatchEvent(event);
  }, [sectionInView]);

  const experiences = [
    {
      logo: (
        <div className="rounded-full bg-gradient-to-r flex items-center justify-center">
          <img src="Scholar.png" className="w-12 h-12 "/>
        </div>
      ),
      title: "Summer Intern",
      company: "ScholarRank AI",
      type: "Internship",
      duration: "Jul 2025 - Present",
      timeSpan: "1 mo",
      location: "Noida, Uttar Pradesh, India",
      workType: "Remote",
      intro: "I've been told I work here. Someone let me know if I do.",
      responsibilities: [
        "Building cool UI for real AI tools using ReactJS and a little drama",
        "Collaborating with backend & LLM devs to make things actually work",
        "Testing features, pushing PRs, and occasionally pretending to understand \"production\"",
        "Making the frontend beautiful, interactive, and heck efficient"
      ],
      closing: "Still waiting to get fired. Until then... let's build.",
      skills: ["AngularJS", "Tailwind CSS", "ReactJS","NextJS"]
    },
    {
      logo: (
        <div className="rounded-lg flex items-center justify-center">
          <img src="Infera.jpg" className="w-12 h-12 rounded-2xl"/>
        </div>
      ),
      title: "SDE Intern",
      company: "Infera AI Labs",
      type: "Internship",
      duration: "Apr 2025 - Jun 2025",
      timeSpan: "3 mos",
      location: "Delhi, India",
      workType: "Hybrid",
      intro: "I showed up once and never left. I think that made me an employee.",
      responsibilities: [
        "Built the frontend, backend, and probably part of the internet in the process",
        "Designed UIs, wrote APIs, managed databases, and silently panicked through deployments",
        "Wore every dev hat possible—frontend guy, backend guy, DevOps guy, therapist",
        "Stack? ReactJS, Node.js, MongoDB, duct tape, and sheer willpower"
      ],
      closing: "Still waiting for someone to tell me what my role actually was.",
      skills: ["Cassandra", "Tailwind CSS", "ReactJS", "Node.js", "MongoDB"]
    }
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
          <h2 data-text="EXPERIENCE" className="glitch-text text-4xl md:text-5xl font-bold mb-8">
            EXPERIENCE
          </h2>
          <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-8"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="holographic p-8 rounded-xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  {experience.logo}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Building className="w-4 h-4" />
                      <span>{experience.company}</span>
                      <span>·</span>
                      <span>{experience.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.duration}</span>
                      <span>·</span>
                      <span>{experience.timeSpan}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                      <span>·</span>
                      <span>{experience.workType}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <p className="text-gray-300 italic">"{experience.intro}"</p>
                
                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-gray-300 italic">"{experience.closing}"</p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {experience.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full bg-slate-800/50 border border-white/10 text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 