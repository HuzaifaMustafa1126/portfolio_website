import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { Container } from '../../components/layout/Container'
import { aboutData } from '../../data/aboutData'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const experience = [
  { years: '2021 — Present', company: 'Tvoxel Technologies', role: 'Graphics / UI-UX / WordPress Developer', stack: 'WORDPRESS / FIGMA / JAVASCRIPT' },
  { years: '2022 — Present', company: 'SocialMediaFames.com', role: 'WordPress Developer', stack: 'WORDPRESS / WOOCOMMERCE' },
  { years: '2025 — Present', company: 'Abdali Marketing', role: 'Web Developer', stack: 'WEB DEVELOPMENT / UI IMPLEMENTATION' },
]

export function About() {
  const ref = useRef(null); const reducedMotion = useReducedMotion()
  useLayoutEffect(() => { const context = gsap.context(() => gsap.fromTo(ref.current.querySelectorAll('[data-about-compact]'), { autoAlpha: 0, y: reducedMotion ? 0 : 28 }, { autoAlpha: 1, y: 0, duration: reducedMotion ? .01 : .75, stagger: .07, scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true } }), ref); return () => context.revert() }, [reducedMotion])
  return <section ref={ref} id="about" className="about-compact" aria-labelledby="about-title"><Container><header className="compact-section-head"><p>03 / About</p><h2 id="about-title">I build digital products<br />from interface to implementation.</h2></header><div className="about-compact__grid"><figure data-about-compact><img src={aboutData.image.src} alt={aboutData.image.alt} /></figure><div className="about-compact__bio" data-about-compact><span>Huzaifa Mustafa / Pakistan</span><p>I&apos;m a web developer building responsive websites, React applications, WordPress platforms and custom business systems.</p><p>I work across interface implementation, APIs, databases and deployment to turn requirements into working products.</p></div><div className="experience-compact" data-about-compact><p>Experience</p>{experience.map((item) => <article key={item.company}><span>{item.years}</span><h3>{item.company}</h3><p>{item.role}</p><small>{item.stack}</small></article>)}</div></div></Container></section>
}
