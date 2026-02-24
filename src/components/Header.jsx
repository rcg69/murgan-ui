'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setCartCount(getTotalItems());
  }, [getTotalItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e8e8e8]">


      {/* Main Header */}
      <nav className="container-custom py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-light tracking-wider">MURGAN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-xs font-light tracking-widest uppercase hover:text-gray-600 transition">
              Dresses
            </Link>
            <Link href="/products?category=formal" className="text-xs font-light tracking-widest uppercase hover:text-gray-600 transition">
              Formal
            </Link>
            <Link href="/products?category=casual" className="text-xs font-light tracking-widest uppercase hover:text-gray-600 transition">
              Casual
            </Link>
            <Link href="/perspectives" className="text-xs font-light tracking-widest uppercase hover:text-gray-600 transition">
              Stories
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 px-2 py-1 border-b border-black outline-none bg-transparent text-xs md:text-sm placeholder-gray-500"
                />
              </div>
            </form>

            {/* Account */}
            <Link href="/account" className="hidden md:block text-xs font-light tracking-widest uppercase hover:text-gray-600 transition">
              Account
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-1.5 text-xs font-light tracking-widest uppercase hover:text-gray-600 transition">
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 w-4 h-4 bg-black text-white flex items-center justify-center text-xs rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-base"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e8e8e8] mt-4 pt-4 pb-4 space-y-4">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-2 border-b border-black outline-none bg-transparent text-sm"
              />
            </form>
            <Link href="/products" className="block text-sm font-light py-2 hover:text-gray-600">
              DRESSES
            </Link>
            <Link href="/products?category=formal" className="block text-sm font-light py-2 hover:text-gray-600">
              FORMAL
            </Link>
            <Link href="/products?category=casual" className="block text-sm font-light py-2 hover:text-gray-600">
              CASUAL
            </Link>
            <Link href="/perspectives" className="block text-sm font-light py-2 hover:text-gray-600">
              STORIES
            </Link>
            <Link href="/account" className="block text-sm font-light py-2 hover:text-gray-600">
              Account
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
