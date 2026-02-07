import ServicePageTemplate, { ServicePageData } from '../../components/ServicePageTemplate';
import HeroImage from '../../city-skyline.jpg';

const data: ServicePageData = {
  title: "Field Investigations",
  tagline: "From Surface to Subgrade",
  heroImage: HeroImage,
  accentColor: "rose",
  icon: "🔍",
  sections: [
    {
      body: "PMS offers a complete range of field investigation services for pavement and subgrade characterization. We specialize in integrating geotechnical field investigations with pavement evaluations to provide holistic understanding of structural behavior.",
    },
    {
      heading: "Our Investigations Include",
      body: "All investigations are executed following MoRTH and IRC protocols to ensure defensible, high-quality data for analysis and design.",
      bullets: [
        { text: "Subgrade strength evaluation (Dynamic Cone Penetrometer, Plate Load Test, CBR sampling)." },
        { text: "Borehole drilling and sampling for laboratory testing (grain size, plasticity, moisture-density relations)." },
        { text: "Non-destructive pavement testing such as Benkelman Beam, GPR (Ground Penetrating Radar), and FWD (through partners if needed)." },
        { text: "Moisture and compaction assessment of layers for rehabilitation design validation." },
      ],
    },
  ],
  prevService: { title: "Axle Load & VDF Surveys", href: "/services/axle-load-vdf-surveys" },
  nextService: { title: "Advisory & Training", href: "/services/advisory-training" },
};

export default function FieldInvestigationsPage() {
  return <ServicePageTemplate data={data} />;
}