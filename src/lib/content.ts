import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export type Post = {
  slug: string
  title: string
  date: string      // ISO-like string for sorting
  excerpt: string
  body: string
}

async function parseMarkdown(content: string): Promise<string> {
  const processed = await remark().use(remarkHtml).process(content)
  return processed.toString()
}

const DATE_PREFIX_RE = /^(?:\d{2}|xx)-(?:\d{2}|xx)-(?:\d{4}|xxxx)_/i
const DATED_PREFIX_RE = /^(\d{2})-(\d{2})-(\d{4})/

// Parse date from filename like "03-22-2026_INTRODUCTION.md" → "2026-03-22"
// Returns 'undated' for redacted prefixes like "xx-xx-xxxx_"
function parseDateFromFilename(filename: string): string {
  if (/^xx-xx-xxxx/i.test(filename)) return 'undated'
  const match = filename.match(DATED_PREFIX_RE)
  if (match) {
    const [, month, day, year] = match
    return `${year}-${month}-${day}`
  }
  return new Date().toISOString().split('T')[0]
}

// Extract title from first # heading in markdown content
function parseTitleFromContent(content: string, filename: string): string {
  const headingMatch = content.match(/^#\s+(.+)$/m)
  if (headingMatch) return headingMatch[1].trim()
  // Strip date/redacted prefix then extension
  return filename.replace(DATE_PREFIX_RE, '').replace(/\.md$/, '').replace(/_/g, ' ')
}

// Format a date string for display — handles 'undated' sentinel
export function formatDate(
  date: string,
  opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string {
  if (date === 'undated') return '—'
  return new Date(date).toLocaleDateString('en-US', opts)
}

// Extract first paragraph as excerpt (skip headings and blank lines)
function parseExcerptFromContent(content: string): string {
  const lines = content.split('\n')
  const paragraphLines: string[] = []
  let started = false
  for (const line of lines) {
    if (line.startsWith('#') || line.trim() === '') {
      if (started) break
      continue
    }
    started = true
    paragraphLines.push(line.trim())
    if (paragraphLines.length >= 3) break
  }
  const excerpt = paragraphLines.join(' ')
  return excerpt.length > 200 ? excerpt.slice(0, 197) + '…' : excerpt
}

async function loadEntry(filename: string): Promise<Post> {
  const dir = path.join(process.cwd(), 'public', 'entries')
  const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
  const { data, content } = matter(raw)
  const slug = filename.replace(/\.md$/, '')
  const title = data.title || parseTitleFromContent(content, filename)
  const date = data.date ? String(data.date) : parseDateFromFilename(filename)
  const excerpt = data.excerpt || parseExcerptFromContent(content)
  const body = await parseMarkdown(content)
  return { slug, title, date, excerpt, body }
}

export async function getAllEntries(): Promise<Post[]> {
  const dir = path.join(process.cwd(), 'public', 'entries')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const posts = await Promise.all(files.map(loadEntry))
  return posts.sort((a, b) => {
    if (a.date === 'undated' && b.date === 'undated') return 0
    if (a.date === 'undated') return 1
    if (b.date === 'undated') return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export async function getEntryBySlug(slug: string): Promise<Post | null> {
  const dir = path.join(process.cwd(), 'public', 'entries')
  if (!fs.existsSync(dir)) return null
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const match = files.find((f) => f.replace(/\.md$/, '') === slug)
  if (!match) return null
  return loadEntry(match)
}

// Keep these as aliases so any remaining imports don't break during transition
export const getAllDeeds = getAllEntries
export const getAllStewardNotes = getAllEntries
