'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/lib/authStore';
import { Phone, Mail, MapPin } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/siteDefaults';

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const contactsRef = collection(db, 'contacts');
      await addDoc(contactsRef, {
        ...formData,
        submittedAt: Timestamp.now(),
        status: 'new',
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit form';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(181,144,90,0.18),_transparent_28%),linear-gradient(180deg,#f8f1e6_0%,#f0e3d6_100%)] py-20 sm:py-28 text-foreground">
          <div className="absolute inset-0 opacity-60">
            {site.contactPage.heroImage && (
              <img
                src={site.contactPage.heroImage}
                alt=""
                className="h-full w-full object-cover grayscale blur-sm"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white/95"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-accent/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent shadow-sm shadow-accent/10 mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                Contact
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                {site.contactPage.heroTitle}
              </h1>
              <p className="text-lg max-w-2xl font-light leading-relaxed text-muted-foreground opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                {site.contactPage.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-24 bg-background flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold mb-8">{site.contactPage.sectionTitle}</h2>

                <Card className="p-6 mb-6">
                  <div className="flex gap-4 items-start">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href={`tel:${site.contactPage.phone.replace(/\s/g, '')}`}
                        className="text-accent hover:underline"
                      >
                        {site.contactPage.phone}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 mb-6">
                  <div className="flex gap-4 items-start">
                    <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${site.contactPage.email}`}
                        className="text-accent hover:underline"
                      >
                        {site.contactPage.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {site.contactPage.address}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                  {submitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800">
                        Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone (Optional)
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (234) 567-890"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project..."
                        rows={6}
                        className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
