// src/app/kontakt/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const MAX_FILE_MB = 10
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'image/svg+xml']

const QuoteSchema = z.object({
  name: z.string().min(2, 'Bitte Name angeben'),
  email: z.string().email('Ungültige E-Mail'),
  message: z.string().min(10, 'Bitte Projektbeschreibung angeben (min. 10 Zeichen)'),
  file: z
    .any()
    .refine((fileList) => !fileList || fileList.length <= 1, 'Max. 1 Datei')
    .refine((fileList) => {
      if (!fileList || fileList.length === 0) return true
      const file: File = fileList[0]
      return file.size <= MAX_FILE_MB * 1024 * 1024
    }, `Datei max. ${MAX_FILE_MB} MB`)
    .refine((fileList) => {
      if (!fileList || fileList.length === 0) return true
      const file: File = fileList[0]
      return ACCEPTED_TYPES.includes(file.type)
    }, 'Erlaubt: PNG, JPG, PDF, SVG'),
})

type FormValues = z.infer<typeof QuoteSchema>

export default function KontaktPage() {
  const [sending, setSending] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(QuoteSchema) })

  const onSubmit = async (data: FormValues) => {
    setSending(true)
    try {
      const form = new FormData()
      form.append('name', data.name)
      form.append('email', data.email)
      form.append('message', data.message)
      const fileList = (data as any).file as FileList | undefined
      if (fileList && fileList[0]) form.append('file', fileList[0])

      const res = await fetch('/api/quote', { method: 'POST', body: form })
      if (!res.ok) throw new Error(await res.text())
      alert('Danke! Wir melden uns zeitnah.')
      reset()
    } catch (e) {
      alert('Senden fehlgeschlagen. Bitte später erneut versuchen.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Offerte anfragen</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-xl space-y-4">
        <div>
          <input {...register('name')} placeholder="Ihr Name" className="w-full rounded-xl border p-3" />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('email')} placeholder="E-Mail" className="w-full rounded-xl border p-3" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <textarea {...register('message')} placeholder="Projektbeschreibung (Mengen, Technik, Termin)..." rows={6} className="w-full rounded-xl border p-3" />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>
        <div>
          <input type="file" accept={ACCEPTED_TYPES.join(',')} {...register('file')} className="w-full rounded-xl border p-3" />
          {errors.file && <p className="mt-1 text-sm text-red-600">{(errors.file as any).message}</p>}
          <p className="mt-1 text-xs text-gray-500">Erlaubt: PNG, JPG, PDF, SVG · Max {MAX_FILE_MB} MB</p>
        </div>
        <button disabled={sending} className="btn-primary">{sending ? 'Senden…' : 'Absenden'}</button>
      </form>
    </div>
  )
}
