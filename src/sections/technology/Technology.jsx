import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { createTechnologyAnimations } from '../../animations/technologyAnimations'
import { Container } from '../../components/layout/Container'
import { featuredStack, technologyCategories, technologyIntro, technologyMarquee, technologyWall } from '../../data/technologies'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CapabilityMarquee } from '../services/CapabilityMarquee'
import { FeaturedStack } from './FeaturedStack'
import { TechnologyCategories } from './TechnologyCategories'
import { TechnologyCTA } from './TechnologyCTA'
import { TechnologyIntro } from './TechnologyIntro'
import { TechnologyPhilosophy } from './TechnologyPhilosophy'
import { TechnologyWall } from './TechnologyWall'

export function Technology() {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    let media
    const context = gsap.context(() => { media = createTechnologyAnimations(root, reducedMotion) }, root)
    return () => { media?.revert(); context.revert() }
  }, [reducedMotion])
  return <section ref={rootRef} id="technology" className="technology" aria-labelledby="technology-title"><Container><TechnologyIntro data={technologyIntro} /></Container><TechnologyWall rows={technologyWall} /><Container><TechnologyCategories categories={technologyCategories} /><FeaturedStack items={featuredStack} /><TechnologyPhilosophy /></Container><CapabilityMarquee items={technologyMarquee} className="technology-marquee" /><Container><TechnologyCTA /></Container></section>
}
