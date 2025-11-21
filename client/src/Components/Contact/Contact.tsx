import useTitle from '../../hooks/useTitle'
import Footer from '../global/Footer'
import Navbar from '../global/NavBar'
import ContactSection from './ContactSection'

function Contact() {
  useTitle('Contact')
  return (
   <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
    <div className='sticky top-0 z-50'>
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