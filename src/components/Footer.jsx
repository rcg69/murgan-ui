"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { href: "/products", label: "All Collections" },
        { href: "/products?sort=newest", label: "New Arrivals" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", label: "Contact Us" },
        { href: "/", label: "Size Guide" },
        { href: "/contact", label: "Bulk Orders" },
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
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#f7f6f3] text-[#191919]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 pt-16 pb-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:pt-20 sm:pb-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 lg:pt-24 lg:pb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="MURGAN home"
              className="inline-flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="MURGAN"
                className="h-11 w-auto object-contain sm:h-12"
              />

              <span className="text-lg font-medium tracking-[0.24em] sm:text-xl">
                MURGAN
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-600 sm:text-[15px]">
              Premium women&apos;s fashion crafted with elegance and quality.
              Discover timeless styles designed for every occasion.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-700 transition-colors duration-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                >
                  <Icon size={17} strokeWidth={1.6} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-12 border-t border-neutral-200 pt-8">
              <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                Get in touch
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm leading-6 text-neutral-600">
                  <MapPin
                    size={17}
                    strokeWidth={1.6}
                    className="mt-1 shrink-0 text-neutral-500"
                  />
                  <span>New Delhi, India</span>
                </li>

                <li>
                  <a
                    href="mailto:support@murgan.com"
                    className="flex min-w-0 items-start gap-3 text-sm leading-6 text-neutral-600 transition-colors hover:text-black"
                  >
                    <Mail
                      size={17}
                      strokeWidth={1.6}
                      className="mt-1 shrink-0 text-neutral-500"
                    />
                    <span className="break-all">support@murgan.com</span>
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+919876543210"
                    className="flex items-start gap-3 text-sm leading-6 text-neutral-600 transition-colors hover:text-black"
                  >
                    <Phone
                      size={17}
                      strokeWidth={1.6}
                      className="mt-1 shrink-0 text-neutral-500"
                    />
                    <span>+91 98765 43210</span>
                  </a>
                </li>
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 border-b border-neutral-400 pb-1 text-xs font-medium uppercase tracking-[0.13em] transition-colors hover:border-black"
              >
                Contact our team
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:col-span-2 sm:grid-cols-4 sm:gap-x-5 lg:col-span-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                  {group.title}
                </h3>

                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] leading-6 text-neutral-600 transition-colors duration-200 hover:text-black sm:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-neutral-200 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs leading-5 text-neutral-500">
            © {currentYear} MURGAN. All rights reserved.
          </p>

          <p className="text-xs leading-5 text-neutral-500">
            Crafted with care. Designed for you.
          </p>
        </div>
      </div>
    </footer>
  );
}