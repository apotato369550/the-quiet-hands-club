import Image from 'next/image'
import Link from 'next/link'
import { getAllEntries, formatDate } from '@/lib/content'
import ContactForm from '@/components/ContactForm'

export default async function Home() {
  const entries = await getAllEntries()
  const recent = entries.slice(0, 4)

  return (
    <main className="py-20">

      {/* Hero */}
      <section className="flex flex-col items-center text-center mb-24">
        <Image
          src="/logo.png"
          alt="The Quiet Hands Club"
          width={140}
          height={140}
          className="mb-8 rounded-full"
          priority
        />
        <h1 className="font-serif text-2xl font-normal tracking-[0.12em] uppercase text-brand-cream mb-4">
          The Quiet Hands Club
        </h1>
        <p className="font-sans text-sm text-brand-text-muted tracking-wide max-w-xs leading-relaxed">
          A record of quiet things done without witness.
        </p>
      </section>

      {/* What is this? */}
      <section className="mb-24 max-w-prose mx-auto">
        <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-text-faint mb-8 text-center">
          What is this?
        </h2>
        <div className="font-serif text-base text-brand-text-muted leading-[1.9] space-y-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center mb-24">
        <span className="text-brand-text-faint opacity-20 tracking-[0.5em] text-xs">* * *</span>
      </div>

      {/* Recent Entries */}
      <section className="mb-24">
        <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-text-faint mb-8">
          Recent Entries
        </h2>
        <div className="flex flex-col">
          {recent.map((entry) => (
            <Link key={entry.slug} href={`/entries/${entry.slug}`} className="flex items-baseline justify-between py-5 border-b border-brand-border group hover:bg-brand-surface -mx-6 px-6 transition-colors duration-150">
              <div className="flex-1 pr-8">
                <p className="font-serif text-lg font-normal text-brand-text-primary leading-snug mb-1 group-hover:text-brand-cream transition-colors duration-200">
                  {entry.title}
                </p>
                <p className="font-sans text-xs text-brand-text-muted leading-relaxed">
                  {entry.excerpt}
                </p>
              </div>
              <time className="font-sans text-xs text-brand-text-faint shrink-0 tabular-nums">
                {formatDate(entry.date)}
              </time>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/entries"
            className="font-sans text-xs tracking-[0.25em] uppercase text-brand-text-muted hover:text-brand-text-primary transition-colors duration-200"
          >
            All entries →
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mt-40 mb-4">
        <div className="bg-brand-surface px-10 py-12">
          <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-text-faint mb-6 text-center">
            Submit a deed
          </h2>
          <p className="font-serif text-sm text-brand-text-muted italic text-center mb-10 leading-relaxed">
            Write down what happened. Keep it simple. No names needed.
          </p>
          <ContactForm />
        </div>
      </section>

    </main>
  )
}
