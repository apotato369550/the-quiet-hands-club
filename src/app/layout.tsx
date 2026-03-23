import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Quiet Hands Club',
  description: 'Quiet deeds, done without applause.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-text-primary font-sans antialiased">
        <Nav />
        <div className="w-[75%] max-w-[1200px] mx-auto flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
