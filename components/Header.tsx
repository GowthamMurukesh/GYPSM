'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { useAuthStore } from '@/lib/authStore';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile } = useAuthStore();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">
              RG
            </div>
            <span className="hidden text-lg font-semibold text-primary tracking-tight sm:inline">
              Royal Gypsum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
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
                  className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-primary sm:inline"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 rounded px-3 py-1.5 bg-accent/10">
                  <span className="text-xs font-semibold text-accent">{userProfile.displayName}</span>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
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
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user && userProfile && (
                <Link
                  href="/admin"
                  className="text-sm font-medium transition-colors hover:text-primary"
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
