import { prefersReducedMotion } from './motion'

let activeLenis = null

export function setActiveLenis(instance) {
  activeLenis = instance
}

export function scrollToPortfolioTarget(target, options = {}) {
  if (activeLenis) activeLenis.scrollTo(target, options)
  else window.scrollTo({ top: Number(target) || 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
