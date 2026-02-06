import { motion } from "framer-motion";
import Image from "next/image";

// Define the service prop type for type safety
interface Service {
  title: string;
  desc: string;
  icon: string;
  stats: string;
  label: string;
  image: string; // Assuming image is a URL, adjust if it's a StaticImageData object
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -10 }}
        className="group relative"
        role="listitem"
      >
        <div className="relative h-[400px] sm:h-[480px] lg:h-[550px] rounded-3xl overflow-hidden">
          {/* Card background */}
          <div className="absolute inset-0 bg-linear-to-b from-white/8 to-white/2 backdrop-blur-sm border border-white/10 rounded-3xl group-hover:border-amber-500/30 transition-colors duration-300" />
  
          {/* Image */}
          <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-600">
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover opacity-40"
              loading="lazy"
              role="presentation"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-[#030303]/80 to-transparent" />
          </div>
  
          {/* Content */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
            {/* Top section */}
            <div className="flex justify-between items-start">
              <span className="text-3xl sm:text-5xl group-hover:scale-125 transition-transform duration-300" aria-hidden="true">
                {service.icon}
              </span>
              <div className="text-right">
                <div className="text-2xl sm:text-4xl font-bold text-white">{service.stats}</div>
                <div className="text-xs sm:text-sm text-white/50">{service.label}</div>
              </div>
            </div>
  
            {/* Bottom section */}
            <div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {service.title}
              </h3>
  
              <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 leading-relaxed">
                {service.desc}
              </p>
  
              <div className="h-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mb-4 sm:mb-6 w-[40%] group-hover:w-full transition-all duration-500" aria-hidden="true" />
  
              <a
                href={`#${service.title.toLowerCase()}`}
                className="inline-flex items-center gap-2 text-amber-400 font-medium opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm text-sm sm:text-base"
              >
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="sr-only">about {service.title}</span>
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }
export default ServiceCard;