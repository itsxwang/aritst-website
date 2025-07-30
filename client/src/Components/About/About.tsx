import Footer from '../global/Footer';
import Navbar from '../Home/NavBar';
import MainAbout from './MainAbout';

function About() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white">
      {/* Navbar */}
      <div id="homeNavParent" className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content fills remaining space */}
      <div className="flex-grow">
        <MainAbout />
      </div>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}

export default About;