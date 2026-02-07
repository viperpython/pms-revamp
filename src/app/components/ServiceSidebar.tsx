'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const services = [
    { title: "FWD Testing", href: "/services/fwd-testing" },
    { title: "Overlay & Rehab Design", href: "/services/overlay-rehab-design" },
    { title: "RAMS-Aligned Deliverables", href: "/services/rams-aligned-deliverables" },
    { title: "Axle Load & VDF Surveys", href: "/services/axle-load-vdf-surveys" },
    { title: "Field Investigations", href: "/services/field-investigations" },
    { title: "Advisory & Training", href: "/services/advisory-training" },
];

export default function ServiceSidebar() {
    const pathname = usePathname();

    return (
        <nav className="hidden lg:block sticky top-28 self-start w-64 shrink-0">
            <div className="p-6 bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm">
                <h3 className="text-xs uppercase tracking-widest text-white/30 mb-4 font-medium">
                    Services
                </h3>
                <ul className="space-y-1">
                    {services.map((service) => {
                        const isActive = pathname === service.href;
                        return (
                            <li key={service.href}>
                                <Link
                                    href={service.href}
                                    className={`relative block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'text-amber-300'
                                            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="service-sidebar-active"
                                            className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        >
                                            <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                                        </motion.div>
                                    )}
                                    <span className="relative z-10">{service.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}