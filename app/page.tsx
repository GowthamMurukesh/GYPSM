'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  testimonials: '/images/interior-finish.jpg',
  industries: '/images/fireproof-board.jpg',
  stats: '/images/hero-plastering.jpg',
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

export default function HomePage() {
  const { initializeAuth } = useAuthStore();
  const [services, setServices] = useState<Service[]>([]);
  const [site, setSite] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth on component mount
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
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(181,144,90,0.18),_transparent_28%),linear-gradient(180deg,#f8f1e6_0%,#f0e3d6_100%)] py-28 sm:py-44 text-foreground flex">
          <div className="absolute inset-0 opacity-60 border-red-800">
            {/* <img
              src={site.home.heroImage || HOME_HERO_IMAGE}
              alt=""
              className="h-full w-full object-cover grayscale blur-sm"
            /> */}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/95 dark:from-transparent dark:via-black/10 dark:to-black/90"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="mb-8 inline-block opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <span className="rounded-full border border-transparent bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-sm shadow-orange-500/20">
                  {site.home.heroBadge}
                </span>
              </div>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-[-0.03em] text-sky-800 opacity-0 animate-fadeInUp"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              >
                {site.home.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl mb-12 max-w-2xl font-light leading-relaxed text-muted-foreground opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                {site.home.heroSubtitle}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full border border-foreground/10 bg-sky-800 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:text-white"
                  >
                    {site.home.primaryCtaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full border border-foreground/10 bg-sky-800 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    {site.home.secondaryCtaLabel}
                  </Button>
                </Link>
              </div>
           
            </div>
          </div>
          <div className="opacity-0 animate-fadeInUp w-[calc(100%_-_2rem)]" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <div className="relative h-[520px] overflow-hidden border border-border bg-muted shadow-2xl shadow-black/10">
                  <img
                    src={site.home.heroImage || HOME_HERO_IMAGE}
                    alt="Hero image"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent" />
                </div>
           </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground text-sky-800">{site.home.whyTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {site.home.whySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-6 h-44 overflow-hidden rounded-md bg-muted">
                  <img
                    src={sectionImages.quality}
                    alt="Smooth premium gypsum wall finish"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-center w-14 h-14 rounded bg-accent/10 mb-6">
                  <Leaf className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground text-sky-800">100% Premium Quality</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We use only the finest materials meeting all industry standards for superior durability.
                </p>
              </div>

              <div className="p-8 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-6 h-44 overflow-hidden rounded-md bg-muted">
                  <img
                    src={sectionImages.support}
                    alt="Commercial construction support team on site"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-center w-14 h-14 rounded bg-accent/10 mb-6">
                  <Truck className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground text-sky-800">24/7 Support</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our dedicated team is always available when you need us, ensuring seamless project delivery.
                </p>
              </div>

              <div className="p-8 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-6 h-44 overflow-hidden rounded-md bg-muted">
                  <img
                    src={sectionImages.excellence}
                    alt="Modern ceiling installation with precise finishing"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-center w-14 h-14 rounded bg-accent/10 mb-6">
                  <Award className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground text-sky-800">Trusted Excellence</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Industry-leading standards and proven expertise ensuring exceptional results every time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 sm:py-32 bg-card border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground text-sky-800">{site.home.benefitsTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {site.home.benefitsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="relative overflow-hidden rounded-lg opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', minHeight: '300px' }}>
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop&q=80" alt="Time Saving" className="absolute inset-0 w-full h-full object-cover  hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/90 mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Time Saving</h3>
                  <p className="text-white/90 text-sm">Faster construction with minimal labour requirements</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg  opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', minHeight: '300px' }}>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop&q=80" alt="Less Wastage" className="absolute inset-0 w-full h-full object-cover  hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/90 mb-4">
                    <Droplet className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Less Wastage</h3>
                  <p className="text-white/90 text-sm">Significantly lower waste compared to traditional methods</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', minHeight: '300px' }}>
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop&q=80" alt="High Durability" className="absolute inset-0 w-full h-full object-cover  hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/90 mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">High Durability</h3>
                  <p className="text-white/90 text-sm">Enhanced fire, moisture and impact resistance</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative overflow-hidden rounded-lg  opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', minHeight: '300px' }}>
                <img src="https://images.unsplash.com/photo-1576021160550-112173f7f869?w=500&h=300&fit=crop&q=80" alt="Eco-Friendly" className="absolute inset-0 w-full h-full object-cover  hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/90 mb-4">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Eco-Friendly</h3>
                  <p className="text-white/90 text-sm">Non-toxic and environmentally sustainable products</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', minHeight: '300px' }}>
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop&q=80" alt="Cost Effective" className="absolute inset-0 w-full h-full object-cover  hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/90 mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Cost Effective</h3>
                  <p className="text-white/90 text-sm">Superior value with reduced construction expenses</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg  opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards', minHeight: '300px' }}>
                <img src="https://images.unsplash.com/photo-1565182409498-7207267562da?w=500&h=300&fit=crop&q=80" alt="Sound Control" className="absolute inset-0 w-full h-full object-cover  hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/90 mb-4">
                    <Volume2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Sound Control</h3>
                  <p className="text-white/90 text-sm">Superior acoustic insulation for peaceful spaces</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-20 sm:py-32 bg-background bg-orange-500 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground text-white">{site.home.productsTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {site.home.productsSubtitle}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : services.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      className="overflow-hidden rounded-lg border border-border bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                    >
                      <div className="h-56 bg-muted overflow-hidden relative">
                        <img
                          src={service.image || serviceImageFallbacks[index % serviceImageFallbacks.length]}
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-foreground">{service.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/services">
                  <Button variant="outline" className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent">
                    Explore All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <p className="text-muted-foreground text-center">No products available yet.</p>
            )}
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 sm:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground text-sky-800">{site.home.solutionsTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {site.home.solutionsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <div className="mb-8 h-72 overflow-hidden rounded-lg border border-border bg-muted">
                  <img
                    src={sectionImages.residential}
                    alt="Residential interior renovation with new gypsum finishing"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Residential Solutions</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Transform home interiors with premium gypsum finishing. From smooth wall surfaces to decorative ceilings, we deliver the precision and aesthetics that elevate residential spaces.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent font-bold mr-3">•</span>
                    <span className="text-muted-foreground">Interior wall finishes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent font-bold mr-3">•</span>
                    <span className="text-muted-foreground">Ceiling installations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent font-bold mr-3">•</span>
                    <span className="text-muted-foreground">Moisture-resistant applications</span>
                  </li>
                </ul>
              </div>

              <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <div className="mb-8 h-72 overflow-hidden rounded-lg border border-border bg-muted">
                  <img
                    src={sectionImages.commercial}
                    alt="Large commercial interior prepared for gypsum systems"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Commercial Solutions</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Large-scale projects demand reliability and efficiency. Our commercial expertise ensures on-time delivery, minimal disruption, and professional-grade results.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent font-bold mr-3">•</span>
                    <span className="text-muted-foreground">Office building installations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent font-bold mr-3">•</span>
                    <span className="text-muted-foreground">Retail and hospitality spaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent font-bold mr-3">•</span>
                    <span className="text-muted-foreground">Fire-rated partition systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Client Case Studies Section
        <section className="py-20 sm:py-32 bg-card border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Client Success Stories</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Real results from real projects across residential and commercial sectors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Modern Office Complex',
                  category: 'Commercial',
                  description: 'Completed 250,000 sq ft of office space with fire-rated partitions and premium finishes in 6 months',
                  result: 'Delivered on schedule with 99% client satisfaction',
                  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80'
                },
                {
                  title: 'Residential Tower Development',
                  category: 'Residential',
                  description: 'Interior finishing for 200+ apartment units with moisture-resistant gypsum solutions',
                  result: 'Enhanced durability with zero moisture-related issues reported',
                  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c432b0c?w=800&h=600&fit=crop&q=80'
                },
                {
                  title: 'Hospitality Renovation',
                  category: 'Commercial',
                  description: 'Complete gypsum refurbishment of luxury hotel with acoustic insulation upgrades',
                  result: 'Improved guest experience with enhanced sound control and aesthetics',
                  image: 'https://images.unsplash.com/photo-1579684385127-1ef15c64b417?w=800&h=600&fit=crop&q=80'
                }
              ].map((caseStudy, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="h-48 bg-muted overflow-hidden">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-accent uppercase tracking-widest">{caseStudy.category}</span>
                    <h3 className="text-lg font-bold mt-2 mb-2 text-foreground">{caseStudy.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{caseStudy.description}</p>
                    <div className="border-t border-border pt-4 mt-4">
                      <p className="text-sm font-semibold text-accent">{caseStudy.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section className="py-20 sm:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">What Our Clients Say</h2>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Trusted by industry leaders across residential and commercial sectors
                </p>
              </div>
              <div className="h-56 overflow-hidden rounded-lg border border-border bg-muted">
                <img
                  src={sectionImages.testimonials}
                  alt="Minimal luxury interior finished with smooth gypsum walls"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: 'Royal Gypsum transformed our office space with exceptional craftsmanship and attention to detail. The fire-rated partition system exceeded our building code requirements and looks beautiful.',
                  author: 'Michael Chen',
                  role: 'Facilities Manager'
                },
                {
                  quote: 'Working with Royal Gypsum was a game-changer for our hotel renovation. Their moisture-resistant solutions in our bathrooms have been flawless, and guests notice the quality finishes.',
                  author: 'Sarah Mitchell',
                  role: 'Hotel Owner'
                },
                {
                  quote: 'The team delivered our residential project on time and on budget. Their expertise in selecting the right gypsum solutions for our climate was invaluable.',
                  author: 'James Rodriguez',
                  role: 'Construction Manager'
                },
                {
                  quote: 'Outstanding professionalism and quality. Royal Gypsum handles everything from consultation to final touch-ups with the same level of excellence.',
                  author: 'Emma Thompson',
                  role: 'Property Developer'
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="p-8 bg-card rounded-lg border border-border opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <p className="text-muted-foreground italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-accent">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */ }

        {/* Industries We Serve */}
        <section className="relative overflow-hidden py-20 sm:py-32 bg-card border-t border-border">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 opacity-10 lg:block">
            <img
              src={sectionImages.industries}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground text-sky-800">Industries We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Specialized expertise across diverse sectors and project types
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Residential', description: 'Homes and apartments' },
                { name: 'Commercial', description: 'Office and retail spaces' },
                { name: 'Hospitality', description: 'Hotels and resorts' },
                { name: 'Healthcare', description: 'Medical facilities' },
                { name: 'Education', description: 'Schools and universities' },
                { name: 'Industrial', description: 'Manufacturing facilities' },
                { name: 'Renovation', description: 'Building upgrades' },
                { name: 'New Construction', description: 'Ground-up projects' }
              ].map((industry, index) => (
                <div
                  key={index}
                  className="p-6 bg-background rounded-lg border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  <h3 className="font-semibold text-foreground mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 sm:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
              <div className="h-64 overflow-hidden rounded-lg border border-border bg-muted">
                <img
                  src={sectionImages.stats}
                  alt="Construction worker applying gypsum plaster finish"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground text-sky-800">By The Numbers</h2>
                <p className="text-lg text-muted-foreground">Proven track record of excellence and reliability</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Projects Completed' },
                { number: '98%', label: 'Client Satisfaction' },
                { number: '15+', label: 'Years in Business' },
                { number: '50+', label: 'Team Members' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-lg bg-card border border-border opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="text-5xl font-bold text-accent mb-2">{stat.number}</div>
                  <p className="text-foreground font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <img
              src={sectionImages.cta}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-primary/80"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
              <div>
                <span
                  className="inline-flex rounded-full border border-accent/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent shadow-sm shadow-accent/10 mb-6 opacity-0 animate-fadeInUp"
                  style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
                >
                  Contact
                </span>
                <h1
                  className="text-4xl sm:text-5xl font-bold mb-4 leading-tight opacity-0 animate-fadeInUp"
                  style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                  {site.contactPage.heroTitle}
                </h1>
                <p
                  className="text-lg max-w-2xl font-light leading-relaxed text-muted-foreground opacity-0 animate-fadeInUp"
                  style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
                >
                  {site.contactPage.heroSubtitle}
                </p>
              </div>

              <div
                className="relative h-72 rounded-[2rem] overflow-hidden border border-border bg-muted shadow-2xl shadow-black/10 opacity-0 animate-fadeInUp"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              >
                <img
                  src={site.contactPage.heroImage || CONTACT_HERO_IMAGE}
                  alt="Contact hero"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
