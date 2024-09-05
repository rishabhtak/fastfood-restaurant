import Link from "next/link";
import React from "react";

interface MobileNavbarProps {
  mobileNavbarOpen: boolean;
  setMobileNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MobileNavData {
  name: string;
  url: string;
}

const mobileNavData: MobileNavData[] = [
  { name: "Home", url: "/" },
  { name: "Menu", url: "/menu" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];

const MobileMenu = ({
  mobileNavbarOpen,
  setMobileNavbarOpen,
}: MobileNavbarProps) => {
  return (
    <nav
      className={`fixed flex lg:hidden top-20 left-0 w-full p-10 z-10 h-screen bg-gray-900 text-white bg-opacity-100 transform delay-100 transition-all duration-300 ${
        mobileNavbarOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full"
      }`}
    >
      <ul className="w-full flex flex-col items-center">
        {mobileNavData.map((item: MobileNavData, idx: number) => (
          <li
            key={idx}
            className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal hover:opacity-100 transition-all duration-200 ease-in-out"
          >
            <Link
              href={item.url}
              className="h-full w-full text-lg text-white text-center uppercase transition ease-in-out hover:text-[#d69e2e]"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setMobileNavbarOpen(false);
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <Link
          href="/"
          className="bg-[#ffbe33] py-2 px-8 text-white rounded-full transition ease-in-out duration-300 hover:bg-[#d69e2e]"
        >
          Order Online
        </Link>
      </ul>
    </nav>
  );
};

export default MobileMenu;
