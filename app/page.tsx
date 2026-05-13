import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Thesis from "@/components/sections/Thesis";
import Products from "@/components/sections/Products";
import Architecture from "@/components/sections/Architecture";
import Ecosystem from "@/components/sections/Ecosystem";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import LiveTickers from "@/components/client/LiveTickers";
import RiseObserver from "@/components/client/RiseObserver";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Thesis />
      <Products />
      <Architecture />
      <Ecosystem />
      <CTA />
      <Footer />
      <LiveTickers />
      <RiseObserver />
    </>
  );
}
