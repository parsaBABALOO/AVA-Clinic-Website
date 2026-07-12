"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "lucide-react"; 
import ScrollReveal from "../components/ScrollReveal";

// Array containing premium dynamic titles that rotate seamlessly
const words = ["BEST", "TRUSTED", "EXCLUSIVE", "ELITE"];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  // Interval timer for rotating the premium branding keywords every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-lightBg">
      
      {/* 1. DYNAMIC HEADER BLOCK & WORD ROTATOR */}
      <section className="pt-16 pb-8 text-center bg-white border-b border-slate-100">
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-dark uppercase">
          AVA CLINIC IS THE <br className="md:hidden" />
          <span className="inline-block min-w-[240px] text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mx-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="block"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
          CHICE
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-500 font-medium tracking-wide uppercase">
          Premium Dental Care & Elite Aesthetics Synergy
        </p>
      </section>

      {/* 2. PARALLEL SPLIT SCREEN INTERACTIVE HERO */}
      <section className="relative w-full h-[85vh] flex flex-col md:flex-row overflow-hidden border-b border-slate-200">
        
        {/* Left Side: Dental Panel */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b md:border-b-0 md:border-r border-slate-200">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 group-hover:scale-100"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent transition-opacity group-hover:opacity-95" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
            <span className="text-xs font-bold tracking-widest text-primary-light uppercase mb-2">Advanced Medical Care</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-wide mb-4">DENTAL SURGERY</h2>
            <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
              Experience flawless smiles with state-of-the-art implants, Hollywood smiles, and pain-free clinical dentistry designed for your ultimate comfort.
            </p>
          </div>
        </div>

        {/* Right Side: Aesthetics Panel */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 group-hover:scale-100"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent transition-opacity group-hover:opacity-95" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
            <span className="text-xs font-bold tracking-widest text-accent-rose uppercase mb-2">High-End Skin Dynamics</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-wide mb-4">AESTHETICS & SKIN</h2>
            <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
              Unlock true confidence with premium fillers, anti-aging therapies, and revolutionary skincare routines managed by board-certified aesthetic specialists.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SCROLL REVEAL SERVICES PROFILE */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-dark tracking-tight">OUR INTEGRATED DEPARTMENTS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Detailed Dental Features */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="font-display text-2xl font-bold text-primary mb-4 uppercase">Dental Services</h3>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-3">✓ Premium Titanium Implants & Oral Surgery</li>
                <li className="flex items-center gap-3">✓ Aesthetic Veneers & Customized Smile Makeovers</li>
                <li className="flex items-center gap-3">✓ Laser Teeth Whitening & Deep Prophylaxis</li>
                <li className="flex items-center gap-3">✓ 3D Digital Diagnostics & Emergency Care</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Detailed Aesthetics Features */}
          <ScrollReveal delay={0.4}>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="font-display text-2xl font-bold text-accent mb-4 uppercase">Aesthetic Services</h3>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-3">✓ Wrinkle Reduction & Premium Dermal Fillers</li>
                <li className="flex items-center gap-3">✓ Advanced Skin Resurfacing & Meso-Therapy</li>
                <li className="flex items-center gap-3">✓ Non-Surgical Face Lifts & Collagen Boosters</li>
                <li className="flex items-center gap-3">✓ Clinical Chemical Peels & Medical Hydrafacials</li>
              </ul>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}