import { pricingBenefits } from "../../data/pricingData";

export default function PricingBenefits() {
  return (
    <section className="pricingBenefits">
      {pricingBenefits.map(([icon, title, text]) => (
        <div className="pricingBenefit" key={title}>
          <span>{icon}</span>
          <div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
