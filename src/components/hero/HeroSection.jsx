import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ArrowDown, Camera, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  const { navigateTo, setCursorText, setCursorVariant } = useApp();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-950 text-ivory-50 pt-20 pb-16">
      {/* Background Hero Photography with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90')`
          }}
          animate={{ scale: [1.02, 1.08] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-obsidian-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-transparent to-obsidian-950/80" />
      </div>

      {/* Subtle Film Grain */}
      <div className="absolute inset-0 film-grain pointer-events-none z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Subheader / Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne-500/30 bg-obsidian-900/60 text-champagne-400 text-xs font-mono uppercase tracking-[0.3em] mb-8 shadow-gold-glow backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>FINE ART PHOTOGRAPHY STUDIO</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-ivory-50 max-w-4xl leading-[1.05]"
        >
          Stories Worth <br />
          <span className="italic font-light text-champagne-300 drop-shadow-sm">Remembering.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-lg sm:text-xl text-ivory-200/80 max-w-2xl font-light leading-relaxed"
        >
          We capture real moments and transform them into timeless visual stories.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md"
        >
          <button
            onClick={() => navigateTo('booking')}
            onMouseEnter={() => { setCursorText('BOOK'); setCursorVariant('hover'); }}
            onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
            className="w-full sm:w-auto px-8 py-4 bg-champagne-500 text-obsidian-950 font-semibold text-xs uppercase tracking-[0.25em] rounded border border-champagne-400 hover:bg-champagne-400 transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group"
          >
            <Camera className="w-4 h-4 text-obsidian-950" />
            <span>BOOK YOUR SESSION</span>
          </button>

          <button
            onClick={() => navigateTo('portfolio')}
            onMouseEnter={() => { setCursorText('VIEW'); setCursorVariant('hover'); }}
            onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-ivory-100 font-medium text-xs uppercase tracking-[0.25em] rounded border border-ivory-100/30 hover:border-champagne-400 hover:text-champagne-300 transition-all duration-300 backdrop-blur-sm"
          >
            EXPLORE OUR WORK
          </button>
        </motion.div>

        {/* Category Pill Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-ivory-200/50 font-mono"
        >
          <span>Weddings</span>
          <span>•</span>
          <span>Pre-Wedding</span>
          <span>•</span>
          <span>Birthdays</span>
          <span>•</span>
          <span>Portraits</span>
          <span>•</span>
          <span>Outdoor</span>
          <span>•</span>
          <span>Fashion</span>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-champagne-400/80 font-mono">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-champagne-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
