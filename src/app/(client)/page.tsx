import HeroSection from "@/components/Client/HomeUI/HeroSection";
import HomeMenu from "@/components/Client/HomeUI/HomeMenu";
import About from "@/components/Client/HomeUI/About";
import OrderStep from "@/components/Client/HomeUI/OrderStep";
import Reviews from "@/components/Client/HomeUI/Reviews";
import Offers from "@/components/Client/HomeUI/Offers";

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
