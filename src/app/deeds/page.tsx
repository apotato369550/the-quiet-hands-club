import Link from 'next/link'
import { getAllDeeds } from '@/lib/content'

export default async function DeedsPage() {
  const deeds = await getAllDeeds()

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-normal text-brand-text-primary mb-2">Deeds</h1>
      <p className="text-sm text-brand-text-muted mb-12">An archive of quiet acts. Anonymous and unverified.</p>

      <div className="flex flex-col divide-y divide-brand-border">
        {deeds.map((deed) => (
          <Link
            key={deed.slug}
            href={`/deeds/${deed.slug}`}
            className="flex items-start justify-between py-5 hover:bg-[#0f0f0f] -mx-6 px-6 transition-colors duration-150 group"
          >
            <div className="flex-1 min-w-0 pr-8">
              <p className="font-serif text-base font-normal text-brand-text-primary group-hover:text-white transition-colors">
                {deed.title}
              </p>
              <p className="text-xs text-brand-text-muted mt-1 line-clamp-1 max-w-lg">
                {deed.excerpt}
              </p>
            </div>
            <span className="text-xs text-brand-text-faint shrink-0 tabular-nums mt-0.5">
              {new Date(deed.date).toLocaleDateString('en-US', {
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
