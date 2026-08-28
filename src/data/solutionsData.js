import {
  Boxes,
  Braces,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingBag,
} from "lucide-react";
import { SOLUTIONS_SEO } from "./seoContent.js";

/**
 * Solutions: the industries the platform is pointed at.
 *
 * The distinction this file exists to hold:
 *
 *   Platform  — what the product does.       (`featuresData.js`)
 *   Solutions — what it is used for, here.   (this file)
 *
 * So nothing below describes a capability. Each entry says what this industry's
 * support queue is actually made of, and `capabilities` names the ids that
 * answer it rather than restating them.
 *
 * Slug, name, title and description come from `SOLUTIONS_SEO` in
 * `seoContent.js`, which the router, the sitemap and the build-time HTML read
 * too. This file adds the icon and the page copy on top. One merge, so an
 * industry's name is written once and reaches all five consumers.
 *
 * What is deliberately absent: numbers, named customers, and any claim of
 * regulatory certification. A healthcare page saying "HIPAA compliant" or a
 * finance page saying "PCI DSS" asserts an audit nobody here has been through.
 * Those two carry a `note` instead, which says what the product actually
 * provides and whose decision the rest is.
 */
const CONTENT = {
  ecommerce: {
    icon: ShoppingBag,
    /* One line for the directory card. Distinct from `hero.lead` on purpose:
       a card is scanned, a hero is read. */
    short: "Order status, returns and product questions, at checkout volume.",
    hero: {
      headline: ["Retail support is", "the same twenty", "questions."],
      lead: "Where is my order, can I return this, will it fit. They arrive constantly, they need current data rather than judgement, and they bury the conversations that actually need a person.",
    },
    problem:
      "A retail queue is dominated by questions with one correct answer that changes by the hour. Agents spend the day reading tracking numbers aloud, and a sale or a launch turns that into a backlog. The customer waiting on a genuine complaint waits behind all of it.",
    solution:
      "The assistant reads your order and catalogue data at the moment of asking, so the answer reflects the shipment as it stands rather than as it was when the last email went out. It works from your own returns policy, in your own wording. Anything about a damaged item, a dispute or a refund exception goes to your team with the order already attached.",
    capabilities: ["cap-inbox", "cap-knowledge-base", "cap-integrations"],
    workflow: [
      "A customer asks about an order, on the site or on WhatsApp.",
      "The assistant reads the live order record rather than a cached status.",
      "It answers, or starts the return, inside the rules your policy sets.",
      "Anything contested goes to an agent with the order and the thread attached.",
    ],
    benefits: [
      ["Peaks stop becoming backlogs", "Volume that would need extra seats for a week is absorbed without them."],
      ["One answer per policy", "Chat, email and social give the same answer because they read the same policy."],
      ["Agents get the hard half", "The queue a person opens is the one that needed a person."],
    ],
    jobs: ["Order tracking", "Returns and exchanges", "Stock and sizing", "Cart recovery"],
  },

  "saas-technology": {
    icon: Braces,
    short: "Onboarding, troubleshooting and billing questions, with no queue to sit in.",
    hero: {
      headline: ["Your docs already", "answer most of", "the tickets."],
      lead: "The information is written. It is just three clicks and a search box away from the person who needs it, at the moment they have stopped wanting to look.",
    },
    problem:
      "Support for software is mostly reading comprehension: the answer exists in the documentation and the customer has not found it. Meanwhile the tickets that need engineering arrive in the same queue, described badly, and get triaged by whoever is on rota.",
    solution:
      "The assistant answers from the documentation you already maintain, so there is no second copy to keep current. It handles setup, configuration and billing questions in the product, and when something is genuinely a defect it hands over with the error, the steps taken and the account already in the ticket.",
    capabilities: ["cap-knowledge-base", "cap-training", "cap-integrations"],
    workflow: [
      "A user asks in the product, on chat or by email.",
      "The assistant answers from your documentation and product data.",
      "Configuration and billing questions resolve without a ticket.",
      "A real defect reaches your team with the reproduction already written down.",
    ],
    benefits: [
      ["Documentation earns its keep", "The pages you already wrote answer the question instead of waiting to be found."],
      ["Triage stops being manual", "What reaches engineering is described in the same shape every time."],
      ["Gaps surface as data", "Questions the knowledge base could not answer are logged as the article you have not written."],
    ],
    jobs: ["Guided onboarding", "Error triage", "Billing questions", "Escalation with context"],
  },

  healthcare: {
    icon: HeartPulse,
    short: "Appointment handling and patient questions, kept inside strict access limits.",
    hero: {
      headline: ["Scheduling is not", "a clinical", "conversation."],
      lead: "Booking, rescheduling, directions, what to bring, what the practice hours are. These fill a reception phone line and none of them require a clinician.",
    },
    problem:
      "Reception carries two jobs at once: the person in front of the desk and the phone that will not stop. The calls are overwhelmingly logistical, and the caller who does need clinical attention is in the same queue as the one asking about parking.",
    solution:
      "The assistant takes the logistical half — appointments, preparation instructions, practice information — from the material you approve, and nothing else. What it may read is set per workspace. It is built to stop rather than guess: anything touching symptoms, medication or advice is handed to your staff rather than answered.",
    capabilities: ["cap-security", "cap-knowledge-base", "cap-inbox"],
    workflow: [
      "A patient asks about an appointment or a visit, by phone or chat.",
      "The assistant answers only from the sources you have permitted.",
      "Bookings and changes are made against your scheduling system.",
      "Anything clinical stops and goes to a person, with the conversation attached.",
    ],
    benefits: [
      ["Reception gets the desk back", "The phone stops competing with the person standing in front of it."],
      ["A defined boundary", "The assistant's reading list is something you set, not something it infers."],
      ["Out-of-hours logistics", "Booking and preparation questions are answered when the practice is shut."],
    ],
    jobs: ["Appointment booking", "Pre-visit questions", "Intake triage", "Private by design"],
    note: "VistechBot provides role-based access control and per-workspace limits on what the assistant may read. It does not carry a healthcare compliance certification; whether a given deployment meets your regulatory obligations is a decision for your compliance team.",
  },

  finance: {
    icon: Landmark,
    short: "Account and application support that hands over before it oversteps.",
    hero: {
      headline: ["Knowing where", "to stop is", "the feature."],
      lead: "Financial support divides cleanly into questions with a factual answer and questions that need someone qualified. The first kind is most of the volume. The second kind must never be answered by software.",
    },
    problem:
      "Where is my application, what is this charge, when does the payment clear — these are lookups, and they take up the line. Behind them sit conversations that are genuinely advice, and those cannot be handled by an assistant at all.",
    solution:
      "The assistant covers the lookups, reading status and history from your systems at the moment of asking. The boundary is configured rather than hoped for: you define the topics that must escalate, and it hands to a qualified person with the account context already in place instead of attempting an answer.",
    capabilities: ["cap-security", "cap-integrations", "cap-analytics"],
    workflow: [
      "A customer asks about an application, a charge or a balance.",
      "The assistant reads the current record from your system.",
      "Factual questions are answered; the topics you have fenced are not.",
      "Anything approaching advice goes to a qualified person, with context.",
    ],
    benefits: [
      ["Lookups leave the queue", "Status and history questions stop occupying people who could be advising."],
      ["Escalation is a rule, not a judgement", "The topics that must reach a person are configuration, not the model's discretion."],
      ["A record of what was said", "Every conversation is retained and reviewable."],
    ],
    jobs: ["Application status", "Account questions", "Transaction history", "Licensed-agent handoff"],
    note: "VistechBot provides access control, escalation rules and conversation retention. It is not a regulated advice product and carries no financial-services certification; how it fits your regulatory obligations is a decision for your compliance team.",
  },

  education: {
    icon: GraduationCap,
    short: "Admissions and student support through the peaks that break a help desk.",
    hero: {
      headline: ["Admissions is", "seasonal. Your", "desk is not."],
      lead: "For most of the year the enquiry volume is manageable. For a few weeks it is several times that, from applicants in other time zones, asking the same forty questions.",
    },
    problem:
      "An institution cannot staff for its busiest fortnight all year, so the busiest fortnight is when the answers get slowest — exactly when an applicant is deciding. Much of that traffic arrives out of hours and in languages the desk does not cover.",
    solution:
      "The assistant answers from your prospectus, deadlines and course material, in whatever language the question is asked in, at whatever hour it arrives. Applicants get deadline and requirement answers immediately. Enrolled students get the same for timetables and services, which keeps term-time volume off the desk too.",
    capabilities: ["cap-multilingual", "cap-knowledge-base", "cap-inbox"],
    workflow: [
      "An applicant or student asks, in any language, at any hour.",
      "The assistant answers from your published material.",
      "Deadlines, requirements and course information resolve immediately.",
      "Anything needing a decision reaches the right office with the thread.",
    ],
    benefits: [
      ["The peak stops setting the pace", "Intake weeks are absorbed without hiring for them."],
      ["International applicants are not last", "Questions are answered in the language they were asked in."],
      ["One published source", "Answers come from your prospectus, so there is no second version to update."],
    ],
    jobs: ["Admissions guidance", "Deadline reminders", "Course information", "Student help desk"],
  },

  "travel-hospitality": {
    icon: Plane,
    short: "Bookings, changes, and the disruption calls that arrive at 3am.",
    hero: {
      headline: ["Disruption does", "not wait for", "office hours."],
      lead: "A cancelled connection at three in the morning is the moment support matters most, and it is the moment the fewest people are on shift.",
    },
    problem:
      "Travel demand does not track a working day. Disruption arrives in bursts, at night, in several languages at once, from people who are already stranded — and it lands on whatever skeleton rota is covering the hour.",
    solution:
      "The assistant covers every hour on voice and chat, answers in the traveller's own language without a separate translated help centre, and reads live booking data so a change is made rather than promised. The complicated rebooking still reaches a person; it reaches them with the booking and the history already open.",
    capabilities: ["cap-voice", "cap-multilingual", "cap-integrations"],
    workflow: [
      "A guest or traveller calls or messages, at any hour, in any language.",
      "The assistant reads the live booking rather than a cached copy.",
      "Straightforward changes and questions are handled on the spot.",
      "A complex rebooking reaches a person with the booking already open.",
    ],
    benefits: [
      ["The night shift is covered", "The hours with the thinnest rota get the same response as the busiest."],
      ["No translated help centre to maintain", "One set of content answers in the language it was asked in."],
      ["Changes, not promises", "The assistant reads and writes to your booking system."],
    ],
    jobs: ["Booking changes", "Disruption updates", "Local recommendations", "Multilingual by default"],
  },

  "real-estate": {
    icon: Building2,
    short: "Listing enquiries and viewing coordination, with nothing dropped.",
    hero: {
      headline: ["The first reply", "usually wins", "the viewing."],
      lead: "Enquiries arrive in the evening, on portals, on social, by phone. The one that gets answered first is generally the one that turns into a viewing.",
    },
    problem:
      "Agents are out showing properties during the hours enquiries arrive. A lead that waits until tomorrow morning has usually enquired somewhere else by then, and the follow-up that would have caught it never gets sent.",
    solution:
      "The assistant answers listing questions from your own property data the moment they arrive, on whichever channel they came in on. It qualifies against criteria you set — budget, timeline, area — and books viewings into a real calendar. Everything lands in your CRM, so the follow-up happens whether or not anyone remembered.",
    capabilities: ["cap-integrations", "cap-inbox", "cap-chatbots"],
    workflow: [
      "An enquiry arrives on a portal, on social or by phone.",
      "The assistant answers from your live property data.",
      "It qualifies against the criteria you have set.",
      "A viewing is booked and the lead is written into your CRM.",
    ],
    benefits: [
      ["Evening enquiries get an evening reply", "The hours agents are out are the hours enquiries arrive."],
      ["Qualification is consistent", "Every lead is asked the same questions in the same order."],
      ["Follow-up stops depending on memory", "Sequences run from the CRM record rather than from a note."],
    ],
    jobs: ["Listing enquiries", "Lead qualification", "Viewing scheduling", "Follow-up sequences"],
  },

  logistics: {
    icon: Boxes,
    short: "Shipment questions answered from live data, not a phone tree.",
    hero: {
      headline: ["Where is it,", "and when does", "it arrive."],
      lead: "Nearly all of it is those two questions. The data exists, the customer cannot reach it, and the phone tree they are sent through is slower than the answer.",
    },
    problem:
      "Tracking questions are the entire volume and they are pure lookup. They are usually answered by a menu that costs the caller three minutes to reach a number they could have read, and an exception — a missed window, a damaged pallet — sits in the same queue behind them.",
    solution:
      "The assistant reads shipment status directly and answers on voice or chat without a menu in the way. Delivery windows and rescheduling are handled in the conversation. Exceptions are recognised as exceptions and routed to the person who can act, with the consignment already attached.",
    capabilities: ["cap-voice", "cap-integrations", "cap-analytics"],
    workflow: [
      "A customer calls or messages about a consignment.",
      "The assistant reads live shipment status, with no menu in between.",
      "Tracking and delivery-window questions are answered in the conversation.",
      "An exception is routed to someone who can act, with the consignment attached.",
    ],
    benefits: [
      ["No menu between question and answer", "The lookup that took three minutes takes one exchange."],
      ["Exceptions stop queueing behind lookups", "The calls that need action are separated from the ones that do not."],
      ["Same answer on voice and chat", "Both read the same shipment record."],
    ],
    jobs: ["Shipment tracking", "Delivery windows", "Exception handling", "Carrier escalation"],
  },
};

/** Metadata and page content, merged. Order follows `SOLUTIONS_SEO`. */
export const solutions = SOLUTIONS_SEO.map((seo) => ({ ...seo, ...CONTENT[seo.slug] }));

/** Lookup by slug, for the route component and the breadcrumb trail. */
export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));
