import { gsap } from './gsap'

export function createServicesAnimations(root, reducedMotion = false) {
  const duration = reducedMotion ? 0.01 : 0.8
  gsap.fromTo(root.querySelectorAll('[data-services-meta]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration, stagger: reducedMotion ? 0 : 0.08, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.services-intro'), start: 'top 78%', once: true } })
  gsap.fromTo(root.querySelector('[data-services-divider]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: reducedMotion ? 0.01 : 1.05, ease: 'power3.inOut', scrollTrigger: { trigger: root.querySelector('[data-services-divider]'), start: 'top 86%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-services-title]'), { yPercent: 110 }, { yPercent: 0, duration, stagger: reducedMotion ? 0 : 0.1, ease: 'power4.out', scrollTrigger: { trigger: root.querySelector('.services-heading'), start: 'top 78%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-service-row]'), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration, stagger: reducedMotion ? 0 : 0.07, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.services-list'), start: 'top 78%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-services-reveal]'), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration, stagger: reducedMotion ? 0 : 0.08, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.services-business'), start: 'top 80%', once: true } })
  if (!reducedMotion) {
    gsap.fromTo(root.querySelector('[data-statement-left]'), { xPercent: -5 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root.querySelector('.services-statement'), start: 'top bottom', end: 'center center', scrub: 0.7 } })
    gsap.fromTo(root.querySelector('[data-statement-right]'), { xPercent: 5 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root.querySelector('.services-statement'), start: 'top bottom', end: 'center center', scrub: 0.7 } })
    gsap.fromTo(root.querySelector('[data-statement-product]'), { scale: 0.95, autoAlpha: 0.35 }, { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: root.querySelector('.services-statement'), start: 'top 72%', end: 'bottom 45%', scrub: 0.7 } })
  }
}
