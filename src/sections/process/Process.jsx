import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../animations/gsap'
import { Container } from '../../components/layout/Container'
import { processSteps } from '../../data/process'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const summaries = ['Understand the product.', 'Define structure and technology.', 'Create the interface.', 'Build the product.', 'Refine and optimize.', 'Deploy and deliver.']
const pipeline = ['Idea', 'UI', 'Code', 'API', 'Database', 'Deploy']

export function Process() {
  const ref = useRef(null); const [active, setActive] = useState(0); const reducedMotion = useReducedMotion()
  useLayoutEffect(() => { const context = gsap.context(() => { gsap.fromTo(ref.current.querySelectorAll('[data-process-row]'), { autoAlpha: 0, y: reducedMotion ? 0 : 22 }, { autoAlpha: 1, y: 0, duration: reducedMotion ? .01 : .6, stagger: .06, scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true } }); gsap.fromTo(ref.current.querySelectorAll('.process-pipeline i'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', stagger: .08, duration: reducedMotion ? .01 : .5, scrollTrigger: { trigger: ref.current.querySelector('.process-pipeline'), start: 'top 84%', once: true } }) }, ref); return () => context.revert() }, [reducedMotion])
  return <section ref={ref} id="process" className="process-compact" aria-labelledby="process-title"><Container><header className="compact-section-head"><p>05 / Process</p><h2 id="process-title">How I<br />build.</h2><span>// from idea to deployment</span></header><div className="process-compact__layout"><div className="process-compact__steps">{processSteps.map((step, index) => <button key={step.id} type="button" className={active === index ? 'is-active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} data-process-row><span>{step.number}</span><h3>{step.shortTitle}</h3><p>{summaries[index]}</p><i aria-hidden="true">—</i></button>)}</div><aside aria-live="polite"><span>{processSteps[active].number} / 06</span><h3>{processSteps[active].keyword}</h3><p>{processSteps[active].description}</p><ul>{processSteps[active].details.slice(0, 3).map((detail) => <li key={detail}>{detail}</li>)}</ul></aside></div><div className="process-pipeline" aria-label="Development pipeline">{pipeline.map((item, index) => <div key={item}><span>{item}</span>{index < pipeline.length - 1 && <i aria-hidden="true" />}</div>)}</div></Container></section>
}
