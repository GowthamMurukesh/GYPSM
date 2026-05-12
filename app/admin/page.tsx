'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  FileText,
  Briefcase,
  Image as ImageIcon,
  Mail,
  Users,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { getAllPages, getAllServices, getMediaItems } from '@/lib/firebaseUtils';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export default function AdminDashboard() {
  const { userProfile } = useAuthStore();
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    media: 0,
    messages: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  const isAdmin = userProfile?.role === 'admin';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch pages
        const pages = await getAllPages(true);
        setStats((prev) => ({ ...prev, pages: pages.length }));

        // Fetch services
        const services = await getAllServices(true);
        setStats((prev) => ({ ...prev, services: services.length }));

        // Fetch media
        const media = await getMediaItems();
        setStats((prev) => ({ ...prev, media: media.length }));

        // Fetch messages
        const messagesRef = collection(db, 'contacts');
        const messagesSnap = await getDocs(messagesRef);
        setStats((prev) => ({ ...prev, messages: messagesSnap.size }));

        // Fetch users (only for admin)
        if (isAdmin) {
          const usersRef = collection(db, 'users');
          const usersSnap = await getDocs(usersRef);
          setStats((prev) => ({ ...prev, users: usersSnap.size }));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  const dashboardCards = [
    {
      label: 'Website',
      value: 'Edit',
      icon: Globe,
      href: '/admin/site',
      color: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200',
    },
    {
      label: 'Pages',
      value: stats.pages,
      icon: FileText,
      href: '/admin/pages',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Services',
      value: stats.services,
      icon: Briefcase,
      href: '/admin/services',
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Media',
      value: stats.media,
      icon: ImageIcon,
      href: '/admin/media',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Messages',
      value: stats.messages,
      icon: Mail,
      href: '/admin/messages',
      color: 'bg-orange-50 text-orange-600',
    },
    ...(isAdmin
      ? [
        {
          label: 'Users',
          value: stats.users,
          icon: Users,
          href: '/admin/users',
          color: 'bg-pink-50 text-pink-600',
        },
        ]
      : []),
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userProfile?.displayName}! Here&apos;s an overview of your content.
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading stats...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {card.label}
                      </p>
                      <p className="text-3xl font-bold">{card.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${card.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Content Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your pages and services content
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/admin/pages">
              <Button
                variant="outline"
                className="w-full justify-between"
              >
                Edit Pages
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/services">
              <Button
                variant="outline"
                className="w-full justify-between"
              >
                Manage Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Media Library</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload and organize images and videos
          </p>
          <Link href="/admin/media">
            <Button variant="outline" className="w-full justify-between">
              View Media
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Messages</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Review contact form submissions
          </p>
          <Link href="/admin/messages">
            <Button variant="outline" className="w-full justify-between">
              View Messages
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Admin Info */}
      {isAdmin && (
        <Card className="p-6 border-accent bg-accent/5">
          <h3 className="text-lg font-semibold mb-2">Admin Controls</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You have admin access to user management and system settings
          </p>
          <Link href="/admin/users">
            <Button size="sm" variant="default">
              Manage Users
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
