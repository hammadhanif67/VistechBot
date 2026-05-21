import { Clock, TrendingDown, Gauge, Infinity as InfinityIcon } from "lucide-react";
import Pill from "../ui/Pill";

const benefits = [
  [Clock,       "24/7 Availability",   "Never miss a customer inquiry, day or night."],
  [TrendingDown,"80% Cost Savings",    "Automate repetitive tasks and reduce operational costs."],
  [Gauge,       "Instant Responses",   "Provide real-time answers and faster resolutions."],
  [InfinityIcon, "Unlimited Scalability","Handle thousands of conversations simultaneously."],
];

export default function BenefitsSection() {
  return (
    <section className="resultsBlock">
      <div className="sectionTop compact">
        <div>
          <Pill>Why VistechBot?</Pill>
          <h2>Smarter Support. <span>Better Results.</span></h2>
        </div>
        <p>AI that works 24/7 to improve customer satisfaction, reduce costs, and drive business growth.</p>
      </div>

      <div className="benefitGrid">
        {benefits.map(([Icon, title, desc]) => (
          <div className="benefit" key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
