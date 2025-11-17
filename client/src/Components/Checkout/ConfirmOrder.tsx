import Navbar from "../global/NavBar";
import Footer from "../global/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function ConfirmOrder() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <div id="homeNavParent" className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content fills remaining space */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-950"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-center"
        >
            <p className="text-5xl md:text-6xl font-bold mb-6 text-black dark:text-white font-playfair flex items-center justify-center gap-2">🎉</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black dark:text-white font-playfair flex items-center justify-center gap-2">
            Order Confirmed ! 
            </h1>
          
          
          <p className="text-lg md:text-xl text-black dark:text-gray-100 mb-2.5">
            Your order has been confirmed! Check your email for the details. 
          </p>
          
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8">
             We are excited to prepare this for you !
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              to="/gallery"
              className="inline-block px-8 py-3 rounded-lg font-medium bg-[#817565] hover:bg-[#625a50] dark:bg-[#817565] dark:hover:bg-[#6b6058] text-white transition-colors duration-200"
            >
              Continue Exploring Gallery
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}

export default ConfirmOrder;
