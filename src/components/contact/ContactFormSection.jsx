import { useState } from "react";
import { ArrowRight, MapPin, ShieldCheck, Star, CheckCircle } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", email: "", companyName: "", message: "" });
    }, 4000);
  };

  return (
    <section className="contactFormGrid" id="contact-form">
      {isSubmitted ? (
        <div className="contactFormCard successState">
          <CheckCircle size={44} className="successIcon" />
          <h2>Thank You!</h2>
          <p>We received your message and will get back to you within 2 hours.</p>
        </div>
      ) : (
        <form className="contactFormCard" onSubmit={handleSubmit}>
          <div className="formHeader">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you shortly.</p>
          </div>

          <div className="formTwo">
            <div className="inputGroup">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your Company (optional)"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              maxLength="500"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              required
            />
            <div className="formCount">{formData.message.length} / 500</div>
          </div>

          <button type="submit" className="submitBtn">
            Send Message
            <ArrowRight size={18} />
          </button>

          <div className="replyNote">
            <ShieldCheck size={16} />
            Typically replies within 2 hours
          </div>
        </form>
      )}

      <aside className="contactSideStack">
        <div className="sideCard mapCard">
          <div className="mapIcon">
            <MapPin size={24} />
          </div>
          <div className="cardContent">
            <h3>Our Headquarters</h3>
            <address>San Francisco, CA, USA</address>
            <p>Visit our office or schedule a morning meeting.</p>
            <a href="#contact-form" className="cardLink">
              Get Directions <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="sideCard">
          <h3>Connect With Us</h3>
          <p>Follow us for active updates and industry insights.</p>
          <div className="socialLine">
            <span className="socialIcon" aria-label="Twitter"><FaTwitter size={16} /></span>
            <span className="socialIcon" aria-label="LinkedIn"><FaLinkedinIn size={16} /></span>
            <span className="socialIcon" aria-label="Facebook"><FaFacebookF size={16} /></span>
            <span className="socialIcon" aria-label="YouTube"><FaYoutube size={16} /></span>
          </div>
        </div>

        <div className="sideCard careCard">
          <h3>Support That Cares ❤</h3>
          <p>Our mission is to help your business grow with intelligent, robust custom solutions.</p>
          <div className="review">
            <div className="avatar">SJ</div>
            <div className="reviewInfo">
              <b>Sarah Johnson</b>
              <small>CEO, VistechBot</small>
            </div>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}