import { Rocket, Heart, ShieldCheck, Globe } from "lucide-react";


const storyCards = [
  {
    icon: Rocket,
    color: "#6366f1",
    title: "Innovation First",
    text: "We continuously push the boundaries of what's possible with AI, developing cutting-edge solutions that set new industry standards.",
  },
  {
    icon: Heart,
    color: "#ec4899",
    title: "Customer Success",
    text: "Your success is our success. We work closely with every customer to ensure our solutions deliver measurable business value.",
  },
  {
    icon: ShieldCheck,
    color: "#10b981",
    title: "Security & Privacy",
    text: "Enterprise-grade security and privacy protection ensure your data is always safe and compliant with global regulations.",
  },
  {
    icon: Globe,
    color: "#8b5cf6",
    title: "Global Impact",
    text: "We're building solutions that help businesses worldwide improve their customer experience and operational efficiency.",
  },
];

export default function AboutStory() {
  return (
    <div className="aboutStory">
      <h2 className="sectionTitle" data-reveal data-reveal-dir="left">
        Our Story
      </h2>

      <p className="aboutStoryText" data-reveal data-reveal-delay="1">
        Founded in 2023, VistechBot emerged from a simple belief: every business
        deserves access to intelligent AI solutions that can transform their
        customer experience.
      </p>

      <div className="storyCards">
        {storyCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              className="storyCard"
              key={index}
              data-reveal
              data-reveal-dir="left"
              data-reveal-delay={index + 2}
              style={{ "--accent": item.color }}
            >
              <div
                className="storyCardIcon"
                style={{ background: item.color + "22", color: item.color }}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div className="storyCardBody">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <div className="cardGlow" style={{ background: item.color }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}