import Navbar from "../global/NavBar"
import Footer from "../global/Footer"
import MainCheckout from "./MainCheckout"

function Checkout() {
  return (

    <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
      {/* Navbar */}
      <div id="homeNavParent" className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content fills remaining space */}
        <MainCheckout />

      {/* Footer sticks to bottom */}
      <Footer />
    </div>

  )
}

export default Checkout