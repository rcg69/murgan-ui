'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Murgan Store
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-100">
              Discover amazing products with unbeatable prices. Shop with confidence and enjoy fast, free shipping on orders over $50.
            </p>
            <div className="flex gap-4">
              <Link
                href="/products"
                className="btn btn-light btn-lg font-semibold hover:shadow-lg transition"
              >
                Shop Now
              </Link>
              <a
                href="#featured"
                className="btn btn-outline-light btn-lg font-semibold hover:shadow-lg transition"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white/10 backdrop-blur p-8 rounded-lg">
              <i className="fas fa-shopping-bags text-6xl text-yellow-300 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Best Deals Online</h3>
              <p className="text-gray-100">Premium quality products at unbeatable prices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
