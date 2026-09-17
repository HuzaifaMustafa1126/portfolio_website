import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { createServicesAnimations } from '../../animations/servicesAnimations'
import { Container } from '../../components/layout/Container'
import { capabilityMarquee, services, servicesIntro } from '../../data/services'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CapabilityMarquee } from './CapabilityMarquee'
import { ServicesCTA } from './ServicesCTA'
import { ServicesIntro } from './ServicesIntro'
import { ServicesList } from './ServicesList'
import { ServicesStatement } from './ServicesStatement'

export function Services() {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const context = gsap.context(() => createServicesAnimations(root, reducedMotion), root)
    return () => context.revert()
  }, [reducedMotion])
  return <section ref={rootRef} id="services" className="services" aria-labelledby="services-title"><Container><ServicesIntro data={servicesIntro} /><ServicesList services={services} /><ServicesStatement /></Container><CapabilityMarquee items={capabilityMarquee} /><Container><ServicesCTA /></Container></section>
}
