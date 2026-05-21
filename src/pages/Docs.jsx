import { useState } from "react";
import DocsHero from "../components/docs/DocsHero";
import DocsQuickNavigation from "../components/docs/DocsQuickNavigation";
import DocsPlatformFeatures from "../components/docs/DocsPlatformFeatures";
import DocsFAQ from "../components/docs/DocsFAQ";
import DocsVideoTutorials from "../components/docs/DocsVideoTutorials";
import SiteCTA from "../components/ui/SiteCTA";

export default function Docs() {
  const [query, setQuery] = useState("");

  return (
    <main className="docsPage">
      <DocsHero query={query} setQuery={setQuery} />
      <div className="docsShell">
        <DocsQuickNavigation query={query} setQuery={setQuery} />
        <DocsPlatformFeatures query={query} />
        <DocsFAQ query={query} />
        <DocsVideoTutorials query={query} />
        <SiteCTA />
      </div>
    </main>
  );
}
