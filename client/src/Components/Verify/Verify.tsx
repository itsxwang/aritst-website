import Navbar from "../global/NavBar";
import Footer from "../global/Footer";
import MainVerify from "./MainVerify";

export default function Verify() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <MainVerify />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
