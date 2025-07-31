import Navbar from '../global/NavBar'
import Footer from '../global/Footer'
import MainCart from './MainCart'

function Cart() {
  return (
      <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
        <div className='sticky top-0 z-50'>
          <Navbar />
        </div>

      {/* give flex-grow to MainCart  */}
        <MainCart />  
        

        <div>
          <Footer />
        </div>

      </div>
    
  )
}

export default Cart