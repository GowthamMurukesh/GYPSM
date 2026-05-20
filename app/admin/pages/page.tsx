'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllPages } from '@/lib/firebaseUtils';
import { PageContent } from '@/lib/types';
import { useAuthStore } from '@/lib/authStore';
import { ArrowRight, Plus } from 'lucide-react';

export default function PagesPage() {
  const { userProfile } = useAuthStore();
  const isViewer = userProfile?.role === 'viewer';
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await getAllPages(true);
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pages</h1>
          <p className="text-muted-foreground">
            Manage your website pages and content
          </p>
        </div>
        {!isViewer && (
          <Link href="/admin/pages/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </Link>
        )}
      </div>

      {/* Pages List */}
      {loading ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading pages...</p>
        </Card>
      ) : pages.length > 0 ? (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{page.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {page.description}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Slug: {page.slug}</span>
                    <span>
                      Status:{' '}
                      <span className={page.published ? 'text-green-600' : 'text-yellow-600'}>
                        {page.published ? 'Published' : 'Draft'}
                      </span>
                    </span>
                    <span>Updated: {new Date(page.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Link href={`/admin/pages/${page.id}`}>
                  <Button variant="outline" size="sm">
                    {isViewer ? 'View' : 'Edit'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No pages yet</p>
          <Link href="/admin/pages/new">
            <Button>Create First Page</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
