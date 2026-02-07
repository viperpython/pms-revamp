import ServicePageTemplate, { ServicePageData } from '../../components/ServicePageTemplate';
// You need a hero image for each service page.
// Option A: Put a hero.jpg inside each service folder
// Option B: Reuse existing images from src/app/
// For now, let's reuse your existing images:
import HeroImage from '../../Testing.jpg';

const data: ServicePageData = {
  title: "FWD Testing",
  tagline: "Measure — Analyze — Improve",
  heroImage: HeroImage,
  accentColor: "amber",
  icon: "🔬",
  sections: [
    {
      body: "Conduct network and project-level pavement condition surveys using a Falling Weight Deflectometer to evaluate the structural capacity and remaining life."
    },
    {
      heading: "Data Collection",
      body: "Collect precise data in alignment with RAMS guidelines, location referencing, deflection basins, and modulus back-calculation.",
    },
    {
      heading: "Formatted Deliverables",
      body: "Produce formatted deliverables for upload into RAMS portals including:",
      bullets: [
        { text: "Inventory data and condition indices" },
        { text: "Geo-referenced lane sections" },
        { text: "Sub-surface pavement characteristics" },
      ],
    },
    {
      heading: "Rehabilitation Support",
      body: "Support agencies with rehabilitation prioritisation: using FWD results to design overlays, strengthening strategies and a data-driven maintenance plan aligned with Indian standards.",
    },
    {
      body: "Ensure compatibility with MoRTH/NHAI contracting requirements, including condition assessment before issue of completion certificates and during maintenance periods.",
    },
  ],
  nextService: {
    title: "Overlay & Rehab Design",
    href: "/services/overlay-rehab-design",
  },
};

export default function FWDTestingPage() {
  return <ServicePageTemplate data={data} />;
}