import Seo from "../components/seo/Seo";
import usePageMotion from "../hooks/usePageMotion";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactChannels from "../components/contact/ContactChannels";
import { breadcrumbSchema, organizationSchema } from "../components/seo/structuredData";

/**
 * Contact.
 *
 * Hero, then the form as the page's main event with direct channels beside it.
 * There is no closing CTA here — the page is already the call to action, and
 * sending someone from the contact form to another contact prompt would be
 * absurd.
 */
export default function Contact() {
  usePageMotion();

  return (
    <main className="page page--contact" id="main-content" tabIndex={-1}>
      <Seo
        schemas={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <ContactHero />

      <section className="section contactMain" id="contact-form" aria-labelledby="contact-form-heading">
        <div className="shell contactMain__layout">
          <div data-anim="rise">
            <ContactForm />
          </div>
          <div data-anim="rise" data-anim-delay="1">
            <ContactChannels />
          </div>
        </div>
      </section>
    </main>
  );
}
