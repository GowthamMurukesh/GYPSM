'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image,
  Users,
  Mail,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function AdminSidebar() {
  const pathname = usePathname();
  const { userProfile, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = userProfile?.role === 'admin';

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      visible: true,
    },
    {
      label: 'Website',
      href: '/admin/site',
      icon: Globe,
      visible: true,
    },
    {
      label: 'Pages',
      href: '/admin/pages',
      icon: FileText,
      visible: true,
    },
    {
      label: 'Services',
      href: '/admin/services',
      icon: Briefcase,
      visible: true,
    },
    {
      label: 'Media',
      href: '/admin/media',
      icon: Image,
      visible: true,
    },
    {
      label: 'Messages',
      href: '/admin/messages',
      icon: Mail,
      visible: true,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: Users,
      visible: isAdmin,
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
              RG
            </div>
            <span className="font-bold hidden sm:inline">Royal Gypsum</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-sidebar-border">
          <p className="text-sm font-medium">{userProfile?.displayName}</p>
          <p className="text-xs opacity-75 capitalize">
            {userProfile?.role} User
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2 px-3">
            {menuItems
              .filter((item) => item.visible)
              .map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border p-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
