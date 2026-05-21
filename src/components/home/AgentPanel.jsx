import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import messageImage from "../../assets/images/message-2.png";
import robotFaceImage from "../../assets/images/robot-face-2.png";
import voiceImage from "../../assets/images/voice-2.png";
import faceImage from "../../assets/images/face.png";

const slides = [
  { image: messageImage, title: "Smart Chat", tag: "Conversation AI" },
  { image: robotFaceImage, title: "AI Robot", tag: "Autonomous Agent" },
  { image: voiceImage, title: "Voice Agent", tag: "Voice Automation" },
  { image: faceImage, title: "Neural AI", tag: "Neural Support" },
];

const states = [
  { x: 0, y: 0, z: 140, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1, blur: 0, zIndex: 5 },
  { x: -120, y: 28, z: -40, rotateY: 18, rotateZ: -5, scale: 0.82, opacity: 0.7, blur: 1.4, zIndex: 3 },
  { x: -210, y: 58, z: -160, rotateY: 30, rotateZ: -9, scale: 0.64, opacity: 0.28, blur: 3.2, zIndex: 1 },
  { x: 145, y: 42, z: -90, rotateY: -22, rotateZ: 7, scale: 0.74, opacity: 0.5, blur: 2.2, zIndex: 2 },
];

export default function AgentPanel() {
  const stageRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!stage || !cards.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(stage, { transformPerspective: 1400, transformStyle: "preserve-3d" });

      cards.forEach((card, index) => {
        const state = states[index];

        gsap.set(card, {
          x: state.x,
          y: state.y,
          z: state.z,
          rotateY: state.rotateY,
          rotateZ: state.rotateZ,
          scale: state.scale,
          opacity: state.opacity,
          zIndex: state.zIndex,
          filter: `blur(${state.blur}px)`,
        });
      });

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power4.inOut" } });

      cards.forEach((_, step) => {
        tl.to(
          cards,
          {
            duration: 1.35,
            stagger: 0,
            x: (i) => states[(i - step - 1 + states.length) % states.length].x,
            y: (i) => states[(i - step - 1 + states.length) % states.length].y,
            z: (i) => states[(i - step - 1 + states.length) % states.length].z,
            rotateY: (i) => states[(i - step - 1 + states.length) % states.length].rotateY,
            rotateZ: (i) => states[(i - step - 1 + states.length) % states.length].rotateZ,
            scale: (i) => states[(i - step - 1 + states.length) % states.length].scale,
            opacity: (i) => states[(i - step - 1 + states.length) % states.length].opacity,
            zIndex: (i) => states[(i - step - 1 + states.length) % states.length].zIndex,
            filter: (i) => `blur(${states[(i - step - 1 + states.length) % states.length].blur}px)`,
          },
          "+=1.25"
        );
      });

      gsap.to(".stackOrbitRing", {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".stackParticle", {
        y: -18,
        opacity: 0.25,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div className="heroRight heroImageStackRight">
      <div className="stackGlow stackGlowOne" />
      <div className="stackGlow stackGlowTwo" />
      <div className="stackGlow stackGlowThree" />

      <div className="stackOrbitRing ringA" />
      <div className="stackOrbitRing ringB" />

      <span className="stackParticle p1" />
      <span className="stackParticle p2" />
      <span className="stackParticle p3" />
      <span className="stackParticle p4" />

      <div className="imageStackStage" ref={stageRef}>
        {slides.map((item, index) => (
          <article
            className="stackImageCard"
            key={item.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          >
            <img src={item.image} alt={item.title} />

            <div className="stackCardMeta">
              <span>{item.tag}</span>
              <b>{item.title}</b>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}