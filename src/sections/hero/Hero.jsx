import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { createHeroEntrance, createHeroScrollDepth } from '../../animations/heroAnimations'
import { Container } from '../../components/layout/Container'
import { heroData } from '../../data/heroData'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HeroCTA } from './HeroCTA'
import { HeroHeading } from './HeroHeading'
import { HeroPortrait } from './HeroPortrait'
import { HeroRoles } from './HeroRoles'
import { ScrollIndicator } from './ScrollIndicator'

export function Hero() {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const context = gsap.context(() => {
      createHeroEntrance(root, reducedMotion)
      createHeroScrollDepth(root, reducedMotion)
      if (!reducedMotion) {
        gsap.to(root.querySelector('.hero-scroll i'), { scaleY: 0, transformOrigin: 'bottom', duration: 1.3, repeat: -1, ease: 'power2.inOut', yoyo: true })
      }
    }, root)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div ref={rootRef} className="hero-root">
      <section className="hero" aria-labelledby="hero-title">
        <Container className="hero__container">
          <div className="hero__top">
            <p data-hero-meta>{heroData.eyebrow}</p>
            <p data-hero-meta><i aria-hidden="true" /> {heroData.availability}</p>
          </div>

          <HeroHeading title={heroData.title} />
          <HeroPortrait portrait={heroData.portrait} />

          <div className="hero-identity" data-hero-reveal>
            <p>{heroData.name}</p>
            <HeroRoles roles={heroData.roles} />
          </div>

          <div className="hero-intro" data-hero-reveal><p>{heroData.intro}</p></div>

          <div className="hero-location" data-hero-reveal>
            <div><span>Based in</span><p>{heroData.location}</p></div>
            <div><span>Reach</span><p>{heroData.reach}</p></div>
          </div>

          <HeroCTA />
          <ScrollIndicator />
          <span className="hero-index" aria-hidden="true">01</span>
        </Container>
      </section>
    </div>
  )
}
