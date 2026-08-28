import {
  Mic,
  Bot,
  Database,
  MessageSquare,
  MessagesSquare,
  Mail,
  PhoneCall,
  Globe,
  Brain,
  Plug,
  Zap,
  Headphones,
  Sparkles,
  BarChart3,
  Languages,
  ShieldCheck,
  Webhook,
  Ticket,
  ShoppingBag,
  Contact,
} from "lucide-react";

/**
 * Platform capabilities, grouped by the job they do.
 *
 * Every capability carries an `id`. It is the anchor on /platform and the
 * handle `solutionsData.js` uses to name the ones an industry leans on, so a
 * capability's wording lives here once and the solution pages point at it
 * rather than restating it.
 *
 * The flat list of six was hard to scan and gave no sense of the product's
 * shape. Three groups match how a buyer evaluates a support platform: talking
 * to customers, knowing the answers, running the operation.
 *
 * Every card says what it does and what it changes for the team. Nine
 * restatements of "powered by AI" would have been easier to write and worth
 * nothing to read.
 */
export const capabilityGroups = [
  {
    id: "platform-conversations",
    label: "Conversations",
    title: "Meet customers on the channel they already use",
    text: "Voice, web chat and social inboxes all run on one set of rules. The answer stays the same wherever the question came from.",
    items: [
      {
        icon: Mic,
        tag: "New",
        id: "cap-voice",
        title: "AI voice agents",
        text: "Answers callers, qualifies leads, books appointments. When a call needs a person it transfers with the transcript already attached.",
        meta: "100+ languages",
      },
      {
        icon: Bot,
        id: "cap-chatbots",
        title: "Smart chatbots",
        text: "Web chat that reads what the customer meant, follows your business rules, and stays in your brand's voice.",
        meta: "Context-aware replies",
      },
      {
        icon: MessageSquare,
        id: "cap-inbox",
        title: "Multi-channel inbox",
        text: "Website chat, WhatsApp, Messenger and email land in one queue. History follows the customer between them.",
        meta: "10+ channels",
      },
    ],
  },
  {
    id: "platform-knowledge",
    label: "Knowledge",
    title: "Answers that come from your own content",
    text: "The assistant works from your documentation. You control exactly what it is allowed to say.",
    items: [
      {
        icon: Database,
        id: "cap-knowledge-base",
        title: "Knowledge base AI",
        text: "Point it at your FAQs, policies, product data and help articles. Replies come from your material, not from whatever the model absorbed elsewhere.",
        meta: "Unlimited sources",
      },
      {
        icon: Brain,
        id: "cap-training",
        title: "Custom AI training",
        text: "Shape the workflows around your services, your lead stages, your escalation logic. Adjust them as the business changes.",
        meta: "Custom models",
      },
      {
        icon: Languages,
        id: "cap-multilingual",
        title: "Multilingual support",
        text: "Detects the customer's language and answers in it, drawing on the same knowledge base. No separate translated article set to maintain.",
        meta: "Auto-detected",
      },
    ],
  },
  {
    id: "platform-operations",
    label: "Operations",
    title: "Wired into the systems your team already runs",
    text: "Records stay in sync. Performance is measurable. Access is something you set, not something you hope about.",
    items: [
      {
        icon: Plug,
        
        id: "cap-integrations",
        title: "CRM and tool integrations",
        text: "Leads, tickets, contact records and conversation summaries sync with the tools your sales and support teams already have open.",
        meta: "50+ integrations",
      },
      {
        icon: BarChart3,
        id: "cap-analytics",
        title: "Conversation analytics",
        text: "See what customers ask most and where the assistant hesitated. Then go fix the article that was missing.",
        meta: "Live dashboards",
      },
      {
        icon: ShieldCheck,
        
        id: "cap-security",
        title: "Security and access control",
        text: "Role-based permissions, encrypted conversations, and per-workspace control over what the assistant can read and share.",
        meta: "Role-based access",
      },
    ],
  },
];

/** Flattened view for anything that just needs every capability in order. */
export const advancedCapabilities = capabilityGroups.flatMap((group) => group.items);

export const whyChooseCards = [
  {
    icon: Zap,
    title: "Less repeat work",
    text: "Order-status checks. Opening hours. Where is my refund. These fill a queue and none of them need judgement. Your team stops re-answering them and gets its day back for the tickets that do.",
  },
  {
    icon: Headphones,
    title: "Cover outside office hours",
    text: "Customers get help at night, at weekends, and during the spikes that break a rota. Conversations stay open, and anything the assistant should not decide on its own goes to your team with the context intact.",
  },
  {
    icon: Sparkles,
    title: "Answers that hold up",
    text: "Replies are drawn from your documentation and policies, so what a customer reads on chat matches what an agent would have told them. Where your content is thin, the assistant says so.",
  },
  {
    icon: BarChart3,
    title: "Improvement you can see",
    text: "As volume grows you get a picture of the common questions, the missed intents and the lead quality. A support queue becomes something you can act on.",
  },
];

export const customSolutions = [
  {
    title: "Custom AI training",
    text: "Trained on your own business data, so answers reflect how your team actually works.",
  },
  {
    title: "Knowledge base integration",
    text: "Bring across the documentation and FAQs you already maintain. No rewriting.",
  },
  {
    title: "Multi-channel rollout",
    text: "Launch on one channel, prove it works, then extend with the same rules and knowledge base.",
  },
  {
    title: "Team collaboration",
    text: "Agents get the assistant's context. Managers get the analytics behind it. One workspace.",
  },
];

export const customizationProcess = [
  {
    title: "Requirements analysis",
    text: "We map your current queue, the questions that dominate it, and the places where a handoff to a person is non-negotiable.",
  },
  {
    title: "Solution design",
    text: "Conversation flows, escalation rules and integrations get designed around those findings. Nothing is built before that.",
  },
  {
    title: "Implementation and training",
    text: "The assistant connects to your knowledge base and tools, then gets tested against real conversations from your history.",
  },
  {
    title: "Ongoing support",
    text: "We go through the analytics with you, close the gaps the data exposes, and adjust as your product and policies move.",
  },
];

/**
 * Channels and integrations.
 *
 * The platform page's own section. The home page covers who the product is for;
 * this covers what it plugs into. Splitting them stopped the two pages from
 * repeating the same industry list.
 *
 * `status` is honest about maturity. Presenting everything as equally finished
 * would have been easier and less useful.
 */
export const channels = [
  { icon: Globe, name: "Website chat", detail: "One script tag, no backend work", status: "Live" },
  { icon: MessagesSquare, name: "WhatsApp", detail: "Business API, media and templates", status: "Live" },
  { icon: MessageSquare, name: "Messenger", detail: "Page inbox, same rules as the rest", status: "Live" },
  { icon: Mail, name: "Email", detail: "Threaded replies from the shared queue", status: "Live" },
  { icon: PhoneCall, name: "Voice", detail: "Inbound calls with warm transfer", status: "Live" },
  { icon: Bot, name: "In-product", detail: "REST API for your own surface", status: "Live" },
];

export const integrations = [
  { icon: Contact, name: "CRM", detail: "Two-way sync of contacts, leads and conversation summaries" },
  { icon: Ticket, name: "Help desk", detail: "Create, update and close tickets from inside the conversation" },
  { icon: ShoppingBag, name: "E-commerce", detail: "Live order, shipping and returns data at the moment of answering" },
  { icon: Webhook, name: "Webhooks", detail: "Everything not on this list, driven by conversation events" },
];
