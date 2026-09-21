import { gsap, ScrollTrigger } from "./gsap";
import { technologyIcons } from "../data/technologyIcons";

export function createHeroEntrance(root, reducedMotion = false) {
  const hero = root.querySelector(".hero");
  const heading = root.querySelector(".hero-heading");
  const portrait = root.querySelector("[data-hero-portrait]");
  const leftWord = root.querySelector(".hero-heading__name--first [data-hero-word]");
  const rightWord = root.querySelector(".hero-heading__name--last [data-hero-word]");
  const leftChars = leftWord.querySelectorAll("[data-hero-char]");
  const rightChars = rightWord.querySelectorAll("[data-hero-char]");
  const fullEffects =
    !reducedMotion && matchMedia("(min-width: 64.01rem)").matches;
  const duration = reducedMotion ? 0.01 : 0.82;
  const timeline = gsap.timeline({
    defaults: { ease: "expo.out" },
    onComplete: () => {
      heading.classList.remove("hero-heading--distort");
      gsap.set(root.querySelectorAll("[data-hero-word], [data-hero-char]"), {
        clearProps: "willChange",
      });
      root.dispatchEvent(new CustomEvent("hero:intro-complete"));
    },
  });

  timeline
    .fromTo(
      hero,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: reducedMotion ? 0.01 : 0.45 },
    )
    .fromTo(
      portrait,
      { clipPath: "inset(100% 0 0 0)", yPercent: 5 },
      {
        clipPath: "inset(0% 0 0 0)",
        yPercent: 0,
        duration: reducedMotion ? 0.01 : 1.05,
      },
      0.1,
    )
    .fromTo(
      leftWord,
      { x: fullEffects ? 130 : 0, scaleX: fullEffects ? 0.94 : 1, willChange: "transform" },
      { x: 0, scaleX: fullEffects ? 1.025 : 1, duration, ease: "elastic.out(1, 0.7)" },
      0.2,
    )
    .fromTo(
      rightWord,
      { x: fullEffects ? -130 : 0, scaleX: fullEffects ? 0.94 : 1, willChange: "transform" },
      { x: 0, scaleX: fullEffects ? 1.025 : 1, duration, ease: "elastic.out(1, 0.7)" },
      0.2,
    )
    .fromTo(
      [...leftChars, ...rightChars],
      {
        yPercent: reducedMotion ? 0 : 130,
        rotationX: fullEffects ? -80 : 0,
        rotationZ: fullEffects ? () => gsap.utils.random(-5, 5) : 0,
        scaleY: fullEffects ? 1.4 : 1,
        autoAlpha: reducedMotion ? 1 : 0,
        willChange: "transform, opacity",
      },
      {
        yPercent: 0,
        rotationX: 0,
        rotationZ: 0,
        scaleY: 1,
        autoAlpha: 1,
        duration,
        stagger: reducedMotion ? 0 : 0.045,
      },
      0.3,
    )
    .call(
      () => fullEffects && heading.classList.add("hero-heading--distort"),
      [],
      0.58,
    )
    .to(
      [...leftChars, ...rightChars],
      {
        skewX: fullEffects ? 5 : 0,
        scaleX: fullEffects ? 1.045 : 1,
        scaleY: fullEffects ? 0.94 : 1,
        duration: reducedMotion ? 0.01 : 0.09,
        yoyo: true,
        repeat: 1,
        ease: "power4.inOut",
      },
      0.58,
    )
    .call(() => heading.classList.remove("hero-heading--distort"), [], 0.78)
    .to([leftWord, rightWord], { scaleX: 1, duration: 0.22 }, 0.78)
    .fromTo(
      root.querySelectorAll(".hero-side"),
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05 },
      1,
    )
    .fromTo(
      root.querySelectorAll(
        ".hero__top, .hero-detail, .hero-role, .hero-code-detail",
      ),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.035 },
      1.15,
    )
    .fromTo(
      root.querySelector("[data-hero-reveal]"),
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.4 },
      1.3,
    );

  return timeline;
}

export function createHeroInteraction(
  root,
  reducedMotion = false,
  technologies = [],
) {
  const hero = root.querySelector(".hero");
  const trail = root.querySelector("[data-tech-trail]");
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
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const fullInteraction =
    finePointer && matchMedia("(min-width: 64.01rem)").matches;
  const leftWord = root.querySelector(".hero-heading__name--first [data-hero-word]");
  const rightWord = root.querySelector(".hero-heading__name--last [data-hero-word]");
  const portraitImage = root.querySelector("[data-hero-image]");
  const characters = [...root.querySelectorAll("[data-hero-char]")];
  const characterSetters = characters.map((character) => ({
    character,
    y: gsap.quickTo(character, "y", { duration: 0.35, ease: "power3.out" }),
    scaleX: gsap.quickTo(character, "scaleX", {
      duration: 0.35,
      ease: "power3.out",
    }),
    scaleY: gsap.quickTo(character, "scaleY", {
      duration: 0.35,
      ease: "power3.out",
    }),
  }));
  const depthSetters = {
    leftX: gsap.quickTo(leftWord, "x", { duration: 0.55, ease: "power3.out" }),
    leftY: gsap.quickTo(leftWord, "y", { duration: 0.55, ease: "power3.out" }),
    rightX: gsap.quickTo(rightWord, "x", { duration: 0.55, ease: "power3.out" }),
    rightY: gsap.quickTo(rightWord, "y", { duration: 0.55, ease: "power3.out" }),
    portraitX: gsap.quickTo(portraitImage, "x", {
      duration: 0.7,
      ease: "power3.out",
    }),
    portraitY: gsap.quickTo(portraitImage, "y", {
      duration: 0.7,
      ease: "power3.out",
    }),
  };
  let nameInteractionEnabled = false;
  const enableNameInteraction = () => {
    nameInteractionEnabled = true;
  };
  const moveNames = (event) => {
    if (!nameInteractionEnabled) return;
    const normalizedX = event.clientX / window.innerWidth - 0.5;
    const normalizedY = event.clientY / window.innerHeight - 0.5;
    depthSetters.leftX(normalizedX * 12);
    depthSetters.leftY(normalizedY * 5);
    depthSetters.rightX(normalizedX * -12);
    depthSetters.rightY(normalizedY * -5);
    depthSetters.portraitX(normalizedX * -3);
    depthSetters.portraitY(normalizedY * -3);

    characterSetters.forEach(({ character, y, scaleX, scaleY }) => {
      const bounds = character.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (bounds.left + bounds.width / 2),
        event.clientY - (bounds.top + bounds.height / 2),
      );
      const influence = Math.max(0, 1 - distance / 150);
      y(-8 * influence);
      scaleX(1 - 0.04 * influence);
      scaleY(1 + 0.08 * influence);
    });
  };
  const resetNames = () => {
    if (!nameInteractionEnabled) return;
    depthSetters.leftX(0);
    depthSetters.leftY(0);
    depthSetters.rightX(0);
    depthSetters.rightY(0);
    depthSetters.portraitX(0);
    depthSetters.portraitY(0);
    characterSetters.forEach(({ y, scaleX, scaleY }) => {
      y(0);
      scaleX(1);
      scaleY(1);
    });
  };
  if (!reducedMotion && finePointer) {
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    if (fullInteraction) {
      hero.addEventListener("pointermove", moveNames);
      hero.addEventListener("pointerleave", resetNames);
      root.addEventListener("hero:intro-complete", enableNameInteraction);
    }
  }

  const media = gsap.matchMedia();
  if (!reducedMotion) {
    const createNameReveal = (movementRatio) => {
      const leftName = root.querySelector(".hero-heading__name--first");
      const rightName = root.querySelector(".hero-heading__name--last");
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(leftName, { xPercent: -movementRatio * 100, ease: "none" }, 0)
        .to(rightName, { xPercent: movementRatio * 100, ease: "none" }, 0)
        .to([leftWord, rightWord], { letterSpacing: "-0.055em", ease: "none" }, 0)
        .to(
          root.querySelector("[data-hero-portrait]"),
          { y: -12, scale: 1.015, ease: "none" },
          0,
        );
    };

    media.add("(min-width: 64.01rem)", () => {
      createNameReveal(0.08);
    });
    media.add("(min-width: 48.01rem) and (max-width: 64rem)", () => {
      createNameReveal(0.045);
    });
    media.add("(max-width: 48rem)", () => {
      gsap.set(root.querySelectorAll(".hero-heading__name"), { clearProps: "x" });
    });
  }

  let refreshActive = true;
  const refresh = () => refreshActive && ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  if (portraitImage && !portraitImage.complete) {
    portraitImage.addEventListener("load", refresh, { once: true });
  }
  return () => {
    refreshActive = false;
    media.revert();
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointermove", moveNames);
    hero.removeEventListener("pointerleave", reset);
    hero.removeEventListener("pointerleave", resetNames);
    root.removeEventListener("hero:intro-complete", enableNameInteraction);
    portraitImage?.removeEventListener("load", refresh);
    active.slice().forEach((token) => {
      gsap.killTweensOf(token);
      token.remove();
    });
    active.length = 0;
  };
}
