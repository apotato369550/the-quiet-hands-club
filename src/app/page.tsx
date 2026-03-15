import Link from 'next/link'
import { getAllDeeds, getAllStewardNotes } from '@/lib/content'
import DeedCard from '@/components/DeedCard'
import StewardCard from '@/components/StewardCard'

export default async function Home() {
  const [deeds, stewardNotes] = await Promise.all([getAllDeeds(), getAllStewardNotes()])
  const latestDeeds = deeds.slice(0, 3)
  const latestSteward = stewardNotes.slice(0, 2)

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      {/* Intro block */}
      <div className="mb-20">
        <h1 className="font-serif text-4xl font-normal leading-snug text-brand-text-primary mb-6 max-w-xl">
          A record of quiet things done without witness.
        </h1>
        <p className="text-sm text-brand-text-muted leading-relaxed max-w-md">
          Good deeds recorded here are not performances. They are reports. Anonymous, unverified,
          submitted in private. Collected because someone thought they should exist somewhere.
        </p>
      </div>

      {/* Latest Deeds section */}
      <div className="mb-16">
        <h2 className="text-xs tracking-widest uppercase text-brand-text-faint mb-6 border-b border-brand-border pb-2">
          Recent Deeds
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
          {latestDeeds.map((deed) => (
            <div key={deed.slug} className="bg-brand-bg">
              <DeedCard post={deed} />
            </div>
          ))}
        </div>
      </div>

      {/* Latest Steward section */}
      <div>
        <h2 className="text-xs tracking-widest uppercase text-brand-text-faint mb-6 border-b border-brand-border pb-2">
          From the Steward
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
          {latestSteward.map((note) => (
            <div key={note.slug} className="bg-brand-bg">
              <StewardCard post={note} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
