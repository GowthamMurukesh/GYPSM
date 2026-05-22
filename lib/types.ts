// User and Auth Types
export interface UserRole {
  admin: 'admin';
  editor: 'editor';
  viewer: 'viewer';
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: keyof UserRole;
  createdAt: Date;
  lastLogin?: Date;
  avatar?: string;
}

// Content Types
export interface PageContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  hero?: {
    image: string;
    title: string;
    subtitle: string;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  published: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  details: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  alt?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'read' | 'responded';
}

/** Firestore doc `siteContent/main` — edited at /admin/site */
export interface SiteHomeContent {
  heroImage?: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  whyTitle: string;
  whySubtitle: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  productsTitle: string;
  productsSubtitle: string;
  solutionsTitle: string;
  solutionsSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  announcement?: {
    enabled?: boolean;
    title?: string;
    message?: string;
  };
}

export interface SiteAboutHeroContent {
  heroImage?: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface SiteServicesPageContent {
  heroImage?: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface SiteContactPageContent {
  heroImage?: string;
  heroTitle: string;
  heroSubtitle: string;
  sectionTitle: string;
  phone: string;
  email: string;
  address: string;
}

export interface SiteContent {
  home: SiteHomeContent;
  about: SiteAboutHeroContent;
  servicesPage: SiteServicesPageContent;
  contactPage: SiteContactPageContent;
}
