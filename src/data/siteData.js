/**
 * Site-wide content.
 *
 * Navigation is typographic now — no icons. The old nav carried a lucide glyph
 * beside every label, which competed with the uppercase micro-type and pushed
 * the row wider than it needed to be.
 */
/**
 * Primary navigation.
 *
 * Four items and one action. "Home" has gone: the wordmark to its left already
 * goes there, and a nav whose first item duplicates the logo spends a slot
 * saying nothing. About and Contact have moved to the footer, which is where
 * company information belongs once the product has this much to say.
 *
 * `panel` marks the two that open a floating panel rather than navigating on
 * click. Solutions deliberately has none: it is a destination with eight pages
 * behind it, and a dropdown would make the directory look like the whole thing.
 */
export const navItems = [
  { label: "Platform", path: "/platform", panel: "platform" },
  { label: "Solutions", path: "/solutions" },
  { label: "Resources", path: "/help", panel: "resources" },
  { label: "Pricing", path: "/pricing" },
];

// ─── Footer ───────────────────────────────────────────────────────
// Every entry points at a page (or in-page section) that genuinely covers the
// label. Items with no destination yet live in `footerPlaceholders` and render
// as marked placeholders rather than links that quietly go somewhere else.
/**
 * Footer columns.
 *
 * Four now, mirroring the architecture rather than the old navbar: what the
 * product is, where to learn it, who builds it, and the legal shelf. Solutions
 * appears here as one link to the directory — listing all eight would make the
 * footer taller than most of the pages it links to.
 *
 * `Legal` holds no hrefs on purpose. Those pages do not exist, and
 * `footerPlaceholders` renders them as marked placeholders rather than links
 * to nowhere.
 */
export const footerLinks = {
  Product: [
    ["Platform", "/platform"],
    ["Solutions", "/solutions"],
    ["Integrations", "/platform#cap-integrations"],
    ["Pricing", "/pricing"],
  ],
  Resources: [
    ["Help centre", "/help"],
    ["Getting started", "/help#help-start"],
    ["FAQ", "/help#help-faq"],
    ["Support", "/help#help-support"],
  ],
  Company: [
    ["About", "/about"],
    ["Team", "/about#about-team"],
    ["Contact sales", "/contact"],
    ["Book a demo", "/contact#contact-form"],
  ],
};

// Legal pages have not been written yet. Listed so the footer keeps its shape,
// rendered as disabled placeholders — a link that silently resolves to an
// unrelated page is worse than an honest "soon".
export const footerPlaceholders = ["Privacy Policy", "Terms of Service", "Cookie Settings"];

export const contactDetails = {
  email: "support@vistechbot.com",
  phone: "+1 (332) 254-0217",
  phoneHref: "tel:+13322540217",
  /* wa.me needs the number in E.164 with no punctuation. This assumes the line
     above is registered on WhatsApp; if it is not, wa.me opens to an error and
     this entry should be dropped from `CONTACT_CHANNELS` rather than pointed at
     a different number. */
  whatsappHref: "https://wa.me/13322540217",
  location: "Faisalabad and Lahore, Pakistan",
};

/**
 * Platform capability figures.
 *
 * These used to open with "10,000+ Businesses" and "50M+ Conversations",
 * shipped as sample content with a disclaimer under them. Both were claims
 * about the business — how many customers it has, how much volume it has
 * handled — and there are no audited numbers behind either, so they are gone
 * rather than restated with a footnote.
 *
 * What is left describes the product, and every line is already asserted
 * elsewhere on the site: the hero states the coverage, the language count
 * and the response time, and `featuresData.channels` lists exactly these six
 * channels. Nothing here is a figure a reader could not check against the
 * rest of the page.
 */
export const platformMetrics = [
  { value: "24/7", label: "Coverage", note: "No shift gaps, no hold music" },
  { value: "100+", label: "Languages", note: "Detected and answered automatically" },
  { value: "<1s", label: "First response", note: "From question to first reply" },
  { value: "6", label: "Channels", note: "Chat, WhatsApp, Messenger, email, voice, API" },
];

// ─── Testimonials ─────────────────────────────────────────────────
/**
 * SAMPLE CONTENT — NOT VERIFIED CUSTOMER FEEDBACK.
 *
 * Illustrative quotes that ship with the template. Flagged here and disclosed
 * in the UI so nobody mistakes them for collected testimonials. Replace with
 * real, attributable quotes before going live.
 *
 * Attribution is rendered from `initials`: the previous build hot-linked stock
 * portraits of real people and captioned them with invented names.
 */
export const testimonialsAreSampleContent = true;

export const testimonials = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Customer Success Manager",
    company: "TechCorp",
    quote:
      "It took the repetitive half of our queue off the team. First-response time dropped a lot, and the agents finally have room for the tickets that are actually hard.",
  },
  {
    name: "Michael Chen",
    initials: "MC",
    role: "Operations Director",
    company: "Global Solutions",
    quote:
      "The voice agent handles our routine calls start to finish. Nobody braces themselves for a phone tree any more. Call volume to the desk is down noticeably.",
  },
  {
    name: "Emily Rodriguez",
    initials: "ER",
    role: "Chief Technology Officer",
    company: "InnoVision",
    quote:
      "Setup took an afternoon. It read our existing help centre and the answers sounded like us from the first conversation.",
  },
  {
    name: "David Kim",
    initials: "DK",
    role: "Founder",
    company: "AlphaStream",
    quote:
      "We opened two new regions without hiring a frontline team in either one. The language handling did that.",
  },
  {
    name: "Jessica Taylor",
    initials: "JT",
    role: "VP of Growth",
    company: "FinTech Pulse",
    quote:
      "Our security review passed because of the access controls and audit trails. Without those we were never going to automate account questions.",
  },
  {
    name: "Marcus Bell",
    initials: "MB",
    role: "Product Lead",
    company: "Nexus Logistics",
    quote:
      "The analytics showed us where conversations were stalling. We rewrote three help articles and the deflection rate moved inside a week.",
  },
];
