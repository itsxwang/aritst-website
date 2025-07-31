import "./styles/hero.css"; // ✅ we’ll keep the custom CSS file

function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen w-full text-center px-6 md:px-12 lg:px-24 transition-colors duration-300 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
      }}
    >
      {/* ✅ Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r dark:from-black/60 dark:to-black/60 from-[rgb(245,245,220)]/20 to-[rgb(245,245,220)]/20"
      ></div>

      {/* ✅ Main Heading */}
      <h1
        className="hero-heading text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wide font-[playfair] transition-colors duration-300 text-gray-900 dark:text-white relative z-10"
      >
        Where Art Meets Soul
      </h1>

      {/* ✅ Subheading */}
      <p
        className="hero-subheading text-lg md:text-xl lg:text-2xl max-w-6xl mb-10 font-inter transition-colors duration-300 whitespace-nowrap md:whitespace-normal text-gray-900 dark:text-gray-200 relative z-10"
      >
        Contemporary paintings that capture the essence of emotion and beauty.
      </p>

      {/* ✅ Buttons */}
      <div className="flex gap-6 relative z-10">
        <button
          className="px-6 py-3 rounded-md font-semibold font-inter cursor-pointer transition-all duration-300 transform hover:scale-105 bg-[#D1BFA3] text-gray-900 hover:bg-[#c7b591] shadow dark:bg-[#8B7E66] dark:text-white dark:hover:bg-[#a39076] dark:shadow-md"
        >
          Explore Gallery
        </button>

        <button
          className="px-6 py-3 rounded-md font-semibold font-inter cursor-pointer transition-all duration-300 transform hover:scale-105 bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 dark:bg-black dark:text-white dark:hover:bg-gray-800 dark:border dark:border-gray-900"
        >
          About Samridhi
        </button>
      </div>
    </section>
  );
}

export default Hero;