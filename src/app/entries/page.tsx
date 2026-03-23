import Link from 'next/link'
import { getAllEntries, formatDate } from '@/lib/content'

export default async function EntriesPage() {
  const entries = await getAllEntries()

  return (
    <main className="py-16">
      <header className="mb-16 text-center">
        <h1 className="font-serif text-4xl font-normal text-brand-text-primary">
          Entries
        </h1>
      </header>

      <div className="flex flex-col">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/entries/${entry.slug}`}
            className="flex items-baseline justify-between py-5 border-b border-brand-border group hover:bg-brand-surface -mx-6 px-6 transition-colors duration-150"
          >
            <div className="flex-1 pr-8">
              <p className="font-serif text-lg font-normal text-brand-text-primary leading-snug mb-1 group-hover:text-brand-cream transition-colors duration-200">
                {entry.title}
              </p>
              <p className="font-sans text-xs text-brand-text-muted leading-relaxed line-clamp-1">
                {entry.excerpt}
              </p>
            </div>
            <time className="font-sans text-xs text-brand-text-faint shrink-0 tabular-nums">
              {formatDate(entry.date)}
            </time>
          </Link>
        ))}

        {entries.length === 0 && (
          <p className="font-serif text-brand-text-muted italic text-center py-20">
            No entries yet.
          </p>
        )}
      </div>
    </main>
  )
}
