import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import Pill from "../ui/Pill";
import { testimonials } from "../../data/siteData";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex]);

  return (
    <section className="testimonials">
      <Pill>Loved by Businesses Worldwide</Pill>
      <h2>Real Results from Real Customers</h2>

      <div className="sliderViewport">
        <div
          className="testimonialTrack"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map(({ name, role, quote, avatar }) => (
            <div className="testimonialCardWrapper" key={name}>
              <div className="testimonial">
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p>"{quote}"</p>
                <div className="person">
                  <div className="avatarWrapper">
                    <img src={avatar} alt={`${name} avatar`} loading="lazy" />
                  </div>
                  <span>
                    <b>{name}</b>
                    <small>{role}</small>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dots">
        {testimonials.map((_, index) => (
          <i
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          >
            {activeIndex === index && <span className="progressLine" />}
          </i>
        ))}
      </div>
    </section>
  );
}
