import {
  ArrowRight,
  BookOpen,
  Bot,
  BarChart3,
  HelpCircle,
  Home,
  Mail,
  MessageSquare,
  PackageCheck,
  PlayCircle,
  Plug,
  ShieldCheck,
  Zap,
  Headphones,
} from "lucide-react";

export const quickNavigation = [
  {
    icon: Zap,
    title: "Features",
    text: "Explore all platform capabilities",
    color: "blue",
    target: "docs-features",
  },

  {
    icon: HelpCircle,
    title: "FAQ",
    text: "Find answers to common questions",
    color: "green",
    target: "docs-faq",
  },

  {
    icon: PlayCircle,
    title: "Tutorials",
    text: "Step-by-step guides and videos",
    color: "pink",
    target: "docs-videos",
  },

  {
    icon: Mail,
    title: "Contact Support",
    text: "Get help from our support team",
    color: "orange",
    target: "docs-help",
  },
];

export const platformFeatures = [
  {
    icon: Bot,
    title: "AI Voice Agent",
    text: "Advanced voice AI technology with natural language processing and 24/7 availability.",
    color: "blue",
  },

  {
    icon: BookOpen,
    title: "Knowledge Base",
    text: "Upload and organize documents for AI to learn from and provide accurate information.",
    color: "green",
  },

  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    text: "Real-time insights and analytics to track performance and improve conversations.",
    color: "pink",
  },

  {
    icon: Plug,
    title: "Integrations",
    text: "Connect with 100+ apps and services for seamless workflow automation.",
    color: "orange",
  },

  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    text: "Enterprise-grade security with end-to-end encryption and compliance.",
    color: "cyan",
  },
];

export const faqs = [
  {
    tag: "General",
    color: "blue",
    question: "What is VistechBot?",
    answer:
      "VistechBot is an AI-powered platform that helps businesses automate customer interactions through intelligent voice agents and chatbots.",
  },

  {
    tag: "Voice Agent",
    color: "pink",
    question: "How does the voice agent work?",
    answer:
      "Our voice agent uses advanced AI technology to understand natural language, process customer queries, and provide accurate responses.",
  },

  {
    tag: "Features",
    color: "purple",
    question: "What languages are supported?",
    answer:
      "Our platform supports multiple languages including English, Spanish, French, German, and more.",
  },

  {
    tag: "Customization",
    color: "green",
    question: "Can I customize the voice agent?",
    answer:
      "Yes! You can customize the voice, scripts, personality, tone, responses, and AI model to match your brand perfectly.",
  },

  {
    tag: "Security",
    color: "purple",
    question: "How secure is my data?",
    answer:
      "We use enterprise-grade security measures including end-to-end encryption and regular security audits.",
  },

  {
    tag: "Integration",
    color: "pink",
    question: "What integrations are available?",
    answer:
      "We offer integrations with CRM systems, help desk platforms, e-commerce platforms, and 100+ tools.",
  },

  {
    tag: "Pricing",
    color: "blue",
    question: "How much does it cost?",
    answer:
      "We offer flexible pricing plans starting from $49/month with scalable enterprise options.",
  },

  {
    tag: "Billing",
    color: "blue",
    question: "Do you offer a free trial?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all features.",
  },

  {
    tag: "Support",
    color: "orange",
    question: "What kind of support do you provide?",
    answer:
      "We provide 24/7 support through live chat, email, and phone support channels.",
  },

  {
    tag: "Account",
    color: "red",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription anytime with no cancellation fees.",
  },
];

export const helpItems = [
  {
    icon: Home,
    title: "24/7 Live Support",
    text: "Get instant help anytime",
  },

  {
    icon: MessageSquare,
    title: "Expert Assistance",
    text: "Talk to our product specialists",
  },

  {
    icon: PackageCheck,
    title: "Quick Response",
    text: "Average response time under 2 hours",
  },
];

export const tutorials = [
  {
    title: "Getting Started",
    text: "Learn the basics of VistechBot platform",
    level: "Beginner",
    time: "12 min",
    color: "green",
    screen: "dashboard",
  },

  {
    title: "Voice Agent Setup",
    text: "Configure your voice agent for perfect conversations",
    level: "Intermediate",
    time: "18 min",
    color: "blue",
    screen: "wave",
  },

  {
    title: "Knowledge Base Management",
    text: "Upload, organize and manage your knowledge base",
    level: "Intermediate",
    time: "15 min",
    color: "purple",
    screen: "knowledge",
  },

  {
    title: "Advanced Integrations",
    text: "Connect with 100+ apps and automate workflows",
    level: "Advanced",
    time: "20 min",
    color: "orange",
    screen: "integrations",
  },

  {
    title: "Inbox Automation",
    text: "Build smart routing rules for support conversations",
    level: "Intermediate",
    time: "14 min",
    color: "blue",
    screen: "dashboard",
  },

  {
    title: "Analytics Walkthrough",
    text: "Read reports, trends, and customer satisfaction signals",
    level: "Beginner",
    time: "10 min",
    color: "green",
    screen: "knowledge",
  },

  {
    title: "Team Handoff Flow",
    text: "Create clean AI-to-human escalation workflows",
    level: "Advanced",
    time: "16 min",
    color: "purple",
    screen: "wave",
  },

  {
    title: "Security Settings",
    text: "Manage access, roles, and secure workspace controls",
    level: "Advanced",
    time: "11 min",
    color: "orange",
    screen: "integrations",
  },
];

export const searchableDocs = [
  ...quickNavigation,
  ...platformFeatures,
  ...faqs,
  ...tutorials,
];

export const featureArrow = ArrowRight;

export const headsetIcon = Headphones;
