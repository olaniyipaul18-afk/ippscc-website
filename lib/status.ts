import type { ApplicationStatus } from "./store";

/** Client-safe status presentation (no server dependencies). */

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Received",
  under_review: "Under Review",
  changes_requested: "Changes Requested",
  approved: "Approved",
  rejected: "Not Approved",
  completed: "Completed",
};

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  pending: "border-white/20 text-ink-100/75",
  under_review: "border-gold-500/50 text-gold-300",
  changes_requested: "border-crimson-500/60 text-crimson-300",
  approved: "border-gold-400 bg-gold-500/15 text-gold-200",
  rejected: "border-crimson-600 bg-crimson-500/10 text-crimson-300",
  completed: "border-gold-400 bg-gold-500 text-ink-950",
};

export const STATUS_ORDER: ApplicationStatus[] = [
  "pending",
  "under_review",
  "approved",
  "completed",
];
