import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function HeroRoles({ roles }) {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion || !rootRef.current) return undefined
    const items = rootRef.current.querySelectorAll('span')
    let timeline
    const context = gsap.context(() => {
      gsap.set(items, { yPercent: 110, autoAlpha: 0 })
      gsap.set(items[0], { yPercent: 0, autoAlpha: 1 })
      timeline = gsap.timeline({ repeat: -1 })
      items.forEach((item, index) => {
        const next = items[(index + 1) % items.length]
        timeline
          .to(item, { yPercent: -110, autoAlpha: 0, duration: 0.5, ease: 'power3.inOut' }, index === 0 ? 2.7 : '+=2.7')
          .fromTo(next, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.inOut' }, '<')
      })
    }, rootRef)
    const handleVisibility = () => timeline?.paused(document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      context.revert()
    }
  }, [reducedMotion, roles])

  return <div ref={rootRef} className="hero-roles" aria-label={`Roles: ${roles.join(', ')}`}>{roles.map((role) => <span key={role} aria-hidden="true">{role}</span>)}</div>
}
