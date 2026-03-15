import { getAllDeeds, getDeedBySlug } from '@/lib/content'
import PostBody from '@/components/PostBody'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const deeds = await getAllDeeds()
  return deeds.map((d) => ({ slug: d.slug }))
}

export default async function DeedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const deed = await getDeedBySlug(slug)

  if (!deed) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/deeds"
        className="text-xs tracking-widest uppercase text-brand-text-faint hover:text-brand-text-muted transition-colors duration-150 mb-12 inline-block"
      >
        ← Deeds
      </Link>

      <div className="mb-12">
        <p className="text-[10px] tracking-widest uppercase text-brand-accent-blue mb-4">Deed</p>
        <h1 className="font-serif text-4xl font-normal leading-tight text-brand-text-primary mb-4 max-w-xl">
          {deed.title}
        </h1>
        <p className="text-xs text-brand-text-faint tracking-wide">
          {new Date(deed.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <PostBody html={deed.body} />
    </main>
  )
}
