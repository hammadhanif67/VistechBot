import { MessageSquareText, Rocket, Crown, Building2 } from "lucide-react";

export const monthlyPlans = [
  {
    name:  "Starter",
    price: "$49",
    period: "/month",
    trial: "10 Day Trial",
    color: "blue",
    icon:  MessageSquareText,
    desc:  "For small teams starting with AI chat automation.",
    features: [
      ["Website Chatbot",      "AI-powered chat widget"],
      ["WhatsApp Integration", "Business WhatsApp support"],
      ["1,000 Conversations",  "Per month"],
      ["5GB Storage",          "Knowledge base files"],
    ],
    button: "Start Trial",
  },
  {
    name:    "Business",
    price:   "$99",
    period:  "/month",
    trial:   "10 Day Trial",
    color:   "green",
    icon:    Rocket,
    popular: true,
    desc:    "For growing businesses needing CRM and AI automation.",
    features: [
      ["Everything in Starter",   ""],
      ["Facebook Messenger",      "Messenger chatbot support"],
      ["AI Chatbot",              "Files, voice and advanced replies"],
      ["CRM Integration",         "Manage customer data"],
      ["10,000 Conversations",    "Per month"],
      ["20GB Storage",            "Knowledge base files"],
    ],
    button: "Start Trial",
  },
  {
    name:  "Premium",
    price: "$199",
    period: "/month",
    trial: "300 Trial",
    color: "purple",
    icon:  Crown,
    desc:  "For advanced teams with higher automation needs.",
    features: [
      ["Everything in Business", ""],
      ["AI Access",              "Full AI integration access"],
      ["Advanced Chatbot",       "Voice, files and smart automation"],
      ["CRM Integration",        "Customer workflow control"],
      ["20,000 Conversations",   "Per month"],
      ["100GB Storage",          "Knowledge base files"],
    ],
    button: "Start Trial",
  },
  {
    name:  "Enterprise",
    price: "$499",
    period: "/month",
    trial: "1000 Trial",
    color: "cyan",
    icon:  Building2,
    desc:  "For large businesses needing scale and support.",
    features: [
      ["Everything in Premium",  ""],
      ["Enterprise AI Access",   "Custom integrations"],
      ["Multi-Channel Support",  "WhatsApp, website, Messenger"],
      ["CRM Automation",         "Advanced customer workflows"],
      ["200,000 Conversations",  "Per month"],
      ["100GB Storage",          "Knowledge base files"],
    ],
    button: "Contact Sales",
  },
];

export const yearlyMeta = [
  ["Starter Yearly",    "$470",  "/year", "Save $120"],
  ["Business Yearly",   "$950",  "/year", "Save $250"],
  ["Premium Yearly",    "$1910", "/year", "Save $300"],
  ["Enterprise Yearly", "$4790", "/year", "Save $1200"],
];

export const pricingBenefits = [
  ["♙", "Instant Access",  "Get started immediately with core platform features"],
  ["⚙", "No Risk",         "Cancel anytime during your trial period"],
  ["⚡", "Core Features",  "Experience essential features during trial"],
  ["☊", "24/7 Support",   "We're here to help you anytime, anywhere"],
];

export const pricingFaqs = [
  {
    question: "Can I try the platform for free?",
    answer:   "Yes! All plans come with a free trial. Start with our 7-day trial and explore all premium features before upgrading.",
  },
  {
    question: "Can I cancel anytime?",
    answer:   "Absolutely. You can cancel your subscription at any time directly from your dashboard without any hidden conditions.",
  },
  {
    question: "What happens after my trial ends?",
    answer:   "Once your trial expires, you'll be prompted to add a payment method to continue using premium services.",
  },
  {
    question: "Is my data secure?",
    answer:   "Yes, we use enterprise-grade encryption, secure cloud infrastructure, and advanced security practices to keep your data protected.",
  },
];
