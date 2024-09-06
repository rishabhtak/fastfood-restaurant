import HeroSection from "@/components/HomeUI/HeroSection";
import HomeMenu from "@/components/HomeUI/HomeMenu";
import About from "@/components/HomeUI/About";
export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <HomeMenu />
      <div className="h-[1280px]"></div>
    </>
  );
}
