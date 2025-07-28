import { useContext } from "react"
import ThemeContext from "../../contexts/themeContext"

import Hero from "./Hero"
import Navbar from "./NavBar"
import FeatureSection from "./FeatureSection";
import Footer from "../global/Footer";

function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
    <div id="homeNavParent" className={`${ theme === "dark" && 'bg-gradient-to-b from-gray-900 to-black sticky top-0 z-50'} sticky top-0 z-50`}>
      <Navbar />
    </div>
    
      <main className="flex flex-col items-center w-full">
        <Hero />
      </main>

      <section>
          <FeatureSection />
      </section>

      <Footer />
    </>
  )
}

export default Home