import Link from 'next/link'
import { getAllStewardNotes } from '@/lib/content'

export default async function StewardPage() {
  const stewardNotes = await getAllStewardNotes()

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-normal text-brand-text-primary mb-2">
        From the Steward
      </h1>
      <p className="text-sm text-brand-text-muted mb-12">Notes from the person who keeps this place.</p>

      <div className="flex flex-col divide-y divide-brand-border">
        {stewardNotes.map((note) => (
          <Link
            key={note.slug}
            href={`/steward/${note.slug}`}
            className="flex items-start justify-between py-5 hover:bg-[#0f0f0f] -mx-6 px-6 transition-colors duration-150 group"
          >
            <div className="flex-1 min-w-0 pr-8">
              <p className="font-serif text-base font-normal text-brand-text-primary group-hover:text-white transition-colors">
                {note.title}
              </p>
              <p className="text-xs text-brand-text-muted mt-1 line-clamp-1 max-w-lg">
                {note.excerpt}
              </p>
            </div>
            <span className="text-xs text-brand-text-faint shrink-0 tabular-nums mt-0.5">
              {new Date(note.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
