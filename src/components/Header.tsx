"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
}

const NavLink = ({ href, children, currentPath }: NavLinkProps) => {
  const isActive = href === "/" 
  ? currentPath === "/" 
  : currentPath.startsWith(href);
  const activeClasses = isActive
    ? "before:w-full before:left-0 hover:text-red-500 text-red-500"
    : "hover:text-red-500 hover:before:w-full hover:before:left-0";

  return (
    <Link
      href={href}
      className="px-4 py-2 text-white transition duration-300 font-semibold tracking-wide group"
    >
      <span
        className={`
          relative inline-block transition-colors duration-300
          before:absolute before:bottom-[-2px] before:left-0 before:w-0 
          before:h-[2px] before:bg-red-500 before:transition-all before:duration-300
          ${activeClasses}
        `}
      >
        {children}
      </span>
    </Link>
  );
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (show !== isScrolled) setIsScrolled(show);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [isScrolled]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 shadow-lg py-4"
          : "bg-gradient-to-b from-black/60 to-transparent py-6"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8">
        
        <Link
          href="/"
          className="inline-flex items-center hover:no-underline"
        >
          <img
            src="/tmovie.png"
            alt="Logo"
            className="mr-4 w-8 md:w-12"
          />
          <span
            className="
              text-white font-semibold text-2xl md:text-4xl
              transition-colors duration-300 
              hover:text-red-500 hover:!text-red-500
            "
          >
            theMovies
          </span>
        </Link>

        <nav className="flex items-center text-2xl">
          <NavLink href="/" currentPath={currentPath}>Home</NavLink>
          <NavLink href="/movie" currentPath={currentPath}>Movies</NavLink>
          <NavLink href="/tv" currentPath={currentPath}>TV Series</NavLink>
        </nav>
      </div>
    </header>
  );
}