"use client";
import Image from "next/image";
import Link from "next/link";
const About = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-16">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-3xl font-bold font-dancingScript text-[#d61c22]">
          Fast Food Restaurant
        </h1>
        <p className="text-5xl font-bold tracking-widest mt-3">WELCOME</p>
        <p className="font-normal text-sm text-[#666666] mx-10 mt-10">
          Donec quis lorem nulla. Nunc eu odio mi. Morbi nec lobortis est. Sed
          fringilla, nunc sed imperdiet lacinia, nisl ante egestas mi, ac
          facilisis ligula sem id neque.
        </p>
        <Link
          href="/about"
          className="font-normal text-sm tracking-wide mt-10 hover:text-blue-500 transition duration-300 ease-in-out"
        >
          OUR STORY
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 ml-2 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
      <div className="block overflow-hidden rounded-xl mx-auto">
        <Image
          src={"/our-story.webp"}
          alt="about image"
          width={390}
          height={390}
          className="object-cover align-middle transition ease-in-out hover:scale-105 duration-300"
        />
      </div>
    </div>
  );
};

export default About;
