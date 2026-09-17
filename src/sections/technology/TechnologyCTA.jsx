import { Magnetic } from '../../components/ui/Magnetic'

export function TechnologyCTA() {
  return <footer className="technology-footer"><div className="technology-cta-copy"><span>Have an idea?</span><p>Let&apos;s turn it<br />into something<br />real.</p></div><Magnetic as="a" className="technology-cta" href="#contact" strength={0.1} data-cursor="TALK"><span>Start a conversation</span><i aria-hidden="true">↗</i></Magnetic><div className="technology-next" aria-label="Next section: Experience"><span>Next / 06</span><p>Experience</p><i aria-hidden="true">↘</i></div></footer>
}
