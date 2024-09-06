import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/hero-bg.jpg"
          alt="hero image"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 grid content-center ml-4 md:ml-8 lg:ml-28">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-dancingScript">
              Fast Food Restaurant
            </h1>
            <p className="mb-10 text-sm lg:text-base mx-1">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#ffbe33] py-3 px-10 text-white rounded-full transition duration-300 hover:bg-[#d69e2e] hover:scale-105"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
