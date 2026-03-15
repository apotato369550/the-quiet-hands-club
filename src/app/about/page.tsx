export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl font-normal text-brand-text-primary mb-2">About</h1>
      <p className="text-sm text-brand-text-muted mb-12">What this place is and why it exists.</p>

      <div className="prose prose-invert max-w-none">
        <h2>Purpose</h2>
        <p>
          The Quiet Hands Club is a place to record good deeds done without an audience. Not a
          social network. Not a leaderboard. A quiet archive.
        </p>

        <h2>Anonymity</h2>
        <p>
          No accounts. No usernames. Entries are submitted anonymously by email and reviewed by
          the Steward before publishing. Your name never appears here. Neither does mine.
        </p>
        <p>
          Anonymity is not about hiding. It is about removing the performance. When no one knows
          who did the thing, the thing has to speak for itself.
        </p>

        <h2>How to participate</h2>
        <p>
          Write down what you did. Keep it short. Send it to the contact address. The Steward
          reads everything. Not everything gets published — only what feels true.
        </p>
        <p>
          There is no feedback, no rejection notice, no follow-up. If your deed appears here,
          you will know.
        </p>
      </div>
    </main>
  )
}
