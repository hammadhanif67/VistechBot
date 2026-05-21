import {
  Headphones,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    icon: Mail,
    title: "Email Support",
    sub: "Get help via email",
    strong: "support@vistechai.com",
    text: "We'll respond within 24 hours",
    color: "blue",
  },
  {
    icon: Phone,
    title: "Phone Support",
    sub: "Call us directly",
    strong: "+1 (555) 123-4567",
    text: "Mon-Fri from 8am to 6pm PST",
    color: "green",
  },
  {
    icon: MapPin,
    title: "Office Location",
    sub: "Visit our headquarters",
    strong: "San Francisco, CA",
    text: "United States",
    color: "purple",
    link: "View on Map",
  },
  {
    icon: MessageSquareText,
    title: "Live Chat",
    sub: "Chat with our team",
    strong: "Available 24/7",
    text: "Instant responses anytime",
    color: "orange",
  },
];

const support = [
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Round-the-clock assistance for urgent issues",
  },
  {
    icon: Users,
    title: "Expert Team",
    text: "AI specialists with years of experience",
  },
  {
    icon: Zap,
    title: "Fast Response",
    text: "Average response time under 2 hours",
  },
  {
    icon: Mail,
    title: "Multiple Channels",
    text: "Email, phone, chat, and video calls",
  },
];

export default function ContactWays() {
  return (
    <section className="contactPanel contactWays">
      <div className="contactSectionHead">
        <span>Contact Channels</span>
        <h2>Multiple Ways to Reach Us</h2>
        <p>Choose the method that works best for you</p>
      </div>

      <div className="waysGrid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article className={`wayCard ${card.color}`} key={card.title}>
              <span className="wayIcon">
                <Icon size={31} />
              </span>

              <h3>{card.title}</h3>
              <p>{card.sub}</p>
              <b>{card.strong}</b>
              <small>{card.text}</small>
              <span className="wayArrow" aria-hidden="true">
                <ArrowRight size={17} />
              </span>
            </article>
          );
        })}
      </div>

      <div className="supportBox">
        <div className="supportIntro">
          <span>Why Us</span>
          <h2>
            Why Choose
            <br />
            Our Support?
          </h2>
          <p>We're committed to providing exceptional customer service</p>
        </div>

        {support.map((item) => {
          const Icon = item.icon;

          return (
            <div className="supportMini" key={item.title}>
              <span>
                <Icon size={27} />
              </span>
              <b>{item.title}</b>
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}