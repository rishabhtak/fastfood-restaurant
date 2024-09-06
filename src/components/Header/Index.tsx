"use client";
import { useState } from "react";
import Link from "next/link";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

const Header = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <nav
      className={`absolute w-full h-[70px] flex items-center justify-around z-20 top-0 ${
        pathname === "/" ? "" : "bg-[url('/hero-bg.jpg')] bg-right-top bg-cover"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="text-white text-3xl mx-5">
        Logo
      </Link>
      <Menu />
      <MobileMenu
        mobileNavbarOpen={mobileNavbarOpen}
        setMobileNavbarOpen={setMobileNavbarOpen}
      />
      <div className="flex items-center gap-3 mx-2">
        <Link href="/" className="text-white">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 transition ease-in-out duration-300 hover:text-[#d69e2e]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </Link>
        <Link href="/cart" className="text-white text-3xl">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 transition ease-in-out duration-300 hover:text-[#d69e2e]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              1
            </div>
          </div>
        </Link>
        <Link
          href="/"
          className="hidden lg:block bg-[#ffbe33] py-2 px-8 text-white rounded-full transition ease-in-out duration-300 hover:bg-[#d69e2e] hover:scale-105"
        >
          Order Online
        </Link>
      </div>

      {/* Hamburger Mobile Icon */}
      <button
        className="lg:hidden flex top-0 right-0 z-20 relative w-10 h-10 text-white focus:outline-none"
        onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)}
      >
        <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <span
            className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
              mobileNavbarOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
            }`}
          ></span>
          <span
            className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${
              mobileNavbarOpen ? "w-0 opacity-50" : "w-5 delay-200 opacity-100"
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
              mobileNavbarOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
            }`}
          ></span>
        </div>
      </button>
    </nav>
  );
};

export default Header;
