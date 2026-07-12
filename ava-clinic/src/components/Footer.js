"use client";

/**
 * Reusable layout footer matching exact clinic copyright rules.
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400 font-medium w-full">
      &copy; {new Date().getFullYear()} AVA Dental & Aesthetics Clinic. All rights reserved.
    </footer>
  );
}