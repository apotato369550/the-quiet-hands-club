import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllEntries, getEntryBySlug, formatDate } from '@/lib/content'
import PostBody from '@/components/PostBody'

export async function generateStaticParams() {
  const entries = await getAllEntries()
  return entries.map((e) => ({ slug: e.slug }))
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = await getEntryBySlug(slug)
  if (!entry) notFound()

  return (
    <main className="py-16">
      <Link
        href="/entries"
        className="inline-block text-xs tracking-widest uppercase text-brand-text-faint hover:text-brand-text-muted transition-colors duration-150 mb-12 font-sans"
      >
        ← Entries
      </Link>

      <div className="max-w-prose mx-auto">
        <header className="mb-12">
          <time className="block text-xs tracking-widest uppercase text-brand-text-faint mb-5 font-sans">
            {formatDate(entry.date, { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <h1 className="font-serif text-4xl font-normal text-brand-text-primary leading-tight mb-4">
            {entry.title}
          </h1>
          <p className="font-serif text-base text-brand-text-muted italic leading-relaxed">
            {entry.excerpt}
          </p>
        </header>

        <PostBody html={entry.body} />
      </div>
    </main>
  )
}
