"use client";
import Image from "next/image";
import Link from "next/link";

const Offers = () => {
  return (
    <div className="py-16 grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 mx-5 lg:mx-20">
      <Link href={"/order"}>
        <Image src={"/offer1.png"} alt="offer-1" width={540} height={268} />
      </Link>
      <Link href={"/order"}>
        <Image src={"/offer2.png"} alt="offer-2" width={540} height={268} />
      </Link>
      <Link href={"/order"}>
        <Image src={"/offer2.png"} alt="offer-3" width={540} height={268} />
      </Link>
      <Link href={"/order"}>
        <Image src={"/offer1.png"} alt="offer-4" width={540} height={268} />
      </Link>
    </div>
  );
};

export default Offers;
