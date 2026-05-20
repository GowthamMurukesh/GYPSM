'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const solutions = [
  {
    id: 1,
    title: 'Interior Finishing',
    subtitle: 'Precision, carefully executed.',
    description: 'Premium gypsum wall finishes that create smooth, beautiful surfaces. From standard finishes to custom textures, we deliver the aesthetic quality your project demands.',
    details: [
      'Smooth drywall finishing',
      'Custom texture applications',
      'Joint taping and mudding',
      'Paint-ready surfaces',
      'Quality assurance inspections'
    ],
    benefits: 'Creates flawless interior surfaces that enhance property value and aesthetic appeal.'
  },
  {
    id: 2,
    title: 'Ceiling Systems',
    subtitle: 'Overhead excellence.',
    description: 'Suspended ceiling installations that combine functionality with design. Perfect acoustic control, fire resistance, and maintenance access in one elegant solution.',
    details: [
      'Suspended ceiling grids',
      'Acoustic tile installation',
      'Integrated lighting solutions',
      'Fire-rated systems',
      'Accessibility features'
    ],
    benefits: 'Optimizes space acoustics, improves lighting distribution, and simplifies maintenance access.'
  },
  {
    id: 3,
    title: 'Fire-Rated Partitions',
    subtitle: 'Safety meets style.',
    description: 'Advanced fire-resistant gypsum systems designed to meet building codes and protect occupants. High-performance solutions for commercial and institutional projects.',
    details: [
      'Type X fire-rated boards',
      'Multi-layer systems',
      'Building code compliance',
      'Professional installation',
      'Certification documentation'
    ],
    benefits: 'Ensures safety compliance while maintaining design flexibility and aesthetic appeal.'
  },
  {
    id: 4,
    title: 'Moisture-Resistant Solutions',
    subtitle: 'Durability in humid environments.',
    description: 'Green board and moisture-resistant gypsum specifically formulated for bathrooms, kitchens, and other high-moisture areas. Long-lasting protection against water damage.',
    details: [
      'Moisture-resistant boards',
      'Waterproof membranes',
      'Vapor barrier systems',
      'Bathroom wall finishing',
      'Kitchen backsplash support'
    ],
    benefits: 'Prevents moisture damage, mold growth, and structural deterioration in wet areas.'
  },
  {
    id: 5,
    title: 'Sound Insulation',
    subtitle: 'Acoustic performance, perfectly tuned.',
    description: 'Advanced soundproofing systems that create peaceful, acoustically optimized environments. Ideal for offices, studios, hospitals, and hospitality venues.',
    details: [
      'Acoustic insulation materials',
      'Sound-dampening boards',
      'Multi-layer wall systems',
      'Decibel reduction technology',
      'Testing and verification'
    ],
    benefits: 'Reduces noise transmission, improves focus, and enhances overall user comfort.'
  },
  {
    id: 6,
    title: 'Custom Design Solutions',
    subtitle: 'Tailored to your vision.',
    description: 'Specialized gypsum applications for unique architectural requirements. From curved installations to decorative finishes, we bring creative designs to life.',
    details: [
      'Curved gypsum installations',
      'Decorative finishes',
      'Architectural elements',
      '3D wall treatments',
      'Custom lighting integration'
    ],
    benefits: 'Transforms spaces with distinctive design elements that reflect your brand identity.'
  }
];

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(181,144,90,0.18),_transparent_28%),linear-gradient(180deg,#f8f1e6_0%,#f0e3d6_100%)] py-24 sm:py-36 text-foreground">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white/95"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="mb-8 inline-flex rounded-full border border-accent/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent shadow-sm shadow-accent/10 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                Solutions
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Specialized Solutions for Every Need
              </h1>
              <p className="text-lg max-w-3xl font-light leading-relaxed text-muted-foreground opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                From interior finishing to advanced fire-rated systems, we offer comprehensive gypsum solutions engineered for performance and designed for excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 sm:py-32 bg-background flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className={`mb-20 pb-20 border-b border-border last:border-b-0 opacity-0 animate-fadeInUp`}
                style={{animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards'}}
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-accent uppercase tracking-widest">Solution {solution.id.toString().padStart(2, '0')}</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-foreground">{solution.title}</h2>
                    <p className="text-lg text-accent font-light mb-6 italic">{solution.subtitle}</p>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {solution.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {solution.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-accent font-bold mr-3">•</span>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-card rounded-lg border border-border p-6 mb-8">
                      <p className="text-sm font-semibold uppercase tracking-widest text-foreground mb-2">Why It Matters</p>
                      <p className="text-muted-foreground">{solution.benefits}</p>
                    </div>

                    <Link href="/contact">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 transform hover:scale-105">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Image Placeholder */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="rounded-lg overflow-hidden bg-card border border-border h-96">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-accent/30 mb-4">{solution.id}</div>
                          <p className="text-muted-foreground font-medium">{solution.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Integration CTA */}
        <section className="py-20 sm:py-32 bg-card border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Find Your Perfect Solution</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Each solution is designed to address specific challenges while maintaining our commitment to quality, sustainability, and customer satisfaction.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Expert Consultation</h3>
                    <p className="text-sm text-muted-foreground">Our team evaluates your project needs and recommends the optimal solution.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Custom Implementation</h3>
                    <p className="text-sm text-muted-foreground">Solutions are tailored to your specific requirements and site conditions.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Ongoing Support</h3>
                    <p className="text-sm text-muted-foreground">We provide guidance and support throughout your project lifecycle.</p>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-lg border border-border p-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Ready to Discuss Your Project?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Let's explore which solutions best fit your vision. Our experts are ready to guide you through the process.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    Start Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
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
