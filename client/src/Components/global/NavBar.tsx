import React, { useState, useEffect } from "react";
import { Search, Sun, ShoppingCart, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import SearchModal from "./SearchModal";

import './styles/navbar.css'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      if (
        localStorage.getItem("theme") === "light" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: light)").matches)
      ) {
        return "light";
      }
    }
    return "dark";
  })
  useEffect(() => {
    // theme handle
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      }
    } else {
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      }
      else {
        document.documentElement.classList.remove("dark");
        setTheme("light");
      }
    }

    //  menu handle
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };


    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function changeTheme() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }

  return (
    <>
      {/* ✅ Navbar */}
      <nav
        className={`main-nav flex items-center font-[sans-serif] justify-between px-6 md:px-8 py-4 transition-colors duration-300 backdrop-blur-md z-50 overflow-x-hidden dark:bg-gray-900/90 dark:border-gray-700 dark:text-white
bg-beige-50/90 border-gray-400 text-gray-900 border-b-1`
        }
      >
        {/* ✅ Brand */}
        <Link
          className="artist-name text-xl font-[Times-New-Roman] font-bold text-[24px] cursor-pointer"
          to="/"
        >
          Samridhi Studio
        </Link>

        {/* ✅ Desktop Nav Links */}
        <div className="hidden md:flex gap-8">
          {["Home", "Gallery", "About", "Contact"].map((link) => (
            <Link
              key={link}
              to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
              className="relative font-[inter] group px-2 font-medium"
            >
              {link}
              <span className="absolute left-0 -bottom-[5px] w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* ✅ Right-side Icons */}
        <div className="right-icons flex items-center gap-1.5 sm:gap-3 ">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`p-2.5 rounded-md hover:bg-gray-700/30 
              dark:bg-gray-800 cursor-pointer`}
          >
            <Search size={18} />
          </button>

          {/* Cart Icon*/}
          <Link
            to = "/cart"
            className={`p-2.5 rounded-md hover:bg-gray-700/30 
              dark:bg-gray-800 cursor-pointer`}
          >
            <ShoppingCart size={18} />
          </Link>


          {/* Dark/Light Toggle */}
          <button
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={changeTheme}
            className={`p-2.5 rounded-md hover:bg-gray-700/30 
              dark:bg-gray-800 cursor-pointer `}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
              
          {/* ✅ Hamburger Icon (mobile) */}
          <button
            className={`md:hidden p-2.5 rounded-md cursor-pointer 
              dark:hover:bg-gray-700/30 dark:bg-gray-800  hover:bg-gray-700/30
            }`}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ✅ Sliding Mobile Menu (NOW OUTSIDE NAV) */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 lg:w-1/3 transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }  dark:bg-[#131528] dark:text-white : bg-white text-gray-900}`}
      >
        {/* Close Button inside menu */}
        <div className="flex justify-end p-4">
          <button
            className="p-2.5 rounded-md hover:bg-gray-700/30"
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} className="cursor-pointer" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col items-start gap-6 px-8 mt-4">
          {["Home", "Gallery", "About", "Contact"].map((link) => (
            <Link
              key={link}
              to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
              className="relative font-[inter] group px-2 font-medium"
            >
              {link}
              <span className="absolute left-0 -bottom-[5px] w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ background overlay behind menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
      {/* ✅ SEARCH MODAL */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
