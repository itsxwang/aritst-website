import React from "react";
import { motion } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp"; // ✅ import utility hook

const MainAbout: React.FC = () => {
  const artworksCount = useCountUp(150, 2000); // counts to 150 in 2s
  const exhibitionsCount = useCountUp(25, 2000); // counts to 25 in 2s

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-20 dark:text-white text-black dark:bg-transparent bg-white transition-colors duration-200">
      
      {/* Left - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:h-[500px] flex justify-center mb-8 md:mb-0 self-center"
      >
        <img
          src="channel_profile.jpg"
          alt="Channel Profile"
          className="min-w-[250px] min-h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] object-cover rounded-full shadow-lg"
        />
      </motion.div>

      {/* Right - Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start max-w-[650px]"
      >
        <h2 className="font-bold mb-6 font-[playfair] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
          About Samridhi
        </h2>

        <p className="leading-relaxed mb-4 px-2 text-[1.1rem] sm:px-0">
          <strong>“Magic Colours of Samridhi”</strong> is a contemporary artist whose work explores the intersection of emotion and color. With over 15 years of experience, her paintings capture the essence of human experience through abstract forms and vibrant landscapes.
        </p>

        <p className="leading-relaxed text-[1.1rem] mb-4 px-2 sm:px-0">
          Born and raised in the Pacific Northwest, Samridhi draws inspiration from nature's ever-changing moods and the urban energy of city life. Her work has been featured in galleries across the country and is held in private collections worldwide.
        </p>

        <p className="italic leading-relaxed text-[1.1rem] mb-6 px-2 sm:px-0">
          "Art is the language of the soul. Through my paintings, I strive to create a dialogue between the viewer and their inner world, revealing beauty in both chaos and serenity."
        </p>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 justify-center md:justify-start w-full">
          <div className="flex-1 bg-[#e0dcd1] dark:bg-[#2a3042] px-6 py-4 rounded-md shadow-md text-center cursor-pointer transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold font-playfair  italic sm:text-3xl">{artworksCount}+</h3>
            <p className="dark:text-gray-300 text-black font-[Inter] text-sm sm:text-base">
              Artworks Created
            </p>
          </div>
          <div className="flex-1 bg-[#e0dcd1] dark:bg-[#2a3042] px-6 py-4 rounded-md shadow-md text-center cursor-pointer transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold font-playfair  sm:text-3xl">{exhibitionsCount}</h3>
            <p className="dark:text-gray-300 text-black font-[Inter] text-sm sm:text-base">
              Gallery Exhibitions
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainAbout;
