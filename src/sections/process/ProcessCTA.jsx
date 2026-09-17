import { Magnetic } from '../../components/ui/Magnetic'

export function ProcessCTA() {
  return <footer className="process-footer"><div className="process-footer__heading"><span>Have something in mind?</span><p>Let&apos;s build it. <i aria-hidden="true">↗</i></p></div><p className="process-footer__copy">Tell me about the idea, problem or product you want to create.</p><Magnetic as="a" className="process-cta" href="#contact" strength={0.1} data-cursor="START"><span>Start a project</span><i aria-hidden="true">↗</i></Magnetic><div className="process-next" aria-label="Next section: Testimonials"><span>Next</span><p>Testimonials</p><i>08 ↘</i></div></footer>
}
