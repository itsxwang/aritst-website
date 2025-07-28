import { useContext } from 'react';
import ThemeContext from '../../contexts/themeContext';

interface FeatureItem {
  title: string;
  description: string;
  price: string;
}

function FeatureSection() {
  const { theme } = useContext(ThemeContext);

  // will comes from api, this is just for demo
  const featuredItems: FeatureItem[] = [
    { title: 'Whispers of Banaras', description: 'Acrylic on Canvas, 30"x24"', price: '₹42,000' },
    { title: 'Mountain Serenity', description: 'Oil on Canvas, 30"x40"', price: '₹1,80,000' },
    { title: 'Urban Reflections', description: 'Mixed Media, 20"x24"', price: '₹95,000' },
  ];

  return (
    <section className={`pb-20 pt-20 w-full py-12 cursor-pointer ${theme === 'dark' ? 'bg-[#202738] text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-[playflair] text-5xl font-bold mb-4">Featured Artworks</h2>
        <p className="font-[Intra]  text-2xl mb-8">Discover the latest collection of contemporary paintings, each piece telling its own unique story</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <div key={index} className={ `${ theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md` }>
              <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 mb-4"></div> {/* Placeholder for image */}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className={`${ theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}  mb-2`}>{item.description}</p>
              <p className={` ${ theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-bold mb-4`}>{item.price}</p>
              <button className={`cursor-pointer transition duration-200 w-full bg-[#817565] font-semibold py-2 rounded ${ theme === 'dark' ? 'text-white hover:bg-[#625a50]' : 'bg-[#625a50] hover:bg-[#686055]  text-gray-900'} `}>Buy</button>
            </div>
          ))}
        </div>
        <button className={`cursor-pointer mt-15 px-9 py-[0.4rem] font-[Inter] font-semibold text-[1.2rem] transition duration-200 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : ' bg-[#E0DCD1] hover:bg-[#cec7b5] text-gray-800'} `}>
          View All Artworks
    <span className="ml-2 text-2xl">→</span>
        </button>
      </div>
    </section>
  );
}

export default FeatureSection;