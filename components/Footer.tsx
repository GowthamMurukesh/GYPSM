'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-base font-semibold mb-4">Royal Gypsum</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Premium plastering and gypsum services for exceptional residential and commercial projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-75 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-75 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:opacity-75 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-75 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Interior Plastering
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Exterior Finish
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Gypsum Board
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Repairs & Restoration
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:opacity-75 transition-opacity"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@royalgypsum.com"
                  className="hover:opacity-75 transition-opacity"
                >
                  info@royalgypsum.com
                </a>
              </li>
              <li>123 Business St, City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>&copy; {currentYear} Royal Gypsum Plastering. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
