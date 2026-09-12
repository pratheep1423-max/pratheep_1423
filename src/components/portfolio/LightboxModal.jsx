import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Camera, Share2, Sparkles } from 'lucide-react';

export const LightboxModal = ({ item, onClose, onBookCategory }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/95 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl bg-obsidian-900 border border-champagne-500/30 rounded-lg overflow-hidden shadow-2xl text-ivory-50 grid grid-cols-1 lg:grid-cols-3 max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-obsidian-950/80 border border-champagne-500/40 text-ivory-200 hover:text-white hover:border-champagne-400 transition-all"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Image Canvas */}
          <div className="lg:col-span-2 relative bg-obsidian-950 flex items-center justify-center p-4 sm:p-8 min-h-[350px] lg:min-h-[550px]">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[75vh] w-auto object-contain rounded shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1 bg-obsidian-900/80 backdrop-blur-md rounded border border-champagne-500/30 text-[10px] uppercase font-mono tracking-widest text-champagne-400">
              <Sparkles className="w-3 h-3" />
              <span>{item.category}</span>
            </div>
          </div>

          {/* Editorial Story & Meta Sidebar */}
          <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-obsidian-900 border-t lg:border-t-0 lg:border-l border-obsidian-800">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-champagne-400">
                  FEATURED STORY
                </span>
                <h3 className="font-serif text-3xl font-bold tracking-wide text-ivory-50 mt-1">
                  {item.title}
                </h3>
              </div>

              <p className="text-sm text-ivory-200/80 leading-relaxed font-light">
                {item.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-obsidian-800 text-xs font-mono text-ivory-200/70">
                {item.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-champagne-500" />
                    <span>{item.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-champagne-500" />
                  <span>Shot with Medium Format 50mm f/1.2</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-champagne-500" />
                  <span>Published in Fine Art Edition 2026</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-8 border-t border-obsidian-800 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onBookCategory(item.category);
                }}
                className="w-full py-3 bg-champagne-500 text-obsidian-950 text-xs font-semibold uppercase tracking-[0.2em] rounded hover:bg-champagne-400 transition-colors shadow-gold-glow"
              >
                BOOK A SIMILAR SESSION
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-mono uppercase tracking-widest text-ivory-200/60 hover:text-ivory-100 transition-colors"
              >
                CLOSE GALLERY
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
