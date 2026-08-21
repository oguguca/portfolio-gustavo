import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Algo deu errado.')
      }
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Algo deu errado.')
    }
  }

  const inputClasses =
    'w-full bg-transparent border border-line rounded-sm px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-ink transition-colors'

  if (status === 'sent') {
    return (
      <div
        data-cursor-hover
        className="border border-line rounded-sm p-6 text-sm text-muted font-mono"
      >
        mensagem enviada — obrigado! respondo em breve.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[420px]">
      <input
        name="name"
        type="text"
        required
        placeholder="Seu nome"
        className={inputClasses}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Seu e-mail"
        className={inputClasses}
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Sua mensagem"
        className={`${inputClasses} resize-none`}
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start bg-ink text-bg text-sm font-semibold px-6 py-3 rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600 font-mono">{errorMsg}</p>
      )}
    </form>
  )
}
