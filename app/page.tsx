'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import AnnouncementPopup from '@/components/AnnouncementPopup';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Hammer, Clock, Award, ArrowRight, Droplet, Shield, Zap, Volume2, Leaf, Truck } from 'lucide-react';
import { useAuthStore } from '@/lib/authStore';
import { Service, SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/siteDefaults';

const HOME_HERO_IMAGE = '/images/hero-plastering.jpg';
const CONTACT_HERO_IMAGE = '/images/hero-contact.jpg';
const sectionImages = {
  quality: '/images/interior-finish.jpg',
  support: '/images/commercial-project.jpg',
  excellence: '/images/ceiling-installation.jpg',
  residential: '/images/renovation-before-after.jpg',
  commercial: '/images/commercial-project.jpg',
  industries: '/images/fireproof-board.jpg',
  cta: '/images/moisture-resistant.jpg',
};
const serviceImageFallbacks = [
  '/images/interior-finish.jpg',
  '/images/fireproof-board.jpg',
  '/images/moisture-resistant.jpg',
  '/images/soundproof-solution.jpg',
  '/images/ceiling-installation.jpg',
  '/images/commercial-project.jpg',
  '/images/renovation-before-after.jpg',
  '/images/hero-plastering.jpg',
];

const benefits = [
  { icon: Zap,     label: 'Time Saving',    desc: 'Faster construction with minimal labour requirements',         img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop&q=80' },
  { icon: Droplet, label: 'Less Wastage',   desc: 'Significantly lower waste compared to traditional methods',    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop&q=80' },
  { icon: Shield,  label: 'High Durability',desc: 'Enhanced fire, moisture and impact resistance',                img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop&q=80' },
  { icon: Leaf,    label: 'Eco-Friendly',   desc: 'Non-toxic and environmentally sustainable products',           img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1913&auto=format&fit=crop' },
  { icon: Clock,   label: 'Cost Effective', desc: 'Superior value with reduced construction expenses',            img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop&q=80' },
  { icon: Volume2, label: 'Sound Control',  desc: 'Superior acoustic insulation for peaceful spaces',             img: 'https://images.unsplash.com/photo-1531104985437-603d6490e6d4?q=80&w=2039&auto=format&fit=crop' },
];

const industries = [
  { name: 'Residential',      desc: 'Premium gypsum plastering solutions for villas, apartments, and modern residential interiors with smooth and durable wall finishes.' },
  { name: 'Commercial',       desc: 'Professional plastering services for offices, showrooms, and retail outlets with clean finishing and timely project execution.' },
  { name: 'Hospitality',      desc: 'Elegant wall and ceiling plastering for hotels, resorts, restaurants, and luxury spaces designed for aesthetic appeal and durability.' },
  { name: 'Healthcare',       desc: 'High-quality gypsum plastering for hospitals, clinics, and healthcare facilities with smooth, hygienic, maintenance-friendly finishes.' },
  { name: 'Education',        desc: 'Reliable plastering solutions for schools, colleges, and universities ensuring strong, neat, and long-lasting interiors.' },
  { name: 'Industrial',       desc: 'Durable gypsum plastering for factories, warehouses, and manufacturing facilities with quality workmanship.' },
  { name: 'Renovation',       desc: 'Complete wall renovation and re-plastering services to upgrade old spaces with modern, smooth, crack-free, ready-to-paint finishes.' },
  { name: 'New Construction', desc: 'End-to-end gypsum plastering for newly constructed residential and commercial projects with precision, speed, and superior quality.' },
];

export default function HomePage() {
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
        setServices(data.slice(0, 3));
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
        .hp { font-family: 'Jost', sans-serif; background: #ffffff; color: #1e3a8a; }

        /* ── Keyframes ── */
        @keyframes hp-fade-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hp-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hp-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes hp-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes hp-pulse-badge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(249,115,22,0); }
        }

        .hp-a1 { animation: hp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .hp-a2 { animation: hp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .hp-a3 { animation: hp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .hp-a4 { animation: hp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
        .hp-a5 { animation: hp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.7s both; }
        .hp-aimg { animation: hp-fade-in 1.1s ease 0.15s both; }

        /* ── Shared typography ── */
        .hp-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #f97316;
        }
        .hp-section-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          font-weight: 600;
          text-transform: uppercase;
          color: #f97316;
          margin-bottom: 1.25rem;
        }
        .hp-section-label::after {
          content: '';
          display: block;
          height: 1px;
          width: 3rem;
          background: #f97316;
        }
        .hp-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 700;
          line-height: 1.1;
          color: #1e3a8a;
          letter-spacing: -0.01em;
          margin-bottom: 1rem;
        }
        .hp-section-title em { font-style: italic; color: #f97316; }
        .hp-body { font-family: 'Jost', sans-serif; font-size: 1rem; font-weight: 300; line-height: 1.8; color: #374151; }
        .hp-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .hp-orange-line {
          display: block; height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
          transform-origin: left;
          animation: hp-line-grow 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both;
        }

        /* ══════════════════════════════════════════
           HERO
        ══════════════════════════════════════════ */
        .hp-hero {
          position: relative;
          min-height: 92vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .hp-hero { grid-template-columns: 1fr; min-height: auto; }
          .hp-hero-img-col { display: none; }
        }
        .hp-hero-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7rem 5rem 7rem 6rem;
          background: #ffffff;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 900px) { .hp-hero-text-col { padding: 5rem 2rem; } }

        .hp-hero-img-col {
          position: relative;
          overflow: hidden;
        }
        .hp-hero-img-col img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hp-hero-img-col::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, #ffffff 0%, transparent 18%);
          z-index: 1; pointer-events: none;
        }

        .hp-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3.2rem, 6vw, 5.5rem);
          font-weight: 700;
          line-height: 1.06;
          color: #1e3a8a;
          letter-spacing: -0.01em;
        }
        .hp-hero-title em { font-style: italic; color: #f97316; }

        .hp-hero-accent-num {
          position: absolute;
          bottom: 3rem; right: 3rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 9rem; font-weight: 700;
          color: rgba(249,115,22,0.08);
          line-height: 1; user-select: none;
          animation: hp-float 7s ease-in-out infinite;
          z-index: 0;
        }

        .hp-hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #f97316; color: #fff;
          border-radius: 9999px; padding: 0.45rem 1.1rem;
          font-family: 'Jost', sans-serif; font-size: 0.72rem;
          font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
          animation: hp-pulse-badge 2.5s ease-in-out infinite;
        }

        .hp-btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.9rem 2rem;
          background: #1e40af; color: #fff;
          border: none; border-radius: 9999px;
          font-family: 'Jost', sans-serif; font-size: 0.9rem; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 20px rgba(30,64,175,0.25);
        }
        .hp-btn-primary:hover { background: #f97316; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(249,115,22,0.3); }

        .hp-btn-secondary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.9rem 2rem;
          background: transparent; color: #1e40af;
          border: 1.5px solid #1e40af; border-radius: 9999px;
          font-family: 'Jost', sans-serif; font-size: 0.9rem; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: all 0.25s ease;
        }
        .hp-btn-secondary:hover { background: #1e40af; color: #fff; transform: translateY(-2px); }

        /* ══════════════════════════════════════════
           WHY CHOOSE US  (dark blue bg)
        ══════════════════════════════════════════ */
        .hp-why { background: #1e40af; padding: 6rem 2rem; }
        .hp-why-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 700; color: #fff; letter-spacing: -0.01em;
        }
        .hp-why-title em { font-style: italic; color: #fb923c; }
        .hp-why-card {
          background: #fff; border-radius: 6px; overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          position: relative;
        }
        .hp-why-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, #f97316, #fb923c);
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
        }
        .hp-why-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(30,64,175,0.18); }
        .hp-why-card:hover::after { transform: scaleX(1); }
        .hp-why-card-img { width: 100%; height: 180px; object-fit: cover; display: block; filter: grayscale(20%); transition: filter 0.4s ease; }
        .hp-why-card:hover .hp-why-card-img { filter: grayscale(0%); }
        .hp-why-icon {
          display: flex; align-items: center; justify-content: center;
          width: 3.25rem; height: 3.25rem; border-radius: 6px;
          background: rgba(249,115,22,0.1); margin-bottom: 1rem;
        }

        /* ══════════════════════════════════════════
           BENEFITS (white bg, image cards with overlay)
        ══════════════════════════════════════════ */
        .hp-benefits { background: #f0f4ff; padding: 6rem 2rem; }
        .hp-benefit-card {
          position: relative; overflow: hidden; border-radius: 6px;
          min-height: 260px;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .hp-benefit-card:hover { transform: translateY(-6px); }
        .hp-benefit-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .hp-benefit-card:hover img { transform: scale(1.06); }
        .hp-benefit-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(30,64,175,0.85) 0%, rgba(30,64,175,0.3) 50%, transparent 100%);
        }
        .hp-benefit-card-body {
          position: relative; z-index: 1;
          height: 100%; display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding: 1.75rem; text-align: center;
        }
        .hp-benefit-icon {
          display: flex; align-items: center; justify-content: center;
          width: 3rem; height: 3rem; border-radius: 8px;
          background: #f97316; margin-bottom: 0.75rem;
        }

        /* ══════════════════════════════════════════
           PRODUCTS (orange bg)
        ══════════════════════════════════════════ */
        .hp-products { background: #f97316; padding: 6rem 2rem; }
        .hp-product-card {
          background: #fff; border-radius: 6px; overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .hp-product-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,0,0,0.15); }
        .hp-product-card-img { width: 100%; height: 220px; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .hp-product-card:hover .hp-product-card-img { transform: scale(1.05); }

        /* ══════════════════════════════════════════
           SOLUTIONS (white, split layout)
        ══════════════════════════════════════════ */
        .hp-solutions { background: #ffffff; padding: 6rem 2rem; }
        .hp-solution-img { width: 100%; height: 280px; object-fit: cover; display: block; border-radius: 4px; transition: transform 0.5s ease; }
        .hp-solution-img:hover { transform: scale(1.02); }
        .hp-bullet {
          display: flex; align-items: flex-start; gap: 0.75rem;
          padding: 0.6rem 0; border-bottom: 1px solid #e0e7ff;
          font-family: 'Jost', sans-serif; font-size: 0.95rem; font-weight: 400; color: #374151;
        }
        .hp-bullet-dot { color: #f97316; font-weight: 700; flex-shrink: 0; margin-top: 0.1rem; }

        /* ══════════════════════════════════════════
           INDUSTRIES (light blue bg)
        ══════════════════════════════════════════ */
        .hp-industries { background: #f0f4ff; padding: 6rem 2rem; position: relative; overflow: hidden; }
        .hp-industry-card {
          background: #fff; border: 1px solid #e0e7ff; border-radius: 6px;
          overflow: hidden; display: flex; flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          position: relative;
        }
        .hp-industry-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, #f97316, #fb923c);
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
        }
        .hp-industry-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(30,64,175,0.12); }
        .hp-industry-card:hover::after { transform: scaleX(1); }
        .hp-industry-img { width: 100%; height: 160px; object-fit: cover; display: block; filter: grayscale(25%); transition: filter 0.4s ease; }
        .hp-industry-card:hover .hp-industry-img { filter: grayscale(0%); }

        /* ══════════════════════════════════════════
           CTA BANNER (blue-800)
        ══════════════════════════════════════════ */
        .hp-cta {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          padding: 6rem 2rem; position: relative; overflow: hidden;
        }
        .hp-cta::before {
          content: ''; position: absolute; inset: 0;
          background-image: repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
        }
        .hp-cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 700; color: #fff; line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .hp-cta-title em { font-style: italic; color: #fb923c; }
        .hp-cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-top: 2rem; padding: 1rem 2.5rem;
          background: #fff; color: #1e40af;
          font-family: 'Jost', sans-serif; font-size: 0.78rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer; border-radius: 2px;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .hp-cta-btn:hover { background: #f97316; color: #fff; transform: translateY(-2px); }
      `}</style>

      <Header />
      <AnnouncementPopup site={site} />
      <main className="hp flex flex-col min-h-screen">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section className="hp-hero">
          <div className="hp-hero-text-col">
            <span className="hp-hero-accent-num">15</span>

            <div className="hp-a1">
              <span className="hp-eyebrow">Royal Gypsum Plastering</span>
              <span className="hp-orange-line mt-3 mb-6" style={{ width: '3.5rem' }} />
            </div>

            <div className="hp-a1" style={{ marginBottom: '1.5rem' }}>
              <span className="hp-hero-badge">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                {site.home.heroBadge}
              </span>
            </div>

            <h1 className="hp-hero-title hp-a2">
              {site.home.heroTitle || <><em>Premium</em> Gypsum<br />Solutions That<br /><em>Last.</em></>}
            </h1>

            <p className="hp-body hp-a3 mt-6" style={{ maxWidth: '26rem' }}>
              {site.home.heroSubtitle || 'Delivering superior plastering craftsmanship for residential and commercial projects across the region — since 2010.'}
            </p>

            <div className="hp-a4 mt-10" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="hp-btn-primary">
                {site.home.primaryCtaLabel || 'Get a Free Quote'}
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="hp-btn-secondary">
                {site.home.secondaryCtaLabel || 'Explore Services'}
              </Link>
            </div>

            {/* Mini stats */}
            {/* <div className="hp-a5 mt-12" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {[['500+', 'Projects'], ['98%', 'Satisfaction'], ['15+', 'Years']].map(([num, lbl], i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 700, color: '#f97316', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'Jost', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#374151', fontWeight: 500, marginTop: '0.2rem' }}>{lbl}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right image col */}
          <div className="hp-hero-img-col hp-aimg">
            <img src={site.home.heroImage || HOME_HERO_IMAGE} alt="Royal Gypsum premium plastering" />
            {/* Est. badge */}
            <div style={{
              position: 'absolute', bottom: '3rem', left: '-1.5rem', zIndex: 2,
              background: '#f97316', color: '#fff', padding: '1.25rem 2rem',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.1rem', fontWeight: 700, fontStyle: 'italic',
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
            }}>
              Est. 2010
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════ */}
        <section className="hp-why">
          <div className="hp-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'end', marginBottom: '3.5rem' }}>
              <div>
                <div className="hp-section-label" style={{ color: '#fb923c' }}>Why choose us</div>
                <h2 className="hp-why-title">
                  {site.home.whyTitle || <>Built on <em>Trust.</em><br />Delivered with <em>Precision.</em></>}
                </h2>
              </div>
              <p style={{ fontFamily: 'Jost', fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 0 }}>
                {site.home.whySubtitle || 'Every project reflects our commitment to quality, reliability, and craftsmanship that stands the test of time.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: Leaf,  title: '100% Premium Quality', desc: 'We use only the finest materials meeting all industry standards for superior durability.', img: sectionImages.quality },
                { icon: Truck, title: '24/7 Support',          desc: 'Our dedicated team is always available when you need us, ensuring seamless project delivery.', img: sectionImages.support },
                { icon: Award, title: 'Trusted Excellence',    desc: 'Industry-leading standards and proven expertise ensuring exceptional results every time.', img: sectionImages.excellence },
              ].map((card, i) => (
                <div
                  key={i}
                  className="hp-why-card"
                  style={{ animation: `hp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.15}s both` }}
                >
                  <img src={card.img} alt={card.title} className="hp-why-card-img" />
                  <div style={{ padding: '1.75rem 2rem 2rem' }}>
                    <div className="hp-why-icon">
                      <card.icon size={22} color="#f97316" />
                    </div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.6rem' }}>{card.title}</h3>
                    <p className="hp-body" style={{ fontSize: '0.95rem' }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            BENEFITS
        ══════════════════════════════════ */}
        <section className="hp-benefits">
          <div className="hp-container">
            <div style={{ marginBottom: '3rem' }}>
              <div className="hp-section-label">What we offer</div>
              <h2 className="hp-section-title">
                {site.home.benefitsTitle || <>Six Reasons to <em>Choose</em> Gypsum</>}
              </h2>
              <p className="hp-body" style={{ maxWidth: '36rem' }}>{site.home.benefitsSubtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="hp-benefit-card"
                  style={{ animation: `hp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.1}s both` }}
                >
                  <img src={b.img} alt={b.label} />
                  <div className="hp-benefit-card-overlay" />
                  <div className="hp-benefit-card-body">
                    <div className="hp-benefit-icon"><b.icon size={20} color="#fff" /></div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>{b.label}</h3>
                    <p style={{ fontFamily: 'Jost', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PRODUCTS
        ══════════════════════════════════ */}
        <section className="hp-products">
          <div className="hp-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'end', marginBottom: '3rem', gap: '2rem' }}>
              <div>
                <div className="hp-section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Our products</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                  {site.home.productsTitle || <>Featured <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>Solutions</em></>}
                </h2>
              </div>
              <p style={{ fontFamily: 'Jost', fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 0 }}>
                {site.home.productsSubtitle || 'Premium gypsum products engineered for performance, aesthetics, and long-term value.'}
              </p>
            </div>

            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ height: '320px', borderRadius: '6px', background: 'rgba(255,255,255,0.2)', animation: 'hp-fade-in 0.4s ease both' }} />
                ))}
              </div>
            ) : services.length > 0 ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  {services.map((service, i) => (
                    <div
                      key={service.id}
                      className="hp-product-card"
                      style={{ animation: `hp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both` }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <img src={service.image || serviceImageFallbacks[i % serviceImageFallbacks.length]} alt={service.title} className="hp-product-card-img" />
                      </div>
                      <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
                        <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.35rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.5rem' }}>{service.title}</h3>
                        <p className="hp-body" style={{ fontSize: '0.9rem' }}>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/services" className="hp-cta-btn" style={{ background: '#fff', color: '#f97316', display: 'inline-flex' }}>
                  Explore All Products <ArrowRight size={15} />
                </Link>
              </>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Jost', textAlign: 'center' }}>No products available yet.</p>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════
            SOLUTIONS
        ══════════════════════════════════ */}
        <section className="hp-solutions">
          <div className="hp-container">
            <div style={{ marginBottom: '3.5rem' }}>
              <div className="hp-section-label">What we do</div>
              <h2 className="hp-section-title">
                {site.home.solutionsTitle || <>Tailored <em>Solutions</em> for Every Space</>}
              </h2>
              <p className="hp-body" style={{ maxWidth: '36rem' }}>{site.home.solutionsSubtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
              {[
                {
                  title: 'Residential Solutions',
                  desc: 'Transform home interiors with premium gypsum finishing. From smooth wall surfaces to decorative ceilings, we deliver the precision and aesthetics that elevate residential spaces.',
                  img: sectionImages.residential,
                  bullets: ['Interior wall finishes', 'Ceiling installations', 'Moisture-resistant applications'],
                },
                {
                  title: 'Commercial Solutions',
                  desc: 'Large-scale projects demand reliability and efficiency. Our commercial expertise ensures on-time delivery, minimal disruption, and professional-grade results.',
                  img: sectionImages.commercial,
                  bullets: ['Office building installations', 'Retail and hospitality spaces', 'Fire-rated partition systems'],
                },
              ].map((sol, i) => (
                <div key={i} style={{ animation: `hp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.15}s both` }}>
                  {/* Orange stripe above image */}
                  <div style={{ height: '4px', background: 'linear-gradient(90deg, #f97316, #fb923c)', marginBottom: '0' }} />
                  <div style={{ overflow: 'hidden' }}>
                    <img src={sol.img} alt={sol.title} className="hp-solution-img" />
                  </div>
                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.8rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.75rem' }}>{sol.title}</h3>
                    <p className="hp-body" style={{ marginBottom: '1.5rem' }}>{sol.desc}</p>
                    <div>
                      {sol.bullets.map((b, j) => (
                        <div key={j} className="hp-bullet">
                          <span className="hp-bullet-dot">—</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            INDUSTRIES WE SERVE
        ══════════════════════════════════ */}
        <section className="hp-industries">
          {/* Decorative bg image */}
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '20%', opacity: 0.06, pointerEvents: 'none' }}>
            <img src={sectionImages.industries} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="hp-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'end', marginBottom: '3.5rem' }}>
              <div>
                <div className="hp-section-label">Where we work</div>
                <h2 className="hp-section-title">Industries We <em>Serve</em></h2>
              </div>
              <p className="hp-body" style={{ marginBottom: 0 }}>Specialized expertise across diverse sectors and project types — from home interiors to large-scale industrial facilities.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {industries.map((ind, i) => (
                <div
                  key={i}
                  className="hp-industry-card"
                  style={{ animation: `hp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.06}s both` }}
                >
                  <img src={serviceImageFallbacks[i % serviceImageFallbacks.length]} alt={ind.name} className="hp-industry-img" />
                  {/* Blue overlay */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #1e40af, #3b82f6)' }} />
                  </div>
                  <div style={{ padding: '1.5rem 1.75rem 2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.6rem' }}>{ind.name}</h3>
                    <p className="hp-body" style={{ fontSize: '0.88rem', flexGrow: 1 }}>{ind.desc}</p>
                    <Link
                      href="/about"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.25rem', fontFamily: 'Jost', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', color: '#1e40af', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#f97316')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#1e40af')}
                    >
                      Learn More <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CTA BANNER
        ══════════════════════════════════ */}
        <section className="hp-cta">
          <div className="hp-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="hp-section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Ready to start?</div>
                <h2 className="hp-cta-title">
                  {site.contactPage.heroTitle || <>Let's Build Something <em>Extraordinary</em></>}
                </h2>
                <p style={{ fontFamily: 'Jost', fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginTop: '1rem', maxWidth: '28rem' }}>
                  {site.contactPage.heroSubtitle || 'Reach out today and let our experts craft the perfect plastering solution for your space.'}
                </p>
                <Link href="/contact" className="hp-cta-btn">
                  Get a Free Quote <ArrowRight size={15} />
                </Link>
              </div>

              {/* CTA image */}
              <div style={{
                position: 'relative', height: '320px', borderRadius: '8px', overflow: 'hidden',
                boxShadow: '0 32px 64px rgba(0,0,0,0.3)',
                animation: 'hp-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both',
              }}>
                <img src={site.contactPage.heroImage || CONTACT_HERO_IMAGE} alt="Contact" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,58,138,0.5), transparent)' }} />
                {/* Floating label */}
                <div style={{
                  position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                  background: '#f97316', color: '#fff', padding: '0.75rem 1.25rem',
                  fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1rem', fontWeight: 700, fontStyle: 'italic',
                  borderRadius: '2px',
                }}>
                  Free Consultation
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}