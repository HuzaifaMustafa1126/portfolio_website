import { AnimatedHeading } from '../components/animations/AnimatedHeading'
import { Reveal } from '../components/animations/Reveal'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Seo } from '../components/common/Seo'

export function FoundationPage() {
  return (
    <>
      <Seo title="Personal Portfolio — Creative Developer" description="Creative developer portfolio — foundation in progress." />
      <Section className="foundation" aria-labelledby="foundation-title">
        <Container className="foundation__grid">
        <SectionLabel className="foundation__label">Module 01 — Foundation</SectionLabel>

        <AnimatedHeading id="foundation-title" className="foundation__title">
          <span>Personal</span>
          <span className="foundation__title-indent">Portfolio</span>
        </AnimatedHeading>

        <Reveal className="foundation__footer" delay={0.35}>
          <p className="foundation__role">Creative Developer</p>
          <p className="foundation__status">
            <span aria-hidden="true" /> System established
          </p>
        </Reveal>
        </Container>
      </Section>
      <section className="scroll-test" aria-label="Navigation scroll behavior test area">
        <Container><p>Module 02 / Scroll test area</p><span aria-hidden="true">↓</span></Container>
      </section>
    </>
  )
}
