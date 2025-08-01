import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import "./styles/SearchModal.css";
import { fetchAllArtoworks } from "../../utilities/fetchArtoworks";

type artworksType = ReturnType<typeof fetchAllArtoworks>;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [artworks, setArtworks] = useState<artworksType>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const artworks = fetchAllArtoworks();
    setArtworks(artworks);
  }, []);

  // ✅ Close modal on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ✅ Filtered search results
  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    return artworks.filter(
      (artwork) =>
        artwork.title
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchTerm.toLowerCase().split(" ").join("")) ||
        artwork.description
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchTerm.toLowerCase().split(" ").join("")) ||
        artwork.medium
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchTerm.toLowerCase().split(" ").join(""))
    );
  }, [searchTerm, artworks]);

  // ✅ Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || filteredResults.length === 0) return;

      if (e.key === "ArrowDown") {
        setHighlightedIndex((prev) =>
          prev === filteredResults.length - 1 ? 0 : prev + 1
        );
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prev) =>
          prev <= 0 ? filteredResults.length - 1 : prev - 1
        );
        e.preventDefault();
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        window.location.href = `/art/${filteredResults[highlightedIndex].id}`;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredResults, highlightedIndex, isOpen]);

  // ✅ Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* ✅ Modal Box */}
      <div
        className="px-10 py-11 rounded-2xl shadow-lg w-[92%] sm:w-[550px] md:w-[687px] relative transition-colors duration-300 bg-white text-black dark:bg-[#1f2937] dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-11 right-9 p-1.5 rounded-md transition cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X size={20} />
        </button>

        {/* ✅ Title */}
        <h2 className="cus-input-heading text-3xl font-semibold mb-5 font-[playfair]">
          Search Artwork
        </h2>

        {/* ✅ Search Input */}
        <div className="relative">
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
            className="lucide lucide-search absolute left-3 top-3 h-4 w-4 text-gray-900 dark:text-[rgb(245,245,220)]"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>

          <input
            autoFocus
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setHighlightedIndex(-1);
            }}
            value={searchTerm}
            type="text"
            placeholder={
              window.innerWidth < 487
                ? "Search artworks..."
                : "Search artworks by name, medium, or description..."
            }
            className="cus-main-input flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm pl-10 placeholder:text-muted-foreground focus:outline-none bg-gray-100 border-gray-300 text-black focus:ring-2 focus:ring-gray-900 ring-offset-0 dark:bg-gray-700 dark:border-gray-600 dark:text-[rgb(245,245,220)] dark:focus:ring-1 dark:focus:ring-gray-400 dark:ring-offset-1"
          />
        </div>

        {/* ✅ Search Results Section */}
        {searchTerm && (
          <div
            ref={resultsRef}
            className={`flex flex-col gap-2 mt-4 pt-4 border-gray-200 dark:border-gray-600 
            max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent ${
              filteredResults.length === 0 && "border-t" }`}
          >
            {filteredResults.length > 0 ? (
              filteredResults.map((artwork, index) => (
                <a
                  key={artwork.id}
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[index] = el;
                    }
                  }}
                  onClick={() => (window.location.href = `/art/${artwork.id}`)}
                  className={`rounded-lg p-3 cursor-pointer flex items-center gap-3 
                    ${
                      highlightedIndex === index
                        ? "bg-[#e0dcd1] dark:bg-gray-700"
                        : "hover:bg-[#e0dcd1] dark:hover:bg-gray-700"
                    } transition-colors`}
                >
                  <img
                    src={artwork.mainImage}
                    alt={artwork.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{artwork.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {artwork.medium} • {artwork.size}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 italic py-4">
                No artworks found for "{searchTerm}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
