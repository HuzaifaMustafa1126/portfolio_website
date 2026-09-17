import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { createHeroEntrance, createHeroInteraction } from '../../animations/heroAnimations'
import { Container } from '../../components/layout/Container'
import { heroData, heroTechnologies } from '../../data/heroData'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HeroHeading } from './HeroHeading'
import { HeroPortrait } from './HeroPortrait'
import { ScrollIndicator } from './ScrollIndicator'
import { TechnologyStack } from './TechnologyStack'

export function Hero() {
  const rootRef = useRef(null); const reducedMotion = useReducedMotion()
  useLayoutEffect(() => {
    const root = rootRef.current; if (!root) return undefined
    let cleanupInteraction = () => {}
    const context = gsap.context(() => { createHeroEntrance(root, reducedMotion); cleanupInteraction = createHeroInteraction(root, reducedMotion, heroTechnologies) }, root)
    return () => { cleanupInteraction(); context.revert() }
  }, [reducedMotion])
  return <div ref={rootRef} className="hero-root"><section className="hero" aria-labelledby="hero-title"><div className="hero-grid" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" /><TechnologyStack technologies={heroTechnologies} /><Container className="hero__container">
    <div className="hero__top" data-hero-side><p>{heroData.eyebrow}</p><p><i aria-hidden="true" /> {heroData.availability}</p></div>
    <div className="hero-side hero-side--left" data-hero-side><strong>Web<br />Developer</strong><span>Creative coder<br />WordPress specialist</span></div>
    <div className="hero-side hero-side--right" data-hero-side><strong>Frontend<br />Developer</strong><span>React<br />WordPress<br />Interactive web</span></div>
    <HeroHeading title={heroData.title} />
    <HeroPortrait portrait={heroData.portrait} />
    <div className="hero-role" data-hero-side>Web Developer</div>
    <div className="hero-detail hero-detail--left" data-hero-side><span>01 / Developer</span><p>Sargodha — PK</p></div>
    <div className="hero-detail hero-detail--right" data-hero-side><span>Available for</span><p>Web projects</p></div>
    <div className="hero-code-detail" data-hero-side aria-hidden="true"><span>const</span> developer = {'{'}<br />&nbsp;&nbsp;creative: true,<br />&nbsp;&nbsp;building: &quot;web&quot;<br />{'}'}</div>
    <ScrollIndicator />
  </Container></section></div>
}
