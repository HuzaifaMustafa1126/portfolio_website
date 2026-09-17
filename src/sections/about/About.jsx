import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../animations/gsap";
import { createAboutAnimations } from "../../animations/aboutAnimations";
import { Container } from "../../components/layout/Container";
import { aboutData } from "../../data/aboutData";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { AboutApproach } from "./AboutApproach";
import { AboutImage } from "./AboutImage";
import { AboutProfile } from "./AboutProfile";
import { AboutStatement } from "./AboutStatement";
import { ExpertiseList } from "./ExpertiseList";

export function About() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let media;
    const context = gsap.context(() => {
      media = createAboutAnimations(root, reducedMotion);
    }, root);
    const image = root.querySelector("[data-about-image]");
    const refresh = () => ScrollTrigger.refresh();
    if (image.complete) refresh();
    else image.addEventListener("load", refresh, { once: true });
    return () => {
      image.removeEventListener("load", refresh);
      media?.revert();
      context.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="about"
      className="about"
      aria-labelledby="about-title"
    >
      <div className="about-light">
        <Container>
          <header className="about-intro">
            <div className="about-intro__meta">
              <p data-about-label>{aboutData.label}</p>
              <p data-about-label>Who I am</p>
            </div>
            <div className="about-intro__divider" data-about-divider />
            <AboutStatement statement={aboutData.statement} />
          </header>

          <AboutProfile data={aboutData} />

          <div className="about-duality">
            <p data-about-reveal>
              Design <span>×</span> Development
            </p>
            <p data-about-reveal>{aboutData.duality}</p>
          </div>

          <AboutImage image={aboutData.image} />
          <ExpertiseList expertise={aboutData.expertise} />
        </Container>
      </div>

      <Container className="about-dark-container">
        <AboutApproach approach={aboutData.approach} />
      </Container>
    </section>
  );
}
