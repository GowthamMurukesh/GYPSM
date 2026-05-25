'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
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
          // Set default content if not found in DB
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
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(181,144,90,0.18),_transparent_28%),linear-gradient(180deg,#f8f1e6_0%,#f0e3d6_100%)] py-24 sm:py-36 text-foreground">
          <div className="absolute inset-0 opacity-60">
            <img
              src={site.about.heroImage || ABOUT_HERO_IMAGE}
              alt=""
              className="h-full w-full object-cover grayscale blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white/95"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="mb-8 inline-flex rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent shadow-sm shadow-accent/10 opacity-0 animate-fadeInUp text-white" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                {site.about.heroBadge}
              </div>
              <h1 className="text-5xl text-[#130CB7] sm:text-6xl font-bold mb-6 leading-tight opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                {site.about.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl max-w-3xl font-light leading-relaxed text-muted-foreground opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                {site.about.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 sm:py-32 bg-background flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading page content...</p>
            ) : page ? (
              <div className="max-w-6xl mx-auto">
                {/* <div className="mb-8 h-80 overflow-hidden rounded-lg border border-border bg-muted opacity-0 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
                  <img
                    src={aboutSectionImages.story}
                    alt="Professional gypsum plastering team applying a smooth wall finish"
                    className="h-full w-full object-cover"
                  />
                </div> */}
                <div className="bg-card rounded-lg  md:opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <p className="text-lg sm:text-xl max-w-3xl font-light leading-relaxed text-muted-foreground opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                      {site.about.heroSubtitle}
                    </p>
                    {/* <style>{`
                      .prose h2 {
                        @apply text-3xl font-bold text-foreground mt-10 mb-4;
                      }
                      .prose h3 {
                        @apply text-xl font-semibold text-foreground mt-6 mb-2;
                      }
                      .prose p {
                        @apply text-muted-foreground leading-relaxed mb-4;
                      }
                      .prose ul {
                        @apply text-muted-foreground list-disc list-inside space-y-2;
                      }
                      .prose li {
                        @apply text-muted-foreground;
                      }
                    `}</style> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: page.content }} /> */}
                  </div>
                </div>

                {/* Stats Section */}
                <div className="mt-20">
                  <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
                    <h2 className="text-4xl font-bold text-foreground">Why Companies Trust Us</h2>
                    <div className="h-48 overflow-hidden rounded-lg border border-border bg-muted">
                      <img
                        src={aboutSectionImages.stats}
                        alt="Commercial gypsum project with premium interior construction"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { number: '15+', label: 'Years in Business' },
                      { number: '500+', label: 'Projects Completed' },
                      { number: '98%', label: 'Client Satisfaction' },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="text-center p-8 rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300 opacity-0 animate-fadeInUp"
                        style={{ animationDelay: `${0.3 + i * 0.1}s`, animationFillMode: 'forwards' }}
                      >
                        <div className="text-4xl font-bold text-accent mb-3">{stat.number}</div>
                        <p className="text-foreground font-semibold">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Section */}
                <div className="mt-20">
                  <h2 className="text-4xl font-bold mb-12 text-center">Our Expert Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="text-center p-8 rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 opacity-0 animate-fadeInUp"
                        style={{ animationDelay: `${0.6 + i * 0.1}s`, animationFillMode: 'forwards' }}
                      >
                        <div className="w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full bg-muted ring-4 ring-accent/10">
                          <img
                            src={aboutSectionImages.team[i - 1]}
                            alt={`Royal Gypsum expert team member ${i}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Expert Team Member</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Dedicated professional with extensive experience in premium plastering solutions.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Page not found</p>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
