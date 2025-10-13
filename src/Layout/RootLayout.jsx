import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
    <header>
      <Navbar/>
    </header>
    <main className='max-w-screen-xl mx-auto'>
      <Outlet/>
    </main>
    <footer>
      <Footer/>
    </footer>
    </>
  )
}
export default RootLayout;