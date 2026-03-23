'use client'

import { useState, useEffect, useRef } from 'react'

const FORMSPREE_URL = 'https://formspree.io/f/mlgpyqoa'
const MAX_CHARS = 1000
const MAX_FILES = 3
const TIMEOUT_MS = 24 * 60 * 60 * 1000
const LS_KEY = 'tqhc_last_submit'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'timeout'

export default function ContactForm() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [timeRemaining, setTimeRemaining] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    checkTimeout()
  }, [])

  function checkTimeout(): boolean {
    const lastSubmit = localStorage.getItem(LS_KEY)
    if (!lastSubmit) return false
    const elapsed = Date.now() - parseInt(lastSubmit, 10)
    if (elapsed < TIMEOUT_MS) {
      const remaining = TIMEOUT_MS - elapsed
      const hours = Math.floor(remaining / (60 * 60 * 1000))
      const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
      setTimeRemaining(`${hours}h ${minutes}m`)
      setStatus('timeout')
      return true
    }
    return false
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || [])
    if (selected.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} images allowed.`)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setFiles([])
      return
    }
    setError('')
    setFiles(selected)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (checkTimeout()) return
    if (message.length > MAX_CHARS || !message.trim()) return

    setStatus('submitting')
    setError('')

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('message', message)
      files.forEach((file) => formData.append('attachment', file))

      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        localStorage.setItem(LS_KEY, String(Date.now()))
        setStatus('success')
        setTitle('')
        setMessage('')
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        const data = await res.json()
        setError(data?.errors?.[0]?.message || 'Something went wrong. Try again.')
        setStatus('error')
      }
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  const charsLeft = MAX_CHARS - message.length
  const isOverLimit = charsLeft < 0

  if (status === 'timeout') {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <p className="font-serif text-sm text-brand-text-muted italic leading-relaxed">
          You've already submitted recently.
        </p>
        <p className="font-sans text-xs text-brand-text-faint mt-2 tracking-wide">
          Try again in {timeRemaining}.
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <p className="font-serif text-lg text-brand-text-primary">Received.</p>
        <p className="font-sans text-xs text-brand-text-faint mt-3 tracking-wide leading-relaxed">
          The Steward will review it. If it appears here, you'll know.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-7">

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-xs tracking-widest uppercase text-brand-text-faint font-sans">
          Title{' '}
          <span className="opacity-50 normal-case tracking-normal">e.g. The Steward</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="How shall we call you?"
          className="bg-transparent border-b border-brand-border text-brand-text-primary text-sm py-3 outline-none focus:border-brand-cream transition-colors duration-200 placeholder:text-brand-text-faint font-serif"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label className="text-xs tracking-widest uppercase text-brand-text-faint font-sans">
            Message
          </label>
          <span className={`text-xs font-sans tabular-nums ${isOverLimit ? 'text-red-500' : 'text-brand-text-faint'}`}>
            {charsLeft}
          </span>
        </div>
        <textarea
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the deed. Date, place, what happened."
          className="bg-transparent border-b border-brand-border text-brand-text-primary text-sm py-3 outline-none focus:border-brand-cream transition-colors duration-200 placeholder:text-brand-text-faint resize-none font-serif"
        />
        {isOverLimit && (
          <p className="text-xs text-red-500 font-sans">
            {Math.abs(charsLeft)} characters over the limit.
          </p>
        )}
      </div>

      {/* Image attachments */}
      <div className="flex flex-col gap-2">
        <label className="text-xs tracking-widest uppercase text-brand-text-faint font-sans">
          Images{' '}
          <span className="opacity-50 normal-case tracking-normal">up to 3, subject to review</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="text-xs text-brand-text-muted font-sans cursor-pointer file:bg-transparent file:border-0 file:text-brand-text-faint file:text-xs file:tracking-widest file:uppercase file:cursor-pointer file:mr-4 file:py-1"
        />
        {files.length > 0 && (
          <p className="text-xs text-brand-text-faint font-sans">
            {files.length} image{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-sans">{error}</p>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={status === 'submitting' || isOverLimit || !message.trim()}
          className="text-xs tracking-widest uppercase bg-brand-text-primary text-brand-bg px-6 py-3 hover:bg-brand-cream transition-colors duration-150 font-sans disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…' : 'Send'}
        </button>
      </div>

    </form>
  )
}
