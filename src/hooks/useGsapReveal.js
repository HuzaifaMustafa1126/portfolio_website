import { useLayoutEffect } from "react";
import { gsap } from "../animations/gsap";
import { prefersReducedMotion } from "../utils/motion";

export function useGsapReveal(ref, options = {}) {
  const { delay = 0, duration = 0.9, y = 32, start = "top 88%" } = options;

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start, once: true },
        },
      );
    }, element);

    return () => context.revert();
  }, [ref, delay, duration, y, start]);
}
