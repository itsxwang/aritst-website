import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import ThemeContext from "../../contexts/themeContext";
import './SearchModal.css'

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);

  // ✅ Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* ✅ Modal Box */}
      <div
        className={`px-10 py-11 rounded-2xl shadow-lg w-[92%] sm:w-[550px] md:w-[687px] relative transition-colors duration-300
          ${theme === "dark" ? "bg-[#1f2937] text-white" : "bg-white text-black"}
        `}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-11 right-9 p-1.5 rounded-md transition cursor-pointer 
            ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
        >
          <X size={20} />
        </button>

        {/* ✅ Title */}
        <h2 className="cus-input-heading text-3xl font-semibold mb-5 font-[playfair]">Search Artwork</h2>

        {/* ✅ Search Input Wrapper */}
        <div className="relative">
          {/* ✅ Search Icon (Left) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-search absolute left-3 top-3 h-4 w-4 
              ${theme === "dark" ? "text-beige-400" : "text-gray-900"}`}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>

          {/* ✅ Input Field */}
          <input
            autoFocus
            type="text"
            placeholder= {window.innerWidth < 487 ? "Search artworks..." : "Search artworks by name, medium, or description..."}
            className={`cus-main-input flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm pl-10
              placeholder:text-muted-foreground focus:outline-none 
              ${theme === "dark" 
                ? "bg-gray-700 border-gray-600 text-beige-200 focus:ring-1 focus:ring-gray-400 ring-offset-1"  
                : "bg-gray-100 border-gray-300 text-black focus:ring-2 focus:ring-gray-900 ring-offset-0"}`}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
