import React from 'react';
import { motion } from 'framer-motion';

export const CATEGORIES = [
  'ALL',
  'WEDDINGS',
  'PRE-WEDDING',
  'BIRTHDAYS',
  'PORTRAITS',
  'OUTDOOR',
  'EVENTS',
  'FASHION'
];

export const PortfolioFilter = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-4">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all duration-300 ${
              isActive
                ? 'text-obsidian-950 font-semibold'
                : 'text-obsidian-800/70 hover:text-obsidian-950 border border-transparent hover:border-ivory-300'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-champagne-400 rounded-full shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
};
