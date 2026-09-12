import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Check, Star, Sparkles, ArrowRight } from 'lucide-react';

export const PackageCard = ({ pkg, idx }) => {
  const { navigateTo, setCursorText, setCursorVariant } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      onMouseEnter={() => { setCursorText('BOOK'); setCursorVariant('hover'); }}
      onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
      className={`relative rounded-xl p-8 md:p-10 flex flex-col justify-between transition-all duration-500 ${
        pkg.featured
          ? 'bg-obsidian-900 text-ivory-50 border-2 border-champagne-500 shadow-gold-glow scale-105 z-10'
          : 'bg-studio-card text-obsidian-900 border border-studio-border shadow-editorial hover:shadow-editorial-hover'
      }`}
    >
      {/* Featured Ribbon */}
      {pkg.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-champagne-500 text-obsidian-950 text-[10px] uppercase font-mono tracking-[0.25em] font-bold rounded-full flex items-center gap-1.5 shadow-md">
          <Star className="w-3 h-3 fill-obsidian-950" />
          <span>MOST POPULAR CHOICE</span>
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="border-b pb-6 border-current/10">
          <span className={`text-xs uppercase font-mono tracking-[0.3em] font-semibold ${
            pkg.featured ? 'text-champagne-400' : 'text-champagne-600'
          }`}>
            {pkg.duration}
          </span>
          <h3 className="font-serif text-3xl font-bold tracking-wide mt-1">
            {pkg.name}
          </h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-serif text-5xl font-bold tracking-tight">
              ${pkg.price.toLocaleString()}
            </span>
            <span className={`text-xs font-mono uppercase tracking-widest ${
              pkg.featured ? 'text-ivory-200/60' : 'text-obsidian-800/60'
            }`}>
              / session
            </span>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="py-6 space-y-3 font-mono text-xs border-b border-current/10">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${pkg.featured ? 'text-champagne-400' : 'text-champagne-600'}`} />
            <span className="font-semibold">{pkg.photographers}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${pkg.featured ? 'text-champagne-400' : 'text-champagne-600'}`} />
            <span className="font-semibold">{pkg.photosCount}</span>
          </div>
        </div>

        {/* Features list */}
        <ul className="py-6 space-y-3">
          {pkg.features.map((feat, fIdx) => (
            <li key={fIdx} className="flex items-start gap-3 text-xs leading-relaxed font-light">
              <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                pkg.featured ? 'text-champagne-400' : 'text-champagne-600'
              }`} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      <div className="pt-6 border-t border-current/10">
        <button
          onClick={() => navigateTo('booking', { package: pkg })}
          className={`w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2 transition-all duration-300 ${
            pkg.featured
              ? 'bg-champagne-500 text-obsidian-950 hover:bg-champagne-400 shadow-gold-glow'
              : 'bg-obsidian-900 text-ivory-50 hover:bg-champagne-500 hover:text-obsidian-950'
          }`}
        >
          <span>BOOK THIS PACKAGE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
