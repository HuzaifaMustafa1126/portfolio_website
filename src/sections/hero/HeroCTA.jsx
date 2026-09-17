import { Magnetic } from '../../components/ui/Magnetic'

export function HeroCTA() {
  return (
    <div className="hero-actions" data-hero-reveal>
      <Magnetic as="a" className="hero-cta" href="#work" strength={0.1} data-cursor="VIEW">
        <span>View selected work</span><i aria-hidden="true">↘</i>
      </Magnetic>
      <a className="hero-contact" href="/contact" data-cursor="GO">Let&apos;s talk <span aria-hidden="true">↗</span></a>
    </div>
  )
}
