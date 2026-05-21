

const journeyData = [
  {
    year: "2023",
    title: "Company Founded",
    text: "VistechBot was founded with a mission to democratize AI technology",
  },
  {
    year: "2024",
    title: "First 1000 Users",
    text: "Reached our first milestone of 1000 active business users",
  },
  {
    year: "2024",
    title: "Series A Funding",
    text: "Secured $5M in funding to accelerate product development",
  },
  {
    year: "2024",
    title: "Global Expansion",
    text: "Expanded to 50+ countries with multi-language support",
  },
];

export default function AboutJourney() {
  return (
    <div className="aboutJourney">
      <h2 className="sectionTitle" data-reveal data-reveal-dir="right">
        Our Journey
      </h2>

      <div className="journeyTimeline">
        {journeyData.map((item, index) => (
          <div
            className="timelineItem"
            key={index}
            data-reveal
            data-reveal-dir="right"
            data-reveal-delay={index + 1}
          >
            <div className="timelineLeft">
              <div className="timelineDot">
                <span>{item.year}</span>
                <div className="dotPulse" />
              </div>
              {index !== journeyData.length - 1 && (
                <span className="timelineLine">
                  <span className="timelineLineInner" />
                </span>
              )}
            </div>
            <div className="timelineContent">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}