import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchAllArtoworks } from '../../utilities/fetchArtoworks';
type artworksType = ReturnType<typeof fetchAllArtoworks>;

import "./styles/mainSection.css"

const MainSection = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [allArtworks, setAllArtworks] = useState<artworksType>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const artworks = fetchAllArtoworks();
    setAllArtworks(artworks);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const types = useMemo(() => {
    return [...new Set(allArtworks.flatMap((artwork) => artwork.types))];
  }, [allArtworks]);

  const filteredArtworks = useMemo(() => {
    if (selectedTypes.length === 0) return allArtworks;
    return allArtworks.filter((artwork) =>
      selectedTypes.some((type) => artwork.types.includes(type))
    );
  }, [selectedTypes, allArtworks]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold text-gray-900 dark:text-white font-[playfair]">
            Complete Gallery
          </h1>
          <p className="text-lg text-gray-700 dark:text-white mt-2 font-[Inter]">
            Browse through the entire collection of original paintings and limited edition prints
          </p>

          {/* Layout and Filter Controls */}
          <div className="mt-9 flex justify-center space-x-5">
            {/* View buttons - Grid and List */}
            <div className="gridNlist flex p-1 gap-x-0.5 rounded-xl bg-[#e0dcd1] dark:bg-[#374151] transition duration-300">
              {['grid', 'list'].map((view) => (
                <button
                  key={view}
                  onClick={() => setLayout(view as 'grid' | 'list')}
                  className={`cursor-pointer px-4 py-2.5 h-10 ${layout === view ? 'bg-[#625a50]' : 'hover:bg-[#cbc3b4] dark:hover:bg-[#4b5563]'
                    } dark:text-white text-black rounded-lg font-[Inter] inline-flex items-center`}
                >
                  {view === 'grid' ? (
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
                      className="lucide lucide-grid3x3 h-4 w-4 mr-2"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M3 9h18"></path>
                      <path d="M3 15h18"></path>
                      <path d="M9 3v18"></path>
                      <path d="M15 3v18"></path>
                    </svg>
                  ) : (
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
                      className="lucide lucide-list h-4 w-4 mr-2"
                    >
                      <path d="M3 12h.01"></path>
                      <path d="M3 18h.01"></path>
                      <path d="M3 6h.01"></path>
                      <path d="M8 12h13"></path>
                      <path d="M8 18h13"></path>
                      <path d="M8 6h13"></path>
                    </svg>
                  )}
                  <span className="ml-2 capitalize">{view}</span>
                </button>
              ))}
            </div>

            {/* Multi-Select Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button

                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="cursor-pointer flex items-center px-4 py-6 h-10 bg-[#e0dcd1] dark:bg-[#374151] text-black dark:text-white rounded-lg font-[Inter] hover:bg-[#cbc3b4] dark:hover:bg-[#4b5563]"
              >
                <span>{selectedTypes.length === 0 ? 'Select Categories' : `${selectedTypes.length} Selected`}</span>
                <svg
                  className="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto transition-all duration-300 ease-in-out origin-top scale-95 animate-fadeIn">

                  <div className="p-2">
                    <button
                      onClick={() => setSelectedTypes([])}
                      className={`cursor-pointer w-full text-left px-3 py-2 rounded-md font-[Inter] mb-1 ${selectedTypes.length === 0
                          ? 'bg-[#625a50] text-white'
                          : 'text-gray-900 dark:text-white hover:bg-[#cbc3b4] dark:hover:bg-[#4b5563]'
                        }`}
                    >
                      All
                    </button>
                    {types.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`cursor-pointer w-full text-left px-3 py-2 rounded-md font-[Inter] mb-1 ${selectedTypes.includes(type)
                            ? 'bg-[#625a50] text-white'
                            : 'text-gray-900 dark:text-white hover:bg-[#cbc3b4] dark:hover:bg-[#4b5563]'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Artwork Grid */}
        <div
  className={`grid gap-8 transition-all duration-500 ease-in-out ${
    layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
  }`}
>
  {filteredArtworks.map((artwork) => (
    <div
      key={artwork.id}
      className={`cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 ease   ${
        layout === 'list' ? 'flex flex-col space-x-6  hover:scale-105' : 'hover:-translate-y-2 p-0 transform hover:shadow-lg '
      }`}
    >
      {/* Image placeholder */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          layout === 'grid'
            ? 'w-full h-64 bg-gray-300 dark:bg-gray-700 mb-4 rounded-t-lg'
            : 'w-full h-40 bg-gray-300 dark:bg-gray-700 rounded'
        }`}
      ></div>

      {/* Content */}
      <div className={`${layout === 'list'? 'flex-1 mt-3.5' : ''} transition-all duration-300`}>
        <h3 className="p-2 text-xl font-semibold mb-2 flex justify-center text-black dark:text-white transition-colors duration-300">
          {artwork.title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 mb-2 font-[Inter] flex justify-center transition-colors duration-300">
          {artwork.description}
        </p>

        <p className="text-gray-900 dark:text-white font-bold mb-3 font-[Inter] flex justify-center transition-colors duration-300">
          {artwork.price}
        </p>

        {/* Buy Button wrapper */}
        <div className={`${layout === 'grid' ? 'p-7 pb-4 pt-3' : 'pt-3 pb-5'}`}>
          <button
            className={`cursor-pointer transition-all duration-300 ease-in-out bg-[#817565] font-semibold py-2 rounded text-gray-900 dark:text-white hover:bg-[#686055] dark:hover:bg-[#625a50]
            ${layout === 'grid' ? 'w-full' : 'w-auto px-6 mx-auto block '}`}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default MainSection;