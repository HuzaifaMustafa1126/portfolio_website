import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ServiceDetails({ service, expanded }) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const reducedMotion = useReducedMotion()
  useLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return undefined
    if (expanded) outer.hidden = false
    const targetHeight = expanded ? inner.scrollHeight : 0
    const tween = gsap.to(outer, { height: targetHeight, duration: reducedMotion ? 0.01 : 0.58, ease: 'power3.inOut', onComplete: () => { if (!expanded) outer.hidden = true; ScrollTrigger.refresh() } })
    gsap.to(inner, { autoAlpha: expanded ? 1 : 0, y: expanded ? 0 : 12, duration: reducedMotion ? 0.01 : 0.35, ease: 'power3.out' })
    return () => tween.kill()
  }, [expanded, reducedMotion])
  return <div ref={outerRef} id={`service-details-${service.id}`} className="service-details" hidden={!expanded} aria-hidden={!expanded}><div ref={innerRef} className="service-details__inner"><div className="service-details__image"><img src={service.image} alt={service.imageAlt} width="1536" height="1024" loading="lazy" decoding="async" /></div><p className="service-details__description">{service.description}</p><div><span>Capabilities</span><ul>{service.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>Technology</span><p className="service-details__tech">{service.technologies.join(' / ')}</p></div></div></div>
}
