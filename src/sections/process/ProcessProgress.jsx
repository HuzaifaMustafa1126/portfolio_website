export function ProcessProgress({ activeStep, count }) {
  return <div className="process-progress" aria-live="polite"><span>{String(activeStep + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span><div><i data-process-progress /></div></div>
}
