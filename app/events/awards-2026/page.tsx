import { permanentRedirect } from "next/navigation";

/** Preserve older links while retiring the former voting event. */
export default function LegacyAwardsEvent() {
  permanentRedirect("/events/investiture-2026");
}
