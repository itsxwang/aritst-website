import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchArt } from "../../services/handleArtworks";
import { ArrowLeft, ArrowRight, Share2, Heart, IndianRupee, ChevronUp, ChevronDown, Link as LinkIcon } from 'lucide-react';
import './styles/MainDetails.css'
import { addToFavourites, isFavourite, removeFromFavourites } from "../../services/handleFavourites";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";

// Define the Artwork interface to type the fetchArt return value
type Artwork = Awaited<ReturnType<typeof fetchArt>>;

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
    className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${className}`}
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

function MainDetails({ id }: { id: string }) {
  const [artWork, setArtWork] = useState<Artwork | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [showSharePopup, setShowSharePopup] = useState(false);

  // State and refs for Amazon-style zoom
  const [zoomActive, setZoomActive] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isFavorited, setIsFavorited] = useState(() => isFavourite(id));

  // State for swipe functionality
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // State for copied notification
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    fetchArt(id).then(artWork => setArtWork(artWork!));
  }, [id]);

  // Calculations for the zoom pane
  const zoomLevel = 2;
  const backgroundPositionX = -lensPosition.x * zoomLevel;
  const backgroundPositionY = -lensPosition.y * zoomLevel;

  // Event handlers for the zoom feature
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) { // Only activate zoom on larger screens
      setZoomActive(true);
    }
  };

  const handleMouseLeave = () => {
    setZoomActive(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !zoomActive) return;

    const imageRect = imageContainerRef.current.getBoundingClientRect();
    const imageWidth = imageRect.width;
    const imageHeight = imageRect.height;

    // Lens size (1/zoomLevel of the image)
    const lensWidth = imageWidth / zoomLevel;
    const lensHeight = imageHeight / zoomLevel;

    // Calculate mouse position relative to the image container
    const mouseX = e.clientX - imageRect.left;
    const mouseY = e.clientY - imageRect.top;

    // Center the lens on the mouse
    let x = mouseX - lensWidth / 2;
    let y = mouseY - lensHeight / 2;

    // Clamp the lens position so it doesn't go off the image
    x = Math.max(0, Math.min(x, imageWidth - lensWidth));
    y = Math.max(0, Math.min(y, imageHeight - lensHeight));

    setLensPosition({ x, y });
  };

  function handleDecreaseQuantity() {
    setCartQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncreaseQuantity() {
    if (!artWork) return;
    setCartQuantity((prev) => Math.min(artWork.stock_quantity, prev + 1));
  }

  // Swipe event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) handleNextImage();
      else handlePrevImage();
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
  }, [allImages.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

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

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const handleShareOption = (platform: string) => {
    if (!artWork) return;
    const shareUrl = window.location.href;
    const shareText = `Check out this beautiful artwork: ${artWork.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
        break;
    }
    setShowSharePopup(false);
  };

  const handleClosePopup = () => {
    setShowSharePopup(false);
  };

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

  const isSold = artWork.availability === 'Sold' || artWork.stock_quantity === 0;
  const isReserved = artWork.availability === 'Reserved';
  const isAvailable = !isSold && !isReserved;

  const showQuantitySelector =   artWork.stock_quantity > 1;

  const ctaButton = isAvailable ? (
    <Link
      to={`/cart/${id}?quantity=${cartQuantity}`}
      className="block w-full"
    >
      <Button className="font-[inter] bg-[#625a50] hover:bg-[#45403b] transition-colors duration-200 w-full py-3 text-lg font-medium text-black dark:text-white dark:bg-[#817565] dark:hover:bg-[#625a50]">
        Add To Cart
      </Button>
    </Link>
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
                src={`/${allImages[currentImageIndex]}`}
                alt={`${artWork.title} - view ${currentImageIndex + 1}`}
                // ✅ FIX 1: Removed 'object-cover' to ensure 
                // image stretches, matching the zoom pane's logic.
                className="w-full h-full"
              />
              <div
                style={{
                  display: zoomActive ? 'block' : 'none',
                  left: `${lensPosition.x}px`,
                  top: `${lensPosition.y}px`,
                }}
                className="absolute w-1/2 h-1/2 border-2 border-white bg-white/30 pointer-events-none"
              />
              {allImages.length > 1 && (
                <>
                  <Button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 md:opacity-100 md:hover:opacity-80">
                    <ArrowLeft className="h-6 w-6" />
                  </Button>
                  <Button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 md:opacity-100 md:hover:opacity-80">
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
            <div
              style={{
                display: zoomActive ? 'block' : 'none',
                backgroundImage: `url(/${allImages[currentImageIndex]})`,
                backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
                // ✅ FIX 2: Explicitly set width AND height to 200%
                // to match the main image's stretch.
                backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
              }}
              className="absolute top-[102%] left-0 lg:top-0 lg:left-[102%] w-full h-full border-2 rounded-lg shadow-xl hidden lg:block bg-no-repeat z-10 pointer-events-none"
            ></div>
            {allImages.length > 1 && (
              <div className="flex space-x-2 p-2 mt-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${currentImageIndex === index ? 'bg-gray-900 dark:bg-white scale-125' : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-300'}`}
                    aria-label={`View image ${index + 1}`}
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
              <div className={
                showQuantitySelector
                  ? "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative"
                  : "flex flex-row items-center justify-between relative"
              }>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                      <IndianRupee className="inline h-7 w-7" />
                      {artWork.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  {showQuantitySelector && (
                    <div className="flex items-center gap-x-2">
                      <p className="text-2xl text-gray-500 dark:text-gray-400">×</p>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={handleIncreaseQuantity}
                          disabled={cartQuantity >= artWork.stock_quantity}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                          <ChevronUp className="inline h-5 w-5" />
                        </button>
                        <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                          {cartQuantity}
                        </span>
                        <button
                          onClick={handleDecreaseQuantity}
                          disabled={cartQuantity <= 1}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                          <ChevronDown className="inline h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative flex space-x-2 self-start sm:self-center">
                  <div className="relative">
                    <Button onClick={handleShare} className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </Button>
                    {showSharePopup && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.1,
                        }}
                        className="cus-share-popup absolute bottom-12 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 md:right-0 md:left-auto md:translate-x-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-5 w-80 max-w-[90vw] z-50 transition-all duration-200 ease-in-out">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Share Artwork</h4>
                          <button onClick={handleClosePopup} className="text-gray-500 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-bold">
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            onClick={() => handleShareOption('whatsapp')}
                            className="flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20BA56] py-3 rounded-lg font-medium text-sm"
                          >
                            <FaWhatsapp className="h-5 w-5" />
                            WhatsApp
                          </Button>
                          <Button
                            onClick={() => handleShareOption('x')}
                            className="flex items-center justify-center gap-2 bg-[#000000] text-white hover:bg-[#333333] py-3 rounded-lg font-medium text-sm"
                          >
                            <FaXTwitter className="h-5 w-5" />

                          </Button>
                          <Button
                            onClick={() => handleShareOption('copy')}
                            className="flex justify-center col-span-2 gap-2 bg-gray-600 text-white hover:bg-gray-700 py-3 rounded-lg font-medium text-sm"
                          >
                            <LinkIcon className="h-5 w-5" />
                            Copy Link
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <Button
                    className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      if (isFavorited) {
                        removeFromFavourites(id);
                      } else {
                        addToFavourites(id);
                      }
                      setIsFavorited(!isFavorited);
                    }}
                  >
                    <Heart className={`h-5 w-5 transition-all duration-200 ${isFavorited ? 'text-red-500 fill-red-500 scale-110 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]' : 'text-gray-700 dark:text-gray-300 fill-transparent'}`} />
                  </Button>
                </div>
                {showCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    className="absolute top-full mt-2 right-0 bg-[#e0dcd1] dark:bg-gray-700/50 text-black dark:text-gray-100 px-4 py-2 rounded-lg shadow-lg font-[inter] font-medium text-sm z-50"
                  >
                    Link copied successfully!
                  </motion.div>
                )}
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
                  <span className="font-medium text-gray-800 dark:text-gray-200">{artWork.framed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{artWork.created_at}</span>
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