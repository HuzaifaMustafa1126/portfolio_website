import { useState } from 'react'
import { TechnologyPreview } from './TechnologyPreview'

export function TechnologyCategories({ categories }) {
  const [active, setActive] = useState({ technology: categories[0].technologies[0], category: categories[0].category, number: categories[0].number })
  const activate = (category, technology) => setActive({ technology, category: category.category, number: category.number })
  return <div className="technology-index"><div className="technology-categories">{categories.map((category) => <section key={category.number} className="technology-category" data-tech-category onMouseEnter={() => activate(category, category.technologies[0])}><div className="technology-category__heading"><span>{category.number}</span><div><h3>{category.category}</h3><p>{category.description}</p></div></div><div className="technology-category__list">{category.technologies.map((technology) => <button key={technology.name} type="button" onMouseEnter={() => activate(category, technology)} onFocus={() => activate(category, technology)} data-cursor={category.cursorLabel.toUpperCase()}>{technology.name}</button>)}</div></section>)}</div><TechnologyPreview {...active} /></div>
}
