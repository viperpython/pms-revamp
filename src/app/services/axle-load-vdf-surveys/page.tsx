import ServicePageTemplate, { ServicePageData } from '../../components/ServicePageTemplate';
import HeroImage from '../../city-skyline.jpg';

const data: ServicePageData = {
  title: "Axle Load & VDF Surveys",
  tagline: "Know the Load — Plan Smarter",
  heroImage: HeroImage,
  accentColor: "teal",
  icon: "⚖️",
  sections: [
    {
      body: "Understanding traffic loading is fundamental to designing and maintaining durable pavements. PMS conducts Axle Load Surveys to determine the Vehicle Damage Factor (VDF) — a key parameter influencing pavement design life.",
    },
    {
      body: "Using portable Weigh-in-Motion (WIM) or static weighbridge setups (through partners), we measure axle loads across vehicle classes, establish cumulative Equivalent Standard Axle Loads (ESALs), and assess overloading trends.",
    },
    {
      heading: "Our Analysis Supports",
      body: "We also assist in developing state-level VDF databases that improve the reliability of design inputs for future projects.",
      bullets: [
        { text: "Design of overlays and new pavements using accurate VDF values." },
        { text: "Policy formulation on vehicle weight enforcement." },
        { text: "Periodic updating of RAMS traffic modules." },
      ],
    },
  ],
  prevService: { title: "RAMS-Aligned Deliverables", href: "/services/rams-aligned-deliverables" },
  nextService: { title: "Field Investigations", href: "/services/field-investigations" },
};

export default function AxleLoadPage() {
  return <ServicePageTemplate data={data} />;
}