import { motion } from "framer-motion";
import PMSLogo from "../Untitled.png";
import Image from "next/image";

// ==================== FOOTER ====================
export default function Footer() {
    return (
      <footer id="contact" className="relative py-16 sm:py-24 overflow-hidden" aria-label="Site footer">
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-linear-to-t from-amber-500/5 to-transparent blur-3xl" />
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center mb-10 sm:mb-16">
            {/* Left - CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready to transform your
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500"> infrastructure?</span>
              </h2>
              <p className="text-base sm:text-xl text-white/60 mb-6 sm:mb-8">
                Let&apos;s discuss how data-driven pavement solutions can benefit your projects.
              </p>
              <a
                href="mailto:contact@pms.com"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-amber-500 to-orange-600 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-shadow text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
              >
                Get in Touch
              </a>
            </motion.div>
  
            {/* Right - Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
              aria-hidden="true"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl scale-150" />
                <Image
                  src={PMSLogo}
                  alt=""
                  width={180}
                  height={180}
                  className="relative w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]"
                  role="presentation"
                />
              </div>
            </motion.div>
          </div>
  
          {/* Bottom bar */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs sm:text-sm">
              © 2026 Pavement Management Solutions. All rights reserved.
            </p>
            <nav aria-label="Social links">
              <ul className="flex gap-4 sm:gap-6">
                {[
                  { name: 'LinkedIn', href: 'https://linkedin.com', label: 'Follow us on LinkedIn' },
                  { name: 'Twitter', href: 'https://twitter.com', label: 'Follow us on Twitter' },
                  { name: 'Email', href: 'mailto:contact@pms.com', label: 'Send us an email' },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
                      aria-label={item.label}
                      {...(item.name !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    );
  }