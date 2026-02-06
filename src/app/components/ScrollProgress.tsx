import { motion, useScroll, useSpring } from "framer-motion";

// Smooth scroll progress indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 origin-left z-1000"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

export default ScrollProgress;