import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full px-8 md:px-24 mx-auto bg-[#222831] py-10 mt-16">
      <div className="relative text-center mb-12 footer-logo-area pt-5">
        <Link href={"/"}>
          <Image
            src={"/logo-2.png"}
            alt="logo"
            width={135}
            height={82}
            className="mx-auto"
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-8 text-white text-center">
        <div>
          <h3 className="font-bold text-3xl mb-5 font-dancingScript">
            Address
          </h3>
          <p>123 Street, New York, USA</p>
        </div>
        <div>
          <h3 className="font-bold text-3xl mb-5 font-dancingScript">
            Book A Table
          </h3>
          <Link href="tel:+91-9876543210" className="text-[#ffe119]">
            (91) 9876543210
          </Link>
        </div>
        <div>
          <h3 className="font-bold text-3xl mb-5 font-dancingScript">
            Opening Hours
          </h3>
          <p>
            Monday &ndash; Friday
            <br />
            11.00 AM &ndash; 11.00 PM
          </p>
        </div>
      </div>
      <div className="border-t border-[#e5bcbc] my-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-7">
        <div className="text-white">
          <div className="text-[#e5bcbc]">
            <div className="mb-5">
              <ul className="flex flex-wrap gap-5">
                <li className="transition ease-in-out hover:text-[#d69e2e] duration-300">
                  <Link href={"/"}>Home</Link>
                </li>
                <li className="transition ease-in-out hover:text-[#d69e2e] duration-300">
                  <Link href={"/menu"}>Menu</Link>
                </li>
                <li className="transition ease-in-out hover:text-[#d69e2e] duration-300">
                  <Link href={"/about"}>About</Link>
                </li>
                <li className="transition ease-in-out hover:text-[#d69e2e] duration-300">
                  <Link href={"/contact"}>Contact</Link>
                </li>
                <li className="transition ease-in-out hover:text-[#d69e2e] duration-300">
                  <Link href={"/order"}>Order Online</Link>
                </li>
              </ul>
            </div>
            © 2024, Fast Food. All rights reserved
          </div>
        </div>
        <div>
          <ul className="flex md:justify-end gap-2 md:gap-5">
            <li className="bg-[#3b5998] p-3 rounded-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-facebook text-white"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </li>
            <li className="bg-[#55acee] p-3 rounded-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-twitter text-white"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </li>
            <li className="bg-[#3f729b] p-3 rounded-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-instagram text-white"
              >
                <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </li>
            <li className="bg-[#cd201f] p-3 rounded-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-youtube text-white"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
