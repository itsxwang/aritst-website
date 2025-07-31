import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import './styles/SearchModal.css'
import { fetchAllArtoworks } from "../../utilities/fetchArtoworks";
type artworksType = ReturnType <typeof fetchAllArtoworks>;


interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}



const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {

  const [artworks, setArtworks] = useState<artworksType>([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const artworks = fetchAllArtoworks();
    setArtworks(artworks);
  },[])

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
        className="px-10 py-11 rounded-2xl shadow-lg w-[92%] sm:w-[550px] md:w-[687px] relative transition-colors duration-300 bg-white text-black dark:bg-[#1f2937] dark:text-white"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-11 right-9 p-1.5 rounded-md transition cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
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
            className="lucide lucide-search absolute left-3 top-3 h-4 w-4 text-gray-900 dark:text-[rgb(245,245,220)]"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>

          {/* ✅ Input Field */}
          <input
            autoFocus
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder={window.innerWidth < 487 ? "Search artworks..." : "Search artworks by name, medium, or shortDsc..."}
            className="cus-main-input flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm pl-10 placeholder:text-muted-foreground focus:outline-none bg-gray-100 border-gray-300 text-black focus:ring-2 focus:ring-gray-900 ring-offset-0 dark:bg-gray-700 dark:border-gray-600 dark:text-[rgb(245,245,220)] dark:focus:ring-1 dark:focus:ring-gray-400 dark:ring-offset-1"
          />
        </div>

        {/* ✅ Search Results */}
          {/* {searchTerm && (
            <div className="flex flex-col gap-2">
              {artworks
                .filter((artwork) =>
                  artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  artwork.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  artwork.shortDsc.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((artwork) => (
                  <div
                    key={artwork.id}
                    className="mt-5 flex items-center gap-3 text-black dark:text-white"
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{artwork.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {artwork.shortDsc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )} */}
      </div>
      
    </div>,
    document.body
  );
};

export default SearchModal;