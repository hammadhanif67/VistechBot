// import ContactHero from "../components/contact/ContactHero";
import ContactWays from "../components/contact/ContactWays";
import ContactFormSection from "../components/contact/ContactFormSection";
import SiteCTA from "../components/ui/SiteCTA";

export default function Contact() {
  return (
    <main className="contactPage">
      {/* <ContactHero /> */}
      <ContactWays />
      <ContactFormSection />
      <SiteCTA />
    </main>
  );
}
