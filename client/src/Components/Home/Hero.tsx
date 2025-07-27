import { useContext } from "react";
import ThemeContext from "../../contexts/themeContext";
import "./hero.css"; // ✅ we’ll add a tiny custom CSS file

function Hero() {
  const { theme } = useContext(ThemeContext);

  const bgImage =
    "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')";

  const gradient =
    theme === "dark"
      ? "linear-gradient(rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.6))"
      : "linear-gradient(rgba(245, 245, 220, 0.2), rgba(245, 245, 220, 0.2))";

  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen w-full text-center px-6 md:px-12 lg:px-24 transition-colors duration-300"
      style={{
        backgroundImage: `${gradient}, ${bgImage}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ✅ Main Heading */}
      <h1
        className={`hero-heading text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wide font-[playfair] transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Where Art Meets Soul
      </h1>

      {/* ✅ Subheading */}
      <p
        className={`hero-subheading text-lg md:text-xl lg:text-2xl max-w-6xl mb-10 font-inter transition-colors duration-300 whitespace-nowrap md:whitespace-normal ${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        }`}
      >
        Contemporary paintings that capture the essence of emotion and beauty.
      </p>

      {/* ✅ Buttons */}
      <div className="flex gap-6">
        <button
          className={`px-6 py-3 rounded-md font-semibold font-inter cursor-pointer transition-all duration-300 transform hover:scale-105 ${
            theme === "dark"
              ? "bg-[#8B7E66] text-white hover:bg-[#a39076] shadow-md"
              : "bg-[#D1BFA3] text-gray-900 hover:bg-[#c7b591] shadow"
          }`}
        >
          Explore Gallery
        </button>

        <button
          className={`px-6 py-3 rounded-md font-semibold font-inter cursor-pointer transition-all duration-300 transform hover:scale-105 ${
            theme === "dark"
              ? "bg-black text-white hover:bg-gray-800 border border-gray-900"
              : "bg-white text-gray-900 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          About Samridhi
        </button>
      </div>
    </section>
  );
}

export default Hero;
