import { Post, formatDate } from '@/lib/content'
import PostBody from './PostBody'

export default function EntryCard({ post }: { post: Post }) {
  const formattedDate = formatDate(post.date, { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <article className="py-14 border-b border-brand-border last:border-b-0">
      <time className="block text-xs tracking-widest uppercase text-brand-text-faint mb-5 font-sans">
        {formattedDate}
      </time>
      <h2 className="font-serif text-3xl font-normal text-brand-text-primary leading-snug mb-3">
        {post.title}
      </h2>
      <p className="font-serif text-base text-brand-text-muted italic leading-relaxed mb-8">
        {post.excerpt}
      </p>
      <PostBody html={post.body} />
    </article>
  )
}
