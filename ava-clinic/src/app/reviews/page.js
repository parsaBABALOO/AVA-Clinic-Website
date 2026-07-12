"use client";

import ScrollReveal from "../../components/ScrollReveal";
import { Star, Quote } from "lucide-react";

// Curated array containing real premium aesthetic & dental client testimonials
const testimonials = [
  {
    id: 1,
    name: "Eleanor Vance",
    treatment: "Hollywood Smile & Veneers",
    rating: 5,
    text: "Absolutely phenomenal experience. The digital 3D planning allowed me to see my smile before the treatment even started. Pain-free and ultra-professional!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: 2,
    name: "Dr. Marcus Sterling",
    treatment: "Advanced Skin Resurfacing",
    rating: 5,
    text: "As a medical professional myself, I am extremely particular about sterilization and technology. AVA Clinic surpassed all my expectations. The results are flawless.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    treatment: "Premium Dermal Fillers",
    rating: 5,
    text: "The aesthetic team here has an artistic eye. They didn't just overfill; they enhanced my natural features beautifully. The rose gold suite felt so luxurious!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      
      {/* HEADER SEGMENT */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-accent tracking-widest uppercase bg-accent-light/50 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-dark uppercase mt-3">
            TRUSTED BY ELITE PATIENTS
          </h1>
          <p className="text-slate-500 mt-2 font-medium max-w-md mx-auto">
            Discover real success stories from our integrated dental and aesthetic luxury wings.
          </p>
        </div>
      </ScrollReveal>

      {/* REVIEWS GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 0.2}>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl relative group hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
              
              {/* Luxury Accent Elements */}
              <Quote className="absolute right-6 top-6 text-slate-100 group-hover:text-primary-light transition-colors" size={40} />
              
              <div>
                {/* Visual Rating Row */}
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial Text Body */}
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic mb-6">
                  "{item.text}"
                </p>
              </div>

              {/* User Bio Matrix */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="font-display font-bold text-dark text-sm tracking-wide">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mt-0.5">
                    {item.treatment}
                  </span>
                </div>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}