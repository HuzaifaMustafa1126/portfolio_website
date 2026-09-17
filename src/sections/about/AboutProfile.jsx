import { ExperienceCounter } from "./ExperienceCounter";

export function AboutProfile({ data }) {
  return (
    <div className="about-profile">
      <p className="about-profile__label" data-about-reveal>
        About me
      </p>
      <div className="about-bio">
        {data.biography.map((paragraph, index) => (
          <p
            key={paragraph}
            className={index === 0 ? "about-bio__lead" : ""}
            data-about-reveal
          >
            {paragraph}
          </p>
        ))}
      </div>
      <dl className="about-details" data-about-reveal>
        <div>
          <dt>Name</dt>
          <dd>{data.name}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{data.role}</dd>
        </div>
        <div>
          <dt>Based</dt>
          <dd>{data.location}</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>{data.focus}</dd>
        </div>
      </dl>
      <ExperienceCounter value={data.experience} />
    </div>
  );
}
