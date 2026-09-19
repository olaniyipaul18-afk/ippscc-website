"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Loader2,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import {
  CONDITIONAL_DETAILS,
  REQUIRED_A,
  REQUIRED_B,
  REQUIRED_C,
  REQUIRED_ALL,
  isFilled,
} from "@/lib/application";

type Data = Record<string, unknown>;
type Errors = Record<string, string>;

const DRAFT_KEY = "ippscc-application-v1";
const C8_KEYS = ["attestName", "consent1", "consent2", "consent3", "consent4", "consent5"];
const REQUIRED_C_BODY = REQUIRED_C.filter((k) => !C8_KEYS.includes(k));

const STEPS = [
  { code: "A", title: "Personal Details", sub: "Identity · Emergency Contact · Chaplaincy · Church" },
  { code: "B", title: "Education & Qualification", sub: "Education · Theology · Experience · Training" },
  { code: "C", title: "Reference & Background", sub: "Referees · Declaration · Motivation · Availability" },
  { code: "R", title: "Review & Declare", sub: "Confirm · Attest · Submit" },
];

/* ————————————————————— Options ————————————————————— */

const GENDERS = ["Male", "Female", "Other"];
const CHAP_TYPES = ["Police / Law Enforcement", "Military", "Fire Service", "Emergency Medical Services", "Hospital / Healthcare", "Correctional Facility", "Community", "Corporate / Workplace"];
const TRAINING = ["Chaplaincy Training", "Crisis Intervention", "Critical Incident Response", "Trauma / Grief Support", "Pastoral Counselling", "Mental Health / Psychological First Aid", "Suicide Prevention", "First Aid / CPR", "Emergency Response", "Conflict Resolution / Mediation", "Victim Support", "Disaster Response", "Police / Law Enforcement Training", "Military Chaplaincy Training", "Fire / EMS Training"];
const SERVICE_AREAS = ["Police / Law Enforcement", "Military", "Fire Service", "EMS / Emergency Response", "Corrections", "Disaster / Crisis Response", "Hospital / Healthcare", "Community"];
const DOCS = ["Completed Membership / Registration Form", "Recent Passport Photograph", "Valid Government-Issued Identification", "Curriculum Vitae / Resume", "Educational Certificates", "Professional Qualifications / Certifications", "Theological / Ministerial Credentials (where applicable)", "Ordination / Licensing Evidence (where applicable)", "Referee 1 — Clergy / Spiritual Leader Attestation", "Referee 2 — Military / Law Enforcement / Civil Servant Attestation", "Relevant Professional / Service Records (where applicable)"];

const BG_QUESTIONS: { key: string; detail: string; text: string }[] = [
  { key: "bg1", detail: "bg1d", text: "1. Have you ever been arrested for, charged with, or investigated for a criminal offence?" },
  { key: "bg2", detail: "bg2d", text: "2. Have you ever been convicted of a criminal offence?" },
  { key: "bg3", detail: "bg3d", text: "3. Are you currently involved in any pending criminal or legal proceedings?" },
  { key: "bg4", detail: "bg4d", text: "4. Have you ever been dismissed, suspended, disciplined, or discharged from employment, military service, law enforcement service, ministry, or another professional organization for misconduct?" },
  { key: "bg5", detail: "bg5d", text: "5. Have you ever been the subject of a professional or disciplinary investigation involving allegations of abuse, violence, fraud, dishonesty, sexual misconduct, harassment, or serious ethical misconduct?" },
  { key: "bg6", detail: "bg6d", text: "6. Have you ever had a professional license, ministerial credential, certification, appointment, or membership revoked or suspended?" },
  { key: "bg7", detail: "bg7d", text: "7. Is there any matter concerning your personal, professional, ministerial, military, or legal history that may affect your suitability to serve as an IPPSCC chaplain or representative?" },
];

const CONDUCT_QUESTIONS: { key: string; text: string }[] = [
  { key: "c8", text: "8. Have you ever been involved in conduct that resulted in serious disciplinary action by a church, ministry, employer, government agency, military organization, police agency, or professional body?" },
  { key: "c9", text: "9. Are you willing to submit to any background verification or screening required by IPPSCC?" },
  { key: "c10", text: "10. Are you willing to comply with the constitution, policies, ethical standards, code of conduct, and regulations of IPPSCC?" },
  { key: "c11", text: "11. Are you willing to maintain confidentiality regarding sensitive information encountered while providing chaplaincy services?" },
  { key: "c12", text: "12. Are you willing to serve people of different religious, cultural, ethnic, and professional backgrounds with dignity and respect?" },
  { key: "c13", text: "13. Do you understand that membership or appointment with IPPSCC does not automatically grant you authority to represent a police department, military organization, government agency, or other public-safety organization unless separately authorized by that organization?" },
];

const CONSENTS = [
  "I declare that the information provided in this application is true, complete and accurate to the best of my knowledge. I understand that false, misleading or incomplete information may result in rejection or withdrawal of membership/appointment.",
  "I authorize IPPSCC, where permitted by applicable law and organizational policy, to verify the information provided, contact my referees, and conduct appropriate background or credential checks.",
  "I agree to abide by the policies, ethical standards, code of conduct, confidentiality requirements, and regulations of IPPSCC.",
  "I understand that acceptance into IPPSCC does not give me authority to represent any police, military, government, emergency-service, or public-safety agency unless separately authorized by that agency.",
  "I understand the journey: application → contact & verification → payment → completion & login credentials → portal profile setup.",
];

/* ————————————————————— Field primitives ————————————————————— */

const inputCls =
  "w-full border border-white/15 bg-ink-900/80 px-4 py-3 text-[0.92rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none";
const labelCls = "mb-1.5 block font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/55 uppercase";
const errCls = "mt-1 text-xs text-crimson-300";

function Field({ label, required, error, children, htmlFor }: { label: string; required?: boolean; error?: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label} {required && <span className="text-gold-400" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p role="alert" className={errCls}>{error}</p>}
    </div>
  );
}

function Text(props: { name: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      id={`app-${props.name}`}
      type={props.type || "text"}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className={inputCls}
    />
  );
}

function Area(props: { name: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      id={`app-${props.name}`}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      rows={props.rows || 3}
      className={`${inputCls} resize-y`}
    />
  );
}

function RadioYN({ name, value, onChange }: { name: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label={name}>
      {["Yes", "No"].map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={`flex-1 border px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.2em] uppercase transition-all ${
            value === opt
              ? "border-gold-400 bg-gold-500/20 text-gold-200"
              : "border-white/15 text-ink-100/55 hover:border-gold-500/50 hover:text-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function RadioRow({ name, value, options, onChange }: { name: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={`border px-4 py-2.5 text-xs transition-all ${
            value === opt
              ? "border-gold-400 bg-gold-500/20 text-gold-200"
              : "border-white/15 text-ink-100/60 hover:border-gold-500/50 hover:text-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function CheckPills({ options, values, onChange }: { options: string[]; values: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = values.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(opt)}
            className={`flex items-center gap-2 border px-3.5 py-2 text-xs transition-all ${
              on
                ? "border-gold-400 bg-gold-500/20 text-gold-200"
                : "border-white/15 text-ink-100/60 hover:border-gold-500/50 hover:text-white"
            }`}
          >
            <span className={`flex h-3.5 w-3.5 items-center justify-center border ${on ? "border-gold-400 bg-gold-500 text-ink-950" : "border-white/25"}`}>
              {on && <Check className="h-2.5 w-2.5" aria-hidden="true" />}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function DynamicRows({
  title,
  columns,
  rows,
  onChange,
}: {
  title: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string>[];
  onChange: (rows: Record<string, string>[]) => void;
}) {
  const blank = () => Object.fromEntries(columns.map((c) => [c.key, ""]));
  return (
    <div>
      <p className={labelCls}>{title}</p>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="border border-white/10 bg-ink-950/50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {columns.map((col) => (
                <div key={col.key} className={columns.length > 2 ? "" : "sm:col-span-1"}>
                  <label htmlFor={`app-row-${title}-${i}-${col.key}`} className="mb-1 block text-[0.68rem] tracking-wide text-ink-100/45">
                    {col.label}
                  </label>
                  <input
                    id={`app-row-${title}-${i}-${col.key}`}
                    value={row[col.key] || ""}
                    onChange={(e) => {
                      const next = rows.map((r, j) => (j === i ? { ...r, [col.key]: e.target.value } : r));
                      onChange(next);
                    }}
                    className={`${inputCls} !py-2.5 text-sm`}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, j) => j !== i))}
              className="mt-3 flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.2em] text-crimson-300 uppercase hover:text-crimson-400"
            >
              <Trash2 className="h-3 w-3" aria-hidden="true" /> Remove entry
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...rows, blank()])}
        className="mt-3 flex items-center gap-2 border border-dashed border-gold-500/50 px-4 py-2.5 font-mono text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase transition-colors hover:bg-gold-500/10"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add entry
      </button>
    </div>
  );
}

function SubHead({ code, title }: { code: string; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-gold-500/30 pb-3">
      <span className="bg-gold-500 px-2 py-1 font-mono text-[0.62rem] tracking-[0.18em] text-ink-950">{code}</span>
      <h3 className="font-display text-xl text-white sm:text-2xl">{title}</h3>
    </div>
  );
}

/* ————————————————————— Wizard ————————————————————— */

export default function ApplicationWizard() {
  const [data, setData] = useState<Data>(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { data?: Data };
        if (parsed.data && typeof parsed.data === "object") return parsed.data;
      }
    } catch {
      /* fresh start */
    }
    return {};
  });
  const [step, setStep] = useState(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { step?: number };
        if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step <= 3) return parsed.step;
      }
    } catch {
      /* start at 0 */
    }
    return 0;
  });
  const [restored, setRestored] = useState(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return !!raw && Object.keys((JSON.parse(raw) as { data?: Data }).data || {}).length > 0;
    } catch {
      return false;
    }
  });
  const [visited, setVisited] = useState<number[]>([0]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<{ ref: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ data, step, savedAt: Date.now() }));
    } catch {
      /* storage unavailable */
    }
  }, [data, step]);

  const str = (key: string): string => (typeof data[key] === "string" ? (data[key] as string) : "");
  const arr = (key: string): string[] => (Array.isArray(data[key]) ? (data[key] as string[]) : []);
  const rows = (key: string): Record<string, string>[] =>
    Array.isArray(data[key]) ? (data[key] as Record<string, string>[]) : [];
  const set = (key: string, value: unknown) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const progress = useMemo(() => {
    const filled = REQUIRED_ALL.filter((k) => isFilled(data[k])).length;
    return Math.round((filled / REQUIRED_ALL.length) * 100);
  }, [data]);

  const stepCounts = useMemo(() => {
    const lists = [REQUIRED_A, REQUIRED_B, REQUIRED_C_BODY, C8_KEYS];
    return lists.map((keys) => ({
      filled: keys.filter((k) => isFilled(data[k])).length,
      total: keys.length,
    }));
  }, [data]);

  function validate(target: number): Errors {
    const errs: Errors = {};
    const need = (key: string, msg = "This field is required.") => {
      if (!isFilled(data[key])) errs[key] = msg;
    };
    if (target === 0) {
      for (const k of REQUIRED_A) need(k);
      if (str("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str("email"))) errs.email = "Enter a valid email address.";
      if (str("servingChaplain") === "Yes") {
        need("chapOrg", "Required when currently serving.");
        if (arr("chapTypes").length === 0) errs.chapTypes = "Select at least one type.";
      }
      if (str("servedRelated") === "Yes") need("servedDetails", "Please provide details.");
    }
    if (target === 1) {
      for (const k of REQUIRED_B) need(k);
      if (str("theoTraining") === "Yes") {
        need("theoInst", "Required when trained.");
        need("theoQual", "Required when trained.");
      }
    }
    if (target === 2) {
      for (const k of REQUIRED_C_BODY) need(k);
      for (const k of CONDITIONAL_DETAILS) {
        if (str(k) === "Yes" && !isFilled(data[`${k}d`])) {
          errs[`${k}d`] = "Details are required when you answer Yes.";
        }
      }
    }
    if (target === 3) {
      for (const k of C8_KEYS) {
        if (!isFilled(data[k])) errs[k] = k === "attestName" ? "Type your full name to sign." : "Required to submit.";
      }
    }
    return errs;
  }

  function go(target: number) {
    if (target > step) {
      const errs = validate(step);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    setErrors({});
    setStep(target);
    setVisited((v) => (v.includes(target) ? v : [...v, target]));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* noop */
    }
    setData({});
    setStep(0);
    setVisited([0]);
    setErrors({});
    setRestored(false);
  }

  async function submit() {
    const errs = validate(3);
    // Final sweep across all steps
    const sweep = { ...validate(0), ...validate(1), ...validate(2), ...errs };
    if (Object.keys(sweep).length > 0) {
      setErrors(sweep);
      setSubmitError("Some required answers are missing. Please review the highlighted sections.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const areas = arr("serviceAreas");
      const payload: Data = {
        ...data,
        serviceTrack: areas[0] || str("motivePopulation"),
        attestDate: new Date().toISOString().slice(0, 10),
      };
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: str("fullName"), email: str("email"), payload }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Submission failed.");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* noop */
      }
      setResult({ ref: out.ref });
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ————— Success ————— */
  if (result) {
    return (
      <div ref={topRef} className="scroll-mt-32 border border-gold-500/40 bg-ink-900/60 p-8 text-center sm:p-12" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-400" aria-hidden="true" />
        <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">Application received.</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-100/70">
          Your membership application is with the Corps&apos; review team. Keep your reference safe — you will need it to track progress.
        </p>
        <p className="mx-auto mt-6 w-fit border border-gold-500/50 bg-ink-950/60 px-6 py-4 font-mono text-lg tracking-[0.12em] text-gold-300 sm:text-xl">
          {result.ref}
        </p>
        <ol className="mx-auto mt-8 grid max-w-2xl gap-px border border-white/10 bg-white/10 text-left sm:grid-cols-4">
          {["Received", "Contact & Verification", "Payment", "Login & Portal"].map((s, i) => (
            <li key={s} className="bg-ink-950 px-4 py-4">
              <p className="font-display text-2xl text-gold-500/80">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 text-xs leading-snug text-ink-100/75">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/track"
            className="inline-flex w-full items-center justify-center gap-2 bg-gold-500 px-7 py-3.5 font-mono text-[0.68rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-400 sm:w-auto"
          >
            <FileSearch className="h-4 w-4" aria-hidden="true" /> Track Application
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 border border-white/25 px-7 py-3.5 font-mono text-[0.68rem] tracking-[0.22em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300 sm:w-auto"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  /* ————— Wizard ————— */
  return (
    <div ref={topRef} className="scroll-mt-32">
      {/* Progress header */}
      <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.26em] text-gold-400 uppercase">
              <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
              IPPSCC Membership / Registration Application
            </p>
            <h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">
              Section {STEPS[step].code} — {STEPS[step].title}
            </h2>
            <p className="mt-1 text-sm text-ink-100/55">{STEPS[step].sub}</p>
          </div>
          <p className="font-display text-4xl text-gold-300" aria-live="polite">{progress}%</p>
        </div>
        <div className="mt-5 h-2.5 bg-white/10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Application completion">
          <div className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-5 grid grid-cols-4 gap-2" aria-label="Application steps">
          {STEPS.map((s, i) => {
            const done = stepCounts[i].filled === stepCounts[i].total;
            const current = i === step;
            const canGo = visited.includes(i) || i < step;
            return (
              <li key={s.code}>
                <button
                  type="button"
                  disabled={!canGo}
                  onClick={() => go(i)}
                  aria-current={current ? "step" : undefined}
                  className={`w-full border px-2 py-3 text-center transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                    current
                      ? "border-gold-400 bg-gold-500/15"
                      : done
                        ? "border-gold-500/40 hover:border-gold-400"
                        : "border-white/10 hover:border-gold-500/40"
                  }`}
                >
                  <span className={`mx-auto flex h-6 w-6 items-center justify-center font-mono text-[0.65rem] ${current ? "bg-gold-500 text-ink-950" : done ? "bg-gold-500/25 text-gold-300" : "bg-white/10 text-ink-100/50"}`}>
                    {done && !current ? <Check className="h-3 w-3" aria-hidden="true" /> : s.code}
                  </span>
                  <span className="mt-1.5 hidden text-[0.68rem] leading-tight text-ink-100/70 sm:block">{s.title}</span>
                  <span className="mt-0.5 hidden font-mono text-[0.56rem] text-ink-100/40 sm:block">
                    {stepCounts[i].filled}/{stepCounts[i].total}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {restored && (
          <p className="mt-4 border border-gold-500/30 bg-gold-500/[0.07] px-4 py-2.5 text-xs text-gold-200" role="status">
            Draft restored — your previous answers were recovered from this device.
          </p>
        )}
      </div>

      {/* Step body */}
      <div className="mt-6 border border-white/10 bg-white/[0.02] p-6 sm:p-9">
        {step === 0 && (
          <div className="space-y-10">
            <section aria-label="A1 Applicant information" className="space-y-5">
              <SubHead code="A1" title="Applicant Information" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.fullName} htmlFor="app-fullName">
                  <Text name="fullName" value={str("fullName")} onChange={(v) => set("fullName", v)} placeholder="As on official documents" />
                </Field>
                <Field label="Title / Preferred Name" htmlFor="app-preferredName">
                  <Text name="preferredName" value={str("preferredName")} onChange={(v) => set("preferredName", v)} placeholder="e.g. Rev., Pastor, Dr." />
                </Field>
                <Field label="Date of Birth (DD/MM/YYYY)" required error={errors.dob} htmlFor="app-dob">
                  <Text name="dob" value={str("dob")} onChange={(v) => set("dob", v)} placeholder="DD/MM/YYYY" />
                </Field>
                <Field label="Gender" required error={errors.gender}>
                  <RadioRow name="gender" value={str("gender")} options={GENDERS} onChange={(v) => set("gender", v)} />
                </Field>
                <Field label="Nationality" required error={errors.nationality} htmlFor="app-nationality">
                  <Text name="nationality" value={str("nationality")} onChange={(v) => set("nationality", v)} />
                </Field>
                <Field label="Country of Residence" required error={errors.country} htmlFor="app-country">
                  <Text name="country" value={str("country")} onChange={(v) => set("country", v)} />
                </Field>
                <Field label="State / Province" htmlFor="app-stateProvince">
                  <Text name="stateProvince" value={str("stateProvince")} onChange={(v) => set("stateProvince", v)} />
                </Field>
                <Field label="City / Town" required error={errors.city} htmlFor="app-city">
                  <Text name="city" value={str("city")} onChange={(v) => set("city", v)} />
                </Field>
              </div>
              <Field label="Residential Address" htmlFor="app-resAddress">
                <Area name="resAddress" value={str("resAddress")} onChange={(v) => set("resAddress", v)} rows={2} />
              </Field>
              <Field label="Postal Address (if different)" htmlFor="app-postalAddress">
                <Area name="postalAddress" value={str("postalAddress")} onChange={(v) => set("postalAddress", v)} rows={2} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone / Mobile" required error={errors.phone} htmlFor="app-phone">
                  <Text name="phone" type="tel" value={str("phone")} onChange={(v) => set("phone", v)} />
                </Field>
                <Field label="WhatsApp Number" htmlFor="app-whatsapp">
                  <Text name="whatsapp" type="tel" value={str("whatsapp")} onChange={(v) => set("whatsapp", v)} />
                </Field>
                <Field label="Email Address" required error={errors.email} htmlFor="app-email">
                  <Text name="email" type="email" value={str("email")} onChange={(v) => set("email", v)} placeholder="Login details will be sent here" />
                </Field>
                <Field label="Alternative Email" htmlFor="app-altEmail">
                  <Text name="altEmail" type="email" value={str("altEmail")} onChange={(v) => set("altEmail", v)} />
                </Field>
                <Field label="Occupation / Profession" required error={errors.occupation} htmlFor="app-occupation">
                  <Text name="occupation" value={str("occupation")} onChange={(v) => set("occupation", v)} />
                </Field>
                <Field label="Current Employer / Organization" htmlFor="app-employer">
                  <Text name="employer" value={str("employer")} onChange={(v) => set("employer", v)} />
                </Field>
                <Field label="Position / Rank" htmlFor="app-positionRank">
                  <Text name="positionRank" value={str("positionRank")} onChange={(v) => set("positionRank", v)} />
                </Field>
                <Field label="Work Address" htmlFor="app-workAddress">
                  <Text name="workAddress" value={str("workAddress")} onChange={(v) => set("workAddress", v)} />
                </Field>
              </div>
            </section>

            <section aria-label="A2 Emergency contact" className="space-y-5">
              <SubHead code="A2" title="Emergency Contact" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.eFullName} htmlFor="app-eFullName">
                  <Text name="eFullName" value={str("eFullName")} onChange={(v) => set("eFullName", v)} />
                </Field>
                <Field label="Relationship to Applicant" required error={errors.eRelationship} htmlFor="app-eRelationship">
                  <Text name="eRelationship" value={str("eRelationship")} onChange={(v) => set("eRelationship", v)} placeholder="e.g. Spouse, Sibling" />
                </Field>
                <Field label="Phone Number" required error={errors.ePhone} htmlFor="app-ePhone">
                  <Text name="ePhone" type="tel" value={str("ePhone")} onChange={(v) => set("ePhone", v)} />
                </Field>
                <Field label="WhatsApp Number" htmlFor="app-eWhatsapp">
                  <Text name="eWhatsapp" type="tel" value={str("eWhatsapp")} onChange={(v) => set("eWhatsapp", v)} />
                </Field>
                <Field label="Email" htmlFor="app-eEmail">
                  <Text name="eEmail" type="email" value={str("eEmail")} onChange={(v) => set("eEmail", v)} />
                </Field>
                <Field label="Address" htmlFor="app-eAddress">
                  <Text name="eAddress" value={str("eAddress")} onChange={(v) => set("eAddress", v)} />
                </Field>
              </div>
            </section>

            <section aria-label="A3 Chaplaincy information" className="space-y-5">
              <SubHead code="A3" title="Chaplaincy / Ministry Information" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Are you currently serving as a chaplain?" required error={errors.servingChaplain}>
                  <RadioYN name="servingChaplain" value={str("servingChaplain")} onChange={(v) => set("servingChaplain", v)} />
                </Field>
                <Field label="Served in law enforcement, military, public safety, emergency response, or related field?" required error={errors.servedRelated}>
                  <RadioYN name="servedRelated" value={str("servedRelated")} onChange={(v) => set("servedRelated", v)} />
                </Field>
              </div>
              {str("servingChaplain") === "Yes" && (
                <div className="space-y-5 border border-gold-500/25 bg-gold-500/[0.04] p-5">
                  <Field label="Type of Chaplaincy" required error={errors.chapTypes}>
                    <CheckPills options={CHAP_TYPES} values={arr("chapTypes")} onChange={(v) => set("chapTypes", v)} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Other Type" htmlFor="app-chapTypesOther">
                      <Text name="chapTypesOther" value={str("chapTypesOther")} onChange={(v) => set("chapTypesOther", v)} />
                    </Field>
                    <Field label="Organization / Agency / Department" required error={errors.chapOrg} htmlFor="app-chapOrg">
                      <Text name="chapOrg" value={str("chapOrg")} onChange={(v) => set("chapOrg", v)} />
                    </Field>
                    <Field label="Date You Commenced Chaplaincy" htmlFor="app-chapSince">
                      <Text name="chapSince" value={str("chapSince")} onChange={(v) => set("chapSince", v)} placeholder="MM/YYYY" />
                    </Field>
                    <Field label="Current Chaplaincy Position / Rank" htmlFor="app-chapRank">
                      <Text name="chapRank" value={str("chapRank")} onChange={(v) => set("chapRank", v)} />
                    </Field>
                  </div>
                </div>
              )}
              {str("servedRelated") === "Yes" && (
                <Field label="Details of Related Service" required error={errors.servedDetails} htmlFor="app-servedDetails">
                  <Area name="servedDetails" value={str("servedDetails")} onChange={(v) => set("servedDetails", v)} placeholder="Branch, role, years, highlights…" />
                </Field>
              )}
            </section>

            <section aria-label="A4 Church affiliation" className="space-y-5">
              <SubHead code="A4" title="Church / Ministry Affiliation" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name of Church / Ministry / Religious Organization" htmlFor="app-churchName">
                  <Text name="churchName" value={str("churchName")} onChange={(v) => set("churchName", v)} />
                </Field>
                <Field label="Denomination / Religious Tradition" htmlFor="app-denomination">
                  <Text name="denomination" value={str("denomination")} onChange={(v) => set("denomination", v)} />
                </Field>
                <Field label="Current Position / Ministerial Role" htmlFor="app-churchRole">
                  <Text name="churchRole" value={str("churchRole")} onChange={(v) => set("churchRole", v)} />
                </Field>
                <Field label="Senior Pastor / Bishop / Spiritual Leader" htmlFor="app-churchLeader">
                  <Text name="churchLeader" value={str("churchLeader")} onChange={(v) => set("churchLeader", v)} />
                </Field>
                <Field label="Phone" htmlFor="app-churchPhone">
                  <Text name="churchPhone" type="tel" value={str("churchPhone")} onChange={(v) => set("churchPhone", v)} />
                </Field>
                <Field label="Email" htmlFor="app-churchEmail">
                  <Text name="churchEmail" type="email" value={str("churchEmail")} onChange={(v) => set("churchEmail", v)} />
                </Field>
                <Field label="Address" htmlFor="app-churchAddress">
                  <Text name="churchAddress" value={str("churchAddress")} onChange={(v) => set("churchAddress", v)} />
                </Field>
                <Field label="How Long Affiliated?" htmlFor="app-churchYears">
                  <Text name="churchYears" value={str("churchYears")} onChange={(v) => set("churchYears", v)} placeholder="e.g. 8 years" />
                </Field>
              </div>
            </section>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-10">
            <section aria-label="B1 Education" className="space-y-5">
              <SubHead code="B1" title="Educational Background" />
              <DynamicRows
                title="Qualifications (highest first)"
                columns={[
                  { key: "institution", label: "Institution" },
                  { key: "qualification", label: "Qualification / Degree" },
                  { key: "field", label: "Course / Field of Study" },
                  { key: "year", label: "Year" },
                ]}
                rows={rows("educationRows")}
                onChange={(v) => set("educationRows", v)}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Highest Educational Qualification" required error={errors.highestQual} htmlFor="app-highestQual">
                  <Text name="highestQual" value={str("highestQual")} onChange={(v) => set("highestQual", v)} />
                </Field>
                <Field label="Professional / Technical Certifications" htmlFor="app-profCerts">
                  <Text name="profCerts" value={str("profCerts")} onChange={(v) => set("profCerts", v)} />
                </Field>
              </div>
            </section>

            <section aria-label="B2 Theological education" className="space-y-5">
              <SubHead code="B2" title="Theological / Ministerial Education" />
              <Field label="Have you received formal theological or ministerial training?" required error={errors.theoTraining}>
                <div className="max-w-xs">
                  <RadioYN name="theoTraining" value={str("theoTraining")} onChange={(v) => set("theoTraining", v)} />
                </div>
              </Field>
              {str("theoTraining") === "Yes" && (
                <div className="grid gap-5 border border-gold-500/25 bg-gold-500/[0.04] p-5 sm:grid-cols-2">
                  <Field label="Institution" required error={errors.theoInst} htmlFor="app-theoInst">
                    <Text name="theoInst" value={str("theoInst")} onChange={(v) => set("theoInst", v)} />
                  </Field>
                  <Field label="Qualification" required error={errors.theoQual} htmlFor="app-theoQual">
                    <Text name="theoQual" value={str("theoQual")} onChange={(v) => set("theoQual", v)} />
                  </Field>
                  <Field label="Field / Area of Study" htmlFor="app-theoField">
                    <Text name="theoField" value={str("theoField")} onChange={(v) => set("theoField", v)} />
                  </Field>
                  <Field label="Year Completed" htmlFor="app-theoYear">
                    <Text name="theoYear" value={str("theoYear")} onChange={(v) => set("theoYear", v)} />
                  </Field>
                  <Field label="Ordination / Licensing Date" htmlFor="app-ordDate">
                    <Text name="ordDate" value={str("ordDate")} onChange={(v) => set("ordDate", v)} />
                  </Field>
                  <Field label="Ordaining / Licensing Body" htmlFor="app-ordBody">
                    <Text name="ordBody" value={str("ordBody")} onChange={(v) => set("ordBody", v)} />
                  </Field>
                </div>
              )}
            </section>

            <section aria-label="B3 Experience" className="space-y-5">
              <SubHead code="B3" title="Professional Experience" />
              <p className="-mt-2 text-sm text-ink-100/55">Employment, ministry, military, law enforcement, public safety, emergency response, or community service.</p>
              <DynamicRows
                title="Experience Entries"
                columns={[
                  { key: "org", label: "Organization / Employer" },
                  { key: "position", label: "Position / Rank" },
                  { key: "period", label: "Period Served" },
                  { key: "duties", label: "Main Responsibilities" },
                ]}
                rows={rows("employmentRows")}
                onChange={(v) => set("employmentRows", v)}
              />
            </section>

            <section aria-label="B4 Training" className="space-y-5">
              <SubHead code="B4" title="Professional / Chaplaincy Training" />
              <Field label="Relevant Training Completed">
                <CheckPills options={TRAINING} values={arr("training")} onChange={(v) => set("training", v)} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Other Training" htmlFor="app-trainingOther">
                  <Text name="trainingOther" value={str("trainingOther")} onChange={(v) => set("trainingOther", v)} />
                </Field>
                <Field label="Other Relevant Certifications" htmlFor="app-trainingNotes">
                  <Text name="trainingNotes" value={str("trainingNotes")} onChange={(v) => set("trainingNotes", v)} />
                </Field>
              </div>
            </section>

            <section aria-label="B5 Memberships" className="space-y-5">
              <SubHead code="B5" title="Professional Memberships & Affiliations" />
              <DynamicRows
                title="Organizations"
                columns={[
                  { key: "org", label: "Organization" },
                  { key: "number", label: "Membership No." },
                ]}
                rows={rows("membershipRows")}
                onChange={(v) => set("membershipRows", v)}
              />
            </section>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10">
            <section aria-label="C1 Referee 1" className="space-y-5">
              <SubHead code="C1" title="Referee 1 — Clergy / Spiritual Leader" />
              <p className="-mt-2 text-sm text-ink-100/55">Preferably a Pastor, Bishop, Imam, Chaplain, Priest, Minister, or other recognized spiritual leader who knows you personally.</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.r1Name} htmlFor="app-r1Name">
                  <Text name="r1Name" value={str("r1Name")} onChange={(v) => set("r1Name", v)} />
                </Field>
                <Field label="Title / Position" htmlFor="app-r1Title">
                  <Text name="r1Title" value={str("r1Title")} onChange={(v) => set("r1Title", v)} />
                </Field>
                <Field label="Church / Ministry / Organization" required error={errors.r1Org} htmlFor="app-r1Org">
                  <Text name="r1Org" value={str("r1Org")} onChange={(v) => set("r1Org", v)} />
                </Field>
                <Field label="Denomination / Religious Affiliation" htmlFor="app-r1Denomination">
                  <Text name="r1Denomination" value={str("r1Denomination")} onChange={(v) => set("r1Denomination", v)} />
                </Field>
                <Field label="Relationship to Applicant" htmlFor="app-r1Relationship">
                  <Text name="r1Relationship" value={str("r1Relationship")} onChange={(v) => set("r1Relationship", v)} />
                </Field>
                <Field label="How Long Known?" htmlFor="app-r1Years">
                  <Text name="r1Years" value={str("r1Years")} onChange={(v) => set("r1Years", v)} />
                </Field>
                <Field label="Office / Residential Address" htmlFor="app-r1Address">
                  <Text name="r1Address" value={str("r1Address")} onChange={(v) => set("r1Address", v)} />
                </Field>
                <Field label="Mobile / Phone" required error={errors.r1Phone} htmlFor="app-r1Phone">
                  <Text name="r1Phone" type="tel" value={str("r1Phone")} onChange={(v) => set("r1Phone", v)} />
                </Field>
                <Field label="WhatsApp" htmlFor="app-r1Whatsapp">
                  <Text name="r1Whatsapp" type="tel" value={str("r1Whatsapp")} onChange={(v) => set("r1Whatsapp", v)} />
                </Field>
                <Field label="Email" htmlFor="app-r1Email">
                  <Text name="r1Email" type="email" value={str("r1Email")} onChange={(v) => set("r1Email", v)} />
                </Field>
              </div>
              <Field label="How would you describe the applicant's character and integrity? (to be confirmed with referee)" htmlFor="app-r1Character">
                <Area name="r1Character" value={str("r1Character")} onChange={(v) => set("r1Character", v)} rows={2} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Responsible spiritual & ethical conduct?" required error={errors.r1Ethical}>
                  <RadioYN name="r1Ethical" value={str("r1Ethical")} onChange={(v) => set("r1Ethical", v)} />
                </Field>
                <Field label="Recommends applicant for IPPSCC?" required error={errors.r1Recommend}>
                  <RadioYN name="r1Recommend" value={str("r1Recommend")} onChange={(v) => set("r1Recommend", v)} />
                </Field>
                <Field label="Attestation Letter" required error={errors.r1Attached}>
                  <RadioRow name="r1Attached" value={str("r1Attached")} options={["Submitted", "Not Submitted"]} onChange={(v) => set("r1Attached", v)} />
                </Field>
              </div>
              <p className="border border-white/10 bg-ink-950/50 px-4 py-3 text-xs leading-relaxed text-ink-100/55">
                Required supporting document: an official attestation/reference letter on the referee&apos;s letterhead (or signed written reference) with full name, title, organization, address, phone, WhatsApp, email, relationship, character confirmation, date and signature. You will receive secure submission instructions after initial review.
              </p>
            </section>

            <section aria-label="C2 Referee 2" className="space-y-5">
              <SubHead code="C2" title="Referee 2 — Military / Law Enforcement / Civil Service" />
              <p className="-mt-2 text-sm text-ink-100/55">Preferably an active or retired military personnel, police/law enforcement officer, public safety professional, or senior civil servant who knows you.</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.r2Name} htmlFor="app-r2Name">
                  <Text name="r2Name" value={str("r2Name")} onChange={(v) => set("r2Name", v)} />
                </Field>
                <Field label="Title / Rank" htmlFor="app-r2Rank">
                  <Text name="r2Rank" value={str("r2Rank")} onChange={(v) => set("r2Rank", v)} />
                </Field>
                <Field label="Agency / Department / Organization" required error={errors.r2Agency} htmlFor="app-r2Agency">
                  <Text name="r2Agency" value={str("r2Agency")} onChange={(v) => set("r2Agency", v)} />
                </Field>
                <Field label="Service / Department" htmlFor="app-r2Service">
                  <Text name="r2Service" value={str("r2Service")} onChange={(v) => set("r2Service", v)} />
                </Field>
                <Field label="Service / ID Number (if applicable)" htmlFor="app-r2ServiceNo">
                  <Text name="r2ServiceNo" value={str("r2ServiceNo")} onChange={(v) => set("r2ServiceNo", v)} />
                </Field>
                <Field label="Relationship to Applicant" htmlFor="app-r2Relationship">
                  <Text name="r2Relationship" value={str("r2Relationship")} onChange={(v) => set("r2Relationship", v)} />
                </Field>
                <Field label="How Long Known?" htmlFor="app-r2Years">
                  <Text name="r2Years" value={str("r2Years")} onChange={(v) => set("r2Years", v)} />
                </Field>
                <Field label="Official / Residential Address" htmlFor="app-r2Address">
                  <Text name="r2Address" value={str("r2Address")} onChange={(v) => set("r2Address", v)} />
                </Field>
                <Field label="Mobile / Phone" required error={errors.r2Phone} htmlFor="app-r2Phone">
                  <Text name="r2Phone" type="tel" value={str("r2Phone")} onChange={(v) => set("r2Phone", v)} />
                </Field>
                <Field label="WhatsApp" htmlFor="app-r2Whatsapp">
                  <Text name="r2Whatsapp" type="tel" value={str("r2Whatsapp")} onChange={(v) => set("r2Whatsapp", v)} />
                </Field>
                <Field label="Email" htmlFor="app-r2Email">
                  <Text name="r2Email" type="email" value={str("r2Email")} onChange={(v) => set("r2Email", v)} />
                </Field>
                <Field label="Professional conduct & integrity (to be confirmed with referee)" htmlFor="app-r2Conduct">
                  <Text name="r2Conduct" value={str("r2Conduct")} onChange={(v) => set("r2Conduct", v)} />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Known trustworthy & responsible?" required error={errors.r2Trustworthy}>
                  <RadioYN name="r2Trustworthy" value={str("r2Trustworthy")} onChange={(v) => set("r2Trustworthy", v)} />
                </Field>
                <Field label="Recommends applicant for IPPSCC?" required error={errors.r2Recommend}>
                  <RadioYN name="r2Recommend" value={str("r2Recommend")} onChange={(v) => set("r2Recommend", v)} />
                </Field>
                <Field label="Attestation Letter" required error={errors.r2Attached}>
                  <RadioRow name="r2Attached" value={str("r2Attached")} options={["Submitted", "Not Submitted"]} onChange={(v) => set("r2Attached", v)} />
                </Field>
              </div>
            </section>

            <section aria-label="C3 Background declaration" className="space-y-5">
              <SubHead code="C3" title="Character, Conduct & Background Declaration" />
              <p className="-mt-2 text-sm text-ink-100/55">Answer all questions truthfully. A “Yes” answer requires details — honesty here is itself a mark of character.</p>
              {BG_QUESTIONS.map((q) => (
                <div key={q.key} className="border border-white/10 bg-ink-950/40 p-4 sm:p-5">
                  <div className="grid gap-4 lg:grid-cols-[1fr_220px] lg:items-start">
                    <p className="text-sm leading-relaxed text-ink-100/80">{q.text}</p>
                    <div>
                      <RadioYN name={q.key} value={str(q.key)} onChange={(v) => set(q.key, v)} />
                      {errors[q.key] && <p role="alert" className={errCls}>{errors[q.key]}</p>}
                    </div>
                  </div>
                  {str(q.key) === "Yes" && (
                    <div className="mt-4">
                      <Field label="Provide details (nature, date, location, outcome)" required error={errors[q.detail]} htmlFor={`app-${q.detail}`}>
                        <Area name={q.detail} value={str(q.detail)} onChange={(v) => set(q.detail, v)} rows={2} />
                      </Field>
                    </div>
                  )}
                </div>
              ))}
            </section>

            <section aria-label="C4 Conduct" className="space-y-5">
              <SubHead code="C4" title="Personal & Professional Conduct" />
              {CONDUCT_QUESTIONS.map((q) => (
                <div key={q.key} className="grid gap-3 border border-white/10 bg-ink-950/40 p-4 sm:p-5 lg:grid-cols-[1fr_220px] lg:items-center">
                  <p className="text-sm leading-relaxed text-ink-100/80">{q.text}</p>
                  <div>
                    <RadioYN name={q.key} value={str(q.key)} onChange={(v) => set(q.key, v)} />
                    {errors[q.key] && <p role="alert" className={errCls}>{errors[q.key]}</p>}
                  </div>
                </div>
              ))}
            </section>

            <section aria-label="C5 Motivation" className="space-y-5">
              <SubHead code="C5" title="Motivation for Joining IPPSCC" />
              <Field label="Why do you wish to become a member / chaplain of IPPSCC?" required error={errors.motiveWhy} htmlFor="app-motiveWhy">
                <Area name="motiveWhy" value={str("motiveWhy")} onChange={(v) => set("motiveWhy", v)} rows={3} />
              </Field>
              <Field label="What experience, skills, or qualifications can you contribute?" required error={errors.motiveSkills} htmlFor="app-motiveSkills">
                <Area name="motiveSkills" value={str("motiveSkills")} onChange={(v) => set("motiveSkills", v)} rows={3} />
              </Field>
              <Field label="Describe your understanding of the role of a public safety chaplain." required error={errors.motiveUnderstanding} htmlFor="app-motiveUnderstanding">
                <Area name="motiveUnderstanding" value={str("motiveUnderstanding")} onChange={(v) => set("motiveUnderstanding", v)} rows={3} />
              </Field>
              <Field label="What population or area of chaplaincy would you particularly like to serve?" htmlFor="app-motivePopulation">
                <Text name="motivePopulation" value={str("motivePopulation")} onChange={(v) => set("motivePopulation", v)} />
              </Field>
            </section>

            <section aria-label="C6 Availability" className="space-y-5">
              <SubHead code="C6" title="Availability & Service" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Willing to participate in chaplaincy assignments when required?" required error={errors.availAssign}>
                  <RadioYN name="availAssign" value={str("availAssign")} onChange={(v) => set("availAssign", v)} />
                </Field>
                <Field label="Willing to participate in IPPSCC training & development?" required error={errors.availTraining}>
                  <RadioYN name="availTraining" value={str("availTraining")} onChange={(v) => set("availTraining", v)} />
                </Field>
              </div>
              <Field label="Preferred Area of Service">
                <CheckPills options={SERVICE_AREAS} values={arr("serviceAreas")} onChange={(v) => set("serviceAreas", v)} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Other Area" htmlFor="app-serviceOther">
                  <Text name="serviceOther" value={str("serviceOther")} onChange={(v) => set("serviceOther", v)} />
                </Field>
                <Field label="Geographical Area Available to Serve" htmlFor="app-serviceGeo">
                  <Text name="serviceGeo" value={str("serviceGeo")} onChange={(v) => set("serviceGeo", v)} />
                </Field>
              </div>
            </section>

            <section aria-label="C7 Documents" className="space-y-5">
              <SubHead code="C7" title="Document Checklist" />
              <p className="-mt-2 text-sm text-ink-100/55">Tick each document you will submit. Secure submission instructions follow initial review.</p>
              <Field label="Documents to Submit">
                <CheckPills options={DOCS} values={arr("docs")} onChange={(v) => set("docs", v)} />
              </Field>
              <Field label="Other Supporting Documents" htmlFor="app-docsOther">
                <Text name="docsOther" value={str("docsOther")} onChange={(v) => set("docsOther", v)} />
              </Field>
            </section>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <section aria-label="Review summary" className="space-y-5">
              <SubHead code="R1" title="Review Your Application" />
              <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  { code: "A", title: "Personal Details", keys: ["fullName", "email", "phone", "country", "servingChaplain"] },
                  { code: "B", title: "Education & Qualification", keys: ["highestQual", "theoTraining"] },
                  { code: "C", title: "Reference & Background", keys: ["r1Name", "r2Name", "availAssign"] },
                ].map((s, i) => (
                  <div key={s.code} className="bg-ink-950 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[0.62rem] tracking-[0.22em] text-gold-400 uppercase">
                        Section {s.code} · {stepCounts[i].filled}/{stepCounts[i].total}
                      </p>
                      <button
                        type="button"
                        onClick={() => go(i)}
                        className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-300 uppercase underline underline-offset-4"
                      >
                        Edit
                      </button>
                    </div>
                    <h4 className="mt-2 font-display text-lg text-white">{s.title}</h4>
                    <dl className="mt-3 space-y-1.5">
                      {s.keys.map((k) => (
                        <div key={k} className="flex justify-between gap-3 text-xs">
                          <dt className="text-ink-100/45">{k}</dt>
                          <dd className="truncate text-right text-ink-100/85">
                            {Array.isArray(data[k]) ? `${(data[k] as unknown[]).length} selected` : String(data[k] || "—")}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </section>

            <section aria-label="C8 Attestation" className="space-y-5">
              <SubHead code="C8" title="Applicant's Attestation & Declaration" />
              <Field label="I, (type your full name as signature)" required error={errors.attestName} htmlFor="app-attestName">
                <Text name="attestName" value={str("attestName")} onChange={(v) => set("attestName", v)} placeholder="Type your full legal name" />
              </Field>
              <div className="space-y-3">
                {CONSENTS.map((text, i) => {
                  const key = `consent${i + 1}`;
                  const on = data[key] === true;
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => set(key, !on)}
                        className={`flex w-full items-start gap-3 border p-4 text-left transition-all ${
                          on ? "border-gold-400/70 bg-gold-500/[0.08]" : "border-white/12 hover:border-gold-500/40"
                        }`}
                      >
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${on ? "border-gold-400 bg-gold-500 text-ink-950" : "border-white/25"}`}>
                          {on && <Check className="h-3 w-3" aria-hidden="true" />}
                        </span>
                        <span className="text-sm leading-relaxed text-ink-100/80">{text}</span>
                      </button>
                      {errors[key] && <p role="alert" className={errCls}>{errors[key]}</p>}
                    </div>
                  );
                })}
              </div>
            </section>

            {submitError && (
              <p role="alert" className="border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
                {submitError}
              </p>
            )}
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…
                </>
              ) : (
                <>
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Submit Application
                </>
              )}
            </button>
          </div>
        )}

        {/* Nav */}
        {step < 3 && (
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => (step === 0 ? null : go(step - 1))}
              disabled={step === 0}
              className="flex items-center justify-center gap-2 border border-white/20 px-6 py-3.5 font-mono text-[0.65rem] tracking-[0.22em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
            <button
              type="button"
              onClick={clearDraft}
              className="flex items-center justify-center gap-2 px-4 py-3 font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/40 uppercase transition-colors hover:text-crimson-300"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Clear draft
            </button>
            <button
              type="button"
              onClick={() => go(step + 1)}
              className="group flex items-center justify-center gap-2 bg-gold-500 px-8 py-3.5 font-mono text-[0.65rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-400"
            >
              {step === 2 ? "Review & Declare" : `Continue to Section ${STEPS[step + 1].code}`}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="mt-8 flex justify-start border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => go(2)}
              className="flex items-center justify-center gap-2 border border-white/20 px-6 py-3.5 font-mono text-[0.65rem] tracking-[0.22em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Section C
            </button>
          </div>
        )}
        <p className="mt-6 text-center text-xs text-ink-100/40">
          Your progress saves automatically on this device. <span className="text-gold-400">*</span> marks required answers.
        </p>
      </div>
    </div>
  );
}
