import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import SectorsSection from '@/components/home/SectorsSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import ProcessSection from '@/components/home/ProcessSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import ClientsSection from '@/components/home/ClientsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <SectorsSection />
      <FeaturedProjects />
      <AdvantagesSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <CertificationsSection />
      <ClientsSection />
      <CTASection />
    </>
  );
}
