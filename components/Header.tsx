'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { useAuthStore } from '@/lib/authStore';
import { cn } from '@/lib/utils';

const Logoimage = '/royal gypsum .png';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile } = useAuthStore();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className={cn(
      'sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm',
      className
    )}>
      <div className="w-full px-3 sm:px-5 lg:px-8">
        <div className="flex h-[70px] sm:h-[85px] md:h-[95px] items-center">
          {/* Logo — far left */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={Logoimage}
              alt="Royal Gypsum Logo"
              className="h-16 sm:h-26 md:h-20 lg:h-24 w-auto object-contain"
            />
          </Link>

          {/* Spacer */}
          <div className="ml-6 lg:ml-10" />
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 mr-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative text-[15px] lg:text-[16px] font-light text-blue-900
                  px-4 py-2 no-underline tracking-wide
                  transition-colors duration-200 hover:text-orange-500
                  after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-0
                  after:h-[2px] after:bg-orange-500 after:scale-x-0
                  after:transition-transform after:duration-200 after:origin-center
                  hover:after:scale-x-100
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Login — far right (desktop) */}
          <div className="hidden md:flex items-center shrink-0 ml-3">
            {user && userProfile ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center rounded-full border border-blue-200 px-4 py-2 text-[15px] font-medium text-blue-900">
                  {userProfile.displayName}
                </span>
                <Link
                  href="/admin"
                  className="flex items-center rounded-full bg-blue-900 px-5 py-2.5 text-[15px] font-light text-white transition-all duration-200 hover:bg-orange-500"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-[15px] font-light text-white transition-all duration-200 hover:bg-blue-800"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile: hamburger */}
          <button
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-blue-900 transition-all duration-200 hover:border-orange-500 hover:text-orange-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    relative px-4 py-3 text-[15px] font-light tracking-wide
                    text-blue-900 no-underline transition-colors duration-200
                    hover:text-orange-500 border-l-2 border-transparent
                    hover:border-orange-500
                  "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              {!user ? (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-[15px] font-light text-white hover:bg-orange-500 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
              ) : userProfile && (
                <Link
                  href="/admin"
                  className="flex items-center justify-center rounded-lg bg-blue-900 px-4 py-3 text-[15px] font-light text-white hover:bg-orange-500 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}