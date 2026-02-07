'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// Types
export interface ServiceBullet {
  text: string;
}

export interface ServiceSection {
  heading?: string;
  body: string;
  bullets?: ServiceBullet[];
}

export interface ServiceImage {
  src: StaticImageData;
  alt: string;
}

export interface ServicePageData {
  title: string;
  tagline: string;
  heroImage: StaticImageData;
  accentColor: 'amber' | 'blue' | 'emerald' | 'rose' | 'teal' | 'indigo';
  icon: string;
  sections: ServiceSection[];
  images?: ServiceImage[];
  nextService?: {
    title: string;
    href: string;
  };
  prevService?: {
    title: string;
    href: string;
  };
}

// Accent color map
const accentMap = {
  amber: {
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    glow: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    bulletBg: 'bg-amber-500/20',
    bulletText: 'text-amber-400',
    line: 'from-amber-500 to-orange-500',
    heroOverlay: 'from-amber-950/40',
  },
  blue: {
    gradient: 'from-blue-400 via-indigo-500 to-blue-600',
    glow: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    bulletBg: 'bg-blue-500/20',
    bulletText: 'text-blue-400',
    line: 'from-blue-500 to-indigo-500',
    heroOverlay: 'from-blue-950/40',
  },
  emerald: {
    gradient: 'from-emerald-400 via-teal-500 to-emerald-600',
    glow: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    bulletBg: 'bg-emerald-500/20',
    bulletText: 'text-emerald-400',
    line: 'from-emerald-500 to-teal-500',
    heroOverlay: 'from-emerald-950/40',
  },
  rose: {
    gradient: 'from-rose-400 via-pink-500 to-rose-600',
    glow: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    bulletBg: 'bg-rose-500/20',
    bulletText: 'text-rose-400',
    line: 'from-rose-500 to-pink-500',
    heroOverlay: 'from-rose-950/40',
  },
  teal: {
    gradient: 'from-teal-400 via-cyan-500 to-teal-600',
    glow: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    bulletBg: 'bg-teal-500/20',
    bulletText: 'text-teal-400',
    line: 'from-teal-500 to-cyan-500',
    heroOverlay: 'from-teal-950/40',
  },
  indigo: {
    gradient: 'from-indigo-400 via-violet-500 to-indigo-600',
    glow: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    bulletBg: 'bg-indigo-500/20',
    bulletText: 'text-indigo-400',
    line: 'from-indigo-500 to-violet-500',
    heroOverlay: 'from-indigo-950/40',
  },
};

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const colors = accentMap[data.accentColor];

  return (
    <article className="flex-1 min-w-0">
      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden rounded-2xl lg:rounded-3xl mb-16">
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.heroOverlay} to-transparent opacity-60`} />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-full text-sm font-medium ${colors.text} mb-6`}>
              <span className="text-lg">{data.icon}</span>
              Service
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient}`}
          >
            {data.tagline}
          </motion.p>
        </motion.div>
      </section>

      {/* ==================== CONTENT SECTIONS ==================== */}
      <div className="space-y-16">
        {data.sections.map((section, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {section.heading && (
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {section.heading}
                </h2>
                <div className={`h-1 w-24 bg-gradient-to-r ${colors.line} rounded-full`} />
              </div>
            )}

            <p className="text-lg text-white/60 leading-relaxed mb-6">
              {section.body}
            </p>

            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-4">
                {section.bullets.map((bullet, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className={`shrink-0 mt-1 w-7 h-7 rounded-lg ${colors.bulletBg} flex items-center justify-center`}>
                      <svg className={`w-4 h-4 ${colors.bulletText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-white/70 leading-relaxed">{bullet.text}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}
      </div>

      {/* ==================== INLINE IMAGES ==================== */}
      {data.images && data.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {data.images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm text-white/70 font-medium">
                {img.alt}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ==================== CTA SECTION ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mt-20 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/10 relative overflow-hidden`}
      >
        <div className={`absolute top-0 right-0 w-72 h-72 ${colors.glow} rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2`} />
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Interested in {data.title}?
          </h3>
          <p className="text-white/50 mb-8 max-w-xl">
            Let&apos;s discuss how PMS can support your project with expert {data.title.toLowerCase()} services.
          </p>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${colors.gradient} rounded-full font-semibold text-white hover:shadow-lg transition-shadow`}
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.div>

      {/* ==================== PREV / NEXT NAVIGATION ==================== */}
      <div className="mt-16 grid grid-cols-2 gap-6">
        {data.prevService ? (
          <Link
            href={data.prevService.href}
            className="group p-6 bg-white/[0.04] border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all"
          >
            <span className="text-xs uppercase tracking-widest text-white/30">Previous</span>
            <p className="text-white font-semibold mt-1 group-hover:-translate-x-1 transition-transform">
              ← {data.prevService.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {data.nextService ? (
          <Link
            href={data.nextService.href}
            className="group p-6 bg-white/[0.04] border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all text-right"
          >
            <span className="text-xs uppercase tracking-widest text-white/30">Next</span>
            <p className="text-white font-semibold mt-1 group-hover:translate-x-1 transition-transform">
              {data.nextService.title} →
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}