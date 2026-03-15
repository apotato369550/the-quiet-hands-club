import { getAllStewardNotes, getStewardNoteBySlug } from '@/lib/content'
import PostBody from '@/components/PostBody'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const notes = await getAllStewardNotes()
  return notes.map((n) => ({ slug: n.slug }))
}

export default async function StewardNotePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const note = await getStewardNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/steward"
        className="text-xs tracking-widest uppercase text-brand-text-faint hover:text-brand-text-muted transition-colors duration-150 mb-12 inline-block"
      >
        ← Steward
      </Link>

      <div className="mb-12">
        <p className="text-[10px] tracking-widest uppercase text-brand-accent-green mb-4">
          Steward
        </p>
        <h1 className="font-serif text-4xl font-normal leading-tight text-brand-text-primary mb-4 max-w-xl">
          {note.title}
        </h1>
        <p className="text-xs text-brand-text-faint tracking-wide">
          {new Date(note.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <PostBody html={note.body} />
    </main>
  )
}
