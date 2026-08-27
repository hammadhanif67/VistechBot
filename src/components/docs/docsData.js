import {
  Braces,
  CircleHelp,
  Compass,
  LifeBuoy,
  Plug,
  Rocket,
  SlidersHorizontal,
  Terminal,
} from "lucide-react";

/**
 * Help centre content.
 *
 * `HELP_SECTIONS` is the single source of truth for the page: the sidebar and
 * the in-page anchors both derive from it, so a section cannot exist in one
 * and be missing from the other.
 */
export const HELP_SECTIONS = [
  { id: "help-overview", label: "Overview", icon: Compass },
  { id: "help-start", label: "Getting started", icon: Rocket },
  { id: "help-config", label: "Configuration", icon: SlidersHorizontal },
  { id: "help-faq", label: "FAQ", icon: CircleHelp },
  { id: "help-support", label: "Support", icon: LifeBuoy },
];

/**
 * Getting-started snippets.
 *
 * A setup guide with no code on it is a brochure. These cover the three
 * integration paths that matter on day one: drop in the widget, call the API,
 * or listen for what the assistant does.
 */
export const quickStartSteps = [
  {
    id: "install",
    label: "Add the widget",
    text: "Paste this before the closing body tag. The script loads asynchronously and does not block rendering.",
    language: "html",
    code: `<script
  src="https://cdn.vistechbot.com/widget.js"
  data-workspace="YOUR_WORKSPACE_ID"
  async
></script>`,
  },
  {
    id: "api",
    label: "Send a message from your backend",
    text: "Use the REST API when the assistant needs to answer inside your own product surface rather than the widget.",
    language: "bash",
    code: `curl https://api.vistechbot.com/v1/conversations \
  -H "Authorization: Bearer $VISTECHBOT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "web",
    "message": "Where is my order?",
    "customer_id": "cus_18244"
  }'`,
  },
  {
    id: "events",
    label: "React to a handoff",
    text: "The widget emits an event whenever a conversation is escalated to a person, so your own tooling can respond.",
    language: "javascript",
    code: `window.VistechBot.on("conversation:handoff", (event) => {
  analytics.track("support_handoff", {
    conversationId: event.conversationId,
    reason: event.reason,
  });
});`,
  },
];

/**
 * Configuration reference.
 *
 * The values a developer needs on the first day, in the format they will
 * actually type them.
 */
export const configReference = [
  {
    group: "Widget attributes",
    icon: Braces,
    rows: [
      ["data-workspace", "Required. The workspace id from Settings → Install."],
      ["data-locale", "Optional. Forces a language instead of detecting it from the browser."],
      ["data-position", "Optional. `right` (default) or `left`."],
      ["data-open", "Optional. Set to `true` to open the panel on load."],
    ],
  },
  {
    group: "API",
    icon: Terminal,
    rows: [
      ["Base URL", "https://api.vistechbot.com/v1"],
      ["Auth", "Bearer token in the Authorization header. Keys are per workspace."],
      ["Rate limit", "Per-workspace, scaled to your plan's conversation allowance."],
      ["Errors", "Standard HTTP status codes with a JSON body carrying `code` and `message`."],
    ],
  },
  {
    group: "Events",
    icon: Plug,
    rows: [
      ["conversation:start", "A customer opened a conversation."],
      ["conversation:resolved", "The assistant closed the conversation without a handoff."],
      ["conversation:handoff", "Escalated to a person, with a `reason` on the payload."],
      ["knowledge:gap", "A question the knowledge base could not answer confidently."],
    ],
  },
];

export const faqs = [
  {
    tag: "General",
    question: "What is VistechBot?",
    answer:
      "An AI platform for customer support: chat and voice agents that answer from your own documentation, act inside your rules, and hand over to a person when a person is needed.",
  },
  {
    tag: "Voice",
    question: "How does the voice agent work?",
    answer:
      "It recognises intent from natural speech, answers from the same knowledge base as chat, and transfers the call with the transcript attached when it hits a rule that requires a human.",
  },
  {
    tag: "Languages",
    question: "What languages are supported?",
    answer:
      "The assistant detects the customer's language and answers in it, drawing on the same knowledge base rather than a separately translated set of articles.",
  },
  {
    tag: "Customisation",
    question: "Can I control what it says?",
    answer:
      "Yes. You set the tone, the escalation rules, and exactly which sources it is allowed to read. Anything outside those bounds is handed to your team instead of improvised.",
  },
  {
    tag: "Security",
    question: "How is my data handled?",
    answer:
      "Conversations are encrypted in transit and at rest, access is role-based per workspace, and you choose which documents and records the assistant may read.",
  },
  {
    tag: "Integrations",
    question: "What can it connect to?",
    answer:
      "CRM and help desk platforms through two-way sync, e-commerce platforms for order data, and anything else through webhooks and the REST API.",
  },
  {
    tag: "Pricing",
    question: "What does it cost?",
    answer:
      "Plans start at $49 a month, with yearly billing at 20% less. Higher tiers add conversation allowance, channels and storage rather than core features.",
  },
  {
    tag: "Billing",
    question: "Is there a free trial?",
    answer:
      "Every plan includes a 10-day trial with full feature access and no card required.",
  },
  {
    tag: "Account",
    question: "Can I cancel anytime?",
    answer:
      "Yes, from your dashboard, with no notice period and no cancellation fee.",
  },
];
