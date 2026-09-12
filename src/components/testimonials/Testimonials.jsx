import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../data/mockData';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const t = TESTIMONIALS[activeIdx] || TESTIMONIALS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-obsidian-900 text-ivory-50 relative overflow-hidden film-grain">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-400 font-semibold mb-4 block">
          03 / CLIENT PRAISE
        </span>

        {/* Quote Container */}
        <div className="relative min-h-[280px] flex flex-col items-center justify-center">
          <Quote className="w-12 h-12 text-champagne-500/20 mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 max-w-3xl"
            >
              <h3 className="font-serif text-2xl sm:text-4xl font-light italic text-ivory-50 leading-relaxed">
                "{t.quote}"
              </h3>

              <div className="pt-4 border-t border-obsidian-800 flex flex-col items-center gap-1">
                <span className="font-serif text-xl font-bold text-champagne-300">
                  {t.name}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-ivory-200/60">
                  {t.event}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls & Progress Indicator */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="p-2 border border-obsidian-800 rounded-full hover:border-champagne-400 text-ivory-200 hover:text-white transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIdx === idx ? 'w-8 bg-champagne-400' : 'w-2 bg-obsidian-800 hover:bg-ivory-200/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
            className="p-2 border border-obsidian-800 rounded-full hover:border-champagne-400 text-ivory-200 hover:text-white transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
