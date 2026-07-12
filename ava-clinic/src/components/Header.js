"use client";

import Link from "next/link";

/**
 * Sticky Global Navbar Component for standard multi-page route navigation.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Branding Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-wider font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            AVA
          </span>
          <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase border-l border-slate-200 pl-2">
            Clinic
          </span>
        </Link>

        {/* Global Navigation Hub */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/reviews" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">
            Reviews
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            Contact Us
          </Link>
          <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-dark transition-colors border-l border-slate-200 pl-4">
            Admin Area
          </Link>
        </nav>

        {/* Big Premium CTA Pulse Action */}
        <div>
          <Link 
            href="/booking" 
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-primary via-teal-600 to-accent rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-accent/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Book Appointment
          </Link>
        </div>

      </div>
    </header>
  );
}