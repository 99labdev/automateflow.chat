import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import AgentsShowcase from '@/components/AgentsShowcase';
import AutomationShowcase from '@/components/AutomationShowcase';
import CRMShowcase from '@/components/CRMShowcase';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhyChoose />
      <AgentsShowcase />
      <AutomationShowcase />
      <CRMShowcase />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
