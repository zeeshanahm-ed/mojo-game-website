'use client'
import AboutMojoSection from "./components/ui/AboutMojoSection";
import Banner from "./components/ui/Banner";
import Header from "./components/ui/Header";
import KnowledgeSection from "./components/ui/KnowledgeSection";
import Wrapper from "./components/ui/Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <section>
        <Banner />
        <AboutMojoSection />
        <KnowledgeSection />
      </section>
    </Wrapper>
  );
}
