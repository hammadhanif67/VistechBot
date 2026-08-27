import { Building2, CreditCard, Crown, Headphones, MessageSquareText, Rocket, ShieldCheck, Zap } from "lucide-react";

/**
 * Pricing.
 *
 * Structured as a comparison matrix rather than four independent card
 * definitions: every plan answers the same set of rows, which is the only way a
 * reader can actually compare them. `PLAN_ROWS` defines the questions, and each
 * plan answers them in the same order.
 */
export const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: MessageSquareText,
    monthly: 49,
    yearly: 470,
    desc: "For a small team putting AI on one channel.",
    cta: "Start trial",
    values: {
      conversations: "1,000 / month",
      channels: "Website chat, WhatsApp",
      voice: false,
      storage: "5 GB",
      crm: false,
      analytics: "Core reporting",
      seats: "3",
      support: "Email",
    },
  },
  {
    id: "business",
    name: "Business",
    icon: Rocket,
    monthly: 99,
    yearly: 950,
    featured: true,
    desc: "For a growing desk that needs CRM and voice.",
    cta: "Start trial",
    values: {
      conversations: "10,000 / month",
      channels: "Adds Messenger and email",
      voice: "Included",
      storage: "20 GB",
      crm: "Two-way sync",
      analytics: "Full dashboards",
      seats: "10",
      support: "Email and chat",
    },
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    monthly: 199,
    yearly: 1910,
    desc: "For teams automating across the whole queue.",
    cta: "Start trial",
    values: {
      conversations: "20,000 / month",
      channels: "All channels",
      voice: "Included",
      storage: "100 GB",
      crm: "Two-way sync and automation",
      analytics: "Full dashboards and exports",
      seats: "25",
      support: "Priority",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    monthly: 499,
    yearly: 4790,
    desc: "For high volume, custom integrations and governance.",
    cta: "Contact sales",
    values: {
      conversations: "200,000 / month",
      channels: "All channels and custom",
      voice: "Included",
      storage: "100 GB+",
      crm: "Custom integrations",
      analytics: "Full suite and API access",
      seats: "Unlimited",
      support: "Dedicated",
    },
  },
];

/** The rows of the comparison, in the order a buyer actually asks them. */
export const PLAN_ROWS = [
  { key: "conversations", label: "Conversations" },
  { key: "channels", label: "Channels" },
  { key: "voice", label: "Voice agents" },
  { key: "crm", label: "CRM integration" },
  { key: "analytics", label: "Analytics" },
  { key: "storage", label: "Knowledge base storage" },
  { key: "seats", label: "Team seats" },
  { key: "support", label: "Support" },
];

/**
 * Yearly is the monthly rate less 20%, rounded down to a whole dollar.
 * Computed rather than stored: the previous build kept both numbers by hand and
 * one of the four savings labels was out by $178.
 */
export function yearlySaving(plan) {
  return plan.monthly * 12 - plan.yearly;
}

/** The four objections between reading a price and clicking the button. */
export const trialPoints = [
  [Zap, "Start today", "Core features are live the moment you sign up."],
  [ShieldCheck, "No risk", "Cancel during the trial and nothing gets charged."],
  [CreditCard, "No card required", "The trial never asks for payment details."],
  [Headphones, "Help while you evaluate", "Support answers before you buy, not just after."],
];

export const pricingFaqs = [
  {
    question: "Can I try it before paying?",
    answer:
      "Yes. Every plan has a 10-day trial and it does not ask for a card. Run real conversations through it before you decide anything.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, from your dashboard, whenever you like. No notice period and no cancellation fee.",
  },
  {
    question: "What happens when the trial ends?",
    answer:
      "We ask you to add a payment method to carry on. Nothing charges automatically. Your workspace and your data sit there untouched while you think about it.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, up or down, at any point in the cycle. Switching to yearly takes 20% off straight away.",
  },
  {
    question: "What counts as a conversation?",
    answer:
      "One continuous exchange with one customer. Two messages or forty, it counts once. Follow-ups on the same thread are not counted again.",
  },
  {
    question: "How is my data handled?",
    answer:
      "Encrypted in transit and at rest. Access is role-based per workspace. You decide which sources the assistant is allowed to read.",
  },
];
