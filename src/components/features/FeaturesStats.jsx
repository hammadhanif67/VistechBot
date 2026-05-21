import { Globe2, Languages, ShieldCheck, Clock3 } from "lucide-react";
const stats = [
  { icon: Globe2, value: "10+", label: "Industry Domains" },
  { icon: Languages, value: "100+", label: "Languages Supported" },
  { icon: ShieldCheck, value: "99.9%", label: "Accuracy Rate" },
  { icon: Clock3, value: "24/7", label: "Available Always" },
];

export default function FeaturesStats() {
  return (
    <section className="featuresStatsSection">
      <div className="featuresStatsContainer">
        <div className="featuresStatsCard">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div className="featuresStatItem" key={item.label}>
                <div className="featuresStatIcon">
                  <Icon size={22} />
                </div>

                <div className="featuresStatContent">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}