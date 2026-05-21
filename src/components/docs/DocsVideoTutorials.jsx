import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, Play } from "lucide-react";
import { useDocsReveal } from "./useDocsReveal";
import { tutorials } from "./docsData";

const matches = (item, query) => !query || `${item.title} ${item.text} ${item.level}`.toLowerCase().includes(String(query).trim().toLowerCase());

export default function DocsVideoTutorials({ query = "" }) {
  const ref = useDocsReveal({ itemSelector: ".videoCard" });
  const videoGridRef = useRef(null);

  const scrollVideos = (direction) => {
    const grid = videoGridRef.current;
    if (!grid) return;

    const card = grid.querySelector(".videoCard");
    const cardWidth = card ? card.getBoundingClientRect().width + 18 : 320;
    grid.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="docsPanel docsReveal" ref={ref} id="docs-videos">
      <div className="docsSectionHead withArrows docsVideoHead">
        <div className="docsVideoTitleBlock">
          <span className="docsSectionEyebrow">Watch & Learn</span>
          <h2>Video Tutorials</h2>
          <p>Step-by-step walkthroughs for setup, voice agents, knowledge base and integrations.</p>
        </div>
        <div className="tutorialArrows">
          <button type="button" onClick={() => scrollVideos(-1)} aria-label="Previous tutorials"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => scrollVideos(1)} aria-label="Next tutorials"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="docsVideoGrid" id="docs-video-grid" ref={videoGridRef}>
        {tutorials.map((video) => (
          <article className={`videoCard ${video.color} ${matches(video, query) ? "isVisible" : "isDimmed"}`} key={video.title}>
            <div className={`videoThumb ${video.screen}`}>
              <div className="videoMock"><span /><span /><span /><span /><i /><i /></div>
              <button className="videoPlayBtn" type="button" aria-label={`Play ${video.title}`}><Play size={34} fill="currentColor" /></button>
            </div>
            <h3>{video.title}</h3>
            <p>{video.text}</p>
            <div className="videoMeta">
              <b>{video.level}</b>
              <small><Clock3 size={13} /> {video.time}</small>
              <Link to="/docs">Watch <ArrowRight size={13} /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
