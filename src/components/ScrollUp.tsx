"use client";
import ScrollToTop from "react-scroll-to-top";
import Image from "next/image";
const ScrollUp = () => {
  return (
    <ScrollToTop
      smooth
      top={500}
      component={
        <Image
          src={"/arrowup.svg"}
          alt="Scroll to top"
          width={40}
          height={40}
        />
      }
    />
  );
};

export default ScrollUp;
