'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe?.();
  }, []);

  return <>{children}</>;
}
