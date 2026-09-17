import { Container } from '../../components/layout/Container'
import { Magnetic } from '../../components/ui/Magnetic'
import { contactData } from '../../data/contact'

export function Contact() {
  return <section id="contact" className="contact" aria-labelledby="contact-title"><Container><header><p>06 / Contact</p><span>{'{ available: true }'}</span></header><h2 id="contact-title">Have a product<br />to build?</h2><div className="contact__grid"><p>Tell me about the application, website or business system you need. I can help shape the interface and build the working product.</p><Magnetic as="a" href={`mailto:${contactData.email}`} className="contact__cta" data-cursor="START"><span>Start a project</span><i>↗</i></Magnetic></div><footer><div><span>Builds</span><p>{contactData.services.join(' / ')}</p></div><div><span>Email</span><a href={`mailto:${contactData.email}`}>{contactData.email}</a></div><p>© 2026 Huzaifa Mustafa</p></footer></Container></section>
}
