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
    // { href: '/work', label: 'Work' },
    // { href: '/solutions', label: 'Solutions' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className={cn('sticky top-0 z-50  bg-background/95 backdrop-blur-lg shadow-sm', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src={Logoimage} alt="Logo" className="h-18 w-auto" />

            {/* <span className="hidden text-base font-semibold tracking-[0.18em] uppercase text-foreground sm:inline">
              Royal Gypsum
            </span> */}
          </Link>

          <nav className="hidden gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-sky-800 no-underline transition-colors hover:text-orange-500 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {user && userProfile ? (
              <>
                <Link
                  href="/admin"
                  className="hidden rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent sm:inline"
                >
                  Dashboard
                </Link>
                <div className="hidden items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground sm:flex">
                  <span>{userProfile.displayName}</span>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2  border-sky-800 px-4 py-2 text-sm font-medium text-sky-800 transition hover:border-orange-500 hover:text-orange-500"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-full border border-border bg-card/90 p-2 text-foreground transition hover:border-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-sky-800 no-underline transition hover:bg-accent/10 hover:text-orange-500 hover:no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user && userProfile && (
                <Link
                  href="/admin"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-sky-800 transition hover:bg-accent/10 hover:text-orange-500"
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
