import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { prefersReducedMotion } from '../utils/motion'

export function useHeaderScroll(headerRef, disabled = false) {
  const lastScroll = useRef(0)
  const ticking = useRef(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return undefined

    const reduced = prefersReducedMotion()
    const showHeader = () => gsap.to(header, { yPercent: 0, duration: reduced ? 0 : 0.45, ease: 'power3.out', overwrite: true })

    if (disabled) {
      showHeader()
      return undefined
    }

    const update = () => {
      const current = Math.max(window.scrollY, 0)
      const delta = current - lastScroll.current
      setCompact(current > 96)

      if (Math.abs(delta) > 4) {
        if (delta > 0 && current > 140) {
          gsap.to(header, { yPercent: -105, duration: reduced ? 0 : 0.42, ease: 'power3.inOut', overwrite: true })
        } else if (delta < 0) {
          showHeader()
        }
        lastScroll.current = current
      }
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    lastScroll.current = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [headerRef, disabled])

  return compact
}
