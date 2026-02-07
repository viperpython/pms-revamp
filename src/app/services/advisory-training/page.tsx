import ServicePageTemplate, { ServicePageData } from '../../components/ServicePageTemplate';
import HeroImage from '../../R-and-D.jpg';

const data: ServicePageData = {
  title: "Advisory & Training",
  tagline: "Building Knowledge That Delivers",
  heroImage: HeroImage,
  accentColor: "indigo",
  icon: "🎓",
  sections: [
    {
      body: "PMS is founded by researchers, academicians, and pavement engineering professionals committed to bridging the gap between theory and field practice. Our Advisory and Training division focuses on building technical capacity across government, consulting, and academic sectors.",
    },
    {
      heading: "We Offer",
      body: "At PMS, we believe in empowering professionals to make data-informed, performance-oriented pavement management decisions.",
      bullets: [
        { text: "Workshops and training programs on pavement materials, design, data analytics, rehabilitation, and performance evaluation." },
        { text: "Hands-on sessions on FWD data interpretation, RAMS integration, and AI-ML applications in pavement management." },
        { text: "Consulting and technical advisory on setting up pavement laboratories, data management systems, and digital twins for road assets." },
        { text: "Research collaborations with universities and industry to promote innovation in sustainable pavement materials, smart sensing, and data-driven decision-making." },
      ],
    },
  ],
  prevService: { title: "Field Investigations", href: "/services/field-investigations" },
};

export default function AdvisoryTrainingPage() {
  return <ServicePageTemplate data={data} />;
}