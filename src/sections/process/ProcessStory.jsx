import { useCallback, useEffect, useRef, useState } from 'react'
import { ProcessNavigation } from './ProcessNavigation'
import { ProcessProgress } from './ProcessProgress'
import { ProcessStep } from './ProcessStep'
import { ProcessVisual } from './ProcessVisual'

export function ProcessStory({ steps, scrollControllerRef, activeSetterRef }) {
  const [activeStep, setActiveStep] = useState(0)
  const storyRef = useRef(null)
  useEffect(() => { activeSetterRef.current = setActiveStep; return () => { activeSetterRef.current = null } }, [activeSetterRef])
  const selectStep = useCallback((index) => scrollControllerRef.current?.(index), [scrollControllerRef])
  return <div className="process-story" ref={storyRef} data-process-story>
    <div className="process-story__stage" data-process-stage>
      <div className="process-background" aria-hidden="true">{steps.map((step, index) => <span key={step.id} className={index === 0 ? 'is-active' : ''} data-process-background={index}>{step.backgroundWord}</span>)}</div>
      <ProcessVisual />
      <div className="process-steps">{steps.map((step, index) => <ProcessStep key={step.id} step={step} index={index} />)}</div>
      <div className="process-story__footer"><ProcessProgress activeStep={activeStep} count={steps.length} /><ProcessNavigation steps={steps} activeStep={activeStep} onSelect={selectStep} /></div>
    </div>
    <div className="process-story__scroll-space" aria-hidden="true" />
  </div>
}
