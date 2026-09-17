import { Seo } from "../components/common/Seo";
import { Hero } from "../sections/hero/Hero";
import { About } from "../sections/about/About";
import { Services } from "../sections/services/Services";

export function HomePage() {
  return (
    <>
      <Seo
        title="Huzaifa Mustafa — Creative Web Developer"
        description="Creative web developer specializing in thoughtful design, WordPress, React and high-performance digital experiences."
      />
      <Hero />
      <About />
      <Services />
    </>
  );
}
