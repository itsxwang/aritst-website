import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

// --- SVG Icon Components for better UI ---
// You can move these to a separate file if you prefer
const UserIcon = () => (
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
    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PhoneIcon = () => (
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
    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
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
    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const HomeIcon = () => (
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
    className="absolute left-3 top-5 -translate-y-1/2 h-5 w-5 text-gray-400"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

// Add animation variants


function MainCheckout() {
  // Your existing logic to get product details from URL params
  const arts = useParams()
    .arts!  
    .split("+")
    .map((art) => ({
      _id: art.split("=")[0],
      quantity: parseInt(art.split("=")[1]),
    }));



  // State to hold the form data
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "",
    phone: "",
    altPhone: "",
    email: "",
    address: "",
  });

  // State for loading, error, and success messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {

    type cartItem = {
      _id: string;
      quantity: number;
    }
    const cart: cartItem[] | [] = JSON.parse(localStorage.getItem("cartItem") || "[]")!

    for (const art of arts) {
      const cartItem = cart.find((item) => item._id === art._id);
      if (!cartItem || cartItem.quantity != art.quantity) {
        window.location.href = "/";
      }
    }
    if (cart.length === 0 || cart.length !== arts.length) {
      window.location.href = "/";
    }



  }, [arts]);

  // A generic handler to update state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    fetch('https://aritst-website-abwf.vercel.app/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userDetails: formData, arts }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.removeItem("cartItem"); // Clear cart on successful order
          window.location.href = '/confirmOrder';
        }
      })
      .catch(err => {
        setLoading(false);
        setError('An unexpected error occurred. Please try again later.');
        console.log("Fetch error:", err);
      });
  };

  // The main checkout form
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-grow flex items-center justify-center p-4 bg-gray-50 dark:bg-transparent"
    >
      <div className="max-w-lg w-full mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl font-playfair">
            Checkout
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Please provide your Shipping details.
          </p>
        </motion.div>

        <motion.form

          initial="initial"
          animate="animate"
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700"
        >
          {/* --- Form Fields --- */}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Full Name
            </label>
            <div className="relative">
              <UserIcon />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Phone Number Field with Country Code */}
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <div className="relative w-1/4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                  +
                </span>
                <input
                  id="countryCode"
                  name="countryCode"
                  type="text"
                  required
                  value={formData.countryCode}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400"
                />
              </div>
              <div className="relative w-3/4">
                <PhoneIcon />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="123-456-7890"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400"
                />
              </div>
            </div>
          </div>

          {/* Alternate Phone Number Field (Optional) */}
          <div>
            <label htmlFor="altPhone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Alternate Phone <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <div className="relative">
              <PhoneIcon />
              <input
                id="altPhone"
                name="altPhone"
                type="tel"
                value={formData.altPhone}
                onChange={handleChange}
                placeholder="098-765-4321"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Email Address
            </label>
            <div className="relative">
              <MailIcon />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Shipping Address
            </label>
            <div className="relative">
              <HomeIcon />
              <textarea
                id="address"
                name="address"
                rows={4}
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, Anytown, USA 12345"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400 resize-none"
              />
            </div>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="text-center text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white bg-[#817565] hover:bg-[#625a50] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#817565] dark:focus:ring-offset-gray-900 font-semibold w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default MainCheckout;


