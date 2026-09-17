import { gsap } from "./gsap";

export function createMenuTimeline(scope, reducedMotion = false) {
  const duration = reducedMotion ? 0.01 : 0.58;
  const timeline = gsap.timeline({ paused: true });

  timeline
    .fromTo(
      scope,
      { clipPath: "inset(100% 0 0 0)", autoAlpha: 1 },
      {
        clipPath: "inset(0% 0 0 0)",
        duration,
        ease: "power4.inOut",
      },
    )
    .fromTo(
      "[data-menu-chrome]",
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.25,
        stagger: reducedMotion ? 0 : 0.03,
        ease: "power3.out",
      },
      reducedMotion ? 0 : "-=0.3",
    )
    .fromTo(
      "[data-menu-link]",
      { autoAlpha: 0, yPercent: 110 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: reducedMotion ? 0.01 : 0.48,
        stagger: reducedMotion ? 0 : 0.055,
        ease: "power4.out",
      },
      reducedMotion ? 0 : "-=0.15",
    )
    .fromTo(
      "[data-menu-meta]",
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.32,
        ease: "power3.out",
      },
      reducedMotion ? 0 : "-=0.28",
    );

  return timeline;
}
