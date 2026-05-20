'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/lib/authStore';
import type { SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/siteDefaults';
import { storage } from '@/lib/firebase';
import { convertImageFileToWebP } from '@/lib/mediaUtils';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImagePlus, Save } from 'lucide-react';

export default function SiteEditorPage() {
  const { userProfile } = useAuthStore();
  const isViewer = userProfile?.role === 'viewer';
  const [site, setSite] = useState<SiteContent>(defaultSiteContent);
  const [aboutBody, setAboutBody] = useState({
    title: '',
    description: '',
    content: '',
    published: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { getSiteContent, getPageBySlugForEdit } = await import('@/lib/firebaseUtils');
        const [s, page] = await Promise.all([getSiteContent(), getPageBySlugForEdit('about')]);
        setSite(s);
        if (page) {
          setAboutBody({
            title: page.title,
            description: page.description,
            content: page.content,
            published: page.published,
          });
        } else {
          setAboutBody({
            title: 'About Royal Gypsum',
            description: 'Learn about our company and mission',
            content: '<h2>Our Story</h2><p>Edit your about page content here.</p>',
            published: true,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const uid = userProfile?.id || 'unknown';

  async function uploadSectionImage(file: File, folder: string): Promise<string> {
    const webpFile = await convertImageFileToWebP(file);
    const fileRef = ref(storage, `site/${folder}/${Date.now()}-${webpFile.name}`);
    await uploadBytes(fileRef, webpFile, { contentType: 'image/webp' });
    return getDownloadURL(fileRef);
  }

  async function handleHeroImageUpload(
    file: File | undefined,
    section: 'home' | 'about' | 'servicesPage' | 'contactPage'
  ) {
    if (!file) return;

    setSaving(true);
    setMessage(null);
    try {
      const url = await uploadSectionImage(file, section);
      setSite((s) => ({
        ...s,
        [section]: {
          ...s[section],
          heroImage: url,
        },
      }));
      setMessage('Image uploaded as WebP. Save this section to publish it.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Image upload failed');
    } finally {
      setSaving(false);
    }
  }

  async function saveHome() {
    setSaving(true);
    setMessage(null);
    try {
      const { saveSiteSection } = await import('@/lib/firebaseUtils');
      await saveSiteSection('home', site.home, uid);
      setMessage('Home section saved to Firebase.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function saveAbout() {
    setSaving(true);
    setMessage(null);
    try {
      const { saveSiteSection, savePageContent } = await import('@/lib/firebaseUtils');
      await saveSiteSection('about', site.about, uid);
      await savePageContent('about', {
        slug: 'about',
        title: aboutBody.title,
        description: aboutBody.description,
        content: aboutBody.content,
        createdBy: uid,
        updatedBy: uid,
        published: aboutBody.published,
      });
      setMessage('About hero and page content saved.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function saveServices() {
    setSaving(true);
    setMessage(null);
    try {
      const { saveSiteSection } = await import('@/lib/firebaseUtils');
      await saveSiteSection('servicesPage', site.servicesPage, uid);
      setMessage('Services page header saved.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function saveContact() {
    setSaving(true);
    setMessage(null);
    try {
      const { saveSiteSection } = await import('@/lib/firebaseUtils');
      await saveSiteSection('contactPage', site.contactPage, uid);
      setMessage('Contact page saved.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="py-12 text-center text-muted-foreground">Loading site content…</div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Website content</h1>
        <p className="text-muted-foreground">
          Edit text for Home, About, Services, and Contact. Changes are stored in Firebase (
          <code className="text-xs bg-muted px-1 rounded">siteContent/main</code>
          ). About main text is also saved to the <strong>pages</strong> collection (slug{' '}
          <code className="text-xs bg-muted px-1 rounded">about</code>).
        </p>
      </div>

      {message && (
        <Card className="p-4 text-sm border-accent/30 bg-accent/5">{message}</Card>
      )}

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-6 space-y-4">
          <Card className="p-6 space-y-4">
            <Field
              label="Hero badge (small line above title)"
              value={site.home.heroBadge}
              onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, heroBadge: v } }))}
              disabled={isViewer || saving}
            />
            <ImageField
              label="Hero image"
              value={site.home.heroImage}
              disabled={isViewer || saving}
              onFile={(file) => !isViewer && handleHeroImageUpload(file, 'home')}
              onClear={() => !isViewer && setSite((s) => ({ ...s, home: { ...s.home, heroImage: '' } }))}
            />
            <Field label="Hero title" value={site.home.heroTitle} onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, heroTitle: v } }))} disabled={isViewer || saving} />
            <div className="space-y-2">
              <Label>Hero subtitle</Label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.home.heroSubtitle}
                onChange={(e) => setSite((s) => ({ ...s, home: { ...s.home, heroSubtitle: e.target.value } }))}
                disabled={isViewer}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Primary button"
                value={site.home.primaryCtaLabel}
                onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, primaryCtaLabel: v } }))}
                disabled={isViewer || saving}
              />
              <Field
                label="Secondary button"
                value={site.home.secondaryCtaLabel}
                onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, secondaryCtaLabel: v } }))}
                disabled={isViewer || saving}
              />
            </div>
            <Field label="“Why choose” heading" value={site.home.whyTitle} onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, whyTitle: v } }))} disabled={isViewer || saving} />
            <Field
              label="“Why choose” subtitle"
              value={site.home.whySubtitle}
              onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, whySubtitle: v } }))}
              disabled={isViewer || saving}
            />
            <Field
              label="Benefits block title (icon grid)"
              value={site.home.benefitsTitle}
              onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, benefitsTitle: v } }))}
              disabled={isViewer || saving}
            />
            <div className="space-y-2">
              <Label>Benefits block subtitle</Label>
              <textarea
                className="w-full min-h-[72px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.home.benefitsSubtitle}
                onChange={(e) => setSite((s) => ({ ...s, home: { ...s.home, benefitsSubtitle: e.target.value } }))}
                disabled={isViewer}
              />
            </div>
            <Field
              label="Products section title"
              value={site.home.productsTitle}
              onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, productsTitle: v } }))}
              disabled={isViewer || saving}
            />
            <div className="space-y-2">
              <Label>Products section subtitle</Label>
              <textarea
                className="w-full min-h-[72px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.home.productsSubtitle}
                onChange={(e) => setSite((s) => ({ ...s, home: { ...s.home, productsSubtitle: e.target.value } }))}
                disabled={isViewer}
              />
            </div>
            <Field
              label="Solutions section title"
              value={site.home.solutionsTitle}
              onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, solutionsTitle: v } }))}
              disabled={isViewer || saving}
            />
            <div className="space-y-2">
              <Label>Solutions section subtitle</Label>
              <textarea
                className="w-full min-h-[72px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.home.solutionsSubtitle}
                onChange={(e) => setSite((s) => ({ ...s, home: { ...s.home, solutionsSubtitle: e.target.value } }))}
                disabled={isViewer}
              />
            </div>
            <Field label="Bottom CTA title" value={site.home.ctaTitle} onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, ctaTitle: v } }))} disabled={isViewer || saving} />
            <div className="space-y-2">
              <Label>Bottom CTA subtitle</Label>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.home.ctaSubtitle}
                onChange={(e) => setSite((s) => ({ ...s, home: { ...s.home, ctaSubtitle: e.target.value } }))}
                disabled={isViewer}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Bottom primary button"
                value={site.home.ctaPrimaryLabel}
                onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, ctaPrimaryLabel: v } }))}
                disabled={isViewer || saving}
              />
              <Field
                label="Bottom secondary button"
                value={site.home.ctaSecondaryLabel}
                onChange={(v) => setSite((s) => ({ ...s, home: { ...s.home, ctaSecondaryLabel: v } }))}
                disabled={isViewer || saving}
              />
            </div>
            <Button onClick={saveHome} disabled={saving || isViewer}>
              <Save className="h-4 w-4 mr-2" />
              {isViewer ? 'Read-only' : 'Save home'}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="mt-6 space-y-4">
          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Hero lines appear at the top of the public About page. Main story uses HTML below (must be{' '}
              <strong>Published</strong> to show on the site).
            </p>
            <Field
              label="Hero badge"
              value={site.about.heroBadge}
              onChange={(v) => setSite((s) => ({ ...s, about: { ...s.about, heroBadge: v } }))}
              disabled={isViewer || saving}
            />
            <ImageField
              label="Hero image"
              value={site.about.heroImage}
              disabled={isViewer || saving}
              onFile={(file) => !isViewer && handleHeroImageUpload(file, 'about')}
              onClear={() => !isViewer && setSite((s) => ({ ...s, about: { ...s.about, heroImage: '' } }))}
            />
            <Field
              label="Hero title"
              value={site.about.heroTitle}
              onChange={(v) => setSite((s) => ({ ...s, about: { ...s.about, heroTitle: v } }))}
              disabled={isViewer || saving}
            />
            <div className="space-y-2">
              <Label>Hero subtitle</Label>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.about.heroSubtitle}
                onChange={(e) => setSite((s) => ({ ...s, about: { ...s.about, heroSubtitle: e.target.value } }))}
                disabled={isViewer}
              />
            </div>
            <Field label="Page title (SEO)" value={aboutBody.title} onChange={(v) => setAboutBody((b) => ({ ...b, title: v }))} disabled={isViewer || saving} />
            <Field
              label="Short description"
              value={aboutBody.description}
              onChange={(v) => setAboutBody((b) => ({ ...b, description: v }))}
              disabled={isViewer || saving}
            />
            <div className="space-y-2">
              <Label>Main content (HTML)</Label>
              <textarea
                className="w-full min-h-[220px] font-mono text-sm rounded-md border border-input bg-background px-3 py-2"
                value={aboutBody.content}
                onChange={(e) => setAboutBody((b) => ({ ...b, content: e.target.value }))}
                disabled={isViewer}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={aboutBody.published}
                onChange={(e) => setAboutBody((b) => ({ ...b, published: e.target.checked }))}
                disabled={isViewer}
              />
              Published (visible on public site)
            </label>
            <Button onClick={saveAbout} disabled={saving || isViewer}>
              <Save className="h-4 w-4 mr-2" />
              {isViewer ? 'Read-only' : 'Save about'}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6 space-y-4">
          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Edits the top banner on the public Services page. Service cards still come from{' '}
              <strong>Admin → Services</strong>.
            </p>
            <Field
              label="Hero badge"
              value={site.servicesPage.heroBadge}
              onChange={(v) => setSite((s) => ({ ...s, servicesPage: { ...s.servicesPage, heroBadge: v } }))}
              disabled={isViewer || saving}
            />
            <ImageField
              label="Hero image"
              value={site.servicesPage.heroImage}
              disabled={isViewer || saving}
              onFile={(file) => !isViewer && handleHeroImageUpload(file, 'servicesPage')}
              onClear={() => !isViewer && setSite((s) => ({ ...s, servicesPage: { ...s.servicesPage, heroImage: '' } }))}
            />
            <Field
              label="Hero title"
              value={site.servicesPage.heroTitle}
              onChange={(v) => setSite((s) => ({ ...s, servicesPage: { ...s.servicesPage, heroTitle: v } }))}
              disabled={isViewer || saving}
            />
            <div className="space-y-2">
              <Label>Hero subtitle</Label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.servicesPage.heroSubtitle}
                onChange={(e) =>
                  setSite((s) => ({
                    ...s,
                    servicesPage: { ...s.servicesPage, heroSubtitle: e.target.value },
                  }))
                }
                disabled={isViewer}
              />
            </div>
            <Button onClick={saveServices} disabled={saving || isViewer}>
              <Save className="h-4 w-4 mr-2" />
              {isViewer ? 'Read-only' : 'Save services header'}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6 space-y-4">
          <Card className="p-6 space-y-4">
            <ImageField
              label="Hero image"
              value={site.contactPage.heroImage}
              disabled={isViewer || saving}
              onFile={(file) => !isViewer && handleHeroImageUpload(file, 'contactPage')}
              onClear={() => !isViewer && setSite((s) => ({ ...s, contactPage: { ...s.contactPage, heroImage: '' } }))}
            />
            <Field
              label="Hero title"
              value={site.contactPage.heroTitle}
              onChange={(v) => setSite((s) => ({ ...s, contactPage: { ...s.contactPage, heroTitle: v } }))}
              disabled={isViewer || saving}
            />
            <div className="space-y-2">
              <Label>Hero subtitle</Label>
              <textarea
                className="w-full min-h-[72px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.contactPage.heroSubtitle}
                onChange={(e) =>
                  setSite((s) => ({
                    ...s,
                    contactPage: { ...s.contactPage, heroSubtitle: e.target.value },
                  }))
                }
                disabled={isViewer}
              />
            </div>
            <Field
              label="Sidebar section title"
              value={site.contactPage.sectionTitle}
              onChange={(v) => setSite((s) => ({ ...s, contactPage: { ...s.contactPage, sectionTitle: v } }))}
              disabled={isViewer || saving}
            />
            <Field label="Phone (display)" value={site.contactPage.phone} onChange={(v) => setSite((s) => ({ ...s, contactPage: { ...s.contactPage, phone: v } }))} disabled={isViewer || saving} />
            <Field label="Email (display)" value={site.contactPage.email} onChange={(v) => setSite((s) => ({ ...s, contactPage: { ...s.contactPage, email: v } }))} disabled={isViewer || saving} />
            <div className="space-y-2">
              <Label>Address (use line breaks)</Label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={site.contactPage.address}
                onChange={(e) => setSite((s) => ({ ...s, contactPage: { ...s.contactPage, address: e.target.value } }))}
                disabled={isViewer}
              />
            </div>
            <Button onClick={saveContact} disabled={saving || isViewer}>
              <Save className="h-4 w-4 mr-2" />
              {isViewer ? 'Read-only' : 'Save contact'}
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
    </div>
  );
}

function ImageField({
  label,
  value,
  disabled,
  onFile,
  onClear,
}: {
  label: string;
  value?: string;
  disabled?: boolean;
  onFile: (file: File | undefined) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      {value && (
        <div className="overflow-hidden rounded-md border border-border bg-muted">
          <img src={value} alt={label} className="h-40 w-full object-cover" />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        {value && (
          <Button type="button" variant="outline" onClick={onClear} disabled={disabled}>
            Clear
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <ImagePlus className="h-3 w-3" />
        Uploaded images are converted to WebP.
      </p>
    </div>
  );
}
