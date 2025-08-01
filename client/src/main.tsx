import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home.tsx'
import Gallery from './Components/Gallery/Gallery.tsx'
import Contact from './Components/Contact/Contact.tsx'
import About from './Components/About/About.tsx'
import Cart from './Components/Cart/Cart.tsx'
import Page404 from './Components/404/page404.tsx'
import ArtPage from './Components/ArtPage/Artpage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/gallery',
    element: <Gallery />

  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/art/:artId',
    element: <ArtPage />
  },
  {
    path: '*',
    element: <Page404 />
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
