import { useContext } from "react";
import ThemeContext from "../../contexts/themeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`py-12 ${theme === "dark" ? "bg-[#111827] text-white" : "bg-[#e0dcd1] text-black"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-[playflair] text-2xl font-semibold mb-4">Magic Colors of Samridhi</h3>
            <p className="mb-4">Contemporary artist creating meaningful connections through color and form.</p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@magiccoloursofsamridhi4874" target="_blank" className={`cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 w-10 ${theme === "dark" ? "text-gray-100 hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}>
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
              <a href="https://www.instagram.com/magic_colours_of_samridhi/" target="_blank" className={`cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 w-10 ${theme === "dark" ? "text-gray-100 hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}>
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
                <a href="/gallery" className="hover:text-gray-700 transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-700 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-700 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700 transition-colors">
                  Commissions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-[Inter] font-semibold text-lg mb-4">Newsletter</h4>
            <p className="mb-4">Stay updated on new artworks and exhibitions.</p>
            <form className="flex">
              <input
                type="email"
                className={`flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1 bg-gray-100 border-gray-300 text-gray-900 rounded-r-none focus:ring-gray-900 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:ring-gray-500" : ""}`}
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className={`cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white h-10 px-4 py-2 rounded-l-none ${theme === "dark" ? "bg-[#817565] hover:bg-[#625a50]" : "bg-[#625a50] hover:bg-[#4e4841]"}`}
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
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-600 text-center">
          <p>© 2024 Samridhi Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;