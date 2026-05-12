'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, userProfile, loading, profileLoadError } = useAuthStore();
  const canAccessCms = userProfile?.role === 'admin' || userProfile?.role === 'editor';

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && user && userProfile && !canAccessCms) {
      router.push('/');
    }
  }, [canAccessCms, loading, router, user, userProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user && !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="max-w-md p-6 space-y-3">
          <p className="font-medium">Could not load your profile</p>
          <p className="text-sm text-muted-foreground">
            Check the browser console and Firestore rules for the <code className="text-xs">users</code> collection.
          </p>
          <Button variant="outline" onClick={() => router.push('/')}>
            Back to site
          </Button>
        </Card>
      </div>
    );
  }

  if (userProfile && !canAccessCms) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="max-w-md p-6 space-y-3">
          <p className="font-medium">No CMS access</p>
          <p className="text-sm text-muted-foreground">
            Your account needs the <strong>editor</strong> or <strong>admin</strong> role. Ask an administrator to update your user in Firestore.
          </p>
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="md:p-8 p-4 pt-20 md:pt-0">
          {profileLoadError && (
            <Card className="mb-6 border-amber-500/40 bg-amber-500/10 p-4 text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-100">Profile loaded with warnings</p>
              <p className="text-muted-foreground mt-1">{profileLoadError}</p>
              <p className="text-muted-foreground mt-2">
                If saving fails, fix Firestore rules for <code>users</code> and <code>siteContent</code>.
              </p>
            </Card>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
