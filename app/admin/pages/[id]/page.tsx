'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/lib/authStore';
import { PageContent } from '@/lib/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { savePageContent } from '@/lib/firebaseUtils';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const defaultPage: Omit<PageContent, 'id' | 'createdAt' | 'updatedAt'> = {
  slug: '',
  title: '',
  description: '',
  content: '',
  createdBy: '',
  updatedBy: '',
  published: false,
};

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const { userProfile } = useAuthStore();
  const [page, setPage] = useState<Omit<PageContent, 'id' | 'createdAt' | 'updatedAt'>>(
    defaultPage
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageId = params.id as string;
  const isNew = pageId === 'new';

  useEffect(() => {
    const fetchPage = async () => {
      if (isNew) {
        setPage(defaultPage);
        setLoading(false);
        return;
      }

      try {
        const pageDoc = await getDoc(doc(db, 'pages', pageId));
        if (pageDoc.exists()) {
          const data = pageDoc.data();
          setPage({
            slug: data.slug,
            title: data.title,
            description: data.description,
            content: data.content,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy,
            published: data.published,
          });
        }
      } catch (err) {
        setError('Error loading page');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageId, isNew]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setPage((prev) => ({ ...prev, [name]: checked }));
    } else {
      setPage((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!page.slug || !page.title) {
        setError('Please fill in all required fields');
        setSaving(false);
        return;
      }

      const pageData = {
        ...page,
        updatedBy: userProfile?.id || 'unknown',
      };

      if (isNew) {
        pageData.createdBy = userProfile?.id || 'unknown';
      }

      await savePageContent(page.slug, pageData);
      router.push('/admin/pages');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error saving page';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/pages">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{isNew ? 'New Page' : 'Edit Page'}</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {error && (
          <Card className="p-4 border-red-200 bg-red-50">
            <p className="text-red-800 text-sm">{error}</p>
          </Card>
        )}

        {/* Slug */}
        <Card className="p-6">
          <label htmlFor="slug" className="block text-sm font-medium mb-2">
            Slug *
          </label>
          <Input
            id="slug"
            name="slug"
            value={page.slug}
            onChange={handleChange}
            placeholder="about"
            disabled={!isNew}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            URL-friendly identifier (cannot be changed)
          </p>
        </Card>

        {/* Title */}
        <Card className="p-6">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <Input
            id="title"
            name="title"
            value={page.title}
            onChange={handleChange}
            placeholder="Page Title"
            required
          />
        </Card>

        {/* Description */}
        <Card className="p-6">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <Input
            id="description"
            name="description"
            value={page.description}
            onChange={handleChange}
            placeholder="Short description for meta tags"
          />
        </Card>

        {/* Content */}
        <Card className="p-6">
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={page.content}
            onChange={handleChange}
            rows={12}
            placeholder="Enter HTML content..."
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">
            HTML content is supported
          </p>
        </Card>

        {/* Published */}
        <Card className="p-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={page.published}
              onChange={handleChange}
              className="rounded"
            />
            <span className="text-sm font-medium">Publish this page</span>
          </label>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Page'}
          </Button>
          <Link href="/admin/pages">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
