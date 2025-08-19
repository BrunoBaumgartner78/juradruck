// src/app/api/werbeplanen/route.ts
import nodemailer from "nodemailer"

export const runtime = "nodejs"          // wichtig: Nodemailer braucht Node-Runtime
export const dynamic = "force-dynamic"   // keine HTML-Pre-Render-Annahme

// Max. Upload ~4.5 MB auf Vercel Serverless – für größere Dateien lieber extern hochladen (S3, Sanity) und nur Link mailen.
const MAX_FILE_BYTES = 4.5 * 1024 * 1024
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"]

function env(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export async function POST(req: Request) {
  try {
    // FormData auslesen
    const form = await req.formData()

    const size = String(form.get("size") || "")
    const name = String(form.get("name") || "")
    const email = String(form.get("email") || "")
    const message = String(form.get("message") || "")
    const file = form.get("file") as File | null

    // Basis-Validierung
    const errors: Record<string, string> = {}
    if (!size) errors.size = "Bitte eine Planengrösse wählen."
    if (!name) errors.name = "Bitte Name angeben."
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Bitte eine gültige E‑Mail angeben."
    if (!file) errors.file = "Bitte eine Druckdatei hochladen (PDF, JPG oder PNG)."

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.file = "Nur PDF, JPG, PNG sind erlaubt."
      } else if (file.size > MAX_FILE_BYTES) {
        errors.file = "Datei ist zu groß (max. ~4.5 MB auf dem Server)."
      }
    }

    if (Object.keys(errors).length) {
      return Response.json({ ok: false, errors }, { status: 400 })
    }

    // Datei in Buffer konvertieren
    const arrayBuf = await file!.arrayBuffer()
    const buffer = Buffer.from(arrayBuf)

    // Transporter (SMTP)
    const transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port: Number(env("SMTP_PORT", "465")),
      secure: Number(process.env.SMTP_PORT || "465") === 465, // true bei 465
      auth: {
        user: env("SMTP_USER"),
        pass: env("SMTP_PASS"),
      },
    })

    const MAIL_TO = env("MAIL_TO")   // z.B. info@juradruck.ch
    const MAIL_FROM = env("MAIL_FROM", env("SMTP_USER"))

    const subject = `Werbeplane – Anfrage (${size}) von ${name}`

    const text = [
      `Neue Werbeplanen-Anfrage:`,
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Grösse: ${size}`,
      `Nachricht: ${message || "-"}`,
      ``,
      `Datei: ${file!.name} (${Math.round(file!.size / 1024)} KB, ${file!.type})`,
    ].join("\n")

    const html = `
      <h2>Neue Werbeplanen-Anfrage</h2>
      <p><b>Name:</b> ${escapeHtml(name)}<br/>
      <b>E-Mail:</b> ${escapeHtml(email)}<br/>
      <b>Grösse:</b> ${escapeHtml(size)}</p>
      <p><b>Nachricht:</b><br/>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>
      <p>Datei: ${escapeHtml(file!.name)} (${Math.round(file!.size / 1024)} KB, ${file!.type})</p>
    `

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
      attachments: [
        {
          filename: file!.name,
          content: buffer,
          contentType: file!.type,
        },
      ],
    })

    return Response.json({ ok: true, message: "Anfrage erfolgreich versendet." })
  } catch (err: any) {
    console.error("API /api/werbeplanen error:", err)
    return Response.json(
      { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 500 }
    )
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
