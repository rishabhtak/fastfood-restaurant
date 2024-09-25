"use client";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../SectionTitle";
import { useInView, useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

const HomeMenu = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Create a function to generate the spring animation based on delay and ref
  const createSpring = (delay: number) => {
    const [ref, inView] = useInView({
      once: true,
      threshold: 0.1,
    });

    const springProps = useSpring({
      transform: inView ? "translateY(0px)" : "translateY(100px)",
      opacity: inView ? 1 : 0,
      config: { tension: 100, friction: 22 },
      delay,
    });

    return [ref, springProps] as const;
  };

  // Define springs with different delays
  const [ref1, oneSprings] = createSpring(0);
  const [ref2, secondSprings] = createSpring(300);
  const [ref3, thirdSprings] = createSpring(600);
  const [ref4, fourthSprings] = createSpring(900);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <SectionTitle title="our menu" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-5 lg:mx-10">
        {/* First Item */}
        <animated.div ref={ref1} style={oneSprings}>
          <Image
            src={"/pizza.webp"}
            alt="pizza"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold">Delicious Pizza</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque.
            </p>
            <p className="text-sm font-semibold">Start From : $50</p>
          </div>
        </animated.div>

        {/* Second Item */}
        <animated.div ref={ref2} style={secondSprings}>
          <Image
            src={"/burger.webp"}
            alt="burger"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold">Delicious Burger</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque.
            </p>
            <p className="text-sm font-semibold">Start From : $30</p>
          </div>
        </animated.div>

        {/* Third Item */}
        <animated.div ref={ref3} style={thirdSprings}>
          <Image
            src={"/pasta.webp"}
            alt="pasta"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold">Delicious Pasta</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque.
            </p>
            <p className="text-sm font-semibold">Start From : $40</p>
          </div>
        </animated.div>

        {/* Fourth Item */}
        <animated.div ref={ref4} style={fourthSprings}>
          <Image
            src={"/fries.webp"}
            alt="fries"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold">Delicious French Fries</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque.
            </p>
            <p className="text-sm font-semibold">Start From : $20</p>
          </div>
        </animated.div>
      </div>

      <div className="flex justify-center py-8">
        <Link
          href="/menu"
          className="inline-block bg-[#ffbe33] py-3 px-10 text-white rounded-full transition duration-300 hover:bg-[#d69e2e] hover:scale-105"
        >
          View Menu
        </Link>
      </div>
    </>
  );
};

export default HomeMenu;
