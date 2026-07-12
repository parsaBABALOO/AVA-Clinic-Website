import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Setup premium body typography
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

// Setup trending, luxury headline typography
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

// Search Engine Optimization (SEO) & metadata tags
export const metadata = {
  title: "AVA Dental & Aesthetics Clinic",
  description: "Premium Dental and Aesthetics Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${syne.variable}`}>
      <body className="bg-lightBg text-dark font-sans antialiased selection:bg-accent selection:text-white overflow-x-hidden">
        
        {/* GLOBAL HEADER & NAVIGATION */}
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Branding Logo Area */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-display text-2xl tracking-wider font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                AVA
              </span>
              <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase border-l border-slate-200 pl-2">
                Clinic
              </span>
            </Link>

            {/* Desktop Navigation Links */}
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

            {/* Premium, High-Conversion Booking Button (Big, Smooth, and Pulsing) */}
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

        {/* MAIN COMPONENT CONTAINER */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} AVA Dental & Aesthetics Clinic. All rights reserved.
        </footer>
      </body>
    </html>
  );
}