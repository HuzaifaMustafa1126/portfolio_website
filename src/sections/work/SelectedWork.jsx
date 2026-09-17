import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap'
import { Container } from '../../components/layout/Container'
import { projects, wordpressCollection } from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ProjectInterface } from './ProjectInterface'

export function SelectedWork() {
  const rootRef = useRef(null); const reducedMotion = useReducedMotion()
  useLayoutEffect(() => { const context = gsap.context(() => gsap.fromTo(rootRef.current.querySelectorAll('[data-project]'), { autoAlpha: 0, y: reducedMotion ? 0 : 35 }, { autoAlpha: 1, y: 0, duration: reducedMotion ? .01 : .8, stagger: .08, scrollTrigger: { trigger: rootRef.current, start: 'top 76%', once: true } }), rootRef); return () => context.revert() }, [reducedMotion])
  return <section ref={rootRef} id="work" className="work" aria-labelledby="work-title"><Container><header className="compact-section-head"><p>02 / Selected work</p><h2 id="work-title">Software<br />I&apos;ve built.</h2><span>// web applications & systems</span></header>{projects.map((project) => <article key={project.slug} className="project" data-project><div className="project__heading"><span>PROJECT_{project.number}</span><h3>{project.title}</h3><p>{project.type}</p></div><a href={`/work/${project.slug}`} className="project__visual" data-cursor="VIEW"><ProjectInterface project={project} /></a><dl><div><dt>Frontend</dt><dd>{project.frontend}</dd></div><div><dt>Backend</dt><dd>{project.backend}</dd></div><div><dt>Database</dt><dd>{project.database}</dd></div><a href={`/work/${project.slug}`}>View case study ↗</a></dl></article>)}<article className="wordpress-work" data-project><span>PROJECT_{wordpressCollection.number}</span><h3>{wordpressCollection.title}</h3><div><p>{wordpressCollection.type}</p><b>{wordpressCollection.stack}</b></div><a href="/work/wordpress-projects" data-cursor="VIEW">Explore collection ↗</a></article></Container></section>
}
