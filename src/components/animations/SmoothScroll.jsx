import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../animations/gsap'
import { prefersReducedMotion } from '../../utils/motion'

export function SmoothScroll({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    const update = (time) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const stop = () => lenis.stop()
    const start = () => lenis.start()
    window.addEventListener('portfolio:scroll-lock', stop)
    window.addEventListener('portfolio:scroll-unlock', start)

    return () => {
      window.removeEventListener('portfolio:scroll-lock', stop)
      window.removeEventListener('portfolio:scroll-unlock', start)
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return children
}
