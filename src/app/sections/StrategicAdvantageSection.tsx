import { motion } from "framer-motion";

// ==================== STRATEGIC ADVANTAGE SECTION ====================
export default function StrategicAdvantageSection() {
    return (
      <section id="advantage" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="advantage-heading">
        {/* Background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
          <div className="absolute top-1/2 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-600/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-teal-600/5 rounded-full blur-[100px]" />
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* WHY PMS */}
          <div className="mb-16 sm:mb-24 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 sm:mb-16"
            >
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                <span aria-hidden="true">◈ </span>Our Advantage
              </span>
              <h2 id="advantage-heading" className="text-3xl sm:text-5xl md:text-7xl font-bold">
                <span className="text-white">Why </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
                  PMS?
                </span>
              </h2>
            </motion.div>
  
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Evidence First",
                  desc: "Decisions driven by data, not opinions. We measure accurately and build every recommendation on hard evidence.",
                  icon: (
                    <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  gradient: "from-emerald-500 to-teal-500"
                },
                {
                  title: "Cost Effective",
                  desc: "Targeted interventions reduce lifecycle costs while meeting performance and safety goals.",
                  icon: (
                    <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: "from-teal-500 to-cyan-500"
                },
                {
                  title: "Built to Scale",
                  desc: "Start with a pilot corridor, then roll out to the whole network using the same process. No rework.",
                  icon: (
                    <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  gradient: "from-cyan-500 to-blue-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-6 sm:p-8 bg-linear-to-b from-white/6 to-transparent border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-colors sm:col-span-1 last:sm:col-span-2 last:lg:col-span-1"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-linear-to-br ${item.gradient} p-px`}>
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#030303] flex items-center justify-center text-emerald-400">
                      {item.icon}
                    </div>
                  </div>
  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
  
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
  
          {/* HOW WE WORK */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold">
                <span className="text-white">How We </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
                  Work
                </span>
              </h2>
            </motion.div>
  
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-10 left-1/2 bottom-10 w-px bg-linear-to-b from-transparent via-emerald-500/30 to-transparent lg:hidden" aria-hidden="true" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent -translate-y-1/2 hidden lg:block" aria-hidden="true" />
  
              <ol className="grid lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">
                {[
                  { title: "Fit In", desc: "We act as a flexible specialist, integrating seamlessly into your existing processes.", number: "01" },
                  { title: "Collaborate", desc: "Working closely with Gov agencies, PMC firms, and private operators.", number: "02" },
                  { title: "Deliver", desc: "Smooth delivery from start to finish, supporting RAMS portals and surveys.", number: "03" }
                ].map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative"
                  >
                    {/* Step indicator */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 p-0.5"
                      >
                        <div className="w-full h-full rounded-full bg-[#030303] flex items-center justify-center">
                          <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-br from-emerald-400 to-teal-400" aria-hidden="true">
                            {step.number}
                          </span>
                        </div>
                      </motion.div>
                    </div>
  
                    <div className="text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                        <span className="sr-only">Step {step.number}: </span>
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }