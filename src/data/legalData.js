import { contactDetails } from "./siteData";

/**
 * Legal pages.
 *
 * Written from what this site verifiably does, not from a template. Every
 * factual claim below was checked against the code:
 *
 *   - no third-party scripts in the built HTML
 *   - no analytics, tag manager or tracking pixel anywhere in the source
 *   - `document.cookie` is never written; the site sets no cookies at all
 *   - one `localStorage` key, `vistechbot-theme`, holding a colour preference
 *   - fonts are self-hosted, so no request leaves for a font CDN
 *   - the contact form posts to `VITE_CONTACT_ENDPOINT` and, with that unset,
 *     hands over a prefilled email instead
 *   - the newsletter field is not wired to anything and says so
 *
 * A policy that describes what actually happens is worth more than a longer one
 * that describes what a generic SaaS company happens to do.
 *
 * What is NOT here, because it cannot be known from the code: the legal entity
 * name, the jurisdiction whose law governs, and the registered address. Those
 * are set below and, while unset, every page renders a notice saying so rather
 * than quietly shipping an incomplete legal document.
 */
export const legalEntity = {
  /* Flip to false once the three fields below are filled in with real values
     and a lawyer has read the pages. */
  needsReview: true,
  name: null, // e.g. "VistechBot Pvt Ltd"
  jurisdiction: null, // e.g. "the laws of Pakistan"
  registeredAddress: null,
  /* Set when the pages are published. Until then the pages say so instead of
     carrying a date nobody chose. */
  effectiveDate: null,
};

const CONTACT = `Write to ${contactDetails.email}.`;

export const legalPages = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    lead: "What this website collects, which is very little, and what happens to the things you choose to send us.",
    sections: [
      {
        heading: "What this site collects on its own",
        body: [
          "Nothing. This website runs no analytics, no tag manager, no advertising pixel and no session recorder. There is no third-party script on any page.",
          "Fonts are served from this site rather than a font network, so loading a page does not tell anyone else that you visited.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "This site sets no cookies. Not for analytics, not for advertising, not for preferences.",
          "One thing is stored in your browser: a key called vistechbot-theme, remembering whether you chose the light or dark appearance. It stays on your device, is never transmitted, and clearing your browser data removes it.",
        ],
      },
      {
        heading: "What you send us",
        body: [
          "The contact form asks for your name, email address, and optionally your company, your monthly conversation volume and a message. We use it to answer you and to work out whether we can help. We do not add you to a mailing list from it and we do not sell it.",
          "The product-updates field in the footer is not connected to anything yet. Submitting it tells you so rather than pretending you have been subscribed.",
        ],
      },
      {
        heading: "Server logs",
        body: [
          "Our hosting provider keeps standard access logs, which include IP addresses and browser user-agent strings, as part of serving and protecting the site. We do not use them for analytics or profiling.",
        ],
      },
      {
        heading: "What we do not do",
        body: [
          "We do not sell personal data. We do not share it for advertising. We do not build profiles of visitors, and there is nothing on this site capable of doing so.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Ask us what we hold about you, ask us to correct it, or ask us to delete it, and we will. " + CONTACT,
        ],
      },
      {
        heading: "The product is separate",
        body: [
          "This policy covers this website. If you become a customer, how the platform handles your customers' conversation data is governed by the agreement you sign with us, which is a different and more detailed document.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Use",
    lead: "The terms for using this website. Buying the product is a separate agreement.",
    sections: [
      {
        heading: "What this covers",
        body: [
          "These terms apply to this website. They are not the contract for the VistechBot platform. If you become a customer, a separate service agreement governs the product, its availability and what happens to your data.",
        ],
      },
      {
        heading: "The information here",
        body: [
          "We keep this site accurate, but it describes a product that changes. Capability descriptions, integrations and limits may be out of date by the time you read them, and nothing on this site is a warranty that any specific feature will behave a particular way for you.",
          "Ask us before you rely on something. " + CONTACT,
        ],
      },
      {
        heading: "Prices",
        body: [
          "The prices on the pricing page are the current list prices and are shown in US dollars. They can change, and what you actually pay is whatever is written in the agreement you sign. A price on this page is not an offer capable of acceptance.",
        ],
      },
      {
        heading: "Using the site",
        body: [
          "Read it, share it, quote it with attribution. Do not attempt to disrupt it, scrape it at a volume that degrades it for others, or misrepresent it as your own.",
        ],
      },
      {
        heading: "What belongs to whom",
        body: [
          "The text, design, code and marks on this site belong to us, except where they belong to someone else and are used with permission. Product names belonging to other companies are theirs.",
        ],
      },
      {
        heading: "Links to other sites",
        body: [
          "Where this site links somewhere else, we are not responsible for what is there or what it does with your data.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "We may change these terms. The version on this page is the one in force.",
        ],
      },
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    lead: "A short page, because this site does not use cookies.",
    sections: [
      {
        heading: "This site sets no cookies",
        body: [
          "There is no cookie banner on this site because there is nothing to consent to. No analytics cookie, no advertising cookie, no preference cookie, no third-party cookie. Nothing writes to document.cookie anywhere in the code.",
        ],
      },
      {
        heading: "One thing is stored locally",
        body: [
          "When you choose light or dark, that choice is saved in your browser's local storage under the key vistechbot-theme, so the site does not forget it on your next visit.",
          "Local storage is not a cookie. It is never attached to a request, so it is never sent to us or to anyone else — it exists only on the device you set it on. Clearing your browsing data removes it, and the site works fine without it.",
        ],
      },
      {
        heading: "If that changes",
        body: [
          "If we ever add something that does set a cookie, this page will say what it is and what it is for before it ships.",
        ],
      },
      {
        heading: "Questions",
        body: [CONTACT],
      },
    ],
  },
};

export const legalRoutes = Object.values(legalPages).map((page) => ({
  path: `/${page.slug}`,
  label: page.title,
}));
