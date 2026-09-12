import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BEFORE_AFTER_SAMPLES } from '../../data/mockData';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const [activeSampleIdx, setActiveSampleIdx] = useState(0);

  const containerRef = useRef(null);

  const sample = BEFORE_AFTER_SAMPLES[activeSampleIdx] || BEFORE_AFTER_SAMPLES[0];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="py-20 bg-obsidian-950 text-ivory-50 relative overflow-hidden film-grain">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-400 font-semibold inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FINE ART COLOR GRADING</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2">
            The Magic Behind The Lens
          </h2>
          <p className="mt-3 text-sm text-ivory-200/70 font-light">
            Drag the slider below to compare raw in-camera captures against our signature editorial color grade.
          </p>
        </div>

        {/* Sample Selectors */}
        <div className="flex justify-center gap-4 mb-8">
          {BEFORE_AFTER_SAMPLES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSampleIdx(idx)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded border transition-all ${
                activeSampleIdx === idx
                  ? 'bg-champagne-500 text-obsidian-950 border-champagne-400 font-bold'
                  : 'bg-obsidian-900 border-obsidian-800 text-ivory-200/70 hover:text-white'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Draggable Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            if (e.touches[0]) handleMove(e.touches[0].clientX);
          }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl border border-champagne-500/30 select-none cursor-ew-resize"
        >
          {/* EDITED IMAGE (Background Layer) */}
          <img
            src={sample.edited}
            alt="Edited Photograph"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Label Right: EDITED */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-obsidian-900/80 backdrop-blur-md rounded border border-champagne-500/40 text-[11px] font-mono font-bold tracking-widest text-champagne-300">
            EDITED / FINISHED
          </div>

          {/* ORIGINAL IMAGE (Clipped Foreground Layer) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={sample.original}
              alt="Original RAW Photograph"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
            />
          </div>

          {/* Label Left: ORIGINAL */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-obsidian-950/80 backdrop-blur-md rounded border border-ivory-100/30 text-[11px] font-mono font-bold tracking-widest text-ivory-200">
            ORIGINAL RAW
          </div>

          {/* Divider Line & Circular Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-champagne-400 pointer-events-none shadow-gold-glow"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-obsidian-900 border-2 border-champagne-400 text-champagne-300 flex items-center justify-center shadow-2xl">
              <SlidersHorizontal className="w-5 h-5 rotate-90" />
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-4 text-center text-xs font-mono text-ivory-200/50">
          * Drag left or right to explore detail retouches, dynamic depth & shadow tones.
        </div>
      </div>
    </section>
  );
};
