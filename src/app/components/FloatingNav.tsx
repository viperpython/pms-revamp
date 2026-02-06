import { useScroll, AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import PMSLogo from "../Untitled.png";

// Define Lenis types for better type safety
interface LenisScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
}

interface Lenis {
  scrollTo: (target: HTMLElement, options?: LenisScrollToOptions) => void;
}

// Floating navigation with Lenis smooth scroll
function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setVisible(latest > 100);
    });
    return unsubscribe;
  }, [scrollY]);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = ['services', 'vision', 'values', 'advantage'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    // Access the global Lenis instance with type safety
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -80,       // offset so the section isn't hidden behind the nav
        duration: 1.2,     // smooth duration in seconds
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo
      });
    } else {
      // Fallback: native smooth scroll
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = ['Services', 'Vision', 'Values', 'Advantage'];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-999 px-4 sm:px-8 py-3 sm:py-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 max-w-[95vw]"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-4 sm:gap-8">
            <Image src={PMSLogo} alt="" width={28} height={28} className="opacity-80 shrink-0" role="presentation" />
            {navItems.map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={(e) => handleClick(e, sectionId)}
                  className={`relative text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm whitespace-nowrap ${isActive
                      ? 'text-amber-400'
                      : 'text-white/70 hover:text-white focus-visible:text-white'
                    }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default FloatingNav;