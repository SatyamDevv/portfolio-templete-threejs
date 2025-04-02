"use client";

import { motion, useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { HiCode, HiCollection, HiColorSwatch, HiLightningBolt, HiServer } from 'react-icons/hi';
import SceneWrapper from "../components/SceneWrapper";
import portfolioData from "../data/portfolioData";

// Futuristic cursor that changes based on interactive elements
function FuturisticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      positionRef.current = newPosition;
      setPosition(newPosition);
    };
    
    const updatePointerStatus = () => {
      const currentPosition = positionRef.current;
      const hoveredElement = document.elementFromPoint(currentPosition.x, currentPosition.y);
      const isPointerNow = hoveredElement ? 
        getComputedStyle(hoveredElement).cursor === 'pointer' : false;
      setIsPointer(isPointerNow);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    let lastUpdateTime = 0;
    const throttledUpdatePosition = (e) => {
      const now = Date.now();
      if (now - lastUpdateTime > 16) {
        lastUpdateTime = now;
        updatePosition(e);
      }
    };
    
    window.addEventListener('mousemove', throttledUpdatePosition, { passive: true });
    window.addEventListener('mouseover', updatePointerStatus, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', throttledUpdatePosition);
      window.removeEventListener('mouseover', updatePointerStatus);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  const cursorVariants = {
    default: { 
      height: 32,
      width: 32,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    pointer: {
      height: 40,
      width: 40,
      borderColor: 'rgba(79, 70, 229, 0.8)',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
    },
    clicking: {
      height: 24,
      width: 24,
      borderColor: 'rgba(147, 51, 234, 0.9)',
      backgroundColor: 'rgba(147, 51, 234, 0.2)',
    }
  };
  
  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border-2 pointer-events-none z-50"
      animate={isClicking ? "clicking" : isPointer ? "pointer" : "default"}
      variants={cursorVariants}
      transition={{
        type: 'spring',
        stiffness: 700,
        damping: 30
      }}
      style={{
        x: position.x - 16,
        y: position.y - 16,
        mixBlendMode: 'difference'
      }}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-white opacity-0 transform scale-0"
        animate={{ 
          opacity: isPointer ? 0.2 : 0,
          scale: isPointer ? 0.5 : 0
        }}
      />
    </motion.div>
  );
}

// Modern content section with perspective effects
const GlassSection = ({ id, className, children, isActive, setActive }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(id);
        }
      },
      { threshold: 0.5, rootMargin: '0px' }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [id, setActive]);
  
  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center relative z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-8">
        <div className="backdrop-blur-xl rounded-2xl backdrop-filter p-8 bg-white/5 border border-white/10 shadow-xl">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

// Futuristic project card with hover effects
const FuturisticProjectCard = ({ title, type, description, tech, color, delay = 0 }) => {
  return (
    <motion.div
      className="backdrop-blur-md rounded-xl overflow-hidden relative group h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300"
           style={{ background: `linear-gradient(135deg, ${color}, transparent)` }} 
      />
      
      <div className={`h-2 w-full`} style={{ background: color }} />
      
      <div className="p-6 border border-white/10 border-t-0 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-white flex items-center">
          <div className="h-4 w-4 rounded-sm mr-2" style={{ background: color }} />
          {title}
        </h3>
        
        <p className={`text-gray-400 mb-4`}>{type}</p>
        
        <ul className="list-none space-y-2 text-gray-300 mb-4 flex-grow">
          {description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-xs mr-2 mt-1">■</span>
              {item}
            </li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tech.map((item) => (
            <motion.span
              key={item}
              className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs flex items-center"
              whileHover={{ scale: 1.05, color: "#ffffff", borderColor: color }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Tech skill tag with glow effect
const GlowingSkillTag = ({ skill, color, icon: Icon, delay = 0 }) => (
  <motion.div
    className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md relative group"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 300, delay }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
         style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }} 
    />
    
    {Icon && <Icon className="text-lg" style={{ color }} />}
    <span className="text-gray-200">{skill}</span>
  </motion.div>
);

// Navigation system that visualizes sections
const FloatingNavigation = ({ activeSection, sections, onSectionChange }) => {
  return (
    <motion.nav 
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-40"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Section navigation"
    >
      <div className="flex flex-col space-y-6">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className="group relative flex items-center justify-end"
            onClick={() => onSectionChange(index)}
            aria-label={`Navigate to ${section.label} section`}
            aria-current={activeSection === index ? 'page' : undefined}
          >
            <motion.span
              className="pr-4 text-white text-sm opacity-0 translate-x-2 absolute right-full whitespace-nowrap"
              animate={{
                opacity: activeSection === index ? 1 : 0,
                x: activeSection === index ? 0 : 10
              }}
              transition={{ duration: 0.2 }}
            >
              {section.label}
            </motion.span>
            
            <motion.span
              className="pr-4 text-white/70 text-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 absolute right-full transition-all duration-200 pointer-events-none whitespace-nowrap"
              style={{ transitionProperty: 'opacity, transform' }}
            >
              {section.label}
            </motion.span>
            
            <motion.div 
              className="w-3 h-3 rounded-full bg-white/50 relative"
              animate={{ 
                scale: activeSection === index ? 1.2 : 1,
                backgroundColor: activeSection === index ? section.color : 'rgba(255, 255, 255, 0.5)'
              }}
              whileHover={{ scale: 1.5 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: activeSection === index ? `0 0 0 2px ${section.color}` : 'none'
                }}
              />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  
  const { personalInfo, experience, projects, education, achievements, skills } = portfolioData;
  
  // Define sections with colors for navigation
  const sections = [
    { id: "hero", label: "Home", color: "#4f46e5" },
    { id: "projects", label: "Projects", color: "#06b6d4" },
    { id: "skills", label: "Skills", color: "#ec4899" },
    { id: "experience", label: "Experience", color: "#8b5cf6" },
    { id: "contact", label: "Contact", color: "#14b8a6" }
  ];
  
  const handleSectionChange = useCallback((index) => {
    setActiveSection(index);
    
    const sectionHeight = window.innerHeight;
    window.scrollTo({
      top: index * sectionHeight,
      behavior: 'smooth'
    });
  }, []);
  
  useEffect(() => {
    const onSceneLoaded = () => {
      setSceneLoaded(true);
    };
    
    window.addEventListener('scene-loaded', onSceneLoaded);
    
    let lastScrollTime = 0;
    let scrollTimeout;
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > 100) {
        lastScrollTime = now;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const currentSection = Math.floor((scrollPosition + windowHeight / 2) / windowHeight);
          
          if (currentSection !== activeSection && currentSection < sections.length) {
            setActiveSection(currentSection);
          }
        }, 50);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scene-loaded', onSceneLoaded);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection, sections.length]);
  
  return (
    <div className="scroll-smooth bg-[#050816]">
      <FuturisticCursor />
      
      {/* 3D Background Scene */}
      <SceneWrapper onSectionChange={setActiveSection} />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#ec4899] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Navigation */}
      <FloatingNavigation 
        activeSection={activeSection} 
        sections={sections} 
        onSectionChange={handleSectionChange} 
      />
      
      {/* Content Sections */}
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        {/* Hero Section */}
        <GlassSection 
          id="hero" 
          className="snap-start"
          isActive={activeSection === 0} 
          setActive={() => setActiveSection(0)}
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-6 inline-block"
            >
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
              <h3 className="text-blue-400 uppercase tracking-wider text-sm font-semibold mb-2">Welcome to my portfolio</h3>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {personalInfo.name}
            </motion.h1>
            
            <motion.div
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-xl md:text-3xl font-semibold mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {personalInfo.title}
            </motion.div>
            
            <motion.p 
              className="max-w-2xl mx-auto text-gray-300 text-lg mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {personalInfo.about}
            </motion.p>
            
            <motion.div 
              className="flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {/* Social links */}
              {[
                { href: personalInfo.github, icon: FaGithub, label: "GitHub", color: "#4f46e5" },
                { href: personalInfo.linkedin, icon: FaLinkedin, label: "LinkedIn", color: "#06b6d4" },
                { href: `mailto:${personalInfo.email}`, icon: FaEnvelope, label: "Email", color: "#ec4899" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-md p-3 rounded-full text-white border border-white/10 transition-all relative group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                       style={{ background: `radial-gradient(circle at center, ${social.color}, transparent 70%)` }} 
                  />
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
              aria-hidden="true"
            >
              <FaArrowDown className="text-white text-2xl" />
            </motion.div>
          </div>
        </GlassSection>
        
        {/* Projects Section */}
        <GlassSection 
          id="projects" 
          className="snap-start"
          isActive={activeSection === 1} 
          setActive={() => setActiveSection(1)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6"></div>
            <h3 className="text-cyan-400 uppercase tracking-wider text-sm font-semibold mb-2">My work</h3>
            <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <FuturisticProjectCard
                key={index}
                title={project.title}
                type={project.type}
                description={project.description}
                tech={project.tech}
                color={sections[1].color}
                delay={index * 0.2}
              />
            ))}
          </div>
        </GlassSection>
        
        {/* Skills Section */}
        <GlassSection 
          id="skills" 
          className="snap-start"
          isActive={activeSection === 2} 
          setActive={() => setActiveSection(2)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6"></div>
            <h3 className="text-pink-400 uppercase tracking-wider text-sm font-semibold mb-2">My expertise</h3>
            <h2 className="text-4xl font-bold text-white mb-10">Technical Skills</h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <motion.div 
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <HiCode className="text-2xl mr-3 text-pink-400" />
                <h3 className="text-xl font-semibold text-white">Frontend Development</h3>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skills.frontend.map((skill, idx) => (
                  <GlowingSkillTag 
                    key={skill} 
                    skill={skill} 
                    color="#ec4899"
                    delay={0.1 + (idx * 0.05)} 
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <motion.div 
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <HiServer className="text-2xl mr-3 text-pink-400" />
                <h3 className="text-xl font-semibold text-white">Backend Development</h3>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skills.backend.map((skill, idx) => (
                  <GlowingSkillTag 
                    key={skill} 
                    skill={skill} 
                    color="#ec4899"
                    delay={0.3 + (idx * 0.05)} 
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <motion.div 
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <HiCollection className="text-2xl mr-3 text-pink-400" />
                <h3 className="text-xl font-semibold text-white">Database Technologies</h3>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skills.databases.map((skill, idx) => (
                  <GlowingSkillTag 
                    key={skill} 
                    skill={skill} 
                    color="#ec4899"
                    delay={0.5 + (idx * 0.05)} 
                  />
                ))}
              </div>
            </div>
            
            <div>
              <motion.div 
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <HiColorSwatch className="text-2xl mr-3 text-pink-400" />
                <h3 className="text-xl font-semibold text-white">Tools & Platforms</h3>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skills.tools.map((skill, idx) => (
                  <GlowingSkillTag 
                    key={skill} 
                    skill={skill} 
                    color="#ec4899"
                    delay={0.7 + (idx * 0.05)} 
                  />
                ))}
              </div>
            </div>
          </div>
        </GlassSection>
        
        {/* Experience Section */}
        <GlassSection 
          id="experience" 
          className="snap-start"
          isActive={activeSection === 3} 
          setActive={() => setActiveSection(3)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-6"></div>
            <h3 className="text-purple-400 uppercase tracking-wider text-sm font-semibold mb-2">My journey</h3>
            <h2 className="text-4xl font-bold text-white mb-10">Experience & Education</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div>
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <HiLightningBolt className="text-2xl mr-3 text-purple-400" />
                <h3 className="text-2xl font-semibold text-white">Work Experience</h3>
              </motion.div>
              
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="absolute h-full w-1 bg-purple-500/50 left-0 top-0 group-hover:bg-purple-500 transition-colors duration-300"></div>
                    
                    <div className="pl-3">
                      <h4 className="text-xl font-semibold text-white">{job.title}</h4>
                      <div className="flex justify-between items-center mb-4 mt-1">
                        <span className="text-purple-300">{job.company}</span>
                        <span className="text-gray-400 text-sm px-3 py-1 rounded-full bg-white/5">{job.period}</span>
                      </div>
                      <ul className="list-none text-gray-300 space-y-2">
                        {job.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-purple-400 mr-2">►</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <HiLightningBolt className="text-2xl mr-3 text-purple-400" />
                <h3 className="text-2xl font-semibold text-white">Education</h3>
              </motion.div>
              
              <div className="space-y-8 mb-10">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.2) }}
                  >
                    <div className="absolute h-full w-1 bg-purple-500/50 left-0 top-0 group-hover:bg-purple-500 transition-colors duration-300"></div>
                    
                    <div className="pl-3">
                      <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                      <div className="flex justify-between items-center mb-2 mt-1">
                        <span className="text-purple-300">{edu.institution}</span>
                        <span className="text-gray-400 text-sm px-3 py-1 rounded-full bg-white/5">{edu.period}</span>
                      </div>
                      <p className="text-gray-300">{edu.grade}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <HiLightningBolt className="text-2xl mr-3 text-purple-400" />
                <h3 className="text-2xl font-semibold text-white">Achievements</h3>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="absolute h-full w-1 bg-purple-500/50 left-0 top-0"></div>
                
                <ul className="list-none text-gray-300 space-y-3 pl-3">
                  {achievements.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                      className="flex items-start"
                    >
                      <span className="text-purple-400 mr-2">★</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </GlassSection>
        
        {/* Contact Section */}
        <GlassSection 
          id="contact" 
          className="snap-start"
          isActive={activeSection === 4} 
          setActive={() => setActiveSection(4)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-green-500 mx-auto mb-6"></div>
            <h3 className="text-teal-400 uppercase tracking-wider text-sm font-semibold mb-2">Get in touch</h3>
            <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">Ready to start our next project together? Reach out through any of these channels and I'll get back to you promptly.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.a 
              href={`mailto:${personalInfo.email}`}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 text-center group border border-white/10 hover:bg-white/10 transition-all relative h-full"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                   style={{ background: `radial-gradient(circle at center, ${sections[4].color}, transparent 70%)` }} 
              />
              
              <div className="bg-gradient-to-br from-teal-500/20 to-teal-500/5 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-teal-500/20">
                <FaEnvelope size={24} className="text-teal-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
              <p className="text-gray-400 text-sm break-all">{personalInfo.email}</p>
            </motion.a>
            
            <motion.a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 text-center group border border-white/10 hover:bg-white/10 transition-all relative h-full"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                   style={{ background: `radial-gradient(circle at center, ${sections[4].color}, transparent 70%)` }} 
              />
              
              <div className="bg-gradient-to-br from-teal-500/20 to-teal-500/5 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-teal-500/20">
                <FaLinkedin size={24} className="text-teal-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">LinkedIn</h3>
              <p className="text-gray-400 text-sm">Professional Profile</p>
            </motion.a>
            
            <motion.a 
              href={`tel:${personalInfo.phone}`}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 text-center group border border-white/10 hover:bg-white/10 transition-all relative h-full"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                   style={{ background: `radial-gradient(circle at center, ${sections[4].color}, transparent 70%)` }} 
              />
              
              <div className="bg-gradient-to-br from-teal-500/20 to-teal-500/5 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-teal-500/20">
                <FaPhone size={24} className="text-teal-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Phone</h3>
              <p className="text-gray-400 text-sm">{personalInfo.phone}</p>
            </motion.a>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-gray-400 mb-6">{personalInfo.location}</p>
            <div className="inline-block">
              <motion.div
                className="text-white text-lg px-6 py-3 rounded-full relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Let's build something amazing together!</span>
              </motion.div>
            </div>
          </motion.div>
        </GlassSection>
        
        {/* Footer */}
        <motion.footer 
          className="py-6 text-center text-gray-400 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </motion.footer>
      </div>
      
      {/* Loading indicator */}
      {!sceneLoaded && (
        <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-xl z-50 border border-white/10 flex items-center">
          <div className="w-3 h-3 rounded-full bg-teal-500 mr-3 animate-pulse"></div>
          <p>Loading 3D elements...</p>
        </div>
      )}
    </div>
  );
}
