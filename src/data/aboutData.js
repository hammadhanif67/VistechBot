import { Flag, Languages, Library, PhoneCall } from "lucide-react";

/**
 * SAMPLE COMPANY NARRATIVE — NOT VERIFIED FACTS.
 *
 * Milestones, metrics and team profiles below ship with the template as
 * illustrative content. They are flagged here and disclosed on the page so they
 * are not read as audited figures or as real named individuals. Replace them
 * with your own before launch.
 */
export const aboutContentIsSample = true;

/**
 * The principles the product is built on.
 *
 * Written as positions rather than values — "innovation first" and "customer
 * success" said nothing, and every competitor's about page said the same two
 * things.
 */
export const principles = [
  {
    title: "Deflection is not the goal",
    text: "A support bot that stonewalls its way to a low ticket count has not helped anyone. What matters is whether the customer got the right answer and how quickly. Sometimes the right answer is a person, and that still counts as working.",
  },
  {
    title: "Answers come from your content",
    text: "The assistant reads your documentation, your policies and your product data. It does not improvise. Where your content is thin it says so, which is far less damaging than filling the gap with something that merely sounds right.",
  },
  {
    title: "Know where to stop",
    text: "Every deployment draws a line the assistant will not cross on its own. Refunds. Medical questions. Anything with legal weight. Those escalate by design, with the whole conversation attached.",
  },
  {
    title: "Configurable by the people who use it",
    text: "Support leads should be able to change tone, rules and escalation paths without filing an engineering ticket. When a change needs a developer, we treat that as something we got wrong.",
  },
];

export const journey = [
  {
    icon: Flag,
    year: "2023",
    title: "Company founded",
    text: "One goal at the start: support tooling a small team could deploy on its own, with no services engagement attached.",
  },
  {
    icon: PhoneCall,
    year: "2024",
    title: "Voice agents shipped",
    text: "Phone conversations joined web chat, sharing the same knowledge base and the same escalation rules.",
  },
  {
    icon: Library,
    year: "2024",
    title: "Knowledge base AI",
    text: "Answers stopped being scripted flows and started coming from the customer's own documentation.",
  },
  {
    icon: Languages,
    year: "2025",
    title: "Multi-channel and multilingual",
    text: "WhatsApp and Messenger arrived, and language detection stopped being something you had to configure.",
  },
];

export const team = [
  {
    initials: "SJ",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    text: "Ten years on conversational systems, mostly in machine learning and natural language processing.",
  },
  {
    initials: "MC",
    name: "Michael Chen",
    role: "CTO",
    text: "Builds the infrastructure the platform runs on. Led similar systems at larger companies first.",
  },
  {
    initials: "ER",
    name: "Emily Rodriguez",
    role: "Head of Product",
    text: "Works on the parts support teams configure themselves, so nothing needs an implementation project.",
  },
  {
    initials: "DK",
    name: "David Kim",
    role: "VP of Engineering",
    text: "Distributed systems and platform engineering. Has kept a lot of high-volume services upright.",
  },
];
