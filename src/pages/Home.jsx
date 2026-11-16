import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseSection from '../components/WhyChooseSection';
import GetInTouchSection from '../components/GetInTouchSection';
import SectorsSection from '../components/SectorsSection';
import ClientsSection from '../components/ClientsSection';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home({ onOpenQuote }) {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Dubai Diesel Trading LLC | Reliable Fuel Supply Partner in the UAE';
  }, []);

  return (
    <main>
      <Hero onOpenQuote={onOpenQuote} />
      <AboutSection />
      <ServicesSection onOpenQuote={onOpenQuote} />
      <WhyChooseSection />
      <GetInTouchSection onOpenQuote={onOpenQuote} />
      <SectorsSection onOpenQuote={onOpenQuote} />
      <ClientsSection />
    </main>
  );
}
