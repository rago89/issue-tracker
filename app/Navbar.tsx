import Link from "next/link";
import React from "react";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <IoBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              href={href}
              className="text-zinc-500 hover:text-zinc-800 transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
