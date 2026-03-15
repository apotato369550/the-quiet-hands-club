import Link from 'next/link'
import { Post } from '@/lib/content'

export default function DeedCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/deeds/${post.slug}`}
      className="bg-brand-bg p-6 flex flex-col gap-3 hover:bg-brand-surface transition-colors duration-150 border-l-2 border-brand-accent-blue"
    >
      <span className="text-[10px] tracking-widest uppercase text-brand-text-faint">deed</span>
      <h3 className="font-serif text-lg font-normal text-brand-text-primary leading-snug">
        {post.title}
      </h3>
      <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
      <span className="text-xs text-brand-text-faint mt-auto pt-2">
        {new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </Link>
  )
}
