import Hero from "./Hero"
import Navbar from "./NavBar"


function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <Hero />
      </main>
    </>
  )
}

export default Home