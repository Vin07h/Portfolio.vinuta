/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  User, 
  Briefcase, 
  ChevronRight,
  Menu,
  X,
  Terminal,
  Database,
  Layout,
  Download
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

// --- Data ---

const SKILLS = [
  { name: "Languages", icon: <Terminal className="w-5 h-5" />, items: ["Python", "Java", "Solidity"] },
  { name: "Frontend", icon: <Layout className="w-5 h-5" />, items: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Next.js"] },
  { name: "Backend & Tools", icon: <Database className="w-5 h-5" />, items: ["Node.js", "Express", "SQL", "Firebase", "N8N", "Selenium", "Git", "Docker"] },
  { name: "Other", icon: <Globe className="w-5 h-5" />, items: ["Spreadsheets", "REST APIs", "AWS", "Vite"] },
];

const PROJECTS = [
  {
    title: "Agri Connect",
    category: "Web Development",
    description: "A role-based web platform for crop listings, direct sales, and real-time live chat for seamless farmer-retailer interaction.",
    performance: "98/100",
    link: "#",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Civic Problem Registration",
    category: "Automation",
    description: "Full-stack app for reporting civic issues, featuring a YOLO-based microservice for automatic image classification.",
    performance: "95/100",
    link: "#",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "PocketPlans",
    category: "Web Development",
    description: "A stranger meetup event booking website designed for seamless community interaction and content sharing.",
    performance: "96/100",
    link: "https://pocketplans.in/",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Sociio",
    category: "Web Development",
    description: "A modern social networking platform designed for seamless community interaction and content sharing.",
    performance: "98/100",
    link: "https://sociio.pocketplans.in/",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "EventsBySR",
    category: "Web Development",
    description: "A comprehensive event management platform for planning, booking, and managing professional events.",
    performance: "94/100",
    link: "https://www.eventsbysr.in/",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "TrustChain",
    category: "Blockchain",
    description: "A decentralized trust management system leveraging blockchain technology for secure and transparent verification.",
    performance: "92/100",
    link: "https://trust-chain-c1um.onrender.com/",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Workflow Automation Suite",
    category: "Automation",
    description: "A professional integration system designed to automate manual business operations using custom n8n flows and Selenium scripts.",
    performance: "97/100",
    link: "#",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80"
  }
];

const EXPERIENCE = [
  {
    role: "Automation Intern",
    company: "PocketPlans Entertainment OPC Pvt. Ltd.",
    period: "Present",
    description: "Developed and optimized workflow automations using n8n and Selenium to streamline business operations and data processing."
  }
];

const EDUCATION = [
  {
    degree: "B.Tech in CSE Blockchain",
    school: "Presidency University, Bangalore",
    year: "2026",
    grade: "CGPA: 8.02"
  },
  {
    degree: "Pre-University",
    school: "Saraswathi PU College, Kumta",
    year: "2022",
    grade: "76.83%"
  }
];

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-600 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1.5 bg-brand-500 mt-4 rounded-full"
    />
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const handleMagic = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { x, y },
      colors: ["#0ea5e9", "#6366f1", "#f43f5e", "#10b981"]
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus("sent");
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { x: 0.5, y: 0.7 },
      colors: ["#0ea5e9", "#10b981"]
    });

    // Reset after some time
    setTimeout(() => setFormStatus("idle"), 5000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Mouse Follower */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-500 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <motion.a 
              href="#" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-display font-bold tracking-tighter"
            >
              VINUTA JANARDHAN<span className="text-brand-600">.</span>
            </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-brand-600 transition-all shadow-lg shadow-slate-200"
            >
              Let's Talk
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 md:hidden shadow-xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-slate-600 hover:text-brand-600"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Redesigned for High Impact */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 text-slate-900">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 100, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-500/5 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              x: [0, -100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px]"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        {/* Background Vertical Text */}
        <div className="absolute top-0 right-0 h-full flex items-center pointer-events-none overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1.5 }}
            className="text-[30vw] font-black leading-none select-none writing-vertical-rl rotate-180 text-brand-500"
          >
            VINUTA
          </motion.h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Available for new projects</span>
              </motion.div>
              
              <h1 className="text-7xl md:text-[10rem] font-display font-black leading-[0.75] mb-10 tracking-tighter">
                VINUTA<br />
                <span className="text-brand-500 italic">JANARDHAN</span><br />
                HEGDE.
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed max-w-xl font-light">
                I'm a <span className="text-slate-900 font-bold">Software Developer</span> skilled in Python, Java, and Solidity, crafting efficient tech solutions.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <motion.a 
                  href="#projects" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-brand-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  Explore My Work
                </motion.a>

                <motion.a 
                  href="/resume-placeholder.pdf"
                  download="Vinuta_Janardhan_Hegde_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, borderColor: "var(--color-brand-500)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 bg-white text-slate-800 rounded-full font-bold text-lg border border-slate-200 hover:text-brand-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center gap-2.5"
                >
                  <Download className="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" />
                  Download Resume
                </motion.a>
                
                <div className="flex items-center gap-4">
                  <a href="https://github.com/Vin07h" target="_blank" rel="noreferrer" className="group p-4 bg-white rounded-full shadow-sm border border-slate-100 hover:border-brand-500 transition-all">
                    <Github className="w-6 h-6 text-slate-400 group-hover:text-brand-600" />
                  </a>
                  <a href="https://www.linkedin.com/in/vinuta-hegde-03a064257" target="_blank" rel="noreferrer" className="group p-4 bg-white rounded-full shadow-sm border border-slate-100 hover:border-brand-500 transition-all">
                    <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-brand-600" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] group"
            >
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80" 
                alt="Creative Workspace" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-purple-500/20 mix-blend-overlay" />
              
              {/* Tech Orbit */}
              <div className="absolute inset-0 pointer-events-none">
                {[Globe, Cpu, Code2, Database].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div 
                      style={{ x: 150 + i * 30 }}
                      className="p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-white/50 text-brand-500"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Status */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 -left-8 p-6 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Current Status</p>
                    <p className="font-bold text-slate-900 text-sm">Building Web3 Apps 🚀</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Redesigned as a Bento Grid */}
      <section id="about" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Beyond the code, here's the human behind the screen.">
            The Story
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Bio */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col justify-center"
            >
              <h3 className="text-4xl font-bold mb-8">Building with <span className="text-brand-500 italic">Purpose</span>.</h3>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  I'm a software developer with a deep interest in the intersection of automation and blockchain. Enthusiastic learner skilled in Python, Java, and Solidity, with hands-on experience in building efficient tech solutions.
                </p>
                <p>
                  My approach is grounded in solving real-world problems. I've led technical events as Vice-President of the Genesis Club and participated in multiple hackathons, always eager to contribute to innovative projects.
                </p>
              </div>
            </motion.div>

            {/* Visual Block - Showcasing the "Real Person" */}
            <motion.div 
              whileHover={{ scale: 1.02, rotate: -1 }}
              className="md:col-span-4 aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white relative group bg-slate-200"
            >
              <img 
                src="https://github.com/Vin07h.png" 
                alt="Vinuta Janardhan Hegde" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-white font-bold text-2xl tracking-tight">Vinuta Janardhan Hegde</p>
                <p className="text-brand-400 text-sm font-medium">Software Developer & Automation Expert</p>
              </div>
              <div className="absolute top-6 right-6 bg-brand-500/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg">
                <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Verified Developer
                </span>
              </div>
            </motion.div>

            {/* Highlights Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Top Recognitions</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Smart Mirror</span> using Raspberry Pi</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Gesture Glove</span> Arduino-Based Sign Recognition</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-600">Selected in <span className="font-bold text-slate-900">Top 80</span> projects batch-wide</p>
                </li>
              </ul>
            </motion.div>

            {/* Interests - Redesigned as an Interactive Grid */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bg-white p-1 rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden"
            >
              <div className="grid grid-cols-2 h-full">
                {[
                  { label: "AI", icon: "🤖", color: "bg-purple-500", desc: "Building Agents & LLMs" },
                  { label: "Web3", icon: "🌐", color: "bg-blue-500", desc: "Blockchain & Solidity" },
                  { label: "Automation", icon: "⚙️", color: "bg-pink-500", desc: "N8N & Selenium" },
                  { label: "Leadership", icon: "🤝", color: "bg-emerald-500", desc: "Genesis Club VP" }
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
                    className={`p-8 flex flex-col justify-center items-center text-center border-slate-50 ${i < 2 ? 'border-b' : ''} ${i % 2 === 0 ? 'border-r' : ''} group transition-colors`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-current/20`}
                    >
                      {item.icon}
                    </motion.div>
                    <h4 className="font-black text-xl text-slate-900 mb-1">{item.label}</h4>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Redesigned with Marquee and Interactive Pills */}
      <section id="skills" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <SectionHeading subtitle="The technical arsenal I use to build the future.">
            Tech Stack
          </SectionHeading>
        </div>

        {/* Marquee 1 */}
        <div className="flex overflow-hidden mb-12">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap pr-12"
          >
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <div key={i} className="flex items-center gap-6">
                <span className="text-8xl font-display font-black text-slate-100 uppercase tracking-tighter">{skill.name}</span>
                <div className="w-4 h-4 rounded-full bg-brand-500" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {SKILLS.flatMap(s => s.items).map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-bold text-slate-700 hover:bg-brand-500 hover:text-white hover:border-brand-400 transition-all cursor-default shadow-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="A selection of my recent work, ranging from web apps to experimental tools.">
            Featured Projects
          </SectionHeading>

          {/* Categories Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All", "Web Development", "Blockchain", "Automation"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative ${
                  selectedCategory === category
                    ? "text-white bg-slate-900 shadow-lg shadow-slate-900/10"
                    : "text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-slate-900 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {PROJECTS.filter(p => selectedCategory === "All" || p.category === selectedCategory).map((project, idx) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: idx * 0.05,
                    ease: [0.21, 0.47, 0.32, 0.98] 
                  }}
                  whileHover={{ y: -10 }}
                  onClick={handleMagic}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                      <span className="text-white font-bold text-lg">Click for Magic ✨</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1.5 bg-brand-50 rounded-full text-[10px] font-bold text-brand-600 uppercase tracking-widest border border-brand-100">
                        Performance: {project.performance}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    <motion.a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-brand-600 transition-all gap-2 group/btn"
                    >
                      Live Demo 
                      <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="https://github.com/Vin07h" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-600 font-medium transition-colors"
            >
              See more on GitHub <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>Education</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {EDUCATION.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{edu.degree}</h4>
                    <p className="text-slate-500">{edu.school}</p>
                  </div>
                  <span className="px-4 py-1.5 bg-brand-50 text-brand-600 text-xs font-bold rounded-full">{edu.year}</span>
                </div>
                <p className="text-brand-600 font-bold text-lg">{edu.grade}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-600/10 blur-[120px] -z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's build something <br /><span className="text-brand-400">extraordinary</span> together.</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md">
                Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:vinutahegde07@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email Me</p>
                    <p className="text-lg font-medium">vinutahegde07@gmail.com</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/vinuta-hegde-03a064257" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">LinkedIn</p>
                    <p className="text-lg font-medium">vinuta-hegde</p>
                  </div>
                </a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/10"
            >
              {formStatus === "sent" ? (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-4xl">✨</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                    <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors resize-none" placeholder="How can I help you?" />
                  </div>
                  <button 
                    disabled={formStatus === "sending"}
                    className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-slate-900 text-white rounded-full shadow-2xl z-[999] flex items-center justify-center hover:bg-brand-600 transition-all border border-white/10"
          >
            <ChevronRight className="w-6 h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-white/5 text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-white font-display font-bold text-xl mb-2 tracking-tighter">VINUTA JANARDHAN<span className="text-brand-500">.</span></p>
            <p className="text-sm">© 2026 Vinuta Janardhan Hegde. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/Vin07h" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/vinuta-hegde-03a064257" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:vinutahegde07@gmail.com" className="hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
