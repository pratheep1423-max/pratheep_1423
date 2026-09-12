import React from 'react';
import { Database, Shield, Server, CheckCircle2, RefreshCw } from 'lucide-react';

export const SettingsManager = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-obsidian-900">Studio & System Settings</h1>
        <p className="text-xs font-mono text-obsidian-800/60 mt-1">Backend configuration, Supabase connection status & studio branding</p>
      </div>

      {/* Supabase Integration Card */}
      <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-champagne-400" />
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">Supabase Connection Readiness</h3>
              <span className="text-xs font-mono text-ivory-200/60 block">Architecture is pre-wired to drop in `@supabase/supabase-js`</span>
            </div>
          </div>

          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold rounded flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            MOCK / READY
          </span>
        </div>

        <div className="space-y-3 text-xs font-mono text-ivory-200/80 bg-obsidian-950 p-4 rounded border border-obsidian-800">
          <p><strong className="text-champagne-400">Current Adapter:</strong> LocalStorage + In-Memory State (`src/services/dataService.js`)</p>
          <p><strong className="text-champagne-400">Required Env Variables (when connecting Supabase):</strong></p>
          <pre className="p-3 bg-obsidian-900 rounded text-champagne-300 overflow-x-auto text-[11px]">
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
          </pre>
          <p className="text-[11px] text-ivory-200/50 pt-2">
            * All data mutations in `src/services/dataService.js` are formatted as `async` promises matching Supabase table structures (`bookings`, `customers`, `portfolio`, `enquiries`).
          </p>
        </div>
      </div>

      {/* Studio Info Form */}
      <div className="bg-studio-card border border-studio-border rounded-xl p-6 md:p-8 shadow-editorial space-y-6">
        <h3 className="font-serif text-2xl font-bold text-obsidian-900">Studio Profile Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="block uppercase mb-1">Brand Name</label>
            <input type="text" defaultValue="2M PICTURES" className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded" />
          </div>

          <div>
            <label className="block uppercase mb-1">Tagline</label>
            <input type="text" defaultValue="Stories Worth Remembering." className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded" />
          </div>

          <div>
            <label className="block uppercase mb-1">Studio Email</label>
            <input type="email" defaultValue="hello@2mpictures.com" className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded" />
          </div>

          <div>
            <label className="block uppercase mb-1">Direct Phone</label>
            <input type="text" defaultValue="+1 (800) 2M-STUDIO" className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
