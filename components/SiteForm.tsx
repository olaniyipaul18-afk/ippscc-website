"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  rows?: number;
};

type SiteFormProps = {
  id: string;
  fields: FormField[];
  submitLabel: string;
  successTitle: string;
  successCopy: string;
  note?: string;
};

const inputClasses =
  "w-full border border-white/15 bg-ink-900/80 px-4 py-3.5 text-[0.95rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none";

/**
 * Accessible form with validation, status handling and graceful fallback:
 * posts to NEXT_PUBLIC_FORM_ENDPOINT when configured, otherwise opens email.
 */
export default function SiteForm({ id, fields, submitLabel, successTitle, successCopy, note }: SiteFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    if (site.formEndpoint) {
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _form: id, ...payload }),
        });
        if (!res.ok) throw new Error("Submission failed");
        setStatus("sent");
        return;
      } catch {
        setStatus("error");
        return;
      }
    }

    // Fallback: compose a pre-filled email so no enquiry is ever lost.
    const subject = encodeURIComponent(`IPPSCC Website — ${id}`);
    const body = encodeURIComponent(
      Object.entries(payload)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-gold-500/40 bg-ink-900/70 p-8 text-center sm:p-12" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-gold-400" aria-hidden="true" />
        <h3 className="mt-5 font-display text-2xl text-white sm:text-3xl">{successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-100/70">{successCopy}</p>
        <p className="mt-6 font-mono text-[0.65rem] tracking-[0.26em] text-gold-400 uppercase">
          {site.motto}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-5" aria-label={id}>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={`${id}-${field.name}`} className="mb-2 block font-mono text-[0.65rem] tracking-[0.22em] text-ink-100/60 uppercase">
              {field.label} {field.required && <span className="text-gold-400" aria-hidden="true">*</span>}
            </label>
            {field.type === "select" && field.options ? (
              <select id={`${id}-${field.name}`} name={field.name} required={field.required} className={inputClasses} defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-ink-900">
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={`${id}-${field.name}`}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={field.rows ?? 5}
                className={`${inputClasses} resize-y`}
              />
            ) : (
              <input
                id={`${id}-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                className={inputClasses}
                autoComplete={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "on"}
              />
            )}
          </div>
        ))}
      </div>

      {status === "error" && (
        <p role="alert" className="border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          Something went wrong sending your message. Please try again, or write to us directly at{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] text-ink-950 uppercase transition-all duration-300 hover:bg-gold-400 disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
        {note && <p className="max-w-sm text-xs leading-relaxed text-ink-100/45">{note}</p>}
      </div>
    </form>
  );
}
