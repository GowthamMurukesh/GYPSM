import type { SiteContent } from './types';

export const SITE_CONTENT_COLLECTION = 'siteContent';
export const SITE_CONTENT_DOC_ID = 'main';

export const defaultSiteContent: SiteContent = {
  home: {
    heroImage: 'https://images.unsplash.com/photo-1541537227470-7db248c49ce5?w=1600&h=900&fit=crop&q=80',
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
  },
  about: {
    heroImage: 'https://images.unsplash.com/photo-1578926078328-123e187c6b5d?w=1600&h=900&fit=crop&q=80',
    heroBadge: 'Our Journey',
    heroTitle: 'About Royal Gypsum',
    heroSubtitle:
      'Discover the expertise and commitment behind our trusted plastering and gypsum solutions.',
  },
  servicesPage: {
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&h=900&fit=crop&q=80',
    heroBadge: 'Product Catalog',
    heroTitle: 'Our Product Range',
    heroSubtitle:
      'Specialized plastering and gypsum solutions engineered for superior performance, durability, and aesthetic excellence.',
  },
  contactPage: {
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop&q=80',
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
    home: pick(defaultSiteContent.home, 'home'),
    about: pick(defaultSiteContent.about, 'about'),
    servicesPage: pick(defaultSiteContent.servicesPage, 'servicesPage'),
    contactPage: pick(defaultSiteContent.contactPage, 'contactPage'),
  };
}
