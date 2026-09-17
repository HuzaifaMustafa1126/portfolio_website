import { useEffect } from "react";
import { gsap } from "../animations/gsap";
import { prefersReducedMotion } from "../utils/motion";

export function useMagnetic(ref, strength = 0.16) {
  useEffect(() => {
    const element = ref.current;
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!element || !canHover || prefersReducedMotion()) return undefined;

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
    const move = (event) => {
      const bounds = element.getBoundingClientRect();
      xTo((event.clientX - bounds.left - bounds.width / 2) * strength);
      yTo((event.clientY - bounds.top - bounds.height / 2) * strength);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
    };
  }, [ref, strength]);
}
