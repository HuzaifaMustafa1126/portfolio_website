import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../animations/gsap'
import { prefersReducedMotion } from '../../utils/motion'

export function CustomCursor() {
  const cursorRef = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const cursor = cursorRef.current
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion()
    if (!cursor || !enabled) return undefined

    document.documentElement.classList.add('has-custom-cursor')
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' })
    const move = (event) => { xTo(event.clientX); yTo(event.clientY) }
    const over = (event) => {
      const target = event.target.closest('[data-cursor]')
      setLabel(target?.dataset.cursor || '')
      cursor.classList.toggle('custom-cursor--active', Boolean(target))
    }
    const leave = () => cursor.classList.add('custom-cursor--hidden')
    const enter = () => cursor.classList.remove('custom-cursor--hidden')

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span>{label}</span></div>
}
