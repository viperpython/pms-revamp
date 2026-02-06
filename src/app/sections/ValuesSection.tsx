import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

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
  
  export default function ValuesSection() {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);
  
    // Only auto-rotate when section is in view
    useEffect(() => {
      if (!sectionRef.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => setIsInView(entry.isIntersecting),
        { threshold: 0.2 }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, []);
  
    useEffect(() => {
      if (isPaused || !isInView) return;
      const timer = setInterval(() => {
        setActive((prev) => (prev + 1) % values.length);
      }, 4000);
      return () => clearInterval(timer);
    }, [isPaused, isInView]);
  
    const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
      let newIndex = index;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = (index + 1) % values.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = (index - 1 + values.length) % values.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = values.length - 1;
      } else {
        return;
      }
      setActive(newIndex);
      setIsPaused(true);
      // Focus the new tab
      const tabElement = document.getElementById(`value-tab-${newIndex}`);
      tabElement?.focus();
    }, []);
  
    return (
      <section ref={sectionRef} id="values" className="relative min-h-screen py-16 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="values-heading">
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute top-1/3 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-indigo-600/5 rounded-full blur-[100px]" />
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <span aria-hidden="true">◆ </span>What Drives Us
            </span>
            <h2 id="values-heading" className="text-3xl sm:text-5xl md:text-7xl font-bold">
              <span className="text-white">Our Core </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-blue-600">
                Values
              </span>
            </h2>
          </motion.div>
  
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            {/* Values list - tabs */}
            <div className="lg:col-span-5 space-y-1 sm:space-y-2" role="tablist" aria-label="Company values" aria-orientation="vertical">
              {values.map((item, index) => (
                <motion.button
                  key={index}
                  id={`value-tab-${index}`}
                  role="tab"
                  aria-selected={active === index}
                  aria-controls={`value-panel-${index}`}
                  tabIndex={active === index ? 0 : -1}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => {
                    setActive(index);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                  onFocus={() => {
                    setActive(index);
                    setIsPaused(true);
                  }}
                  onBlur={() => setIsPaused(false)}
                  onClick={() => {
                    setActive(index);
                    setIsPaused(true);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`relative w-full px-4 sm:px-6 py-3 sm:py-4 text-left rounded-xl transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] ${active === index ? 'bg-blue-500/10' : 'hover:bg-white/5'
                    }`}
                >
                  {active === index && (
                    <motion.div
                      layoutId="value-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-400 to-indigo-500 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`text-xl sm:text-2xl transition-transform duration-300 ${active === index ? 'scale-125' : 'group-hover:scale-110'}`} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className={`text-sm sm:text-lg font-medium transition-colors ${active === index ? 'text-blue-300' : 'text-white/70 group-hover:text-white/80'
                      }`}>
                      {item.title}
                    </span>
                  </div>
                </motion.button>
              ))}
  
              {/* Pause/Play button for auto-rotation */}
              <div className="pt-2 sm:pt-4 px-4 sm:px-6">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-xs sm:text-sm text-white/40 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm"
                  aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
                >
                  {isPaused ? '▶ Resume' : '⏸ Pause'} auto-rotation
                </button>
              </div>
            </div>
  
            {/* Active value display - tab panel */}
            <div className="lg:col-span-7 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  id={`value-panel-${active}`}
                  role="tabpanel"
                  aria-labelledby={`value-tab-${active}`}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="relative w-full p-6 sm:p-8 lg:p-12 bg-linear-to-br from-blue-950/40 via-indigo-950/30 to-transparent border border-blue-500/20 rounded-2xl sm:rounded-4xl overflow-hidden"
                >
                  {/* Background number */}
                  <span className="absolute -top-4 sm:-top-8 -right-2 sm:-right-4 text-[8rem] sm:text-[14rem] font-bold text-blue-500/5 select-none leading-none" aria-hidden="true">
                    {String(active + 1).padStart(2, '0')}
                  </span>
  
                  <div className="relative z-10">
                    <motion.span
                      key={`icon-${active}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-4xl sm:text-6xl block mb-4 sm:mb-6"
                      aria-hidden="true"
                    >
                      {values[active].icon}
                    </motion.span>
  
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                      {values[active].title}
                    </h3>
  
                    <p className="text-base sm:text-xl text-blue-100/70 leading-relaxed max-w-lg">
                      {values[active].desc}
                    </p>
                  </div>
  
                  {/* Progress bar */}
                  {!isPaused && isInView && (
                    <motion.div
                      key={`progress-${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-indigo-500 origin-left"
                      aria-hidden="true"
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