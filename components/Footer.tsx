'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
{/* <section className="py-20 sm:py-32 bg-[linear-gradient(135deg,_#52E5E7_10%,_#130CB7_100%)]"></section> */}
  return (
    <footer className="bg-background bg-blue-800 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-[0.24em] mb-4 text-white">Royal Gypsum</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-white">
              Premium gypsum plastering services crafted for modern residential and commercial spaces.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] mb-4  text-white">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors text-white ">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors text-white">
                  Interior Plastering
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors text-white">
                  Exterior Finish
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors text-white">
                  Gypsum Board
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors text-white">
                  Repairs & Restoration
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] mb-4 text-white">Contact Info</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-accent transition-colors text-white"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@royalgypsum.com"
                  className="hover:text-accent transition-colors text-white"
                >
                  info@royalgypsum.com
                </a>
              </li>
              <li className="text-white">123 Business St, City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground text-white">
          <p>&copy; {currentYear} Royal Gypsum Plastering. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
