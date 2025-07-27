import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
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
      <div className="bg-[#1f2937] text-white p-6 rounded-xl shadow-lg w-[90%] sm:w-[500px] relative">
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* ✅ Title */}
        <h2 className="text-lg font-semibold mb-3 font-[playfair]">Search Artwork</h2>

        {/* ✅ Search Input */}
        <input
          type="text"
          placeholder="Search artworks by name, medium, or description..."
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500  placeholder:font-[Inter] "
        />
      </div>
    </div>,
    document.body // ✅ React Portal target
  );
};

export default SearchModal;
