'use client'
import AboutMojoSection from "./components/ui/home-page-ui/AboutMojoSection";
import KnowledgeSection from "./components/ui/home-page-ui/KnowledgeSection";
import Banner from "./components/ui/home-page-ui/Banner";
import PlayingModeSection from "./components/ui/home-page-ui/PlayingModeSection";
import LifeLineSection from "./components/ui/home-page-ui/LifeLineSection";

export default function Home() {
  return (
    <section>
      <Banner />
      <AboutMojoSection />
      <KnowledgeSection />
      <PlayingModeSection />
      <LifeLineSection />
    </section>
  );
}
