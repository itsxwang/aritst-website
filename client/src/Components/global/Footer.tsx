import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  function handleEmail() {
    if (!email) return setError('Please enter your email');
    if (!(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/))) return setError('Please enter a valid email');
    setError('');

    setLoading(true);
    
    console.log("reached 1");
    
    fetch(`${process.env.BACKEND_URL}/verify/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data",data);
        if (data.error) {
          setError(data.error);
        } else {
          console.log(data);  
        window.location.href = `/verify/${data._id}`;
        }
      }).catch((error) => {
        setError(error.message);        
      }).finally(() => {
        setLoading(false);
      })
  }

  return (
    <footer className="py-12 bg-[#e0dcd1] text-black dark:bg-[#111827] dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-[playflair] text-2xl font-semibold mb-4">Magic Colors of Samridhi</h3>
            <p className="font-[Inter] mb-4">Contemporary artist creating meaningful connections through color and form.</p>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/@magiccoloursofsamridhi4874"
                target="_blank"
                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 w-10 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              >
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
                  className="lucide lucide-youtube h-5 w-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/magic_colours_of_samridhi/"
                target="_blank"
                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 w-10 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              >
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
                  className="lucide lucide-instagram h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-[Inter] font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cart" className="font-[Inter] hover:text-gray-700 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="font-[Inter] hover:text-gray-700 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-[Inter] hover:text-gray-700 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-[Inter] hover:text-gray-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-[Inter] font-semibold text-lg mb-4">Newsletter</h4>
            <p className="mb-4">Stay updated on new artworks and exhibitions.</p>
            <div className="flex">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1 bg-gray-100 border-gray-300 text-gray-900 rounded-r-none focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-gray-500 focus-visible:ring-offset-0 dark:focus-visible:ring-offset-2"
                placeholder="Enter your email"
              />


              {loading ? (
                <button
                  className="cursor-not-allowed inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white h-10 px-4 py-2 rounded-l-none  bg-[#4e4841] :bg-[#625a50]"
                >
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                </button>

              ) : (

                <button
                  onClick={handleEmail}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white h-10 px-4 py-2 rounded-l-none bg-[#625a50] hover:bg-[#4e4841] dark:bg-[#817565] dark:hover:bg-[#625a50]"
                >
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
                    className="lucide lucide-arrow-right h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              )

              }


            </div>
            <div

              className="mt-3 min-h-[2.5rem] flex items-center justify-center"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-red-100 text-red-700 rounded-md flex items-center justify-center gap-2 w-full animate-fade-in">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </motion.div>
              )}
            </div>

          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-600 text-center">
          <p>© 2025 Samridhi Studio. All rights reserved.</p>
        </div>
      </div>
      <style>{`
        .animate-fade-out {
          animation: fadeOut 3.5s ease-in-out;
        }
        @keyframes fadeOut {
          0% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
}

export default Footer;