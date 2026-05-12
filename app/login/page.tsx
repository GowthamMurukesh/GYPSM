'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/lib/authStore';
import { LogIn } from 'lucide-react';

function getLoginErrorMessage(error: unknown) {
  const rawMessage = error instanceof Error ? error.message : '';

  if (
    rawMessage.includes('auth/invalid-credential') ||
    rawMessage.includes('auth/wrong-password') ||
    rawMessage.includes('auth/user-not-found')
  ) {
    return 'Invalid email or password. If this account already exists, use the correct password or reset it in Firebase.';
  }

  if (rawMessage.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.';
  }

  if (rawMessage.includes('auth/too-many-requests')) {
    return 'Too many failed attempts. Please wait a few minutes and try again.';
  }

  return 'Login failed. Please check your credentials and try again.';
}

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading: authLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              RG
            </div>
            <span className="text-2xl font-bold text-primary">
              Royal Gypsum
            </span>
          </Link>
        </div>

        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Admin Login</h1>
          <p className="text-center text-muted-foreground mb-6">
            Sign in to access the content management system
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-accent hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
