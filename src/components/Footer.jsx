'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#e8e8e8] mt-16 md:mt-24">
      <div className="container-custom py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 md:mb-16 pb-10 md:pb-12 border-b border-[#e8e8e8]">
          <h3 className="text-xl md:text-2xl font-light mb-3">Stay Updated</h3>
          <p className="text-gray-600 text-sm md:text-base font-light mb-5 md:mb-6 leading-relaxed">Subscribe to receive updates on new collections and exclusive offers.</p>
          <form className="flex max-w-sm gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border-b border-black outline-none bg-transparent text-sm placeholder-gray-400 font-light"
            />
            <button type="submit" className="btn-primary-pedestal">
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-12">
          {/* Collections */}
          <div>
            <h6 className="text-xs font-semibold tracking-widest mb-4 md:mb-5 uppercase text-black">Collections</h6>
            <ul className="space-y-2 md:space-y-2.5">
              <li><Link href="/products" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">All Dresses</Link></li>
              <li><Link href="/products?category=formal" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Formal Wear</Link></li>
              <li><Link href="/products?category=casual" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Casual Wear</Link></li>
              <li><Link href="/products?category=summer" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Summer Collection</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h6 className="text-xs font-semibold tracking-widest mb-4 md:mb-5 uppercase text-black">Customer Service</h6>
            <ul className="space-y-2 md:space-y-2.5">
              <li><Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Contact Us</Link></li>
              <li><Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">FAQ</Link></li>
              <li><Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Shipping & Returns</Link></li>
              <li><Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Size Guide</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h6 className="text-xs font-semibold tracking-widest mb-4 md:mb-5 uppercase text-black">About</h6>
            <ul className="space-y-2 md:space-y-2.5">
              <li><Link href="/perspectives" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Our Story</Link></li>
              <li><Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Sustainability</Link></li>
              <li><Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Press</Link></li>
              <li><Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Careers</Link></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h6 className="text-xs font-semibold tracking-widest mb-4 md:mb-5 uppercase text-black">Follow Us</h6>
            <ul className="space-y-2 md:space-y-2.5 flex flex-col">
              <li><a href="#" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Facebook</a></li>
              <li><a href="#" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Instagram</a></li>
              <li><a href="#" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">Pinterest</a></li>
              <li><a href="#" className="text-xs md:text-sm text-gray-600 hover:text-black transition font-light">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#e8e8e8] pt-6 md:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-xs text-gray-600 font-light">
            <div>
              <p className="font-light">&copy; {currentYear} MURGAN. All rights reserved.</p>
            </div>
            <div className="flex gap-4 md:gap-6 md:justify-end text-xs">
              <Link href="/" className="font-light hover:text-black transition">Privacy Policy</Link>
              <Link href="/" className="font-light hover:text-black transition">Terms & Conditions</Link>
              <Link href="/" className="font-light hover:text-black transition">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
