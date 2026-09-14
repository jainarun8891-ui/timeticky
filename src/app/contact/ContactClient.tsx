"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle, Send, Globe, Clock, ShieldCheck } from 'lucide-react';

export function ContactClient() {
  const [topic, setTopic] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Editorial & Technical Inquiries
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            GlobalTime is maintained by a specialized team of systems engineers and chronometry enthusiasts. We welcome community corrections, API integration partnerships, and feature suggestions.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Time Zone & DST Corrections</span>
                <span className="text-slate-500">Notice a parliamentary time change or regional transition decree? Submit with official gazette citations.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">API Infrastructure Support</span>
                <span className="text-slate-500">High-volume enterprise tiers, dedicated NTP synchronization, and commercial embed licensing.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Direct Email</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">support@globaltime.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Topic Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'general', label: 'General' },
                    { id: 'tz_data', label: 'Timezone Correction' },
                    { id: 'api_help', label: 'Developer API' }
                  ].map(t => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTopic(t.id)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        topic === t.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Message or Correction Details
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, bug report, or timezone gazette link in detail..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Received</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Thank you, {name}. Your inquiry regarding {topic} has been dispatched to our chronometry editorial desk.
              </p>
              <button
                onClick={() => { setSubmitted(false); setMessage(''); }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
