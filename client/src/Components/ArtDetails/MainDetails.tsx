import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchArt } from "../../utilities/fetchArtoworks";
import { ArrowLeft, ArrowRight, Share2, Heart, IndianRupee } from 'lucide-react';
import './styles/MainDetails.css'
import { addToFavourites, isFavourite, removeFromFavourites } from "../../utilities/handleFavourites";

// Define the Artwork interface to type the fetchArt return value
type Artwork = ReturnType<typeof fetchArt>;

// Type for toast function parameters
interface ToastParams {
  title: string;
  description?: string;
}

// Placeholder toast function
const toast = ({ title, description }: ToastParams) => {
  console.log(`Toast: ${title} - ${description}`);
  alert(`${title}\n${description}`);
};

// Define props for Button component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

// Simplified Button component
const Button = ({ children, onClick, disabled = false, className = '' }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md transition-colors ${className}`}
  >
    {children}
  </button>
);

// Define props for Badge component
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

// Simplified Badge component
const Badge = ({ children, className = '' }: BadgeProps) => (
  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${className}`}>
    {children}
  </span>
);

function MainDetails({ id }: { id: number }) {
  const [artWork, setArtWork] = useState<Artwork | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State and refs for Amazon-style zoom
  const [zoomActive, setZoomActive] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isFavorited, setIsFavorited] = useState(() => isFavourite(id));


  // State for swipe functionality
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    setArtWork(fetchArt(id));
  }, [id]);

  // Calculations for the zoom pane
  const zoomLevel = 2; // FIX: Set to 2 to match the lens size (w-1/2 => 1/0.5 = 2)
  const backgroundPositionX = -lensPosition.x * zoomLevel;
  const backgroundPositionY = -lensPosition.y * zoomLevel;

  // Event handlers for the zoom feature
  const handleMouseEnter = () => {
    setZoomActive(true);
  };

  const handleMouseLeave = () => {
    setZoomActive(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const imageRect = imageContainerRef.current.getBoundingClientRect();
    const lensWidth = imageRect.width / 2; // Lens is 50% of container width
    const lensHeight = imageRect.height / 2; // Lens is 50% of container height

    // Calculate cursor position relative to the image container
    let x = e.clientX - imageRect.left;
    let y = e.clientY - imageRect.top;

    // Center the lens on the cursor
    x = x - (lensWidth / 2);
    y = y - (lensHeight / 2);

    // Clamp lens position to stay within the image bounds
    const maxX = imageRect.width - lensWidth;
    const maxY = imageRect.height - lensHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    setLensPosition({ x, y });
  };

  // Swipe event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      const swipeThreshold = 50; // Minimum distance for a swipe

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - go to next image
          handleNextImage();
        } else {
          // Swipe right - go to previous image
          handlePrevImage();
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const allImages = useMemo(() => {
    if (!artWork) return [];
    return [artWork.mainImage, ...artWork.images];
  }, [artWork]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  }, [allImages]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  }, [allImages]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') handleNextImage();
      else if (event.key === 'ArrowLeft') handlePrevImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleNextImage, handlePrevImage]);

  if (!artWork) {
    return (
      <div className="flex-grow flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Artwork Not Found
          </h1>
          <Button className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300">
            <Link to="/gallery" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artWork.title,
        text: `Check out this beautiful artwork: ${artWork.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied", description: "Artwork link copied to clipboard." });
    }
  };

  const handleAddToCart = () => {
    toast({ title: "Added to Cart!", description: `${artWork.title} has been added to your cart.` });
    console.log(`Added ${artWork.id} to cart.`);
  };

  const isSold = artWork.availability === 'Sold' || artWork.stock_quantity === 0;
  const isReserved = artWork.availability === 'Reserved';
  const isAvailable = !isSold && !isReserved;

  const ctaButton = isAvailable ? (
    <Button onClick={handleAddToCart} className="cursor-pointer font-[inter] bg-[#625a50] hover:bg-[#45403b] transition-colors duration-200 w-full py-3 text-lg font-medium text-black dark:text-white dark:bg-[#817565] dark:hover:bg-[#625a50]">
      Add To Cart
    </Button>
  ) : (
    <Button disabled className="w-full py-3 text-lg font-semibold bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed">
      {isSold ? 'Out of Stock' : 'Reserved'}
    </Button>
  );

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/gallery" className="hover:bg-gray-200 px-4 py-2 rounded-sm dark:hover:bg-gray-800 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative flex flex-col items-center">
            <div
              ref={imageContainerRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative group aspect-square rounded-lg shadow-lg overflow-hidden w-full cursor-crosshair"
            >
              <img
                key={allImages[currentImageIndex]}
                src={allImages[currentImageIndex]}
                alt={`${artWork.title} - view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div
                style={{
                  display: zoomActive && window.innerWidth > 768 ? 'block' : 'none',
                  left: `${lensPosition.x}px`,
                  top: `${lensPosition.y}px`,
                }}
                className="absolute w-1/2 h-1/2 border-2 border-white bg-white/30 pointer-events-none"
              />
              {allImages.length > 1 && (
                <>
                  <Button onClick={handlePrevImage} className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100">
                    <ArrowLeft className="h-6 w-6" />
                  </Button>
                  <Button onClick={handleNextImage} className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100">
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
            <div
              style={{
                display: zoomActive && window.innerWidth > 768 ? 'block' : 'none',
                backgroundImage: `url(${allImages[currentImageIndex]})`,
                backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
                backgroundSize: `${zoomLevel * 100}%`,
              }}
              className={`absolute ${window.innerWidth > 1024 ? "top-0 left-[102%]" : "top-[102%] left-0 "} w-full h-full border-2 rounded-lg shadow-xl hidden lg:block bg-no-repeat z-10 pointer-events-none`}
            ></div>
            {allImages.length > 1 && (
              <div className="flex space-x-2 p-2 mt-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${currentImageIndex === index ? 'bg-gray-900 dark:bg-white scale-125' : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {artWork.types.map((type) => (
                  <Badge key={type} className="dark:text-white bg-[#e0dcd1] dark:bg-gray-700/50 text-black px-2.5 py-1 rounded-full">
                    {type}
                  </Badge>
                ))}
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {artWork.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {artWork.medium} • {artWork.dimensions}
              </p>
            </div>
            {artWork.description && (
              <div>
                <h3 className="font-[inter] font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  About This Piece
                </h3>
                <p className="font-[inter] font-extralight text-gray-700 dark:text-gray-300 leading-relaxed">
                  {artWork.description}
                </p>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <IndianRupee className="inline h-7 w-7" />
                    {artWork.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleShare} className="cursor-pointer border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Button>

                  <Button
                    className="cursor-pointer border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      if (isFavorited) {
                        removeFromFavourites(id);
                      } else {
                        addToFavourites(id);
                      }
                      setIsFavorited(!isFavorited);
                    }}             >
                    <Heart className={`h-5 w-5 transition-all duration-200 ${isFavorited ? 'text-red-500 fill-red-500 scale-110 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]' : 'text-gray-700 dark:text-gray-300 fill-transparent'}`} />
                  </Button>
                </div>
              </div>
              {ctaButton}
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Artwork Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Medium:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{artWork.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{artWork.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Framed:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{artWork.framed ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{new Date(artWork.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                  <span className={`font-bold ${isAvailable ? 'text-green-600 dark:text-green-400' : isReserved ? 'text-orange-500 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>
                    {artWork.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainDetails;