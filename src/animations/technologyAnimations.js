import { gsap, ScrollTrigger } from './gsap'

export function createTechnologyAnimations(root, reducedMotion = false) {
  const duration = reducedMotion ? 0.01 : 0.82
  gsap.fromTo(root.querySelectorAll('[data-tech-meta]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration, stagger: reducedMotion ? 0 : 0.08, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.technology-intro'), start: 'top 78%', once: true } })
  gsap.fromTo(root.querySelector('[data-tech-divider]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: reducedMotion ? 0.01 : 1.05, ease: 'power3.inOut', scrollTrigger: { trigger: root.querySelector('[data-tech-divider]'), start: 'top 86%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-tech-title]'), { yPercent: 110 }, { yPercent: 0, duration, stagger: reducedMotion ? 0 : 0.1, ease: 'power4.out', scrollTrigger: { trigger: root.querySelector('.technology-heading'), start: 'top 78%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-tech-category]'), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration, stagger: reducedMotion ? 0 : 0.08, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.technology-categories'), start: 'top 78%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-philosophy-line]'), { yPercent: 110 }, { yPercent: 0, duration, stagger: reducedMotion ? 0 : 0.12, ease: 'power4.out', scrollTrigger: { trigger: root.querySelector('.technology-philosophy'), start: 'top 72%', once: true } })

  const media = gsap.matchMedia()
  if (!reducedMotion) {
    media.add('(min-width: 768px)', () => {
      const rows = root.querySelectorAll('[data-tech-wall-row]')
      const movements = [-12, 8, -9]
      rows.forEach((row, index) => gsap.to(row, { xPercent: movements[index], ease: 'none', scrollTrigger: { trigger: root.querySelector('.technology-wall'), start: 'top bottom', end: 'bottom top', scrub: 0.7 } }))
    })
    media.add('(max-width: 767px)', () => {
      root.querySelectorAll('[data-tech-wall-row]').forEach((row, index) => gsap.to(row, { xPercent: index === 1 ? 4 : -5, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.9 } }))
    })
    media.add('(min-width: 1200px)', () => {
      const stage = root.querySelector('.featured-stack__stage')
      const panels = root.querySelectorAll('[data-feature-panel]')
      ScrollTrigger.create({ trigger: root.querySelector('.featured-stack'), start: 'top 10%', end: 'bottom 90%', pin: stage, pinSpacing: false })
      root.querySelectorAll('[data-feature-trigger]').forEach((trigger, index) => {
        const activate = () => panels.forEach((panel, panelIndex) => gsap.to(panel, { autoAlpha: panelIndex === index ? 1 : 0, yPercent: panelIndex === index ? 0 : panelIndex < index ? -18 : 18, duration: 0.45, ease: 'power3.out' }))
        ScrollTrigger.create({ trigger, start: 'top 52%', end: 'bottom 48%', onEnter: activate, onEnterBack: activate })
      })
    })
  }
  return media
}
