import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, BookOpen, Bot, MessageCircle, Code, Database, MessageSquare } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const Projects = () => {
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
    const event = new CustomEvent('sectionInView', { detail: 'projects' });
    window.dispatchEvent(event);
  }, [sectionInView]);

  const projects = [
    {
      icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
      title: "MoodMate AI (Full-Stack AI Chatbot)",
      description: "Built an offline, full-stack AI chatbot using Llama3, Flask, and ReactJS for mental wellness support. Supports four custom personalities—Sarcastic, Deep, Roaster, and Personal Best friend—for tailored user vibes. Runs fully locally without internet, ideal for privacy-first mental health convos.",
      techStack: ["Llama3", "Flask", "ReactJS", "Python"],
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Code className="w-12 h-12 text-cyan-400" />,
      title: "AI-Powered Code Review System",
      description: "Developed an AI-driven code review system using Llama3 to identify bugs, security flaws, and code smells. Integrated with GitHub Actions for automated pull request reviews and issue tracking. Implemented real-time feedback on code quality with suggestions for improvement.",
      techStack: ["Llama3", "GitHub Actions", "Python", "AI/ML"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Database className="w-12 h-12 text-cyan-400" />,
      title: "Serverless Data Warehouse with Real-Time ETL",
      description: "Built a serverless, distributed data warehouse using AWS Lambda and Google Cloud Functions for real-time ETL. Integrated Presto for high-speed querying of big data and machine learning models for real-time insights. Enabled secure data access with IAM and automated data pipelines using Terraform.",
      techStack: ["AWS Lambda", "Google Cloud", "Presto", "Terraform"],
      color: "from-teal-500 to-green-600"
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-cyan-400" />,
      title: "Real-Time Chat Application with WebSockets",
      description: "Built a real-time chat app using WebSockets for seamless communication. Developed with React.js, Node.js and Redis for message storage and session management. Implemented user authentication and message encryption for secure chats.",
      techStack: ["React.js", "Node.js", "WebSockets", "Redis"],
      color: "from-orange-500 to-red-600"
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
          <h2 data-text="PROJECTS" className="glitch-text text-4xl md:text-5xl font-bold mb-8">
            PROJECTS
          </h2>
          <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Tilt
              key={index}
              className="h-full"
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.02}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="h-full holographic overflow-hidden rounded-xl group"
              >
                {/* Background gradient */}
                <div className={`h-32 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                  {/* Floating icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-lg">
                    {project.icon}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute bottom-0 left-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                      <path
                        fill="rgba(15, 23, 42, 0.8)"
                        fillOpacity="1"
                        d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-3 mt-8">{project.title}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-slate-800 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </Tilt>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
          >
            Interested in collaboration? Contact me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;