'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image, { StaticImageData } from "next/image"
import PMSLogo from "./Untitled.png"
import SkyLine from "./city-skyline.jpg"
import RD from "./R-and-D.jpg"
import Design from "./design.jpg"
import Testing from "./Testing.jpg"
import { useState, useEffect } from 'react';

// Define the type for the card item
interface CardItem {
  title: string;
  desc: string;
  image: StaticImageData
}

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const horizontalScrollRef = useRef(null);
  const { scrollYProgress: scrollYProgressHorizontal } = useScroll({
    target: horizontalScrollRef,
    // Change this to pin exactly while the section overlaps the viewport
    offset: ['start start', 'end end']
  });

  const x = useTransform(scrollYProgressHorizontal, [0, 1], ['0%', '-250%']);

  return (
    <main ref={container} className="bg-[#0a0a0a] text-white">

      {/* SECTION 1: HERO PARALLAX */}
      <section className="h-screen relative flex items-start justify-center">
        {/* Background Layer (Moves Slow) */}
        <motion.div
          // style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-15%']) }}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-800 via-[#0a0a0a] to-black opacity-60" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ backgroundImage: `url(${SkyLine.src})` }}
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          />
        </motion.div>

        {/* Text Layer (Moves Faster - Creates Depth) */}
        <div className="sticky top-0 h-screen flex flex-row items-center justify-around z-10">
          <motion.h1
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], [0, -50]),
              opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
            }}
            className="text-base md:text-[4rem] font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-slate-100 to-slate-600 select-none w-2/3 justify-between "
          >
            Expertise in pavement&apos;s structural evaluation, and turn-key RAMS deliverables
          </motion.h1>
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]), y: useTransform(scrollYProgress, [0, 0.5], [0, -50]), }}
          >
            <Image src={PMSLogo} alt='PMS Logo' width={150} height={150}></Image>
          </motion.p>
        </div>

        {/* Foreground Layer (Moves Fastest - Exploded View) */}
        <motion.div
          className="absolute bottom-0 w-full h-[20vh] bg-linear-to-t from-[#304450] to-transparent z-20 "
        />
      </section>

      {/* SECTION 2: HORIZONTAL SCROLL */}
      {/* SECTION 2: IMMERSIVE 3D CARD GALLERY */}
<section ref={horizontalScrollRef} className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] py-32 overflow-hidden">
  
  {/* Animated Grid Background */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
  </div>

  {/* Floating Orbs */}
  <motion.div 
    animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 8, repeat: Infinity }}
    className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
  />
  <motion.div 
    animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
    className="absolute bottom-20 left-1/4 w-72 h-72 bg-orange-600/15 rounded-full blur-[80px]"
  />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    
    {/* Section Header */}
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
        What We Do Best
      </span>
      <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        <span className="text-white">Core </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
          Expertise
        </span>
      </h2>
      <p className="text-slate-400 text-xl max-w-2xl mx-auto">
        Precision engineering meets data science. We deliver end-to-end pavement solutions.
      </p>
    </motion.div>

    {/* Cards Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { 
          title: "Testing", 
          desc: "Structural capacity appraisal & FWD analysis", 
          image: Testing,
          icon: "🔬",
          stats: "500+ Projects"
        },
        { 
          title: "Design", 
          desc: "Asset management baselining & Strategies", 
          image: Design,
          icon: "📐",
          stats: "200+ Designs"
        },
        { 
          title: "Research", 
          desc: "Lifecycle cost optimization & Innovations", 
          image: RD,
          icon: "💡",
          stats: "50+ Patents"
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          whileHover={{ y: -12, scale: 1.02 }}
          className="group relative"
        >
          <div className="relative h-[480px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
            
            {/* Image */}
            <div className="absolute inset-0">
              <img 
                src={item.image.src} 
                alt={item.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="text-4xl mb-4">{item.icon}</span>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                {item.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-amber-500 font-semibold">{item.stats}</span>
                <motion.div 
                  className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 transition-colors"
                  whileHover={{ rotate: 45 }}
                >
                  <svg className="w-5 h-5 text-amber-500 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Hover Border Glow */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-amber-500/50 transition-colors duration-500" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* SECTION 3: FOOTER REVEAL */}
      <VisionMission />
      <ValuesTabs />
      <StrategicAdvantage/>
    </main>
  );
}

function ParallaxCard({ index, item }: { index: number; item: CardItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors w-full shrink-0 flex flex-col"
    >
      {/* Header section - aligned to start */}
      <div className="text-amber-400 text-sm font-mono mb-4">
        0{index + 1}
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400">
        {item.title}
      </h3>
      <p className="text-slate-400 mb-6">
        {item.desc}
      </p>

      {/* Image section - fixed height container for consistency */}
      <div className="relative w-full h-64 mt-auto">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>
    </motion.div>
  );
}

function VisionMission() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] py-24 px-6 overflow-hidden">

      {/* Background Gradient Blob for ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl relative z-10">

        {/* CARD 1: VISION */}
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group p-10 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl hover:bg-white/10 transition-colors"
        >
          <div className="w-12 h-1 bg-amber-500 mb-6" /> {/* Amber Accent Line */}
          <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-amber-400 transition-colors">
            Vision
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            To help India build and maintain strong and durable pavements by using pavement condition data and lifecycle planning.
          </p>
        </motion.div>

        {/* CARD 2: MISSION */}
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group p-10 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl hover:bg-white/10 transition-colors"
        >
          <div className="w-12 h-1 bg-amber-500 mb-6" />
          <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-amber-400 transition-colors">
            Mission
          </h2>
          <ul className="space-y-4 text-lg text-slate-300 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-amber-500">▸</span>
              <span>
                To deliver data-driven solutions that empower road agencies to make informed decisions, extend pavement life, and ensure cost-effective and sustainable road networks.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">▸</span>
              <span>
                To keep improving through continuous learning and sharing of best practices from projects and research.
              </span>
            </li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}

const values = [
  { title: "Integrity in Data", desc: "Our advice and decisions are always based on honest measurements and facts." },
  { title: "Client Satisfaction", desc: "We listen to our clients and work to exceed their expectations all the time." },
  { title: "Quality Commitment", desc: "We maintain high standards, from field testing to final reporting." },
  { title: "Teamwork", desc: "PMS believes in collaboration among engineers, clients, and partners, to get the best results." },
  { title: "Innovation", desc: "We use new technology and new ideas to deliver smarter and more cost-effective solutions." },
  { title: "Reliability", desc: "We deliver every project on time and as promised, building trust through performance." },
  { title: "Transparency", desc: "Our process and reports are always clear and open for client review." },
  { title: "Learning", desc: "We keep improving by learning new methods and sharing best practices." }
];

export function ValuesTabs() {
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
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-[#050505] py-24 px-6 overflow-hidden"
    // Pause when hovering strictly over the container to prevent jarring auto-switches while reading

    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-200">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          <div className="md:col-span-5 flex flex-col gap-2">
            {values.map((item, index) => (
              <button
                key={index}
                onMouseEnter={() => {
                  setActive(index)
                  setIsPaused(true)
                }}
                onClick={() => setActive(index)}
                onMouseLeave={() => setIsPaused(false)}
                // Removed background classes from here to let motion.div handle the slide
                className={`relative px-6 py-4 text-left rounded-xl transition-colors duration-300 group outline-none ${active === index ? '' : 'hover:bg-white/5'
                  }`}
              >
                {/* THE SLIDING PILL
                   We move the background styling HERE and use layoutId.
                   This makes the blue box physically slide between items.
                */}
                {active === index && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-600/20 rounded-xl border border-blue-500/30 shadow-[0_0_30px_-5px_rgba(37,99,235,0.3)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* The vertical accent line inside the pill */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl" />
                  </motion.div>
                )}

                {/* Text needs relative z-10 to sit ON TOP of the sliding background */}
                <span className={`relative z-10 text-lg font-medium inline-block transition-transform duration-300 ${active === index ? 'text-blue-100 translate-x-2' : 'text-slate-400 group-hover:text-blue-200'
                  }`}>
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          <div className="md:col-span-7 flex items-center justify-center relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col justify-center p-12 border border-blue-500/20 bg-linear-to-br from-blue-950/30 to-black backdrop-blur-2xl rounded-3xl relative overflow-hidden"
              >
                <span className="absolute -top-10 -right-10 text-[12rem] font-bold text-blue-900/10 select-none">
                  {active + 1}
                </span>

                <h3 className="text-4xl font-bold text-blue-100 mb-6 relative z-10">
                  {values[active].title}
                </h3>
                <p className="text-xl text-blue-200/80 leading-relaxed relative z-10">
                  {values[active].desc}
                </p>

                {!isPaused && (
                  <motion.div
                    key={`progress-${active}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-blue-500/50"
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
export function StrategicAdvantage() {
  return (
    <>
      {/* SECTION 1: WHY PMS (Full Screen) */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden">
        
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl w-full relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-12 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200"
          >
            Why PMS?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[60vh]">
            
            {/* Card 1: Evidence First (Tall Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-2 p-8 rounded-3xl border border-emerald-500/20 bg-linear-to-b from-emerald-950/30 to-black backdrop-blur-md flex flex-col justify-between group hover:border-emerald-500/40 transition-colors"
            >
              <div>
                <div className="w-12 h-12 mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-emerald-100 mb-4">Evidence First</h3>
                <p className="text-emerald-200/60 leading-relaxed">
                  Decisions driven by data, not opinions. We measure accurately and build every recommendation on hard evidence.
                </p>
              </div>
              <div className="w-full h-24 bg-linear-to-t from-emerald-500/10 to-transparent rounded-xl border-b border-emerald-500/20" />
            </motion.div>

            {/* Card 2: Cost Effective (Top Right) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 p-8 rounded-3xl border border-emerald-500/20 bg-linear-to-b from-emerald-950/30 to-black backdrop-blur-md flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-emerald-100 mb-3">Cost Effective by Design</h3>
                <p className="text-emerald-200/60">
                  Targeted interventions reduce lifecycle costs while meeting performance and safety goals.
                </p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-emerald-500/30 flex items-center justify-center shrink-0">
                 <span className="text-xl font-bold text-emerald-400">ROI</span>
              </div>
            </motion.div>

            {/* Card 3: Built to Scale (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 p-8 rounded-3xl border border-emerald-500/20 bg-linear-to-b from-emerald-950/30 to-black backdrop-blur-md flex flex-col justify-center group hover:border-emerald-500/40 transition-colors"
            >
              <h3 className="text-2xl font-bold text-emerald-100 mb-3">Built to Scale</h3>
              <p className="text-emerald-200/60">
                Start with a pilot corridor, then roll out to the whole network using the same process. No rework.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW WE WORK (Full Screen) */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden">
        
        {/* Background Ambience (Right Side) */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl w-full relative z-10">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-24 text-center md:text-right text-transparent bg-clip-text bg-linear-to-l from-emerald-400 to-teal-200"
          >
            How We Work
          </motion.h2>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-emerald-900/30 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Fit In", desc: "We act as a flexible specialist, integrating seamlessly into your existing processes." },
                { title: "Collaborate", desc: "Working closely with Gov agencies, PMC firms, and private operators." },
                { title: "Deliver", desc: "Smooth delivery from start to finish, supporting RAMS portals and surveys." }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative p-8 border-l-2 md:border-l-0 md:border-t-2 border-emerald-500/30 bg-emerald-900/5 backdrop-blur-sm pt-8 md:text-center group hover:bg-emerald-900/10 transition-colors rounded-b-xl"
                >
                  {/* Dot on the line */}
                  <div className="absolute md:top-0 md:left-1/2 -left-px top-0 w-4 h-4 bg-emerald-500 rounded-full md:-translate-x-1/2 md:-translate-y-1/2 -translate-x-1/2 shadow-[0_0_20px_rgba(16,185,129,0.5)] z-10" />
                  
                  <h3 className="text-2xl font-bold text-emerald-100 mb-4 mt-4">{step.title}</h3>
                  <p className="text-emerald-200/50 text-base leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}