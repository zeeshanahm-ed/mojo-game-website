'use client'
import Banner from "./components/ui/Banner";
import Header from "./components/ui/Header";
import Wrapper from "./components/ui/Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <section>
        <Header />
        <Banner />
      </section>
    </Wrapper>
  );
}
