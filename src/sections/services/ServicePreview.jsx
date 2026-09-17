import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ServicePreview({ services, activeId, visible, trackingRef }) {
  const previewRef = useRef(null)
  const reducedMotion = useReducedMotion()
  useLayoutEffect(() => {
    const images = previewRef.current?.querySelectorAll('[data-preview-image]')
    if (!images) return undefined
    const context = gsap.context(() => { images.forEach((image) => { const active = Number(image.dataset.previewImage) === activeId; gsap.to(image, { autoAlpha: active ? 1 : 0, scale: active ? 1 : 0.96, duration: reducedMotion ? 0.01 : 0.42, ease: 'power3.out' }) }) }, previewRef)
    return () => context.revert()
  }, [activeId, reducedMotion])
  useEffect(() => {
    const preview = previewRef.current
    const tracking = trackingRef.current
    const enabled = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)').matches && !reducedMotion
    if (!preview || !tracking || !enabled) return undefined
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.65, ease: 'power3.out' })
    const rotateTo = gsap.quickTo(preview, 'rotation', { duration: 0.65, ease: 'power3.out' })
    const move = (event) => { const height = preview.offsetHeight; yTo(Math.max(24, Math.min(event.clientY - height / 2, window.innerHeight - height - 24))); rotateTo(gsap.utils.clamp(-2.5, 2.5, (event.clientX / window.innerWidth - 0.5) * 5)) }
    tracking.addEventListener('pointermove', move)
    return () => tracking.removeEventListener('pointermove', move)
  }, [trackingRef, reducedMotion])
  return <div ref={previewRef} className={`service-preview${visible ? ' service-preview--visible' : ''}`} aria-hidden="true"><div className="service-preview__media">{services.map((service) => <img key={service.id} src={service.image} alt="" width="1536" height="1024" data-preview-image={service.id} />)}</div><p>Capability / {String(activeId).padStart(2, '0')}</p></div>
}
