import { fetchAllArtoworks } from "../../utilities/fetchArtoworks";


function FeatureSection() {
  // will come from api, this is just for demo
  const featuredItems = fetchAllArtoworks();

  return (
    <section className="pb-20 pt-20 w-full py-12 cursor-pointer bg-gray-100 text-gray-800 dark:bg-[#202738] dark:text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-[playflair] text-5xl font-bold mb-4">Featured Artworks</h2>
        <p className="font-[Intra] text-2xl mb-8">Discover the latest collection of contemporary paintings, each piece telling its own unique story</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-0 rounded-lg shadow-md">
              <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 mb-4"></div> {/* Placeholder for image */}
              <h3 className="p-2 text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-900 dark:text-gray-100 mb-2">{item.description}</p>
              <p className="text-gray-900 dark:text-gray-100 font-bold mb-4">{item.price}</p>

              <div className="p-7 pb-4 pt-3">
                <button className="cursor-pointer transition duration-200 w-full bg-[#817565] font-semibold py-2 rounded text-gray-900 dark:text-white hover:bg-[#686055] dark:hover:bg-[#625a50]">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="cursor-pointer mt-15 px-9 py-[0.4rem] font-[Inter] font-semibold text-[1.2rem] transition duration-200 rounded bg-[#E0DCD1] text-gray-800 hover:bg-[#cec7b5] dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
          View All Artworks
          <span className="ml-2 text-2xl">→</span>
        </button>
      </div>
    </section>
  );
}

export default FeatureSection;