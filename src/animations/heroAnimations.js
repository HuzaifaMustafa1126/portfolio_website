import { gsap } from "./gsap";
import { technologyIcons } from "../data/technologyIcons";

export function createHeroEntrance(root, reducedMotion = false) {
  const duration = reducedMotion ? 0.01 : 1;
  return gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .fromTo(
      root.querySelector(".hero"),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: reducedMotion ? 0.01 : 0.45 },
    )
    .fromTo(
      root.querySelectorAll("[data-hero-side]"),
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.5,
        stagger: reducedMotion ? 0 : 0.04,
      },
      0.15,
    )
    .fromTo(
      root.querySelectorAll("[data-hero-line]"),
      { yPercent: 115 },
      { yPercent: 0, duration, stagger: reducedMotion ? 0 : 0.1 },
      0.28,
    )
    .fromTo(
      root.querySelector("[data-hero-portrait]"),
      { clipPath: "inset(100% 0 0 0)", yPercent: 8 },
      {
        clipPath: "inset(0% 0 0 0)",
        yPercent: 0,
        duration: reducedMotion ? 0.01 : 1.15,
      },
      0.48,
    );
}

export function createHeroInteraction(
  root,
  reducedMotion = false,
  technologies = [],
) {
  const hero = root.querySelector(".hero");
  const trail = root.querySelector("[data-tech-trail]");
  if (
    reducedMotion ||
    !matchMedia("(hover: hover) and (pointer: fine)").matches
  )
    return () => {};
  const active = [];
  let technologyIndex = 0;
  let previous = null;
  let previousTime = performance.now();

  const removeToken = (token) => {
    const index = active.indexOf(token);
    if (index >= 0) active.splice(index, 1);
    token.remove();
  };
  const spawn = (event, distance, elapsed) => {
    const tech = technologies[technologyIndex % technologies.length];
    technologyIndex += 1;
    const bounds = trail.getBoundingClientRect();
    const dx = previous ? event.clientX - previous.x : 0;
    const dy = previous ? event.clientY - previous.y : 0;
    const velocity = Math.min(distance / Math.max(elapsed, 16), 2.2);
    const token = document.createElement("span");
    const icon = technologyIcons[tech.id];
    token.className = `tech-trail-token tech-trail-token--${tech.id}`;
    token.style.setProperty("--trail-color", `#${icon.hex}`);
    token.innerHTML = `<span class="tech-trail-token__face"><svg viewBox="0 0 24 24" focusable="false"><path d="${icon.path}" /></svg><i></i><b></b></span>`;
    token.dataset.technology = tech.name;
    token.style.left = `${event.clientX - bounds.left + gsap.utils.random(-20, 20)}px`;
    token.style.top = `${event.clientY - bounds.top + gsap.utils.random(-20, 20)}px`;
    if (active.length >= 10) {
      const oldest = active.shift();
      gsap.killTweensOf(oldest);
      oldest.remove();
    }
    trail.appendChild(token);
    active.push(token);
    const directionX = Math.max(-1, Math.min(1, dx / Math.max(distance, 1)));
    const directionY = Math.max(-1, Math.min(1, dy / Math.max(distance, 1)));
    const strength = 18 + velocity * 12;
    gsap.fromTo(
      token,
      {
        autoAlpha: 0,
        scale: 0.3,
        rotateX: directionY * strength + gsap.utils.random(-12, 12),
        rotateY: directionX * strength + gsap.utils.random(-12, 12),
        rotateZ: gsap.utils.random(-20, 20),
      },
      {
        autoAlpha: 1,
        scale: 1 + velocity * 0.05,
        rotateX: 0,
        rotateY: 0,
        rotateZ: gsap.utils.random(-5, 5),
        duration: 0.38,
        ease: "power3.out",
      },
    );
    gsap.to(token, {
      y: -45 - velocity * 8,
      x: directionX * (10 + velocity * 5),
      rotateX: `+=${20 + velocity * 8}`,
      rotateY: `+=${directionX * (30 + velocity * 10)}`,
      rotateZ: `+=${directionX * 14}`,
      scale: 0.68,
      autoAlpha: 0,
      duration: 1.4 + velocity * 0.15,
      delay: 0.22,
      ease: "power2.out",
      onComplete: () => removeToken(token),
    });
  };
  const move = (event) => {
    const now = performance.now();
    if (!previous) {
      previous = { x: event.clientX, y: event.clientY };
      previousTime = now;
      return;
    }
    const distance = Math.hypot(
      event.clientX - previous.x,
      event.clientY - previous.y,
    );
    if (distance < 65) return;
    spawn(event, distance, now - previousTime);
    previous = { x: event.clientX, y: event.clientY };
    previousTime = now;
  };
  const reset = () => {
    previous = null;
  };
  hero.addEventListener("pointermove", move);
  hero.addEventListener("pointerleave", reset);
  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
  });
  scrollTimeline
    .to(
      root.querySelector(".hero-heading__name--first"),
      { xPercent: -12, ease: "none" },
      0,
    )
    .to(
      root.querySelector(".hero-heading__name--last"),
      { xPercent: 12, ease: "none" },
      0,
    )
    .to(
      root.querySelector("[data-hero-portrait]"),
      { yPercent: 10, scale: 0.94, autoAlpha: 0.25, ease: "none" },
      0,
    );
  return () => {
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerleave", reset);
    active.slice().forEach((token) => {
      gsap.killTweensOf(token);
      token.remove();
    });
    active.length = 0;
  };
}
