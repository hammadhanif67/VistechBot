import { ArrowRight, Play } from "lucide-react";
import AgentPanel from "./AgentPanel";
import Pill from "../ui/Pill";

export default function Hero() {
  return (
    <section className="heroSection">
      {/* LEFT CONTENT */}
      <div className="heroLeft">
        <Pill>AI-Powered Customer Support Platform</Pill>

        <h1>
          Transform Your
          <span>Customer Experience</span>
          with AI
        </h1>

        <p>
          Deploy intelligent voice agents and chatbots that provide 24/7 customer
          support, answer questions instantly, and scale your business effortlessly.
        </p>

        <div className="heroActions">
          <button className="btn primary heroBtn" type="button">
            Start Free Trial
            <ArrowRight size={24} />
          </button>

          <button className="btn outline heroBtn" type="button">
            <Play size={22} fill="currentColor" />
            Watch Demo
          </button>
        </div>
      </div>

      {/* RIGHT — interactive agent panel */}
      <AgentPanel />
    </section>
  );
}
