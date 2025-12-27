import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { NavigationProvider } from '@/context/NavigationContext'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Zulqarnain Ali | ML Engineer & AI Researcher',
  description: 'Portfolio of Zulqarnain Ali - Machine Learning Engineer & AI Researcher specializing in Computer Vision, NLP, and Deep Learning',
  keywords: ['Machine Learning', 'AI Research', 'Data Science', 'Python', 'Deep Learning', 'Computer Vision'],
  authors: [{ name: 'Zulqarnain Ali' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Zulqarnain Ali | ML Engineer & AI Researcher',
    description: 'Portfolio showcasing expertise in Machine Learning, AI Research, and Data Science',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.className} bg-primary antialiased`}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  )
}
