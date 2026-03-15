import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
}

async function parseMarkdown(content: string): Promise<string> {
  const processed = await remark().use(html).process(content)
  return processed.toString()
}

function getContentDir(subdir: string): string {
  return path.join(process.cwd(), 'content', subdir)
}

async function loadPostsFromDir(subdir: string): Promise<Post[]> {
  const dir = getContentDir(subdir)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      const body = await parseMarkdown(content)

      return {
        slug,
        title: data.title ?? '',
        date: data.date ? String(data.date) : '',
        excerpt: data.excerpt ?? '',
        body,
      } satisfies Post
    })
  )

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

async function loadPostBySlug(subdir: string, slug: string): Promise<Post | null> {
  const filepath = path.join(getContentDir(subdir), `${slug}.md`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const body = await parseMarkdown(content)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ? String(data.date) : '',
    excerpt: data.excerpt ?? '',
    body,
  }
}

export async function getAllDeeds(): Promise<Post[]> {
  return loadPostsFromDir('deeds')
}

export async function getDeedBySlug(slug: string): Promise<Post | null> {
  return loadPostBySlug('deeds', slug)
}

export async function getAllStewardNotes(): Promise<Post[]> {
  return loadPostsFromDir('steward')
}

export async function getStewardNoteBySlug(slug: string): Promise<Post | null> {
  return loadPostBySlug('steward', slug)
}
