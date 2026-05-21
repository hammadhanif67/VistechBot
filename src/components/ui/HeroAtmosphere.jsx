const dots = Array.from({ length: 10 }, (_, index) => index);

export default function HeroAtmosphere({ variant = 'default' }) {
  return (
    <div className={`heroAtmosphere ${variant}`} aria-hidden="true">
      <span className="heroGlow glowOne" />
      <span className="heroGlow glowTwo" />
      <span className="heroGridLayer" />
      {dots.map((item) => (
        <span className={`heroDot dot${item + 1}`} key={item} />
      ))}
      <span className="heroStar starOne">✦</span>
      <span className="heroStar starTwo">✧</span>
      <span className="heroStar starThree">✦</span>
    </div>
  );
}
