import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Thesis from "@/components/sections/Thesis";
import Products from "@/components/sections/Products";
import Ecosystem from "@/components/sections/Ecosystem";
import ShmonadBanner from "@/components/sections/ShmonadBanner";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import LiveTickers from "@/components/client/LiveTickers";
import RiseObserver from "@/components/client/RiseObserver";
import Preloader from "@/components/client/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <Hero />
      <Thesis />
      <Products />
      <Ecosystem />
      <ShmonadBanner />
      <CTA />
      <Footer />
      <LiveTickers />
      <RiseObserver />
    </>
  );
}
