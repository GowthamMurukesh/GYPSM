'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/lib/authStore';
import { Phone, Mail, MapPin, ArrowRight, Send } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/siteDefaults';

const CONTACT_HERO_IMAGE = '/images/renovation-before-after.jpg';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const { initializeAuth } = useAuthStore();
  const [site, setSite] = useState<SiteContent>(defaultSiteContent);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe?.();
  }, [initializeAuth]);

  useEffect(() => {
    (async () => {
      try {
        const { getSiteContent } = await import('@/lib/firebaseUtils');
        setSite(await getSiteContent());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        submittedAt: Timestamp.now(),
        status: 'new',
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* ── Base ── */
        .cp { font-family: 'Jost', sans-serif; background: #ffffff; color: #1e3a8a; }

        /* ── Keyframes ── */
        @keyframes cp-fade-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cp-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cp-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes cp-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }

        .cp-a1 { animation: cp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .cp-a2 { animation: cp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .cp-a3 { animation: cp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .cp-a4 { animation: cp-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
        .cp-aimg { animation: cp-fade-in 1.1s ease 0.15s both; }

        /* ── Shared tokens ── */
        .cp-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #f97316;
        }
        .cp-section-label {
          display: flex; align-items: center; gap: 1rem;
          font-family: 'Jost', sans-serif; font-size: 0.7rem;
          letter-spacing: 0.22em; font-weight: 600; text-transform: uppercase;
          color: #f97316; margin-bottom: 1.25rem;
        }
        .cp-section-label::after {
          content: ''; display: block; height: 1px; width: 3rem; background: #f97316;
        }
        .cp-orange-line {
          display: block; height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
          transform-origin: left;
          animation: cp-line-grow 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both;
        }
        .cp-body {
          font-family: 'Jost', sans-serif; font-size: 0.95rem;
          font-weight: 300; line-height: 1.8; color: #374151;
        }
        .cp-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* ══════════════════════════════════════════
           HERO — split grid (mirrors ServicesPage)
        ══════════════════════════════════════════ */
        .cp-hero {
          position: relative; min-height: 72vh;
          display: grid; grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .cp-hero { grid-template-columns: 1fr; min-height: auto; }
          .cp-hero-img-col { display: none; }
        }
        .cp-hero-text-col {
          display: flex; flex-direction: column; justify-content: center;
          padding: 7rem 5rem 7rem 6rem;
          background: #ffffff; position: relative; z-index: 2;
        }
        @media (max-width: 900px) { .cp-hero-text-col { padding: 5rem 2rem; } }

        .cp-hero-img-col { position: relative; overflow: hidden; }
        .cp-hero-img-col img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .cp-hero-img-col::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, #ffffff 0%, transparent 18%);
          z-index: 1; pointer-events: none;
        }

        .cp-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 700; line-height: 1.06;
          color: #1e3a8a; letter-spacing: -0.01em;
        }
        .cp-hero-title em { font-style: italic; color: #f97316; }

        .cp-hero-accent {
          position: absolute; bottom: 3rem; right: 3rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem; font-weight: 700;
          color: rgba(249,115,22,0.08); line-height: 1;
          user-select: none;
          animation: cp-float 7s ease-in-out infinite; z-index: 0;
        }

        /* ══════════════════════════════════════════
           INFO BAND  (mirrors stat band in dark blue)
        ══════════════════════════════════════════ */
        .cp-band {
          background: #1e40af; padding: 2rem;
          display: flex; align-items: center; justify-content: center;
          gap: 4rem; flex-wrap: wrap;
        }
        .cp-band-item-icon {
          width: 2.5rem; height: 2.5rem;
          background: rgba(249,115,22,0.18);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cp-band-item-icon svg { color: #fb923c; }
        .cp-band-item-text {
          font-family: 'Jost', sans-serif; font-size: 0.82rem;
          font-weight: 400; color: rgba(255,255,255,0.85); letter-spacing: 0.03em;
        }
        .cp-band-item-text a { color: #fb923c; text-decoration: none; }
        .cp-band-item-text a:hover { text-decoration: underline; }
        .cp-band-item-label {
          font-family: 'Jost', sans-serif; font-size: 0.68rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); margin-bottom: 0.2rem;
        }
        .cp-band-divider { width: 1px; height: 2.5rem; background: rgba(255,255,255,0.15); }
        @media (max-width: 480px) { .cp-band-divider { display: none; } }

        /* ══════════════════════════════════════════
           MAIN CONTENT SECTION
        ══════════════════════════════════════════ */
        .cp-content-section { background: #f0f4ff; padding: 6rem 2rem; flex: 1; }

        /* ── Info cards (left column) ── */
        .cp-info-card {
          background: #ffffff; border-radius: 6px;
          border: 1px solid #e0e7ff;
          padding: 1.75rem 2rem;
          display: flex; align-items: flex-start; gap: 1.25rem;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          position: relative; overflow: hidden;
        }
        .cp-info-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, #f97316, #fb923c);
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
        }
        .cp-info-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(30,64,175,0.12); }
        .cp-info-card:hover::after { transform: scaleX(1); }

        .cp-info-icon {
          width: 2.75rem; height: 2.75rem; flex-shrink: 0;
          background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
          border-radius: 6px; display: flex; align-items: center; justify-content: center;
        }
        .cp-info-icon svg { color: #1e40af; }
        .cp-info-label {
          font-family: 'Jost', sans-serif; font-size: 0.68rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          color: #f97316; margin-bottom: 0.35rem;
        }
        .cp-info-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.1rem; font-weight: 600; color: #1e3a8a; line-height: 1.4;
        }
        .cp-info-value a { color: #1e3a8a; text-decoration: none; }
        .cp-info-value a:hover { color: #f97316; }

        /* ── Form card (right column) ── */
        .cp-form-card {
          background: #ffffff; border-radius: 6px;
          border: 1px solid #e0e7ff;
          padding: 2.5rem;
        }

        .cp-form-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem; font-weight: 700; color: #1e3a8a; line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .cp-form-title em { font-style: italic; color: #f97316; }

        /* ── Inputs ── */
        .cp-field-label {
          font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #374151; display: block; margin-bottom: 0.5rem;
        }
        .cp-input {
          width: 100%; padding: 0.75rem 1rem;
          border: 1px solid #e0e7ff; border-radius: 4px;
          background: #f8faff; color: #1e3a8a;
          font-family: 'Jost', sans-serif; font-size: 0.9rem; font-weight: 300;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .cp-input::placeholder { color: #9ca3af; }
        .cp-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
          background: #fff;
        }
        textarea.cp-input { resize: vertical; min-height: 140px; }

        /* ── Submit button ── */
        .cp-submit-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          width: 100%; padding: 1rem 2rem;
          background: linear-gradient(135deg, #1e40af, #1e3a8a);
          color: #fff;
          font-family: 'Jost', sans-serif; font-size: 0.78rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          border: none; border-radius: 2px; cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          position: relative; overflow: hidden;
        }
        .cp-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #f97316, #fb923c);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(249,115,22,0.3);
        }
        .cp-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* ── Feedback banners ── */
        .cp-success {
          padding: 1rem 1.25rem; border-radius: 4px;
          background: #ecfdf5; border: 1px solid #6ee7b7;
          font-family: 'Jost', sans-serif; font-size: 0.88rem; font-weight: 400;
          color: #065f46; margin-bottom: 1.5rem;
        }
        .cp-error {
          padding: 1rem 1.25rem; border-radius: 4px;
          background: #fff1f2; border: 1px solid #fda4af;
          font-family: 'Jost', sans-serif; font-size: 0.88rem; font-weight: 400;
          color: #9f1239; margin-bottom: 1.5rem;
        }

        /* ══════════════════════════════════════════
           CTA BANNER (mirrors ServicesPage)
        ══════════════════════════════════════════ */
        .cp-cta {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          padding: 5.5rem 2rem; position: relative; overflow: hidden; text-align: center;
        }
        .cp-cta::before {
          content: ''; position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            -45deg, transparent, transparent 20px,
            rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px
          );
        }
        .cp-cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 700;
          color: #fff; line-height: 1.1; letter-spacing: -0.01em;
          margin: 0.75rem 0 1rem;
        }
        .cp-cta-title em { font-style: italic; color: #fb923c; }
        .cp-cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-top: 1.75rem; padding: 1rem 2.5rem;
          background: #fff; color: #1e40af;
          font-family: 'Jost', sans-serif; font-size: 0.78rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; border-radius: 2px;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .cp-cta-btn:hover { background: #f97316; color: #fff; transform: translateY(-2px); }
      `}</style>

      <Header />
      <main className="cp flex flex-col min-h-screen">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section className="cp-hero">
          <div className="cp-hero-text-col">
            <span className="cp-hero-accent">✉</span>

            <div className="cp-a1">
              <span className="cp-eyebrow">Royal Gypsum Plastering</span>
              <span className="cp-orange-line mt-3 mb-6" style={{ width: '3.5rem' }} />
            </div>

            <div className="cp-a1" style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#f97316', color: '#fff', borderRadius: '9999px',
                padding: '0.45rem 1.1rem', fontFamily: 'Jost, sans-serif',
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                {site.contactPage.heroBadge || 'Get in Touch'}
              </span>
            </div>

            <h1 className="cp-hero-title cp-a2">
              {site.contactPage.heroTitle || (
                <><em>Let&apos;s Talk</em><br />About Your<br />Project</>
              )}
            </h1>

            <p className="cp-body cp-a3 mt-6" style={{ maxWidth: '28rem' }}>
              {site.contactPage.heroSubtitle || 'Reach out and our specialists will assess your space and recommend the perfect gypsum system — at no obligation.'}
            </p>

            {/* mini stats */}
            <div className="cp-a4 mt-10" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {[['24h', 'Response Time'], ['Free', 'Consultation'], ['98%', 'Satisfaction']].map(([num, lbl], i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 700, color: '#f97316', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'Jost', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#374151', fontWeight: 500, marginTop: '0.2rem' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image col */}
          <div className="cp-hero-img-col cp-aimg">
            <img
              src={site.contactPage.heroImage || CONTACT_HERO_IMAGE}
              alt="Contact Royal Gypsum"
            />
            <div style={{
              position: 'absolute', bottom: '3rem', left: '-1.5rem', zIndex: 2,
              background: '#f97316', color: '#fff', padding: '1.25rem 2rem',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.1rem', fontWeight: 700, fontStyle: 'italic',
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
            }}>
              Always Here to Help
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CONTACT INFO BAND
        ══════════════════════════════════ */}
        <div className="cp-band">
          {[
            {
              icon: <Phone size={18} />,
              label: 'Call Us',
              value: <a href={`tel:${(site.contactPage.phone || '').replace(/\s/g, '')}`}>{site.contactPage.phone || '+1 234 567 890'}</a>,
            },
            {
              icon: <Mail size={18} />,
              label: 'Email Us',
              value: <a href={`mailto:${site.contactPage.email}`}>{site.contactPage.email || 'hello@royalgypsum.com'}</a>,
            },
            {
              icon: <MapPin size={18} />,
              label: 'Visit Us',
              value: site.contactPage.address || '123 Plaster Lane, Dubai, UAE',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'contents' }}>
              {i > 0 && <div className="cp-band-divider" />}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="cp-band-item-icon">{item.icon}</div>
                <div>
                  <div className="cp-band-item-label">{item.label}</div>
                  <div className="cp-band-item-text">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════ */}
        <section className="cp-content-section">
          <div className="cp-container">
            {/* Section heading */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div className="cp-section-label">Reach out</div>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                fontWeight: 700, color: '#1e3a8a', lineHeight: 1.1,
                letterSpacing: '-0.01em', marginBottom: '0.75rem',
              }}>
                {site.contactPage.sectionTitle || (
                  <>Get in <em style={{ fontStyle: 'italic', color: '#f97316' }}>Touch</em></>
                )}
              </h2>
              <p className="cp-body" style={{ maxWidth: '36rem' }}>
                Fill in the form and one of our specialists will be in touch within 24 hours to discuss your project.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'start',
            }}>

              {/* ── Left: contact info cards ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {[
                  {
                    icon: <Phone size={20} />,
                    label: 'Phone',
                    value: (
                      <a href={`tel:${(site.contactPage.phone || '').replace(/\s/g, '')}`}>
                        {site.contactPage.phone || '+1 234 567 890'}
                      </a>
                    ),
                    delay: '0.1s',
                  },
                  {
                    icon: <Mail size={20} />,
                    label: 'Email',
                    value: (
                      <a href={`mailto:${site.contactPage.email}`}>
                        {site.contactPage.email || 'hello@royalgypsum.com'}
                      </a>
                    ),
                    delay: '0.2s',
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: 'Address',
                    value: site.contactPage.address || '123 Plaster Lane, Dubai, UAE',
                    delay: '0.3s',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="cp-info-card"
                    style={{ animation: `cp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${item.delay} both` }}
                  >
                    <div className="cp-info-icon">{item.icon}</div>
                    <div>
                      <div className="cp-info-label">{item.label}</div>
                      <div className="cp-info-value">{item.value}</div>
                    </div>
                  </div>
                ))}

                {/* Optional decorative quote card */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
                    borderRadius: '6px', padding: '2rem',
                    animation: 'cp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both',
                  }}
                >
                  <div style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.35rem', fontWeight: 600, fontStyle: 'italic',
                    color: '#fff', lineHeight: 1.45, marginBottom: '1rem',
                  }}>
                    &ldquo;Every project starts with a conversation.&rdquo;
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}>
                    <span style={{ display: 'block', height: '1px', width: '2rem', background: '#f97316' }} />
                    <span style={{ fontFamily: 'Jost', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                      Royal Gypsum Team
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Right: form card ── */}
              <div
                className="cp-form-card"
                style={{ animation: 'cp-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both', gridColumn: 'span 2' }}
              >
                <h3 className="cp-form-title">
                  Send Us a <em>Message</em>
                </h3>
                <span className="cp-orange-line mb-8" style={{ width: '3rem', marginTop: '0.75rem' }} />

                {submitted && (
                  <div className="cp-success">
                    ✓ &nbsp;Thank you! Your message has been sent. We&apos;ll be in touch within 24 hours.
                  </div>
                )}
                {error && (
                  <div className="cp-error">
                    ✕ &nbsp;{error}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label htmlFor="name" className="cp-field-label">Name</label>
                      <input
                        id="name" name="name" className="cp-input"
                        value={formData.name} onChange={handleChange}
                        required placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="cp-field-label">Email</label>
                      <input
                        id="email" name="email" type="email" className="cp-input"
                        value={formData.email} onChange={handleChange}
                        required placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="cp-field-label">
                      Phone <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0, fontSize: '0.78rem', color: '#9ca3af' }}>(optional)</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" className="cp-input"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="cp-field-label">Message</label>
                    <textarea
                      id="message" name="message" className="cp-input"
                      value={formData.message} onChange={handleChange}
                      required placeholder="Tell us about your project — location, scope, timeline..."
                      rows={6}
                    />
                  </div>

                  <button type="submit" className="cp-submit-btn" disabled={submitting}>
                    {submitting ? 'Sending…' : (
                      <>Send Message <Send size={14} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CTA BANNER
        ══════════════════════════════════ */}
        <section className="cp-cta">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="cp-section-label" style={{ color: 'rgba(255,255,255,0.6)', justifyContent: 'center' }}>
              Ready to start?
              <span style={{ display: 'block', height: '1px', width: '3rem', background: 'rgba(249,115,22,0.6)' }} />
            </div>
            <h2 className="cp-cta-title">
              Explore Our <em>Services</em>
            </h2>
            <p style={{
              fontFamily: 'Jost', fontSize: '1rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
              maxWidth: '30rem', margin: '0 auto',
            }}>
              Browse our full range of gypsum plastering products and solutions, engineered for residential, commercial, and industrial applications.
            </p>
            <a href="/services" className="cp-cta-btn">
              View All Services <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}