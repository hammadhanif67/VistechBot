import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { homeStats, trustedCompanies } from "../../data/siteData";

const marqueeCompanies = [
  ...trustedCompanies,
  ...trustedCompanies,
  ...trustedCompanies,
];

export default function StatsBar() {
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const singleSetWidth = track.scrollWidth / 3;

      gsap.set(track, { x: 0 });

      gsap.to(track, {
        x: -singleSetWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const value = parseFloat(x);
            return value % singleSetWidth;
          }),
        },
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section className="statsWrapper">
      <div className="statsGlow" />

      <div className="statsBar">
        {homeStats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.id} className={`statCard ${item.color}`}>
              <div className="statIcon">
                <Icon size={34} />
              </div>

              <div className="statContent">
                <h3>{item.value}</h3>
                <p>{item.label}</p>

                <div className="statGrowth">
                  <TrendingUp size={15} />
                  {item.growth}
                </div>
              </div>

              <div className="statBlur" />
            </div>
          );
        })}
      </div>

      <div className="trustedCompanies">
        <div className="trustedTrack" ref={marqueeRef}>
          {marqueeCompanies.map((company, index) => {
            const Icon = company.icon;

            return (
              <div className="trustedCard" key={`${company.id}-${index}`}>
                <span className="trustedIcon">
                  <Icon size={20} />
                </span>

                <span className="trustedName">{company.name}</span>

                <CheckCircle2 className="trustedCheck" size={16} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}