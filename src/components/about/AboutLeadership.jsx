import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

const leaders = [
  {
    image: "https://i.pravatar.cc/300?img=47",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    text: "Former AI researcher with 10+ years experience in machine learning and natural language processing.",
  },
  {
    image: "https://i.pravatar.cc/300?img=12",
    name: "Michael Chen",
    role: "CTO",
    text: "Expert in scalable AI systems and cloud infrastructure with leadership experience at top tech companies.",
  },
  {
    image: "https://i.pravatar.cc/300?img=32",
    name: "Emily Rodriguez",
    role: "Head of Product",
    text: "Product strategist focused on creating intuitive AI solutions that solve real business problems.",
  },
  {
    image: "https://i.pravatar.cc/300?img=15",
    name: "David Kim",
    role: "VP of Engineering",
    text: "Full-stack engineering leader with expertise in distributed systems and enterprise platforms.",
  },
];

export default function AboutLeadership() {
  return (
    <section className="aboutLeadership">
      <div className="sectionHeading">
        <h2>Meet Our Leadership</h2>

        <p>
          Our experienced team brings together expertise in AI,
          product development, and business strategy.
        </p>
      </div>

      <div className="leadershipGrid">
        {leaders.map((leader, index) => (
          <div className="leaderCard" key={index}>
            <img src={leader.image} alt={leader.name} />

            <h3>{leader.name}</h3>

            <span>{leader.role}</span>

            <p>{leader.text}</p>

            <div className="leaderSocials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label={`${leader.name} LinkedIn`}>
                <FaLinkedinIn size={18} />
              </a>

              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label={`${leader.name} Twitter`}>
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}