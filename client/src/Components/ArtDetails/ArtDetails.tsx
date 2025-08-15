import { useParams } from "react-router-dom"
import Navbar from "../global/NavBar"
import Footer from "../global/Footer"
import MainDetails from "./MainDetails"

function ArtPage() {


  return (

    <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">

      <div id="homeNavParent" className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex-grow" >
        <MainDetails  id= {useParams().artId! }  />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ArtPage