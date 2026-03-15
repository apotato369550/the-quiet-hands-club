import { getAllDeeds, getAllStewardNotes } from '@/lib/content'
import { generateRSS } from '@/lib/rss'

export async function GET() {
  const deeds = await getAllDeeds()
  const steward = await getAllStewardNotes()
  const all = [...deeds, ...steward].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const xml = generateRSS(all)
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
