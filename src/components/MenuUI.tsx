"use client";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import Offers from "./HomeUI/Offers";
import Link from "next/link";
import { useInView, useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
const MenuUI = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [ref, leftSpring] = useInView(
    () => ({
      from: { transform: "translateX(-100px)", opacity: 0 },
      to: { transform: "translateX(0px)", opacity: 1 },
      config: { tension: 100, friction: 22 },
    }),
    {
      once: true,
      threshold: 0.5,
    }
  );

  const [ref2, rightSpring] = useInView(
    () => ({
      from: { transform: "translateX(100px)", opacity: 0 },
      to: { transform: "translateX(0px)", opacity: 1 },
      config: { tension: 100, friction: 22 },
    }),
    { once: true, threshold: 0.6 }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <SectionTitle title="Burger" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-5 lg:mx-10">
        <animated.div
          style={leftSpring}
          ref={ref}
          className="mb-8 flex items-start"
        >
          <div className="mr-6">
            <Image
              src="/burger.jpg"
              alt="burger"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Burger
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                39
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </animated.div>
        <animated.div
          style={rightSpring}
          ref={ref2}
          className="mb-8 flex items-start"
        >
          <div className="mr-6">
            <Image
              src="/burger.jpg"
              alt="burger"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Burger
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                39
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </animated.div>
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/burger.jpg"
              alt="burger"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Burger
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                39
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/burger.jpg"
              alt="burger"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Burger
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                39
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
      </div>
      <Offers />
      <SectionTitle title="Pizza" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-5 lg:mx-10">
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/pizza.webp"
              alt="pizza"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Pizza
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                59
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/pizza.webp"
              alt="pizza"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Pizza
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                59
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/pizza.webp"
              alt="pizza"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Pizza
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                59
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/pizza.webp"
              alt="pizza"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Pizza
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                59
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
      </div>
      <SectionTitle title="Beverages" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-5 lg:mx-10">
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/pasta.webp"
              alt="pasta"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket Pasta
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                49
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
        <div className="mb-8 flex items-start">
          <div className="mr-6">
            <Image
              src="/fries.webp"
              alt="fries"
              width={120}
              height={120}
              className="block rounded-lg max-w-full h-auto"
            />
          </div>
          <div className="inner-box">
            <span className="inline-block top-0 text-white text-sm mb-1 bg-[#e7272d] py-0 px-3 font-bold uppercase rounded-3xl">
              Recommended
            </span>
            <div className="info relative clearfix">
              <h3 className="text-2xl relative bg-[#f4f3e7] pr-3 font-bold tracking-normal text-black capitalize float-left">
                smoked Brisket French Fries
              </h3>
              <h3 className="relative text-[#e7272d] bg-[#f4f3e7]  text-2xl pl-5 font-bold float-right">
                <i>$ </i>
                30
              </h3>
            </div>
            <div className="pr-12">
              Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served
              with your choice of side
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuUI;
