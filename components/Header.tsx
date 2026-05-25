'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react';
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Jost:wght@300;400;500;600&display=swap');

        /* ════════════════════════════════════════
           SHELL
        ════════════════════════════════════════ */
        .rg-header {
          position: sticky; top: 0; z-index: 50;
          background: #ffffff;
          border-bottom: 1px solid #e0e7ff;
          font-family: 'Jost', sans-serif;
        }

        .rg-header-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 1.5rem;
          display: flex; align-items: center;
          height: 76px;
          gap: 0;
        }

        /* ════════════════════════════════════════
           LOGO
        ════════════════════════════════════════ */
        .rg-logo {
          display: flex; flex-direction: column;
          text-decoration: none; flex-shrink: 0;
          margin-right: auto;          /* pushes everything right on mobile */
        }
        .rg-logo img {
          height: 56px; width: auto;
          object-fit: contain; display: block;
        }
        .rg-logo-rule {
          display: block; width: 2rem; height: 2px; margin-top: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c);
        }

        /* ════════════════════════════════════════
           DESKTOP NAV  (≥ 900 px)
        ════════════════════════════════════════ */
        .rg-nav {
          display: none;               /* hidden by default; shown at lg */
          align-items: center; gap: 0;
          margin: 0 1.5rem;
        }
        .rg-nav-link {
          position: relative;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: #1e3a8a; text-decoration: none;
          padding: 0.55rem 0.85rem;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .rg-nav-link::after {
          content: '';
          position: absolute; bottom: 0; left: 0.85rem; right: 0.85rem;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transform: scaleX(0); transform-origin: center;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .rg-nav-link:hover { color: #f97316; }
        .rg-nav-link:hover::after { transform: scaleX(1); }

        /* ════════════════════════════════════════
           DESKTOP AUTH  (≥ 900 px)
        ════════════════════════════════════════ */
        .rg-desktop-auth {
          display: none;               /* hidden by default; shown at lg */
          align-items: center; gap: 0.6rem; flex-shrink: 0;
          margin-left: auto;           /* always pins to the right edge */
        }

        /* shared button base */
        .rg-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          border-radius: 2px; white-space: nowrap;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .rg-btn-sm  { padding: 0.55rem 1.1rem; }
        .rg-btn-md  { padding: 0.65rem 1.4rem; }

        .rg-btn-orange {
          background: #f97316; color: #fff;
        }
        .rg-btn-orange:hover { background: #1e3a8a; transform: translateY(-1px); }

        .rg-btn-navy {
          background: #1e40af; color: #fff;
        }
        .rg-btn-navy:hover { background: #f97316; transform: translateY(-1px); }

        .rg-user-chip {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.95rem; font-weight: 600; font-style: italic;
          color: #1e3a8a;
          padding: 0.45rem 0.9rem;
          border: 1px solid #e0e7ff; border-radius: 2px;
          white-space: nowrap; max-width: 140px;
          overflow: hidden; text-overflow: ellipsis;
        }

        /* ════════════════════════════════════════
           HAMBURGER  (< 900 px)
        ════════════════════════════════════════ */
        .rg-hamburger {
          display: flex;               /* always flex; hidden via lg rule below */
          align-items: center; justify-content: center;
          width: 2.25rem; height: 2.25rem; flex-shrink: 0;
          border: 1px solid #e0e7ff; border-radius: 2px;
          background: transparent; cursor: pointer; color: #1e3a8a;
          transition: border-color 0.2s ease, color 0.2s ease;
          margin-left: 0.75rem;
        }
        .rg-hamburger:hover { border-color: #f97316; color: #f97316; }

        /* ════════════════════════════════════════
           MOBILE DRAWER
        ════════════════════════════════════════ */
        .rg-mobile-nav {
          border-top: 1px solid #e0e7ff;
          background: #fff;
          padding: 1rem 1.5rem 1.5rem;
          display: flex; flex-direction: column; gap: 0;
        }

        .rg-mobile-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #1e3a8a; text-decoration: none;
          padding: 0.8rem 0.75rem;
          border-left: 2px solid transparent;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          border-radius: 0 2px 2px 0;
        }
        .rg-mobile-link:hover {
          color: #f97316; border-left-color: #f97316;
          background: #fff7f0;
        }

        .rg-mobile-divider { height: 1px; background: #e0e7ff; margin: 0.75rem 0; }

        .rg-mobile-actions {
          display: flex; flex-direction: column; gap: 0.5rem;
        }

        .rg-mobile-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.9rem 1.5rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; border-radius: 2px;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .rg-mobile-btn-orange { background: #f97316; color: #fff; }
        .rg-mobile-btn-orange:hover { background: #1e3a8a; }
        .rg-mobile-btn-navy   { background: #1e40af; color: #fff; }
        .rg-mobile-btn-navy:hover   { background: #f97316; }

        .rg-mobile-user {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1rem; font-weight: 600; font-style: italic;
          color: #1e3a8a; text-align: center;
          padding: 0.6rem 1rem;
          border: 1px solid #e0e7ff; border-radius: 2px;
        }

        /* ════════════════════════════════════════
           BREAKPOINTS
        ════════════════════════════════════════ */

        /* 480 px — slightly larger logo */
        @media (min-width: 480px) {
          .rg-logo img { height: 60px; }
          .rg-header-inner { padding: 0 2rem; }
        }

        /* 900 px — show desktop nav + auth, hide hamburger */
        @media (min-width: 900px) {
          .rg-logo { margin-right: 0; }
          .rg-nav  { display: flex; }
          .rg-desktop-auth { display: flex; }
          .rg-hamburger { display: none; }
          .rg-header-inner { height: 80px; }
          .rg-logo img { height: 64px; }
        }

        /* 1024 px — slightly more nav padding */
        @media (min-width: 1024px) {
          .rg-nav-link { padding: 0.55rem 1rem; font-size: 0.78rem; }
          .rg-nav-link::after { left: 1rem; right: 1rem; }
          .rg-nav { margin: 0 2rem; }
        }

        /* force hide mobile nav on desktop regardless of state */
        @media (min-width: 900px) {
          .rg-mobile-nav { display: none !important; }
        }
      `}</style>

      <header className={cn('rg-header', className)}>
        <div className="rg-header-inner">

          {/* ── Logo ── */}
          <Link href="/" className="rg-logo">
            <img src={Logoimage} alt="Royal Gypsum Logo" />
            <span className="rg-logo-rule" />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="rg-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rg-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop auth ── */}
          <div className="rg-desktop-auth">
            {user && userProfile ? (
              <>
                <span className="rg-user-chip" title={userProfile.displayName}>
                  {userProfile.displayName}
                </span>
                <Link href="/admin" className="rg-btn rg-btn-sm rg-btn-navy">
                  <LayoutDashboard size={13} />
                  Dashboard
                </Link>
              </>
            ) : (
              <Link href="/login" className="rg-btn rg-btn-md rg-btn-orange">
                <LogIn size={13} />
                Login
              </Link>
            )}
          </div>

          {/* ── Hamburger ── */}
          <button
            type="button"
            className="rg-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="rg-mobile-nav"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileMenuOpen && (
          <nav id="rg-mobile-nav" className="rg-mobile-nav" aria-label="Mobile navigation">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rg-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="rg-mobile-divider" />

            <div className="rg-mobile-actions">
              {user && userProfile ? (
                <>
                  <span className="rg-mobile-user">{userProfile.displayName}</span>
                  <Link
                    href="/admin"
                    className="rg-mobile-btn rg-mobile-btn-navy"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={14} />
                    Admin Panel
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rg-mobile-btn rg-mobile-btn-orange"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={14} />
                  Login
                </Link>
              )}
            </div>

          </nav>
        )}
      </header>
    </>
  );
}