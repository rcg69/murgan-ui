'use client';

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { href: "/products", label: "All Collections" },
        { href: "/products?category=formal", label: "Formal Wear" },
        { href: "/products?category=casual", label: "Casual Wear" },
        { href: "/products?category=summer", label: "Summer Collection" },
        { href: "/products?category=party", label: "Party Dresses" },
        { href: "/", label: "New Arrivals" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/", label: "Contact Us" },
        { href: "/", label: "FAQs" },
        { href: "/", label: "Shipping & Returns" },
        { href: "/", label: "Size Guide" },
        { href: "/", label: "Track Order" },
        { href: "/", label: "Bulk Orders" },
      ],
    },
    {
      title: "About",
      links: [
        { href: "/", label: "Our Story" },
        { href: "/", label: "Sustainability" },
        { href: "/", label: "Press" },
        { href: "/", label: "Careers" },
        { href: "/", label: "Blog" },
        { href: "/", label: "Gift Cards" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/", label: "Terms & Conditions" },
        { href: "/", label: "Privacy Policy" },
        { href: "/", label: "Cookie Policy" },
        { href: "/", label: "Refund Policy" },
        { href: "/", label: "Accessibility" },
        { href: "/", label: "Contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: "#" },
    { icon: InstagramIcon, href: "#" },
    { icon: TwitterIcon, href: "#" },
    { icon: LinkedinIcon, href: "#" },
  ];

  return (
    <footer className="bg-white pt-20 pb-[10px] border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="group text-left">
            <div className="flex items-center mb-8">
{/*               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300 font-bold text-lg">
                M
              </div> */}
              <span className="ml-3 text-xl font-bold tracking-tight bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
                MURGAN
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
              Premium women's dresses crafted with elegance and quality. Discover timeless styles for every occasion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href }, idx) => (
                <a 
                  key={idx}
                  href={href} 
                  className="w-10 h-10 rounded-xl bg-white/90 border border-black/10 flex items-center justify-center text-gray-600 hover:text-black hover:scale-125 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Section */}
          <div className="text-left">
            <h4 className="text-lg font-bold tracking-tight mb-6 text-black">
              {footerLinks[0].title}
            </h4>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="text-left">
            <h4 className="text-lg font-bold tracking-tight mb-6 text-black">
              {footerLinks[1].title}
            </h4>
            <ul className="space-y-2">
              {footerLinks[1].links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-left">
            <h4 className="text-lg font-bold tracking-tight mb-6 text-black">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="text-gray-600 flex items-center text-sm">
                <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                <span>New Delhi, India</span>
              </li>
              <li>
                <a href="mailto:support@murgan.com" className="text-gray-600 hover:text-black transition-colors duration-300 flex items-center group text-sm">
                  <Mail className="w-5 h-5 mr-2 text-gray-400" />
                  support@murgan.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-gray-600 hover:text-black transition-colors duration-300 flex items-center group text-sm">
                  <Phone className="w-5 h-5 mr-2 text-gray-400" />
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm font-light">
            © {currentYear} MURGAN. All rights reserved. | Crafted with care. Designed for you.
          </p>
        </div>
      </div>
    </footer>
  );
}
