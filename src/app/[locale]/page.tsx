import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import Agents from '@/components/Agents';
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
      <WhyChoose />
      <Agents />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
