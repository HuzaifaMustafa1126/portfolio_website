import { gsap } from "./gsap";

export function createHeroEntrance(root, reducedMotion = false) {
  const duration = reducedMotion ? 0.01 : 0.85;
  const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

  timeline
    .fromTo(
      root.querySelectorAll("[data-hero-meta]"),
      { autoAlpha: 0, y: 15 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.4,
        stagger: reducedMotion ? 0 : 0.06,
      },
    )
    .fromTo(
      root.querySelectorAll("[data-hero-line]"),
      { yPercent: 115 },
      {
        yPercent: 0,
        duration,
        stagger: reducedMotion ? 0 : 0.1,
      },
      reducedMotion ? 0 : "-=0.18",
    )
    .fromTo(
      root.querySelector("[data-hero-portrait]"),
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: reducedMotion ? 0.01 : 1.2,
      },
      reducedMotion ? 0 : "-=0.72",
    )
    .fromTo(
      root.querySelector("[data-hero-image]"),
      { scale: reducedMotion ? 1 : 1.12 },
      {
        scale: 1,
        duration: reducedMotion ? 0.01 : 1.35,
      },
      "<",
    )
    .fromTo(
      root.querySelectorAll("[data-hero-reveal]"),
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.58,
        stagger: reducedMotion ? 0 : 0.07,
      },
      reducedMotion ? 0 : "-=0.65",
    );

  return timeline;
}

export function createHeroScrollDepth(root, reducedMotion = false) {
  if (reducedMotion) return [];
  const hero = root.querySelector(".hero");
  const portraitImage = root.querySelector("[data-hero-image]");
  const creative = root.querySelector("[data-title-creative]");
  const developer = root.querySelector("[data-title-developer]");
  const metadata = root.querySelector(".hero__top");

  const shared = {
    trigger: hero,
    start: "top top",
    end: "bottom top",
    scrub: 0.8,
  };
  return [
    gsap.to(portraitImage, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: shared,
    }),
    gsap.to(creative, {
      xPercent: -3.5,
      yPercent: -8,
      ease: "none",
      scrollTrigger: shared,
    }),
    gsap.to(developer, {
      xPercent: 3,
      yPercent: -5,
      ease: "none",
      scrollTrigger: shared,
    }),
    gsap.to(metadata, { autoAlpha: 0.35, ease: "none", scrollTrigger: shared }),
  ];
}
