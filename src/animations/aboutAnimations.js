import { gsap, ScrollTrigger } from './gsap'

export function createAboutAnimations(root, reducedMotion = false) {
  const divider = root.querySelector('[data-about-divider]')
  const words = root.querySelectorAll('[data-about-word]')
  const counter = root.querySelector('[data-experience-value]')
  const imageFrame = root.querySelector('[data-about-image-frame]')
  const image = root.querySelector('[data-about-image]')
  const motionDuration = reducedMotion ? 0.01 : 0.85

  gsap.fromTo(root.querySelectorAll('[data-about-label]'), { autoAlpha: 0, y: 16 }, {
    autoAlpha: 1, y: 0, duration: motionDuration, ease: 'power3.out',
    scrollTrigger: { trigger: root.querySelector('.about-intro'), start: 'top 82%', once: true },
  })
  gsap.fromTo(divider, { scaleX: 0 }, {
    scaleX: 1, transformOrigin: 'left', duration: reducedMotion ? 0.01 : 1.1, ease: 'power3.inOut',
    scrollTrigger: { trigger: divider, start: 'top 88%', once: true },
  })

  if (reducedMotion) {
    gsap.set(words, { opacity: 1 })
  } else {
    gsap.fromTo(words, { opacity: 0.18 }, {
      opacity: 1,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: { trigger: root.querySelector('.about-statement'), start: 'top 72%', end: 'bottom 42%', scrub: 0.55 },
    })
  }

  gsap.fromTo(root.querySelectorAll('[data-about-reveal]'), { autoAlpha: 0, y: 35 }, {
    autoAlpha: 1, y: 0, duration: motionDuration, stagger: reducedMotion ? 0 : 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: root.querySelector('.about-profile'), start: 'top 72%', once: true },
  })

  const counterState = { value: 0 }
  const finalValue = Number(counter.dataset.experienceValue)
  if (reducedMotion) {
    counter.textContent = finalValue
  } else {
    counter.textContent = '0'
    gsap.to(counterState, {
      value: finalValue,
      duration: 1.35,
      ease: 'power2.out',
      snap: { value: 1 },
      onUpdate: () => { counter.textContent = Math.round(counterState.value) },
      scrollTrigger: { trigger: counter, start: 'top 84%', once: true },
    })
  }

  gsap.fromTo(imageFrame, { clipPath: reducedMotion ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }, {
    clipPath: 'inset(0 0 0% 0)', duration: reducedMotion ? 0.01 : 1.35, ease: 'power4.inOut',
    scrollTrigger: { trigger: imageFrame, start: 'top 78%', once: true },
  })
  gsap.fromTo(image, { scale: reducedMotion ? 1 : 1.1 }, {
    scale: 1, duration: reducedMotion ? 0.01 : 1.45, ease: 'power4.out',
    scrollTrigger: { trigger: imageFrame, start: 'top 78%', once: true },
  })

  gsap.fromTo(root.querySelectorAll('[data-expertise-row]'), { autoAlpha: 0, y: 24 }, {
    autoAlpha: 1, y: 0, duration: motionDuration, stagger: reducedMotion ? 0 : 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: root.querySelector('.expertise-list'), start: 'top 78%', once: true },
  })

  gsap.fromTo(root.querySelectorAll('[data-approach-reveal]'), { autoAlpha: 0, y: 35 }, {
    autoAlpha: 1, y: 0, duration: motionDuration, stagger: reducedMotion ? 0 : 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: root.querySelector('.about-approach__intro'), start: 'top 76%', once: true },
  })

  const media = gsap.matchMedia()
  if (!reducedMotion) {
    media.add('(min-width: 1024px)', () => {
      gsap.to(image, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: imageFrame, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      })
      ScrollTrigger.create({
        trigger: root.querySelector('.process-story'),
        start: 'top 16%',
        end: 'bottom 84%',
        pin: root.querySelector('.process-story__lead'),
        pinSpacing: false,
      })
      root.querySelectorAll('[data-process-item]').forEach((item) => {
        gsap.to(item, {
          opacity: 1,
          scrollTrigger: { trigger: item, start: 'top 58%', end: 'bottom 42%', toggleActions: 'play reverse play reverse' },
        })
      })
    })
    media.add('(max-width: 1023px)', () => {
      gsap.fromTo(root.querySelectorAll('[data-process-item]'), { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.process-list'), start: 'top 78%', once: true },
      })
    })
  }
  return media
}
