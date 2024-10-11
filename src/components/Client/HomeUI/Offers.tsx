"use client";
import Image from "next/image";
import Link from "next/link";
import { useInView, useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

const Offers = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const CreateSpring = (delay: number) => {
    /*  const [ref, inView] = useInView({
      once: true,
      threshold: 0.1,
    }); */

    const [ref, inView] = useInView();

    const SpringProps = useSpring({
      transform: inView ? "scale(1)" : "scale(0)",
      opacity: inView ? 1 : 0,
      config: { tension: 100, friction: 22 },
      delay,
    });

    return [ref, SpringProps] as const;
  };

  const [ref1, oneSprings] = CreateSpring(0);
  const [ref2, secondSprings] = CreateSpring(300);
  const [ref3, thirdSprings] = CreateSpring(600);
  const [ref4, fourthSprings] = CreateSpring(900);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="py-16 grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 mx-5 lg:mx-20">
      <animated.div style={oneSprings} ref={ref1}>
        <Link href={"/order"}>
          <Image src={"/offer1.png"} alt="offer-1" width={540} height={268} />
        </Link>
      </animated.div>
      <animated.div style={secondSprings} ref={ref2}>
        <Link href={"/order"}>
          <Image src={"/offer2.png"} alt="offer-2" width={540} height={268} />
        </Link>
      </animated.div>
      <animated.div style={thirdSprings} ref={ref3}>
        <Link href={"/order"}>
          <Image src={"/offer2.png"} alt="offer-3" width={540} height={268} />
        </Link>
      </animated.div>
      <animated.div style={fourthSprings} ref={ref4}>
        <Link href={"/order"}>
          <Image src={"/offer1.png"} alt="offer-4" width={540} height={268} />
        </Link>
      </animated.div>
    </div>
  );
};

export default Offers;
