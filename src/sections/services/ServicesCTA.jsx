import { Magnetic } from '../../components/ui/Magnetic'

export function ServicesCTA() {
  return <div className="services-footer"><div className="services-business" data-services-reveal><p>Need something that doesn&apos;t fit into a standard category?</p><span>I also build custom solutions around specific business requirements and workflows.</span></div><Magnetic as="a" className="services-cta" href="#contact" strength={0.1} data-cursor="TALK"><span>Have a project?<br />Let&apos;s talk</span><i aria-hidden="true">↗</i></Magnetic><div className="services-next" data-services-reveal aria-label="Next section: Technology and Skills"><span>Next / 05</span><p>Technology / Skills</p><i aria-hidden="true">↘</i></div></div>
}
