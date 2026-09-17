import { scrollToPortfolioTarget } from '../utils/lenis'
import { gsap } from './gsap'

export function createProcessAnimations(root, reducedMotion, onStepChange) {
  const duration = reducedMotion ? 0.01 : 0.85
  gsap.fromTo(root.querySelectorAll('[data-process-meta]'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration, stagger: reducedMotion ? 0 : 0.08, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
  gsap.fromTo(root.querySelector('[data-process-divider]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: reducedMotion ? 0.01 : 1, ease: 'power3.inOut', scrollTrigger: { trigger: root, start: 'top 72%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-process-title]'), { yPercent: 110 }, { yPercent: 0, duration, stagger: reducedMotion ? 0 : 0.12, ease: 'power4.out', scrollTrigger: { trigger: root.querySelector('.process-heading'), start: 'top 80%', once: true } })
  gsap.fromTo(root.querySelector('[data-process-copy]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration, scrollTrigger: { trigger: root.querySelector('.process-heading'), start: 'top 72%', once: true } })
  gsap.fromTo(root.querySelectorAll('[data-process-philosophy]'), { autoAlpha: 0, xPercent: (_, node) => node.dataset.processPhilosophy === 'left' ? -8 : 8 }, { autoAlpha: 1, xPercent: 0, duration, stagger: 0.12, scrollTrigger: { trigger: root.querySelector('.process-philosophy'), start: 'top 70%', once: true } })
  gsap.fromTo(root.querySelector('[data-process-connector]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration, scrollTrigger: { trigger: root.querySelector('.process-philosophy'), start: 'top 62%', once: true } })
  root.querySelectorAll('[data-principle]').forEach((item) => { gsap.fromTo(item.children, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: reducedMotion ? 0.01 : 0.55, stagger: reducedMotion ? 0 : 0.07, scrollTrigger: { trigger: item, start: 'top 84%', once: true } }); gsap.fromTo(item.querySelector('[data-principle-line]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration, scrollTrigger: { trigger: item, start: 'top 88%', once: true } }) })

  const media = gsap.matchMedia()
  let desktopTrigger
  if (!reducedMotion) media.add('(min-width: 1200px)', () => {
    const steps = [...root.querySelectorAll('[data-process-step]')]
    const words = [...root.querySelectorAll('[data-process-background]')]
    const visualParts = [...root.querySelectorAll('.process-visual__frame > span')]
    const timeline = gsap.timeline({ defaults: { duration: 0.62, ease: 'power3.inOut' }, scrollTrigger: { trigger: root.querySelector('[data-process-story]'), start: 'top top', end: 'bottom bottom', pin: root.querySelector('[data-process-stage]'), pinSpacing: false, scrub: 0.65, onUpdate(self) { const index = Math.min(steps.length - 1, Math.round(self.progress * (steps.length - 1))); onStepChange(index); gsap.set(root.querySelector('[data-process-progress]'), { scaleX: self.progress }) } } })
    desktopTrigger = timeline.scrollTrigger
    for (let index = 1; index < steps.length; index += 1) {
      const previous = steps[index - 1]
      const next = steps[index]
      timeline.to(previous.querySelector('.process-step__number span'), { yPercent: -110 }, index - 0.2)
        .to(previous.querySelectorAll('.process-step__main, .process-step__copy'), { autoAlpha: 0, y: -24 }, index - 0.2)
        .to(next, { autoAlpha: 1 }, index - 0.2)
        .fromTo(next.querySelector('.process-step__number span'), { yPercent: 110 }, { yPercent: 0 }, index - 0.2)
        .fromTo(next.querySelectorAll('.process-step__main, .process-step__copy > p'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.06 }, index - 0.14)
        .fromTo(next.querySelectorAll('li'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.3 }, index)
        .to(words[index - 1], { autoAlpha: 0, scale: 0.97 }, index - 0.2)
        .fromTo(words[index], { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1 }, index - 0.1)
        .to(visualParts.slice(0, index + 1), { autoAlpha: 1, stagger: 0.04, duration: 0.25 }, index)
    }
  })
  media.add('(max-width: 1199px)', () => { gsap.fromTo(root.querySelectorAll('[data-process-step]'), { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration, stagger: reducedMotion ? 0 : 0.08, scrollTrigger: { trigger: root.querySelector('.process-steps'), start: 'top 82%', once: true } }) })
  return { media, scrollToStep(index) { if (!desktopTrigger) return; const target = desktopTrigger.start + (desktopTrigger.end - desktopTrigger.start) * (index / 5); scrollToPortfolioTarget(target, { duration: 1.1 }) } }
}
