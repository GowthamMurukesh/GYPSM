'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/lib/authStore';
import { Service, SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/siteDefaults';

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
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 sm:py-36 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0">
            {site.servicesPage.heroImage && (
              <img
                src={site.servicesPage.heroImage}
                alt=""
                className="h-full w-full object-cover opacity-35"
              />
            )}
            <div className="absolute inset-0 bg-primary/70"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-40"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 inline-block opacity-0 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">{site.servicesPage.heroBadge}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 opacity-0 animate-fadeInUp" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                {site.servicesPage.heroTitle}
              </h1>
              <p className="text-xl opacity-80 max-w-3xl font-light opacity-0 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                {site.servicesPage.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 sm:py-32 bg-background flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p className="text-center text-muted-foreground py-12">Loading products...</p>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="overflow-hidden rounded-lg border border-border bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col opacity-0 animate-fadeInUp"
                    style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards'}}
                  >
                    {service.image && (
                      <div className="h-64 bg-muted overflow-hidden relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                        {service.description}
                      </p>
                      {service.details && (
                        <div className="text-sm text-muted-foreground border-t border-border pt-4 mt-4">
                          <p className="leading-relaxed">{service.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Products will be available soon. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
