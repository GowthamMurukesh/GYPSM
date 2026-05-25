'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/lib/authStore';
import { PageContent, SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/siteDefaults';

const ABOUT_HERO_IMAGE = '/images/interior-finish.jpg';
const aboutSectionImages = {
  story: '/images/hero-plastering.jpg',
  stats: '/images/commercial-project.jpg',
  team: [
    '/images/interior-finish.jpg',
    '/images/ceiling-installation.jpg',
    '/images/renovation-before-after.jpg',
  ],
};

const stats = [
  { number: '15+', label: 'Years in Business', desc: 'Serving the region since 2010' },
  { number: '500+', label: 'Projects Completed', desc: 'Residential & commercial' },
  { number: '98%', label: 'Client Satisfaction', desc: 'Verified by post-project surveys' },
];

const teamMembers = [
  { title: 'Lead Plasterer', desc: 'Master craftsman with 18 years of decorative & structural plastering expertise.' },
  { title: 'Project Manager', desc: 'Ensures every project is delivered on time, on budget, without compromise.' },
  { title: 'Design Consultant', desc: 'Bridges creative vision with technical execution for bespoke interiors.' },
];

export default function AboutPage() {
  const { initializeAuth } = useAuthStore();
  const [page, setPage] = useState<PageContent | null>(null);
  const [site, setSite] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe?.();
  }, [initializeAuth]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { getPageBySlug, getSiteContent } = await import('@/lib/firebaseUtils');
        const [pageData, siteData] = await Promise.all([getPageBySlug('about'), getSiteContent()]);
        setSite(siteData);
        if (pageData) {
          setPage(pageData);
        } else {
          setPage({
            id: '',
            slug: 'about',
            title: 'About Royal Gypsum',
            description: 'Learn about our company and mission',
            content: `
              <h2>Our Story</h2>
              <p>Royal Gypsum Plastering has been serving the community since 2010, delivering exceptional plastering and gypsum services to residential and commercial clients.</p>
              <h2>Our Mission</h2>
              <p>We are committed to providing superior craftsmanship, reliable service, and innovative solutions for all your plastering needs.</p>
              <h2>Why Choose Us</h2>
              <ul>
                <li>Experienced team of licensed professionals</li>
                <li>Premium quality materials</li>
                <li>Competitive pricing</li>
                <li>Customer satisfaction guarantee</li>
              </ul>
            `,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'system',
            updatedBy: 'system',
            published: true,
          });
        }
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .rg-page { font-family: 'Jost', sans-serif; background: #ffffff; color: #1e3a8a; }

        /* ── Keyframes ── */
        @keyframes rg-fade-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rg-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes rg-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes rg-slide-right {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes rg-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }

        .rg-anim-1 { animation: rg-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .rg-anim-2 { animation: rg-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .rg-anim-3 { animation: rg-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .rg-anim-4 { animation: rg-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
        .rg-anim-5 { animation: rg-slide-right 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .rg-anim-img { animation: rg-fade-in 1.1s ease 0.15s both; }

        /* ── Hero ── */
        .rg-hero {
          position: relative;
          min-height: 92vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .rg-hero { grid-template-columns: 1fr; min-height: auto; }
          .rg-hero-img-col { display: none; }
        }

        .rg-hero-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7rem 5rem 7rem 6rem;
          background: #ffffff;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 900px) {
          .rg-hero-text-col { padding: 5rem 2rem; }
        }

        .rg-hero-img-col {
          position: relative;
          overflow: hidden;
        }
        .rg-hero-img-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* diagonal clip on image */
        .rg-hero-img-col::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #ffffff 0%, transparent 18%);
          z-index: 1;
          pointer-events: none;
        }

        /* Gold accent line */
        .rg-orange-line {
          display: block;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
          transform-origin: left;
          animation: rg-line-grow 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both;
        }

        .rg-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #f97316;
        }

        .rg-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3.2rem, 6vw, 5.5rem);
          font-weight: 700;
          line-height: 1.06;
          color: #1e3a8a;
          letter-spacing: -0.01em;
        }
        .rg-hero-title em {
          font-style: italic;
          color: #f97316;
        }

        /* ── Floating accent number ── */
        .rg-hero-accent-num {
          position: absolute;
          bottom: 3rem;
          right: 3rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 9rem;
          font-weight: 700;
          color: rgba(249,115,22,0.10);
          line-height: 1;
          user-select: none;
          animation: rg-float 7s ease-in-out infinite;
          z-index: 0;
        }

        /* ── Section label ── */
        .rg-section-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          font-weight: 600;
          text-transform: uppercase;
          color: #f97316;
          margin-bottom: 2rem;
        }
        .rg-section-label::after {
          content: '';
          display: block;
          height: 1px;
          width: 3rem;
          background: #f97316;
        }

        /* ── Story section ── */
        .rg-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: #fff;
        }
        @media (max-width: 768px) { .rg-story { grid-template-columns: 1fr; } }

        .rg-story-img {
          position: relative;
          min-height: 520px;
          overflow: hidden;
        }
        .rg-story-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* Gold overlay stripe */
        .rg-story-img::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #fb923c);
        }

        .rg-story-text {
          padding: 6rem 5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 900px) { .rg-story-text { padding: 3rem 2rem; } }

        .rg-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 700;
          line-height: 1.1;
          color: #1e3a8a;
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
        }
        .rg-section-title em { font-style: italic; color: #f97316; }

        .rg-body-text {
          font-family: 'Jost', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: #374151;
        }

        /* ── Prose overrides ── */
        .rg-prose h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .rg-prose h3 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #1e3a8a;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .rg-prose p {
          font-family: 'Jost', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.85;
          color: #374151;
          margin-bottom: 1rem;
        }
        .rg-prose ul {
          list-style: none;
          padding: 0;
          margin: 0.75rem 0 1rem;
        }
        .rg-prose li {
          font-family: 'Jost', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: #374151;
          padding: 0.45rem 0 0.45rem 1.6rem;
          position: relative;
          border-bottom: 1px solid #e0e7ff;
        }
        .rg-prose li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #f97316;
          font-weight: 600;
        }

        /* ── Stats ── */
        .rg-stats {
          background: #1e40af;
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .rg-stats::before {
          content: 'SINCE\A2010';
          white-space: pre;
          position: absolute;
          right: 4rem;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: 9rem;
          font-weight: 700;
          line-height: 1;
          color: rgba(255,255,255,0.06);
          text-align: right;
          pointer-events: none;
          user-select: none;
        }
        .rg-stat-number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 700;
          color: #fb923c;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .rg-stat-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
          margin-top: 0.5rem;
        }
        .rg-stat-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          margin-top: 0.25rem;
        }
        .rg-stat-divider {
          width: 1px;
          background: rgba(249,115,22,0.3);
          align-self: stretch;
        }
        @media (max-width: 768px) { .rg-stat-divider { display: none; } }

        /* ── Team ── */
        .rg-team { padding: 7rem 2rem; background: #f0f4ff; }

        .rg-team-card {
          background: #fff;
          border: 1px solid #e0e7ff;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          position: relative;
        }
        .rg-team-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .rg-team-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(30,64,175,0.12); }
        .rg-team-card:hover::after { transform: scaleX(1); }

        .rg-team-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          filter: grayscale(30%);
          transition: filter 0.4s ease;
        }
        .rg-team-card:hover .rg-team-img { filter: grayscale(0%); }

        .rg-team-body { padding: 1.75rem 2rem 2rem; }

        .rg-team-role {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f97316;
          margin-bottom: 0.5rem;
        }
        .rg-team-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e3a8a;
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }
        .rg-team-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.7;
          color: #374151;
        }

        /* ── CTA Banner ── */
        .rg-cta {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .rg-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.04) 20px,
            rgba(255,255,255,0.04) 21px
          );
        }
        .rg-cta-btn {
          display: inline-block;
          margin-top: 2rem;
          padding: 1rem 2.5rem;
          background: #fff;
          color: #1e40af;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .rg-cta-btn:hover { background: #f97316; color: #ffffff; transform: translateY(-2px); }

        /* ── Utility ── */
        .rg-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
      `}</style>

      <Header />
      <main className="rg-page flex flex-col min-h-screen">

        {/* ─────────────────── HERO ─────────────────── */}
        <section className="rg-hero">
          <div className="rg-hero-text-col">
            {/* Decorative large number */}
            <span className="rg-hero-accent-num">15</span>

            <div className="rg-anim-1">
              <span className="rg-eyebrow">Royal Gypsum Plastering</span>
              <span className="rg-orange-line mt-3 mb-6" style={{ width: '3.5rem' }} />
            </div>

            <h1 className="rg-hero-title rg-anim-2">
              {site.about.heroTitle || <>Craft That <em>Endures.</em><br />Teams That <em>Deliver.</em></>}
            </h1>

            <p className="rg-body-text rg-anim-3 mt-6 max-w-md" style={{ lineHeight: '1.85' }}>
              {site.about.heroSubtitle || 'For over fifteen years we have shaped spaces with precision, passion, and an unwavering commitment to the highest standards of the trade.'}
            </p>

            {/* <div className="rg-anim-4 mt-10 flex gap-8">
              <div>
                <div className="rg-stat-number" style={{ fontSize: '2.4rem' }}>500+</div>
                <div style={{ fontFamily: 'Jost', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>Projects</div>
              </div>
              <div style={{ width: '1px', background: '#e0e7ff' }} />
              <div>
                <div className="rg-stat-number" style={{ fontSize: '2.4rem' }}>98%</div>
                <div style={{ fontFamily: 'Jost', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>Satisfaction</div>
              </div>
              <div style={{ width: '1px', background: '#e0e7ff' }} />
              <div>
                <div className="rg-stat-number" style={{ fontSize: '2.4rem' }}>15+</div>
                <div style={{ fontFamily: 'Jost', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>Years</div>
              </div>
            </div> */}
          </div>

          {/* Right: Hero image */}
          <div className="rg-hero-img-col rg-anim-img">
            <img
              src={site.about.heroImage || ABOUT_HERO_IMAGE}
              alt="Royal Gypsum premium interior plastering"
            />
            {/* Orange accent badge overlay */}
            <div style={{
              position: 'absolute', bottom: '3rem', left: '-1.5rem', zIndex: 2,
              background: '#f97316', color: '#fff', padding: '1.25rem 2rem',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.1rem', fontWeight: 700, fontStyle: 'italic',
              boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
            }}>
              Est. 2010
            </div>
          </div>
        </section>

        {/* ─────────────────── STORY / CONTENT ─────────────────── */}
        <section className="rg-story">
          <div className="rg-story-img">
            <img src={aboutSectionImages.story} alt="Expert plastering in progress" />
          </div>
          <div className="rg-story-text">
            <div className="rg-section-label">Our Story</div>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[80, 100, 60, 90, 70].map((w, i) => (
                  <div key={i} style={{ height: '12px', borderRadius: '2px', background: '#e0e7ff', width: `${w}%`, animation: 'rg-fade-in 0.4s ease both', animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
            ) : page ? (
              <div className="rg-prose" dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <p className="rg-body-text">Page not found.</p>
            )}
          </div>
        </section>

        {/* ─────────────────── STATS ─────────────────── */}
        {/* <section className="rg-stats">
          <div className="rg-container">
            <div className="rg-section-label" style={{ color: '#f97316' }}>By the numbers</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0', alignItems: 'stretch', position: 'relative', zIndex: 1 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <div style={{
                    padding: '2.5rem 1.5rem',
                    borderLeft: i === 0 ? '1px solid rgba(249,115,22,0.2)' : 'none',
                    borderRight: '1px solid rgba(249,115,22,0.2)',
                    animation: `rg-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.15}s both`,
                  }}>
                    <div className="rg-stat-number">{s.number}</div>
                    <div className="rg-stat-label">{s.label}</div>
                    <div className="rg-stat-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ─────────────────── TEAM ─────────────────── */}
        <section className="rg-team">
          <div className="rg-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'end', marginBottom: '4rem', gap: '2rem' }}>
              <div>
                <div className="rg-section-label">The people behind the craft</div>
                <h2 className="rg-section-title">Our <em>Expert</em><br />Team</h2>
              </div>
              <p className="rg-body-text" style={{ marginBottom: 0 }}>
                Every project is shaped by experienced hands and sharp minds. Meet the professionals who bring your vision to life — with precision and pride.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="rg-team-card"
                  style={{ animation: `rg-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.15}s both` }}
                >
                  <img
                    src={aboutSectionImages.team[i]}
                    alt={`${member.title} at Royal Gypsum`}
                    className="rg-team-img"
                  />
                  <div className="rg-team-body">
                    <div className="rg-team-role">{member.title}</div>
                    <div className="rg-team-name">Expert Member</div>
                    <p className="rg-team-desc">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── CTA BANNER ─────────────────── */}
        <section className="rg-cta">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="rg-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Ready to start?</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#fff',
              marginTop: '0.75rem',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}>
              Let's Build Something<br /><em style={{ fontStyle: 'italic', opacity: 0.85 }}>Extraordinary</em>
            </h2>
            <a href="/contact" className="rg-cta-btn">Get a Free Quote</a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}