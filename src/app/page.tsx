'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';

// Hero loads immediately (above the fold — critical)
import HeroSection from './sections/HeroSection';
import ScrollProgress from './components/ScrollProgress';
import FloatingNav from './components/FloatingNav';
import CustomCursor from './components/CustomCursor';

// Minimal skeleton to prevent layout shift
function SectionSkeleton({ height }: { height: string }) {
  return (
    <div
      className="w-full bg-[#030303] animate-pulse"
      style={{ minHeight: height }}
      aria-hidden="true"
    />
  );
}

// Below-the-fold sections — lazy loaded with code splitting
const ServicesSection = dynamic(() => import('./sections/ServicesSection'), {
  loading: () => <SectionSkeleton height="100vh" />,
  ssr: false,
});
const VisionMissionSection = dynamic(() => import('./sections/VisionMissionSection'), {
  loading: () => <SectionSkeleton height="80vh" />,
  ssr: false,
});
const ValuesSection = dynamic(() => import('./sections/ValuesSection'), {
  loading: () => <SectionSkeleton height="100vh" />,
  ssr: false,
});
const StrategicAdvantageSection = dynamic(() => import('./sections/StrategicAdvantageSection'), {
  loading: () => <SectionSkeleton height="100vh" />,
  ssr: false,
});
const Footer = dynamic(() => import('./sections/Footer'), {
  ssr: false,
});

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <FloatingNav />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10000 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-black focus:rounded-md focus:font-semibold"
      >
        Skip to main content
      </a>

      <main ref={container} id="main-content" className="bg-[#030303] text-white overflow-x-hidden">
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