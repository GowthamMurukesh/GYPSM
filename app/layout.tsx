import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/AuthProvider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Royal Gypsum Plastering | Professional Services',
  description: 'Premium plastering and gypsum services for residential and commercial projects',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/royal gypsum .png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/royal gypsum .png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/royal gypsum .png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/royal gypsum .png',
    // D:\projectsece\github\GYPSM\public\royal gypsum .png
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
