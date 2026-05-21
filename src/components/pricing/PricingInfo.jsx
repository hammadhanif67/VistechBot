import {
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  FileCheck2,
  Activity,
} from "lucide-react";

import pricingSection from "../../assets/images/pricing-sec-section.png";
import securitySection from "../../assets/images/security-section.png";

export default function PricingInfo() {
  return (
    <section className="pricingInfoGrid">
      <div className="includedBox">
        <div className="includedContent">
          <h3>What's Included</h3>

          <ul>
            <li><CheckCircle2 /> AI-Powered Chatbots</li>
            <li><CheckCircle2 /> Multi-Channel Support</li>
            <li><CheckCircle2 /> Smart Analytics Dashboard</li>
            <li><CheckCircle2 /> Easy Integrations</li>
            <li><CheckCircle2 /> Scalable Solutions</li>
          </ul>
        </div>

        <img className="includedImg" src={pricingSection} alt="AI chatbot platform" />
      </div>

      <div className="secureBox">
        <img className="securityBgImg" src={securitySection} alt="" />

        <div className="secureContent">
          <h3>Trusted & Secure</h3>

          <p>
            30-day money-back guarantee. Your data is always safe with
            enterprise-grade security.
          </p>

          <div className="secureItems">
            <div>
              <LockKeyhole />
              <span>SSL<br />Encrypted</span>
            </div>

            <div>
              <ShieldCheck />
              <span>SOC 2<br />Compliant</span>
            </div>

            <div>
              <FileCheck2 />
              <span>GDPR<br />Ready</span>
            </div>

            <div>
              <Activity />
              <span>99.9%<br />Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}