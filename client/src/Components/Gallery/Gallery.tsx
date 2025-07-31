import Footer from "../global/Footer"
import Navbar from "../global/NavBar"
import MainSection from "./MainSection"

function Gallery() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex-grow">
        <MainSection />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Gallery