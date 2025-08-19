// src/app/api/werbeplanen/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * Nodemailer benötigt Node.js (nicht Edge).
 * Force Node.js runtime & keine Static Optimization:
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))

    // Erwartete Felder – passe an dein Formular an:
    const {
      name = '',
      email = '',
      phone = '',
      message = '',
      company = '',
      subject = 'Neue Anfrage: Werbeplanen',
    } = body || {}

    // Minimal-Validierung
    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: 'Bitte E-Mail oder Telefon angeben.' },
        { status: 400 }
      )
    }

    // SMTP aus ENV – in Vercel hinterlegen!
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      MAIL_TO,          // Empfänger deiner Agentur
      MAIL_FROM,        // z.B. "JuraDruck <no-reply@deinedomain.ch>"
    } = process.env as Record<string, string | undefined>

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_TO || !MAIL_FROM) {
      return NextResponse.json(
        { ok: false, error: 'SMTP-Umgebung unvollständig konfiguriert.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // 465 = SSL, sonst STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Nachricht:</strong><br/>${nl2br(escapeHtml(message))}</p>
      <hr/>
      <small>Gesendet am ${new Date().toLocaleString('de-CH')}</small>
    `

    await transporter.sendMail({
      to: MAIL_TO,
      from: MAIL_FROM,
      subject,
      replyTo: email || undefined,
      text: stripHtml(html),
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Mail Fehler:', err)
    return NextResponse.json(
      { ok: false, error: 'Senden fehlgeschlagen.' },
      { status: 500 }
    )
  }
}

// Hilfsfunktionen (klein & lokal, kein Extra-Import nötig)
function escapeHtml(input: string) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function nl2br(input: string) {
  return input.replace(/\n/g, '<br/>')
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, '')
}
