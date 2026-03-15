import { Post } from './content'

export function generateRSS(posts: Post[]): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://thequiethandsclub.com'
  const siteTitle = 'The Quiet Hands Club'

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString()
      const link = `${siteUrl}/deeds/${post.slug}`
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>Quiet deeds, done without applause.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/api/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`
}
