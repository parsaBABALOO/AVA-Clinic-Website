"use client";

import { useState } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      
      {/* INTRODUCTORY HEADER */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-dark uppercase">
            CONNECT WITH AVA CLINIC
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Reach our administrative staff for bespoke inquiries and emergency consults.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* CLINICAL DATA & META INFRASTRUCTURE */}
        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-6">
              
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-teal-50 text-primary rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Call Inquiry Line</h4>
                  <p className="text-sm font-bold text-dark mt-1">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-amber-50 text-accent rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Relations</h4>
                  <p className="text-sm font-bold text-dark mt-1">concierge@ava-clinic.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-100 text-dark rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Medical Headquarters</h4>
                  <p className="text-sm font-bold text-dark mt-1">742 Luxury Boulevard, Suite 10, New York</p>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* OPENING HOUR SCHEDULER MATRIX REFERENCE */}
          <ScrollReveal delay={0.2}>
            <div className="bg-dark text-white p-6 rounded-3xl shadow-lg">
              <h3 className="font-display text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Clock size={16} className="text-accent" /> OPERATIONAL MATRIX
              </h3>
              <div className="space-y-2 text-xs font-semibold text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Monday - Sunday</span>
                  <span className="text-white font-bold">10:00 AM - 08:00 PM</span>
                </div>
                <p className="text-[10px] text-slate-400 pt-2 italic">
                  * Note: System scheduling times strictly adhere to the half-hour clinical intervals.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* SECURE VISITOR MESSAGE CHANNEL */}
        <div className="lg:col-span-2">
          <ScrollReveal delay={0.3}>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
              <h2 className="text-lg font-display font-bold text-dark mb-6 uppercase border-b border-slate-50 pb-3">
                Send Direct Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl animate-fade-in">
                  Message successfully relayed! Our concierge team will reach out via secure channels shortly.
                </div>
              )}

              <form onSubmit={handleMessageSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message Content</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all resize-none"
                    placeholder="Describe your requested consultation target..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-teal-600 text-white font-bold rounded-xl text-xs tracking-wider hover:opacity-90 transition-all uppercase shadow-md"
                >
                  <Send size={14} /> Transmit Message
                </button>
              </form>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}