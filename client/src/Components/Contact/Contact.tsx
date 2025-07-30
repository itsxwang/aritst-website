import Footer from '../global/Footer'
import Navbar from '../Home/NavBar'
import ContactSection from './ContactSection'

function Contact() {
  return (
   <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
    <div>
      <Navbar />
    </div>

      <ContactSection />

    <div>
      <Footer />
    </div>

  </div>

  )
}

export default Contact