import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Award, Sparkles, Heart, Compass } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="py-24 bg-studio-bg text-obsidian-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
              02 / ABOUT THE STUDIO
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-obsidian-900 mt-2 leading-[1.1]">
              We don't take pictures. <br />
              <span className="italic font-light text-obsidian-800">We craft heirlooms.</span>
            </h2>
            <p className="mt-6 text-base text-obsidian-800/80 font-light leading-relaxed">
              Founded in 2020, 2M PICTURES was built on a simple promise: to capture life’s most profound transitions—weddings, milestones, high-fashion editorials, and quiet intimate gazes—with elevated artistic rigor.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-obsidian-900 border border-ivory-300">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                alt="Lead Photographer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-obsidian-900 text-ivory-50 p-6 rounded-lg border border-champagne-500/40 shadow-xl hidden sm:block">
              <span className="font-serif text-2xl font-bold text-champagne-400">Marcus Vance</span>
              <span className="block text-xs font-mono uppercase tracking-widest text-ivory-200/60">Creative Director & Founder</span>
            </div>
          </div>
        </div>

        {/* Pillars / Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-ivory-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-champagne-500/20 text-champagne-600 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Unscripted Authenticity</h3>
            <p className="text-sm text-obsidian-800/70 font-light leading-relaxed">
              We avoid stiff artificial poses. Our documentary approach allows spontaneous laughter and quiet emotional glances to unfold organically.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-champagne-500/20 text-champagne-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Editorial Aesthetics</h3>
            <p className="text-sm text-obsidian-800/70 font-light leading-relaxed">
              Every image undergoes meticulous color harmonization and dynamic range tuning inspired by European fashion publications.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-champagne-500/20 text-champagne-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Heirloom Printing</h3>
            <p className="text-sm text-obsidian-800/70 font-light leading-relaxed">
              We design museum-quality archival albums and physical prints engineered to retain vivid fidelity across generations.
            </p>
          </div>
        </div>

        {/* Behind The Scenes Gallery */}
        <div className="space-y-6 pt-12 border-t border-ivory-300">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-3xl font-bold">Behind The Scenes</h3>
            <span className="text-xs font-mono uppercase tracking-widest text-champagne-600">IN THE STUDIO</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-obsidian-900">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" alt="BTS 1" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-obsidian-900">
              <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80" alt="BTS 2" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-obsidian-900">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" alt="BTS 3" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-obsidian-900">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80" alt="BTS 4" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
