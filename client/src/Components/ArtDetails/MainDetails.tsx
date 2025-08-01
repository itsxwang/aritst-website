import { useState,useRef, useEffect,useCallback,useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchArt } from "../../utilities/fetchArtoworks";
import { ArrowLeft, ArrowRight, Share2, Heart, IndianRupee } from 'lucide-react';

// Define the Artwork interface to type the fetchArt return value




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
  const artWork = fetchArt(id); // Fetch the artwork data
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = useMemo(() => [artWork!.mainImage, ...artWork!.images]  , [artWork]);


    const handleNextImage = useCallback(() => {
  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
}, [allImages, setCurrentImageIndex]);

const handlePrevImage = useCallback(() => {
  setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
}, [allImages, setCurrentImageIndex]);

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      handleNextImage();
    } else if (event.key === 'ArrowLeft') {
      handlePrevImage();
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [handleNextImage, handlePrevImage]);
  
  // If artwork is not found, display a message
  if (!artWork) {
    return (
      <div className="flex-grow flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Artwork Not Found
          </h1>
          <Button
            className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300"
          >
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
      toast({
        title: "Link Copied",
        description: "Artwork link copied to clipboard.",
      });
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart!",
      description: `${artWork.title} has been added to your cart.`,
    });
    console.log(`Added ${artWork.id} to cart.`);
  };

  const isSold = artWork.availability === 'Sold' || artWork.stock_quantity === 0;
  const isReserved = artWork.availability === 'Reserved';
  const isAvailable = !isSold && !isReserved;

  const ctaButton = isAvailable ? (
    <Button
      onClick={handleAddToCart}
      className="cursor-pointer font-[inter] bg-[#625a50] hover:bg-[#45403b] transition-colors duration-200  w-full py-3 text-lg font-medium text-black  dark:text-white dark:bg-[#817565]  dark:hover:bg-[#625a50]"
    >
      Add To Cart
    </Button>
  ) : (
    <Button
      disabled
      className="w-full py-3 text-lg font-semibold bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
    >
      {isSold ? 'Out of Stock' : 'Reserved'}
    </Button>
  );


  return (
    <section ref={carouselRef} className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/gallery"
            className="hover:bg-gray-200 px-4 py-2 rounded-sm dark:hover:bg-gray-800    inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Carousel */}
          <div  className="relative group aspect-square rounded-lg shadow-lg overflow-hidden">

            
            <img
              key={allImages[currentImageIndex]} // Use image URL as key for better uniqueness
              src={allImages[currentImageIndex]}
              alt={`${artWork.title} - view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover animate-fade-in"
            />
            {allImages.length > 1 && (
              <>
                <Button
                  onClick={handlePrevImage}
                  className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={handleNextImage}
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100"
                >
                  <ArrowRight className="h-6 w-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {allImages.map((image, index) => (
                    <div
                      key={image} // Use image URL as key for uniqueness
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Artwork Details */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {artWork.types.map((type) => (
                  <Badge
                    key={type}
                    className=" dark:text-white bg-[#e0dcd1]  dark:bg-gray-700/50 text-black px-2.5 py-1 rounded-full"
                  >
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
                    <IndianRupee className="inline h-7 w-7 " />
                    {artWork.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleShare}
                    className="cursor-pointer border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Button>
                  <Button
                    className="cursor-pointer border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
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
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {artWork.framed ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {new Date(artWork.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                  <span
                    className={`font-bold ${
                      isAvailable
                        ? 'text-green-600 dark:text-green-400'
                        : isReserved
                        ? 'text-orange-500 dark:text-orange-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
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