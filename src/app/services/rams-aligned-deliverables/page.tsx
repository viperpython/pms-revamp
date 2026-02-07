import ServicePageTemplate, { ServicePageData } from '../../components/ServicePageTemplate';
import HeroImage from '../../R-and-D.jpg';

const data: ServicePageData = {
  title: "RAMS-Aligned Deliverables",
  tagline: "Data That Fits the System",
  heroImage: HeroImage,
  accentColor: "emerald",
  icon: "📊",
  sections: [
    {
      body: "Our deliverables are fully compliant with MoRTH/NHAI's Road Asset Management System (RAMS) framework. We prepare outputs compatible with RAMS data upload formats, ensuring smooth integration into national and state highway management databases.",
    },
    {
      heading: "Our RAMS-Aligned Services Include",
      body: "Through structured, standardized, and validated reporting, PMS ensures that our clients' pavement data directly supports performance-based maintenance planning and fund allocation.",
      bullets: [
        { text: "Geo-referenced datasets (location-tagged with chainage referencing)." },
        { text: "QA-checked deflection and condition data from FWD and NSV surveys." },
        { text: "Inventory and asset baselining, including pavement composition and layer thickness." },
        { text: "Condition indices such as Structural Condition Index (SCI), Surface Distress Index (SDI), and Pavement Condition Index (PCI)." },
        { text: "Rehabilitation prioritization plans aligned with RAMS-based decision rules." },
      ],
    },
  ],
  prevService: { title: "Overlay & Rehab Design", href: "/services/overlay-rehab-design" },
  nextService: { title: "Axle Load & VDF Surveys", href: "/services/axle-load-vdf-surveys" },
};

export default function RAMSDeliveralesPage() {
  return <ServicePageTemplate data={data} />;
}