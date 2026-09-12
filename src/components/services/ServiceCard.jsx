import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Clock, Tag, ArrowRight, Check } from 'lucide-react';

export const ServiceCard = ({ service, idx }) => {
  const { navigateTo, setCursorText, setCursorVariant } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onMouseEnter={() => { setCursorText('BOOK'); setCursorVariant('hover'); }}
      onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
      className="group bg-studio-card rounded-lg border border-studio-border overflow-hidden shadow-editorial hover:shadow-editorial-hover transition-all duration-500 flex flex-col justify-between"
    >
      <div>
        {/* Service Photography Header */}
        <div className="relative h-64 overflow-hidden bg-obsidian-900">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-ivory-50">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-obsidian-900/80 backdrop-blur-md rounded border border-ivory-100/20 text-champagne-400">
              {service.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono bg-champagne-500 text-obsidian-950 font-bold px-3 py-1 rounded shadow-sm">
              <Tag className="w-3.5 h-3.5" />
              <span>FROM ${service.startingPrice}</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-mono text-obsidian-800/60 mb-2">
            <Clock className="w-3.5 h-3.5 text-champagne-600" />
            <span>Duration: {service.duration}</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-obsidian-900 group-hover:text-champagne-600 transition-colors">
            {service.name}
          </h3>

          <p className="mt-3 text-sm text-obsidian-800/70 font-light leading-relaxed">
            {service.description}
          </p>

          {/* Key Features */}
          {service.features && (
            <div className="mt-6 space-y-2 pt-4 border-t border-ivory-200">
              {service.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs text-obsidian-900/80">
                  <Check className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2">
        <button
          onClick={() => navigateTo('booking', { service })}
          className="w-full py-3 bg-obsidian-900 text-ivory-50 text-xs font-semibold uppercase tracking-[0.2em] rounded group-hover:bg-champagne-500 group-hover:text-obsidian-950 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
        >
          <span>VIEW SERVICE & BOOK</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
