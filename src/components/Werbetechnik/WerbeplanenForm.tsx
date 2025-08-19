"use client"

import { useEffect, useId, useRef, useState } from "react"

type PresetSize = "2x1m" | "3x1m" | "4x2m" | "custom" | ""
type FormState = {
  size: PresetSize
  customWidth?: string
  customHeight?: string
  file: File | null
  email: string
  notes: string
}

export default function WerbeplanenForm() {
  const [state, setState] = useState<FormState>({
    size: "",
    customWidth: "",
    customHeight: "",
    file: null,
    email: "",
    notes: "",
  })

  const [errors, setErrors] = useState<string[]>([])
  const [ok, setOk] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // IDs für ARIA-Verknüpfung
  const sizeHelpId = useId()
  const customHelpId = useId()
  const fileHelpId = useId()
  const emailHelpId = useId()
  const notesHelpId = useId()
  const errorSummaryId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // bei Erfolg: Fokus auf Status, bei Fehlern: Fokus aufs Summary
  const statusRef = useRef<HTMLParagraphElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ok) statusRef.current?.focus()
  }, [ok])

  useEffect(() => {
    if (errors.length) summaryRef.current?.focus()
  }, [errors])

  const validate = (): string[] => {
    const e: string[] = []
    if (!state.size) e.push("Bitte eine Planengröße auswählen.")
    if (state.size === "custom") {
      if (!state.customWidth || !state.customHeight) {
        e.push("Bitte individuelle Breite und Höhe angeben.")
      } else {
        const w = Number(state.customWidth)
        const h = Number(state.customHeight)
        if (Number.isNaN(w) || w < 10 || w > 2000) {
          e.push("Breite muss zwischen 10 und 2000 cm liegen.")
        }
        if (Number.isNaN(h) || h < 10 || h > 2000) {
          e.push("Höhe muss zwischen 10 und 2000 cm liegen.")
        }
      }
    }
    if (!state.file) {
      e.push("Bitte eine Druckdatei hochladen (PDF, JPG oder PNG).")
    } else {
      const extOk = /\.(pdf|jpg|jpeg|png)$/i.test(state.file.name)
      if (!extOk) e.push("Nur PDF, JPG oder PNG sind erlaubt.")
      if (state.file.size > 10 * 1024 * 1024) e.push("Die Datei ist größer als 10 MB.")
    }
    if (!state.email || !/^\S+@\S+\.\S+$/.test(state.email)) {
      e.push("Bitte eine gültige E‑Mail-Adresse angeben.")
    }
    return e
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setOk(null)

    const issues = validate()
    if (issues.length) {
      setErrors(issues)
      return
    }

    setLoading(true)
    try {
      const form = new FormData()
      form.append("size", state.size)
      form.append("customWidth", state.customWidth || "")
      form.append("customHeight", state.customHeight || "")
      form.append("email", state.email)
      form.append("notes", state.notes)
      if (state.file) form.append("file", state.file)

      const res = await fetch("/api/werbeplanen", { method: "POST", body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Senden fehlgeschlagen.")

      setOk("Danke! Wir haben deine Angaben erhalten und melden uns mit einem Angebot.")
      // Felder zurücksetzen (Datei-Eingabe auch visuell leeren)
      setState((s) => ({ ...s, notes: "", file: null }))
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Senden fehlgeschlagen."
      setErrors([message])
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Fehler-Zusammenfassung */}
      {errors.length > 0 && (
        <div
          ref={summaryRef}
          id={errorSummaryId}
          tabIndex={-1}
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-900 dark:border-red-700 dark:bg-red-950/40"
          aria-live="assertive"
          aria-atomic="true"
        >
          <p className="font-semibold">Bitte korrigiere die folgenden Punkte:</p>
          <ul className="mt-2 list-disc pl-5">
            {errors.map((msg, i) => (
              <li key={i} className="text-sm">{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Planengröße */}
      <fieldset className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <legend className="px-1 text-sm font-medium text-gray-900 dark:text-gray-100">
          Planengröße <span className="text-red-600" aria-hidden="true">*</span>
        </legend>
        <p id={sizeHelpId} className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Wähle ein Standardmaß oder „Individuell“ für eigene Maße in Zentimetern.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {([
            { v: "2x1m", label: "2 × 1 m" },
            { v: "3x1m", label: "3 × 1 m" },
            { v: "4x2m", label: "4 × 2 m" },
            { v: "custom", label: "Individuell" },
          ] as { v: PresetSize; label: string }[]).map((opt) => (
            <label
              key={opt.v}
              className={[
                "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm",
                state.size === opt.v
                  ? "border-indigo-500 ring-2 ring-indigo-500"
                  : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600",
              ].join(" ")}
            >
              <input
                type="radio"
                name="size"
                value={opt.v}
                checked={state.size === opt.v}
                onChange={(e) => setState((s) => ({ ...s, size: e.target.value as PresetSize }))}
                className="h-4 w-4"
                aria-describedby={sizeHelpId}
                required
              />
              <span className="text-gray-900 dark:text-gray-100">{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Individuelle Maße */}
        {state.size === "custom" && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cw" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Breite (cm) <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="cw"
                  name="customWidth"
                  type="number"
                  min={10}
                  max={2000}
                  inputMode="numeric"
                  value={state.customWidth || ""}
                  onChange={(e) => setState((s) => ({ ...s, customWidth: e.target.value }))}
                  aria-describedby={customHelpId}
                  aria-invalid={Boolean(
                    state.size === "custom" &&
                      (state.customWidth === "" ||
                        Number(state.customWidth) < 10 ||
                        Number(state.customWidth) > 2000)
                  )}
                  required={state.size === "custom"}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="z. B. 300"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                  cm
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="ch" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Höhe (cm) <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="ch"
                  name="customHeight"
                  type="number"
                  min={10}
                  max={2000}
                  inputMode="numeric"
                  value={state.customHeight || ""}
                  onChange={(e) => setState((s) => ({ ...s, customHeight: e.target.value }))}
                  aria-describedby={customHelpId}
                  aria-invalid={Boolean(
                    state.size === "custom" &&
                      (state.customHeight === "" ||
                        Number(state.customHeight) < 10 ||
                        Number(state.customHeight) > 2000)
                  )}
                  required={state.size === "custom"}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="z. B. 100"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                  cm
                </span>
              </div>
            </div>

            <p id={customHelpId} className="sm:col-span-2 text-xs text-gray-600 dark:text-gray-400">
              Bereich: 10–2000 cm. Empfohlen: **Plandatei in Endgröße** (mind. 150 dpi bei Rastergrafiken).
            </p>
          </div>
        )}
      </fieldset>

      {/* Datei-Upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Druckdatei <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <p id={fileHelpId} className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Erlaubt: PDF, JPG, PNG · **max. 10 MB** · Beschnitt/Ösen bitte im Hinweisfeld angeben.
        </p>

        <div
          className="mt-2 rounded-lg border border-dashed border-gray-300 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/40"
          // (Optional) Drag&Drop kann später ergänzt werden
        >
          <input
            ref={fileInputRef}
            id="file"
            name="file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setState((s) => ({ ...s, file: e.target.files?.[0] || null }))}
            aria-describedby={fileHelpId}
            required
            className="block w-full text-sm text-gray-700 file:mr-3 file:cursor-pointer file:rounded file:border file:border-gray-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-900 hover:file:bg-gray-100 focus:outline-none dark:text-gray-200 dark:file:border-gray-700 dark:file:bg-gray-900 dark:file:text-gray-100 dark:hover:file:bg-gray-800"
          />
          {state.file && (
            <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">
              Ausgewählt: <span className="font-medium">{state.file.name}</span>
            </p>
          )}
        </div>
      </div>

      {/* E-Mail */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Deine E‑Mail <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <p id={emailHelpId} className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Wir senden dir die Bestellbestätigung und ggf. Rückfragen.
        </p>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={state.email}
          onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
          aria-describedby={emailHelpId}
          required
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="name@beispiel.ch"
        />
      </div>

      {/* Hinweise */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Hinweise (optional)
        </label>
        <p id={notesHelpId} className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Z. B. Ösenabstand (Standard: alle 50 cm), Randverstärkung, Wunsch‑Liefertermin.
        </p>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={state.notes}
          onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
          aria-describedby={notesHelpId}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="z. B. Ösen alle 50 cm, Randverstärkung, Liefertermin …"
        />
      </div>

      {/* Status-Meldungen */}
      {ok && (
        <p
          ref={statusRef}
          tabIndex={-1}
          className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-900 dark:border-green-800 dark:bg-green-950/30"
          role="status"
          aria-live="polite"
        >
          {ok}
        </p>
      )}

      {/* Absenden */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-700 px-5 py-3 text-white shadow transition hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
        >
          {loading ? "Wird gesendet …" : "Bestellung absenden"}
        </button>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Mit dem Absenden stimmst du der Verarbeitung deiner Daten zum Zweck der Angebotserstellung zu.
        </p>
      </div>
    </form>
  )
}
