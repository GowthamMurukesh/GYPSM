'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Service } from '@/lib/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { saveService } from '@/lib/firebaseUtils';
import { storage } from '@/lib/firebase';
import { convertImageFileToWebP } from '@/lib/mediaUtils';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ArrowLeft, ImagePlus, Save } from 'lucide-react';
import Link from 'next/link';

const defaultService: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  details: '',
  order: 0,
  published: false,
};

export default function ServiceEditor() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>(
    defaultService
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceId = params.id as string;
  const isNew = serviceId === 'new';

  useEffect(() => {
    const fetchService = async () => {
      if (isNew) {
        setService(defaultService);
        setLoading(false);
        return;
      }

      try {
        const serviceDoc = await getDoc(doc(db, 'services', serviceId));
        if (serviceDoc.exists()) {
          const data = serviceDoc.data();
          setService({
            title: data.title,
            description: data.description,
            details: data.details,
            order: data.order,
            image: data.image,
            published: data.published,
          });
        }
      } catch (err) {
        setError('Error loading service');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId, isNew]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setService((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setService((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setService((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!service.title) {
        setError('Please fill in the service title');
        setSaving(false);
        return;
      }

      await saveService(isNew ? undefined : serviceId, service);
      router.push('/admin/services');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error saving service';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file) return;

    setSaving(true);
    setError(null);
    try {
      const webpFile = await convertImageFileToWebP(file);
      const fileRef = ref(storage, `services/${Date.now()}-${webpFile.name}`);
      await uploadBytes(fileRef, webpFile, { contentType: 'image/webp' });
      const url = await getDownloadURL(fileRef);
      setService((prev) => ({ ...prev, image: url }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error uploading image';
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
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{isNew ? 'New Service' : 'Edit Service'}</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {error && (
          <Card className="p-4 border-red-200 bg-red-50">
            <p className="text-red-800 text-sm">{error}</p>
          </Card>
        )}

        <Card className="p-6">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Service Title *
          </label>
          <Input
            id="title"
            name="title"
            value={service.title}
            onChange={handleChange}
            placeholder="e.g., Interior Plastering"
            required
          />
        </Card>

        <Card className="p-6">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            value={service.description}
            onChange={handleChange}
            rows={3}
            placeholder="Brief description for service cards"
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Card>

        <Card className="p-6">
          <label htmlFor="details" className="block text-sm font-medium mb-2">
            Detailed Information
          </label>
          <textarea
            id="details"
            name="details"
            value={service.details}
            onChange={handleChange}
            rows={6}
            placeholder="Detailed information about the service"
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Card>

        <Card className="p-6">
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Service Image
          </label>
          {service.image && (
            <div className="mb-4 overflow-hidden rounded-md border border-border bg-muted">
              <img src={service.image} alt={service.title || 'Service image'} className="h-56 w-full object-cover" />
            </div>
          )}
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0])}
            disabled={saving}
          />
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <ImagePlus className="h-3 w-3" />
            Uploaded images are converted to WebP and stored in Firebase.
          </p>
          {service.image && (
            <Button
              type="button"
              variant="outline"
              className="mt-3"
              onClick={() => setService((prev) => ({ ...prev, image: '' }))}
              disabled={saving}
            >
              Clear Image
            </Button>
          )}
        </Card>

        <Card className="p-6">
          <label htmlFor="order" className="block text-sm font-medium mb-2">
            Display Order
          </label>
          <Input
            id="order"
            name="order"
            type="number"
            value={service.order}
            onChange={handleChange}
            placeholder="0"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Lower numbers appear first
          </p>
        </Card>

        <Card className="p-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={service.published}
              onChange={handleChange}
              className="rounded"
            />
            <span className="text-sm font-medium">Publish this service</span>
          </label>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Service'}
          </Button>
          <Link href="/admin/services">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
