import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const CustomCursor = () => {
  const { cursorText, cursorVariant } = useApp();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMouse);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, []);

  if (isMobile) return null;

  const isExpanded = cursorVariant !== 'default' || cursorText !== '';

  return (
    <>
      {/* Small Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-champagne-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isExpanded ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Larger Trailing Ring / Action Pill */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-champagne-500/80 bg-obsidian-900/90 text-champagne-300 font-medium tracking-widest uppercase text-[10px] shadow-gold-glow backdrop-blur-sm`}
        animate={{
          x: mousePosition.x - (isExpanded ? 36 : 16),
          y: mousePosition.y - (isExpanded ? 36 : 16),
          width: isExpanded ? 72 : 32,
          height: isExpanded ? 72 : 32,
          scale: isExpanded ? 1.1 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
