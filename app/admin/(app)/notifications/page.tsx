"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, FileText, Loader2, Megaphone, Paperclip, Trash2, X } from "lucide-react";
import type { MemberPublic, NotificationItemSummary } from "@/lib/store";

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const MIME_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp",
  pdf: "application/pdf", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain", csv: "text/csv",
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function BroadcastPage() {
  const [members, setMembers] = useState<MemberPublic[]>([]);
  const [audience, setAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);
  const [recent, setRecent] = useState<NotificationItemSummary[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadRecent = useCallback(async () => {
    const res = await fetch("/api/admin/notifications?limit=50");
    if (res.ok) {
      const data = await res.json();
      setRecent(data.notifications || []);
    }
  }, []);

  useEffect(() => {
    fetch("/api/members")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setMembers(d.members || []))
      .catch(() => {});
    loadRecent().catch(() => {});
  }, [sent, loadRecent]);

  function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setError("");
    const combined = [...attachments, ...Array.from(fileList)];
    if (combined.length > MAX_FILES) {
      setError(`Attach no more than ${MAX_FILES} files to one message.`);
    } else if (combined.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) {
      setError("Attachments must total 4 MB or less per message.");
    } else {
      const unsupported = combined.find((file) => {
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        const expected = MIME_BY_EXTENSION[ext];
        return !expected || (file.type && file.type !== expected);
      });
      if (unsupported) {
        setError("Use image, PDF, DOCX, XLSX, PPTX, TXT or CSV files.");
      } else {
        setAttachments(combined);
        setSent(false);
      }
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeFile(index: number) {
    setAttachments((files) => files.filter((_, i) => i !== index));
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    setSent(false);
    try {
      const form = new FormData();
      form.append("audience", audience);
      form.append("title", title);
      form.append("message", message);
      for (const file of attachments) form.append("attachments", file);

      const res = await fetch("/api/notifications", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Broadcast failed.");
      setTitle("");
      setMessage("");
      setAudience("all");
      setAttachments([]);
      if (fileRef.current) fileRef.current.value = "";
      setSent(true);
      await loadRecent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Broadcast failed.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteNotification(item: NotificationItemSummary) {
    const filesNote = item.attachments.length ? " Its attached files will also be removed." : "";
    const confirmed = window.confirm(`Delete “${item.title}” from the recipient portal? This cannot be undone.${filesNote}`);
    if (!confirmed) return;

    setDeleting(item.id);
    setError("");
    setNotice("");
    try {
      const res = await fetch(`/api/admin/notifications/${encodeURIComponent(item.id)}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Notification could not be deleted.");
      setRecent((items) => items.filter((existing) => existing.id !== item.id));
      setNotice(data.attachmentsDeleted === false
        ? "Notification deleted. An attachment could not be removed from private storage, but it is no longer available from the portal."
        : "Notification deleted from the recipient portal.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Notification could not be deleted.");
    } finally {
      setDeleting(null);
    }
  }

  const audienceName = (id: string) =>
    id === "all" ? "Corps-wide" : members.find((m) => m.id === id)?.name || id;

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Comms</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Broadcast.</h1>

      <form onSubmit={handleSubmit} className="mt-8 border border-white/10 bg-white/[0.02] p-6 sm:p-8" aria-label="Send notification">
        <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
          <div>
            <label htmlFor="bc-audience" className="mb-2 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase">
              Audience
            </label>
            <select
              id="bc-audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-white focus:border-gold-400 focus:outline-none"
            >
              <option value="all" className="bg-ink-900">All members</option>
              {members.map((m) => (
                <option key={m.id} value={m.id} className="bg-ink-900">
                  {m.name} ({m.memberId})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bc-title" className="mb-2 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase">
              Title
            </label>
            <input
              id="bc-title"
              required
              maxLength={160}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Invitation to the investiture"
              className="w-full border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="bc-message" className="mb-2 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase">
            Message
          </label>
          <textarea
            id="bc-message"
            required
            rows={5}
            maxLength={10000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write clearly and briefly — this appears in members' portals."
            className="w-full resize-y border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
          />
        </div>

        <div className="mt-5 border border-white/10 bg-ink-950/40 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.2em] text-ink-100/70 uppercase">
                <Paperclip className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" /> Attach files (optional)
              </p>
              <p className="mt-1 text-xs text-ink-100/45">Up to 5 files, 4 MB total: images, PDF, DOCX, XLSX, PPTX, TXT or CSV.</p>
            </div>
            <input
              ref={fileRef}
              id="bc-attachments"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.pdf,.docx,.xlsx,.pptx,.txt,.csv"
              className="sr-only"
              onChange={(e) => addFiles(e.currentTarget.files)}
              aria-label="Choose notification attachments"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="flex items-center gap-2 border border-gold-500/50 px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.18em] text-gold-200 uppercase transition-colors hover:bg-gold-500/10 disabled:opacity-50"
            >
              <Paperclip className="h-3.5 w-3.5" aria-hidden="true" /> Choose files
            </button>
          </div>
          {attachments.length > 0 && (
            <ul className="mt-4 space-y-2" aria-label="Selected attachments">
              {attachments.map((file, index) => (
                <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 border border-white/10 bg-white/[0.02] px-3 py-2.5">
                  <span className="flex min-w-0 items-center gap-2 text-sm text-ink-100/80">
                    <FileText className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                    <span className="truncate">{file.name}</span>
                    <span className="shrink-0 font-mono text-xs text-ink-100/40">{formatBytes(file.size)}</span>
                  </span>
                  <button type="button" onClick={() => removeFile(index)} aria-label={`Remove ${file.name}`} className="shrink-0 p-1 text-ink-100/50 hover:text-crimson-300">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
              <li className="text-right font-mono text-[0.58rem] text-ink-100/40">Total: {formatBytes(attachments.reduce((sum, file) => sum + file.size, 0))}</li>
            </ul>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">{error}</p>
        )}
        {notice && <p role="status" className="mt-4 border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{notice}</p>}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="flex items-center gap-2 bg-gold-500 px-7 py-3.5 font-mono text-[0.65rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60"
          >
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : <><Megaphone className="h-4 w-4" aria-hidden="true" /> Send Notification</>}
          </button>
          {sent && <span className="flex items-center gap-1.5 text-sm text-emerald-300" role="status"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Delivered</span>}
        </div>
      </form>

      {recent.length > 0 && (
        <div className="mt-8">
          <h2 className="font-mono text-[0.65rem] tracking-[0.26em] text-gold-400 uppercase">Recent Notifications</h2>
          <p className="mt-2 text-xs text-ink-100/45">Deleting removes the notification from recipients’ portals and removes its attached files. This action cannot be undone.</p>
          <ul className="mt-4 space-y-3">
            {recent.map((n) => (
              <li key={n.id} className="border border-white/10 bg-white/[0.02] px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="mt-0.5 font-mono text-[0.6rem] tracking-[0.18em] text-ink-100/40 uppercase">
                      To {audienceName(n.audience)} · {new Date(n.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={deleting === n.id}
                    onClick={() => deleteNotification(n)}
                    aria-label={`Delete notification: ${n.title}`}
                    title="Delete notification"
                    className="flex shrink-0 items-center gap-2 border border-crimson-500/40 px-3 py-2 text-crimson-300 transition-colors hover:bg-crimson-500/10 disabled:opacity-50"
                  >
                    {deleting === n.id ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" aria-hidden="true" />}
                    <span className="font-mono text-[0.56rem] tracking-[0.14em] uppercase">Delete</span>
                  </button>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-ink-100/65">{n.body}</p>
                {n.attachments.length > 0 && <p className="mt-2 text-xs text-gold-200/80">Attachments: {n.attachments.map((file) => file.name).join(", ")}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
