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
        <section className="relative py-28 sm:py-44 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0">
            {site.home.heroImage && (
              <img
                src={site.home.heroImage}
                alt=""
                className="h-full w-full object-cover opacity-35"
              />
            )}
            <div className="absolute inset-0 bg-primary/70"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="mb-8 inline-block opacity-0 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">{site.home.heroBadge}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight opacity-0 animate-fadeInUp" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                {site.home.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl mb-12 opacity-80 font-light leading-relaxed max-w-2xl opacity-0 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                {site.home.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInUp" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    {site.home.primaryCtaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground/40 text-primary-foreground hover:bg-white/10 transition-all duration-300"
                  >
                    {site.home.secondaryCtaLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{site.home.whyTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {site.home.whySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-14 h-14 rounded bg-accent/10 mb-6">
                  <Leaf className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">100% Premium Quality</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We use only the finest materials meeting all industry standards for superior durability.
                </p>
              </div>

              <div className="p-8 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-14 h-14 rounded bg-accent/10 mb-6">
                  <Truck className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">24/7 Support</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our dedicated team is always available when you need us, ensuring seamless project delivery.
                </p>
              </div>

              <div className="p-8 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-14 h-14 rounded bg-accent/10 mb-6">
                  <Award className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Trusted Excellence</h3>
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
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{site.home.benefitsTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {site.home.benefitsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-6 opacity-0 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mx-auto mb-4">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Time Saving</h3>
                <p className="text-muted-foreground text-sm">Faster construction with minimal labour requirements</p>
              </div>

              <div className="text-center p-6 opacity-0 animate-fadeInUp" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mx-auto mb-4">
                  <Droplet className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Less Wastage</h3>
                <p className="text-muted-foreground text-sm">Significantly lower waste compared to traditional methods</p>
              </div>

              <div className="text-center p-6 opacity-0 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">High Durability</h3>
                <p className="text-muted-foreground text-sm">Enhanced fire, moisture and impact resistance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 opacity-0 animate-fadeInUp" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Eco-Friendly</h3>
                <p className="text-muted-foreground text-sm">Non-toxic and environmentally sustainable products</p>
              </div>

              <div className="text-center p-6 opacity-0 animate-fadeInUp" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mx-auto mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Cost Effective</h3>
                <p className="text-muted-foreground text-sm">Superior value with reduced construction expenses</p>
              </div>

              <div className="text-center p-6 opacity-0 animate-fadeInUp" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mx-auto mb-4">
                  <Volume2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Sound Control</h3>
                <p className="text-muted-foreground text-sm">Superior acoustic insulation for peaceful spaces</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-20 sm:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{site.home.productsTitle}</h2>
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
                      style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards'}}
                    >
                      {service.image && (
                        <div className="h-56 bg-muted overflow-hidden relative">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                      )}
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
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{site.home.solutionsTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {site.home.solutionsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="opacity-0 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
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

              <div className="opacity-0 animate-fadeInUp" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
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

        {/* Client Case Studies Section */}
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
                  image: '/images/commercial-project.jpg'
                },
                {
                  title: 'Residential Tower Development',
                  category: 'Residential',
                  description: 'Interior finishing for 200+ apartment units with moisture-resistant gypsum solutions',
                  result: 'Enhanced durability with zero moisture-related issues reported',
                  image: '/images/interior-finish.jpg'
                },
                {
                  title: 'Hospitality Renovation',
                  category: 'Commercial',
                  description: 'Complete gypsum refurbishment of luxury hotel with acoustic insulation upgrades',
                  result: 'Improved guest experience with enhanced sound control and aesthetics',
                  image: '/images/renovation-before-after.jpg'
                }
              ].map((caseStudy, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fadeInUp"
                  style={{animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards'}}
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
        <section className="py-20 sm:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Trusted by industry leaders across residential and commercial sectors
              </p>
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
                  style={{animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards'}}
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
        </section>

        {/* Industries We Serve */}
        <section className="py-20 sm:py-32 bg-card border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Industries We Serve</h2>
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
                  style={{animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards'}}
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
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">By The Numbers</h2>
              <p className="text-lg text-muted-foreground">Proven track record of excellence and reliability</p>
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
                  style={{animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards'}}
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
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                {site.home.ctaTitle}
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-10 font-light leading-relaxed">
                {site.home.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {site.home.ctaPrimaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground/40 text-primary-foreground hover:bg-white/10 transition-all duration-300"
                  >
                    {site.home.ctaSecondaryLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
