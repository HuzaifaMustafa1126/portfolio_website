import { Seo } from "../components/common/Seo";
import { About } from "../sections/about/About";
import { Contact } from "../sections/contact/Contact";
import { Hero } from "../sections/hero/Hero";
import { Process } from "../sections/process/Process";
import { StackCapabilities } from "../sections/stack/StackCapabilities";
import { SelectedWork } from "../sections/work/SelectedWork";

export function HomePage() {
  return (
    <>
      <Seo
        title="Huzaifa Mustafa — Web Developer & Software Builder"
        description="Web developer building React applications, WordPress platforms and custom business systems."
      />
      <Hero />
      <SelectedWork />
      <About />
      <StackCapabilities />
      <Process />
      <Contact />
    </>
  );
}
