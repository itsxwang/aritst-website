import Footer from "../global/Footer"
import Navbar from "../Home/NavBar"
import MainSection from "./MainSection"

function Gallery() {
  return (
    <>
     <div id="homeNavParent" className={` dark:bg-gradient-to-b dark:from-gray-900 dark:to-black   sticky top-0 z-50`}>
      <Navbar />
    </div>

    <div>
      <MainSection />
    </div>

    <div>
      <Footer />
    </div>
    </>
  )
}

export default Gallery