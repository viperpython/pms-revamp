import RD from "../R-and-D.jpg"
import Design from "../design.jpg"
import Testing from "../Testing.jpg"
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard"

// ==================== SERVICES SECTION ====================
export default function ServicesSection() {
    const services = [
      {
        title: "Testing",
        desc: "Structural capacity appraisal & FWD analysis with cutting-edge technology",
        image: Testing.src,
        icon: "🔬",
        stats: "500+",
        label: "Projects Completed",
      },
      {
        title: "Design",
        desc: "Asset management baselining & strategic planning for optimal performance",
        image: Design.src,
        icon: "📐",
        stats: "200+",
        label: "Designs Delivered",
      },
      {
        title: "Research",
        desc: "Lifecycle cost optimization & innovative solutions for modern infrastructure",
        image: RD.src,
        icon: "💡",
        stats: "50+",
        label: "Patents Filed",
      }
    ];
  
    return (
      <section id="services" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="services-heading">
        {/* Background elements */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
          <div className="absolute top-1/4 -right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-24"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
            >
              <span aria-hidden="true">✦ </span>What We Do Best
            </motion.span>
  
            <h2 id="services-heading" className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
              <span className="text-white">Core </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-500 to-rose-500">
                Expertise
              </span>
            </h2>
  
            <p className="text-base sm:text-xl text-white/50 max-w-2xl mx-auto">
              Precision engineering meets data science. End-to-end pavement solutions
              that transform infrastructure management.
            </p>
          </motion.div>
  
          {/* Services cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8" role="list">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }