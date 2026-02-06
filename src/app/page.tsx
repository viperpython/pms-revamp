'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image, { StaticImageData } from "next/image"
import PMSLogo from "./Untitled.png"
import SkyLine from "./city-skyline.jpg"
import RD from "./R-and-D.jpg"
import Design from "./design.jpg"
import Testing from "./Testing.jpg"

// Custom cursor component for extra polish
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 33, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-9999 mix-blend-luminosity hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <div className="w-full h-full rounded-full bg-white opacity-80" />
    </motion.div>
  );
}

// Noise texture overlay for depth
function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-100 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Smooth scroll progress indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 origin-left z-[1000]"
      style={{ scaleX }}
    />
  );
}

// Floating navigation
function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setVisible(latest > 100);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] px-8 py-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10"
        >
          <div className="flex items-center gap-8">
            <Image src={PMSLogo} alt="PMS" width={32} height={32} className="opacity-80" />
            {['Services', 'Vision', 'Values', 'Advantage'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// Floating particles component - client-side only
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate particles only on client side
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
          initial={{ 
            x: particle.x, 
            y: particle.y 
          }}
          animate={{
            y: [null, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <>
      <CustomCursor />
      {/* <NoiseOverlay /> */}
      <ScrollProgress />
      <FloatingNav />
      
      <main ref={container} className="bg-[#030303] text-white overflow-x-hidden">
        <HeroSection scrollYProgress={scrollYProgress} />
        <ServicesSection />
        <VisionMissionSection />
        <ValuesSection />
        <StrategicAdvantageSection />
        <Footer />
      </main>
    </>
  );
}

// ==================== HERO SECTION ====================
function HeroSection({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-[150vh] overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-rose-950/20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Parallax city background */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: useTransform(scrollYProgress, [0, 0.5], [0, 200]),
        }}
      >
        <Image 
          src={SkyLine} 
          alt="City Skyline" 
          fill 
          className="object-cover opacity-30 scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent" />
      </motion.div>

      {/* Floating particles - now rendered client-side only */}
      <FloatingParticles />

      {/* Main content */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <motion.div 
          style={{ y, opacity, scale }}
          className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left content */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Pavement Management Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight"
            >
              <span className="block text-white">Expertise in</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
                Pavement
              </span>
              <span className="block text-white/80">Engineering</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl text-white/50 max-w-xl leading-relaxed"
            >
              Structural evaluation and turn-key RAMS deliverables. 
              Building India&apos;s road infrastructure with data-driven precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-semibold overflow-hidden">
                <span className="relative z-10">Explore Services</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-colors">
                Contact Us
              </button>
            </motion.div>
          </div>

          {/* Right content - Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="lg:col-span-4 flex justify-center"
            style={isMounted ? { 
              x: mousePosition.x * -0.5,
              y: mousePosition.y * -0.5,
            } : {}}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl scale-150" />
              <Image 
                src={PMSLogo} 
                alt="PMS Logo" 
                width={250} 
                height={250}
                className="relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-amber-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ==================== SERVICES SECTION ====================
function ServicesSection() {
  const services = [
    { 
      title: "Testing", 
      desc: "Structural capacity appraisal & FWD analysis with cutting-edge technology", 
      image: Testing,
      icon: "🔬",
      stats: "500+",
      label: "Projects Completed",
      color: "amber"
    },
    { 
      title: "Design", 
      desc: "Asset management baselining & strategic planning for optimal performance", 
      image: Design,
      icon: "📐",
      stats: "200+",
      label: "Designs Delivered",
      color: "orange"
    },
    { 
      title: "Research", 
      desc: "Lifecycle cost optimization & innovative solutions for modern infrastructure", 
      image: RD,
      icon: "💡",
      stats: "50+",
      label: "Patents Filed",
      color: "rose"
    }
  ];

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-8"
          >
            ✦ What We Do Best
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Core </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
              Expertise
            </span>
          </h2>
          
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            Precision engineering meets data science. End-to-end pavement solutions 
            that transform infrastructure management.
          </p>
        </motion.div>

        {/* Services cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
    >
      <motion.div 
        animate={{ y: isHovered ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative h-[550px] rounded-3xl overflow-hidden"
      >
        {/* Card background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl" />
        
        {/* Image with parallax effect */}
        <motion.div 
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image 
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          {/* Top section */}
          <div className="flex justify-between items-start">
            <motion.span 
              animate={{ scale: isHovered ? 1.5 : 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl"
            >
              {service.icon}
            </motion.span>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{service.stats}</div>
              <div className="text-sm text-white/40">{service.label}</div>
            </div>
          </div>

          {/* Bottom section */}
          <div>
            <motion.h3 
              animate={{ x: isHovered ? 10 : 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              {service.title}
            </motion.h3>
            
            <p className="text-white/50 mb-6 leading-relaxed">
              {service.desc}
            </p>

            <motion.div 
              initial={{ width: '40%' }}
              animate={{ width: isHovered ? '100%' : '40%' }}
              className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6"
            />

            <motion.div 
              animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0.5 }}
              className="flex items-center gap-2 text-amber-400 font-medium"
            >
              <span>Learn more</span>
              <motion.svg 
                animate={{ x: isHovered ? 5 : 0 }}
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.div>
          </div>
        </div>

        {/* Hover border glow */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-3xl border-2 border-amber-500/50 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

// ==================== VISION & MISSION SECTION ====================
function VisionMissionSection() {
  return (
    <section id="vision" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Purpose
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative"
          >
            <div className="relative p-10 lg:p-12 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 rounded-[2rem] overflow-hidden h-full">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-white">Vision</h3>
                </div>
                
                <p className="text-xl text-white/60 leading-relaxed">
                  To help India build and maintain strong and durable pavements by using 
                  pavement condition data and lifecycle planning.
                </p>

                <motion.div 
                  className="mt-8 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative"
          >
            <div className="relative p-10 lg:p-12 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 rounded-[2rem] overflow-hidden h-full">
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-white">Mission</h3>
                </div>
                
                <ul className="space-y-6">
                  {[
                    "To deliver data-driven solutions that empower road agencies to make informed decisions, extend pavement life, and ensure cost-effective and sustainable road networks.",
                    "To keep improving through continuous learning and sharing of best practices from projects and research."
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.2 }}
                      className="flex gap-4"
                    >
                      <span className="shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                        {i + 1}
                      </span>
                      <span className="text-lg text-white/60 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==================== VALUES SECTION ====================
const values = [
  { title: "Integrity in Data", desc: "Our advice and decisions are always based on honest measurements and facts.", icon: "📊" },
  { title: "Client Satisfaction", desc: "We listen to our clients and work to exceed their expectations all the time.", icon: "🤝" },
  { title: "Quality Commitment", desc: "We maintain high standards, from field testing to final reporting.", icon: "✨" },
  { title: "Teamwork", desc: "PMS believes in collaboration among engineers, clients, and partners, to get the best results.", icon: "👥" },
  { title: "Innovation", desc: "We use new technology and new ideas to deliver smarter and more cost-effective solutions.", icon: "💡" },
  { title: "Reliability", desc: "We deliver every project on time and as promised, building trust through performance.", icon: "⚡" },
  { title: "Transparency", desc: "Our process and reports are always clear and open for client review.", icon: "🔍" },
  { title: "Learning", desc: "We keep improving by learning new methods and sharing best practices.", icon: "📚" }
];

function ValuesSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % values.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="values" className="relative min-h-screen py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8">
            ◆ What Drives Us
          </span>
          <h2 className="text-5xl md:text-7xl font-bold">
            <span className="text-white">Our Core </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
              Values
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Values list */}
          <div className="lg:col-span-5 space-y-2">
            {values.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => {
                  setActive(index);
                  setIsPaused(true);
                }}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => setActive(index)}
                className={`relative w-full px-6 py-4 text-left rounded-xl transition-all duration-300 group ${
                  active === index ? 'bg-blue-500/10' : 'hover:bg-white/5'
                }`}
              >
                {active === index && (
                  <motion.div
                    layoutId="value-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className="flex items-center gap-4">
                  <span className={`text-2xl transition-transform duration-300 ${active === index ? 'scale-125' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className={`text-lg font-medium transition-colors ${
                    active === index ? 'text-blue-300' : 'text-white/60 group-hover:text-white/80'
                  }`}>
                    {item.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active value display */}
          <div className="lg:col-span-7 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative w-full p-12 bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-transparent border border-blue-500/20 rounded-[2rem] overflow-hidden"
              >
                {/* Background number */}
                <span className="absolute -top-8 -right-4 text-[14rem] font-bold text-blue-500/5 select-none leading-none">
                  {String(active + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  <motion.span 
                    key={`icon-${active}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl block mb-6"
                  >
                    {values[active].icon}
                  </motion.span>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {values[active].title}
                  </h3>
                  
                  <p className="text-xl text-blue-100/60 leading-relaxed max-w-lg">
                    {values[active].desc}
                  </p>
                </div>

                {/* Progress bar */}
                {!isPaused && (
                  <motion.div
                    key={`progress-${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 origin-left"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== STRATEGIC ADVANTAGE SECTION ====================
function StrategicAdvantageSection() {
  return (
    <section id="advantage" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* WHY PMS */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="inline-block px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-8">
              ◈ Our Advantage
            </span>
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">Why </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                PMS?
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: "Evidence First",
                desc: "Decisions driven by data, not opinions. We measure accurately and build every recommendation on hard evidence.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                title: "Cost Effective",
                desc: "Targeted interventions reduce lifecycle costs while meeting performance and safety goals.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: "from-teal-500 to-cyan-500"
              },
              {
                title: "Built to Scale",
                desc: "Start with a pilot corridor, then roll out to the whole network using the same process. No rework.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                gradient: "from-cyan-500 to-blue-500"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-colors"
              >
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} p-[1px]`}>
                  <div className="w-full h-full rounded-2xl bg-[#030303] flex items-center justify-center text-emerald-400">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HOW WE WORK */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">How We </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Work
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { title: "Fit In", desc: "We act as a flexible specialist, integrating seamlessly into your existing processes.", number: "01" },
                { title: "Collaborate", desc: "Working closely with Gov agencies, PMC firms, and private operators.", number: "02" },
                { title: "Deliver", desc: "Smooth delivery from start to finish, supporting RAMS portals and surveys.", number: "03" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative"
                >
                  {/* Step indicator */}
                  <div className="flex justify-center mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px]"
                    >
                      <div className="w-full h-full rounded-full bg-[#030303] flex items-center justify-center">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-400">
                          {step.number}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-amber-500/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"> infrastructure?</span>
            </h2>
            <p className="text-xl text-white/50 mb-8">
              Let&apos;s discuss how data-driven pavement solutions can benefit your projects.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-shadow">
              Get in Touch
            </button>
          </motion.div>

          {/* Right - Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl scale-150" />
              <Image src={PMSLogo} alt="PMS Logo" width={180} height={180} className="relative" />
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Pavement Management Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['LinkedIn', 'Twitter', 'Email'].map((item) => (
              <a key={item} href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}