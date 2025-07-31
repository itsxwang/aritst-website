import React from 'react'
import Navbar from '../global/NavBar'
import Footer from '../global/Footer'
import Main404 from './Main404'

function page404() {
  return (

    <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
      <div>
        <Navbar />
      </div>

      {/* includes flex grow */}
      <Main404 />  

      <div>
        <Footer />  
      </div>

    </div>

  )
}

export default page404