import { PageContent, Service } from './types';

export const sampleServices: Service[] = [
  {
    id: 'drywall-installation',
    title: 'Professional Drywall Installation',
    description: 'Expert gypsum board installation for residential and commercial projects with precision finishing and seamless joints.',
    details: 'Our team specializes in complete drywall systems including framing, installation, taping, and finishing. We ensure every surface is perfectly smooth and ready for paint or wallpaper.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c432b0c?w=500&h=400&fit=crop&q=80',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: 'fireproof-solutions',
    title: 'Fire-Resistant Gypsum Board',
    description: 'Advanced fire-resistant gypsum products meeting all safety standards for commercial and residential applications.',
    details: 'Our fire-resistant boards are specially formulated to provide enhanced fire protection. Ideal for hospitals, schools, offices, and high-rise buildings.',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=400&fit=crop&q=80',
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: 'moisture-resistant',
    title: 'Moisture-Resistant Gypsum',
    description: 'Premium moisture-resistant boards perfect for bathrooms, kitchens, and wet areas with superior durability.',
    details: 'Water-resistant core prevents mold and mildew growth. Ideal for high-humidity environments with long-lasting protection.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=400&fit=crop&q=80',
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: 'acoustic-solutions',
    title: 'Sound-Control Gypsum Solutions',
    description: 'Advanced acoustic gypsum boards for superior noise reduction and sound insulation in commercial spaces.',
    details: 'High-performance acoustic panels absorb sound and reduce noise transmission. Perfect for offices, studios, and entertainment venues.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&q=80',
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: 'ceiling-systems',
    title: 'Suspended Ceiling Systems',
    description: 'Modern suspended ceiling installation with integrated HVAC, lighting, and acoustic treatment options.',
    details: 'Complete ceiling solutions including frame installation, panel placement, and integration with building systems.',
    image: 'https://images.unsplash.com/photo-1565182409498-7207267562da?w=500&h=400&fit=crop&q=80',
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: 'commercial-projects',
    title: 'Large Commercial Projects',
    description: 'Comprehensive gypsum solutions for commercial buildings, offices, and industrial facilities at scale.',
    details: 'From planning to execution, we handle large commercial projects with precision scheduling and quality assurance.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop&q=80',
    order: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: 'renovation-services',
    title: 'Complete Renovation Services',
    description: 'Full renovation support including drywall removal, replacement, and finishing for residential upgrades.',
    details: 'Transform your space with complete renovation solutions. We handle everything from demo to final finishing.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop&q=80',
    order: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: 'custom-finishing',
    title: 'Custom Finishing & Texture',
    description: 'Specialized finishing techniques including texture application, smooth finishes, and decorative treatments.',
    details: 'Expert application of various finishing styles to achieve your desired aesthetic and durability.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop&q=80',
    order: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  }
];

export const samplePages: PageContent[] = [
  {
    id: 'home',
    slug: 'home',
    title: 'Home',
    description: 'Premium plastering and gypsum solutions',
    content: '<h2>Welcome to Royal Gypsum Plastering</h2><p>Your trusted partner for premium plastering and gypsum solutions.</p>',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    published: true,
  },
  {
    id: 'about',
    slug: 'about',
    title: 'About Us',
    description: 'Learn about Royal Gypsum Plastering',
    content: `<h2>Our Story</h2>
<p>Royal Gypsum Plastering has been serving the construction industry with excellence for over 15 years. We specialize in providing high-quality gypsum and plastering solutions for residential and commercial projects.</p>

<h2>Our Mission</h2>
<p>To deliver superior quality plastering solutions with exceptional customer service and attention to detail on every project.</p>

<h2>Our Values</h2>
<ul>
<li><strong>Quality First:</strong> We use premium materials and proven techniques</li>
<li><strong>Professional Service:</strong> Our team is highly trained and experienced</li>
<li><strong>Customer Focused:</strong> Your satisfaction is our priority</li>
<li><strong>Reliable Delivery:</strong> We meet timelines and exceed expectations</li>
</ul>

<h2>Industry Certifications</h2>
<p>Our team is certified by leading industry organizations and regularly updates skills with the latest techniques and products.</p>`,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    published: true,
  }
];
