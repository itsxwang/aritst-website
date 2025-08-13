import Navbar from '../global/NavBar'
import Footer from '../global/Footer'
import MainCart from './MainCart'
import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { addToCart } from '../../services/handleCart'




function Cart() {

  
  const { artId: productId } = useParams()
  const isDone = useRef(false)
  useEffect(() => {
    if (isDone.current) return;
    isDone.current = true
    if (!productId) return;
    const quantity: string | undefined  = new URLSearchParams(window.location.search).get('quantity') || undefined;
    addToCart(Number(productId), Number(quantity))


    
    
  },[productId])


  return (
      <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
        <div className='sticky top-0 z-50'>
          <Navbar />
        </div>

      {/* give flex-grow to MainCart  */}
      <MainCart  />  
        

        <div>
          <Footer />
        </div>

      </div>
    
  )
}

export default Cart