export default function PostBody({ html }: { html: string }) {
  return (
    <div
      className="prose prose-invert max-w-none font-serif text-base leading-[1.9]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
