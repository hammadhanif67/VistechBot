import { BookOpen, CircleHelp, LifeBuoy, Rocket } from "lucide-react";
import { capabilityGroups } from "./featuresData";

/**
 * What the two navigation panels show.
 *
 * The platform panel is derived, not written: it maps `capabilityGroups`
 * straight through, so a capability's name, description and icon exist once in
 * `featuresData.js` and the navbar cannot drift from the page it links to.
 *
 * The resources panel is a short hand-written list because there is only one
 * resource — the help centre — and its sections are the useful destinations.
 * There is no Blog and no Guides entry: those pages do not exist, and a panel
 * advertising them would be four links to nowhere.
 */
export const platformPanel = {
  eyebrow: "Platform",
  heading: "Product capabilities",
  groups: capabilityGroups.map((group) => ({
    id: group.id,
    label: group.label,
    items: group.items.map(({ id, icon, title, text }) => ({
      id,
      icon,
      title,
      /* The panel gets the first sentence. The full description is on the page
         the link goes to; repeating all of it here would make the panel a
         second copy of /platform. */
      text: text.split(". ")[0] + ".",
      to: `/platform#${id}`,
    })),
  })),
  action: { label: "Platform overview", to: "/platform" },
};

export const resourcesPanel = {
  eyebrow: "Resources",
  heading: "Learn the product",
  groups: [
    {
      id: "resources",
      label: "Help centre",
      items: [
        {
          id: "help-overview",
          icon: BookOpen,
          title: "Overview",
          text: "How the pieces fit together, and the three ways in.",
          to: "/help#help-overview",
        },
        {
          id: "help-start",
          icon: Rocket,
          title: "Getting started",
          text: "The widget, the API and events, with the code.",
          to: "/help#help-start",
        },
        {
          id: "help-faq",
          icon: CircleHelp,
          title: "FAQ",
          text: "The questions that come up before anyone buys.",
          to: "/help#help-faq",
        },
        {
          id: "help-support",
          icon: LifeBuoy,
          title: "Support",
          text: "When the answer is not written down yet.",
          to: "/help#help-support",
        },
      ],
    },
  ],
  action: { label: "Open the help centre", to: "/help" },
};

export const navPanels = { platform: platformPanel, resources: resourcesPanel };
