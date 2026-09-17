export function ProcessNavigation({ steps, activeStep, onSelect }) {
  return <nav className="process-navigation" aria-label="Process steps">{steps.map((step, index) => <button key={step.id} type="button" className={activeStep === index ? 'is-active' : ''} aria-current={activeStep === index ? 'step' : undefined} onClick={() => onSelect(index)}><i aria-hidden="true" />{step.shortTitle}</button>)}</nav>
}
