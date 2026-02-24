'use client';

import React from 'react';
import Link from 'next/link';

export default function StudioSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f5f5f5] border-y border-[#e8e8e8]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-light mb-5 md:mb-6 tracking-tight">Customize Your Look</h2>
            <p className="text-gray-600 text-sm md:text-base mb-4 font-light leading-relaxed tracking-wide">
              Our dress configurator helps you find the perfect piece tailored to your style, body type, and occasion. 
            </p>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 font-light leading-relaxed tracking-wide">
              Mix and match colors, patterns, and styles to create a look that's uniquely yours. With thousands of combinations available, you'll find the perfect dress for any moment.
            </p>
            <Link href="/configure" className="btn-primary-pedestal inline-block">
              Start Configuring
            </Link>
          </div>

          {/* Image Content */}
          <div className="relative h-80 md:h-96 overflow-hidden bg-white border border-[#e8e8e8]">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=700&fit=crop" 
              alt="Studio Configuration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
