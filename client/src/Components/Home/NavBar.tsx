import React, { useContext, useState } from "react";
import ThemeContext from "../../globalContexts/themeContext";
import { Search, Sun, Moon, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`flex items-center font-[sans-serif] justify-between px-6 md:px-8 py-4 border-b transition-colors duration-300 ${theme === "dark"
          ? "bg-[#131528] border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
        }`}
    >
      {/* ✅ Brand */}
      <a
        className="text-xl font-[Times-New-Roman] font-bold text-[24px] cursor-pointer"
        href="/"
      >
        Samridhi Studio
      </a>

      {/* ✅ Desktop Nav Links */}
      <div className="hidden md:flex gap-8">
        {["Home", "Gallery", "About", "Contact"].map((link) => (
          <a
            key={link}
            href={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
            className="relative font-[inter] group px-2 font-medium"
          >
            {link}
            <span className="absolute left-0 -bottom-[5px] w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* ✅ Right-side Icons */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <button
          className={`p-2.5 rounded-md hover:bg-gray-700/30 ${theme === "dark" && "bg-gray-800"
            } cursor-pointer`}
        >
          <Search size={18} />
        </button>

        {/* Dark/Light Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`p-2.5 rounded-md hover:bg-gray-700/30 ${theme === "dark" && "bg-gray-800"
            } cursor-pointer`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* ✅ Hamburger Icon (mobile) */}
        <button
          className={`md:hidden p-2.5 rounded-md cursor-pointer ${ theme === "dark" && 'hover:bg-gray-700/30 bg-gray-800 }'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ✅ Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 lg:w-1/3 transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"
          } ${theme === "dark" ? "bg-[#131528] text-white" : "bg-white text-gray-900"}`}
      >
        {/* Close Button inside menu (extra safety) */}
        <div className="flex justify-end p-4">
          <button className={`p-2.5 rounded-md hover:bg-gray-700/30`} onClick={() => setMenuOpen(false)}>
            <X size={24} className="cursor-pointer" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col items-start gap-6 px-8 mt-4">
          {["Home", "Gallery", "About", "Contact"].map((link) => (
          <a
            key={link}
            href={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
            className="relative font-[inter] group px-2 font-medium"
          >
            {link}
            <span className="absolute left-0 -bottom-[5px] w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
        </div>
      </div>

      {/* ✅ background overlay behind menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
