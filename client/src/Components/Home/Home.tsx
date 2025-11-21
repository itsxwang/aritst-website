
import Hero from "./Hero"
import Navbar from "../global/NavBar"
import FeatureSection from "./FeatureSection";
import Footer from "../global/Footer";

function Home() {
  document.title = "Samridhi Studio"
  return (
    <>
    <div id="homeNavParent" className={` dark:bg-gradient-to-b dark:from-gray-900 dark:to-black  sticky top-0 z-50`}>
      <Navbar />
    </div>
    
      <main className="flex flex-col items-center w-full">
        <Hero />
      </main>

      <section >
          <FeatureSection />
      </section>
      
      <Footer />
    </>
  )
}

export default Home