import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Law Enforcement Chaplaincy — Serving Those Who Protect",
  description:
    "IPPSCC law-enforcement chaplaincy exists at the intersection of professional service and human need — standing beside the person behind the badge.",
};

export default function LawEnforcementPage() {
  return (
    <ServiceDetail
      kicker="Law Enforcement Chaplaincy"
      title="Serving those who protect."
      lede="Law-enforcement chaplaincy exists at the intersection of professional service and human need — disciplined, confidential and steadfast."
      image="/images/hero-duty.jpg"
      imageAlt="Uniformed officers silhouetted against dawn light"
      sectionLabel="Law Enforcement"
      intro={[
        "A badge does not eliminate grief. A uniform does not make someone immune to pressure. Behind every law-enforcement role is a human being — with family, faith, questions, responsibilities, victories, disappointments and difficult days.",
        "The IPPSCC chaplain serves within demanding law-enforcement environments as a calm, confidential and compassionate presence: trusted in ordinary station life, and steady when the extraordinary happens. Presence is earned through reliability — showing up, holding confidences, understanding rank structure and policy, and never confusing pastoral access with operational authority.",
        "Chaplaincy here is not enforcement, investigation or command. It is accompaniment: listening without unnecessary judgment, supporting without overstepping boundaries, and referring responsibly whenever needs extend beyond chaplaincy scope.",
      ]}
      listTitle="A chaplain may provide an appropriate presence during"
      listIntro="Each setting below represents a doorway through which steady, professional chaplaincy can enter an officer's world."
      points={[
        "Difficult personal circumstances",
        "Grief and bereavement",
        "Family challenges",
        "Critical incidents",
        "Spiritual questions",
        "Times of uncertainty",
        "Community engagement",
        "Appropriate ceremonial occasions",
      ]}
      closingTitle="The Mission Is Simple"
      closingCopy="Stand beside the person behind the badge."
      related={[
        { href: "/services/first-responder", label: "First Responder Chaplaincy", note: "When they respond, we stand ready" },
        { href: "/services/wellness", label: "Wellness & Support", note: "Strength to keep serving" },
      ]}
    />
  );
}
