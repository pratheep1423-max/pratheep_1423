import React from 'react';
import { useApp } from '../context/AppContext';
import { Inbox, Mail, CheckCheck, Clock, Trash } from 'lucide-react';

export const EnquiryInbox = () => {
  const { enquiries, updateEnquiryStatus } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-obsidian-900">Enquiry Inbox</h1>
        <p className="text-xs font-mono text-obsidian-800/60 mt-1">Direct inquiries, destination requests & client feedback</p>
      </div>

      <div className="space-y-4">
        {enquiries.map((enq) => (
          <div
            key={enq.id}
            className={`p-6 rounded-xl border transition-all ${
              enq.status === 'New'
                ? 'bg-champagne-50/60 border-champagne-400 shadow-md'
                : 'bg-studio-card border-studio-border'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-ivory-200">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-xl font-bold text-obsidian-900">{enq.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                    enq.status === 'New' ? 'bg-champagne-500 text-obsidian-950' :
                    enq.status === 'Read' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <span className="text-xs font-mono text-obsidian-800/70 block mt-0.5">{enq.email} • {enq.phone || 'No Phone'}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-obsidian-800/50">
                  {new Date(enq.createdAt || enq.date).toLocaleDateString()}
                </span>

                <select
                  value={enq.status}
                  onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                  className="px-2.5 py-1 text-xs font-mono bg-ivory-100 border border-ivory-300 rounded focus:outline-none"
                >
                  <option value="New">Mark New</option>
                  <option value="Read">Mark Read</option>
                  <option value="Replied">Mark Replied</option>
                </select>
              </div>
            </div>

            <p className="mt-4 text-xs font-mono text-obsidian-900 leading-relaxed">
              "{enq.message}"
            </p>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="p-12 text-center text-xs font-mono text-obsidian-800/60 bg-studio-card rounded-xl border border-studio-border">
            No enquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
};
