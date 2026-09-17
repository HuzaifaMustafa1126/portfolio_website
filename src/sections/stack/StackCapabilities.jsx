import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { Container } from '../../components/layout/Container'
import { capabilities, stackGroups, stackMarquee } from '../../data/stack'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CapabilityMarquee } from '../services/CapabilityMarquee'
import { Architecture } from './Architecture'

export function StackCapabilities() {
  const ref = useRef(null); const reducedMotion = useReducedMotion()
  useLayoutEffect(() => { const context = gsap.context(() => { gsap.fromTo(ref.current.querySelectorAll('[data-stack-row]'), { autoAlpha: 0, y: reducedMotion ? 0 : 20 }, { autoAlpha: 1, y: 0, duration: reducedMotion ? .01 : .65, stagger: .05, scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true } }); gsap.fromTo(ref.current.querySelectorAll('[data-architecture-line]'), { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', stagger: .12, duration: reducedMotion ? .01 : .6, scrollTrigger: { trigger: ref.current.querySelector('.architecture'), start: 'top 82%', once: true } }) }, ref); return () => context.revert() }, [reducedMotion])
  return <section ref={ref} id="stack" className="stack-compact" aria-labelledby="stack-title"><Container><header className="compact-section-head"><p>04 / Stack & capabilities</p><h2 id="stack-title">What I<br />build with.</h2><span>BUILD_2026</span></header><div className="stack-compact__grid"><div><p className="stack-compact__label">Capabilities</p>{capabilities.map((item, index) => <div className="capability-row" data-stack-row key={item}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item}</h3></div>)}</div><div><p className="stack-compact__label">Stack</p>{stackGroups.map((group) => <article className="stack-row" data-stack-row key={group.label}><span>{group.number} / {group.label.toLowerCase()}</span><h3>{group.label}</h3><p>{group.items}</p></article>)}</div></div><Architecture /></Container><CapabilityMarquee items={stackMarquee} className="stack-marquee" /></section>
}
