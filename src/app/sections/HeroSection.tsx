import { useTransform, useReducedMotion, motion, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import SkyLine from "../city-skyline.jpg";
import PMSLogo from "../Untitled.png";
import Image from "next/image";
import FloatingParticles from "../components/FloatingParticles";

// ==================== HERO SECTION ====================
function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const y = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
    const bgY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
    const prefersReducedMotion = useReducedMotion();

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsMounted(true), 0);
        if (prefersReducedMotion) return;

        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
          clearTimeout(timeoutId);
          window.removeEventListener('mousemove', handleMouseMove)
        };
    }, [prefersReducedMotion]);

    return (
        <section className="relative min-h-screen md:h-[150vh] overflow-hidden" aria-label="Hero">
            {/* Animated gradient background */}
            <div className="absolute inset-0" aria-hidden="true">
                <motion.div
                    className="absolute inset-0"
                    animate={prefersReducedMotion ? {} : {
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
                style={{ y: prefersReducedMotion ? 0 : bgY }}
                aria-hidden="true"
            >
                <Image
                    src={SkyLine}
                    alt=""
                    fill
                    sizes="100vw"
                    priority                    // preloads — only use for above-the-fold
                    quality={75}
                    placeholder="blur"          // shows blurred version while loading (static imports support this automatically)
                    className="object-cover opacity-30 scale-110"
                    role="presentation"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-[#030303]/50 to-transparent" />
            </motion.div>

            {/* Floating particles */}
            <FloatingParticles />

            {/* Main content */}
            <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6">
                <motion.div
                    style={prefersReducedMotion ? {} : { y, opacity, scale }}
                    className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                    {/* Left content */}
                    <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.2 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" aria-hidden="true" />
                                Pavement Management Solutions
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.4 }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight"
                        >
                            <span className="block text-white">Expertise in</span>
                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-500 to-rose-500">
                                Pavement
                            </span>
                            <span className="block text-white/90">Engineering</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.6 }}
                            className="text-base sm:text-xl text-white/70 max-w-xl leading-relaxed"
                        >
                            Structural evaluation and turn-key RAMS deliverables.
                            Building India&apos;s road infrastructure with data-driven precision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.8 }}
                            className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4"
                        >
                            <a
                                href="#services"
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-amber-500 to-orange-600 rounded-full font-semibold overflow-hidden text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                                <span className="relative z-10">Explore Services</span>
                                <motion.div
                                    className="absolute inset-0 bg-linear-to-r from-orange-600 to-rose-600"
                                    initial={{ x: '100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    aria-hidden="true"
                                />
                            </a>
                            <a
                                href="#contact"
                                className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-colors text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                                Contact Us
                            </a>
                        </motion.div>
                    </div>

                    {/* Right content - Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.6 }}
                        className="lg:col-span-4 flex justify-center mt-8 lg:mt-0"
                        style={isMounted && !prefersReducedMotion ? {
                            x: mousePosition.x * -0.5,
                            y: mousePosition.y * -0.5,
                        } : {}}
                        aria-hidden="true"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl scale-150" />
                            <Image
                                src={PMSLogo}
                                alt=""
                                width={250}
                                height={250}
                                className="relative z-10 drop-shadow-2xl w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px]"
                                role="presentation"
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
                className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
                aria-hidden="true"
            >
                <motion.div
                    animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={prefersReducedMotion ? {} : { y: [0, 12, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-amber-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
export default HeroSection;