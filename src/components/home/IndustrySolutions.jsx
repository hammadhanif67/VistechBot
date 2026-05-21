import { ArrowRight } from "lucide-react";
import Pill from "../ui/Pill";
import { homeIndustries } from "../../data/siteData";
import hologramRobot from "../../assets/images/robot_no_bg.svg";

function IndustryCard({ Icon, title, desc }) {
  return (
    <article className="industryCard">
      <div className="cardIcon"><Icon /></div>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <a>Learn more <ArrowRight size={14} /></a>
      </div>
    </article>
  );
}

export default function IndustrySolutions() {
  return (
    <section className="business sectionShell">
      <div className="sectionTop">
        <div>
          <Pill>Built for Every Team</Pill>
          <h2>AI Solutions for <span>Every Business Need</span></h2>
        </div>
        <p>From startups to enterprises, VistechBot adapts to your workflows and delivers value where it matters most.</p>
      </div>

      <div className="businessGrid">
        <div className="industryCol">
          {homeIndustries.slice(0, 3).map(([Icon, title, desc]) => (
            <IndustryCard key={title} Icon={Icon} title={title} desc={desc} />
          ))}
        </div>

        <div className="robotHub">
          <div className="connector left a" />
          <div className="connector left b" />
          <div className="connector left c" />
          <div className="connector right a" />
          <div className="connector right b" />
          <div className="connector right c" />
          <img src={hologramRobot} alt="AI robot" />
        </div>

        <div className="industryCol">
          {homeIndustries.slice(3).map(([Icon, title, desc]) => (
            <IndustryCard key={title} Icon={Icon} title={title} desc={desc} />
          ))}
        </div>
      </div>
    </section>
  );
}
