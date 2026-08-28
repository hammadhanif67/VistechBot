# VistechBot

Marketing site for VistechBot, an AI customer support platform. React 19 + Vite,
GSAP motion, and per-route SEO baked into static HTML at build time.

## Design rules

Two rules are structural rather than stylistic, and both are enforced rather
than left to discipline:

1. **No border radius, anywhere.** Declared as a universal reset in
   `src/index.css`, so a stray utility class cannot reintroduce a rounded
   corner.
2. **No grid backgrounds.** Depth comes from radial light, layered gradients
   and film grain — never from ruled lines or graph-paper patterns.

Typography is Urbanist throughout, self-hosted from `public/fonts` at six
weights (300–800), with a metric-matched fallback face so the swap does not
reflow the page.

The brand mark is one stroke: two paths converging into a single point — many
conversations, one answer, and the letterform of the name in the same shape. It
used to carry three square nodes on the V's endpoints and a signal bar across
it; at 26px in the navbar, which is the size it is actually seen at, those were
four indistinct dots, and the reveal ended by stacking them onto a mark that had
already finished. `BrandMark.jsx`, `public/favicon.svg` and the Open Graph card
draw the identical path, so the logo and the favicon are the same drawing.

## Themes

Two palettes, one site. `styles/tokens.css` holds the type, spacing, layout and
motion scales once, then a dark palette on `:root` and a light one on
`:root[data-theme="light"]`. No component knows which theme is running — it asks
for `--surface` and gets whichever surface belongs to the theme in force.

The light theme is not an inversion:

- The page is `#eef1f7`, not white. White leaves a raised surface nothing to be
  raised against, so every card ends up needing a heavy border to exist.
- The accent is the brand blue, `#325DEB`, with `#753EED` as its hover and the
  far end of the CTA gradient. Both clear AA where they are used: 4.8:1 and
  5.1:1 on the page, 5.4:1 and 5.7:1 under white. They are accents and not a
  text colour — paragraphs stay on `--ink`, a neutral slate.
- The primary button is the one element carrying a gradient, and only here:
  `--cta-fill` is a flat colour in the dark theme, where blue into purple
  against near-black is a smudge.
- The inks are a neutral slate at hue 216. They sat at 227 — the violet-blue
  band — which gave the whole light theme a faint purple cast, most visible in
  the muted greys where there is least colour to hide it.
- Shadows do the layering that light does in the dark theme, tinted with the
  page's own blue rather than black. `--shadow-*` is `none` in dark.
- Code blocks stay dark in both. A terminal is dark; inverting it would make the
  one element quoting a machine look like prose.

Switching is instantaneous: the palette flips on the same frame as the click,
with no transition. Two earlier versions eased it over 200ms and then 110ms, and
both read as the control hesitating before obeying.

`data-theme` always holds a resolved value — `light` or `dark`, never `system`.
An inline script in `index.html` resolves a stored `system` preference before
the first paint, which is both what prevents a flash and why the stylesheet
needs no `prefers-color-scheme` branch and states the light palette once.

The control is a three-way radiogroup (`components/layout/ThemeToggle.jsx`),
rendered in the navbar and again in the mobile overlay. Both read one
module-level store through `useSyncExternalStore`, so the two copies cannot
disagree, and a `storage` event keeps other tabs in step. Preference persists in
`localStorage` under `vistechbot-theme`; the default with nothing stored is
dark.

## Tech

- React 19 · Vite · React Router 7
- GSAP + ScrollTrigger
- lucide-react

Five runtime dependencies, nothing else. three.js, framer-motion, lottie-react,
@radix-ui/react-icons and react-icons were all removed once nothing used them;
react-icons went with the social links it drew brand marks for.

## Information architecture

```txt
/                          Home
/platform                  What the product does — nine capabilities, three groups
/solutions                 Directory of the eight industries
  /solutions/<slug>        One page each: ecommerce, saas-technology, healthcare,
                           finance, education, travel-hospitality, real-estate,
                           logistics
/pricing                   Plans
/help                      Help centre — setup, configuration, FAQ, support
/about  /contact           Company, in the footer rather than the navbar
/privacy /terms /cookies   Legal, in the footer bar
```

Platform and Solutions answer different questions and the split is structural,
not editorial. `featuresData.js` owns capabilities; `solutionsData.js` owns
industries and can only *reference* a capability by id, never restate one. A
solution page's "what carries it" section is three links into /platform.

Nothing describes an industry twice. `SOLUTIONS_SEO` in `seoContent.js` holds
slug, name, title and description; `routes.js` derives the eight routes from it,
`solutionsData.js` merges the page copy and icon on top, and the home page's
use-case section reads the same array. Adding an industry there gives it a
route, a card, a page, a crumb trail, a sitemap entry and a pre-rendered HTML
file with no other edit.

`/features` became `/platform` and redirects rather than 404ing. The redirect
lives in `REDIRECTS` in `routes.js`, which the router maps over — the same file
the sitemap is built from, so a moved route cannot be redirected in one and
forgotten in the other.

`VITE_SITE_URL` has one fallback, `FALLBACK_SITE_URL` in `seoContent.js`, read
by both the runtime and the build. It is a placeholder, not a confirmed domain,
and the build prints a warning whenever it is used: every canonical, `og:url`,
JSON-LD URL and sitemap entry is written with that value, so a placeholder
origin shipping unnoticed points the whole site at a domain nobody owns.

## Structure

```txt
src/
├── components/
│   ├── about/ contact/ docs/ features/ home/ pricing/   page sections
│   ├── brand/        BrandMark, Wordmark
│   ├── common/       SectionHead, CallToAction
│   ├── layout/       Navbar, Footer
│   ├── routing/      RouteChangeHandler, RouteFallback
│   └── seo/          Seo, structuredData
├── data/             content, routes, SEO copy
├── hooks/            usePageMotion
├── pages/            route components
├── styles/           tokens → base → layout → components → pages
└── utils/            gsapAnimations
```

## Visuals

There is no WebGL on this site. An earlier version ran three.js scenes behind
the hero and section content; both went, for the same two reasons each time. A
canvas moving under display type competes with the type, and the runtime cost
234 kB gzipped to draw a decoration.

The home hero is type and nothing else. It went from a WebGL scene, to a flat
SVG lattice, to no decoration at all — each step removed something sitting
where the argument should be. The only mark on the page is the wordmark.

Motion is GSAP only, declared in markup with a single `data-anim` attribute and
wired by `usePageMotion`. Four behaviours cover the whole site: a masked line
rise for display type, a fade-and-lift for copy, a drawn rule for the section
labels, and a staggered stack for lists.

Hover is a different gesture per component, not one effect applied everywhere:

| Component | Where | Hover |
| --- | --- | --- |
| `.btn` | everywhere | lifts 1px, fill shifts one step, gains elevation |
| `.module` | capability rows | the whole row tints, rule and title with it |
| `.channels__item` | platform channels | a rule draws down the left edge |
| `.facts__row` | company facts | the icon inverts into the accent |
| `.planCard` | pricing | an accent rule draws across the top edge |
| `.useCases__row` | home use cases | a left rule, and the row steps aside |
| `.useCases__toggle` | home use cases, narrow | the plus rotates into a minus |
| `.panel--hover` | generic cards | border, surface and elevation lift |

Buttons went through four wrong answers first. Swapping the whole background
repaints the largest thing on screen for a pointer passing over it. An outline
with no colour left the filled variants with no feedback worth the name. A
left-to-right fill puts half the label on the old background and half on the
new, and no single label colour is legible on both. A bar sweeping the bottom
edge was decoration answering a question nobody asked.

What is there now is the conventional one: the button lifts a pixel, its fill
moves one step within its own family, and in the light theme it picks up the
elevation shadow it would cast. `--ink-strong-hover` and `--accent-hover` are
real tokens, so each theme picks its own direction — dark dims its white, light
lifts its near-black.

The capability rows tint rather than growing a hairline along their bottom
border. On a row that tall the pointer is nowhere near the edge being lit, so
the thing responding was not the thing being pointed at.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

Regenerate the Open Graph card after a brand change:

```bash
npm run generate:og
```

Regenerate the app icons from `public/favicon.svg`:

```bash
npm run generate:icons
```

## Configuration

Optional environment variables:

| Variable                | Effect                                                        |
| ----------------------- | ------------------------------------------------------------- |
| `VITE_SITE_URL`         | Origin used for canonicals, Open Graph URLs and `sitemap.xml`. |
| `VITE_CONTACT_ENDPOINT` | Form handler the contact form POSTs to.                        |

With no `VITE_CONTACT_ENDPOINT` set, the contact form validates and then hands
over a prefilled email rather than pretending a submission was delivered.

## SEO

`vite.config.js` runs a build-time plugin that emits, all from `src/data/routes.js`
and `src/data/seoContent.js`, so a new route cannot be added to the router and
forgotten anywhere else:

| Output                      | Purpose                                                  |
| --------------------------- | -------------------------------------------------------- |
| `dist/<route>/index.html`   | One real HTML file per route                              |
| `dist/404.html`             | Branded not-found, served with a real 404 by most hosts   |
| `sitemap.xml`               | Canonical, indexable URLs only                            |
| `robots.txt`                | Open crawl plus the sitemap reference                     |
| `_redirects`                | Catch-all to `404.html` for Netlify / Cloudflare Pages    |

Each route's HTML carries its own title, description, canonical, Open Graph, X
card and JSON-LD. That matters because the two readers that count most never run
the app's JavaScript: social scrapers read the shipped HTML, and a crawler
indexes it on the first pass before queuing the page for rendering. Previously
every route shipped the home page's title and description and no `og:` tags at
all.

`components/seo/Seo.jsx` renders the same values again at runtime, which is what
keeps them right across client-side navigation. The baked-in copies are marked
`data-static-seo` and removed by `main.jsx` before the first render, so a page
never carries two titles.

## Before launch

Settled:

- **Contact details** — real phone and locations in `contactDetails`.
- **Platform metrics** — the two figures that described the business (customer
  count, lifetime conversation volume) are gone. What remains describes the
  product and is asserted elsewhere on the site.
- **Social profiles** — removed. There are no accounts, so the links went
  nowhere and `sameAs` is deliberately absent from the Organization schema.

- **Legal pages** — `/privacy`, `/terms` and `/cookies` exist and describe what
  this site verifiably does: no analytics, no third-party scripts, no cookies at
  all, one `localStorage` key for the colour theme. Every claim in them was
  checked against the code rather than taken from a template.

Still placeholder, flagged in code and disclosed in the UI:

- **Testimonials** — `testimonialsAreSampleContent` in `src/data/siteData.js`
- **Company narrative and team** — `aboutContentIsSample` in `src/data/aboutData.js`
- **Legal entity details** — `legalEntity` in `src/data/legalData.js` has no company
  name, jurisdiction, registered address or effective date. While
  `needsReview` is true every legal page carries a visible draft notice saying
  so. A lawyer should read the text before that flag is cleared.
- **Social profiles** — `socialLinks` in `src/data/siteData.js` has the four
  entries with `href: null`, so the footer row renders as dimmed placeholders
  rather than links to accounts that do not exist. Fill an href in and that one
  goes live; when they are all real, pass the list to `organizationNode` as
  `sameAs`.

And one that blocks deployment:

- **`VITE_SITE_URL`** — no production domain exists yet, so canonicals, `og:url`
  and `sitemap.xml` are all written with the `https://www.vistechbot.com`
  default. Set it at build time before the site goes anywhere public.

`src/assets/images/` is no longer referenced by the site; the current design is
purely typographic. The directory is left in place so nothing is deleted
without a decision.

## Deployment

Vite SPA. Build command `npm run build`, output `dist`, install `npm install`.

Every route ships as its own `index.html` under a matching directory, so a
static host resolves `/pricing` and friends without any rewrite rule, and a
refresh or a deep link from search works on its own.

**Vercel** is configured in `vercel.json`. The setting that matters for SEO is
`trailingSlash: false`: every route ships as `<route>/index.html`, so without it
both `/platform` and `/platform/` resolve and the site serves the same page at
two URLs while its canonical names only one. Vercel now redirects the slashed
form to the canonical one. The asset and font headers are the standard
immutable cache for hashed filenames.

Unknown paths are the only other thing needing host configuration:

- **Netlify, Cloudflare Pages** " + EM + " the emitted `_redirects` is picked up as is.
- **GitHub Pages, Firebase, S3** " + EM + " serve `404.html`, which they do by default.
- **Vercel, or any host without either** " + EM + " point the not-found handler at
  `404.html`. A rewrite to `index.html` also works, but returns 200 for a
  missing page, which invites soft-404s in Search Console.

Set `VITE_SITE_URL` at build time to the real production origin. It is what the
canonicals, `og:url` values and `sitemap.xml` are written with, and it defaults
to `https://www.vistechbot.com`.
