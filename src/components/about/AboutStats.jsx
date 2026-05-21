import {
  Users,
  Zap,
  Globe,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    title: "Active Users",
    text: "Businesses worldwide",
  },
  {
    icon: Zap,
    value: "1M+",
    title: "AI Conversations",
    text: "Monthly interactions",
  },
  {
    icon: Globe,
    value: "50+",
    title: "Countries",
    text: "Global presence",
  },
  {
    icon: Star,
    value: "98%",
    title: "Customer Satisfaction",
    text: "Happy customers",
  },
];

export default function AboutStats() {
  return (
    <section className="aboutStats">
      <div className="sectionHeading">
        <h2>Trusted by Businesses Worldwide</h2>

        <p>
          Our platform is helping thousands of businesses transform
          their customer experience
        </p>
      </div>

      <div className="aboutStatsGrid">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="aboutStatCard" key={index}>
              <div className="aboutStatIcon">
                <Icon size={28} />
              </div>

              <h3>{item.value}</h3>

              <h4>{item.title}</h4>

              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}