import type { SiteContent } from './types';

export const SITE_CONTENT_COLLECTION = 'siteContent';
export const SITE_CONTENT_DOC_ID = 'main';

export const defaultSiteContent: SiteContent = {
  home: {
    heroImage: '/images/hero-plastering.jpg',
    heroBadge: 'Excellence in Every Layer',
    heroTitle: 'Premium Plastering Solutions',
    heroSubtitle:
      'We manufacture and deliver exceptional plastering and gypsum solutions for residential and commercial properties with superior quality and continuous support.',
    primaryCtaLabel: 'Get a Quote',
    secondaryCtaLabel: 'Learn More',
    whyTitle: 'Why Choose Royal Gypsum',
    whySubtitle: 'Superior quality meets exceptional service in every project',
    benefitsTitle: 'Smart Solutions for Smart Buildings',
    benefitsSubtitle:
      'Industry-leading benefits that transform your construction experience',
    productsTitle: 'Our Product Range',
    productsSubtitle:
      'Comprehensive selection of specialized plastering and gypsum solutions for every project requirement.',
    solutionsTitle: 'Our Solutions',
    solutionsSubtitle:
      'Specialized expertise tailored to different project needs and industry requirements',
    ctaTitle: 'Transform Your Space Today',
    ctaSubtitle:
      'Get a free consultation and personalized quote. Our expert team is ready to bring your vision to life with superior quality and professional service.',
    ctaPrimaryLabel: 'Get Free Quote',
    ctaSecondaryLabel: 'View Products',
    announcement: {
      enabled: true,
      title: 'Special Offer',
      message: 'Welcome! Click here to contact us for a free quote and priority service.',
    },
  },
  about: {
    heroImage: '/images/interior-finish.jpg',
    heroBadge: 'Our Journey',
    heroTitle: 'About Royal Gypsum',
    heroSubtitle:
      'Discover the expertise and commitment behind our trusted plastering and gypsum solutions.',
  },
  servicesPage: {
    heroImage: '/images/commercial-project.jpg',
    heroBadge: 'Product Catalog',
    heroTitle: 'Our Product Range',
    heroSubtitle:
      'Specialized plastering and gypsum solutions engineered for superior performance, durability, and aesthetic excellence.',
  },
  contactPage: {
    heroImage: '/images/renovation-before-after.jpg',
    heroTitle: 'Contact Us',
    heroSubtitle:
      "Get in touch with our team. We're here to answer your questions and provide a free quote.",
    sectionTitle: 'Get In Touch',
    phone: '+1 (234) 567-890',
    email: 'info@royalgypsum.com',
    address: '123 Business Street\nCity, State 12345\nUnited States',
  },
};

export function mergeSiteContent(raw: Record<string, unknown> | undefined): SiteContent {
  if (!raw) return defaultSiteContent;
  const pick = <T extends object>(def: T, key: string): T => ({
    ...def,
    ...(typeof raw[key] === 'object' && raw[key] !== null ? (raw[key] as T) : {}),
  });
  return {
    // ensure announcement merges
    home: {
      ...pick(defaultSiteContent.home, 'home'),
      ...(typeof raw['home'] === 'object' && raw['home'] !== null && (raw['home'] as any).announcement ? { announcement: (raw['home'] as any).announcement } : {}),
    },
    about: pick(defaultSiteContent.about, 'about'),
    servicesPage: pick(defaultSiteContent.servicesPage, 'servicesPage'),
    contactPage: pick(defaultSiteContent.contactPage, 'contactPage'),
  };
}
