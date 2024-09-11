import HeroSection from "@/components/HomeUI/HeroSection";
import HomeMenu from "@/components/HomeUI/HomeMenu";
import About from "@/components/HomeUI/About";
import OrderStep from "@/components/HomeUI/OrderStep";
import Reviews from "@/components/HomeUI/Reviews";
import Offers from "@/components/HomeUI/Offers";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <HomeMenu />
      <Offers />
      <OrderStep />
      <Reviews />
    </>
  );
}
