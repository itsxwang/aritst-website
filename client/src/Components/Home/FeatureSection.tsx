import { fetchAllArtoworks } from "../../utilities/fetchArtoworks";
import  truncateDescription  from "../../utilities/truncateDescription";

function FeatureSection() {
  // ✅ Fetch all artworks (will come from API later)
  const allItems = fetchAllArtoworks();

  // ✅ Filter featured artworks only
  const featuredItems = allItems.filter((item) => item.featured === true);

  // ✅ Function to trim description safely (avoids overflow)
  

  return (
    <section className="pb-20 pt-20 w-full py-12 cursor-pointer bg-gray-100 text-gray-800 dark:bg-[#202738] dark:text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-[playflair] text-5xl font-bold mb-4">Featured Artworks</h2>
        <p className="font-[Intra] text-2xl mb-8">
          Discover the latest collection of contemporary paintings, each piece telling its own unique story
        </p>

        {/* ✅ Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <a
              href={`/art/${item.id}`}
              key={item.id}
              className="cursor-pointer bg-white dark:bg-gray-800 p-0 rounded-lg shadow-md transition duration-300 ease hover:scale-105"
            >
              {/* ✅ Image placeholder */}
              <div
                className="w-full h-64 bg-gray-300 dark:bg-gray-700 mb-4 rounded-t-lg"
                style={{
                  backgroundImage: `url(${item.mainImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* ✅ Artwork details */}
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold mb-2 text-center font-playfair">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                  {item.medium} • {item.size}
                </p>

                {/* ✅ Truncated description */}
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm leading-snug text-center font-[Intra]">
                   {truncateDescription(item.description)}
                </p>

                {/* ✅ Price */}
                <p className="text-gray-900 dark:text-gray-100 font-bold mt-3 text-center">₹{item.price ? (item.price).toFixed(2) : "N/A"}</p>
              </div>

              {/* ✅ Button Section */}
              <div className="p-4 pt-0">
                {item.availability === "Reserved" ? (
                  <button
                    className="w-full bg-yellow-500 text-white font-semibold py-2 rounded opacity-70 cursor-not-allowed"
                    disabled
                  >
                    Reserved
                  </button>
                ) : item.stock_quantity === 0 ? (
                  <button
                    className="w-full bg-gray-500 text-white font-semibold py-2 rounded opacity-70 cursor-not-allowed"
                    disabled
                  >
                    Out Of Stock
                  </button>
                ) : (
                  <button className="cursor-pointer transition duration-200 w-full bg-[#817565] font-semibold py-2 rounded text-gray-900 dark:text-white hover:bg-[#686055] dark:hover:bg-[#625a50]">
                    Add To Cart
                  </button>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* ✅ View All Button */}
        <button
          onClick={() => (window.location.href = "/gallery")}
          className="cursor-pointer mt-15 px-9 py-[0.4rem] font-[Inter] font-semibold text-[1.2rem] transition duration-200 rounded bg-[#E0DCD1] text-gray-800 hover:bg-[#cec7b5] dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          View All Artworks
          <span className="ml-2 text-2xl">→</span>
        </button>
      </div>
    </section>
  );
}

export default FeatureSection;
