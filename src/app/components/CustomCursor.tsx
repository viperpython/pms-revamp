import { useMotionValue, useSpring, useReducedMotion, motion } from "framer-motion";
import { useState, useEffect } from "react";

// Custom cursor component for extra polish
function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 33, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();
  
    useEffect(() => {
      // Don't run on touch devices or when reduced motion is preferred
      if (prefersReducedMotion) return;
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      if (isTouchDevice) return;
  
      const timeoutId = setTimeout(() => setIsVisible(true), 0);
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      };
      window.addEventListener('mousemove', moveCursor, { passive: true });
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('mousemove', moveCursor);
      }
    }, [cursorX, cursorY, prefersReducedMotion]);
  
    if (!isVisible) return null;
  
    return (
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-9999 mix-blend-luminosity hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full bg-white opacity-80" />
      </motion.div>
    );
  }

export default CustomCursor;