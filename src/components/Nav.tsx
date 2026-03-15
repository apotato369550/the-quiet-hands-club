'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const navLinks = [
  { label: 'Deeds', href: '/deeds' },
  { label: 'Steward', href: '/steward' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-bg">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-150">
          <Logo size={28} />
          <span className="text-xs tracking-widest uppercase font-medium">The Quiet Hands Club</span>
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest uppercase transition-colors duration-150 ${
                  isActive
                    ? 'text-brand-text-primary'
                    : 'text-brand-text-muted hover:text-brand-text-primary'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
