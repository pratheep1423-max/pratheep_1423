import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { PortfolioFilter } from './PortfolioFilter';
import { LightboxModal } from './LightboxModal';
import { Eye, ArrowUpRight } from 'lucide-react';

export const PortfolioGrid = ({ limit = null, showFilter = true }) => {
  const { portfolio, setCursorText, setCursorVariant, navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  // Filter items based on selected category
  const filteredItems = portfolio.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category.toUpperCase() === activeCategory.toUpperCase();
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleBookCategory = (categoryName) => {
    navigateTo('booking');
  };

  return (
    <section className="py-20 bg-studio-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
              01 / EDITORIAL GALLERY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-obsidian-900 mt-2">
              Captured Moments, <br />
              <span className="italic font-light text-obsidian-800">Timeless Stories.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-obsidian-800/70 leading-relaxed font-light">
            Each frame is meticulously composed to honor emotion, light, and modern aesthetic elegance.
          </p>
        </div>

        {/* Filter Controls */}
        {showFilter && (
          <div className="mb-12 border-b border-ivory-300 pb-4">
            <PortfolioFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
        )}

        {/* Asymmetric Editorial Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {displayItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                onClick={() => setActiveLightboxItem(item)}
                onMouseEnter={() => {
                  setCursorText('VIEW');
                  setCursorVariant('hover');
                }}
                onMouseLeave={() => {
                  setCursorText('');
                  setCursorVariant('default');
                }}
                className={`group relative overflow-hidden rounded-lg cursor-pointer bg-obsidian-900 shadow-editorial hover:shadow-editorial-hover transition-all duration-500 ${
                  item.aspect === 'wide' ? 'lg:col-span-2 aspect-[16/10]' : 'aspect-[3/4]'
                }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category Badge Top Right */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-obsidian-950/80 backdrop-blur-md border border-ivory-100/20 text-[10px] uppercase font-mono tracking-widest text-champagne-400 rounded">
                  {item.category}
                </div>

                {/* Bottom Caption & View Trigger */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-champagne-400 block mb-1">
                    {item.location || 'Fine Art Edition'}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-ivory-50 group-hover:text-champagne-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-3 border-t border-ivory-100/20 text-xs font-mono tracking-widest text-ivory-200">
                    <span className="flex items-center gap-1.5 text-champagne-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW STORY</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-champagne-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Gallery Button if limited */}
        {limit && limit < portfolio.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => navigateTo('portfolio')}
              className="px-8 py-4 bg-obsidian-900 text-ivory-50 text-xs font-semibold uppercase tracking-[0.25em] rounded border border-obsidian-800 hover:border-champagne-500 hover:text-champagne-300 transition-all shadow-editorial"
            >
              EXPLORE FULL PORTFOLIO ({portfolio.length} STORIES)
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <LightboxModal
          item={activeLightboxItem}
          onClose={() => setActiveLightboxItem(null)}
          onBookCategory={handleBookCategory}
        />
      )}
    </section>
  );
};
