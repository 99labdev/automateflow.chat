import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import AgentsShowcase from '@/components/AgentsShowcase';
import InstagramAutomation from '@/components/InstagramAutomation';
import CRMShowcase from '@/components/CRMShowcase';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <AgentsShowcase />
      <InstagramAutomation />
      <CRMShowcase />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
