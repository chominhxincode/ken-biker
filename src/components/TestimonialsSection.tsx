'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/db/types';

interface TestimonialProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialProps) {
  return (
    <div className="w-full">
      {/* Horizontal scrolling wrapper on mobile, grid layout on desktop */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 snap-x snap-mandatory scrollbar-none">
        
        {testimonials.slice(0, 6).map((t) => (
          <div 
            key={t.id} 
            className="flex-shrink-0 w-[85vw] md:w-auto bg-white border border-brand-border rounded-xl p-6 shadow-sm snap-center flex flex-col justify-between hover:shadow-md transition-shadow relative"
          >
            {/* Quote Icon Background */}
            <span className="absolute right-4 top-4 text-brand-red/10">
              <Quote className="w-10 h-10" />
            </span>

            {/* Stars */}
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < t.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>

            {/* Review Comment */}
            <p className="text-brand-dark/95 text-sm lg:text-base leading-relaxed italic mb-6">
              "{t.comment}"
            </p>

            {/* Customer Details */}
            <div className="flex items-center space-x-3 pt-4 border-t border-brand-border/40 mt-auto">
              <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center font-bold text-sm">
                {t.name.split(' ').pop()?.substring(0, 2).toUpperCase() || 'KH'}
              </div>
              <div>
                <h4 className="font-bevietnam font-bold text-sm text-brand-dark">
                  {t.name}
                </h4>
                <p className="text-[10px] font-semibold text-brand-gray uppercase tracking-wider">
                  {t.role || 'Khách hàng'}
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
