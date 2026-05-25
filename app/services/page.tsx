'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/lib/authStore';
import { Service, SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/siteDefaults';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SERVICES_HERO_IMAGE = '/images/commercial-project.jpg';
const SERVICE_IMAGE_FALLBACKS = [
  '/images/interior-finish.jpg',
  '/images/fireproof-board.jpg',
  '/images/moisture-resistant.jpg',
  '/images/soundproof-solution.jpg',
  '/images/ceiling-installation.jpg',
  '/images/commercial-project.jpg',
  '/images/renovation-before-after.jpg',
  '/images/hero-plastering.jpg',
];

export default function ServicesPage() {
  const { initializeAuth } = useAuthStore();
  const [services, setServices] = useState<Service[]>([]);
  const [site, setSite] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe?.();
  }, [initializeAuth]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { getAllServices, getSiteContent } = await import('@/lib/firebaseUtils');
        const [data, siteData] = await Promise.all([getAllServices(), getSiteContent()]);
        setServices(data);
        setSite(siteData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* ── Base ── */
        .sp { font-family: 'Jost', sans-serif; background: #ffffff; color: #1e3a8a; }

        /* ── Keyframes ── */
        @keyframes sp-fade-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sp-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes sp-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes sp-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes sp-shimmer {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%)  skewX(-12deg); }
        }

        .sp-a1 { animation: sp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .sp-a2 { animation: sp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .sp-a3 { animation: sp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .sp-a4 { animation: sp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
        .sp-aimg { animation: sp-fade-in 1.1s ease 0.15s both; }

        /* ── Shared tokens ── */
        .sp-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #f97316;
        }
        .sp-section-label {
          display: flex; align-items: center; gap: 1rem;
          font-family: 'Jost', sans-serif; font-size: 0.7rem;
          letter-spacing: 0.22em; font-weight: 600; text-transform: uppercase;
          color: #f97316; margin-bottom: 1.25rem;
        }
        .sp-section-label::after {
          content: ''; display: block; height: 1px; width: 3rem; background: #f97316;
        }
        .sp-orange-line {
          display: block; height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
          transform-origin: left;
          animation: sp-line-grow 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both;
        }
        .sp-body {
          font-family: 'Jost', sans-serif; font-size: 0.95rem;
          font-weight: 300; line-height: 1.8; color: #374151;
        }
        .sp-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* ══════════════════════════════════════════
           HERO  — split grid, same as Home & About
        ══════════════════════════════════════════ */
        .sp-hero {
          position: relative; min-height: 72vh;
          display: grid; grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .sp-hero { grid-template-columns: 1fr; min-height: auto; }
          .sp-hero-img-col { display: none; }
        }
        .sp-hero-text-col {
          display: flex; flex-direction: column; justify-content: center;
          padding: 7rem 5rem 7rem 6rem;
          background: #ffffff; position: relative; z-index: 2;
        }
        @media (max-width: 900px) { .sp-hero-text-col { padding: 5rem 2rem; } }

        .sp-hero-img-col { position: relative; overflow: hidden; }
        .sp-hero-img-col img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sp-hero-img-col::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, #ffffff 0%, transparent 18%);
          z-index: 1; pointer-events: none;
        }

        .sp-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 700; line-height: 1.06;
          color: #1e3a8a; letter-spacing: -0.01em;
        }
        .sp-hero-title em { font-style: italic; color: #f97316; }

        .sp-hero-accent {
          position: absolute; bottom: 3rem; right: 3rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem; font-weight: 700;
          color: rgba(249,115,22,0.08); line-height: 1;
          user-select: none;
          animation: sp-float 7s ease-in-out infinite; z-index: 0;
        }

        /* ══════════════════════════════════════════
           PRODUCT COUNT BAND  (blue-800 dark strip)
        ══════════════════════════════════════════ */
        .sp-band {
          background: #1e40af; padding: 2rem;
          display: flex; align-items: center; justify-content: center;
          gap: 4rem; flex-wrap: wrap;
        }
        .sp-band-stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.6rem; font-weight: 700; color: #fb923c;
          line-height: 1; letter-spacing: -0.02em;
        }
        .sp-band-stat-lbl {
          font-family: 'Jost', sans-serif; font-size: 0.68rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.7); margin-top: 0.2rem;
        }
        .sp-band-divider { width: 1px; height: 2.5rem; background: rgba(255,255,255,0.15); }
        @media (max-width: 480px) { .sp-band-divider { display: none; } }

        /* ══════════════════════════════════════════
           GRID SECTION
        ══════════════════════════════════════════ */
        .sp-grid-section { background: #f0f4ff; padding: 6rem 2rem; }

        /* ── Service card ── */
        .sp-card {
          background: #ffffff; border-radius: 6px; overflow: hidden;
          display: flex; flex-direction: column;
          border: 1px solid #e0e7ff;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          position: relative;
        }
        /* orange bottom sweep */
        .sp-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, #f97316, #fb923c);
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
        }
        .sp-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(30,64,175,0.14); }
        .sp-card:hover::after { transform: scaleX(1); }

        /* blue stripe on top of image */
        .sp-card-img-wrap { position: relative; overflow: hidden; height: 240px; }
        .sp-card-img-wrap::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 4px; background: linear-gradient(90deg, #1e40af, #3b82f6); z-index: 1;
        }
        .sp-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: grayscale(20%);
          transition: transform 0.5s ease, filter 0.4s ease;
        }
        .sp-card:hover .sp-card-img { transform: scale(1.05); filter: grayscale(0%); }
        .sp-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(30,64,175,0.35) 0%, transparent 55%);
        }

        /* index badge */
        .sp-card-index {
          position: absolute; bottom: 1rem; right: 1rem; z-index: 2;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem; font-weight: 700; color: rgba(255,255,255,0.5);
          line-height: 1; user-select: none;
        }

        .sp-card-body { padding: 1.75rem 2rem 2rem; flex: 1; display: flex; flex-direction: column; }
        .sp-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem; font-weight: 700;
          color: #1e3a8a; line-height: 1.2; margin-bottom: 0.75rem;
        }
        .sp-card-divider { height: 1px; background: #e0e7ff; margin: 1rem 0; }
        .sp-card-details {
          font-family: 'Jost', sans-serif; font-size: 0.88rem;
          font-weight: 300; line-height: 1.75; color: #374151;
          flex: 1;
        }

        /* ── Skeleton loader ── */
        .sp-skeleton {
          background: #e0e7ff; border-radius: 6px; overflow: hidden;
          animation: sp-fade-in 0.4s ease both;
        }
        .sp-skeleton-img { height: 240px; background: #c7d2fe; }
        .sp-skeleton-body { padding: 1.75rem 2rem; }
        .sp-skeleton-line {
          height: 12px; border-radius: 3px; background: #e0e7ff; margin-bottom: 0.75rem;
        }

        /* ── Empty state ── */
        .sp-empty {
          text-align: center; padding: 6rem 2rem;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem; font-weight: 300; color: #374151; font-style: italic;
        }

        /* ══════════════════════════════════════════
           CTA BANNER
        ══════════════════════════════════════════ */
        .sp-cta {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          padding: 5.5rem 2rem; position: relative; overflow: hidden; text-align: center;
        }
        .sp-cta::before {
          content: ''; position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            -45deg, transparent, transparent 20px,
            rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px
          );
        }
        .sp-cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 700;
          color: #fff; line-height: 1.1; letter-spacing: -0.01em;
          margin: 0.75rem 0 1rem;
        }
        .sp-cta-title em { font-style: italic; color: #fb923c; }
        .sp-cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-top: 1.75rem; padding: 1rem 2.5rem;
          background: #fff; color: #1e40af;
          font-family: 'Jost', sans-serif; font-size: 0.78rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; border-radius: 2px;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .sp-cta-btn:hover { background: #f97316; color: #fff; transform: translateY(-2px); }
      `}</style>

      <Header />
      <main className="sp flex flex-col min-h-screen">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section className="sp-hero">
          <div className="sp-hero-text-col">
            <span className="sp-hero-accent">∞</span>

            <div className="sp-a1">
              <span className="sp-eyebrow">Royal Gypsum Plastering</span>
              <span className="sp-orange-line mt-3 mb-6" style={{ width: '3.5rem' }} />
            </div>

            <div className="sp-a1" style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#f97316', color: '#fff', borderRadius: '9999px',
                padding: '0.45rem 1.1rem', fontFamily: 'Jost, sans-serif',
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                {site.servicesPage.heroBadge || 'Our Products'}
              </span>
            </div>

            <h1 className="sp-hero-title sp-a2">
              {site.servicesPage.heroTitle || <><em>Premium</em> Gypsum<br />Products &amp; Services</>}
            </h1>

            <p className="sp-body sp-a3 mt-6" style={{ maxWidth: '28rem' }}>
              {site.servicesPage.heroSubtitle || 'A complete range of gypsum plastering solutions engineered for residential, commercial, and industrial applications.'}
            </p>

            {/* mini stat */}
            {/* <div className="sp-a4 mt-10" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {[['500+', 'Projects Done'], ['15+', 'Years Experience'], ['98%', 'Satisfaction']].map(([num, lbl], i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 700, color: '#f97316', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'Jost', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#374151', fontWeight: 500, marginTop: '0.2rem' }}>{lbl}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right image col */}
          <div className="sp-hero-img-col sp-aimg">
            <img
              src={site.servicesPage.heroImage || SERVICES_HERO_IMAGE}
              alt="Royal Gypsum services"
            />
            {/* floating badge */}
            <div style={{
              position: 'absolute', bottom: '3rem', left: '-1.5rem', zIndex: 2,
              background: '#f97316', color: '#fff', padding: '1.25rem 2rem',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.1rem', fontWeight: 700, fontStyle: 'italic',
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
            }}>
              Quality Guaranteed
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            STAT BAND
        ══════════════════════════════════ */}
        {/* <div className="sp-band">
          {[
            { num: '500+', lbl: 'Projects Completed' },
            { num: '98%',  lbl: 'Client Satisfaction' },
            { num: '15+',  lbl: 'Years in Business' },
            { num: `${services.length || '—'}`, lbl: 'Products Available' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'contents' }}>
              {i > 0 && <div className="sp-band-divider" />}
              <div style={{ textAlign: 'center' }}>
                <div className="sp-band-stat-num">{s.num}</div>
                <div className="sp-band-stat-lbl">{s.lbl}</div>
              </div>
            </div>
          ))}
        </div> */}

        {/* ══════════════════════════════════
            PRODUCTS GRID
        ══════════════════════════════════ */}
        <section className="sp-grid-section flex-1">
          <div className="sp-container">
            <div style={{ marginBottom: '3.5rem' }}>
              <div className="sp-section-label">What we offer</div>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                fontWeight: 700, color: '#1e3a8a', lineHeight: 1.1,
                letterSpacing: '-0.01em', marginBottom: '0.75rem',
              }}>
                Our <em style={{ fontStyle: 'italic', color: '#f97316' }}>Products</em> &amp; Solutions
              </h2>
              <p className="sp-body" style={{ maxWidth: '36rem' }}>
                Every product is engineered for performance, durability, and aesthetic precision — from wall finishes to specialised boards.
              </p>
            </div>

            {loading ? (
              /* ── Skeleton grid ── */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="sp-skeleton" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="sp-skeleton-img" />
                    <div className="sp-skeleton-body">
                      <div className="sp-skeleton-line" style={{ width: '60%' }} />
                      <div className="sp-skeleton-line" style={{ width: '90%' }} />
                      <div className="sp-skeleton-line" style={{ width: '75%' }} />
                      <div className="sp-skeleton-line" style={{ width: '50%', marginTop: '1.5rem' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : services.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="sp-card"
                    style={{ animation: `sp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s both` }}
                  >
                    {/* Image */}
                    <div className="sp-card-img-wrap">
                      <img
                        src={service.image || SERVICE_IMAGE_FALLBACKS[index % SERVICE_IMAGE_FALLBACKS.length]}
                        alt={service.title}
                        className="sp-card-img"
                      />
                      <div className="sp-card-img-overlay" />
                      <span className="sp-card-index">0{index + 1}</span>
                    </div>

                    {/* Body */}
                    <div className="sp-card-body">
                      <h3 className="sp-card-title">{service.title}</h3>
                      <p className="sp-body" style={{ fontSize: '0.9rem', marginBottom: service.details ? 0 : undefined }}>
                        {service.description}
                      </p>

                      {service.details && (
                        <>
                          <div className="sp-card-divider" />
                          <p className="sp-card-details">{service.details}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sp-empty">
                Products will be available soon.<br />Please check back later.
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════
            CTA BANNER
        ══════════════════════════════════ */}
        <section className="sp-cta">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="sp-section-label" style={{ color: 'rgba(255,255,255,0.6)', justifyContent: 'center' }}>
              Ready to start?
              <span style={{ display: 'block', height: '1px', width: '3rem', background: 'rgba(249,115,22,0.6)' }} />
            </div>
            <h2 className="sp-cta-title">
              Need a Custom <em>Solution?</em>
            </h2>
            <p style={{
              fontFamily: 'Jost', fontSize: '1rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
              maxWidth: '30rem', margin: '0 auto',
            }}>
              Our specialists will assess your space and recommend the perfect gypsum system for your project — at no obligation.
            </p>
            <Link href="/contact" className="sp-cta-btn">
              Get a Free Quote <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}