import { Magnetic } from "../../components/ui/Magnetic";

export function AboutApproach({ approach }) {
  return (
    <section id="approach" className="about-approach" aria-labelledby="approach-title">
      <span className="about-approach__backdrop" aria-hidden="true">
        Build
      </span>
      <div className="about-approach__intro">
        <p data-approach-reveal>{approach.eyebrow}</p>
        <h3 id="approach-title" data-approach-reveal>
          <span>
            {approach.statement[0]}
            <br />
            {approach.statement[1]}
          </span>
          <span>
            {approach.statement[2]} <strong>{approach.statement[3]}</strong>
          </span>
        </h3>
      </div>

      <div className="process-story">
        <div className="process-story__lead">
          <p>How I work</p>
          <span>
            Four considered steps.
            <br />
            One focused outcome.
          </span>
        </div>
        <ol className="process-list">
          {approach.steps.map((step, index) => (
            <li key={step.title} data-process-item>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="about-exit">
        <Magnetic
          as="a"
          className="about-cta"
          href="#contact"
          strength={0.1}
          data-cursor="GO"
        >
          <span>Let&apos;s build something</span>
          <i aria-hidden="true">↗</i>
        </Magnetic>
        <div aria-label="Next section: Selected Work">
          <span>Next / 03</span>
          <p>Selected work</p>
          <i aria-hidden="true">↘</i>
        </div>
      </div>
    </section>
  );
}
