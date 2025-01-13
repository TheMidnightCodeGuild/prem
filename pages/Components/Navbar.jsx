import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const Path = (props) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );

  return (
    <nav
      className={`bg-[#B4B4DC] text-black fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link
          href="/"
          className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
          <div className="relative w-12 h-12 sm:w-12 sm:h-12 md:w-20 md:h-20">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* <span className="hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap">
            Hotel Prem Chaya Inn
          </span> */}
        </Link>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100/20 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}>
          <span className="sr-only">Toggle menu</span>
          <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
              animate={isMenuOpen ? "open" : "closed"}
            />
            <Path
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
              animate={isMenuOpen ? "open" : "closed"}
            />
            <Path
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
              animate={isMenuOpen ? "open" : "closed"}
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto transition-all duration-300`}
          id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:mt-0 md:flex-row md:space-x-4 rtl:space-x-reverse">
            <li className="my-2 md:my-0">
              <Link
                href="/#about"
                onClick={closeMenu}
                className="block py-2 px-3 text-sm sm:text-base rounded hover:bg-gray-100/20 transition-all duration-300">
                About
              </Link>
            </li>
            <li className="my-2 md:my-0">
              <Link
                href="/#gallery"
                onClick={closeMenu}
                className="block py-2 px-3 text-sm sm:text-base rounded hover:bg-gray-100/20 transition-all duration-300">
                Gallery
              </Link>
            </li>
            <li className="my-2 md:my-0">
              <Link
                href="/#destinations"
                onClick={closeMenu}
                className="block py-2 px-3 text-sm sm:text-base rounded hover:bg-gray-100/20 transition-all duration-300">
                Destinations
              </Link>
            </li>
            <li className="my-2 md:my-0">
              <Link
                href="/#testimonials"
                onClick={closeMenu}
                className="block py-2 px-3 text-sm sm:text-base rounded hover:bg-gray-100/20 transition-all duration-300">
                Testimonials
              </Link>
            </li>
              <li className="my-2 md:my-0">
              <Link
                href="/Blogs"
                onClick={closeMenu}
                className="block py-2 px-3 text-sm sm:text-base rounded hover:bg-gray-100/20 transition-all duration-300">
                Blogs
              </Link>
            </li>
              <li className="my-2 md:my-0">
              <Link
                href="/#contact"
                onClick={closeMenu}
                className="block py-2 px-3 text-sm sm:text-base rounded bg-gray-100 hover:bg-gray-200 transition-all duration-300">
                Enquire Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
