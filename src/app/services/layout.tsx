'use client';

import { motion } from 'framer-motion';
import ServiceSidebar from '../components/ServiceSidebar';
import Link from 'next/link';
import Image from 'next/image';
import PMSLogo from '../Untitled.png';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#030303] text-white min-h-screen">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src={PMSLogo} alt="PMS" width={36} height={36} />
            <span className="text-sm font-semibold text-white/80 hidden sm:block">
              Pavement Management Solutions
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services/fwd-testing' },
              { label: 'Why PMS', href: '/#advantage' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 flex items-start gap-12">
        {/* Desktop sidebar */}
        <ServiceSidebar />

        {/* Page content with entry animation */}
        <motion.div
          key={typeof window !== 'undefined' ? window.location.pathname : ''}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 min-w-0"
        >
          {children}
        </motion.div>
      </div>

      {/* Mobile bottom nav */}
      <MobileServiceNav />
    </div>
  );
}

function MobileServiceNav() {
  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[998]">
      <div className="px-4 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-3 overflow-x-auto max-w-[90vw]">
        {[
          { label: 'FWD', href: '/services/fwd-testing' },
          { label: 'Design', href: '/services/overlay-rehab-design' },
          { label: 'RAMS', href: '/services/rams-aligned-deliverables' },
          { label: 'Axle', href: '/services/axle-load-vdf-surveys' },
          { label: 'Field', href: '/services/field-investigations' },
          { label: 'Advisory', href: '/services/advisory-training' },
        ].map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="text-xs text-white/50 hover:text-white whitespace-nowrap transition-colors px-2"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}