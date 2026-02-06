import { useReducedMotion, motion } from "framer-motion";
import { useState, useEffect } from "react";

// Floating particles component - client-side only
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const count = window.innerWidth < 768 ? 8 : 20;
    const newParticles = [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    const timeoutId = setTimeout(() => setParticles(newParticles), 0);

    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
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

export default FloatingParticles;