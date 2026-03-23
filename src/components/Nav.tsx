import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <nav className="w-full border-b border-brand-border bg-brand-bg">
      <div className="px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-150">
          <Image src="/logo.png" alt="The Quiet Hands Club" width={32} height={32} className="rounded-full" />
          <span className="text-xs tracking-widest uppercase font-medium text-brand-text-primary">
            The Quiet Hands Club
          </span>
        </Link>
        <Link
          href="/entries"
          className="text-xs tracking-widest uppercase text-brand-text-muted hover:text-brand-text-primary transition-colors duration-150"
        >
          Entries
        </Link>
      </div>
    </nav>
  )
}
