'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WORK_HERO_IMAGE = '/images/commercial-project.jpg';
const WORK_CTA_IMAGE = '/images/renovation-before-after.jpg';

const projects = [
  {
    id: 1,
    title: 'Metropolitan Office Complex',
    category: 'Commercial',
    scope: 'Interior Finishing, Fire-Rated Systems',
    description: 'Complete gypsum finishing for a 250,000 sq ft modern office building. Delivered fire-rated partition systems, premium wall finishes, and suspended ceiling installations across 15 floors.',
    results: ['On-time delivery', '99% client satisfaction', 'Zero safety incidents'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Luxury Residential Tower',
    category: 'Residential',
    scope: 'Unit Finishing, Moisture Solutions',
    description: 'Interior finishing for 200+ residential units. Implemented moisture-resistant gypsum solutions in all bathrooms and kitchens, ensuring long-term durability in a coastal climate.',
    results: ['Zero warranty claims', 'Premium finishing quality', 'Ahead of schedule'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c432b0c?w=1200&h=800&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Five-Star Hotel Renovation',
    category: 'Hospitality',
    scope: 'Renovation, Acoustic Solutions, Design',
    description: 'Complete gypsum system upgrade for a premium hotel property. Installed sound-insulating solutions, moisture-resistant boards in wet areas, and custom ceiling designs for guest rooms.',
    results: ['Enhanced guest experience', 'Improved acoustic performance', 'Maintained luxury standards'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15c64b417?w=1200&h=800&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Healthcare Facility Expansion',
    category: 'Healthcare',
    scope: 'Fire-Rated Systems, Sanitary Solutions',
    description: 'High-performance gypsum systems for a new medical facility. Implemented cleanroom-standard installations with fire-rated and moisture-resistant specifications.',
    results: ['Met medical facility standards', 'Infection control compliance', 'Seamless operation handover'],
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1200&h=800&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'Educational Campus Modernization',
    category: 'Education',
    scope: 'Classroom Finishing, Acoustic Treatment',
    description: 'Sound-insulated classroom systems for a new educational building. Created optimal learning environments with acoustic panels, premium finishes, and durable gypsum solutions.',
    results: ['Improved learning acoustics', 'Durability for high-traffic areas', 'Faculty satisfaction'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80'
  },
  {
    id: 6,
    title: 'Retail Center Development',
    category: 'Commercial',
    scope: 'Interior Finishing, Aesthetic Design',
    description: 'Comprehensive gypsum finishing for a multi-unit retail center. Delivered varied aesthetic finishes for different tenant spaces while maintaining structural consistency.',
    results: ['Ahead of schedule', 'Tenant satisfaction', 'Quality consistency'],
    image: 'https://images.unsplash.com/photo-1565182409498-7207267562da?w=1200&h=800&fit=crop&q=80'
  }
];

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(181,144,90,0.18),_transparent_28%),linear-gradient(180deg,#f8f1e6_0%,#f0e3d6_100%)] py-24 sm:py-36 text-foreground">
          <div className="absolute inset-0 opacity-60">
            <img
              src={WORK_HERO_IMAGE}
              alt=""
              className="h-full w-full object-cover grayscale blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white/95"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="mb-8 inline-flex rounded-full border border-accent/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent shadow-sm shadow-accent/10 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                Our Work
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Projects That Transform Spaces
              </h1>
              <p className="text-lg max-w-3xl font-light leading-relaxed text-muted-foreground opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                Explore our portfolio of completed projects across residential, commercial, and specialized industries, showcasing quality craftsmanship and innovative gypsum solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 sm:py-32 bg-background flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fadeInUp"
                  style={{animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards'}}
                >
                  <div className="h-64 bg-muted overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className="absolute top-4 left-4 text-xs font-semibold text-accent uppercase bg-primary/80 px-3 py-1 rounded">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent font-semibold mb-4">{project.scope}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                        Key Results
                      </p>
                      <ul className="space-y-2">
                        {project.results.map((result, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-accent mr-2">✓</span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-24 sm:py-32 bg-card border-t border-border">
          <div className="absolute inset-0 opacity-10">
            <img
              src={WORK_CTA_IMAGE}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 font-light leading-relaxed">
                Whether residential, commercial, or specialized, we have the expertise and experience to deliver excellence. Get a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    Explore Services
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
