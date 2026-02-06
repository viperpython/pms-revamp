import { motion } from "framer-motion";

// ==================== VISION & MISSION SECTION ====================
export default function VisionMissionSection() {
  return (
    <section id="vision" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="purpose-heading">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[1000px] h-[500px] sm:h-[1000px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 id="purpose-heading" className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
              Purpose
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative"
          >
            <div className="relative p-6 sm:p-10 lg:p-12 bg-linear-to-br from-white/8 to-transparent border border-white/10 rounded-2xl sm:rounded-4xl overflow-hidden h-full">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-amber-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-white">Vision</h3>
                </div>

                <p className="text-base sm:text-xl text-white/70 leading-relaxed">
                  To help India build and maintain strong and durable pavements by using
                  pavement condition data and lifecycle planning.
                </p>

                <motion.div
                  className="mt-6 sm:mt-8 h-1 bg-linear-to-r from-amber-500 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative"
          >
            <div className="relative p-6 sm:p-10 lg:p-12 bg-linear-to-br from-white/8 to-transparent border border-white/10 rounded-2xl sm:rounded-4xl overflow-hidden h-full">
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-white">Mission</h3>
                </div>

                <ul className="space-y-4 sm:space-y-6">
                  {[
                    "To deliver data-driven solutions that empower road agencies to make informed decisions, extend pavement life, and ensure cost-effective and sustainable road networks.",
                    "To keep improving through continuous learning and sharing of best practices from projects and research."
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.2 }}
                      className="flex gap-3 sm:gap-4"
                    >
                      <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm sm:text-base" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="text-base sm:text-lg text-white/70 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}