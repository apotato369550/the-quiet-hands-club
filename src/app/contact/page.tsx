'use client'

import { useState } from 'react'

const CONTACT_EMAIL = 'hello@thequiethandsclub.com'

export default function ContactPage() {
  const [message, setMessage] = useState('')
  const href = `mailto:${CONTACT_EMAIL}?subject=A deed to record&body=${encodeURIComponent(message)}`

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-normal text-brand-text-primary mb-2">Contact</h1>
      <p className="text-sm text-brand-text-muted mb-12 max-w-sm leading-relaxed">
        Write down what happened. Keep it simple. No names needed.
      </p>

      <div className="flex flex-col gap-1 mb-6">
        <label className="text-xs tracking-widest uppercase text-brand-text-faint">Message</label>
        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the deed. Date, place, what happened."
          className="bg-transparent border-b border-brand-border text-brand-text-primary text-sm py-3 outline-none focus:border-brand-text-muted transition-colors duration-150 placeholder:text-brand-text-faint resize-none"
        />
      </div>

      <a
        href={href}
        className="mt-8 inline-block text-xs tracking-widest uppercase bg-brand-text-primary text-brand-bg px-6 py-3 hover:bg-[#c4c4c4] transition-colors duration-150"
      >
        Send
      </a>
    </main>
  )
}
