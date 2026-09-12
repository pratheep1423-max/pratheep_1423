import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { PortfolioGrid } from '../components/portfolio/PortfolioGrid';
import { ServiceCard } from '../components/services/ServiceCard';
import { PackageCard } from '../components/packages/PackageCard';
import { BeforeAfterSlider } from '../components/beforeafter/BeforeAfterSlider';
import { AboutSection } from '../components/about/AboutSection';
import { Testimonials } from '../components/testimonials/Testimonials';
import { ContactForm } from '../components/contact/ContactForm';
import { useApp } from '../context/AppContext';
import { ArrowRight, Camera } from 'lucide-react';

export const Home = () => {
  const { services, packages, navigateTo } = useApp();

  return (
    <main className="space-y-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Editorial Portfolio Showcase (Limit to 6 for homepage) */}
      <PortfolioGrid limit={6} showFilter={true} />

      {/* Services Overview */}
      <section className="py-20 bg-ivory-100/60 border-t border-ivory-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
                OUR SERVICES
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-obsidian-900 mt-2">
                Tailored Photography Services
              </h2>
            </div>
            <button
              onClick={() => navigateTo('services')}
              className="text-xs font-mono uppercase tracking-widest text-champagne-600 hover:text-obsidian-900 flex items-center gap-2"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((srv, idx) => (
              <ServiceCard key={srv.id} service={srv} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Photo Grading Slider */}
      <BeforeAfterSlider />

      {/* Featured Packages Overview */}
      <section className="py-24 bg-studio-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
              TRANSPARENT PRICING
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-obsidian-900 mt-2">
              Bespoke Photography Packages
            </h2>
            <p className="mt-3 text-sm text-obsidian-800/70 font-light">
              Choose from our curated tiers or request a customized destination itinerary.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {packages.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={pkg} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <ContactForm />
    </main>
  );
};
