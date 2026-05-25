'use client';

import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const services = [
    'Interior Plastering',
    'Exterior Finish',
    'Gypsum Board',
    'Repairs & Restoration',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Jost:wght@300;400;500;600&display=swap');

        /* ══════════════════════════════════════════
           FOOTER
        ══════════════════════════════════════════ */
        .rg-footer {
          font-family: 'Jost', sans-serif;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          position: relative; overflow: hidden;
        }

        /* Diagonal stripe texture — mirrors CTA banner */
        .rg-footer::before {
          content: ''; position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            -45deg, transparent, transparent 20px,
            rgba(255,255,255,0.025) 20px, rgba(255,255,255,0.025) 21px
          );
          pointer-events: none;
        }

        /* ── Pre-footer CTA strip ── */
        .rg-footer-cta {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 3rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1.5rem;
          position: relative; z-index: 1;
        }
        .rg-footer-cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700; color: #fff; line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .rg-footer-cta-title em { font-style: italic; color: #fb923c; }
        .rg-footer-cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.75rem 2rem;
          background: #f97316; color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; border-radius: 2px;
          transition: background 0.25s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .rg-footer-cta-btn:hover { background: #fff; color: #1e40af; transform: translateY(-2px); }

        /* ── Main grid ── */
        .rg-footer-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 4rem 2rem 3rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 3rem;
          position: relative; z-index: 1;
        }
        @media (max-width: 900px) {
          .rg-footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 540px) {
          .rg-footer-grid { grid-template-columns: 1fr; }
          .rg-footer-cta { flex-direction: column; align-items: flex-start; }
        }

        /* ── Column headings ── */
        .rg-footer-col-head {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #fb923c;
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .rg-footer-col-head::after {
          content: ''; display: block;
          height: 1px; width: 1.5rem;
          background: rgba(249,115,22,0.5);
        }

        /* ── Brand column ── */
        .rg-footer-brand-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem; font-weight: 700; font-style: italic;
          color: #fff; line-height: 1.1; margin-bottom: 0.25rem;
        }
        .rg-footer-brand-sub {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin-bottom: 1.25rem;
        }
        .rg-footer-brand-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.8; color: rgba(255,255,255,0.55);
          max-width: 22rem;
        }

        /* ── Links ── */
        .rg-footer-link-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 0.6rem;
        }
        .rg-footer-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem; font-weight: 300;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
          transition: color 0.2s ease, gap 0.2s ease;
        }
        .rg-footer-link svg { opacity: 0; transition: opacity 0.2s ease; flex-shrink: 0; }
        .rg-footer-link:hover { color: #fb923c; gap: 0.6rem; }
        .rg-footer-link:hover svg { opacity: 1; }

        /* ── Contact items ── */
        .rg-footer-contact-item {
          display: flex; align-items: flex-start; gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .rg-footer-contact-icon {
          width: 2rem; height: 2rem; flex-shrink: 0;
          background: rgba(249,115,22,0.15);
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          color: #fb923c; margin-top: 1px;
        }
        .rg-footer-contact-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.6; color: rgba(255,255,255,0.6);
        }
        .rg-footer-contact-text a {
          color: rgba(255,255,255,0.6); text-decoration: none;
          transition: color 0.2s ease;
        }
        .rg-footer-contact-text a:hover { color: #fb923c; }

        /* ── Bottom bar ── */
        .rg-footer-bottom {
          max-width: 1200px; margin: 0 auto;
          padding: 1.5rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          position: relative; z-index: 1;
        }
        .rg-footer-copy {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem; font-weight: 300;
          color: rgba(255,255,255,0.35); letter-spacing: 0.04em;
        }
        .rg-footer-legal {
          display: flex; gap: 2rem;
        }
        .rg-footer-legal a {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); text-decoration: none;
          transition: color 0.2s ease;
        }
        .rg-footer-legal a:hover { color: #fb923c; }
      `}</style>

      <footer className="rg-footer">

        {/* ── Pre-footer CTA strip ── */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rg-footer-cta">
            <div>
              <p style={{ fontFamily: 'Jost', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>
                Ready to start?
              </p>
              <h2 className="rg-footer-cta-title">
                Get a <em>Free Quote</em> Today
              </h2>
            </div>
            <Link href="/contact" className="rg-footer-cta-btn">
              Contact Us <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="rg-footer-grid">

          {/* Brand */}
          <div>
            <div className="rg-footer-brand-name">Royal Gypsum</div>
            <div className="rg-footer-brand-sub">Plastering</div>
            <span style={{ display: 'block', height: '2px', width: '2.5rem', background: 'linear-gradient(90deg,#f97316,#fb923c)', marginBottom: '1.25rem' }} />
            <p className="rg-footer-brand-desc">
              Premium gypsum plastering solutions engineered for modern residential, commercial, and industrial spaces. Quality guaranteed on every project.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="rg-footer-col-head">Navigation</div>
            <ul className="rg-footer-link-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rg-footer-link">
                    <ArrowRight size={11} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="rg-footer-col-head">Services</div>
            <ul className="rg-footer-link-list">
              {services.map((s) => (
                <li key={s}>
                  <a href="/services" className="rg-footer-link">
                    <ArrowRight size={11} />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="rg-footer-col-head">Contact Info</div>

            <div className="rg-footer-contact-item">
              <div className="rg-footer-contact-icon"><Phone size={14} /></div>
              <div className="rg-footer-contact-text">
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
            </div>

            <div className="rg-footer-contact-item">
              <div className="rg-footer-contact-icon"><Mail size={14} /></div>
              <div className="rg-footer-contact-text">
                <a href="mailto:info@royalgypsum.com">info@royalgypsum.com</a>
              </div>
            </div>

            <div className="rg-footer-contact-item">
              <div className="rg-footer-contact-icon"><MapPin size={14} /></div>
              <div className="rg-footer-contact-text">
                123 Business St,<br />City, State 12345
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="rg-footer-bottom">
          <p className="rg-footer-copy">
            &copy; {currentYear} Royal Gypsum Plastering. All rights reserved.
          </p>
          <div className="rg-footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

      </footer>
    </>
  );
}