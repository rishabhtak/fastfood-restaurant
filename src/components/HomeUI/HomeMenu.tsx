"use client";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../SectionTitle";

const HomeMenu = () => {
  return (
    <>
      <SectionTitle title="our menu" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-5 lg:mx-10">
        <div>
          <Image
            src={"/pizza.webp"}
            alt="pizza"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold"> Delicious Pizza</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque
            </p>
            <p className="text-sm font-semibold">Start From : $50</p>
          </div>
        </div>
        <div>
          <Image
            src={"/burger.webp"}
            alt="burger"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold"> Delicious Burger</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque
            </p>
            <p className="text-sm font-semibold">Start From : $30</p>
          </div>
        </div>
        <div>
          <Image
            src={"/pasta.webp"}
            alt="pasta"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold"> Delicious Pasta</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque
            </p>
            <p className="text-sm font-semibold">Start From : $40</p>
          </div>
        </div>
        <div>
          <Image
            src={"/fries.webp"}
            alt="fries"
            width={660}
            height={740}
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="flex flex-col space-y-2 py-5">
            <p className="text-xl font-bold"> Delicious French Fries</p>
            <p className="text-sm">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque
            </p>
            <p className="text-sm font-semibold">Start From : $20</p>
          </div>
        </div>
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
