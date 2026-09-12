import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-lg shadow-editorial-hover"
      >
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-champagne-500 shrink-0" />}
        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
        
        <div className="text-sm font-medium tracking-wide">
          {toast.message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
