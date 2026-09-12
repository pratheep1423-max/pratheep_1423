import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/services/ServiceCard';
import { PackageCard } from '../components/packages/PackageCard';

export const ServicesPage = () => {
  const { services, packages } = useApp();

  return (
    <div className="pt-28 pb-20 bg-studio-bg min-h-screen space-y-24">
      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
            SERVICES CATALOG
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-obsidian-900 mt-2">
            Fine Art Photography Offerings
          </h2>
          <p className="mt-3 text-sm text-obsidian-800/70 font-light">
            Explore our specialized categories tailored to preserve your milestone moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <ServiceCard key={srv.id} service={srv} idx={idx} />
          ))}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-ivory-300">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
            CURATED PACKAGES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-obsidian-900 mt-2">
            Select Your Package Tier
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, idx) => (
            <PackageCard key={pkg.id} pkg={pkg} idx={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};
