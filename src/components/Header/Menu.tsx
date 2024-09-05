import Link from "next/link";

interface NavData {
  name: string;
  url: string;
}

const navData: NavData[] = [
  { name: "Home", url: "/" },
  { name: "Menu", url: "/menu" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];
const Menu = () => {
  return (
    <ul className="hidden md:flex items-center gap-8">
      {navData.map((item: NavData, idx: number) => (
        <li
          key={idx}
          className="text-white uppercase cursor-pointer transition ease-in-out hover:text-[#d69e2e] duration-300"
        >
          <Link href={item.url}>{item.name}</Link>
        </li>
      ))}
      
    </ul>
  );
};

export default Menu;
