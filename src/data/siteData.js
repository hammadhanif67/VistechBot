import {
  Home,
  Sparkles,
  BadgeDollarSign,
  FileText,
  Info,
  Mail,
  ShoppingCart,
  Code2,
  HeartPulse,
  Landmark,
  GraduationCap,
  Plane,
  UsersRound,
  BotMessageSquare,
  ShieldCheck,
  Orbit,
  Hexagon,
  CircleDot,
  Cloud,
} from "lucide-react";

// ─── Navigation ───────────────────────────────────────────────────
export const navItems = [
  { label: "Home",     path: "/",        icon: Home },
  { label: "Features", path: "/features", icon: Sparkles },
  { label: "Pricing",  path: "/pricing",  icon: BadgeDollarSign },
  { label: "Docs",     path: "/docs",     icon: FileText },
  { label: "About",    path: "/about",    icon: Info },
  { label: "Contact",  path: "/contact",  icon: Mail },
];

// ─── Footer ───────────────────────────────────────────────────────
export const footerLinks = {
  Product: [
    ["Features",          "/features"],
    ["Pricing",           "/pricing"],
    ["API Documentation", "/docs"],
    ["Integrations",      "/features"],
  ],
  Company: [
    ["About Us",      "/about"],
    ["Blog & News",   "/docs"],
    ["Careers",       "/about"],
    ["Contact Sales", "/contact"],
  ],
  Legal: [
    ["Privacy Policy",      "/docs"],
    ["Terms of Service",    "/docs"],
    ["Cookie Settings",     "/docs"],
    ["Security Protocols",  "/features"],
  ],
};

// ─── Homepage Stats ───────────────────────────────────────────────
export const homeStats = [
  { id: 1, icon: UsersRound,    value: "10,000+", label: "Active Users",    growth: "+18%",    color: "cyan"   },
  { id: 2, icon: BotMessageSquare, value: "50M+", label: "Conversations",   growth: "+32%",    color: "purple" },
  { id: 3, icon: ShieldCheck,   value: "99.9%",   label: "System Uptime",   growth: "Stable",  color: "green"  },
  { id: 4, icon: Orbit,         value: "24/7",    label: "AI Support",      growth: "Realtime",color: "blue"   },
];

export const trustedCompanies = [
  { id: 1, icon: Hexagon,   name: "TechCorp"   },
  { id: 2, icon: CircleDot, name: "InnoVision"  },
  { id: 3, icon: CircleDot, name: "NextGen"    },
  { id: 4, icon: Cloud,     name: "CloudPeak"  },
];

// ─── Industry solutions (shared by Home + Features) ───────────────
export const homeIndustries = [
  [ShoppingCart,  "E-Commerce",         "Automate order tracking, returns, and product inquiries."],
  [Code2,         "SaaS & Tech",        "Onboard users, resolve issues, and improve product adoption."],
  [HeartPulse,    "Healthcare",         "Answer patient queries and schedule appointments."],
  [Landmark,      "Banking & Finance",  "Verify accounts, handle FAQs, and ensure secure support."],
  [GraduationCap, "Education",          "Support students, answer FAQs, and simplify admissions."],
  [Plane,         "Travel & Hospitality","Assist with bookings, changes, and travel support."],
];

// ─── Testimonials ─────────────────────────────────────────────────
export const testimonials = [
  {
    name:   "Sarah Johnson",
    role:   "Customer Success Manager, TechCorp",
    quote:  "VistechBot transformed our support operations. Response time improved by 80% and customer satisfaction increased to 95%.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "Michael Chen",
    role:   "Operations Director, Global Solutions",
    quote:  "The voice agent feature is incredible. Our customers love the natural conversations and we've reduced call volume by 60%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "Emily Rodriguez",
    role:   "CTO, InnoVision",
    quote:  "Easy to set up, powerful features, and excellent support. VistechBot is exactly what we needed for our AI strategy.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "David Kim",
    role:   "Founder, AlphaStream",
    quote:  "The multi-language support is flawlessly executed. We expanded our regional scale without hiring new frontline human agents.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "Jessica Taylor",
    role:   "VP of Growth, FinTech Pulse",
    quote:  "Security encryption standards are solid. Handling financial data queries through automated AI paths is now fully compliant.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "Marcus Aurelius",
    role:   "Product Lead, Nexus Logistics",
    quote:  "The live context-switching analytics dashboard is superb. It maps user drop-off intents before our team even realizes it.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "Elena Rostova",
    role:   "Support Lead, CyberGrid",
    quote:  "VistechBot handles spikes effortlessly. During black Friday sales, it closed 90% of basic troubleshooting tickets perfectly.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "Oliver Bennett",
    role:   "E-commerce Director, LuxeWear",
    quote:  "Abandonment tracking system recovered 35% of cart bounce drops via seamless automated chat triggers. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name:   "Sophia Martinez",
    role:   "HR Director, EduSphere",
    quote:  "We adapted it internally for instant student help-desk routing. The deployment curves were ultra-short and fluid.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
  },
];
