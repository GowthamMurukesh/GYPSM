"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteContent } from '@/lib/types';

interface Props {
  site: SiteContent;
}

export default function AnnouncementPopup({ site }: Props) {
  const router = useRouter();
  const announcement = site?.home?.announcement;
  const storageKey = 'site_announcement_closed_v1';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const closed = localStorage.getItem(storageKey);
      if (announcement?.enabled && announcement?.message && !closed) {
        // show after a tiny delay so it doesn't jump on load
        const t = setTimeout(() => setVisible(true), 250);
        return () => clearTimeout(t);
      }
      setVisible(false);
    } catch (e) {
      setVisible(Boolean(announcement?.enabled && announcement?.message));
    }
  }, [announcement]);

  if (!announcement || !announcement.enabled || !announcement.message) return null;
  if (!visible) return null;

  function close(e?: React.MouseEvent) {
    e?.stopPropagation();
    try { localStorage.setItem(storageKey, '1'); } catch {}
    setVisible(false);
  }

  function onClick() {
    // Navigate to contact page when the popup (not the close button) is clicked
    setVisible(false);
    router.push('/contact');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        role="button"
        onClick={onClick}
        className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-sky-700 to-sky-900 text-white p-6 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.01]">
        <button
          aria-label="Close announcement"
          onClick={close}
          className="absolute top-3 right-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
        >
          ×
        </button>

        {announcement.title ? (
          <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
        ) : null}

        <p className="text-sm mb-4 leading-relaxed">{announcement.message}</p>

        <div className="mt-2 flex items-center gap-3 text-sm opacity-90">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1">Click to contact</span>
          <span className="text-white/80">or press × to dismiss</span>
        </div>
      </div>
    </div>
  );
}
