import { useEffect } from 'react'

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(containerRef, active, onEscape, focusDelay = 80) {
  useEffect(() => {
    if (!active || !containerRef.current) return undefined
    const container = containerRef.current
    const focusable = [...container.querySelectorAll(focusableSelector)]
    const first = focusable[0]
    const last = focusable.at(-1)
    const focusTimer = window.setTimeout(() => first?.focus(), focusDelay)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onEscape()
        return
      }
      if (event.key !== 'Tab' || !first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [containerRef, active, onEscape, focusDelay])
}
